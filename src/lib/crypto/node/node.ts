import crypto from "node:crypto";

const DIGEST_ALGS = {
  "SHA-256": "sha256",
  "SHA-384": "sha384",
  "SHA-512": "sha512",
} as { [key: string]: string };

export function getRandomBytes(len: number) {
  return crypto.randomBytes(len);
}

export function hash(data, algo) {
  return crypto.createHash(DIGEST_ALGS[algo]).update(data).digest();
}
