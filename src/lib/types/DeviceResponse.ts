import { IssuerSigned } from "./MDOC";

export type DeviceSignedItem = Record<string, any>;

export type DeviceNameSpaces = Record<string, DeviceSignedItem[]>;

export type DeviceMac = any[];
export type DeviceSignature = any[];
export type DeviceAuth = DeviceMac | DeviceSignature;

export type DeviceSigned = {
  nameSpaces: DeviceNameSpaces;
  deviceAuth: DeviceAuth;
};

export type DeviceResponseDocument = {
  docType: string;
  issuerSigned: IssuerSigned;
  deviceSigned: DeviceSigned;
};

export type DeviceResponse = {
  version: string;
  documents: DeviceResponseDocument[];
  documentErrors: DocumentError[];
  status: number;
};
