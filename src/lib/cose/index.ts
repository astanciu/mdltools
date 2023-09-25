import { KeyLike, importJWK } from "jose";
import { coseSign } from "cose";


export const createCoseSignature = async (protectedHeaders, unprotectedHeaders, payload, key: KeyLike | Uint8Array) => {
  const result = await coseSign(protectedHeaders, unprotectedHeaders, payload, key);

  return result;
};
