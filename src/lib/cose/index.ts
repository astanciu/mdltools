import { KeyLike, importJWK } from "jose";
import { coseSign } from "cose";

export const createCoseSignature = async (protectedHeaders, unprotectedHeaders, payload, key: KeyLike | Uint8Array) => {
  const cose = await coseSign(protectedHeaders, unprotectedHeaders, payload, key);
  return cose;
};
