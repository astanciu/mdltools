// Copied from https://github.com/s1r-J/parse-cosekey
import { EllipticCurveMapping, KeyAlgorithmMapping, KeyOperationMapping, KeyTypeMapping } from "./coseJoseMapping";
import {
  JSONWebKeyEllipticCurve,
  JSONWebKeyOperation,
  JSONWebKeyType,
  JSONWebKeyUse,
  JSONWebSignatureAndEncryptionAlgorithm,
} from "./joseKey";

export function findJSONWebKeyParameterValueFromValue(
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

export function convertJoseCoseValue(
  parameterValue:
    | JSONWebKeyType
    | JSONWebKeyEllipticCurve
    | JSONWebKeyUse
    | JSONWebKeyOperation
    | JSONWebSignatureAndEncryptionAlgorithm
) {
  if (parameterValue instanceof JSONWebKeyType) {
    return KeyTypeMapping.fromJSONWebKeyType(parameterValue);
  } else if (parameterValue instanceof JSONWebKeyEllipticCurve) {
    return EllipticCurveMapping.fromJSONWebKeyEllipticCurve(parameterValue);
  } else if (parameterValue instanceof JSONWebKeyUse) {
    return parameterValue;
  } else if (parameterValue instanceof JSONWebKeyOperation) {
    return KeyOperationMapping.fromJSONWebKeyOperation(parameterValue);
  } else if (parameterValue instanceof JSONWebSignatureAndEncryptionAlgorithm) {
    return KeyAlgorithmMapping.fromJoseAlgorithm(parameterValue);
  }

  return null;
}
