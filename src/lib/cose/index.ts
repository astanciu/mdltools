import { KeyLike } from "jose";
import { Sign1 } from "cose";

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
  const sign1 = await Sign1.sign(protectedHeaders, unprotectedHeaders, payload, key);
  const tes = sign1.getContentForEncoding();
  return sign1.getContentForEncoding();
};
