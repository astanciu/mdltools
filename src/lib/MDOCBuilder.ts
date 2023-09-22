import { randomBytes, createHash } from "node:crypto";
import * as jose from "jose";

import { fromPEM, jwk2COSE_Key, maybeEncodeValue } from "./utils";
import { DataItem, cborEncode, cborDecode } from "./cbor";
import { StringDate } from "./cbor/StringDate";
import { createCoseSignature } from "./cose";

const DIGEST_ALGS = {
  "SHA-256": "sha256",
  "SHA-384": "sha384",
  "SHA-512": "sha512",
} as { [key: string]: string };

export class MDOCBuilder {
  public readonly defaultDocType = "org.iso.18013.5.1.mDL";
  public readonly defaultNamespace = "org.iso.18013.5.1";
  public readonly digestAlgo = "SHA-256";

  public namespaces = new Set<string>();
  private mapOfDigests: Record<string, any> = {};
  private mapOfHashes: Record<string, any> = {};

  issuerCertificatePem: string;
  issuerPrivateKeyPem: string;
  devicePublicKey: jose.KeyLike;

  constructor(issuerCertificatePem: string, issuerPrivateKeyPem: string, devicePublicKey: jose.KeyLike) {
    this.issuerCertificatePem = issuerCertificatePem;
    this.issuerPrivateKeyPem = issuerPrivateKeyPem;
    this.devicePublicKey = devicePublicKey;
  }

  async addNameSpace(namespace: string, values: Record<string, any>) {
    if (namespace === this.defaultNamespace) {
      this.validateValues(values);
    }
    this.namespaces.add(namespace);
    this.mapOfDigests[namespace] = {};
    this.mapOfHashes[namespace] = new Map<number, Buffer>();
    let digestCounter = 0;

    for (const [key, value] of Object.entries(values)) {
      const { itemBytes, hash } = await this.processAttribute(key, value, digestCounter);

      this.mapOfDigests[namespace][digestCounter] = itemBytes;
      this.mapOfHashes[namespace].set(digestCounter, hash);
      digestCounter++;
    }
  }

  async save(): Promise<Buffer> {
    const issuerAuth = await this.buildMSO();
    const nameSpaces = {};

    for (const ns of this.namespaces.values()) {
      nameSpaces[ns] = [];
      for (const [_, val] of Object.entries(this.mapOfDigests[ns])) {
        nameSpaces[ns].push(val);
      }
    }

    const mdl = {
      version: "1.0",
      documents: [
        {
          docType: this.defaultDocType,
          issuerSigned: {
            nameSpaces,
            issuerAuth,
          },
        },
      ],
      status: 0,
    };

    const mdlCbor = cborEncode(mdl);

    return mdlCbor;
  }

  /**  ---- Internal ----  */

  private async processAttribute(
    key: string,
    value: any,
    digestID: number
  ): Promise<{ itemBytes: DataItem; hash: Buffer }> {
    const salt = randomBytes(32);
    const encodedValue = maybeEncodeValue(key, value);

    const digest = {
      digestID,
      random: salt,
      elementIdentifier: key,
      elementValue: encodedValue,
    };

    const itemBytes = DataItem.fromData(digest);
    const hash = await this.hashDigest(itemBytes);

    return { itemBytes, hash };
  }

  async hashDigest(itemBytes: DataItem): Promise<Buffer> {
    const encoded = cborEncode(itemBytes);
    const sha256Hash = createHash(DIGEST_ALGS[this.digestAlgo]).update(encoded).digest();

    return sha256Hash;
  }

  validateValues(values) {
    // TODO
    // validate required fields, no extra fields, data types, etc...
  }

  formatDate(date: Date): string {
    return date.toISOString().split(".")[0] + "Z";
  }

  async buildMSO() {
    const devicePrivateKey = await jose.importPKCS8(this.issuerPrivateKeyPem, "");
    const devicePublicKeyJwk = await jose.exportJWK(this.devicePublicKey);
    const issuerPublicKeyBuffer = fromPEM(this.issuerCertificatePem);

    const utcNow = new Date();
    const expTime = new Date();
    expTime.setHours(expTime.getHours() + 5);

    const signedDate = new StringDate(utcNow);
    const validFromDate = new StringDate(utcNow);
    const validUntilDate = new StringDate(expTime);

    const deviceKey = jwk2COSE_Key(devicePublicKeyJwk);

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

    const msoCbor = cborEncode(DataItem.fromData(mso));

    const protectedHeader = { alg: "ES256" };
    const unprotectedHeader = { kid: "11", x5chain: [issuerPublicKeyBuffer] };

    const signedCbor = await createCoseSignature(protectedHeader, unprotectedHeader, msoCbor, devicePrivateKey);

    // signedCbor is a cbor of an object with shape {err, tag, value}. We only want the value
    // so we need to decode it and extract it
    const decoded = cborDecode(signedCbor);

    return decoded.value;
  }
}
