import sha256 from "crypto-js/sha256";
import sha384 from "crypto-js/sha384";
import sha512 from "crypto-js/sha512";
import CryptoJS from "crypto-js";

const DIGEST_ALGS = {
  "SHA-256": sha256,
  "SHA-384": sha384,
  "SHA-512": sha512,
} as { [key: string]: typeof sha256 };

export function getRandomBytes(len: number) {
  // const rand1 = crypto.randomBytes(len);
  return word2Buffer(CryptoJS.lib.WordArray.random(32));
}

export function hash(data, algo) {
  // const hash1 = crypto.createHash(DIGEST_ALGS[algo]).update(data).digest();
  const fn = DIGEST_ALGS[algo]
  const words = fn(CryptoJS.enc.Hex.parse(data.toString("hex")));
  return word2Buffer(words);
}

function word2Buffer(wordArray) {
  const l = wordArray.sigBytes;
  const words = wordArray.words;
  const result = new Uint8Array(l);
  var i = 0 /*dst*/,
    j = 0; /*src*/
  while (true) {
    // here i is a multiple of 4
    if (i == l) break;
    var w = words[j++];
    result[i++] = (w & 0xff000000) >>> 24;
    if (i == l) break;
    result[i++] = (w & 0x00ff0000) >>> 16;
    if (i == l) break;
    result[i++] = (w & 0x0000ff00) >>> 8;
    if (i == l) break;
    result[i++] = w & 0x000000ff;
  }
  return result;
}
