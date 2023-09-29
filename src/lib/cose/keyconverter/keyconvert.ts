// Copied from https://github.com/s1r-J/parse-cosekey
import str2ab from "str2ab";
import { convertJoseCoseValue } from "./utils";
import {
  JSONWebKeyEllipticCurve,
  JSONWebKeyOperation,
  JSONWebKeyParameter,
  JSONWebKeyType,
  JSONWebKeyUse,
  JSONWebSignatureAndEncryptionAlgorithm,
} from "./joseKey";
import { COSEKeyCommonParameter, COSEKeyTypeParameter } from "./coseKey";
import { KeyParameterMapping } from "./coseJoseMapping";

const BUFFER_TYPE_COSE_KEY_PARAMETER_NAME = [
  "kid",
  "Base IV",
  "x",
  "d",
  "y",
  "n",
  "e",
  "p",
  "q",
  "dP",
  "dQ",
  "qInv",
  "r_i",
  "d_i",
  "t_i",
  "k",
  "pub",
];

type coseMap = Map<number, any>;

export function jwk2cose(jwk): coseMap {
  const keyTypeValue = jwk.kty;
  if (!keyTypeValue) {
    throw new Error('jwk does not have "kty".');
  }

  const keyType = JSONWebKeyType.fromValue(keyTypeValue);
  if (keyType == null) {
    throw new Error("Cannot convert key type.");
  }

  const coseMap: coseMap = new Map<number, any>();
  for (const [key, value] of Object.entries(jwk)) {
    const keyParameter = findJSONWebKeyParameterFromName(key, keyType);
    const coseKeyParameter = keyParameter != null ? convertJoseCoseKey(keyParameter) : null;
    if (coseKeyParameter == null) {
      continue;
    }

    const parameterValue = typeof value === "string" ? findJSONWebKeyParameterValueFromValue(value) : null;
    const coseParameterValue = parameterValue != null ? convertJoseCoseValue(parameterValue) : null;
    if (coseParameterValue != null) {
      coseMap.set(Number(coseKeyParameter.label), coseParameterValue.value);
    } else {
      if (
        typeof value === "string" &&
        /[a-zA-Z0-9\-_]+/.test(value) &&
        BUFFER_TYPE_COSE_KEY_PARAMETER_NAME.includes(coseKeyParameter.name)
      ) {
        coseMap.set(Number(coseKeyParameter.label), str2ab.base64url2buffer(value));
      } else {
        coseMap.set(Number(coseKeyParameter.label), value);
      }
    }
  }

  return coseMap;
}

function findJSONWebKeyParameterFromName(name: string, keyType: JSONWebKeyType): JSONWebKeyParameter | null {
  return JSONWebKeyParameter.fromName(keyType, name);
}

function convertJoseCoseKey(keyParameter: JSONWebKeyParameter): COSEKeyCommonParameter | COSEKeyTypeParameter | null {
  return KeyParameterMapping.fromJSONWebKeyParameter(keyParameter);
}

function findJSONWebKeyParameterValueFromValue(
  value: string
):
  | JSONWebKeyType
  | JSONWebKeyEllipticCurve
  | JSONWebKeyUse
  | JSONWebKeyOperation
  | JSONWebSignatureAndEncryptionAlgorithm
  | null {
  if (typeof value !== "string") {
    return null;
  }
  const param =
    JSONWebKeyType.fromValue(value) ||
    JSONWebKeyEllipticCurve.fromName(value) ||
    JSONWebKeyUse.fromValue(value) ||
    JSONWebKeyOperation.fromValue(value) ||
    JSONWebSignatureAndEncryptionAlgorithm.fromName(value);

  return param;
}
