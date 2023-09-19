import { DeviceResponseVerifier } from "mdl";
import * as jose from "jose";
import { MDOC, MDOCBuilder } from "../MDLTools";
import { DeviceResponse } from "../lib/DeviceResponse";
import { DEVICE_JWK, ISSUER_CERTIFICATE, ISSUER_CERTIFICATE_PRIVATE_KEY, PRESENTATION_DEFINITION_1 } from "./config";
import { cborEncode, DataItem } from "../lib/cbor";

main().catch((e) => {
  console.log("FAILED:");
  console.log(e);
});

async function main() {
  /** -------- Variables  ------- **/
  const issuerCertificate = ISSUER_CERTIFICATE;
  const issuerPrivatePem = ISSUER_CERTIFICATE_PRIVATE_KEY;

  // const { privateKey: devicePrivateKey, publicKey: devicePublicKey } = await jose.generateKeyPair("ES256");
  const devicePrivateKey = await jose.importJWK(DEVICE_JWK);
  const devicePublicKey = await jose.importJWK({ ...DEVICE_JWK, d: undefined });
  const verifierGeneratedNonce = "abcdefg";
  const mdocGeneratedNonce = "123456";
  const clientId = "Cq1anPb8vZU5j5C0d7hcsbuJLBpIawUJIDQRi2Ebwb4";
  const responseUri = "http://localhost:4000/api/presentation_request/dc8999df-d6ea-4c84-9985-37a8b81a82ec/callback";

  /** -------- Generate MDL  ------- **/
  const mdlBuffer = await generateMDL(issuerCertificate, issuerPrivatePem, devicePublicKey);
  const mdoc = await MDOC.from(mdlBuffer);
  console.log("MDOC:");
  console.log(mdlBuffer.toString("hex"));

  /** -------- Generate Device Response ------- **/

  let deviceResponse = await DeviceResponse.from(mdoc)
    .usingPresentationDefinition(PRESENTATION_DEFINITION_1)
    .usingHandover([mdocGeneratedNonce, clientId, responseUri, verifierGeneratedNonce])
    .authenticateWithSignature(devicePrivateKey as jose.KeyLike)
    .generate();
  console.log("deviceResponse:");
  console.log(deviceResponse.toString("hex"));
  /** -------- VERIFY ------- **/
  const trustedCerts = [issuerCertificate];
  const ephemeralReaderKey = Buffer.from("SKReader", "utf8");
  const encodedSessionTranscript = getSessionTranscriptBytes(
    { client_id: clientId, response_uri: responseUri, nonce: verifierGeneratedNonce },
    mdocGeneratedNonce
  );

  const verifier = new DeviceResponseVerifier(trustedCerts);
  const { isValid } = await verifier.verify(deviceResponse, {
    ephemeralReaderKey,
    encodedSessionTranscript,
  });
  const summary = verifier.getVerificationSummary();
  for (const item of summary) {
    // if (item.level !== "info")
    console.log(`${item.level}: ${item.msg}`);
  }

  console.log("Valid: ", isValid);
}

async function generateMDL(issuerCertPem, issuerPubKeyPem, devicePublicKey) {
  const builder = new MDOCBuilder(issuerCertPem, issuerPubKeyPem, devicePublicKey);

  await builder.addNameSpace("org.custom.test", {
    cool: true,
  });

  await builder.addNameSpace("org.iso.18013.5.1", {
    family_name: "Smith",
    given_name: "John",
    birth_date: "1980-06-15",
    issue_date: "2023-03-01",
    expiry_date: "2028-03-31",
    issuing_country: "US",
    issuing_authority: "NY DMV",
    issuing_jurisdiction: "New York",
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

  return mdl;
}

const getSessionTranscriptBytes = ({ client_id: clientId, response_uri: responseUri, nonce }, mdocGeneratedNonce) =>
  cborEncode(
    DataItem.fromData([
      null, // DeviceEngagementBytes
      null, // EReaderKeyBytes
      [mdocGeneratedNonce, clientId, responseUri, nonce], // Handover = OID4VPHandover
    ])
  );
