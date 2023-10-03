import crypto from './webcrypto.js'

const DIGEST_ALGS = {
  "SHA-256": "sha256",
  "SHA-384": "sha384",
  "SHA-512": "sha512",
} as { [key: string]: string };

export function getRandomBytes(len: number) {
  return crypto.getRandomValues(new Uint8Array(len))
}

export async function hash(data, algo) {
  return new Uint8Array(await crypto.subtle.digest(algo, data))
}
