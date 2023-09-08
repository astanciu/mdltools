export type IssuerSignedItem = {
  digestID: number;
  random: Buffer;
  elementIdentifier: string;
  elementValue: any;
};

export type IssuerNameSpaces = Record<string, IssuerSignedItem[]>;
export type IssuerAuth = [Buffer, Map<number, Buffer>, Buffer, Buffer];
export type IssuerSigned = {
  nameSpaces: IssuerNameSpaces;
  issuerAuth: IssuerAuth;
};

export type Document = {
  docType: string;
  issuerSigned: IssuerSigned;
};

export type MDLDoc = {
  version: string;
  documents: Document[];
  status: number;
};

export type DrivingCode = {
  code: string;
  sign?: string;
  value?: string;
};

export type DrivingPrivilege = {
  vehicle_category_code: string;
  issue_date?: string;
  expiry_date?: string;
  codes?: DrivingCode[];
};

// As per spec, for org.iso.18013.5.1 namespace
export type MDL_DATA_MODEL = {
  family_name: string;
  given_name: string;
  birth_date: string;
  issue_date: string;
  expiry_date: string;
  issuing_country: string;
  authority: string;
  document_number: string;
  portrait: string;
  driving_privileges: DrivingPrivilege[];
  un_distinguishing_sign: string;
  administrative_number: string;
  sex: number;
  height: number;
  weight: number;
  eye_colour: string;
  hair_colour: string;
  resident_address: string;
  portrait_capture_date: string;
  age_in_years: number;
  age_birth_year: number;
  age_over_NN: boolean;
  issuing_jurisdiction: string;
  nationality: string;
  resident_city: string;
  resident_state: string;
  resident_postal_code: string;
  resident_country: string;
  biometric_template_xx: string;
  family_name_national_character: string;
};

// Covers all namespaces
export type MDLAttributes = MDL_DATA_MODEL & Record<string, any>;
