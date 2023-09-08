"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MDOCBuilder = void 0;
const node_crypto_1 = require("node:crypto");
const config_1 = require("./config");
const jose = __importStar(require("jose"));
const cbor_1 = __importDefault(require("cbor"));
const cose_js_1 = __importDefault(require("cose-js"));
class MDOCBuilder {
    defaultDocType = "org.iso.18013.5.1.mDL";
    defaultNamespace = "org.iso.18013.5.1";
    namespaces = new Set();
    rawValues = {};
    mapOfDigests = {};
    mapOfHashes = {};
    digestAlgo = "sha256";
    privateKey;
    constructor(privateKey) {
        this.privateKey = privateKey;
    }
    async addNameSpace(namespace, values) {
        if (namespace === this.defaultNamespace) {
            this.validateValues(values);
        }
        this.namespaces.add(namespace);
        this.rawValues[namespace] = values;
        this.mapOfDigests[namespace] = {};
        this.mapOfHashes[namespace] = {};
        let digestCounter = 0;
        for (const [key, value] of Object.entries(values)) {
            const { digest, hash } = await this.processAttribute(key, value, digestCounter);
            this.mapOfDigests[namespace][digestCounter] = digest;
            this.mapOfHashes[namespace][digestCounter] = hash;
            digestCounter++;
        }
    }
    /**  ---- Internal ----  */
    /**
     * converts a key/value attribute pair (like "family_name: 'Smith' ")
     * into a "digest" object with shape:
     *   {
     *     digestId
     *     random
     *     elementIdentifier
     *     elementValue
     *   }
     */
    async processAttribute(key, value, digestID) {
        const salt = (0, node_crypto_1.randomBytes)(32);
        const encodedValue = this.maybeEncodeValue(key, value);
        const digest = {
            digestID,
            random: salt,
            elementIdentifier: key,
            elementValue: encodedValue,
        };
        const hash = await this.hashDigest(digest);
        return { digest, hash };
    }
    maybeEncodeValue(key, value) {
        // only dates of type 'full-date' need to be tagged as 1004
        const tag = config_1.TAG_MAP[key];
        if (!tag)
            return value;
        if (tag === 1004)
            return new cbor_1.default.Tagged(1004, value);
        throw new Error(`Unknown tag "${tag}"`);
    }
    async hashDigest(digest) {
        const enc = await cbor_1.default.encode(digest);
        const dataToHash = await cbor_1.default.encode(new cbor_1.default.Tagged(24, enc));
        const sha256Hash = (0, node_crypto_1.createHash)(this.digestAlgo).update(dataToHash).digest();
        return sha256Hash;
    }
    validateValues(values) {
        // TODO
        // validate required fields, no extra fields, data types, etc...
    }
    formatDate(date) {
        return date.toISOString().split(".")[0] + "Z";
    }
    async buildMSO(deviceKey) {
        const utcNow = new Date();
        const expTime = new Date();
        expTime.setHours(expTime.getHours() + 5);
        const signedDate = await cbor_1.default.encode(new cbor_1.default.Tagged(0, this.formatDate(utcNow)));
        const validFromDate = await cbor_1.default.encode(new cbor_1.default.Tagged(0, this.formatDate(utcNow)));
        const validUntilDate = await cbor_1.default.encode(new cbor_1.default.Tagged(0, this.formatDate(expTime)));
        const mso = {
            version: "1.0",
            digestAlgorithm: this.digestAlgo,
            valueDigests: this.mapOfHashes,
            deviceKeyInfo: {
                deviceKey: deviceKey,
            },
            docType: this.defaultDocType,
            validityInfo: {
                signed: signedDate,
                validFrom: validFromDate,
                validUntil: validUntilDate,
            },
        };
        const msoCbor = cbor_1.default.encode(mso);
        const jwk = await jose.exportJWK(this.privateKey);
        const headers = {
            p: { alg: "ES256" },
            u: { kid: "11" }, // ?? what should this be?
        };
        const signer = {
            key: {
                d: Buffer.from(jwk.d, "hex"),
            },
        };
        const signedCbor = await cose_js_1.default.sign.create(headers, msoCbor, signer);
        // signedCbor is a cbor of an object with shape {err, tag, value}. We only want the value
        // so we need to decode it and extract it
        const decoded = await cbor_1.default.decode(signedCbor);
        return decoded.value;
    }
    async save() {
        const issuerAuth = await this.buildMSO();
        const nameSpaces = {};
        for (const ns of this.namespaces.values()) {
            nameSpaces[ns] = [];
            for (const [key, val] of Object.entries(this.mapOfDigests[ns])) {
                const data = new cbor_1.default.Tagged(24, await cbor_1.default.encode(val));
                nameSpaces[ns].push(data);
            }
        }
        const mdl = {
            version: "1.0",
            documents: [
                {
                    docType: this.defaultDocType,
                    issuserSigned: {
                        nameSpaces,
                        issuerAuth,
                    },
                },
            ],
            status: 0,
        };
        const mdlCbor = await cbor_1.default.encode(mdl);
        return mdlCbor;
    }
}
exports.MDOCBuilder = MDOCBuilder;
