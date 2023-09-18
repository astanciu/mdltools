import { Tagged, decode, encode } from "cbor";
export { Tagged } from "cbor";
import * as jose from "jose";
import cosekey from "parse-cosekey";

import { TAG_MAP } from "./config";
import { JWK } from "jose";
import { JsonWebKey, JwkEcCurve, JwkKty } from "@mattrglobal/cose";

export function maybeEncodeValue(key: string, value: any): any {
  // only dates of type 'full-date' need to be tagged as 1004
  const tag = TAG_MAP[key];
  if (!tag) return value;

  if (tag === 1004) return cborTagged(1004, value);

  throw new Error(`Unknown tag "${tag}"`);
}

// Do all CBOR operations in one spot so we can change libs easily
export function cborEncode(data: any) {
  return encode(data);
}
export function cborTagged(tag: number, data: any) {
  return new Tagged(tag, data);
}

export function cborDecode(data: any) {
  const extraTags = {
    24: (value) => decode(value, { tags: extraTags }),
    1004: (dateString) => dateString,
  };
  return decode(data, { tags: extraTags });
}

export function convertJWKtoJsonWebKey(jwk: JWK): JsonWebKey {
  const kty = JwkKty[jwk.kty];
  const crv = JwkEcCurve[jwk.crv.replace("-", "")];

  const key: JsonWebKey = {
    kty,
    crv,
    x: jwk.x,
    y: jwk.y,
    d: jwk.d,
    kid: "11",
  };
  return key;
}

export function fromPEM(pem) {
  const base64 = pem.replace(/-{5}(BEGIN|END) .*-{5}/gm, "").replace(/\s/gm, "");
  return Buffer.from(base64, "base64");
}

export function jwk2COSE_Key(jwk: jose.JWK) {
  const coseMap = cosekey.KeyParser.jwk2cose(jwk);

  return coseMap;
}
