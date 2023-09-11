export type IssuerSignedItem = {
  digestID: number;
  random: Buffer;
  elementIdentifier: string;
  elementValue: any;
};

export type MDLNameSpace = {
  "org.iso.18013.5.1": IssuerSignedItem[];
};

export type IssuerNameSpaces = MDLNameSpace & Record<string, IssuerSignedItem[]>;

export type IssuerAuth = [Buffer, Map<number, Buffer>, Buffer, Buffer];

export type IssuerSigned = {
  nameSpaces: IssuerNameSpaces;
  issuerAuth: IssuerAuth;
};

export type MDOCDocument = {
  docType: string;
  issuerSigned: IssuerSigned;
};

export type MDLDoc = {
  version: string;
  documents: MDOCDocument[];
  status: number;
};
