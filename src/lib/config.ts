export const MDL_FIELDS = [
  { id: 'family_name', required: true, encoding: 'tsrt' },
  { id: 'given_name', required: true, encoding: 'tsrt' },
  { id: 'birth_date', required: true, encoding: 'full-date' },
  { id: 'issue_date', required: true, encoding: 'full-date' /* or tdate */ },
  { id: 'expiry_date', required: true, encoding: 'full-date' /* or tdate */ },
  { id: 'issuing_country', required: true, encoding: 'tstr' },
  { id: 'authority', required: true, encoding: 'tstr' },
  { id: 'document_number', required: true, encoding: 'tstr' },
  { id: 'portrait', required: true, encoding: 'bstr' },
  { id: 'driving_privileges', required: true, encoding: 'DrivingPrivileges' },
  { id: 'un_distinguishing_sign', required: true, encoding: 'tsrt' }, // ISO/IEC 18013-1:2018, Annex F

  // Optional
  { id: 'administrative_number', required: false, encoding: 'tsrt' },
  { id: 'sex', required: false, encoding: 'uint' }, // ISO/IEC 5218
  { id: 'height', required: false, encoding: 'uint' }, // in cm
  { id: 'weight', required: false, encoding: 'uint' }, // in kg
  { id: 'eye_colour', required: false, encoding: 'tstr' }, // black, blue, brown, dichromatic, grey, green, hazel, maroon, pink, unknown
  { id: 'hair_colour', required: false, encoding: 'tstr' }, // bald, black, blond, brown, grey, red, auburn, sandy, white, unknown
  { id: 'resident_address', required: false, encoding: 'tstr' },
  { id: 'portrait_capture_date', required: false, encoding: 'tdate' },
  { id: 'age_in_years', required: false, encoding: 'uint' },
  { id: 'age_birth_year', required: false, encoding: 'uint' },
  { id: 'age_over_NN', required: false, encoding: 'bool' },
  { id: 'issuing_jurisdiction', required: false, encoding: 'tstr' }, // ISO 3166-2:2020, Clause 8
  { id: 'nationality', required: false, encoding: 'tstr' }, // ISO 3166-1
  { id: 'resident_city', required: false, encoding: 'tstr' },
  { id: 'resident_state', required: false, encoding: 'tstr' },
  { id: 'resident_postal_code', required: false, encoding: 'tstr' },
  { id: 'resident_country', required: false, encoding: 'tstr' },
  { id: 'biometric_template_xx', required: false, encoding: 'bstr' },
  { id: 'family_name_national_character', required: false, encoding: 'tstr' },
];

export const TAG_MAP = {
  birth_date: 1004,
  issue_date: 1004,
  expiry_date: 1004
}