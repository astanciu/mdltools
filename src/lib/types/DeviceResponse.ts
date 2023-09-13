import { Tagged } from "cbor";
import { IssuerSigned } from "./MDOC";

export type DeviceSignedItem = Record<string, any>;

export type DeviceNameSpaces = Record<string, DeviceSignedItem[]>;

export type DeviceMac = {
  deviceMac: any;
};
export type DeviceSignature = {
  deviceSignature: any;
};
export type DeviceAuth = DeviceMac | DeviceSignature;

// This version of the type is used for building the
// the javascript object used to generate the device response
export type DeviceSigned_Build = {
  nameSpaces: Tagged;
  deviceAuth: DeviceAuth;
};

export type DeviceSigned = {
  nameSpaces: DeviceNameSpaces;
  deviceAuth: DeviceAuth;
};

export type ErrorCode = number;

export type ErrorItems = Record<string, ErrorCode>;

export type Errors = Record<string, ErrorItems>;

export type DeviceResponseDocument = {
  docType: string;
  issuerSigned: IssuerSigned;
  deviceSigned: DeviceSigned;
  errors?: Errors;
};

export type DocumentError = {
  DocType: ErrorCode;
};

export type DeviceResponseType = {
  version: string;
  documents?: DeviceResponseDocument[];
  documentErrors?: DocumentError[];
  status: number;
};
