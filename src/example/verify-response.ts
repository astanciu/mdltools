import { DeviceResponseVerifier } from "mdl";
import * as jose from "jose";
import cbor from "cbor";

import { MDOC, MDOCBuilder } from "../MDLTools";
import { DeviceResponse } from "../lib/DeviceResponse";
import { PRESENTATION_DEFINITION_1 } from "./config";
import { cborDecode } from "../lib/utils";

main().catch((e) => {
  console.log("FAILED:");
  console.log(e);
});

async function main() {
  /** -------- Variables  ------- **/
  const issuerCertificate = `-----BEGIN CERTIFICATE-----
MIICKjCCAdCgAwIBAgIUV8bM0wi95D7KN0TyqHE42ru4hOgwCgYIKoZIzj0EAwIw
UzELMAkGA1UEBhMCVVMxETAPBgNVBAgMCE5ldyBZb3JrMQ8wDQYDVQQHDAZBbGJh
bnkxDzANBgNVBAoMBk5ZIERNVjEPMA0GA1UECwwGTlkgRE1WMB4XDTIzMDkxNDE0
NTUxOFoXDTMzMDkxMTE0NTUxOFowUzELMAkGA1UEBhMCVVMxETAPBgNVBAgMCE5l
dyBZb3JrMQ8wDQYDVQQHDAZBbGJhbnkxDzANBgNVBAoMBk5ZIERNVjEPMA0GA1UE
CwwGTlkgRE1WMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEiTwtg0eQbcbNabf2
Nq9L/VM/lhhPCq2s0Qgw2kRx29tgrBcNHPxTT64tnc1Ij3dH/fl42SXqMenpCDw4
K6ntU6OBgTB/MB0GA1UdDgQWBBSrbS4DuR1JIkAzj7zK3v2TM+r2xzAfBgNVHSME
GDAWgBSrbS4DuR1JIkAzj7zK3v2TM+r2xzAPBgNVHRMBAf8EBTADAQH/MCwGCWCG
SAGG+EIBDQQfFh1PcGVuU1NMIEdlbmVyYXRlZCBDZXJ0aWZpY2F0ZTAKBggqhkjO
PQQDAgNIADBFAiAJ/Qyrl7A+ePZOdNfc7ohmjEdqCvxaos6//gfTvncuqQIhANo4
q8mKCA9J8k/+zh//yKbN1bLAtdqPx7dnrDqV3Lg+
-----END CERTIFICATE-----`;

  const issuerPrivatePem = `-----BEGIN PRIVATE KEY-----
MEECAQAwEwYHKoZIzj0CAQYIKoZIzj0DAQcEJzAlAgEBBCCjo+vMGbV0J9LCokdb
oNWqYk4JBIgCiysI99sUkMw2ng==
-----END PRIVATE KEY-----`;

  const { privateKey: devicePrivateKey, publicKey: devicePublicKey } = await jose.generateKeyPair("ES256");
  const verifierGeneratedNonce = "abcdefg";
  const mdocGeneratedNonce = "123456";
  const clientId = "Cq1anPb8vZU5j5C0d7hcsbuJLBpIawUJIDQRi2Ebwb4";
  const responseUri = "http://localhost:4000/api/presentation_request/dc8999df-d6ea-4c84-9985-37a8b81a82ec/callback";

  /** -------- Generate MDL  ------- **/
  const mdlBuffer = await generateMDL(issuerCertificate, issuerPrivatePem, devicePublicKey);
  const mdoc = await MDOC.from(mdlBuffer);

  /** -------- Generate Device Response ------- **/

  let deviceResponse = await DeviceResponse.from(mdoc)
    .usingPresentationDefinition(PRESENTATION_DEFINITION_1)
    .usingHandover([mdocGeneratedNonce, clientId, responseUri, verifierGeneratedNonce])
    .authenticateWithSignature(devicePrivateKey)
    .generate();

  /** -------- VERIFY ------- **/
  const trustedCerts = [issuerCertificate];
  const ephemeralReaderKey = Buffer.from("SKReader", "utf8");
  const encodedSessionTranscript = getSessionTranscriptBytes(
    { client_id: clientId, response_uri: responseUri, nonce: verifierGeneratedNonce },
    mdocGeneratedNonce
  );

  const verifier = new DeviceResponseVerifier.default(trustedCerts);
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

  console.log("done");
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
  cbor.encode(
    new cbor.Tagged(
      24,
      cbor.encode([
        null, // DeviceEngagementBytes
        null, // EReaderKeyBytes
        [mdocGeneratedNonce, clientId, responseUri, nonce], // Handover = OID4VPHandover
      ])
    )
  );
