import { KeyLike, importJWK } from "jose";
import { Sign1, coseSign } from "cose";
import { cborEncode } from "../cbor";

/**
 * Create an untagged COSE_Sign1.
 *
 * @param protectedHeaders
 * @param unprotectedHeaders
 * @param payload
 * @param key
 * @returns
 */
export const createCoseSignature = async (protectedHeaders, unprotectedHeaders, payload, key: KeyLike | Uint8Array) => {
  const sign1 = await Sign1.sign(
    protectedHeaders, unprotectedHeaders, payload, key
  );

  return sign1.getContentForEncoding();
};
