export const PRESENTATION_DEFINITION_1 = {
  id: "mdl-test-all-data",
  input_descriptors: [
    {
      id: "org.iso.18013.5.1.mDL",
      format: {
        mso_mdoc: {
          alg: ["EdDSA", "ES256"],
        },
      },
      constraints: {
        limit_disclosure: "required",
        fields: [
          {
            path: ["$['org.iso.18013.5.1']['family_name']"],
            intent_to_retain: false,
          },
          {
            path: ["$['org.iso.18013.5.1']['given_name']"],
            intent_to_retain: false,
          },
          {
            path: ["$['org.iso.18013.5.1']['birth_date']"],
            intent_to_retain: false,
          },
          {
            path: ["$['org.iso.18013.5.1']['issue_date']"],
            intent_to_retain: false,
          },
          {
            path: ["$['org.iso.18013.5.1']['expiry_date']"],
            intent_to_retain: false,
          },
          {
            path: ["$['org.iso.18013.5.1']['issuing_country']"],
            intent_to_retain: false,
          },
          {
            path: ["$['org.iso.18013.5.1']['issuing_authority']"],
            intent_to_retain: false,
          },
          {
            path: ["$['org.iso.18013.5.1']['document_number']"],
            intent_to_retain: false,
          },
          {
            path: ["$['org.iso.18013.5.1']['portrait']"],
            intent_to_retain: false,
          },
          {
            path: ["$['org.iso.18013.5.1']['driving_privileges']"],
            intent_to_retain: false,
          },
          {
            path: ["$['org.iso.18013.5.1']['un_distinguishing_sign']"],
            intent_to_retain: false,
          },
        ],
      },
    },
  ],
};
