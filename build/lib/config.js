"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TAG_MAP = exports.MDL_FIELDS = void 0;
exports.MDL_FIELDS = [
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
    { id: 'un_distinguishing_sign', required: true, encoding: 'tsrt' },
    // Optional
    { id: 'administrative_number', required: false, encoding: 'tsrt' },
    { id: 'sex', required: false, encoding: 'uint' },
    { id: 'height', required: false, encoding: 'uint' },
    { id: 'weight', required: false, encoding: 'uint' },
    { id: 'eye_colour', required: false, encoding: 'tstr' },
    { id: 'hair_colour', required: false, encoding: 'tstr' },
    { id: 'resident_address', required: false, encoding: 'tstr' },
    { id: 'portrait_capture_date', required: false, encoding: 'tdate' },
    { id: 'age_in_years', required: false, encoding: 'uint' },
    { id: 'age_birth_year', required: false, encoding: 'uint' },
    { id: 'age_over_NN', required: false, encoding: 'bool' },
    { id: 'issuing_jurisdiction', required: false, encoding: 'tstr' },
    { id: 'nationality', required: false, encoding: 'tstr' },
    { id: 'resident_city', required: false, encoding: 'tstr' },
    { id: 'resident_state', required: false, encoding: 'tstr' },
    { id: 'resident_postal_code', required: false, encoding: 'tstr' },
    { id: 'resident_country', required: false, encoding: 'tstr' },
    { id: 'biometric_template_xx', required: false, encoding: 'bstr' },
    { id: 'family_name_national_character', required: false, encoding: 'tstr' },
];
exports.TAG_MAP = {
    birth_date: 1004,
    issue_date: 1004,
    expiry_date: 1004
};
