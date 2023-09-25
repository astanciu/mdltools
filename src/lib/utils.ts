import * as jose from "jose";
import cosekey from "parse-cosekey";

import { TAG_MAP } from "./config";

export function maybeEncodeValue(key: string, value: any): any {
  // only dates of type 'full-date' need to be tagged as 1004
  const tag = TAG_MAP[key];
  if (!tag) return value;

  if (tag === 1004) return new Date(value);

  throw new Error(`Unknown tag "${tag}"`);
}

export function fromPEM(pem) {
  const base64 = pem.replace(/-{5}(BEGIN|END) .*-{5}/gm, "").replace(/\s/gm, "");
  return Buffer.from(base64, "base64");
}

export function jwk2COSE_Key(jwk: jose.JWK) {
  const coseMap = cosekey.KeyParser.jwk2cose(jwk);

  return coseMap;
}


// export const getRandomBytes = (size: number) => {
//   const bytes = crypto.randomBytes(32);
//   return bytes
// }
// export const hash = () => {
  
// }