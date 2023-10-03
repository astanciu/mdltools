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
    family_name: "Jones",
    given_name: "Ava",
    portrait: "bstr",
    sex: 'F',
    height: '5\' 8"',
    weight: '120lb',
    eye_colour: 'brown',
    resident_addres: '123 Street Rd',
    resident_city: 'Brooklyn',
    resident_state: 'NY',
    resident_postal_code: '19001',
    resident_country: 'US',
    birth_date: "2007-03-25",
    issue_date: "2023-09-01",
    expiry_date: "2028-09-31",
    issuing_country: "US",
    issuing_authority: "NY DMV",
    issuing_jurisdiction: "New York",
    document_number: "01-856-5050",
    driving_privileges: [
      {
        vehicle_category_code: "C",
        issue_date: "2023-09-01",
        expiry_date: "2028-09-31",
      },
    ],
    un_distinguishing_sign: "tbd-us.ny.dmv",
  });

  type CustomNameSpace = {
    color: string;
    registered: boolean;
  };
  await builder.addNameSpace("org.acme.test", {
    color: "red",
    registered: true,
  });

  const mdl = await builder.save(); // Buffer of CBOR data

  const mdoc = await MDOC.from<CustomNameSpace>(mdl);

  console.log(mdoc.family_name, mdoc.given_name);
  console.log(mdoc.registered);
  console.log(mdoc.attributes);
  console.log(mdl.toString("hex"));
}
