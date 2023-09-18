import * as jose from "jose";

main().catch((e) => {
  console.log("FAILED:");
  console.log(e);
});

async function main() {
  const { privateKey, publicKey } = await jose.generateKeyPair("ES256");
  const jwk = await jose.exportJWK(privateKey)

  console.log(jwk)
}
