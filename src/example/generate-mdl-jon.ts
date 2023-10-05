import * as jose from "jose";

import { MDOC, MDOCBuilder } from "../MDLTools";
import { DEVICE_JWK, ISSUER_CERTIFICATE, ISSUER_CERTIFICATE_PRIVATE_KEY } from "./config";

go().catch((err) => {
  console.log("Oops...");
  console.log(err);
});

async function go() {
  const issuerCertificate = ISSUER_CERTIFICATE;
  const issuerPrivatePem = ISSUER_CERTIFICATE_PRIVATE_KEY;
  const devicePublicKey = await jose.importJWK({ ...DEVICE_JWK, d: undefined });

  const builder = new MDOCBuilder(issuerCertificate, issuerPrivatePem, devicePublicKey as jose.KeyLike);

  await builder.addNameSpace("org.iso.18013.5.1", {
    // Required Attributes
    family_name: "Smith",
    given_name: "Jon",
    birth_date: "1980-03-25",
    issue_date: "2023-05-01",
    expiry_date: "2028-05-31",
    issuing_country: "US",
    issuing_authority: "NY DMV",
    document_number: "01-734-1010",
    portrait: "bstr",
    driving_privileges: [
      {
        vehicle_category_code: "C",
        issue_date: "2023-05-01",
        expiry_date: "2028-05-31",
      },
    ],
    un_distinguishing_sign: "tbd-us.ny.dmv",

    // Optional Attributes
    sex: "M",
    height: "6' 2\"",
    weight: "180lb",
    eye_colour: "brown",
    hair_colour: "brown",
    resident_addres: "555 5Th Ave",
    resident_city: "New york",
    resident_state: "NY",
    resident_postal_code: "18002",
    resident_country: "US",
    issuing_jurisdiction: "New York",
  });

  type CustomNameSpace = {
    color: string;
    registered: boolean;
  };
  await builder.addNameSpace("org.acme.test", {
    color: "blue",
    registered: true,
  });

  const mdl = await builder.save(); // Buffer of CBOR data

  const mdoc = await MDOC.from<CustomNameSpace>(mdl);

  console.log(mdoc.attributes);
  console.log(mdl.toString("hex"));
}
