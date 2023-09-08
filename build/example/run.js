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
Object.defineProperty(exports, "__esModule", { value: true });
const jose = __importStar(require("jose"));
const MDLTools_1 = require("../MDLTools");
go().catch((err) => {
    console.log("Oops...");
    console.log(err);
});
async function go() {
    const { publicKey, privateKey } = await jose.generateKeyPair("ES256");
    const builder = new MDLTools_1.MDOCBuilder(privateKey);
    await builder.addNameSpace("org.iso.18013.5.1", {
        family_name: "Smith",
        given_name: "John",
        birth_date: "1980-06-15",
        issue_date: "2023-03-01",
        expiry_date: "2028-03-31",
        issuing_country: "US",
        authority: "New York DMV",
        document_number: "01-333-7070",
        portrait: "bstr",
        driving_privileges: [
            {
                vehicle_category_code: "C",
                issue_date: "2023-03-01",
                expiry_date: "2028-03-31",
            },
        ],
        un_distinguishing_sign: "tbd-us.ny.dmv",
    });
    const mdl = await builder.save();
    console.log(mdl.toString("hex"));
}
