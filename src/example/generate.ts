import * as jose from "jose";

import { MDOCBuilder } from "../MDLTools";

go().catch((err) => {
  console.log("Oops...");
  console.log(err);
});

async function go() {
  const { publicKey, privateKey } = await jose.generateKeyPair("ES256");

  const builder = new MDOCBuilder(privateKey);

  await builder.addNameSpace("org.alex.test", {
    cool: true
  })

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
