var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target2, all) => {
  for (var name in all)
    __defProp(target2, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target2) => (target2 = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target2, "default", { value: mod, enumerable: true }) : target2,
  mod
));

// node_modules/base64url/dist/pad-string.js
var require_pad_string = __commonJS({
  "node_modules/base64url/dist/pad-string.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function padString(input) {
      var segmentLength = 4;
      var stringLength = input.length;
      var diff = stringLength % segmentLength;
      if (!diff) {
        return input;
      }
      var position3 = stringLength;
      var padLength = segmentLength - diff;
      var paddedStringLength = stringLength + padLength;
      var buffer = Buffer.alloc(paddedStringLength);
      buffer.write(input);
      while (padLength--) {
        buffer.write("=", position3++);
      }
      return buffer.toString();
    }
    exports.default = padString;
  }
});

// node_modules/base64url/dist/base64url.js
var require_base64url = __commonJS({
  "node_modules/base64url/dist/base64url.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var pad_string_1 = require_pad_string();
    function encode3(input, encoding) {
      if (encoding === void 0) {
        encoding = "utf8";
      }
      if (Buffer.isBuffer(input)) {
        return fromBase642(input.toString("base64"));
      }
      return fromBase642(Buffer.from(input, encoding).toString("base64"));
    }
    function decode4(base64url2, encoding) {
      if (encoding === void 0) {
        encoding = "utf8";
      }
      return Buffer.from(toBase642(base64url2), "base64").toString(encoding);
    }
    function toBase642(base64url2) {
      base64url2 = base64url2.toString();
      return pad_string_1.default(base64url2).replace(/\-/g, "+").replace(/_/g, "/");
    }
    function fromBase642(base64) {
      return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
    }
    function toBuffer(base64url2) {
      return Buffer.from(toBase642(base64url2), "base64");
    }
    var base64url = encode3;
    base64url.encode = encode3;
    base64url.decode = decode4;
    base64url.toBase64 = toBase642;
    base64url.fromBase64 = fromBase642;
    base64url.toBuffer = toBuffer;
    exports.default = base64url;
  }
});

// node_modules/base64url/index.js
var require_base64url2 = __commonJS({
  "node_modules/base64url/index.js"(exports, module) {
    module.exports = require_base64url().default;
    module.exports.default = module.exports;
  }
});

// node_modules/str2ab/dist/str2ab.js
var require_str2ab = __commonJS({
  "node_modules/str2ab/dist/str2ab.js"(exports) {
    "use strict";
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var base64url_1 = __importDefault(require_base64url2());
    function string2arraybuffer(str) {
      var buf = new ArrayBuffer(str.length * 2);
      var bufView = new Uint16Array(buf);
      for (var i = 0; i < str.length; i++) {
        bufView[i] = str.charCodeAt(i);
      }
      return buf;
    }
    function string2buffer(str) {
      return Buffer.from(str);
    }
    function string2base64url(str) {
      return base64url_1.default.encode(str);
    }
    function string2base64(str) {
      return base64url_1.default.toBase64(base64url_1.default.encode(str));
    }
    function arraybuffer2string(ab) {
      var uarr;
      if (ab.byteLength % 2 === 0) {
        uarr = new Uint16Array(ab);
      } else {
        uarr = new Uint8Array(ab);
      }
      var str = "";
      for (var i = 0; i < uarr.length; i++) {
        str += String.fromCharCode(uarr[i]);
      }
      return str;
    }
    function buffer2string(buffer) {
      return buffer.toString("utf8");
    }
    function base64url2arraybuffer(b64u) {
      var buf = base64url_1.default.toBuffer(b64u);
      return buffer2arraybuffer(buf);
    }
    function base64url2buffer(b64u) {
      return base64url_1.default.toBuffer(b64u);
    }
    function base64url2string(b64u) {
      return base64url_1.default.decode(b64u);
    }
    function base64url2base64(b64u) {
      return base64url_1.default.toBase64(b64u);
    }
    function arraybuffer2base64url(ab) {
      return base64url_1.default.encode(Buffer.from(ab), "utf8");
    }
    function buffer2base64url(buffer) {
      return base64url_1.default.encode(buffer, "utf8");
    }
    function arraybuffer2base64(ab) {
      return Buffer.from(ab).toString("base64");
    }
    function buffer2base64(buffer) {
      return buffer.toString("base64");
    }
    function base642arraybuffer(base64) {
      var buf = base64url_1.default.toBuffer(base64);
      return buffer2arraybuffer(buf);
    }
    function base642buffer(base64) {
      return base64url_1.default.toBuffer(base64);
    }
    function base642string(base64) {
      return base64url_1.default.decode(base64url_1.default.fromBase64(base64));
    }
    function base642base64url(base64) {
      return base64url_1.default.fromBase64(base64);
    }
    function buffer2arraybuffer(buffer) {
      return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
    }
    function arraybuffer2buffer(ab) {
      return Buffer.from(ab);
    }
    function isBase64url(input) {
      return /^[A-Za-z0-9-_]+$/.test(input);
    }
    function isBase64(input) {
      return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(input);
    }
    var str2ab2 = {
      string2arraybuffer,
      string2base64url,
      string2base64,
      string2buffer,
      arraybuffer2string,
      buffer2string,
      base64url2string,
      base64url2arraybuffer,
      base64url2base64,
      base64url2buffer,
      arraybuffer2base64url,
      buffer2base64url,
      arraybuffer2base64,
      buffer2base64,
      base642string,
      base642arraybuffer,
      base642base64url,
      base642buffer,
      buffer2arraybuffer,
      arraybuffer2buffer,
      isBase64url,
      isBase64
    };
    exports.default = str2ab2;
  }
});

// node_modules/str2ab/index.js
var require_str2ab2 = __commonJS({
  "node_modules/str2ab/index.js"(exports, module) {
    module.exports = require_str2ab().default;
    module.exports.default = module.exports;
  }
});

// node_modules/pvtsutils/build/index.js
var require_build = __commonJS({
  "node_modules/pvtsutils/build/index.js"(exports) {
    "use strict";
    var ARRAY_BUFFER_NAME = "[object ArrayBuffer]";
    var BufferSourceConverter4 = class _BufferSourceConverter {
      static isArrayBuffer(data) {
        return Object.prototype.toString.call(data) === ARRAY_BUFFER_NAME;
      }
      static toArrayBuffer(data) {
        if (this.isArrayBuffer(data)) {
          return data;
        }
        if (data.byteLength === data.buffer.byteLength) {
          return data.buffer;
        }
        if (data.byteOffset === 0 && data.byteLength === data.buffer.byteLength) {
          return data.buffer;
        }
        return this.toUint8Array(data.buffer).slice(data.byteOffset, data.byteOffset + data.byteLength).buffer;
      }
      static toUint8Array(data) {
        return this.toView(data, Uint8Array);
      }
      static toView(data, type) {
        if (data.constructor === type) {
          return data;
        }
        if (this.isArrayBuffer(data)) {
          return new type(data);
        }
        if (this.isArrayBufferView(data)) {
          return new type(data.buffer, data.byteOffset, data.byteLength);
        }
        throw new TypeError("The provided value is not of type '(ArrayBuffer or ArrayBufferView)'");
      }
      static isBufferSource(data) {
        return this.isArrayBufferView(data) || this.isArrayBuffer(data);
      }
      static isArrayBufferView(data) {
        return ArrayBuffer.isView(data) || data && this.isArrayBuffer(data.buffer);
      }
      static isEqual(a, b) {
        const aView = _BufferSourceConverter.toUint8Array(a);
        const bView = _BufferSourceConverter.toUint8Array(b);
        if (aView.length !== bView.byteLength) {
          return false;
        }
        for (let i = 0; i < aView.length; i++) {
          if (aView[i] !== bView[i]) {
            return false;
          }
        }
        return true;
      }
      static concat(...args) {
        let buffers;
        if (Array.isArray(args[0]) && !(args[1] instanceof Function)) {
          buffers = args[0];
        } else if (Array.isArray(args[0]) && args[1] instanceof Function) {
          buffers = args[0];
        } else {
          if (args[args.length - 1] instanceof Function) {
            buffers = args.slice(0, args.length - 1);
          } else {
            buffers = args;
          }
        }
        let size = 0;
        for (const buffer of buffers) {
          size += buffer.byteLength;
        }
        const res = new Uint8Array(size);
        let offset = 0;
        for (const buffer of buffers) {
          const view = this.toUint8Array(buffer);
          res.set(view, offset);
          offset += view.length;
        }
        if (args[args.length - 1] instanceof Function) {
          return this.toView(res, args[args.length - 1]);
        }
        return res.buffer;
      }
    };
    var STRING_TYPE = "string";
    var HEX_REGEX = /^[0-9a-f]+$/i;
    var BASE64_REGEX = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
    var BASE64URL_REGEX = /^[a-zA-Z0-9-_]+$/;
    var Utf8Converter = class {
      static fromString(text) {
        const s = unescape(encodeURIComponent(text));
        const uintArray = new Uint8Array(s.length);
        for (let i = 0; i < s.length; i++) {
          uintArray[i] = s.charCodeAt(i);
        }
        return uintArray.buffer;
      }
      static toString(buffer) {
        const buf = BufferSourceConverter4.toUint8Array(buffer);
        let encodedString = "";
        for (let i = 0; i < buf.length; i++) {
          encodedString += String.fromCharCode(buf[i]);
        }
        const decodedString = decodeURIComponent(escape(encodedString));
        return decodedString;
      }
    };
    var Utf16Converter = class {
      static toString(buffer, littleEndian = false) {
        const arrayBuffer = BufferSourceConverter4.toArrayBuffer(buffer);
        const dataView2 = new DataView(arrayBuffer);
        let res = "";
        for (let i = 0; i < arrayBuffer.byteLength; i += 2) {
          const code = dataView2.getUint16(i, littleEndian);
          res += String.fromCharCode(code);
        }
        return res;
      }
      static fromString(text, littleEndian = false) {
        const res = new ArrayBuffer(text.length * 2);
        const dataView2 = new DataView(res);
        for (let i = 0; i < text.length; i++) {
          dataView2.setUint16(i * 2, text.charCodeAt(i), littleEndian);
        }
        return res;
      }
    };
    var Convert3 = class _Convert {
      static isHex(data) {
        return typeof data === STRING_TYPE && HEX_REGEX.test(data);
      }
      static isBase64(data) {
        return typeof data === STRING_TYPE && BASE64_REGEX.test(data);
      }
      static isBase64Url(data) {
        return typeof data === STRING_TYPE && BASE64URL_REGEX.test(data);
      }
      static ToString(buffer, enc = "utf8") {
        const buf = BufferSourceConverter4.toUint8Array(buffer);
        switch (enc.toLowerCase()) {
          case "utf8":
            return this.ToUtf8String(buf);
          case "binary":
            return this.ToBinary(buf);
          case "hex":
            return this.ToHex(buf);
          case "base64":
            return this.ToBase64(buf);
          case "base64url":
            return this.ToBase64Url(buf);
          case "utf16le":
            return Utf16Converter.toString(buf, true);
          case "utf16":
          case "utf16be":
            return Utf16Converter.toString(buf);
          default:
            throw new Error(`Unknown type of encoding '${enc}'`);
        }
      }
      static FromString(str, enc = "utf8") {
        if (!str) {
          return new ArrayBuffer(0);
        }
        switch (enc.toLowerCase()) {
          case "utf8":
            return this.FromUtf8String(str);
          case "binary":
            return this.FromBinary(str);
          case "hex":
            return this.FromHex(str);
          case "base64":
            return this.FromBase64(str);
          case "base64url":
            return this.FromBase64Url(str);
          case "utf16le":
            return Utf16Converter.fromString(str, true);
          case "utf16":
          case "utf16be":
            return Utf16Converter.fromString(str);
          default:
            throw new Error(`Unknown type of encoding '${enc}'`);
        }
      }
      static ToBase64(buffer) {
        const buf = BufferSourceConverter4.toUint8Array(buffer);
        if (typeof btoa !== "undefined") {
          const binary = this.ToString(buf, "binary");
          return btoa(binary);
        } else {
          return Buffer.from(buf).toString("base64");
        }
      }
      static FromBase64(base64) {
        const formatted = this.formatString(base64);
        if (!formatted) {
          return new ArrayBuffer(0);
        }
        if (!_Convert.isBase64(formatted)) {
          throw new TypeError("Argument 'base64Text' is not Base64 encoded");
        }
        if (typeof atob !== "undefined") {
          return this.FromBinary(atob(formatted));
        } else {
          return new Uint8Array(Buffer.from(formatted, "base64")).buffer;
        }
      }
      static FromBase64Url(base64url) {
        const formatted = this.formatString(base64url);
        if (!formatted) {
          return new ArrayBuffer(0);
        }
        if (!_Convert.isBase64Url(formatted)) {
          throw new TypeError("Argument 'base64url' is not Base64Url encoded");
        }
        return this.FromBase64(this.Base64Padding(formatted.replace(/\-/g, "+").replace(/\_/g, "/")));
      }
      static ToBase64Url(data) {
        return this.ToBase64(data).replace(/\+/g, "-").replace(/\//g, "_").replace(/\=/g, "");
      }
      static FromUtf8String(text, encoding = _Convert.DEFAULT_UTF8_ENCODING) {
        switch (encoding) {
          case "ascii":
            return this.FromBinary(text);
          case "utf8":
            return Utf8Converter.fromString(text);
          case "utf16":
          case "utf16be":
            return Utf16Converter.fromString(text);
          case "utf16le":
          case "usc2":
            return Utf16Converter.fromString(text, true);
          default:
            throw new Error(`Unknown type of encoding '${encoding}'`);
        }
      }
      static ToUtf8String(buffer, encoding = _Convert.DEFAULT_UTF8_ENCODING) {
        switch (encoding) {
          case "ascii":
            return this.ToBinary(buffer);
          case "utf8":
            return Utf8Converter.toString(buffer);
          case "utf16":
          case "utf16be":
            return Utf16Converter.toString(buffer);
          case "utf16le":
          case "usc2":
            return Utf16Converter.toString(buffer, true);
          default:
            throw new Error(`Unknown type of encoding '${encoding}'`);
        }
      }
      static FromBinary(text) {
        const stringLength = text.length;
        const resultView = new Uint8Array(stringLength);
        for (let i = 0; i < stringLength; i++) {
          resultView[i] = text.charCodeAt(i);
        }
        return resultView.buffer;
      }
      static ToBinary(buffer) {
        const buf = BufferSourceConverter4.toUint8Array(buffer);
        let res = "";
        for (let i = 0; i < buf.length; i++) {
          res += String.fromCharCode(buf[i]);
        }
        return res;
      }
      static ToHex(buffer) {
        const buf = BufferSourceConverter4.toUint8Array(buffer);
        let result = "";
        const len = buf.length;
        for (let i = 0; i < len; i++) {
          const byte = buf[i];
          if (byte < 16) {
            result += "0";
          }
          result += byte.toString(16);
        }
        return result;
      }
      static FromHex(hexString) {
        let formatted = this.formatString(hexString);
        if (!formatted) {
          return new ArrayBuffer(0);
        }
        if (!_Convert.isHex(formatted)) {
          throw new TypeError("Argument 'hexString' is not HEX encoded");
        }
        if (formatted.length % 2) {
          formatted = `0${formatted}`;
        }
        const res = new Uint8Array(formatted.length / 2);
        for (let i = 0; i < formatted.length; i = i + 2) {
          const c = formatted.slice(i, i + 2);
          res[i / 2] = parseInt(c, 16);
        }
        return res.buffer;
      }
      static ToUtf16String(buffer, littleEndian = false) {
        return Utf16Converter.toString(buffer, littleEndian);
      }
      static FromUtf16String(text, littleEndian = false) {
        return Utf16Converter.fromString(text, littleEndian);
      }
      static Base64Padding(base64) {
        const padCount = 4 - base64.length % 4;
        if (padCount < 4) {
          for (let i = 0; i < padCount; i++) {
            base64 += "=";
          }
        }
        return base64;
      }
      static formatString(data) {
        return (data === null || data === void 0 ? void 0 : data.replace(/[\n\r\t ]/g, "")) || "";
      }
    };
    Convert3.DEFAULT_UTF8_ENCODING = "utf8";
    function assign(target2, ...sources) {
      const res = arguments[0];
      for (let i = 1; i < arguments.length; i++) {
        const obj = arguments[i];
        for (const prop in obj) {
          res[prop] = obj[prop];
        }
      }
      return res;
    }
    function combine2(...buf) {
      const totalByteLength = buf.map((item) => item.byteLength).reduce((prev, cur) => prev + cur);
      const res = new Uint8Array(totalByteLength);
      let currentPos = 0;
      buf.map((item) => new Uint8Array(item)).forEach((arr) => {
        for (const item2 of arr) {
          res[currentPos++] = item2;
        }
      });
      return res.buffer;
    }
    function isEqual(bytes1, bytes2) {
      if (!(bytes1 && bytes2)) {
        return false;
      }
      if (bytes1.byteLength !== bytes2.byteLength) {
        return false;
      }
      const b1 = new Uint8Array(bytes1);
      const b2 = new Uint8Array(bytes2);
      for (let i = 0; i < bytes1.byteLength; i++) {
        if (b1[i] !== b2[i]) {
          return false;
        }
      }
      return true;
    }
    exports.BufferSourceConverter = BufferSourceConverter4;
    exports.Convert = Convert3;
    exports.assign = assign;
    exports.combine = combine2;
    exports.isEqual = isEqual;
  }
});

// src/lib/config.ts
var MDL_FIELDS = [
  { id: "family_name", required: true, encoding: "tsrt" },
  { id: "given_name", required: true, encoding: "tsrt" },
  { id: "birth_date", required: true, encoding: "full-date" },
  {
    id: "issue_date",
    required: true,
    encoding: "full-date"
    /* or tdate */
  },
  {
    id: "expiry_date",
    required: true,
    encoding: "full-date"
    /* or tdate */
  },
  { id: "issuing_country", required: true, encoding: "tstr" },
  { id: "authority", required: true, encoding: "tstr" },
  { id: "document_number", required: true, encoding: "tstr" },
  { id: "portrait", required: true, encoding: "bstr" },
  { id: "driving_privileges", required: true, encoding: "DrivingPrivileges" },
  { id: "un_distinguishing_sign", required: true, encoding: "tsrt" },
  // ISO/IEC 18013-1:2018, Annex F
  // Optional
  { id: "administrative_number", required: false, encoding: "tsrt" },
  { id: "sex", required: false, encoding: "uint" },
  // ISO/IEC 5218
  { id: "height", required: false, encoding: "uint" },
  // in cm
  { id: "weight", required: false, encoding: "uint" },
  // in kg
  { id: "eye_colour", required: false, encoding: "tstr" },
  // black, blue, brown, dichromatic, grey, green, hazel, maroon, pink, unknown
  { id: "hair_colour", required: false, encoding: "tstr" },
  // bald, black, blond, brown, grey, red, auburn, sandy, white, unknown
  { id: "resident_address", required: false, encoding: "tstr" },
  { id: "portrait_capture_date", required: false, encoding: "tdate" },
  { id: "age_in_years", required: false, encoding: "uint" },
  { id: "age_birth_year", required: false, encoding: "uint" },
  { id: "age_over_NN", required: false, encoding: "bool" },
  { id: "issuing_jurisdiction", required: false, encoding: "tstr" },
  // ISO 3166-2:2020, Clause 8
  { id: "nationality", required: false, encoding: "tstr" },
  // ISO 3166-1
  { id: "resident_city", required: false, encoding: "tstr" },
  { id: "resident_state", required: false, encoding: "tstr" },
  { id: "resident_postal_code", required: false, encoding: "tstr" },
  { id: "resident_country", required: false, encoding: "tstr" },
  { id: "biometric_template_xx", required: false, encoding: "bstr" },
  { id: "family_name_national_character", required: false, encoding: "tstr" }
];
var TAG_MAP = {
  birth_date: 1004,
  issue_date: 1004,
  expiry_date: 1004
};

// node_modules/cbor-x/decode.js
var decoder;
try {
  decoder = new TextDecoder();
} catch (error) {
}
var src;
var srcEnd;
var position = 0;
var EMPTY_ARRAY = [];
var LEGACY_RECORD_INLINE_ID = 105;
var RECORD_DEFINITIONS_ID = 57342;
var RECORD_INLINE_ID = 57343;
var BUNDLED_STRINGS_ID = 57337;
var PACKED_REFERENCE_TAG_ID = 6;
var STOP_CODE = {};
var strings = EMPTY_ARRAY;
var stringPosition = 0;
var currentDecoder = {};
var currentStructures;
var srcString;
var srcStringStart = 0;
var srcStringEnd = 0;
var bundledStrings;
var referenceMap;
var currentExtensions = [];
var currentExtensionRanges = [];
var packedValues;
var dataView;
var restoreMapsAsObject;
var defaultOptions = {
  useRecords: false,
  mapsAsObjects: true
};
var sequentialMode = false;
var inlineObjectReadThreshold = 2;
try {
  new Function("");
} catch (error) {
  inlineObjectReadThreshold = Infinity;
}
var Decoder = class _Decoder {
  constructor(options) {
    if (options) {
      if ((options.keyMap || options._keyMap) && !options.useRecords) {
        options.useRecords = false;
        options.mapsAsObjects = true;
      }
      if (options.useRecords === false && options.mapsAsObjects === void 0)
        options.mapsAsObjects = true;
      if (options.getStructures)
        options.getShared = options.getStructures;
      if (options.getShared && !options.structures)
        (options.structures = []).uninitialized = true;
      if (options.keyMap) {
        this.mapKey = /* @__PURE__ */ new Map();
        for (let [k, v] of Object.entries(options.keyMap))
          this.mapKey.set(v, k);
      }
    }
    Object.assign(this, options);
  }
  /*
  decodeKey(key) {
  	return this.keyMap
  		? Object.keys(this.keyMap)[Object.values(this.keyMap).indexOf(key)] || key
  		: key
  }
  */
  decodeKey(key) {
    return this.keyMap ? this.mapKey.get(key) || key : key;
  }
  encodeKey(key) {
    return this.keyMap && this.keyMap.hasOwnProperty(key) ? this.keyMap[key] : key;
  }
  encodeKeys(rec) {
    if (!this._keyMap)
      return rec;
    let map = /* @__PURE__ */ new Map();
    for (let [k, v] of Object.entries(rec))
      map.set(this._keyMap.hasOwnProperty(k) ? this._keyMap[k] : k, v);
    return map;
  }
  decodeKeys(map) {
    if (!this._keyMap || map.constructor.name != "Map")
      return map;
    if (!this._mapKey) {
      this._mapKey = /* @__PURE__ */ new Map();
      for (let [k, v] of Object.entries(this._keyMap))
        this._mapKey.set(v, k);
    }
    let res = {};
    map.forEach((v, k) => res[safeKey(this._mapKey.has(k) ? this._mapKey.get(k) : k)] = v);
    return res;
  }
  mapDecode(source, end) {
    let res = this.decode(source);
    if (this._keyMap) {
      switch (res.constructor.name) {
        case "Array":
          return res.map((r) => this.decodeKeys(r));
      }
    }
    return res;
  }
  decode(source, end) {
    if (src) {
      return saveState(() => {
        clearSource();
        return this ? this.decode(source, end) : _Decoder.prototype.decode.call(defaultOptions, source, end);
      });
    }
    srcEnd = end > -1 ? end : source.length;
    position = 0;
    stringPosition = 0;
    srcStringEnd = 0;
    srcString = null;
    strings = EMPTY_ARRAY;
    bundledStrings = null;
    src = source;
    try {
      dataView = source.dataView || (source.dataView = new DataView(source.buffer, source.byteOffset, source.byteLength));
    } catch (error) {
      src = null;
      if (source instanceof Uint8Array)
        throw error;
      throw new Error("Source must be a Uint8Array or Buffer but was a " + (source && typeof source == "object" ? source.constructor.name : typeof source));
    }
    if (this instanceof _Decoder) {
      currentDecoder = this;
      packedValues = this.sharedValues && (this.pack ? new Array(this.maxPrivatePackedValues || 16).concat(this.sharedValues) : this.sharedValues);
      if (this.structures) {
        currentStructures = this.structures;
        return checkedRead();
      } else if (!currentStructures || currentStructures.length > 0) {
        currentStructures = [];
      }
    } else {
      currentDecoder = defaultOptions;
      if (!currentStructures || currentStructures.length > 0)
        currentStructures = [];
      packedValues = null;
    }
    return checkedRead();
  }
  decodeMultiple(source, forEach) {
    let values, lastPosition = 0;
    try {
      let size = source.length;
      sequentialMode = true;
      let value = this ? this.decode(source, size) : defaultDecoder.decode(source, size);
      if (forEach) {
        if (forEach(value) === false) {
          return;
        }
        while (position < size) {
          lastPosition = position;
          if (forEach(checkedRead()) === false) {
            return;
          }
        }
      } else {
        values = [value];
        while (position < size) {
          lastPosition = position;
          values.push(checkedRead());
        }
        return values;
      }
    } catch (error) {
      error.lastPosition = lastPosition;
      error.values = values;
      throw error;
    } finally {
      sequentialMode = false;
      clearSource();
    }
  }
};
function checkedRead() {
  try {
    let result = read();
    if (bundledStrings) {
      if (position >= bundledStrings.postBundlePosition) {
        let error = new Error("Unexpected bundle position");
        error.incomplete = true;
        throw error;
      }
      position = bundledStrings.postBundlePosition;
      bundledStrings = null;
    }
    if (position == srcEnd) {
      currentStructures = null;
      src = null;
      if (referenceMap)
        referenceMap = null;
    } else if (position > srcEnd) {
      let error = new Error("Unexpected end of CBOR data");
      error.incomplete = true;
      throw error;
    } else if (!sequentialMode) {
      throw new Error("Data read, but end of buffer not reached");
    }
    return result;
  } catch (error) {
    clearSource();
    if (error instanceof RangeError || error.message.startsWith("Unexpected end of buffer")) {
      error.incomplete = true;
    }
    throw error;
  }
}
function read() {
  let token = src[position++];
  let majorType = token >> 5;
  token = token & 31;
  if (token > 23) {
    switch (token) {
      case 24:
        token = src[position++];
        break;
      case 25:
        if (majorType == 7) {
          return getFloat16();
        }
        token = dataView.getUint16(position);
        position += 2;
        break;
      case 26:
        if (majorType == 7) {
          let value = dataView.getFloat32(position);
          if (currentDecoder.useFloat32 > 2) {
            let multiplier = mult10[(src[position] & 127) << 1 | src[position + 1] >> 7];
            position += 4;
            return (multiplier * value + (value > 0 ? 0.5 : -0.5) >> 0) / multiplier;
          }
          position += 4;
          return value;
        }
        token = dataView.getUint32(position);
        position += 4;
        break;
      case 27:
        if (majorType == 7) {
          let value = dataView.getFloat64(position);
          position += 8;
          return value;
        }
        if (majorType > 1) {
          if (dataView.getUint32(position) > 0)
            throw new Error("JavaScript does not support arrays, maps, or strings with length over 4294967295");
          token = dataView.getUint32(position + 4);
        } else if (currentDecoder.int64AsNumber) {
          token = dataView.getUint32(position) * 4294967296;
          token += dataView.getUint32(position + 4);
        } else
          token = dataView.getBigUint64(position);
        position += 8;
        break;
      case 31:
        switch (majorType) {
          case 2:
          case 3:
            throw new Error("Indefinite length not supported for byte or text strings");
          case 4:
            let array = [];
            let value, i = 0;
            while ((value = read()) != STOP_CODE) {
              array[i++] = value;
            }
            return majorType == 4 ? array : majorType == 3 ? array.join("") : Buffer.concat(array);
          case 5:
            let key;
            if (currentDecoder.mapsAsObjects) {
              let object = {};
              if (currentDecoder.keyMap)
                while ((key = read()) != STOP_CODE)
                  object[safeKey(currentDecoder.decodeKey(key))] = read();
              else
                while ((key = read()) != STOP_CODE)
                  object[safeKey(key)] = read();
              return object;
            } else {
              if (restoreMapsAsObject) {
                currentDecoder.mapsAsObjects = true;
                restoreMapsAsObject = false;
              }
              let map = /* @__PURE__ */ new Map();
              if (currentDecoder.keyMap)
                while ((key = read()) != STOP_CODE)
                  map.set(currentDecoder.decodeKey(key), read());
              else
                while ((key = read()) != STOP_CODE)
                  map.set(key, read());
              return map;
            }
          case 7:
            return STOP_CODE;
          default:
            throw new Error("Invalid major type for indefinite length " + majorType);
        }
      default:
        throw new Error("Unknown token " + token);
    }
  }
  switch (majorType) {
    case 0:
      return token;
    case 1:
      return ~token;
    case 2:
      return readBin(token);
    case 3:
      if (srcStringEnd >= position) {
        return srcString.slice(position - srcStringStart, (position += token) - srcStringStart);
      }
      if (srcStringEnd == 0 && srcEnd < 140 && token < 32) {
        let string = token < 16 ? shortStringInJS(token) : longStringInJS(token);
        if (string != null)
          return string;
      }
      return readFixedString(token);
    case 4:
      let array = new Array(token);
      for (let i = 0; i < token; i++)
        array[i] = read();
      return array;
    case 5:
      if (currentDecoder.mapsAsObjects) {
        let object = {};
        if (currentDecoder.keyMap)
          for (let i = 0; i < token; i++)
            object[safeKey(currentDecoder.decodeKey(read()))] = read();
        else
          for (let i = 0; i < token; i++)
            object[safeKey(read())] = read();
        return object;
      } else {
        if (restoreMapsAsObject) {
          currentDecoder.mapsAsObjects = true;
          restoreMapsAsObject = false;
        }
        let map = /* @__PURE__ */ new Map();
        if (currentDecoder.keyMap)
          for (let i = 0; i < token; i++)
            map.set(currentDecoder.decodeKey(read()), read());
        else
          for (let i = 0; i < token; i++)
            map.set(read(), read());
        return map;
      }
    case 6:
      if (token >= BUNDLED_STRINGS_ID) {
        let structure = currentStructures[token & 8191];
        if (structure) {
          if (!structure.read)
            structure.read = createStructureReader(structure);
          return structure.read();
        }
        if (token < 65536) {
          if (token == RECORD_INLINE_ID) {
            let length = readJustLength();
            let id = read();
            let structure2 = read();
            recordDefinition(id, structure2);
            let object = {};
            if (currentDecoder.keyMap)
              for (let i = 2; i < length; i++) {
                let key = currentDecoder.decodeKey(structure2[i - 2]);
                object[safeKey(key)] = read();
              }
            else
              for (let i = 2; i < length; i++) {
                let key = structure2[i - 2];
                object[safeKey(key)] = read();
              }
            return object;
          } else if (token == RECORD_DEFINITIONS_ID) {
            let length = readJustLength();
            let id = read();
            for (let i = 2; i < length; i++) {
              recordDefinition(id++, read());
            }
            return read();
          } else if (token == BUNDLED_STRINGS_ID) {
            return readBundleExt();
          }
          if (currentDecoder.getShared) {
            loadShared();
            structure = currentStructures[token & 8191];
            if (structure) {
              if (!structure.read)
                structure.read = createStructureReader(structure);
              return structure.read();
            }
          }
        }
      }
      let extension = currentExtensions[token];
      if (extension) {
        if (extension.handlesRead)
          return extension(read);
        else
          return extension(read());
      } else {
        let input = read();
        for (let i = 0; i < currentExtensionRanges.length; i++) {
          let value = currentExtensionRanges[i](token, input);
          if (value !== void 0)
            return value;
        }
        return new Tag(input, token);
      }
    case 7:
      switch (token) {
        case 20:
          return false;
        case 21:
          return true;
        case 22:
          return null;
        case 23:
          return;
        case 31:
        default:
          let packedValue = (packedValues || getPackedValues())[token];
          if (packedValue !== void 0)
            return packedValue;
          throw new Error("Unknown token " + token);
      }
    default:
      if (isNaN(token)) {
        let error = new Error("Unexpected end of CBOR data");
        error.incomplete = true;
        throw error;
      }
      throw new Error("Unknown CBOR token " + token);
  }
}
var validName = /^[a-zA-Z_$][a-zA-Z\d_$]*$/;
function createStructureReader(structure) {
  function readObject() {
    let length = src[position++];
    length = length & 31;
    if (length > 23) {
      switch (length) {
        case 24:
          length = src[position++];
          break;
        case 25:
          length = dataView.getUint16(position);
          position += 2;
          break;
        case 26:
          length = dataView.getUint32(position);
          position += 4;
          break;
        default:
          throw new Error("Expected array header, but got " + src[position - 1]);
      }
    }
    let compiledReader = this.compiledReader;
    while (compiledReader) {
      if (compiledReader.propertyCount === length)
        return compiledReader(read);
      compiledReader = compiledReader.next;
    }
    if (this.slowReads++ >= inlineObjectReadThreshold) {
      let array = this.length == length ? this : this.slice(0, length);
      compiledReader = currentDecoder.keyMap ? new Function("r", "return {" + array.map((k) => currentDecoder.decodeKey(k)).map((k) => validName.test(k) ? safeKey(k) + ":r()" : "[" + JSON.stringify(k) + "]:r()").join(",") + "}") : new Function("r", "return {" + array.map((key) => validName.test(key) ? safeKey(key) + ":r()" : "[" + JSON.stringify(key) + "]:r()").join(",") + "}");
      if (this.compiledReader)
        compiledReader.next = this.compiledReader;
      compiledReader.propertyCount = length;
      this.compiledReader = compiledReader;
      return compiledReader(read);
    }
    let object = {};
    if (currentDecoder.keyMap)
      for (let i = 0; i < length; i++)
        object[safeKey(currentDecoder.decodeKey(this[i]))] = read();
    else
      for (let i = 0; i < length; i++) {
        object[safeKey(this[i])] = read();
      }
    return object;
  }
  structure.slowReads = 0;
  return readObject;
}
function safeKey(key) {
  return key === "__proto__" ? "__proto_" : key;
}
var readFixedString = readStringJS;
function readStringJS(length) {
  let result;
  if (length < 16) {
    if (result = shortStringInJS(length))
      return result;
  }
  if (length > 64 && decoder)
    return decoder.decode(src.subarray(position, position += length));
  const end = position + length;
  const units = [];
  result = "";
  while (position < end) {
    const byte1 = src[position++];
    if ((byte1 & 128) === 0) {
      units.push(byte1);
    } else if ((byte1 & 224) === 192) {
      const byte2 = src[position++] & 63;
      units.push((byte1 & 31) << 6 | byte2);
    } else if ((byte1 & 240) === 224) {
      const byte2 = src[position++] & 63;
      const byte3 = src[position++] & 63;
      units.push((byte1 & 31) << 12 | byte2 << 6 | byte3);
    } else if ((byte1 & 248) === 240) {
      const byte2 = src[position++] & 63;
      const byte3 = src[position++] & 63;
      const byte4 = src[position++] & 63;
      let unit = (byte1 & 7) << 18 | byte2 << 12 | byte3 << 6 | byte4;
      if (unit > 65535) {
        unit -= 65536;
        units.push(unit >>> 10 & 1023 | 55296);
        unit = 56320 | unit & 1023;
      }
      units.push(unit);
    } else {
      units.push(byte1);
    }
    if (units.length >= 4096) {
      result += fromCharCode.apply(String, units);
      units.length = 0;
    }
  }
  if (units.length > 0) {
    result += fromCharCode.apply(String, units);
  }
  return result;
}
var fromCharCode = String.fromCharCode;
function longStringInJS(length) {
  let start = position;
  let bytes = new Array(length);
  for (let i = 0; i < length; i++) {
    const byte = src[position++];
    if ((byte & 128) > 0) {
      position = start;
      return;
    }
    bytes[i] = byte;
  }
  return fromCharCode.apply(String, bytes);
}
function shortStringInJS(length) {
  if (length < 4) {
    if (length < 2) {
      if (length === 0)
        return "";
      else {
        let a = src[position++];
        if ((a & 128) > 1) {
          position -= 1;
          return;
        }
        return fromCharCode(a);
      }
    } else {
      let a = src[position++];
      let b = src[position++];
      if ((a & 128) > 0 || (b & 128) > 0) {
        position -= 2;
        return;
      }
      if (length < 3)
        return fromCharCode(a, b);
      let c = src[position++];
      if ((c & 128) > 0) {
        position -= 3;
        return;
      }
      return fromCharCode(a, b, c);
    }
  } else {
    let a = src[position++];
    let b = src[position++];
    let c = src[position++];
    let d = src[position++];
    if ((a & 128) > 0 || (b & 128) > 0 || (c & 128) > 0 || (d & 128) > 0) {
      position -= 4;
      return;
    }
    if (length < 6) {
      if (length === 4)
        return fromCharCode(a, b, c, d);
      else {
        let e = src[position++];
        if ((e & 128) > 0) {
          position -= 5;
          return;
        }
        return fromCharCode(a, b, c, d, e);
      }
    } else if (length < 8) {
      let e = src[position++];
      let f = src[position++];
      if ((e & 128) > 0 || (f & 128) > 0) {
        position -= 6;
        return;
      }
      if (length < 7)
        return fromCharCode(a, b, c, d, e, f);
      let g = src[position++];
      if ((g & 128) > 0) {
        position -= 7;
        return;
      }
      return fromCharCode(a, b, c, d, e, f, g);
    } else {
      let e = src[position++];
      let f = src[position++];
      let g = src[position++];
      let h = src[position++];
      if ((e & 128) > 0 || (f & 128) > 0 || (g & 128) > 0 || (h & 128) > 0) {
        position -= 8;
        return;
      }
      if (length < 10) {
        if (length === 8)
          return fromCharCode(a, b, c, d, e, f, g, h);
        else {
          let i = src[position++];
          if ((i & 128) > 0) {
            position -= 9;
            return;
          }
          return fromCharCode(a, b, c, d, e, f, g, h, i);
        }
      } else if (length < 12) {
        let i = src[position++];
        let j = src[position++];
        if ((i & 128) > 0 || (j & 128) > 0) {
          position -= 10;
          return;
        }
        if (length < 11)
          return fromCharCode(a, b, c, d, e, f, g, h, i, j);
        let k = src[position++];
        if ((k & 128) > 0) {
          position -= 11;
          return;
        }
        return fromCharCode(a, b, c, d, e, f, g, h, i, j, k);
      } else {
        let i = src[position++];
        let j = src[position++];
        let k = src[position++];
        let l = src[position++];
        if ((i & 128) > 0 || (j & 128) > 0 || (k & 128) > 0 || (l & 128) > 0) {
          position -= 12;
          return;
        }
        if (length < 14) {
          if (length === 12)
            return fromCharCode(a, b, c, d, e, f, g, h, i, j, k, l);
          else {
            let m = src[position++];
            if ((m & 128) > 0) {
              position -= 13;
              return;
            }
            return fromCharCode(a, b, c, d, e, f, g, h, i, j, k, l, m);
          }
        } else {
          let m = src[position++];
          let n = src[position++];
          if ((m & 128) > 0 || (n & 128) > 0) {
            position -= 14;
            return;
          }
          if (length < 15)
            return fromCharCode(a, b, c, d, e, f, g, h, i, j, k, l, m, n);
          let o = src[position++];
          if ((o & 128) > 0) {
            position -= 15;
            return;
          }
          return fromCharCode(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o);
        }
      }
    }
  }
}
function readBin(length) {
  return currentDecoder.copyBuffers ? (
    // specifically use the copying slice (not the node one)
    Uint8Array.prototype.slice.call(src, position, position += length)
  ) : src.subarray(position, position += length);
}
var f32Array = new Float32Array(1);
var u8Array = new Uint8Array(f32Array.buffer, 0, 4);
function getFloat16() {
  let byte0 = src[position++];
  let byte1 = src[position++];
  let exponent = (byte0 & 127) >> 2;
  if (exponent === 31) {
    if (byte1 || byte0 & 3)
      return NaN;
    return byte0 & 128 ? -Infinity : Infinity;
  }
  if (exponent === 0) {
    let abs = ((byte0 & 3) << 8 | byte1) / (1 << 24);
    return byte0 & 128 ? -abs : abs;
  }
  u8Array[3] = byte0 & 128 | // sign bit
  (exponent >> 1) + 56;
  u8Array[2] = (byte0 & 7) << 5 | // last exponent bit and first two mantissa bits
  byte1 >> 3;
  u8Array[1] = byte1 << 5;
  u8Array[0] = 0;
  return f32Array[0];
}
var keyCache = new Array(4096);
var Tag = class {
  constructor(value, tag) {
    this.value = value;
    this.tag = tag;
  }
};
currentExtensions[0] = (dateString) => {
  return new Date(dateString);
};
currentExtensions[1] = (epochSec) => {
  return new Date(Math.round(epochSec * 1e3));
};
currentExtensions[2] = (buffer) => {
  let value = BigInt(0);
  for (let i = 0, l = buffer.byteLength; i < l; i++) {
    value = BigInt(buffer[i]) + value << BigInt(8);
  }
  return value;
};
currentExtensions[3] = (buffer) => {
  return BigInt(-1) - currentExtensions[2](buffer);
};
currentExtensions[4] = (fraction) => {
  return +(fraction[1] + "e" + fraction[0]);
};
currentExtensions[5] = (fraction) => {
  return fraction[1] * Math.exp(fraction[0] * Math.log(2));
};
var recordDefinition = (id, structure) => {
  id = id - 57344;
  let existingStructure = currentStructures[id];
  if (existingStructure && existingStructure.isShared) {
    (currentStructures.restoreStructures || (currentStructures.restoreStructures = []))[id] = existingStructure;
  }
  currentStructures[id] = structure;
  structure.read = createStructureReader(structure);
};
currentExtensions[LEGACY_RECORD_INLINE_ID] = (data) => {
  let length = data.length;
  let structure = data[1];
  recordDefinition(data[0], structure);
  let object = {};
  for (let i = 2; i < length; i++) {
    let key = structure[i - 2];
    object[safeKey(key)] = data[i];
  }
  return object;
};
currentExtensions[14] = (value) => {
  if (bundledStrings)
    return bundledStrings[0].slice(bundledStrings.position0, bundledStrings.position0 += value);
  return new Tag(value, 14);
};
currentExtensions[15] = (value) => {
  if (bundledStrings)
    return bundledStrings[1].slice(bundledStrings.position1, bundledStrings.position1 += value);
  return new Tag(value, 15);
};
var glbl = { Error, RegExp };
currentExtensions[27] = (data) => {
  return (glbl[data[0]] || Error)(data[1], data[2]);
};
var packedTable = (read2) => {
  if (src[position++] != 132)
    throw new Error("Packed values structure must be followed by a 4 element array");
  let newPackedValues = read2();
  packedValues = packedValues ? newPackedValues.concat(packedValues.slice(newPackedValues.length)) : newPackedValues;
  packedValues.prefixes = read2();
  packedValues.suffixes = read2();
  return read2();
};
packedTable.handlesRead = true;
currentExtensions[51] = packedTable;
currentExtensions[PACKED_REFERENCE_TAG_ID] = (data) => {
  if (!packedValues) {
    if (currentDecoder.getShared)
      loadShared();
    else
      return new Tag(data, PACKED_REFERENCE_TAG_ID);
  }
  if (typeof data == "number")
    return packedValues[16 + (data >= 0 ? 2 * data : -2 * data - 1)];
  throw new Error("No support for non-integer packed references yet");
};
currentExtensions[28] = (read2) => {
  if (!referenceMap) {
    referenceMap = /* @__PURE__ */ new Map();
    referenceMap.id = 0;
  }
  let id = referenceMap.id++;
  let token = src[position];
  let target2;
  if (token >> 5 == 4)
    target2 = [];
  else
    target2 = {};
  let refEntry = { target: target2 };
  referenceMap.set(id, refEntry);
  let targetProperties = read2();
  if (refEntry.used)
    return Object.assign(target2, targetProperties);
  refEntry.target = targetProperties;
  return targetProperties;
};
currentExtensions[28].handlesRead = true;
currentExtensions[29] = (id) => {
  let refEntry = referenceMap.get(id);
  refEntry.used = true;
  return refEntry.target;
};
currentExtensions[258] = (array) => new Set(array);
(currentExtensions[259] = (read2) => {
  if (currentDecoder.mapsAsObjects) {
    currentDecoder.mapsAsObjects = false;
    restoreMapsAsObject = true;
  }
  return read2();
}).handlesRead = true;
function combine(a, b) {
  if (typeof a === "string")
    return a + b;
  if (a instanceof Array)
    return a.concat(b);
  return Object.assign({}, a, b);
}
function getPackedValues() {
  if (!packedValues) {
    if (currentDecoder.getShared)
      loadShared();
    else
      throw new Error("No packed values available");
  }
  return packedValues;
}
var SHARED_DATA_TAG_ID = 1399353956;
currentExtensionRanges.push((tag, input) => {
  if (tag >= 225 && tag <= 255)
    return combine(getPackedValues().prefixes[tag - 224], input);
  if (tag >= 28704 && tag <= 32767)
    return combine(getPackedValues().prefixes[tag - 28672], input);
  if (tag >= 1879052288 && tag <= 2147483647)
    return combine(getPackedValues().prefixes[tag - 1879048192], input);
  if (tag >= 216 && tag <= 223)
    return combine(input, getPackedValues().suffixes[tag - 216]);
  if (tag >= 27647 && tag <= 28671)
    return combine(input, getPackedValues().suffixes[tag - 27639]);
  if (tag >= 1811940352 && tag <= 1879048191)
    return combine(input, getPackedValues().suffixes[tag - 1811939328]);
  if (tag == SHARED_DATA_TAG_ID) {
    return {
      packedValues,
      structures: currentStructures.slice(0),
      version: input
    };
  }
  if (tag == 55799)
    return input;
});
var isLittleEndianMachine = new Uint8Array(new Uint16Array([1]).buffer)[0] == 1;
var typedArrays = [
  Uint8Array,
  Uint8ClampedArray,
  Uint16Array,
  Uint32Array,
  typeof BigUint64Array == "undefined" ? { name: "BigUint64Array" } : BigUint64Array,
  Int8Array,
  Int16Array,
  Int32Array,
  typeof BigInt64Array == "undefined" ? { name: "BigInt64Array" } : BigInt64Array,
  Float32Array,
  Float64Array
];
var typedArrayTags = [64, 68, 69, 70, 71, 72, 77, 78, 79, 85, 86];
for (let i = 0; i < typedArrays.length; i++) {
  registerTypedArray(typedArrays[i], typedArrayTags[i]);
}
function registerTypedArray(TypedArray, tag) {
  let dvMethod = "get" + TypedArray.name.slice(0, -5);
  let bytesPerElement;
  if (typeof TypedArray === "function")
    bytesPerElement = TypedArray.BYTES_PER_ELEMENT;
  else
    TypedArray = null;
  for (let littleEndian = 0; littleEndian < 2; littleEndian++) {
    if (!littleEndian && bytesPerElement == 1)
      continue;
    let sizeShift = bytesPerElement == 2 ? 1 : bytesPerElement == 4 ? 2 : 3;
    currentExtensions[littleEndian ? tag : tag - 4] = bytesPerElement == 1 || littleEndian == isLittleEndianMachine ? (buffer) => {
      if (!TypedArray)
        throw new Error("Could not find typed array for code " + tag);
      return new TypedArray(Uint8Array.prototype.slice.call(buffer, 0).buffer);
    } : (buffer) => {
      if (!TypedArray)
        throw new Error("Could not find typed array for code " + tag);
      let dv = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
      let elements = buffer.length >> sizeShift;
      let ta = new TypedArray(elements);
      let method = dv[dvMethod];
      for (let i = 0; i < elements; i++) {
        ta[i] = method.call(dv, i << sizeShift, littleEndian);
      }
      return ta;
    };
  }
}
function readBundleExt() {
  let length = readJustLength();
  let bundlePosition = position + read();
  for (let i = 2; i < length; i++) {
    let bundleLength = readJustLength();
    position += bundleLength;
  }
  let dataPosition = position;
  position = bundlePosition;
  bundledStrings = [readStringJS(readJustLength()), readStringJS(readJustLength())];
  bundledStrings.position0 = 0;
  bundledStrings.position1 = 0;
  bundledStrings.postBundlePosition = position;
  position = dataPosition;
  return read();
}
function readJustLength() {
  let token = src[position++] & 31;
  if (token > 23) {
    switch (token) {
      case 24:
        token = src[position++];
        break;
      case 25:
        token = dataView.getUint16(position);
        position += 2;
        break;
      case 26:
        token = dataView.getUint32(position);
        position += 4;
        break;
    }
  }
  return token;
}
function loadShared() {
  if (currentDecoder.getShared) {
    let sharedData = saveState(() => {
      src = null;
      return currentDecoder.getShared();
    }) || {};
    let updatedStructures = sharedData.structures || [];
    currentDecoder.sharedVersion = sharedData.version;
    packedValues = currentDecoder.sharedValues = sharedData.packedValues;
    if (currentStructures === true)
      currentDecoder.structures = currentStructures = updatedStructures;
    else
      currentStructures.splice.apply(currentStructures, [0, updatedStructures.length].concat(updatedStructures));
  }
}
function saveState(callback) {
  let savedSrcEnd = srcEnd;
  let savedPosition = position;
  let savedStringPosition = stringPosition;
  let savedSrcStringStart = srcStringStart;
  let savedSrcStringEnd = srcStringEnd;
  let savedSrcString = srcString;
  let savedStrings = strings;
  let savedReferenceMap = referenceMap;
  let savedBundledStrings = bundledStrings;
  let savedSrc = new Uint8Array(src.slice(0, srcEnd));
  let savedStructures = currentStructures;
  let savedDecoder = currentDecoder;
  let savedSequentialMode = sequentialMode;
  let value = callback();
  srcEnd = savedSrcEnd;
  position = savedPosition;
  stringPosition = savedStringPosition;
  srcStringStart = savedSrcStringStart;
  srcStringEnd = savedSrcStringEnd;
  srcString = savedSrcString;
  strings = savedStrings;
  referenceMap = savedReferenceMap;
  bundledStrings = savedBundledStrings;
  src = savedSrc;
  sequentialMode = savedSequentialMode;
  currentStructures = savedStructures;
  currentDecoder = savedDecoder;
  dataView = new DataView(src.buffer, src.byteOffset, src.byteLength);
  return value;
}
function clearSource() {
  src = null;
  referenceMap = null;
  currentStructures = null;
}
function addExtension(extension) {
  currentExtensions[extension.tag] = extension.decode;
}
var mult10 = new Array(147);
for (let i = 0; i < 256; i++) {
  mult10[i] = +("1e" + Math.floor(45.15 - i * 0.30103));
}
var defaultDecoder = new Decoder({ useRecords: false });
var decode = defaultDecoder.decode;
var decodeMultiple = defaultDecoder.decodeMultiple;
var FLOAT32_OPTIONS = {
  NEVER: 0,
  ALWAYS: 1,
  DECIMAL_ROUND: 3,
  DECIMAL_FIT: 4
};

// node_modules/cbor-x/encode.js
var textEncoder;
try {
  textEncoder = new TextEncoder();
} catch (error) {
}
var extensions;
var extensionClasses;
var Buffer2 = typeof globalThis === "object" && globalThis.Buffer;
var hasNodeBuffer = typeof Buffer2 !== "undefined";
var ByteArrayAllocate = hasNodeBuffer ? Buffer2.allocUnsafeSlow : Uint8Array;
var ByteArray = hasNodeBuffer ? Buffer2 : Uint8Array;
var MAX_STRUCTURES = 256;
var MAX_BUFFER_SIZE = hasNodeBuffer ? 4294967296 : 2144337920;
var throwOnIterable;
var target;
var targetView;
var position2 = 0;
var safeEnd;
var bundledStrings2 = null;
var MAX_BUNDLE_SIZE = 61440;
var hasNonLatin = /[\u0080-\uFFFF]/;
var RECORD_SYMBOL = Symbol("record-id");
var Encoder = class extends Decoder {
  constructor(options) {
    super(options);
    this.offset = 0;
    let typeBuffer;
    let start;
    let sharedStructures;
    let hasSharedUpdate;
    let structures;
    let referenceMap2;
    options = options || {};
    let encodeUtf8 = ByteArray.prototype.utf8Write ? function(string, position3, maxBytes) {
      return target.utf8Write(string, position3, maxBytes);
    } : textEncoder && textEncoder.encodeInto ? function(string, position3) {
      return textEncoder.encodeInto(string, target.subarray(position3)).written;
    } : false;
    let encoder4 = this;
    let hasSharedStructures = options.structures || options.saveStructures;
    let maxSharedStructures = options.maxSharedStructures;
    if (maxSharedStructures == null)
      maxSharedStructures = hasSharedStructures ? 128 : 0;
    if (maxSharedStructures > 8190)
      throw new Error("Maximum maxSharedStructure is 8190");
    let isSequential = options.sequential;
    if (isSequential) {
      maxSharedStructures = 0;
    }
    if (!this.structures)
      this.structures = [];
    if (this.saveStructures)
      this.saveShared = this.saveStructures;
    let samplingPackedValues, packedObjectMap2, sharedValues = options.sharedValues;
    let sharedPackedObjectMap2;
    if (sharedValues) {
      sharedPackedObjectMap2 = /* @__PURE__ */ Object.create(null);
      for (let i = 0, l = sharedValues.length; i < l; i++) {
        sharedPackedObjectMap2[sharedValues[i]] = i;
      }
    }
    let recordIdsToRemove = [];
    let transitionsCount = 0;
    let serializationsSinceTransitionRebuild = 0;
    this.mapEncode = function(value, encodeOptions) {
      if (this._keyMap && !this._mapped) {
        switch (value.constructor.name) {
          case "Array":
            value = value.map((r) => this.encodeKeys(r));
            break;
        }
      }
      return this.encode(value, encodeOptions);
    };
    this.encode = function(value, encodeOptions) {
      if (!target) {
        target = new ByteArrayAllocate(8192);
        targetView = new DataView(target.buffer, 0, 8192);
        position2 = 0;
      }
      safeEnd = target.length - 10;
      if (safeEnd - position2 < 2048) {
        target = new ByteArrayAllocate(target.length);
        targetView = new DataView(target.buffer, 0, target.length);
        safeEnd = target.length - 10;
        position2 = 0;
      } else if (encodeOptions === REUSE_BUFFER_MODE)
        position2 = position2 + 7 & 2147483640;
      start = position2;
      if (encoder4.useSelfDescribedHeader) {
        targetView.setUint32(position2, 3654940416);
        position2 += 3;
      }
      referenceMap2 = encoder4.structuredClone ? /* @__PURE__ */ new Map() : null;
      if (encoder4.bundleStrings && typeof value !== "string") {
        bundledStrings2 = [];
        bundledStrings2.size = Infinity;
      } else
        bundledStrings2 = null;
      sharedStructures = encoder4.structures;
      if (sharedStructures) {
        if (sharedStructures.uninitialized) {
          let sharedData = encoder4.getShared() || {};
          encoder4.structures = sharedStructures = sharedData.structures || [];
          encoder4.sharedVersion = sharedData.version;
          let sharedValues2 = encoder4.sharedValues = sharedData.packedValues;
          if (sharedValues2) {
            sharedPackedObjectMap2 = {};
            for (let i = 0, l = sharedValues2.length; i < l; i++)
              sharedPackedObjectMap2[sharedValues2[i]] = i;
          }
        }
        let sharedStructuresLength = sharedStructures.length;
        if (sharedStructuresLength > maxSharedStructures && !isSequential)
          sharedStructuresLength = maxSharedStructures;
        if (!sharedStructures.transitions) {
          sharedStructures.transitions = /* @__PURE__ */ Object.create(null);
          for (let i = 0; i < sharedStructuresLength; i++) {
            let keys = sharedStructures[i];
            if (!keys)
              continue;
            let nextTransition, transition = sharedStructures.transitions;
            for (let j = 0, l = keys.length; j < l; j++) {
              if (transition[RECORD_SYMBOL] === void 0)
                transition[RECORD_SYMBOL] = i;
              let key = keys[j];
              nextTransition = transition[key];
              if (!nextTransition) {
                nextTransition = transition[key] = /* @__PURE__ */ Object.create(null);
              }
              transition = nextTransition;
            }
            transition[RECORD_SYMBOL] = i | 1048576;
          }
        }
        if (!isSequential)
          sharedStructures.nextId = sharedStructuresLength;
      }
      if (hasSharedUpdate)
        hasSharedUpdate = false;
      structures = sharedStructures || [];
      packedObjectMap2 = sharedPackedObjectMap2;
      if (options.pack) {
        let packedValues2 = /* @__PURE__ */ new Map();
        packedValues2.values = [];
        packedValues2.encoder = encoder4;
        packedValues2.maxValues = options.maxPrivatePackedValues || (sharedPackedObjectMap2 ? 16 : Infinity);
        packedValues2.objectMap = sharedPackedObjectMap2 || false;
        packedValues2.samplingPackedValues = samplingPackedValues;
        findRepetitiveStrings(value, packedValues2);
        if (packedValues2.values.length > 0) {
          target[position2++] = 216;
          target[position2++] = 51;
          writeArrayHeader(4);
          let valuesArray = packedValues2.values;
          encode3(valuesArray);
          writeArrayHeader(0);
          writeArrayHeader(0);
          packedObjectMap2 = Object.create(sharedPackedObjectMap2 || null);
          for (let i = 0, l = valuesArray.length; i < l; i++) {
            packedObjectMap2[valuesArray[i]] = i;
          }
        }
      }
      throwOnIterable = encodeOptions & THROW_ON_ITERABLE;
      try {
        if (throwOnIterable)
          return;
        encode3(value);
        if (bundledStrings2) {
          writeBundles(start, encode3);
        }
        encoder4.offset = position2;
        if (referenceMap2 && referenceMap2.idsToInsert) {
          position2 += referenceMap2.idsToInsert.length * 2;
          if (position2 > safeEnd)
            makeRoom(position2);
          encoder4.offset = position2;
          let serialized = insertIds(target.subarray(start, position2), referenceMap2.idsToInsert);
          referenceMap2 = null;
          return serialized;
        }
        if (encodeOptions & REUSE_BUFFER_MODE) {
          target.start = start;
          target.end = position2;
          return target;
        }
        return target.subarray(start, position2);
      } finally {
        if (sharedStructures) {
          if (serializationsSinceTransitionRebuild < 10)
            serializationsSinceTransitionRebuild++;
          if (sharedStructures.length > maxSharedStructures)
            sharedStructures.length = maxSharedStructures;
          if (transitionsCount > 1e4) {
            sharedStructures.transitions = null;
            serializationsSinceTransitionRebuild = 0;
            transitionsCount = 0;
            if (recordIdsToRemove.length > 0)
              recordIdsToRemove = [];
          } else if (recordIdsToRemove.length > 0 && !isSequential) {
            for (let i = 0, l = recordIdsToRemove.length; i < l; i++) {
              recordIdsToRemove[i][RECORD_SYMBOL] = void 0;
            }
            recordIdsToRemove = [];
          }
        }
        if (hasSharedUpdate && encoder4.saveShared) {
          if (encoder4.structures.length > maxSharedStructures) {
            encoder4.structures = encoder4.structures.slice(0, maxSharedStructures);
          }
          let returnBuffer = target.subarray(start, position2);
          if (encoder4.updateSharedData() === false)
            return encoder4.encode(value);
          return returnBuffer;
        }
        if (encodeOptions & RESET_BUFFER_MODE)
          position2 = start;
      }
    };
    this.findCommonStringsToPack = () => {
      samplingPackedValues = /* @__PURE__ */ new Map();
      if (!sharedPackedObjectMap2)
        sharedPackedObjectMap2 = /* @__PURE__ */ Object.create(null);
      return (options2) => {
        let threshold = options2 && options2.threshold || 4;
        let position3 = this.pack ? options2.maxPrivatePackedValues || 16 : 0;
        if (!sharedValues)
          sharedValues = this.sharedValues = [];
        for (let [key, status] of samplingPackedValues) {
          if (status.count > threshold) {
            sharedPackedObjectMap2[key] = position3++;
            sharedValues.push(key);
            hasSharedUpdate = true;
          }
        }
        while (this.saveShared && this.updateSharedData() === false) {
        }
        samplingPackedValues = null;
      };
    };
    const encode3 = (value) => {
      if (position2 > safeEnd)
        target = makeRoom(position2);
      var type = typeof value;
      var length;
      if (type === "string") {
        if (packedObjectMap2) {
          let packedPosition = packedObjectMap2[value];
          if (packedPosition >= 0) {
            if (packedPosition < 16)
              target[position2++] = packedPosition + 224;
            else {
              target[position2++] = 198;
              if (packedPosition & 1)
                encode3(15 - packedPosition >> 1);
              else
                encode3(packedPosition - 16 >> 1);
            }
            return;
          } else if (samplingPackedValues && !options.pack) {
            let status = samplingPackedValues.get(value);
            if (status)
              status.count++;
            else
              samplingPackedValues.set(value, {
                count: 1
              });
          }
        }
        let strLength = value.length;
        if (bundledStrings2 && strLength >= 4 && strLength < 1024) {
          if ((bundledStrings2.size += strLength) > MAX_BUNDLE_SIZE) {
            let extStart;
            let maxBytes2 = (bundledStrings2[0] ? bundledStrings2[0].length * 3 + bundledStrings2[1].length : 0) + 10;
            if (position2 + maxBytes2 > safeEnd)
              target = makeRoom(position2 + maxBytes2);
            target[position2++] = 217;
            target[position2++] = 223;
            target[position2++] = 249;
            target[position2++] = bundledStrings2.position ? 132 : 130;
            target[position2++] = 26;
            extStart = position2 - start;
            position2 += 4;
            if (bundledStrings2.position) {
              writeBundles(start, encode3);
            }
            bundledStrings2 = ["", ""];
            bundledStrings2.size = 0;
            bundledStrings2.position = extStart;
          }
          let twoByte = hasNonLatin.test(value);
          bundledStrings2[twoByte ? 0 : 1] += value;
          target[position2++] = twoByte ? 206 : 207;
          encode3(strLength);
          return;
        }
        let headerSize;
        if (strLength < 32) {
          headerSize = 1;
        } else if (strLength < 256) {
          headerSize = 2;
        } else if (strLength < 65536) {
          headerSize = 3;
        } else {
          headerSize = 5;
        }
        let maxBytes = strLength * 3;
        if (position2 + maxBytes > safeEnd)
          target = makeRoom(position2 + maxBytes);
        if (strLength < 64 || !encodeUtf8) {
          let i, c1, c2, strPosition = position2 + headerSize;
          for (i = 0; i < strLength; i++) {
            c1 = value.charCodeAt(i);
            if (c1 < 128) {
              target[strPosition++] = c1;
            } else if (c1 < 2048) {
              target[strPosition++] = c1 >> 6 | 192;
              target[strPosition++] = c1 & 63 | 128;
            } else if ((c1 & 64512) === 55296 && ((c2 = value.charCodeAt(i + 1)) & 64512) === 56320) {
              c1 = 65536 + ((c1 & 1023) << 10) + (c2 & 1023);
              i++;
              target[strPosition++] = c1 >> 18 | 240;
              target[strPosition++] = c1 >> 12 & 63 | 128;
              target[strPosition++] = c1 >> 6 & 63 | 128;
              target[strPosition++] = c1 & 63 | 128;
            } else {
              target[strPosition++] = c1 >> 12 | 224;
              target[strPosition++] = c1 >> 6 & 63 | 128;
              target[strPosition++] = c1 & 63 | 128;
            }
          }
          length = strPosition - position2 - headerSize;
        } else {
          length = encodeUtf8(value, position2 + headerSize, maxBytes);
        }
        if (length < 24) {
          target[position2++] = 96 | length;
        } else if (length < 256) {
          if (headerSize < 2) {
            target.copyWithin(position2 + 2, position2 + 1, position2 + 1 + length);
          }
          target[position2++] = 120;
          target[position2++] = length;
        } else if (length < 65536) {
          if (headerSize < 3) {
            target.copyWithin(position2 + 3, position2 + 2, position2 + 2 + length);
          }
          target[position2++] = 121;
          target[position2++] = length >> 8;
          target[position2++] = length & 255;
        } else {
          if (headerSize < 5) {
            target.copyWithin(position2 + 5, position2 + 3, position2 + 3 + length);
          }
          target[position2++] = 122;
          targetView.setUint32(position2, length);
          position2 += 4;
        }
        position2 += length;
      } else if (type === "number") {
        if (!this.alwaysUseFloat && value >>> 0 === value) {
          if (value < 24) {
            target[position2++] = value;
          } else if (value < 256) {
            target[position2++] = 24;
            target[position2++] = value;
          } else if (value < 65536) {
            target[position2++] = 25;
            target[position2++] = value >> 8;
            target[position2++] = value & 255;
          } else {
            target[position2++] = 26;
            targetView.setUint32(position2, value);
            position2 += 4;
          }
        } else if (!this.alwaysUseFloat && value >> 0 === value) {
          if (value >= -24) {
            target[position2++] = 31 - value;
          } else if (value >= -256) {
            target[position2++] = 56;
            target[position2++] = ~value;
          } else if (value >= -65536) {
            target[position2++] = 57;
            targetView.setUint16(position2, ~value);
            position2 += 2;
          } else {
            target[position2++] = 58;
            targetView.setUint32(position2, ~value);
            position2 += 4;
          }
        } else {
          let useFloat32;
          if ((useFloat32 = this.useFloat32) > 0 && value < 4294967296 && value >= -2147483648) {
            target[position2++] = 250;
            targetView.setFloat32(position2, value);
            let xShifted;
            if (useFloat32 < 4 || // this checks for rounding of numbers that were encoded in 32-bit float to nearest significant decimal digit that could be preserved
            (xShifted = value * mult10[(target[position2] & 127) << 1 | target[position2 + 1] >> 7]) >> 0 === xShifted) {
              position2 += 4;
              return;
            } else
              position2--;
          }
          target[position2++] = 251;
          targetView.setFloat64(position2, value);
          position2 += 8;
        }
      } else if (type === "object") {
        if (!value)
          target[position2++] = 246;
        else {
          if (referenceMap2) {
            let referee = referenceMap2.get(value);
            if (referee) {
              target[position2++] = 216;
              target[position2++] = 29;
              target[position2++] = 25;
              if (!referee.references) {
                let idsToInsert = referenceMap2.idsToInsert || (referenceMap2.idsToInsert = []);
                referee.references = [];
                idsToInsert.push(referee);
              }
              referee.references.push(position2 - start);
              position2 += 2;
              return;
            } else
              referenceMap2.set(value, { offset: position2 - start });
          }
          let constructor = value.constructor;
          if (constructor === Object) {
            writeObject(value, true);
          } else if (constructor === Array) {
            length = value.length;
            if (length < 24) {
              target[position2++] = 128 | length;
            } else {
              writeArrayHeader(length);
            }
            for (let i = 0; i < length; i++) {
              encode3(value[i]);
            }
          } else if (constructor === Map) {
            if (this.mapsAsObjects ? this.useTag259ForMaps !== false : this.useTag259ForMaps) {
              target[position2++] = 217;
              target[position2++] = 1;
              target[position2++] = 3;
            }
            length = value.size;
            if (length < 24) {
              target[position2++] = 160 | length;
            } else if (length < 256) {
              target[position2++] = 184;
              target[position2++] = length;
            } else if (length < 65536) {
              target[position2++] = 185;
              target[position2++] = length >> 8;
              target[position2++] = length & 255;
            } else {
              target[position2++] = 186;
              targetView.setUint32(position2, length);
              position2 += 4;
            }
            if (encoder4.keyMap) {
              for (let [key, entryValue] of value) {
                encode3(encoder4.encodeKey(key));
                encode3(entryValue);
              }
            } else {
              for (let [key, entryValue] of value) {
                encode3(key);
                encode3(entryValue);
              }
            }
          } else {
            for (let i = 0, l = extensions.length; i < l; i++) {
              let extensionClass = extensionClasses[i];
              if (value instanceof extensionClass) {
                let extension = extensions[i];
                let tag = extension.tag;
                if (tag == void 0)
                  tag = extension.getTag && extension.getTag.call(this, value);
                if (tag < 24) {
                  target[position2++] = 192 | tag;
                } else if (tag < 256) {
                  target[position2++] = 216;
                  target[position2++] = tag;
                } else if (tag < 65536) {
                  target[position2++] = 217;
                  target[position2++] = tag >> 8;
                  target[position2++] = tag & 255;
                } else if (tag > -1) {
                  target[position2++] = 218;
                  targetView.setUint32(position2, tag);
                  position2 += 4;
                }
                extension.encode.call(this, value, encode3, makeRoom);
                return;
              }
            }
            if (value[Symbol.iterator]) {
              if (throwOnIterable) {
                let error = new Error("Iterable should be serialized as iterator");
                error.iteratorNotHandled = true;
                throw error;
              }
              target[position2++] = 159;
              for (let entry of value) {
                encode3(entry);
              }
              target[position2++] = 255;
              return;
            }
            if (value[Symbol.asyncIterator] || isBlob(value)) {
              let error = new Error("Iterable/blob should be serialized as iterator");
              error.iteratorNotHandled = true;
              throw error;
            }
            if (this.useToJSON && value.toJSON) {
              const json = value.toJSON();
              if (json !== value)
                return encode3(json);
            }
            writeObject(value, !value.hasOwnProperty);
          }
        }
      } else if (type === "boolean") {
        target[position2++] = value ? 245 : 244;
      } else if (type === "bigint") {
        if (value < BigInt(1) << BigInt(64) && value >= 0) {
          target[position2++] = 27;
          targetView.setBigUint64(position2, value);
        } else if (value > -(BigInt(1) << BigInt(64)) && value < 0) {
          target[position2++] = 59;
          targetView.setBigUint64(position2, -value - BigInt(1));
        } else {
          if (this.largeBigIntToFloat) {
            target[position2++] = 251;
            targetView.setFloat64(position2, Number(value));
          } else {
            throw new RangeError(value + " was too large to fit in CBOR 64-bit integer format, set largeBigIntToFloat to convert to float-64");
          }
        }
        position2 += 8;
      } else if (type === "undefined") {
        target[position2++] = 247;
      } else {
        throw new Error("Unknown type: " + type);
      }
    };
    const writeObject = this.useRecords === false ? this.variableMapSize ? (object) => {
      let keys = Object.keys(object);
      let vals = Object.values(object);
      let length = keys.length;
      if (length < 24) {
        target[position2++] = 160 | length;
      } else if (length < 256) {
        target[position2++] = 184;
        target[position2++] = length;
      } else if (length < 65536) {
        target[position2++] = 185;
        target[position2++] = length >> 8;
        target[position2++] = length & 255;
      } else {
        target[position2++] = 186;
        targetView.setUint32(position2, length);
        position2 += 4;
      }
      let key;
      if (encoder4.keyMap) {
        for (let i = 0; i < length; i++) {
          encode3(encoder4.encodeKey(keys[i]));
          encode3(vals[i]);
        }
      } else {
        for (let i = 0; i < length; i++) {
          encode3(keys[i]);
          encode3(vals[i]);
        }
      }
    } : (object, safePrototype) => {
      target[position2++] = 185;
      let objectOffset = position2 - start;
      position2 += 2;
      let size = 0;
      if (encoder4.keyMap) {
        for (let key in object)
          if (safePrototype || object.hasOwnProperty(key)) {
            encode3(encoder4.encodeKey(key));
            encode3(object[key]);
            size++;
          }
      } else {
        for (let key in object)
          if (safePrototype || object.hasOwnProperty(key)) {
            encode3(key);
            encode3(object[key]);
            size++;
          }
      }
      target[objectOffset++ + start] = size >> 8;
      target[objectOffset + start] = size & 255;
    } : (object, safePrototype) => {
      let nextTransition, transition = structures.transitions || (structures.transitions = /* @__PURE__ */ Object.create(null));
      let newTransitions = 0;
      let length = 0;
      let parentRecordId;
      let keys;
      if (this.keyMap) {
        keys = Object.keys(object).map((k) => this.encodeKey(k));
        length = keys.length;
        for (let i = 0; i < length; i++) {
          let key = keys[i];
          nextTransition = transition[key];
          if (!nextTransition) {
            nextTransition = transition[key] = /* @__PURE__ */ Object.create(null);
            newTransitions++;
          }
          transition = nextTransition;
        }
      } else {
        for (let key in object)
          if (safePrototype || object.hasOwnProperty(key)) {
            nextTransition = transition[key];
            if (!nextTransition) {
              if (transition[RECORD_SYMBOL] & 1048576) {
                parentRecordId = transition[RECORD_SYMBOL] & 65535;
              }
              nextTransition = transition[key] = /* @__PURE__ */ Object.create(null);
              newTransitions++;
            }
            transition = nextTransition;
            length++;
          }
      }
      let recordId = transition[RECORD_SYMBOL];
      if (recordId !== void 0) {
        recordId &= 65535;
        target[position2++] = 217;
        target[position2++] = recordId >> 8 | 224;
        target[position2++] = recordId & 255;
      } else {
        if (!keys)
          keys = transition.__keys__ || (transition.__keys__ = Object.keys(object));
        if (parentRecordId === void 0) {
          recordId = structures.nextId++;
          if (!recordId) {
            recordId = 0;
            structures.nextId = 1;
          }
          if (recordId >= MAX_STRUCTURES) {
            structures.nextId = (recordId = maxSharedStructures) + 1;
          }
        } else {
          recordId = parentRecordId;
        }
        structures[recordId] = keys;
        if (recordId < maxSharedStructures) {
          target[position2++] = 217;
          target[position2++] = recordId >> 8 | 224;
          target[position2++] = recordId & 255;
          transition = structures.transitions;
          for (let i = 0; i < length; i++) {
            if (transition[RECORD_SYMBOL] === void 0 || transition[RECORD_SYMBOL] & 1048576)
              transition[RECORD_SYMBOL] = recordId;
            transition = transition[keys[i]];
          }
          transition[RECORD_SYMBOL] = recordId | 1048576;
          hasSharedUpdate = true;
        } else {
          transition[RECORD_SYMBOL] = recordId;
          targetView.setUint32(position2, 3655335680);
          position2 += 3;
          if (newTransitions)
            transitionsCount += serializationsSinceTransitionRebuild * newTransitions;
          if (recordIdsToRemove.length >= MAX_STRUCTURES - maxSharedStructures)
            recordIdsToRemove.shift()[RECORD_SYMBOL] = void 0;
          recordIdsToRemove.push(transition);
          writeArrayHeader(length + 2);
          encode3(57344 + recordId);
          encode3(keys);
          if (safePrototype === null)
            return;
          for (let key in object)
            if (safePrototype || object.hasOwnProperty(key))
              encode3(object[key]);
          return;
        }
      }
      if (length < 24) {
        target[position2++] = 128 | length;
      } else {
        writeArrayHeader(length);
      }
      if (safePrototype === null)
        return;
      for (let key in object)
        if (safePrototype || object.hasOwnProperty(key))
          encode3(object[key]);
    };
    const makeRoom = (end) => {
      let newSize;
      if (end > 16777216) {
        if (end - start > MAX_BUFFER_SIZE)
          throw new Error("Encoded buffer would be larger than maximum buffer size");
        newSize = Math.min(
          MAX_BUFFER_SIZE,
          Math.round(Math.max((end - start) * (end > 67108864 ? 1.25 : 2), 4194304) / 4096) * 4096
        );
      } else
        newSize = (Math.max(end - start << 2, target.length - 1) >> 12) + 1 << 12;
      let newBuffer = new ByteArrayAllocate(newSize);
      targetView = new DataView(newBuffer.buffer, 0, newSize);
      if (target.copy)
        target.copy(newBuffer, 0, start, end);
      else
        newBuffer.set(target.slice(start, end));
      position2 -= start;
      start = 0;
      safeEnd = newBuffer.length - 10;
      return target = newBuffer;
    };
    let chunkThreshold = 100;
    let continuedChunkThreshold = 1e3;
    this.encodeAsIterable = function(value, options2) {
      return startEncoding(value, options2, encodeObjectAsIterable);
    };
    this.encodeAsAsyncIterable = function(value, options2) {
      return startEncoding(value, options2, encodeObjectAsAsyncIterable);
    };
    function* encodeObjectAsIterable(object, iterateProperties, finalIterable) {
      let constructor = object.constructor;
      if (constructor === Object) {
        let useRecords = encoder4.useRecords !== false;
        if (useRecords)
          writeObject(object, null);
        else
          writeEntityLength(Object.keys(object).length, 160);
        for (let key in object) {
          let value = object[key];
          if (!useRecords)
            encode3(key);
          if (value && typeof value === "object") {
            if (iterateProperties[key])
              yield* encodeObjectAsIterable(value, iterateProperties[key]);
            else
              yield* tryEncode(value, iterateProperties, key);
          } else
            encode3(value);
        }
      } else if (constructor === Array) {
        let length = object.length;
        writeArrayHeader(length);
        for (let i = 0; i < length; i++) {
          let value = object[i];
          if (value && (typeof value === "object" || position2 - start > chunkThreshold)) {
            if (iterateProperties.element)
              yield* encodeObjectAsIterable(value, iterateProperties.element);
            else
              yield* tryEncode(value, iterateProperties, "element");
          } else
            encode3(value);
        }
      } else if (object[Symbol.iterator]) {
        target[position2++] = 159;
        for (let value of object) {
          if (value && (typeof value === "object" || position2 - start > chunkThreshold)) {
            if (iterateProperties.element)
              yield* encodeObjectAsIterable(value, iterateProperties.element);
            else
              yield* tryEncode(value, iterateProperties, "element");
          } else
            encode3(value);
        }
        target[position2++] = 255;
      } else if (isBlob(object)) {
        writeEntityLength(object.size, 64);
        yield target.subarray(start, position2);
        yield object;
        restartEncoding();
      } else if (object[Symbol.asyncIterator]) {
        target[position2++] = 159;
        yield target.subarray(start, position2);
        yield object;
        restartEncoding();
        target[position2++] = 255;
      } else {
        encode3(object);
      }
      if (finalIterable && position2 > start)
        yield target.subarray(start, position2);
      else if (position2 - start > chunkThreshold) {
        yield target.subarray(start, position2);
        restartEncoding();
      }
    }
    function* tryEncode(value, iterateProperties, key) {
      let restart = position2 - start;
      try {
        encode3(value);
        if (position2 - start > chunkThreshold) {
          yield target.subarray(start, position2);
          restartEncoding();
        }
      } catch (error) {
        if (error.iteratorNotHandled) {
          iterateProperties[key] = {};
          position2 = start + restart;
          yield* encodeObjectAsIterable.call(this, value, iterateProperties[key]);
        } else
          throw error;
      }
    }
    function restartEncoding() {
      chunkThreshold = continuedChunkThreshold;
      encoder4.encode(null, THROW_ON_ITERABLE);
    }
    function startEncoding(value, options2, encodeIterable) {
      if (options2 && options2.chunkThreshold)
        chunkThreshold = continuedChunkThreshold = options2.chunkThreshold;
      else
        chunkThreshold = 100;
      if (value && typeof value === "object") {
        encoder4.encode(null, THROW_ON_ITERABLE);
        return encodeIterable(value, encoder4.iterateProperties || (encoder4.iterateProperties = {}), true);
      }
      return [encoder4.encode(value)];
    }
    async function* encodeObjectAsAsyncIterable(value, iterateProperties) {
      for (let encodedValue of encodeObjectAsIterable(value, iterateProperties, true)) {
        let constructor = encodedValue.constructor;
        if (constructor === ByteArray || constructor === Uint8Array)
          yield encodedValue;
        else if (isBlob(encodedValue)) {
          let reader = encodedValue.stream().getReader();
          let next;
          while (!(next = await reader.read()).done) {
            yield next.value;
          }
        } else if (encodedValue[Symbol.asyncIterator]) {
          for await (let asyncValue of encodedValue) {
            restartEncoding();
            if (asyncValue)
              yield* encodeObjectAsAsyncIterable(asyncValue, iterateProperties.async || (iterateProperties.async = {}));
            else
              yield encoder4.encode(asyncValue);
          }
        } else {
          yield encodedValue;
        }
      }
    }
  }
  useBuffer(buffer) {
    target = buffer;
    targetView = new DataView(target.buffer, target.byteOffset, target.byteLength);
    position2 = 0;
  }
  clearSharedData() {
    if (this.structures)
      this.structures = [];
    if (this.sharedValues)
      this.sharedValues = void 0;
  }
  updateSharedData() {
    let lastVersion = this.sharedVersion || 0;
    this.sharedVersion = lastVersion + 1;
    let structuresCopy = this.structures.slice(0);
    let sharedData = new SharedData(structuresCopy, this.sharedValues, this.sharedVersion);
    let saveResults = this.saveShared(
      sharedData,
      (existingShared) => (existingShared && existingShared.version || 0) == lastVersion
    );
    if (saveResults === false) {
      sharedData = this.getShared() || {};
      this.structures = sharedData.structures || [];
      this.sharedValues = sharedData.packedValues;
      this.sharedVersion = sharedData.version;
      this.structures.nextId = this.structures.length;
    } else {
      structuresCopy.forEach((structure, i) => this.structures[i] = structure);
    }
    return saveResults;
  }
};
function writeEntityLength(length, majorValue) {
  if (length < 24)
    target[position2++] = majorValue | length;
  else if (length < 256) {
    target[position2++] = majorValue | 24;
    target[position2++] = length;
  } else if (length < 65536) {
    target[position2++] = majorValue | 25;
    target[position2++] = length >> 8;
    target[position2++] = length & 255;
  } else {
    target[position2++] = majorValue | 26;
    targetView.setUint32(position2, length);
    position2 += 4;
  }
}
var SharedData = class {
  constructor(structures, values, version) {
    this.structures = structures;
    this.packedValues = values;
    this.version = version;
  }
};
function writeArrayHeader(length) {
  if (length < 24)
    target[position2++] = 128 | length;
  else if (length < 256) {
    target[position2++] = 152;
    target[position2++] = length;
  } else if (length < 65536) {
    target[position2++] = 153;
    target[position2++] = length >> 8;
    target[position2++] = length & 255;
  } else {
    target[position2++] = 154;
    targetView.setUint32(position2, length);
    position2 += 4;
  }
}
var BlobConstructor = typeof Blob === "undefined" ? function() {
} : Blob;
function isBlob(object) {
  if (object instanceof BlobConstructor)
    return true;
  let tag = object[Symbol.toStringTag];
  return tag === "Blob" || tag === "File";
}
function findRepetitiveStrings(value, packedValues2) {
  switch (typeof value) {
    case "string":
      if (value.length > 3) {
        if (packedValues2.objectMap[value] > -1 || packedValues2.values.length >= packedValues2.maxValues)
          return;
        let packedStatus = packedValues2.get(value);
        if (packedStatus) {
          if (++packedStatus.count == 2) {
            packedValues2.values.push(value);
          }
        } else {
          packedValues2.set(value, {
            count: 1
          });
          if (packedValues2.samplingPackedValues) {
            let status = packedValues2.samplingPackedValues.get(value);
            if (status)
              status.count++;
            else
              packedValues2.samplingPackedValues.set(value, {
                count: 1
              });
          }
        }
      }
      break;
    case "object":
      if (value) {
        if (value instanceof Array) {
          for (let i = 0, l = value.length; i < l; i++) {
            findRepetitiveStrings(value[i], packedValues2);
          }
        } else {
          let includeKeys = !packedValues2.encoder.useRecords;
          for (var key in value) {
            if (value.hasOwnProperty(key)) {
              if (includeKeys)
                findRepetitiveStrings(key, packedValues2);
              findRepetitiveStrings(value[key], packedValues2);
            }
          }
        }
      }
      break;
    case "function":
      console.log(value);
  }
}
var isLittleEndianMachine2 = new Uint8Array(new Uint16Array([1]).buffer)[0] == 1;
extensionClasses = [
  Date,
  Set,
  Error,
  RegExp,
  Tag,
  ArrayBuffer,
  Uint8Array,
  Uint8ClampedArray,
  Uint16Array,
  Uint32Array,
  typeof BigUint64Array == "undefined" ? function() {
  } : BigUint64Array,
  Int8Array,
  Int16Array,
  Int32Array,
  typeof BigInt64Array == "undefined" ? function() {
  } : BigInt64Array,
  Float32Array,
  Float64Array,
  SharedData
];
extensions = [
  {
    // Date
    tag: 1,
    encode(date, encode3) {
      let seconds = date.getTime() / 1e3;
      if ((this.useTimestamp32 || date.getMilliseconds() === 0) && seconds >= 0 && seconds < 4294967296) {
        target[position2++] = 26;
        targetView.setUint32(position2, seconds);
        position2 += 4;
      } else {
        target[position2++] = 251;
        targetView.setFloat64(position2, seconds);
        position2 += 8;
      }
    }
  },
  {
    // Set
    tag: 258,
    // https://github.com/input-output-hk/cbor-sets-spec/blob/master/CBOR_SETS.md
    encode(set, encode3) {
      let array = Array.from(set);
      encode3(array);
    }
  },
  {
    // Error
    tag: 27,
    // http://cbor.schmorp.de/generic-object
    encode(error, encode3) {
      encode3([error.name, error.message]);
    }
  },
  {
    // RegExp
    tag: 27,
    // http://cbor.schmorp.de/generic-object
    encode(regex, encode3) {
      encode3(["RegExp", regex.source, regex.flags]);
    }
  },
  {
    // Tag
    getTag(tag) {
      return tag.tag;
    },
    encode(tag, encode3) {
      encode3(tag.value);
    }
  },
  {
    // ArrayBuffer
    encode(arrayBuffer, encode3, makeRoom) {
      writeBuffer(arrayBuffer, makeRoom);
    }
  },
  {
    // Uint8Array
    getTag(typedArray) {
      if (typedArray.constructor === Uint8Array) {
        if (this.tagUint8Array || hasNodeBuffer && this.tagUint8Array !== false)
          return 64;
      }
    },
    encode(typedArray, encode3, makeRoom) {
      writeBuffer(typedArray, makeRoom);
    }
  },
  typedArrayEncoder(68, 1),
  typedArrayEncoder(69, 2),
  typedArrayEncoder(70, 4),
  typedArrayEncoder(71, 8),
  typedArrayEncoder(72, 1),
  typedArrayEncoder(77, 2),
  typedArrayEncoder(78, 4),
  typedArrayEncoder(79, 8),
  typedArrayEncoder(85, 4),
  typedArrayEncoder(86, 8),
  {
    encode(sharedData, encode3) {
      let packedValues2 = sharedData.packedValues || [];
      let sharedStructures = sharedData.structures || [];
      if (packedValues2.values.length > 0) {
        target[position2++] = 216;
        target[position2++] = 51;
        writeArrayHeader(4);
        let valuesArray = packedValues2.values;
        encode3(valuesArray);
        writeArrayHeader(0);
        writeArrayHeader(0);
        packedObjectMap = Object.create(sharedPackedObjectMap || null);
        for (let i = 0, l = valuesArray.length; i < l; i++) {
          packedObjectMap[valuesArray[i]] = i;
        }
      }
      if (sharedStructures) {
        targetView.setUint32(position2, 3655335424);
        position2 += 3;
        let definitions = sharedStructures.slice(0);
        definitions.unshift(57344);
        definitions.push(new Tag(sharedData.version, 1399353956));
        encode3(definitions);
      } else
        encode3(new Tag(sharedData.version, 1399353956));
    }
  }
];
function typedArrayEncoder(tag, size) {
  if (!isLittleEndianMachine2 && size > 1)
    tag -= 4;
  return {
    tag,
    encode: function writeExtBuffer(typedArray, encode3) {
      let length = typedArray.byteLength;
      let offset = typedArray.byteOffset || 0;
      let buffer = typedArray.buffer || typedArray;
      encode3(hasNodeBuffer ? Buffer2.from(buffer, offset, length) : new Uint8Array(buffer, offset, length));
    }
  };
}
function writeBuffer(buffer, makeRoom) {
  let length = buffer.byteLength;
  if (length < 24) {
    target[position2++] = 64 + length;
  } else if (length < 256) {
    target[position2++] = 88;
    target[position2++] = length;
  } else if (length < 65536) {
    target[position2++] = 89;
    target[position2++] = length >> 8;
    target[position2++] = length & 255;
  } else {
    target[position2++] = 90;
    targetView.setUint32(position2, length);
    position2 += 4;
  }
  if (position2 + length >= target.length) {
    makeRoom(position2 + length);
  }
  target.set(buffer.buffer ? buffer : new Uint8Array(buffer), position2);
  position2 += length;
}
function insertIds(serialized, idsToInsert) {
  let nextId;
  let distanceToMove = idsToInsert.length * 2;
  let lastEnd = serialized.length - distanceToMove;
  idsToInsert.sort((a, b) => a.offset > b.offset ? 1 : -1);
  for (let id = 0; id < idsToInsert.length; id++) {
    let referee = idsToInsert[id];
    referee.id = id;
    for (let position3 of referee.references) {
      serialized[position3++] = id >> 8;
      serialized[position3] = id & 255;
    }
  }
  while (nextId = idsToInsert.pop()) {
    let offset = nextId.offset;
    serialized.copyWithin(offset + distanceToMove, offset, lastEnd);
    distanceToMove -= 2;
    let position3 = offset + distanceToMove;
    serialized[position3++] = 216;
    serialized[position3++] = 28;
    lastEnd = offset;
  }
  return serialized;
}
function writeBundles(start, encode3) {
  targetView.setUint32(bundledStrings2.position + start, position2 - bundledStrings2.position - start + 1);
  let writeStrings = bundledStrings2;
  bundledStrings2 = null;
  encode3(writeStrings[0]);
  encode3(writeStrings[1]);
}
function addExtension2(extension) {
  if (extension.Class) {
    if (!extension.encode)
      throw new Error("Extension has no encode function");
    extensionClasses.unshift(extension.Class);
    extensions.unshift(extension);
  }
  addExtension(extension);
}
var defaultEncoder = new Encoder({ useRecords: false });
var encode = defaultEncoder.encode;
var encodeAsIterable = defaultEncoder.encodeAsIterable;
var encodeAsAsyncIterable = defaultEncoder.encodeAsAsyncIterable;
var { NEVER, ALWAYS, DECIMAL_ROUND, DECIMAL_FIT } = FLOAT32_OPTIONS;
var REUSE_BUFFER_MODE = 512;
var RESET_BUFFER_MODE = 1024;
var THROW_ON_ITERABLE = 2048;

// src/lib/cbor/DataItem.ts
var DataItem = class _DataItem {
  #data;
  #buffer;
  constructor(params) {
    if (!("data" in params) && !("buffer" in params)) {
      throw new Error("DataItem must be initialized with either data or buffer");
    }
    if ("data" in params) {
      this.#data = params.data;
      if (!("buffer" in params)) {
        this.#buffer = cborEncode(this.#data);
      }
    }
    if ("buffer" in params) {
      this.#buffer = params.buffer;
    }
  }
  get data() {
    if (!this.#data) {
      this.#data = cborDecode(this.#buffer);
    }
    return this.#data;
  }
  get buffer() {
    if (!this.#buffer) {
      this.#buffer = cborEncode(this.#data, { useFloat32: 0 });
    }
    return this.#buffer;
  }
  static fromData(data) {
    return new _DataItem({ data });
  }
};
addExtension2({
  Class: DataItem,
  tag: 24,
  encode: (instance, encode3) => {
    return encode3(instance.buffer);
  },
  decode: (buffer) => {
    return new DataItem({ buffer });
  }
});

// src/lib/cbor/StringDate.ts
var StringDate = class {
  date;
  formattedDate;
  constructor(date) {
    this.date = date;
    this.formattedDate = this.date.toISOString().split(".")[0] + "Z";
  }
  toBuffer() {
    return cborEncode(this.formattedDate);
  }
};
addExtension2({
  Class: StringDate,
  tag: 0,
  encode: (instance, encode3) => encode3(instance.formattedDate),
  decode: (stringDate) => new Date(stringDate)
});

// src/lib/cbor/index.ts
var encoderDefaults = {
  tagUint8Array: false,
  useRecords: false,
  mapsAsObjects: false,
  // @ts-ignore
  useTag259ForMaps: false
};
addExtension2({
  Class: Date,
  tag: 1004,
  encode: (instance, encode3) => {
    const str = instance.toISOString().split("T")[0];
    return encode3(str);
  },
  decode: (val) => {
    return new Date(val);
  }
});
var cborDecode = (input, options = encoderDefaults) => {
  const params = { ...encoderDefaults, ...options };
  const enc = new Encoder(params);
  return enc.decode(input);
};
var cborEncode = (obj, options = encoderDefaults) => {
  const params = { ...encoderDefaults, ...options };
  const enc = new Encoder(params);
  return enc.encode(obj);
};

// src/lib/MDOC.ts
var blocker = {};
var MDOC = class _MDOC {
  defaultNamespace = "org.iso.18013.5.1";
  mdoc;
  attributes = {};
  static async from(data) {
    const buffer = Buffer.isBuffer(data) ? data : Buffer.from(data, "hex");
    const mdoc = new _MDOC(_MDOC.decode(buffer), blocker);
    const proxy = new Proxy(mdoc, {
      get(target2, prop, receiver) {
        if (target2.hasOwnProperty(prop)) {
          return target2[prop];
        }
        if (target2.attributes.hasOwnProperty(prop)) {
          return target2.attributes[prop];
        }
        return void 0;
      }
    });
    return proxy;
  }
  static decode(data) {
    const mdoc = cborDecode(data);
    return mdoc;
  }
  constructor(mdoc, b) {
    if (b !== blocker)
      throw new Error("Cannot use constructor directly. Use MDOC.from()");
    this.mdoc = mdoc;
    this.buildAttributeMap();
  }
  // TODO: how do we handle multiple mdoc.documents, if each one has the default namespace?
  buildAttributeMap() {
    const nsAttrs = this.mdoc?.get("documents")?.[0]?.get("issuerSigned")?.get("nameSpaces")?.get(this.defaultNamespace);
    if (!nsAttrs)
      throw new Error(`Document does not contain the core namespace "${this.defaultNamespace}"`);
    this.loadAttributes(this.defaultNamespace);
    const namespaces = this.mdoc?.get("documents")?.[0]?.get("issuerSigned")?.get("nameSpaces").keys();
    for (const ns of namespaces) {
      if (ns === this.defaultNamespace)
        continue;
      this.loadAttributes(ns);
    }
  }
  loadAttributes(namespace) {
    const nsAttrs = this.mdoc?.get("documents")?.[0]?.get("issuerSigned")?.get("nameSpaces")?.get(namespace);
    if (namespace === this.defaultNamespace) {
      for (const field of MDL_FIELDS) {
        const attributeName = field.id;
        const attributeValue = this.getElementValue(attributeName, nsAttrs);
        if (attributeValue) {
          this.attributes[attributeName] = attributeValue;
        }
      }
      for (let i = 1; i <= 150; i++) {
        const age = i < 10 ? `0${i}` : i;
        const attributeName = `age_over_${age}`;
        const attributeValue = this.getElementValue(attributeName, nsAttrs);
        if (attributeValue) {
          this.attributes[attributeName] = attributeValue;
        }
      }
    } else {
      for (const item of nsAttrs) {
        const attributeName = item.data?.get("elementIdentifier");
        const attributeValue = this.parseValue(item.data?.get("elementValue"));
        if (attributeValue) {
          this.attributes[attributeName] = attributeValue;
        }
      }
    }
  }
  getElementValue(key, list) {
    const item = list.find((i) => i.data?.get("elementIdentifier") === key);
    const value = item?.data?.get("elementValue");
    return this.parseValue(value);
  }
  parseValue(value) {
    if (Array.isArray(value)) {
      return value.map((item) => {
        return item instanceof Map ? Object.fromEntries(item) : item;
      });
    }
    return value instanceof Map ? Object.fromEntries(value) : value;
  }
};

// node_modules/jose/dist/browser/runtime/webcrypto.js
var webcrypto_default = crypto;
var isCryptoKey = (key) => key instanceof CryptoKey;

// node_modules/jose/dist/browser/lib/buffer_utils.js
var encoder = new TextEncoder();
var decoder2 = new TextDecoder();
var MAX_INT32 = 2 ** 32;

// node_modules/jose/dist/browser/runtime/base64url.js
var encodeBase64 = (input) => {
  let unencoded = input;
  if (typeof unencoded === "string") {
    unencoded = encoder.encode(unencoded);
  }
  const CHUNK_SIZE = 32768;
  const arr = [];
  for (let i = 0; i < unencoded.length; i += CHUNK_SIZE) {
    arr.push(String.fromCharCode.apply(null, unencoded.subarray(i, i + CHUNK_SIZE)));
  }
  return btoa(arr.join(""));
};
var encode2 = (input) => {
  return encodeBase64(input).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
};
var decodeBase64 = (encoded) => {
  const binary = atob(encoded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
};

// node_modules/jose/dist/browser/util/errors.js
var JOSEError = class extends Error {
  static get code() {
    return "ERR_JOSE_GENERIC";
  }
  constructor(message3) {
    var _a3;
    super(message3);
    this.code = "ERR_JOSE_GENERIC";
    this.name = this.constructor.name;
    (_a3 = Error.captureStackTrace) === null || _a3 === void 0 ? void 0 : _a3.call(Error, this, this.constructor);
  }
};
var JOSENotSupported = class extends JOSEError {
  constructor() {
    super(...arguments);
    this.code = "ERR_JOSE_NOT_SUPPORTED";
  }
  static get code() {
    return "ERR_JOSE_NOT_SUPPORTED";
  }
};

// node_modules/jose/dist/browser/runtime/random.js
var random_default = webcrypto_default.getRandomValues.bind(webcrypto_default);

// node_modules/jose/dist/browser/lib/invalid_key_input.js
function message(msg, actual, ...types3) {
  if (types3.length > 2) {
    const last = types3.pop();
    msg += `one of type ${types3.join(", ")}, or ${last}.`;
  } else if (types3.length === 2) {
    msg += `one of type ${types3[0]} or ${types3[1]}.`;
  } else {
    msg += `of type ${types3[0]}.`;
  }
  if (actual == null) {
    msg += ` Received ${actual}`;
  } else if (typeof actual === "function" && actual.name) {
    msg += ` Received function ${actual.name}`;
  } else if (typeof actual === "object" && actual != null) {
    if (actual.constructor && actual.constructor.name) {
      msg += ` Received an instance of ${actual.constructor.name}`;
    }
  }
  return msg;
}
var invalid_key_input_default = (actual, ...types3) => {
  return message("Key must be ", actual, ...types3);
};

// node_modules/jose/dist/browser/runtime/is_key_like.js
var types = ["CryptoKey"];

// node_modules/jose/dist/browser/lib/format_pem.js
var format_pem_default = (b64, descriptor) => {
  const newlined = (b64.match(/.{1,64}/g) || []).join("\n");
  return `-----BEGIN ${descriptor}-----
${newlined}
-----END ${descriptor}-----`;
};

// node_modules/jose/dist/browser/runtime/asn1.js
var findOid = (keyData, oid, from = 0) => {
  if (from === 0) {
    oid.unshift(oid.length);
    oid.unshift(6);
  }
  let i = keyData.indexOf(oid[0], from);
  if (i === -1)
    return false;
  const sub = keyData.subarray(i, i + oid.length);
  if (sub.length !== oid.length)
    return false;
  return sub.every((value, index) => value === oid[index]) || findOid(keyData, oid, i + 1);
};
var getNamedCurve = (keyData) => {
  switch (true) {
    case findOid(keyData, [42, 134, 72, 206, 61, 3, 1, 7]):
      return "P-256";
    case findOid(keyData, [43, 129, 4, 0, 34]):
      return "P-384";
    case findOid(keyData, [43, 129, 4, 0, 35]):
      return "P-521";
    case findOid(keyData, [43, 101, 110]):
      return "X25519";
    case findOid(keyData, [43, 101, 111]):
      return "X448";
    case findOid(keyData, [43, 101, 112]):
      return "Ed25519";
    case findOid(keyData, [43, 101, 113]):
      return "Ed448";
    default:
      throw new JOSENotSupported("Invalid or unsupported EC Key Curve or OKP Key Sub Type");
  }
};
var genericImport = async (replace, keyFormat, pem, alg, options) => {
  var _a3;
  let algorithm;
  let keyUsages;
  const keyData = new Uint8Array(atob(pem.replace(replace, "")).split("").map((c) => c.charCodeAt(0)));
  const isPublic = keyFormat === "spki";
  switch (alg) {
    case "PS256":
    case "PS384":
    case "PS512":
      algorithm = { name: "RSA-PSS", hash: `SHA-${alg.slice(-3)}` };
      keyUsages = isPublic ? ["verify"] : ["sign"];
      break;
    case "RS256":
    case "RS384":
    case "RS512":
      algorithm = { name: "RSASSA-PKCS1-v1_5", hash: `SHA-${alg.slice(-3)}` };
      keyUsages = isPublic ? ["verify"] : ["sign"];
      break;
    case "RSA-OAEP":
    case "RSA-OAEP-256":
    case "RSA-OAEP-384":
    case "RSA-OAEP-512":
      algorithm = {
        name: "RSA-OAEP",
        hash: `SHA-${parseInt(alg.slice(-3), 10) || 1}`
      };
      keyUsages = isPublic ? ["encrypt", "wrapKey"] : ["decrypt", "unwrapKey"];
      break;
    case "ES256":
      algorithm = { name: "ECDSA", namedCurve: "P-256" };
      keyUsages = isPublic ? ["verify"] : ["sign"];
      break;
    case "ES384":
      algorithm = { name: "ECDSA", namedCurve: "P-384" };
      keyUsages = isPublic ? ["verify"] : ["sign"];
      break;
    case "ES512":
      algorithm = { name: "ECDSA", namedCurve: "P-521" };
      keyUsages = isPublic ? ["verify"] : ["sign"];
      break;
    case "ECDH-ES":
    case "ECDH-ES+A128KW":
    case "ECDH-ES+A192KW":
    case "ECDH-ES+A256KW": {
      const namedCurve = getNamedCurve(keyData);
      algorithm = namedCurve.startsWith("P-") ? { name: "ECDH", namedCurve } : { name: namedCurve };
      keyUsages = isPublic ? [] : ["deriveBits"];
      break;
    }
    case "EdDSA":
      algorithm = { name: getNamedCurve(keyData) };
      keyUsages = isPublic ? ["verify"] : ["sign"];
      break;
    default:
      throw new JOSENotSupported('Invalid or unsupported "alg" (Algorithm) value');
  }
  return webcrypto_default.subtle.importKey(keyFormat, keyData, algorithm, (_a3 = options === null || options === void 0 ? void 0 : options.extractable) !== null && _a3 !== void 0 ? _a3 : false, keyUsages);
};
var fromPKCS8 = (pem, alg, options) => {
  return genericImport(/(?:-----(?:BEGIN|END) PRIVATE KEY-----|\s)/g, "pkcs8", pem, alg, options);
};
var fromSPKI = (pem, alg, options) => {
  return genericImport(/(?:-----(?:BEGIN|END) PUBLIC KEY-----|\s)/g, "spki", pem, alg, options);
};
function getElement(seq) {
  let result = [];
  let next = 0;
  while (next < seq.length) {
    let nextPart = parseElement(seq.subarray(next));
    result.push(nextPart);
    next += nextPart.byteLength;
  }
  return result;
}
function parseElement(bytes) {
  let position3 = 0;
  let tag = bytes[0] & 31;
  position3++;
  if (tag === 31) {
    tag = 0;
    while (bytes[position3] >= 128) {
      tag = tag * 128 + bytes[position3] - 128;
      position3++;
    }
    tag = tag * 128 + bytes[position3] - 128;
    position3++;
  }
  let length = 0;
  if (bytes[position3] < 128) {
    length = bytes[position3];
    position3++;
  } else if (length === 128) {
    length = 0;
    while (bytes[position3 + length] !== 0 || bytes[position3 + length + 1] !== 0) {
      if (length > bytes.byteLength) {
        throw new TypeError("invalid indefinite form length");
      }
      length++;
    }
    const byteLength2 = position3 + length + 2;
    return {
      byteLength: byteLength2,
      contents: bytes.subarray(position3, position3 + length),
      raw: bytes.subarray(0, byteLength2)
    };
  } else {
    let numberOfDigits = bytes[position3] & 127;
    position3++;
    length = 0;
    for (let i = 0; i < numberOfDigits; i++) {
      length = length * 256 + bytes[position3];
      position3++;
    }
  }
  const byteLength = position3 + length;
  return {
    byteLength,
    contents: bytes.subarray(position3, byteLength),
    raw: bytes.subarray(0, byteLength)
  };
}
function spkiFromX509(buf) {
  const tbsCertificate2 = getElement(getElement(parseElement(buf).contents)[0].contents);
  return encodeBase64(tbsCertificate2[tbsCertificate2[0].raw[0] === 160 ? 6 : 5].raw);
}
function getSPKI(x509) {
  const pem = x509.replace(/(?:-----(?:BEGIN|END) CERTIFICATE-----|\s)/g, "");
  const raw = decodeBase64(pem);
  return format_pem_default(spkiFromX509(raw), "PUBLIC KEY");
}
var fromX509 = (pem, alg, options) => {
  let spki;
  try {
    spki = getSPKI(pem);
  } catch (cause) {
    throw new TypeError("Failed to parse the X.509 certificate", { cause });
  }
  return fromSPKI(spki, alg, options);
};

// node_modules/jose/dist/browser/key/import.js
async function importX509(x509, alg, options) {
  if (typeof x509 !== "string" || x509.indexOf("-----BEGIN CERTIFICATE-----") !== 0) {
    throw new TypeError('"x509" must be X.509 formatted string');
  }
  return fromX509(x509, alg, options);
}
async function importPKCS8(pkcs8, alg, options) {
  if (typeof pkcs8 !== "string" || pkcs8.indexOf("-----BEGIN PRIVATE KEY-----") !== 0) {
    throw new TypeError('"pkcs8" must be PKCS#8 formatted string');
  }
  return fromPKCS8(pkcs8, alg, options);
}

// node_modules/jose/dist/browser/runtime/key_to_jwk.js
var keyToJWK = async (key) => {
  if (key instanceof Uint8Array) {
    return {
      kty: "oct",
      k: encode2(key)
    };
  }
  if (!isCryptoKey(key)) {
    throw new TypeError(invalid_key_input_default(key, ...types, "Uint8Array"));
  }
  if (!key.extractable) {
    throw new TypeError("non-extractable CryptoKey cannot be exported as a JWK");
  }
  const { ext, key_ops, alg, use, ...jwk } = await webcrypto_default.subtle.exportKey("jwk", key);
  return jwk;
};
var key_to_jwk_default = keyToJWK;

// node_modules/jose/dist/browser/key/export.js
async function exportJWK(key) {
  return key_to_jwk_default(key);
}

// node_modules/jose/dist/browser/jwe/flattened/encrypt.js
var unprotected = Symbol();

// node_modules/jose/dist/browser/lib/secs.js
var minute = 60;
var hour = minute * 60;
var day = hour * 24;
var week = day * 7;
var year = day * 365.25;

// src/lib/cose/keyconverter/keyconvert.ts
var import_str2ab = __toESM(require_str2ab2());

// src/lib/cose/keyconverter/coseKey.ts
var COSEKeyParameterValue = class {
};
var COSEKeyType = class _COSEKeyType extends COSEKeyParameterValue {
  constructor(_name, _value, _description) {
    super();
    this._name = _name;
    this._value = _value;
    this._description = _description;
    _COSEKeyType._values.push(this);
  }
  static _values = [];
  static OKP = new _COSEKeyType("OKP", 1, "Octet Key Pair");
  static EC2 = new _COSEKeyType("EC2", 2, "Elliptic Curve Keys w/ x- and y-coordinate pair");
  static RSA = new _COSEKeyType("RSA", 3, "RSA Key");
  static SYMMETRIC = new _COSEKeyType("Symmetric", 4, "Symmetric Keys");
  static HSS_LMS = new _COSEKeyType("HSS-LMS", 5, "Public key for HSS/LMS hash-based digital signature");
  static WALNUT_DSA = new _COSEKeyType("WalnutDSA", 6, "WalnutDSA	public key");
  get name() {
    return this._name;
  }
  get value() {
    return this._value;
  }
  get description() {
    return this._description;
  }
  static values() {
    return _COSEKeyType._values;
  }
  static fromValue(value) {
    const found = _COSEKeyType.values().find((c) => {
      return c.value === value;
    });
    return found || null;
  }
  static fromName(name) {
    const found = _COSEKeyType.values().find((c) => {
      return c.name === name;
    });
    return found || null;
  }
};
var COSEKeyParameter = class {
};
var COSEKeyCommonParameter = class _COSEKeyCommonParameter extends COSEKeyParameter {
  constructor(_name, _label, _description) {
    super();
    this._name = _name;
    this._label = _label;
    this._description = _description;
    _COSEKeyCommonParameter._values.push(this);
  }
  static _values = [];
  static KTY = new _COSEKeyCommonParameter("kty", 1, "Identification of the key type");
  static KID = new _COSEKeyCommonParameter("kid", 2, "Key identification value -- match to kid in message");
  static ALG = new _COSEKeyCommonParameter("alg", 3, "Key usage restriction to this algorithm");
  static KEY_OPS = new _COSEKeyCommonParameter("key_ops", 4, "Restrict set of permissible operations");
  static BASE_IV = new _COSEKeyCommonParameter("Base IV", 5, "Base IV to be xor-ed with Partial IVs");
  get name() {
    return this._name;
  }
  get label() {
    return this._label;
  }
  get description() {
    return this._description;
  }
  static values() {
    return _COSEKeyCommonParameter._values;
  }
  static fromLabel(label) {
    const found = _COSEKeyCommonParameter.values().find((c) => {
      return c.label === label;
    });
    return found || null;
  }
  static fromName(name) {
    const found = _COSEKeyCommonParameter.values().find((c) => {
      return c.name === name;
    });
    return found || null;
  }
};
var COSEKeyTypeParameter = class _COSEKeyTypeParameter extends COSEKeyParameter {
  constructor(_keyType, _name, _label, _description) {
    super();
    this._keyType = _keyType;
    this._name = _name;
    this._label = _label;
    this._description = _description;
    _COSEKeyTypeParameter._values.push(this);
  }
  static _values = [];
  static OKP_CRV = new _COSEKeyTypeParameter(
    COSEKeyType.OKP,
    "crv",
    -1,
    'EC identifier - Taken from the "COSE Elliptic Curves" registry'
  );
  static OKP_X = new _COSEKeyTypeParameter(COSEKeyType.OKP, "x", -2, "x-coordinate");
  static OKP_D = new _COSEKeyTypeParameter(COSEKeyType.OKP, "d", -4, "Private key");
  static EC2_CRV = new _COSEKeyTypeParameter(
    COSEKeyType.EC2,
    "crv",
    -1,
    'EC identifier - Taken from the "COSE Elliptic Curves" registry'
  );
  static EC2_X = new _COSEKeyTypeParameter(COSEKeyType.EC2, "x", -2, "Public Key");
  static EC2_Y = new _COSEKeyTypeParameter(COSEKeyType.EC2, "y", -3, "y-coordinate");
  static EC2_D = new _COSEKeyTypeParameter(COSEKeyType.EC2, "d", -4, "Private key");
  static RSA_N = new _COSEKeyTypeParameter(COSEKeyType.RSA, "n", -1, "the RSA modulus n");
  static RSA_E = new _COSEKeyTypeParameter(COSEKeyType.RSA, "e", -2, "the RSA public exponent e");
  static RSA_D = new _COSEKeyTypeParameter(COSEKeyType.RSA, "d", -3, "the RSA private exponent d");
  static RSA_P = new _COSEKeyTypeParameter(COSEKeyType.RSA, "p", -4, "the prime factor p of n");
  static RSA_Q = new _COSEKeyTypeParameter(COSEKeyType.RSA, "q", -5, "the prime factor q of n");
  static RSA_DP = new _COSEKeyTypeParameter(COSEKeyType.RSA, "dP", -6, "dP is d mod (p - 1)");
  static RSA_DQ = new _COSEKeyTypeParameter(COSEKeyType.RSA, "dQ", -7, "dQ is d mod (q - 1)");
  static RSA_QINV = new _COSEKeyTypeParameter(
    COSEKeyType.RSA,
    "qInv",
    -8,
    "qInv is the CRT coefficient q^(-1) mod p"
  );
  static OTHER = new _COSEKeyTypeParameter(COSEKeyType.RSA, "other", -9, "other prime infos, an array");
  static R_I = new _COSEKeyTypeParameter(COSEKeyType.RSA, "r_i", -10, "a prime factor r_i of n, where i >= 3");
  static D_I = new _COSEKeyTypeParameter(COSEKeyType.RSA, "d_i", -11, "d_i = d mod (r_i - 1)");
  static T_I = new _COSEKeyTypeParameter(
    COSEKeyType.RSA,
    "t_i",
    -12,
    "the CRT coefficient t_i = (r_1 * r_2 * ... * r_(i-1))^(-1) mod r_i"
  );
  static SYMMETRIC_K = new _COSEKeyTypeParameter(COSEKeyType.SYMMETRIC, "k", -1, "Key Value");
  static PUB = new _COSEKeyTypeParameter(
    COSEKeyType.HSS_LMS,
    "pub",
    -1,
    "Public key for HSS/LMS hash-based digital signature"
  );
  static WALNUTRSA_N = new _COSEKeyTypeParameter(
    COSEKeyType.WALNUT_DSA,
    "N",
    -1,
    "Group and Matrix (NxN) size"
  );
  static WALNUTRSA_Q = new _COSEKeyTypeParameter(COSEKeyType.WALNUT_DSA, "q", -2, "Finite field F_q");
  static T_VALUES = new _COSEKeyTypeParameter(
    COSEKeyType.WALNUT_DSA,
    "t-values",
    -3,
    "List of T-values, entries in F_q"
  );
  static MATRIX_1 = new _COSEKeyTypeParameter(
    COSEKeyType.WALNUT_DSA,
    "matrix 1",
    -4,
    "NxN Matrix of entries in F_q in column-major form"
  );
  static PERMUTATION_1 = new _COSEKeyTypeParameter(
    COSEKeyType.WALNUT_DSA,
    "permutation",
    -5,
    "Permutation associated with matrix 1"
  );
  static MATRIX_2 = new _COSEKeyTypeParameter(
    COSEKeyType.WALNUT_DSA,
    "matrix 2",
    -6,
    "NxN Matrix of entries in F_q in column-major form"
  );
  get keyType() {
    return this._keyType;
  }
  get name() {
    return this._name;
  }
  get label() {
    return this._label;
  }
  get description() {
    return this._description;
  }
  static values() {
    return _COSEKeyTypeParameter._values;
  }
  static fromLabel(keyType, label) {
    const found = _COSEKeyTypeParameter.values().find((c) => {
      return c.keyType === keyType && c.label === label;
    });
    return found || null;
  }
  static fromName(keyType, name) {
    const found = _COSEKeyTypeParameter.values().find((c) => {
      return c.keyType === keyType && c.name === name;
    });
    return found || null;
  }
};
var COSEKeyOperationValue = class _COSEKeyOperationValue extends COSEKeyParameterValue {
  constructor(_name, _value, _description) {
    super();
    this._name = _name;
    this._value = _value;
    this._description = _description;
    _COSEKeyOperationValue._values.push(this);
  }
  static _values = [];
  static SIGN = new _COSEKeyOperationValue(
    "sign",
    1,
    "The key is used to create signatures.  Requires private key fields."
  );
  static VERIFY = new _COSEKeyOperationValue("verify", 2, "The key is used for verification of signatures.");
  static ENCRYPT = new _COSEKeyOperationValue("encrypt", 3, "The key is used for key transport encryption.");
  static DECRYPT = new _COSEKeyOperationValue(
    "decrypt",
    4,
    "The key is used for key transport decryption.  Requires private key fields."
  );
  static WRAP_KEY = new _COSEKeyOperationValue("wrap key", 5, "The key is used for key wrap encryption.");
  static UNWRAP_KEY = new _COSEKeyOperationValue(
    "unwrap key",
    6,
    "The key is used for key wrap decryption.  Requires private key fields."
  );
  static DERIVE_KEY = new _COSEKeyOperationValue(
    "derive key",
    7,
    "The key is used for deriving keys.  Requires private key fields."
  );
  static DERIVE_BITS = new _COSEKeyOperationValue(
    "derive bits",
    8,
    "The key is used for deriving bits not to be used as a key.  Requires private key fields."
  );
  static MAC_CREATE = new _COSEKeyOperationValue("MAC create", 9, "The key is used for creating MACs.");
  static MAC_VERIFY = new _COSEKeyOperationValue("MAC verify", 10, "The key is used for validating MACs.");
  get name() {
    return this._name;
  }
  get value() {
    return this._value;
  }
  get description() {
    return this._description;
  }
  static values() {
    return _COSEKeyOperationValue._values;
  }
  static fromValue(value) {
    const found = _COSEKeyOperationValue.values().find((c) => {
      return c.value === value;
    });
    return found || null;
  }
  static fromName(name) {
    const found = _COSEKeyOperationValue.values().find((c) => {
      return c.name === name;
    });
    return found || null;
  }
};
var COSEEllipticCurve = class _COSEEllipticCurve extends COSEKeyParameterValue {
  constructor(_name, _value, _keyType, _description) {
    super();
    this._name = _name;
    this._value = _value;
    this._keyType = _keyType;
    this._description = _description;
    _COSEEllipticCurve._values.push(this);
  }
  static _values = [];
  static P_256 = new _COSEEllipticCurve("P-256", 1, COSEKeyType.EC2, "NIST P-256 also known as secp256r1");
  static P_384 = new _COSEEllipticCurve("P-384", 2, COSEKeyType.EC2, "NIST P-384 also known as secp384r1");
  static P_512 = new _COSEEllipticCurve("P-512", 3, COSEKeyType.EC2, "NIST P-512 also known as secp512r1");
  static X25519 = new _COSEEllipticCurve("X25519", 4, COSEKeyType.OKP, "X25519 for use w/ ECDH only");
  static X448 = new _COSEEllipticCurve("X448", 5, COSEKeyType.OKP, "X448 for use w/ ECDH only");
  static ED25519 = new _COSEEllipticCurve("Ed25519", 6, COSEKeyType.OKP, "Ed25519 for use w/ EdDSA only");
  static ED448 = new _COSEEllipticCurve("Ed448", 7, COSEKeyType.OKP, "Ed448 for use w/ EdDSA only");
  static SECP256K1 = new _COSEEllipticCurve("secp256k1", 8, COSEKeyType.EC2, "SECG secp256k1 curve");
  get name() {
    return this._name;
  }
  get value() {
    return this._value;
  }
  get keyType() {
    return this._keyType;
  }
  get description() {
    return this._description;
  }
  static values() {
    return _COSEEllipticCurve._values;
  }
  static fromValue(keyType, value) {
    const found = _COSEEllipticCurve.values().find((c) => {
      return c.keyType === keyType && c.value === value;
    });
    return found || null;
  }
  static fromName(keyType, name) {
    const found = _COSEEllipticCurve.values().find((c) => {
      return c.keyType === keyType && c.name === name;
    });
    return found || null;
  }
};
var COSEAlgorithm = class _COSEAlgorithm extends COSEKeyParameterValue {
  constructor(_name, _value, _description, _nodeCryptoHashAlg) {
    super();
    this._name = _name;
    this._value = _value;
    this._description = _description;
    this._nodeCryptoHashAlg = _nodeCryptoHashAlg;
    _COSEAlgorithm._values.push(this);
  }
  static _values = [];
  static RS1 = new _COSEAlgorithm("RS1", -65535, "RSASSA-PKCS1-v1_5 using SHA-1", "sha1");
  static WALNUT_DSA = new _COSEAlgorithm("WalnutDSA", -260, "WalnutDSA signature", null);
  static RS512 = new _COSEAlgorithm("RS512", -259, "RSASSA-PKCS1-v1_5 using SHA-512", "sha512");
  static RS384 = new _COSEAlgorithm("RS384", -258, "RSASSA-PKCS1-v1_5 using SHA-384", "sha384");
  static RS256 = new _COSEAlgorithm("RS256", -257, "RSASSA-PKCS1-v1_5 using SHA-256", "sha256");
  static ES256K = new _COSEAlgorithm("ES256K", -47, "ECDSA using secp256k1 curve and SHA-256", "sha256");
  static HSS_LMS = new _COSEAlgorithm("HSS-LMS", -46, "HSS/LMS hash-based digital signature", null);
  static SHAKE256 = new _COSEAlgorithm("SHAKE256", -45, "SHAKE-256 512-bit Hash Value", null);
  static SHA_512 = new _COSEAlgorithm("SHA-512", -44, "SHA-2 512-bit Hash", null);
  static SHA_384 = new _COSEAlgorithm("SHA-384", -43, "SHA-2 384-bit Hash", null);
  static RSAES_OAEP_w_SHA_512 = new _COSEAlgorithm(
    "RSAES-OAEP w/ SHA-512",
    -42,
    "RSAES-OAEP w/ SHA-512",
    "sha512"
  );
  static RSAES_OAEP_w_SHA_256 = new _COSEAlgorithm(
    "RSAES-OAEP w/ SHA-256",
    -41,
    "RSAES-OAEP w/ SHA-256",
    "sha256"
  );
  static RSAES_OAEP_w_RFC8017_DEFAULT_PARAMETERS = new _COSEAlgorithm(
    "RSAES-OAEP w/ RFC 8017 default parameters",
    -40,
    "RSAES-OAEP w/ SHA-1",
    null
  );
  static PS512 = new _COSEAlgorithm("PS512", -39, "RSASSA-PSS w/ SHA-512", "sha512");
  static PS384 = new _COSEAlgorithm("PS384", -38, "RSASSA-PSS w/ SHA-384", "sha384");
  static PS256 = new _COSEAlgorithm("PS256", -37, "RSASSA-PSS w/ SHA-256", "sha256");
  static ES512 = new _COSEAlgorithm("ES512", -36, "ECDSA w/ SHA-512", "sha512");
  static ES384 = new _COSEAlgorithm("ES384", -35, "ECDSA w/ SHA-384", "sha384");
  static ECDH_SS_A256KW = new _COSEAlgorithm(
    "ECDH-SS + A256KW",
    -34,
    "ECDH SS w/ Concat KDF and AES Key Wrap w/ 256-bit key",
    null
  );
  static ECDH_SS_A192KW = new _COSEAlgorithm(
    "ECDH-SS + A256KW",
    -33,
    "ECDH SS w/ Concat KDF and AES Key Wrap w/ 192-bit key",
    null
  );
  static ECDH_SS_A128KW = new _COSEAlgorithm(
    "ECDH-SS + A128KW",
    -32,
    "ECDH SS w/ Concat KDF and AES Key Wrap w/ 128-bit key",
    null
  );
  static ECDH_ES_A256KW = new _COSEAlgorithm(
    "ECDH-ES + A256KW",
    -31,
    "ECDH ES w/ Concat KDF and AES Key Wrap w/ 256-bit key",
    null
  );
  static ECDH_ES_A192KW = new _COSEAlgorithm(
    "ECDH-ES + A192KW",
    -30,
    "ECDH ES w/ Concat KDF and AES Key Wrap w/ 192-bit key",
    null
  );
  static ECDH_ES_A128KW = new _COSEAlgorithm(
    "ECDH-ES + A128KW",
    -29,
    "ECDH ES w/ Concat KDF and AES Key Wrap w/ 128-bit key",
    null
  );
  static ECDH_SS_HKDF_512 = new _COSEAlgorithm(
    "ECDH-SS + HKDF-512",
    -28,
    "ECDH SS w/ HKDF - generate key directly",
    null
  );
  static ECDH_SS_HKDF_256 = new _COSEAlgorithm(
    "ECDH-SS + HKDF-256",
    -27,
    "ECDH SS w/ HKDF - generate key directly",
    null
  );
  static ECDH_ES_HKDF_512 = new _COSEAlgorithm(
    "ECDH-ES + HKDF-512",
    -26,
    "ECDH ES w/ HKDF - generate key directly",
    null
  );
  static ECDH_ES_HKDF_256 = new _COSEAlgorithm(
    "ECDH-ES + HKDF-256",
    -25,
    "ECDH ES w/ HKDF - generate key directly",
    null
  );
  static SHAKE128 = new _COSEAlgorithm("SHAKE128", -18, "SHAKE-128 512-bit Hash Value", null);
  static SHA_512_256 = new _COSEAlgorithm("SHA-512/256", -17, "SHA-2 512-bit Hash truncated to 256-bits", null);
  static SHA_256 = new _COSEAlgorithm("SHA-256", -16, "SHA-2 256-bit Hash", null);
  static SHA_256_64 = new _COSEAlgorithm("SHA-256/64", -15, "SHA-2 256-bit Hash truncated to 64-bits", null);
  static SHA_1 = new _COSEAlgorithm("SHA-1", -14, "SHA-1 Hash", null);
  static DIRECT_HKDF_AES_256 = new _COSEAlgorithm(
    "direct+HKDF-AES-256",
    -13,
    "Shared secret w/ AES-MAC 256-bit key",
    null
  );
  static DIRECT_HKDF_AES_128 = new _COSEAlgorithm(
    "direct+HKDF-AES-128",
    -12,
    "Shared secret w/ AES-MAC 128-bit key",
    null
  );
  static DIRECT_HKDF_SHA_512 = new _COSEAlgorithm(
    "direct+HKDF-SHA-512",
    -11,
    "Shared secret w/ HKDF and SHA-512",
    null
  );
  static DIRECT_HKDF_SHA_256 = new _COSEAlgorithm(
    "direct+HKDF-SHA-256",
    -10,
    "Shared secret w/ HKDF and SHA-256",
    null
  );
  static EdDSA = new _COSEAlgorithm("EdDSA", -8, "EdDSA", "sha512");
  static ES256 = new _COSEAlgorithm("ES256", -7, "ECDSA w/ SHA-256", "sha256");
  static DIRECT = new _COSEAlgorithm("direct", -6, "Direct use of CEK", null);
  static A256KW = new _COSEAlgorithm("A256KW", -5, "AES Key Wrap w/ 256-bit key", null);
  static A192KW = new _COSEAlgorithm("A192KW", -4, "AES Key Wrap w/ 192-bit key", null);
  static A128KW = new _COSEAlgorithm("A128KW", -3, "AES Key Wrap w/ 128-bit key", null);
  static A128GCM = new _COSEAlgorithm("A128GCM", 1, "AES-GCM mode w/ 128-bit key, 128-bit tag", null);
  static A192GCM = new _COSEAlgorithm("A192GCM", 2, "AES-GCM mode w/ 192-bit key, 128-bit tag", null);
  static A256GCM = new _COSEAlgorithm("A256GCM", 3, "AES-GCM mode w/ 256-bit key, 128-bit tag", null);
  static HMAC_256_64 = new _COSEAlgorithm("HMAC 256/64", 4, "HMAC w/ SHA-256 truncated to 64 bits", "sha256");
  static HMAC_256_256 = new _COSEAlgorithm("HMAC 256/256", 5, "HMAC w/ SHA-256", "sha256");
  static HMAC_384_384 = new _COSEAlgorithm("HMAC 384/384", 6, "HMAC w/ SHA-384", "sha384");
  static HMAC_512_512 = new _COSEAlgorithm("HMAC 512/512", 7, "HMAC w/ SHA-512", "sha512");
  static AES_CCM_16_64_128 = new _COSEAlgorithm(
    "AES-CCM-16-64-128",
    10,
    "AES-CCM mode 128-bit key, 64-bit tag, 13-byte nonce",
    null
  );
  static AES_CCM_16_64_256 = new _COSEAlgorithm(
    "AES-CCM-16-64-256",
    11,
    "AES-CCM mode 256-bit key, 64-bit tag, 13-byte nonce",
    null
  );
  static AES_CCM_64_64_128 = new _COSEAlgorithm(
    "AES-CCM-64-64-128",
    12,
    "AES-CCM mode 128-bit key, 64-bit tag, 7-byte nonce",
    null
  );
  static AES_CCM_64_64_256 = new _COSEAlgorithm(
    "AES-CCM-64-64-256",
    13,
    "AES-CCM mode 256-bit key, 64-bit tag, 7-byte nonce",
    null
  );
  static AES_MAC_128_64 = new _COSEAlgorithm("AES-MAC 128/64", 14, "AES-MAC 128-bit key, 64-bit tag", null);
  static AES_MAC_256_64 = new _COSEAlgorithm("AES-MAC 256/64", 15, "AES-MAC 256-bit key, 64-bit tag", null);
  static CHACHA20_POLY1305 = new _COSEAlgorithm(
    "ChaCha20/Poly1305",
    24,
    "ChaCha20/Poly1305 w/ 256-bit key, 128-bit tag",
    null
  );
  static AES_MAC_128_128 = new _COSEAlgorithm("AES-MAC 128/128", 25, "AES-MAC 128-bit key, 128-bit tag", null);
  static AES_MAC_256_128 = new _COSEAlgorithm("AES-MAC 256/128", 26, "AES-MAC 256-bit key, 128-bit tag", null);
  static AES_CCM_16_128_128 = new _COSEAlgorithm(
    "AES-CCM-16-128-128",
    30,
    "AES-CCM mode 128-bit key, 128-bit tag, 13-byte nonce",
    null
  );
  static AES_CCM_16_128_256 = new _COSEAlgorithm(
    "AES-CCM-16-128-256",
    31,
    "AES-CCM mode 256-bit key, 128-bit tag, 13-byte nonce",
    null
  );
  static AES_CCM_64_128_128 = new _COSEAlgorithm(
    "AES-CCM-64-128-128",
    32,
    "AES-CCM mode 128-bit key, 128-bit tag, 7-byte nonce",
    null
  );
  static AES_CCM_64_128_256 = new _COSEAlgorithm(
    "AES-CCM-64-128-256",
    33,
    "AES-CCM mode 256-bit key, 128-bit tag, 7-byte nonce",
    null
  );
  static IV_GENERATION = new _COSEAlgorithm(
    "IV-GENERATION",
    34,
    "For doing IV generation for symmetric algorithms.",
    null
  );
  get name() {
    return this._name;
  }
  get value() {
    return this._value;
  }
  get description() {
    return this._description;
  }
  get nodeCryptoHashAlg() {
    return this._nodeCryptoHashAlg;
  }
  static values() {
    return _COSEAlgorithm._values;
  }
  static fromValue(value) {
    const found = _COSEAlgorithm.values().find((c) => {
      return c.value === value;
    });
    return found || null;
  }
  static fromName(name) {
    const found = _COSEAlgorithm.values().find((c) => {
      return c.name === name;
    });
    return found || null;
  }
};
var COSEKeyParameterValueMapping = class _COSEKeyParameterValueMapping {
  constructor(_parameter, _value) {
    this._parameter = _parameter;
    this._value = _value;
    _COSEKeyParameterValueMapping._values.push(this);
  }
  static _values = [];
  static KTY = new _COSEKeyParameterValueMapping(COSEKeyCommonParameter.KTY, COSEKeyType);
  static ALG = new _COSEKeyParameterValueMapping(COSEKeyCommonParameter.ALG, COSEAlgorithm);
  static KEY_OPS = new _COSEKeyParameterValueMapping(COSEKeyCommonParameter.KEY_OPS, COSEKeyOperationValue);
  static OKP_CRV = new _COSEKeyParameterValueMapping(COSEKeyTypeParameter.OKP_CRV, COSEEllipticCurve);
  static EC2_CRV = new _COSEKeyParameterValueMapping(COSEKeyTypeParameter.EC2_CRV, COSEEllipticCurve);
  get parameter() {
    return this._parameter;
  }
  get value() {
    return this._value;
  }
  static values() {
    return _COSEKeyParameterValueMapping._values;
  }
  static fromParameter(parameter) {
    const found = _COSEKeyParameterValueMapping.values().find((c) => {
      return c.parameter == parameter;
    });
    return found || null;
  }
  fromParameterLabel(label, keyType) {
    const parameter = COSEKeyCommonParameter.fromLabel(label) || COSEKeyTypeParameter.fromLabel(keyType || COSEKeyType.OKP, label) || null;
    if (!parameter) {
      return null;
    }
    return _COSEKeyParameterValueMapping.fromParameter(parameter);
  }
  fromValueLabel(label) {
    if (this._value === COSEKeyType) {
      return COSEKeyType.fromValue(label);
    } else if (this._value === COSEKeyOperationValue) {
      return COSEKeyOperationValue.fromValue(label);
    } else if (this._value === COSEEllipticCurve) {
      if (this === _COSEKeyParameterValueMapping.OKP_CRV) {
        return COSEEllipticCurve.fromValue(COSEKeyType.OKP, label);
      } else if (this === _COSEKeyParameterValueMapping.EC2_CRV) {
        return COSEEllipticCurve.fromValue(COSEKeyType.EC2, label);
      }
    } else if (this._value === COSEAlgorithm) {
      return COSEAlgorithm.fromValue(label);
    }
    return null;
  }
  fromValueName(name) {
    if (this._value === COSEKeyType) {
      return COSEKeyType.fromName(name);
    } else if (this._value === COSEKeyOperationValue) {
      return COSEKeyOperationValue.fromName(name);
    } else if (this._value === COSEEllipticCurve) {
      if (this === _COSEKeyParameterValueMapping.OKP_CRV) {
        return COSEEllipticCurve.fromName(COSEKeyType.OKP, name);
      } else if (this === _COSEKeyParameterValueMapping.EC2_CRV) {
        return COSEEllipticCurve.fromName(COSEKeyType.EC2, name);
      }
    } else if (this._value === COSEAlgorithm) {
      return COSEAlgorithm.fromName(name);
    }
    return null;
  }
};

// src/lib/cose/keyconverter/joseKey.ts
var JSONWebKeyType = class _JSONWebKeyType {
  /**
   * Private constructor.
   *
   * @param _value key type.key type.
   * @param _description Key type description
   */
  constructor(_value, _description) {
    this._value = _value;
    this._description = _description;
    _JSONWebKeyType._values.push(this);
  }
  static _values = [];
  static EC = new _JSONWebKeyType("EC", "Elliptic Curve");
  static RSA = new _JSONWebKeyType("RSA", "RSA");
  static OCT = new _JSONWebKeyType("oct", "Octet sequence");
  static OKP = new _JSONWebKeyType("OKP", "Octet string key pairs");
  /**
   * Returns key type.
   *
   * @returns Key type
   */
  get value() {
    return this._value;
  }
  /**
   * Returns key type description.
   *
   * @returns Key type description
   */
  get description() {
    return this._description;
  }
  /**
   * Returns all JWK key type class.
   *
   * @returns All JWK key type class
   */
  static values() {
    return _JSONWebKeyType._values;
  }
  /**
   * Returns JWK key type class which has same key type to function's parameter.
   *
   * @param value Target key type
   * @returns JWK key type class, if not found returns null
   */
  static fromValue(value) {
    const found = _JSONWebKeyType.values().find((j) => {
      return j.value === value;
    });
    return found || null;
  }
};
var JSONWebSignatureAndEncryptionAlgorithm = class _JSONWebSignatureAndEncryptionAlgorithm {
  /**
   * Private constructor.
   *
   * @param _name Algorithm name
   * @param _description Algorithm description
   * @param _nodeCryptoHashAlg Node.js crypto module's algorithm name
   */
  constructor(_name, _description, _nodeCryptoHashAlg) {
    this._name = _name;
    this._description = _description;
    this._nodeCryptoHashAlg = _nodeCryptoHashAlg;
    _JSONWebSignatureAndEncryptionAlgorithm._values.push(this);
  }
  static _values = [];
  static HS256 = new _JSONWebSignatureAndEncryptionAlgorithm("HS256", "HMAC using SHA-256", "sha256");
  static HS384 = new _JSONWebSignatureAndEncryptionAlgorithm("HS384", "HMAC using SHA-384", "sha384");
  static HS512 = new _JSONWebSignatureAndEncryptionAlgorithm("HS512", "HMAC using SHA-512", "sha512");
  static RS256 = new _JSONWebSignatureAndEncryptionAlgorithm(
    "RS256",
    "RSASSA-PKCS1-v1_5 using SHA-256",
    "sha256"
  );
  static RS384 = new _JSONWebSignatureAndEncryptionAlgorithm(
    "RS384",
    "RSASSA-PKCS1-v1_5 using SHA-384",
    "sha384"
  );
  static RS512 = new _JSONWebSignatureAndEncryptionAlgorithm(
    "RS512",
    "RSASSA-PKCS1-v1_5 using SHA-512",
    "sha512"
  );
  static ES256 = new _JSONWebSignatureAndEncryptionAlgorithm(
    "ES256",
    "ECDSA using P-256 and SHA-256",
    "sha256"
  );
  static ES384 = new _JSONWebSignatureAndEncryptionAlgorithm(
    "ES384",
    "ECDSA using P-384 and SHA-384",
    "sha384"
  );
  static ES512 = new _JSONWebSignatureAndEncryptionAlgorithm(
    "ES512",
    "ECDSA using P-512 and SHA-512",
    "sha512"
  );
  static PS256 = new _JSONWebSignatureAndEncryptionAlgorithm(
    "PS256",
    "RSASSA-PSS using SHA-256 and MGF1 with SHA-256",
    "sha256"
  );
  static PS384 = new _JSONWebSignatureAndEncryptionAlgorithm(
    "PS384",
    "RSASSA-PSS using SHA-384 and MGF1 with SHA-384",
    "sha384"
  );
  static PS512 = new _JSONWebSignatureAndEncryptionAlgorithm(
    "PS512",
    "RSASSA-PSS using SHA-512 and MGF1 with SHA-512",
    "sha512"
  );
  static NONE = new _JSONWebSignatureAndEncryptionAlgorithm(
    "none",
    "No digital signature or MAC performed",
    null
  );
  static RSA1_5 = new _JSONWebSignatureAndEncryptionAlgorithm("RSA1_5", "RSAES-PKCS1-v1_5", null);
  static RSA_OAEP = new _JSONWebSignatureAndEncryptionAlgorithm(
    "RSA-OAEP",
    "RSAES OAEP using default parameters",
    null
  );
  static RSA_OAEP_256 = new _JSONWebSignatureAndEncryptionAlgorithm(
    "RSA-OAEP-256",
    "RSAES OAEP using SHA-256 and MGF1 with SHA-256",
    "sha256"
  );
  static A128KW = new _JSONWebSignatureAndEncryptionAlgorithm("A128KW", "AES Key Wrap using 128-bit key", null);
  static A192KW = new _JSONWebSignatureAndEncryptionAlgorithm("A192KW", "AES Key Wrap using 192-bit key", null);
  static A256KW = new _JSONWebSignatureAndEncryptionAlgorithm("A256KW", "AES Key Wrap using 256-bit key", null);
  static DIR = new _JSONWebSignatureAndEncryptionAlgorithm("dir", "Direct use of a shared symmetric key", null);
  static ECDH_ES = new _JSONWebSignatureAndEncryptionAlgorithm("ECDH-ES", "ECDH-ES using Concat KDF", null);
  static ECDH_ES_A128KW = new _JSONWebSignatureAndEncryptionAlgorithm(
    "ECDH-ES+A128KW",
    'ECDH-ES using Concat KDF and "A128KW" wrapping',
    null
  );
  static ECDH_ES_A192KW = new _JSONWebSignatureAndEncryptionAlgorithm(
    "ECDH-ES+A192KW",
    'ECDH-ES using Concat KDF and "A192KW" wrapping',
    null
  );
  static ECDH_ES_A256KW = new _JSONWebSignatureAndEncryptionAlgorithm(
    "ECDH-ES+A256KW",
    'ECDH-ES using Concat KDF and "A256KW" wrapping',
    null
  );
  static A128GCMKW = new _JSONWebSignatureAndEncryptionAlgorithm(
    "A128GCMKW",
    "Key wrapping with AES GCM using 128-bit key",
    null
  );
  static A192GCMKW = new _JSONWebSignatureAndEncryptionAlgorithm(
    "A192GCMKW",
    "Key wrapping with AES GCM using 192-bit key",
    null
  );
  static A256GCMKW = new _JSONWebSignatureAndEncryptionAlgorithm(
    "A256GCMKW",
    "Key wrapping with AES GCM using 256-bit key",
    null
  );
  static PBES2_HS256_A128KW = new _JSONWebSignatureAndEncryptionAlgorithm(
    "PBES2-HS256+A128KW",
    'PBES2 with HMAC SHA-256 and "A128KW" wrapping',
    null
  );
  static PBES2_HS384_A192KW = new _JSONWebSignatureAndEncryptionAlgorithm(
    "PBES2-HS384+A192KW",
    'PBES2 with HMAC SHA-384 and "A192KW" wrapping',
    null
  );
  static PBES2_HS512_A256KW = new _JSONWebSignatureAndEncryptionAlgorithm(
    "PBES2-HS512+A256KW",
    'PBES2 with HMAC SHA-512 and "A256KW" wrapping',
    null
  );
  static A128CBC_HS256 = new _JSONWebSignatureAndEncryptionAlgorithm(
    "A128CBC-HS256",
    "AES_128_CBC_HMAC_SHA_256 authenticated encryption algorithm",
    null
  );
  static A192CBC_HS384 = new _JSONWebSignatureAndEncryptionAlgorithm(
    "A192CBC-HS384",
    "AES_192_CBC_HMAC_SHA_384 authenticated encryption algorithm",
    null
  );
  static A256CBC_HS512 = new _JSONWebSignatureAndEncryptionAlgorithm(
    "A256CBC-HS512",
    "AES_256_CBC_HMAC_SHA_512 authenticated encryption algorithm",
    null
  );
  static A128GCM = new _JSONWebSignatureAndEncryptionAlgorithm("A128GCM", "AES GCM using 128-bit key", null);
  static A192GCM = new _JSONWebSignatureAndEncryptionAlgorithm("A192GCM", "AES GCM using 192-bit key", null);
  static A256GCM = new _JSONWebSignatureAndEncryptionAlgorithm("A256GCM", "AES GCM using 256-bit key", null);
  static EdDSA = new _JSONWebSignatureAndEncryptionAlgorithm("EdDSA", "EdDSA signature algorithms", "sha512");
  static RS1 = new _JSONWebSignatureAndEncryptionAlgorithm("RS1", "RSASSA-PKCS1-v1_5 with SHA-1", "sha1");
  static RSA_OAEP_384 = new _JSONWebSignatureAndEncryptionAlgorithm(
    "RSA-OAEP-384",
    "RSA-OAEP using SHA-384 and MGF1 with SHA-384",
    "sha384"
  );
  static RSA_OAEP_512 = new _JSONWebSignatureAndEncryptionAlgorithm(
    "RSA-OAEP-512",
    "RSA-OAEP using SHA-512 and MGF1 with SHA-512",
    "sha512"
  );
  static A128CBC = new _JSONWebSignatureAndEncryptionAlgorithm("A128CBC", "AES CBC using 128 bit key", null);
  static A192CBC = new _JSONWebSignatureAndEncryptionAlgorithm("A192CBC", "AES CBC using 192 bit key", null);
  static A256CBC = new _JSONWebSignatureAndEncryptionAlgorithm("A256CBC", "AES CBC using 256 bit key", null);
  static A128CTR = new _JSONWebSignatureAndEncryptionAlgorithm("A128CTR", "AES CTR using 128 bit key", null);
  static A192CTR = new _JSONWebSignatureAndEncryptionAlgorithm("A192CTR", "AES CTR using 192 bit key", null);
  static A256CTR = new _JSONWebSignatureAndEncryptionAlgorithm("A256CTR", "AES CTR using 256 bit key", null);
  static HS1 = new _JSONWebSignatureAndEncryptionAlgorithm("HS1", "HMAC using SHA-1", "sha1");
  static ES256K = new _JSONWebSignatureAndEncryptionAlgorithm(
    "ES256K",
    "ECDSA using secp256k1 curve and SHA-256",
    "sha256"
  );
  /**
   * Returns algorithm name.
   *
   * @returns Algorithm name
   */
  get name() {
    return this._name;
  }
  /**
   * Returns algorithm description.
   *
   * @returns Algorithm description
   */
  get description() {
    return this._description;
  }
  /**
   * Returns Node.js crypto module's algorithm name.
   *
   * @returns Node.js crypto module's algorithm name
   */
  get nodeCryptoHashAlg() {
    return this._nodeCryptoHashAlg;
  }
  /**
   * Returns all JSON Web Signature and Encryption Algorithms class.
   *
   * @returns All JSON Web Signature and Encryption Algorithms class
   */
  static values() {
    return _JSONWebSignatureAndEncryptionAlgorithm._values;
  }
  /**
   * Returns JSON Web Signature and Encryption Algorithms class which has same algorithm name to function's parameter.
   *
   * @param name Target algorithm name
   * @returns JSON Web Signature and Encryption Algorithms class, if not found returns null
   */
  static fromName(name) {
    const found = _JSONWebSignatureAndEncryptionAlgorithm.values().find((j) => {
      return j.name === name;
    });
    return found || null;
  }
};
var JSONWebKeyEllipticCurve = class _JSONWebKeyEllipticCurve {
  /**
   * Private constructor.
   *
   * @param _name Curve name
   * @param _description Curve description
   */
  constructor(_name, _description) {
    this._name = _name;
    this._description = _description;
    _JSONWebKeyEllipticCurve._values.push(this);
  }
  static _values = [];
  static P_256 = new _JSONWebKeyEllipticCurve("P-256", "P-256 Curve");
  static P_384 = new _JSONWebKeyEllipticCurve("P-384", "P-384 Curve");
  static P_521 = new _JSONWebKeyEllipticCurve("P-521", "P-521 Curve");
  static ED25519 = new _JSONWebKeyEllipticCurve("Ed25519", "Ed25519 signature algorithm key pairs");
  static ED448 = new _JSONWebKeyEllipticCurve("Ed448", "Ed448 signature algorithm key pairs");
  static X25519 = new _JSONWebKeyEllipticCurve("X25519", "X25519 function key pairs");
  static X448 = new _JSONWebKeyEllipticCurve("X448", "X448 function key pairs");
  static SECP256K1 = new _JSONWebKeyEllipticCurve("secp256k1", "SECG secp256k1 curve");
  get name() {
    return this._name;
  }
  get description() {
    return this._description;
  }
  static values() {
    return _JSONWebKeyEllipticCurve._values;
  }
  static fromName(name) {
    const found = _JSONWebKeyEllipticCurve.values().find((j) => {
      return j.name === name;
    });
    return found || null;
  }
};
var JSONWebKeyParameter = class _JSONWebKeyParameter {
  constructor(_name, _description, _usedWith) {
    this._name = _name;
    this._description = _description;
    this._usedWith = _usedWith;
    _JSONWebKeyParameter._values.push(this);
  }
  static _values = [];
  static KTY = new _JSONWebKeyParameter("kty", "Key Type", [
    JSONWebKeyType.EC,
    JSONWebKeyType.RSA,
    JSONWebKeyType.OCT,
    JSONWebKeyType.OKP
  ]);
  static USE = new _JSONWebKeyParameter("use", "Public Key Use", [
    JSONWebKeyType.EC,
    JSONWebKeyType.RSA,
    JSONWebKeyType.OCT,
    JSONWebKeyType.OKP
  ]);
  static KEY_OPS = new _JSONWebKeyParameter("key_ops", "Key Operations", [
    JSONWebKeyType.EC,
    JSONWebKeyType.RSA,
    JSONWebKeyType.OCT,
    JSONWebKeyType.OKP
  ]);
  static ALG = new _JSONWebKeyParameter("alg", "Algorithm", [
    JSONWebKeyType.EC,
    JSONWebKeyType.RSA,
    JSONWebKeyType.OCT,
    JSONWebKeyType.OKP
  ]);
  static KID = new _JSONWebKeyParameter("kid", "Key ID", [
    JSONWebKeyType.EC,
    JSONWebKeyType.RSA,
    JSONWebKeyType.OCT,
    JSONWebKeyType.OKP
  ]);
  static X5U = new _JSONWebKeyParameter("x5u", "X.509 URL", [
    JSONWebKeyType.EC,
    JSONWebKeyType.RSA,
    JSONWebKeyType.OCT,
    JSONWebKeyType.OKP
  ]);
  static X5C = new _JSONWebKeyParameter("x5c", "X.509 Certificate Chain", [
    JSONWebKeyType.EC,
    JSONWebKeyType.RSA,
    JSONWebKeyType.OCT,
    JSONWebKeyType.OKP
  ]);
  static X5T = new _JSONWebKeyParameter("x5t", "X.509 Certificate SHA-1 Thumbprint", [
    JSONWebKeyType.EC,
    JSONWebKeyType.RSA,
    JSONWebKeyType.OCT,
    JSONWebKeyType.OKP
  ]);
  static X5T_SHARP_S256 = new _JSONWebKeyParameter("x5t#S256", "X.509 Certificate SHA-256 Thumbprint", [
    JSONWebKeyType.EC,
    JSONWebKeyType.RSA,
    JSONWebKeyType.OCT,
    JSONWebKeyType.OKP
  ]);
  static EC_CRV = new _JSONWebKeyParameter("crv", "Curve", [JSONWebKeyType.EC]);
  static EC_X = new _JSONWebKeyParameter("x", "X Coordinate", [JSONWebKeyType.EC]);
  static EC_Y = new _JSONWebKeyParameter("y", "Y Coordinate", [JSONWebKeyType.EC]);
  static EC_D = new _JSONWebKeyParameter("d", "ECC Private Key", [JSONWebKeyType.EC]);
  static N = new _JSONWebKeyParameter("n", "Modulus", [JSONWebKeyType.RSA]);
  static E = new _JSONWebKeyParameter("e", "Exponent", [JSONWebKeyType.RSA]);
  static RSA_D = new _JSONWebKeyParameter("d", "Private Exponent", [JSONWebKeyType.RSA]);
  static P = new _JSONWebKeyParameter("p", "First Prime Factor", [JSONWebKeyType.RSA]);
  static Q = new _JSONWebKeyParameter("q", "Second Prime Factor", [JSONWebKeyType.RSA]);
  static DP = new _JSONWebKeyParameter("dp", "First Factor CRT Exponent", [JSONWebKeyType.RSA]);
  static DQ = new _JSONWebKeyParameter("dq", "Second Factor CRT Exponent", [JSONWebKeyType.RSA]);
  static QI = new _JSONWebKeyParameter("qi", "First CRT Coefficient", [JSONWebKeyType.RSA]);
  static OTH = new _JSONWebKeyParameter("oth", "Other Primes Info", [JSONWebKeyType.RSA]);
  static K = new _JSONWebKeyParameter("k", "Key Value", [JSONWebKeyType.OCT]);
  static OKP_CRV = new _JSONWebKeyParameter("crv", "The subtype of key pair", [JSONWebKeyType.OKP]);
  static OKP_D = new _JSONWebKeyParameter("d", "The private key", [JSONWebKeyType.OKP]);
  static OKP_X = new _JSONWebKeyParameter("x", "The public key", [JSONWebKeyType.OKP]);
  static EXT = new _JSONWebKeyParameter("ext", "Extractable", [
    JSONWebKeyType.EC,
    JSONWebKeyType.RSA,
    JSONWebKeyType.OCT,
    JSONWebKeyType.OKP
  ]);
  get name() {
    return this._name;
  }
  get description() {
    return this._description;
  }
  get usedWith() {
    return this._usedWith;
  }
  static values() {
    return _JSONWebKeyParameter._values;
  }
  static fromName(usedWith, name) {
    const found = _JSONWebKeyParameter.values().find((j) => {
      return j.usedWith.includes(usedWith) && j.name === name;
    });
    return found || null;
  }
};
var JSONWebKeyUse = class _JSONWebKeyUse {
  constructor(_value, _description) {
    this._value = _value;
    this._description = _description;
    _JSONWebKeyUse._values.push(this);
  }
  static _values = [];
  static SIG = new _JSONWebKeyUse("sig", "Digital Signature or MAC");
  static ENC = new _JSONWebKeyUse("enc", "Encryption");
  get value() {
    return this._value;
  }
  get description() {
    return this._description;
  }
  static values() {
    return _JSONWebKeyUse._values;
  }
  static fromValue(value) {
    const found = _JSONWebKeyUse.values().find((j) => {
      return j.value === value;
    });
    return found || null;
  }
};
var JSONWebKeyOperation = class _JSONWebKeyOperation {
  constructor(_value, _description) {
    this._value = _value;
    this._description = _description;
    _JSONWebKeyOperation._values.push(this);
  }
  static _values = [];
  static SIGN = new _JSONWebKeyOperation("sign", "Compute digital signature or MAC");
  static VERIFY = new _JSONWebKeyOperation("verify", "Verify digital signature or MAC");
  static ENCRYPT = new _JSONWebKeyOperation("encrypt", "Encrypt content");
  static DECRYPT = new _JSONWebKeyOperation(
    "decrypt",
    "Decrypt content and validate decryption, if applicable"
  );
  static WRAP_KEY = new _JSONWebKeyOperation("wrapKey", "Encrypt key");
  static UNWRAP_KEY = new _JSONWebKeyOperation(
    "unwrapKey",
    "Decrypt key and validate decryption, if applicable"
  );
  static DERIVE_KEY = new _JSONWebKeyOperation("deriveKey", "Derive key");
  static DERIVE_BITS = new _JSONWebKeyOperation("deriveBits", "Derive bits not to be used as a key");
  get value() {
    return this._value;
  }
  get description() {
    return this._description;
  }
  static values() {
    return _JSONWebKeyOperation._values;
  }
  static fromValue(value) {
    const found = _JSONWebKeyOperation.values().find((j) => {
      return j.value === value;
    });
    return found || null;
  }
};

// src/lib/cose/keyconverter/coseJoseMapping.ts
var KeyTypeMapping = class _KeyTypeMapping {
  constructor(_coseKeyType, _jsonWebKeyType) {
    this._coseKeyType = _coseKeyType;
    this._jsonWebKeyType = _jsonWebKeyType;
    _KeyTypeMapping._values.push(this);
  }
  static _values = [];
  static OKP = new _KeyTypeMapping(COSEKeyType.OKP, JSONWebKeyType.OKP);
  static EC2 = new _KeyTypeMapping(COSEKeyType.EC2, JSONWebKeyType.EC);
  static RSA = new _KeyTypeMapping(COSEKeyType.RSA, JSONWebKeyType.RSA);
  get coseKeyType() {
    return this._coseKeyType;
  }
  get jsonWebKeyType() {
    return this._jsonWebKeyType;
  }
  static values() {
    return _KeyTypeMapping._values;
  }
  static fromCOSEKeyType(coseKeyType) {
    const found = _KeyTypeMapping.values().find((m) => {
      return m.coseKeyType === coseKeyType;
    });
    if (found == null) {
      return null;
    }
    return found.jsonWebKeyType;
  }
  static fromCOSEKeyTypeValue(coseKeyTypeValue) {
    const found = _KeyTypeMapping.values().find((m) => {
      return m.coseKeyType.value === coseKeyTypeValue;
    });
    if (found == null) {
      return null;
    }
    return found.jsonWebKeyType;
  }
  static fromJSONWebKeyType(jsonWebKeyType) {
    const found = _KeyTypeMapping.values().find((m) => {
      return m.jsonWebKeyType === jsonWebKeyType;
    });
    if (found == null) {
      return null;
    }
    return found.coseKeyType;
  }
  static fromJSONWebKeyTypeValue(jsonWebKeyTypeValue) {
    const found = _KeyTypeMapping.values().find((m) => {
      return m.jsonWebKeyType.value === jsonWebKeyTypeValue;
    });
    if (found == null) {
      return null;
    }
    return found.coseKeyType;
  }
};
var KeyAlgorithmMapping = class _KeyAlgorithmMapping {
  constructor(_coseAlgorithm, _joseAlgorithm) {
    this._coseAlgorithm = _coseAlgorithm;
    this._joseAlgorithm = _joseAlgorithm;
    _KeyAlgorithmMapping._values.push(this);
  }
  static _values = [];
  static RS1 = new _KeyAlgorithmMapping(
    COSEAlgorithm.RS1,
    JSONWebSignatureAndEncryptionAlgorithm.RS1
  );
  static RS512 = new _KeyAlgorithmMapping(
    COSEAlgorithm.RS512,
    JSONWebSignatureAndEncryptionAlgorithm.RS512
  );
  static RS384 = new _KeyAlgorithmMapping(
    COSEAlgorithm.RS384,
    JSONWebSignatureAndEncryptionAlgorithm.RS384
  );
  static RS256 = new _KeyAlgorithmMapping(
    COSEAlgorithm.RS256,
    JSONWebSignatureAndEncryptionAlgorithm.RS256
  );
  static ES256K = new _KeyAlgorithmMapping(
    COSEAlgorithm.ES256K,
    JSONWebSignatureAndEncryptionAlgorithm.ES256K
  );
  static RSAES_OAEP_SHA512 = new _KeyAlgorithmMapping(
    COSEAlgorithm.RSAES_OAEP_w_SHA_512,
    JSONWebSignatureAndEncryptionAlgorithm.RSA_OAEP_512
  );
  static RSAES_OAEP_SHA256 = new _KeyAlgorithmMapping(
    COSEAlgorithm.RSAES_OAEP_w_SHA_256,
    JSONWebSignatureAndEncryptionAlgorithm.RSA_OAEP_256
  );
  static PS512 = new _KeyAlgorithmMapping(
    COSEAlgorithm.PS512,
    JSONWebSignatureAndEncryptionAlgorithm.PS512
  );
  static PS384 = new _KeyAlgorithmMapping(
    COSEAlgorithm.PS384,
    JSONWebSignatureAndEncryptionAlgorithm.PS384
  );
  static PS256 = new _KeyAlgorithmMapping(
    COSEAlgorithm.PS256,
    JSONWebSignatureAndEncryptionAlgorithm.PS256
  );
  static ES512 = new _KeyAlgorithmMapping(
    COSEAlgorithm.ES512,
    JSONWebSignatureAndEncryptionAlgorithm.ES512
  );
  static ES384 = new _KeyAlgorithmMapping(
    COSEAlgorithm.ES384,
    JSONWebSignatureAndEncryptionAlgorithm.ES384
  );
  static ECDH_ES_A256KW = new _KeyAlgorithmMapping(
    COSEAlgorithm.ECDH_ES_A256KW,
    JSONWebSignatureAndEncryptionAlgorithm.ECDH_ES_A256KW
  );
  static ECDH_ES_A192KW = new _KeyAlgorithmMapping(
    COSEAlgorithm.ECDH_ES_A192KW,
    JSONWebSignatureAndEncryptionAlgorithm.ECDH_ES_A192KW
  );
  static ECDH_ES_A128KW = new _KeyAlgorithmMapping(
    COSEAlgorithm.ECDH_ES_A128KW,
    JSONWebSignatureAndEncryptionAlgorithm.ECDH_ES_A128KW
  );
  static EdDSA = new _KeyAlgorithmMapping(
    COSEAlgorithm.EdDSA,
    JSONWebSignatureAndEncryptionAlgorithm.EdDSA
  );
  static ES256 = new _KeyAlgorithmMapping(
    COSEAlgorithm.ES256,
    JSONWebSignatureAndEncryptionAlgorithm.ES256
  );
  static DIRECT = new _KeyAlgorithmMapping(
    COSEAlgorithm.DIRECT,
    JSONWebSignatureAndEncryptionAlgorithm.DIR
  );
  static A256KW = new _KeyAlgorithmMapping(
    COSEAlgorithm.A256KW,
    JSONWebSignatureAndEncryptionAlgorithm.A256KW
  );
  static A192KW = new _KeyAlgorithmMapping(
    COSEAlgorithm.A192KW,
    JSONWebSignatureAndEncryptionAlgorithm.A192KW
  );
  static A128KW = new _KeyAlgorithmMapping(
    COSEAlgorithm.A128KW,
    JSONWebSignatureAndEncryptionAlgorithm.A128KW
  );
  static A128GCM = new _KeyAlgorithmMapping(
    COSEAlgorithm.A128GCM,
    JSONWebSignatureAndEncryptionAlgorithm.A128GCM
  );
  static A192GCM = new _KeyAlgorithmMapping(
    COSEAlgorithm.A192GCM,
    JSONWebSignatureAndEncryptionAlgorithm.A192GCM
  );
  static A256GCM = new _KeyAlgorithmMapping(
    COSEAlgorithm.A256GCM,
    JSONWebSignatureAndEncryptionAlgorithm.A256GCM
  );
  get coseAlgorithm() {
    return this._coseAlgorithm;
  }
  get joseAlgorithm() {
    return this._joseAlgorithm;
  }
  static values() {
    return _KeyAlgorithmMapping._values;
  }
  static fromCOSEAlgorithm(coseAlgorithm) {
    const found = _KeyAlgorithmMapping.values().find((m) => {
      return m.coseAlgorithm === coseAlgorithm;
    });
    if (found == null) {
      return null;
    }
    return found.joseAlgorithm;
  }
  static fromCOSEAlgorithmValue(coseAlgorithmValue) {
    const found = _KeyAlgorithmMapping.values().find((m) => {
      return m.coseAlgorithm.value === coseAlgorithmValue;
    });
    if (found == null) {
      return null;
    }
    return found.joseAlgorithm;
  }
  static fromJoseAlgorithm(joseAlgorithm) {
    const found = _KeyAlgorithmMapping.values().find((m) => {
      return m.joseAlgorithm === joseAlgorithm;
    });
    if (found == null) {
      return null;
    }
    return found.coseAlgorithm;
  }
  static fromJoseAlgorithmName(joseAlgorithmName) {
    const found = _KeyAlgorithmMapping.values().find((m) => {
      return m.joseAlgorithm.name === joseAlgorithmName;
    });
    if (found == null) {
      return null;
    }
    return found.coseAlgorithm;
  }
};
var KeyParameterMapping = class _KeyParameterMapping {
  constructor(_coseKeyParameter, _jsonWebKeyParameter) {
    this._coseKeyParameter = _coseKeyParameter;
    this._jsonWebKeyParameter = _jsonWebKeyParameter;
    _KeyParameterMapping._values.push(this);
  }
  static _values = [];
  static KTY = new _KeyParameterMapping(COSEKeyCommonParameter.KTY, JSONWebKeyParameter.KTY);
  static KID = new _KeyParameterMapping(COSEKeyCommonParameter.KID, JSONWebKeyParameter.KID);
  static ALG = new _KeyParameterMapping(COSEKeyCommonParameter.ALG, JSONWebKeyParameter.ALG);
  static KEY_OPS = new _KeyParameterMapping(
    COSEKeyCommonParameter.KEY_OPS,
    JSONWebKeyParameter.KEY_OPS
  );
  static OKP_CRV = new _KeyParameterMapping(
    COSEKeyTypeParameter.OKP_CRV,
    JSONWebKeyParameter.OKP_CRV
  );
  static OKP_X = new _KeyParameterMapping(
    COSEKeyTypeParameter.OKP_X,
    JSONWebKeyParameter.OKP_X
  );
  static OKP_D = new _KeyParameterMapping(
    COSEKeyTypeParameter.OKP_D,
    JSONWebKeyParameter.OKP_D
  );
  static EC2_CRV = new _KeyParameterMapping(
    COSEKeyTypeParameter.EC2_CRV,
    JSONWebKeyParameter.EC_CRV
  );
  static EC2_X = new _KeyParameterMapping(COSEKeyTypeParameter.EC2_X, JSONWebKeyParameter.EC_X);
  static EC2_Y = new _KeyParameterMapping(COSEKeyTypeParameter.EC2_Y, JSONWebKeyParameter.EC_Y);
  static EC2_D = new _KeyParameterMapping(COSEKeyTypeParameter.EC2_D, JSONWebKeyParameter.EC_D);
  static RSA_N = new _KeyParameterMapping(COSEKeyTypeParameter.RSA_N, JSONWebKeyParameter.N);
  static RSA_E = new _KeyParameterMapping(COSEKeyTypeParameter.RSA_E, JSONWebKeyParameter.E);
  static RSA_D = new _KeyParameterMapping(
    COSEKeyTypeParameter.RSA_D,
    JSONWebKeyParameter.RSA_D
  );
  static RSA_P = new _KeyParameterMapping(COSEKeyTypeParameter.RSA_P, JSONWebKeyParameter.P);
  static RSA_Q = new _KeyParameterMapping(COSEKeyTypeParameter.RSA_Q, JSONWebKeyParameter.Q);
  static RSA_DP = new _KeyParameterMapping(COSEKeyTypeParameter.RSA_DP, JSONWebKeyParameter.DP);
  static RSA_DQ = new _KeyParameterMapping(COSEKeyTypeParameter.RSA_DQ, JSONWebKeyParameter.DQ);
  static OTHER = new _KeyParameterMapping(COSEKeyTypeParameter.OTHER, JSONWebKeyParameter.OTH);
  get coseKeyParameter() {
    return this._coseKeyParameter;
  }
  get jsonWebKeyParameter() {
    return this._jsonWebKeyParameter;
  }
  static values() {
    return _KeyParameterMapping._values;
  }
  static fromCOSEKeyParameter(coseKeyParameter) {
    const found = _KeyParameterMapping.values().find((m) => {
      return m.coseKeyParameter === coseKeyParameter;
    });
    if (found == null) {
      return null;
    }
    return found.jsonWebKeyParameter;
  }
  static fromCOSEKeyParameterLabel(coseKeyParameterLabel) {
    const found = _KeyParameterMapping.values().find((m) => {
      return m.coseKeyParameter.label === coseKeyParameterLabel;
    });
    if (found == null) {
      return null;
    }
    return found.jsonWebKeyParameter;
  }
  static fromJSONWebKeyParameter(jsonWebKeyParameter) {
    const found = _KeyParameterMapping.values().find((m) => {
      return m.jsonWebKeyParameter === jsonWebKeyParameter;
    });
    if (found == null) {
      return null;
    }
    return found.coseKeyParameter;
  }
  static fromJSONWebKeyParameterName(jsonWebKeyParameterName) {
    const found = _KeyParameterMapping.values().find((m) => {
      return m.jsonWebKeyParameter.name === jsonWebKeyParameterName;
    });
    if (found == null) {
      return null;
    }
    return found.coseKeyParameter;
  }
};
var KeyOperationMapping = class _KeyOperationMapping {
  constructor(_coseKeyOperation, _jsonWebKeyOperation) {
    this._coseKeyOperation = _coseKeyOperation;
    this._jsonWebKeyOperation = _jsonWebKeyOperation;
    _KeyOperationMapping._values.push(this);
  }
  static _values = [];
  static SIGN = new _KeyOperationMapping(COSEKeyOperationValue.SIGN, JSONWebKeyOperation.SIGN);
  static VERIFY = new _KeyOperationMapping(
    COSEKeyOperationValue.VERIFY,
    JSONWebKeyOperation.VERIFY
  );
  static ENCRYPT = new _KeyOperationMapping(
    COSEKeyOperationValue.ENCRYPT,
    JSONWebKeyOperation.ENCRYPT
  );
  static DECRYPT = new _KeyOperationMapping(
    COSEKeyOperationValue.DECRYPT,
    JSONWebKeyOperation.DECRYPT
  );
  static WRAP_KEY = new _KeyOperationMapping(
    COSEKeyOperationValue.WRAP_KEY,
    JSONWebKeyOperation.WRAP_KEY
  );
  static UNWRAP_KEY = new _KeyOperationMapping(
    COSEKeyOperationValue.UNWRAP_KEY,
    JSONWebKeyOperation.UNWRAP_KEY
  );
  static DERIVE_KEY = new _KeyOperationMapping(
    COSEKeyOperationValue.DERIVE_KEY,
    JSONWebKeyOperation.DERIVE_KEY
  );
  static DERIVE_BITS = new _KeyOperationMapping(
    COSEKeyOperationValue.DERIVE_BITS,
    JSONWebKeyOperation.DERIVE_BITS
  );
  get coseKeyOperation() {
    return this._coseKeyOperation;
  }
  get jsonWebKeyOperation() {
    return this._jsonWebKeyOperation;
  }
  static values() {
    return _KeyOperationMapping._values;
  }
  static fromCOSEKeyOperation(coseKeyOperation) {
    const found = _KeyOperationMapping.values().find((m) => {
      return m.coseKeyOperation === coseKeyOperation;
    });
    if (found == null) {
      return null;
    }
    return found.jsonWebKeyOperation;
  }
  static fromCOSEKeyOperationValue(coseKeyOperationValue) {
    const found = _KeyOperationMapping.values().find((m) => {
      return m.coseKeyOperation.value === coseKeyOperationValue;
    });
    if (found == null) {
      return null;
    }
    return found.jsonWebKeyOperation;
  }
  static fromJSONWebKeyOperation(jsonWebKeyOperation) {
    const found = _KeyOperationMapping.values().find((m) => {
      return m.jsonWebKeyOperation === jsonWebKeyOperation;
    });
    if (found == null) {
      return null;
    }
    return found.coseKeyOperation;
  }
  static fromJSONWebKeyOperationValue(jsonWebKeyOperationValue) {
    const found = _KeyOperationMapping.values().find((m) => {
      return m.jsonWebKeyOperation.value === jsonWebKeyOperationValue;
    });
    if (found == null) {
      return null;
    }
    return found.coseKeyOperation;
  }
};
var EllipticCurveMapping = class _EllipticCurveMapping {
  constructor(_coseEllipticCurve, _jsonWebKeyEllipticCurve) {
    this._coseEllipticCurve = _coseEllipticCurve;
    this._jsonWebKeyEllipticCurve = _jsonWebKeyEllipticCurve;
    _EllipticCurveMapping._values.push(this);
  }
  static _values = [];
  static P_256 = new _EllipticCurveMapping(
    COSEEllipticCurve.P_256,
    JSONWebKeyEllipticCurve.P_256
  );
  static P_384 = new _EllipticCurveMapping(
    COSEEllipticCurve.P_384,
    JSONWebKeyEllipticCurve.P_384
  );
  static P_512 = new _EllipticCurveMapping(
    COSEEllipticCurve.P_512,
    JSONWebKeyEllipticCurve.P_521
  );
  static X25519 = new _EllipticCurveMapping(
    COSEEllipticCurve.X25519,
    JSONWebKeyEllipticCurve.X25519
  );
  static X448 = new _EllipticCurveMapping(COSEEllipticCurve.X448, JSONWebKeyEllipticCurve.X448);
  static ED25519 = new _EllipticCurveMapping(
    COSEEllipticCurve.ED25519,
    JSONWebKeyEllipticCurve.ED25519
  );
  static ED448 = new _EllipticCurveMapping(
    COSEEllipticCurve.ED448,
    JSONWebKeyEllipticCurve.ED448
  );
  static SECP256K1 = new _EllipticCurveMapping(
    COSEEllipticCurve.SECP256K1,
    JSONWebKeyEllipticCurve.SECP256K1
  );
  get coseEllipticCurve() {
    return this._coseEllipticCurve;
  }
  get jsonWebKeyEllipticCurve() {
    return this._jsonWebKeyEllipticCurve;
  }
  static values() {
    return _EllipticCurveMapping._values;
  }
  static fromCOSEEllipticCurve(coseEllipticCurve) {
    const found = _EllipticCurveMapping.values().find((m) => {
      return m.coseEllipticCurve === coseEllipticCurve;
    });
    if (found == null) {
      return null;
    }
    return found.jsonWebKeyEllipticCurve;
  }
  static fromCOSEEllipticCurveValue(coseEllipticCurveValue) {
    const found = _EllipticCurveMapping.values().find((m) => {
      return m.coseEllipticCurve.value === coseEllipticCurveValue;
    });
    if (found == null) {
      return null;
    }
    return found.jsonWebKeyEllipticCurve;
  }
  static fromJSONWebKeyEllipticCurve(jsonWebKeyEllipticCurve) {
    const found = _EllipticCurveMapping.values().find((m) => {
      return m.jsonWebKeyEllipticCurve === jsonWebKeyEllipticCurve;
    });
    if (found == null) {
      return null;
    }
    return found.coseEllipticCurve;
  }
  static fromJSONWebKeyEllipticCurveName(jsonWebKeyEllipticCurveValue) {
    const found = _EllipticCurveMapping.values().find((m) => {
      return m.jsonWebKeyEllipticCurve.name === jsonWebKeyEllipticCurveValue;
    });
    if (found == null) {
      return null;
    }
    return found.coseEllipticCurve;
  }
};

// src/lib/cose/keyconverter/utils.ts
function convertJoseCoseValue(parameterValue) {
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

// src/lib/cose/keyconverter/keyconvert.ts
var BUFFER_TYPE_COSE_KEY_PARAMETER_NAME = [
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
  "pub"
];
function jwk2cose(jwk) {
  const keyTypeValue = jwk.kty;
  if (!keyTypeValue) {
    throw new Error('jwk does not have "kty".');
  }
  const keyType = JSONWebKeyType.fromValue(keyTypeValue);
  if (keyType == null) {
    throw new Error("Cannot convert key type.");
  }
  const coseMap = /* @__PURE__ */ new Map();
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
      if (typeof value === "string" && /[a-zA-Z0-9\-_]+/.test(value) && BUFFER_TYPE_COSE_KEY_PARAMETER_NAME.includes(coseKeyParameter.name)) {
        coseMap.set(Number(coseKeyParameter.label), import_str2ab.default.base64url2buffer(value));
      } else {
        coseMap.set(Number(coseKeyParameter.label), value);
      }
    }
  }
  return coseMap;
}
function findJSONWebKeyParameterFromName(name, keyType) {
  return JSONWebKeyParameter.fromName(keyType, name);
}
function convertJoseCoseKey(keyParameter) {
  return KeyParameterMapping.fromJSONWebKeyParameter(keyParameter);
}
function findJSONWebKeyParameterValueFromValue(value) {
  if (typeof value !== "string") {
    return null;
  }
  const param = JSONWebKeyType.fromValue(value) || JSONWebKeyEllipticCurve.fromName(value) || JSONWebKeyUse.fromValue(value) || JSONWebKeyOperation.fromValue(value) || JSONWebSignatureAndEncryptionAlgorithm.fromName(value);
  return param;
}

// src/lib/utils.ts
function maybeEncodeValue(key, value) {
  const tag = TAG_MAP[key];
  if (!tag)
    return value;
  if (tag === 1004)
    return new Date(value);
  throw new Error(`Unknown tag "${tag}"`);
}
function fromPEM(pem) {
  const base64 = pem.replace(/-{5}(BEGIN|END) .*-{5}/gm, "").replace(/\s/gm, "");
  return Buffer.from(base64, "base64");
}
function jwk2COSE_Key(jwk) {
  const coseMap = jwk2cose(jwk);
  return coseMap;
}

// node_modules/pkijs/build/index.es.js
var index_es_exports = {};
__export(index_es_exports, {
  AbstractCryptoEngine: () => AbstractCryptoEngine,
  AccessDescription: () => AccessDescription,
  Accuracy: () => Accuracy,
  AlgorithmIdentifier: () => AlgorithmIdentifier,
  AltName: () => AltName,
  ArgumentError: () => ArgumentError,
  AsnError: () => AsnError,
  AttCertValidityPeriod: () => AttCertValidityPeriod,
  Attribute: () => Attribute,
  AttributeCertificateInfoV1: () => AttributeCertificateInfoV1,
  AttributeCertificateInfoV2: () => AttributeCertificateInfoV2,
  AttributeCertificateV1: () => AttributeCertificateV1,
  AttributeCertificateV2: () => AttributeCertificateV2,
  AttributeTypeAndValue: () => AttributeTypeAndValue,
  AuthenticatedSafe: () => AuthenticatedSafe,
  AuthorityKeyIdentifier: () => AuthorityKeyIdentifier,
  BasicConstraints: () => BasicConstraints,
  BasicOCSPResponse: () => BasicOCSPResponse,
  CAVersion: () => CAVersion,
  CRLBag: () => CRLBag,
  CRLDistributionPoints: () => CRLDistributionPoints,
  CertBag: () => CertBag,
  CertID: () => CertID,
  Certificate: () => Certificate,
  CertificateChainValidationEngine: () => CertificateChainValidationEngine,
  CertificatePolicies: () => CertificatePolicies,
  CertificateRevocationList: () => CertificateRevocationList,
  CertificateSet: () => CertificateSet,
  CertificateTemplate: () => CertificateTemplate,
  CertificationRequest: () => CertificationRequest,
  ChainValidationCode: () => ChainValidationCode,
  ChainValidationError: () => ChainValidationError,
  ContentInfo: () => ContentInfo,
  CryptoEngine: () => CryptoEngine,
  DigestInfo: () => DigestInfo,
  DistributionPoint: () => DistributionPoint,
  ECCCMSSharedInfo: () => ECCCMSSharedInfo,
  ECNamedCurves: () => ECNamedCurves,
  ECPrivateKey: () => ECPrivateKey,
  ECPublicKey: () => ECPublicKey,
  EncapsulatedContentInfo: () => EncapsulatedContentInfo,
  EncryptedContentInfo: () => EncryptedContentInfo,
  EncryptedData: () => EncryptedData,
  EnvelopedData: () => EnvelopedData,
  ExtKeyUsage: () => ExtKeyUsage,
  Extension: () => Extension,
  ExtensionValueFactory: () => ExtensionValueFactory,
  Extensions: () => Extensions,
  GeneralName: () => GeneralName,
  GeneralNames: () => GeneralNames,
  GeneralSubtree: () => GeneralSubtree,
  HASHED_MESSAGE: () => HASHED_MESSAGE,
  HASH_ALGORITHM: () => HASH_ALGORITHM,
  Holder: () => Holder,
  InfoAccess: () => InfoAccess,
  IssuerAndSerialNumber: () => IssuerAndSerialNumber,
  IssuerSerial: () => IssuerSerial,
  IssuingDistributionPoint: () => IssuingDistributionPoint,
  KEKIdentifier: () => KEKIdentifier,
  KEKRecipientInfo: () => KEKRecipientInfo,
  KeyAgreeRecipientIdentifier: () => KeyAgreeRecipientIdentifier,
  KeyAgreeRecipientInfo: () => KeyAgreeRecipientInfo,
  KeyBag: () => KeyBag,
  KeyTransRecipientInfo: () => KeyTransRecipientInfo,
  MICROS: () => MICROS,
  MILLIS: () => MILLIS,
  MacData: () => MacData,
  MessageImprint: () => MessageImprint,
  NameConstraints: () => NameConstraints,
  OCSPRequest: () => OCSPRequest,
  OCSPResponse: () => OCSPResponse,
  ObjectDigestInfo: () => ObjectDigestInfo,
  OriginatorIdentifierOrKey: () => OriginatorIdentifierOrKey,
  OriginatorInfo: () => OriginatorInfo,
  OriginatorPublicKey: () => OriginatorPublicKey,
  OtherCertificateFormat: () => OtherCertificateFormat,
  OtherKeyAttribute: () => OtherKeyAttribute,
  OtherPrimeInfo: () => OtherPrimeInfo,
  OtherRecipientInfo: () => OtherRecipientInfo,
  OtherRevocationInfoFormat: () => OtherRevocationInfoFormat,
  PBES2Params: () => PBES2Params,
  PBKDF2Params: () => PBKDF2Params,
  PFX: () => PFX,
  PKCS8ShroudedKeyBag: () => PKCS8ShroudedKeyBag,
  PKIStatus: () => PKIStatus,
  PKIStatusInfo: () => PKIStatusInfo,
  POLICY_IDENTIFIER: () => POLICY_IDENTIFIER,
  POLICY_QUALIFIERS: () => POLICY_QUALIFIERS,
  ParameterError: () => ParameterError,
  PasswordRecipientinfo: () => PasswordRecipientinfo,
  PkiObject: () => PkiObject,
  PolicyConstraints: () => PolicyConstraints,
  PolicyInformation: () => PolicyInformation,
  PolicyMapping: () => PolicyMapping,
  PolicyMappings: () => PolicyMappings,
  PolicyQualifierInfo: () => PolicyQualifierInfo,
  PrivateKeyInfo: () => PrivateKeyInfo,
  PrivateKeyUsagePeriod: () => PrivateKeyUsagePeriod,
  PublicKeyInfo: () => PublicKeyInfo,
  QCStatement: () => QCStatement,
  QCStatements: () => QCStatements,
  RDN: () => RDN,
  RSAESOAEPParams: () => RSAESOAEPParams,
  RSAPrivateKey: () => RSAPrivateKey,
  RSAPublicKey: () => RSAPublicKey,
  RSASSAPSSParams: () => RSASSAPSSParams,
  RecipientEncryptedKey: () => RecipientEncryptedKey,
  RecipientEncryptedKeys: () => RecipientEncryptedKeys,
  RecipientIdentifier: () => RecipientIdentifier,
  RecipientInfo: () => RecipientInfo,
  RecipientKeyIdentifier: () => RecipientKeyIdentifier,
  RelativeDistinguishedNames: () => RelativeDistinguishedNames,
  Request: () => Request,
  ResponseBytes: () => ResponseBytes,
  ResponseData: () => ResponseData,
  RevocationInfoChoices: () => RevocationInfoChoices,
  RevokedCertificate: () => RevokedCertificate,
  SECONDS: () => SECONDS,
  SafeBag: () => SafeBag,
  SafeBagValueFactory: () => SafeBagValueFactory,
  SafeContents: () => SafeContents,
  SecretBag: () => SecretBag,
  Signature: () => Signature,
  SignedAndUnsignedAttributes: () => SignedAndUnsignedAttributes,
  SignedCertificateTimestamp: () => SignedCertificateTimestamp,
  SignedCertificateTimestampList: () => SignedCertificateTimestampList,
  SignedData: () => SignedData,
  SignedDataVerifyError: () => SignedDataVerifyError,
  SignerInfo: () => SignerInfo,
  SingleResponse: () => SingleResponse,
  SubjectDirectoryAttributes: () => SubjectDirectoryAttributes,
  TBSRequest: () => TBSRequest,
  TSTInfo: () => TSTInfo,
  TYPE: () => TYPE$4,
  TYPE_AND_VALUES: () => TYPE_AND_VALUES,
  Time: () => Time,
  TimeStampReq: () => TimeStampReq,
  TimeStampResp: () => TimeStampResp,
  TimeType: () => TimeType,
  V2Form: () => V2Form,
  VALUE: () => VALUE$5,
  VALUE_BEFORE_DECODE: () => VALUE_BEFORE_DECODE,
  checkCA: () => checkCA,
  createCMSECDSASignature: () => createCMSECDSASignature,
  createECDSASignatureFromCMS: () => createECDSASignatureFromCMS,
  engine: () => engine,
  getAlgorithmByOID: () => getAlgorithmByOID,
  getAlgorithmParameters: () => getAlgorithmParameters,
  getCrypto: () => getCrypto,
  getEngine: () => getEngine,
  getHashAlgorithm: () => getHashAlgorithm,
  getOIDByAlgorithm: () => getOIDByAlgorithm,
  getRandomValues: () => getRandomValues,
  id_AnyPolicy: () => id_AnyPolicy,
  id_AuthorityInfoAccess: () => id_AuthorityInfoAccess,
  id_AuthorityKeyIdentifier: () => id_AuthorityKeyIdentifier,
  id_BaseCRLNumber: () => id_BaseCRLNumber,
  id_BasicConstraints: () => id_BasicConstraints,
  id_CRLBag_X509CRL: () => id_CRLBag_X509CRL,
  id_CRLDistributionPoints: () => id_CRLDistributionPoints,
  id_CRLNumber: () => id_CRLNumber,
  id_CRLReason: () => id_CRLReason,
  id_CertBag_AttributeCertificate: () => id_CertBag_AttributeCertificate,
  id_CertBag_SDSICertificate: () => id_CertBag_SDSICertificate,
  id_CertBag_X509Certificate: () => id_CertBag_X509Certificate,
  id_CertificateIssuer: () => id_CertificateIssuer,
  id_CertificatePolicies: () => id_CertificatePolicies,
  id_ContentType_Data: () => id_ContentType_Data,
  id_ContentType_EncryptedData: () => id_ContentType_EncryptedData,
  id_ContentType_EnvelopedData: () => id_ContentType_EnvelopedData,
  id_ContentType_SignedData: () => id_ContentType_SignedData,
  id_ExtKeyUsage: () => id_ExtKeyUsage,
  id_FreshestCRL: () => id_FreshestCRL,
  id_InhibitAnyPolicy: () => id_InhibitAnyPolicy,
  id_InvalidityDate: () => id_InvalidityDate,
  id_IssuerAltName: () => id_IssuerAltName,
  id_IssuingDistributionPoint: () => id_IssuingDistributionPoint,
  id_KeyUsage: () => id_KeyUsage,
  id_MicrosoftAppPolicies: () => id_MicrosoftAppPolicies,
  id_MicrosoftCaVersion: () => id_MicrosoftCaVersion,
  id_MicrosoftCertTemplateV1: () => id_MicrosoftCertTemplateV1,
  id_MicrosoftCertTemplateV2: () => id_MicrosoftCertTemplateV2,
  id_MicrosoftPrevCaCertHash: () => id_MicrosoftPrevCaCertHash,
  id_NameConstraints: () => id_NameConstraints,
  id_PKIX_OCSP_Basic: () => id_PKIX_OCSP_Basic,
  id_PolicyConstraints: () => id_PolicyConstraints,
  id_PolicyMappings: () => id_PolicyMappings,
  id_PrivateKeyUsagePeriod: () => id_PrivateKeyUsagePeriod,
  id_QCStatements: () => id_QCStatements,
  id_SignedCertificateTimestampList: () => id_SignedCertificateTimestampList,
  id_SubjectAltName: () => id_SubjectAltName,
  id_SubjectDirectoryAttributes: () => id_SubjectDirectoryAttributes,
  id_SubjectInfoAccess: () => id_SubjectInfoAccess,
  id_SubjectKeyIdentifier: () => id_SubjectKeyIdentifier,
  id_ad: () => id_ad,
  id_ad_caIssuers: () => id_ad_caIssuers,
  id_ad_ocsp: () => id_ad_ocsp,
  id_eContentType_TSTInfo: () => id_eContentType_TSTInfo,
  id_pkix: () => id_pkix,
  id_sha1: () => id_sha1,
  id_sha256: () => id_sha256,
  id_sha384: () => id_sha384,
  id_sha512: () => id_sha512,
  kdf: () => kdf,
  setEngine: () => setEngine,
  stringPrep: () => stringPrep,
  verifySCTsForCertificate: () => verifySCTsForCertificate
});

// node_modules/asn1js/build/index.es.js
var pvtsutils = __toESM(require_build());

// node_modules/pvutils/build/utils.es.js
function getParametersValue(parameters, name, defaultValue) {
  var _a3;
  if (parameters instanceof Object === false) {
    return defaultValue;
  }
  return (_a3 = parameters[name]) !== null && _a3 !== void 0 ? _a3 : defaultValue;
}
function bufferToHexCodes(inputBuffer, inputOffset = 0, inputLength = inputBuffer.byteLength - inputOffset, insertSpace = false) {
  let result = "";
  for (const item of new Uint8Array(inputBuffer, inputOffset, inputLength)) {
    const str = item.toString(16).toUpperCase();
    if (str.length === 1) {
      result += "0";
    }
    result += str;
    if (insertSpace) {
      result += " ";
    }
  }
  return result.trim();
}
function utilFromBase(inputBuffer, inputBase) {
  let result = 0;
  if (inputBuffer.length === 1) {
    return inputBuffer[0];
  }
  for (let i = inputBuffer.length - 1; i >= 0; i--) {
    result += inputBuffer[inputBuffer.length - 1 - i] * Math.pow(2, inputBase * i);
  }
  return result;
}
function utilToBase(value, base, reserved = -1) {
  const internalReserved = reserved;
  let internalValue = value;
  let result = 0;
  let biggest = Math.pow(2, base);
  for (let i = 1; i < 8; i++) {
    if (value < biggest) {
      let retBuf;
      if (internalReserved < 0) {
        retBuf = new ArrayBuffer(i);
        result = i;
      } else {
        if (internalReserved < i) {
          return new ArrayBuffer(0);
        }
        retBuf = new ArrayBuffer(internalReserved);
        result = internalReserved;
      }
      const retView = new Uint8Array(retBuf);
      for (let j = i - 1; j >= 0; j--) {
        const basis = Math.pow(2, j * base);
        retView[result - j - 1] = Math.floor(internalValue / basis);
        internalValue -= retView[result - j - 1] * basis;
      }
      return retBuf;
    }
    biggest *= Math.pow(2, base);
  }
  return new ArrayBuffer(0);
}
function utilConcatBuf(...buffers) {
  let outputLength = 0;
  let prevLength = 0;
  for (const buffer of buffers) {
    outputLength += buffer.byteLength;
  }
  const retBuf = new ArrayBuffer(outputLength);
  const retView = new Uint8Array(retBuf);
  for (const buffer of buffers) {
    retView.set(new Uint8Array(buffer), prevLength);
    prevLength += buffer.byteLength;
  }
  return retBuf;
}
function utilConcatView(...views) {
  let outputLength = 0;
  let prevLength = 0;
  for (const view of views) {
    outputLength += view.length;
  }
  const retBuf = new ArrayBuffer(outputLength);
  const retView = new Uint8Array(retBuf);
  for (const view of views) {
    retView.set(view, prevLength);
    prevLength += view.length;
  }
  return retView;
}
function utilDecodeTC() {
  const buf = new Uint8Array(this.valueHex);
  if (this.valueHex.byteLength >= 2) {
    const condition1 = buf[0] === 255 && buf[1] & 128;
    const condition2 = buf[0] === 0 && (buf[1] & 128) === 0;
    if (condition1 || condition2) {
      this.warnings.push("Needlessly long format");
    }
  }
  const bigIntBuffer = new ArrayBuffer(this.valueHex.byteLength);
  const bigIntView = new Uint8Array(bigIntBuffer);
  for (let i = 0; i < this.valueHex.byteLength; i++) {
    bigIntView[i] = 0;
  }
  bigIntView[0] = buf[0] & 128;
  const bigInt = utilFromBase(bigIntView, 8);
  const smallIntBuffer = new ArrayBuffer(this.valueHex.byteLength);
  const smallIntView = new Uint8Array(smallIntBuffer);
  for (let j = 0; j < this.valueHex.byteLength; j++) {
    smallIntView[j] = buf[j];
  }
  smallIntView[0] &= 127;
  const smallInt = utilFromBase(smallIntView, 8);
  return smallInt - bigInt;
}
function utilEncodeTC(value) {
  const modValue = value < 0 ? value * -1 : value;
  let bigInt = 128;
  for (let i = 1; i < 8; i++) {
    if (modValue <= bigInt) {
      if (value < 0) {
        const smallInt = bigInt - modValue;
        const retBuf2 = utilToBase(smallInt, 8, i);
        const retView2 = new Uint8Array(retBuf2);
        retView2[0] |= 128;
        return retBuf2;
      }
      let retBuf = utilToBase(modValue, 8, i);
      let retView = new Uint8Array(retBuf);
      if (retView[0] & 128) {
        const tempBuf = retBuf.slice(0);
        const tempView = new Uint8Array(tempBuf);
        retBuf = new ArrayBuffer(retBuf.byteLength + 1);
        retView = new Uint8Array(retBuf);
        for (let k = 0; k < tempBuf.byteLength; k++) {
          retView[k + 1] = tempView[k];
        }
        retView[0] = 0;
      }
      return retBuf;
    }
    bigInt *= Math.pow(2, 8);
  }
  return new ArrayBuffer(0);
}
function isEqualBuffer(inputBuffer1, inputBuffer2) {
  if (inputBuffer1.byteLength !== inputBuffer2.byteLength) {
    return false;
  }
  const view1 = new Uint8Array(inputBuffer1);
  const view2 = new Uint8Array(inputBuffer2);
  for (let i = 0; i < view1.length; i++) {
    if (view1[i] !== view2[i]) {
      return false;
    }
  }
  return true;
}
function padNumber(inputNumber, fullLength) {
  const str = inputNumber.toString(10);
  if (fullLength < str.length) {
    return "";
  }
  const dif = fullLength - str.length;
  const padding = new Array(dif);
  for (let i = 0; i < dif; i++) {
    padding[i] = "0";
  }
  const paddingString = padding.join("");
  return paddingString.concat(str);
}
var base64Template = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var base64UrlTemplate = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=";
function toBase64(input, useUrlTemplate = false, skipPadding = false, skipLeadingZeros = false) {
  let i = 0;
  let flag1 = 0;
  let flag2 = 0;
  let output = "";
  const template = useUrlTemplate ? base64UrlTemplate : base64Template;
  if (skipLeadingZeros) {
    let nonZeroPosition = 0;
    for (let i2 = 0; i2 < input.length; i2++) {
      if (input.charCodeAt(i2) !== 0) {
        nonZeroPosition = i2;
        break;
      }
    }
    input = input.slice(nonZeroPosition);
  }
  while (i < input.length) {
    const chr1 = input.charCodeAt(i++);
    if (i >= input.length) {
      flag1 = 1;
    }
    const chr2 = input.charCodeAt(i++);
    if (i >= input.length) {
      flag2 = 1;
    }
    const chr3 = input.charCodeAt(i++);
    const enc1 = chr1 >> 2;
    const enc2 = (chr1 & 3) << 4 | chr2 >> 4;
    let enc3 = (chr2 & 15) << 2 | chr3 >> 6;
    let enc4 = chr3 & 63;
    if (flag1 === 1) {
      enc3 = enc4 = 64;
    } else {
      if (flag2 === 1) {
        enc4 = 64;
      }
    }
    if (skipPadding) {
      if (enc3 === 64) {
        output += `${template.charAt(enc1)}${template.charAt(enc2)}`;
      } else {
        if (enc4 === 64) {
          output += `${template.charAt(enc1)}${template.charAt(enc2)}${template.charAt(enc3)}`;
        } else {
          output += `${template.charAt(enc1)}${template.charAt(enc2)}${template.charAt(enc3)}${template.charAt(enc4)}`;
        }
      }
    } else {
      output += `${template.charAt(enc1)}${template.charAt(enc2)}${template.charAt(enc3)}${template.charAt(enc4)}`;
    }
  }
  return output;
}
function fromBase64(input, useUrlTemplate = false, cutTailZeros = false) {
  const template = useUrlTemplate ? base64UrlTemplate : base64Template;
  function indexOf(toSearch) {
    for (let i2 = 0; i2 < 64; i2++) {
      if (template.charAt(i2) === toSearch)
        return i2;
    }
    return 64;
  }
  function test(incoming) {
    return incoming === 64 ? 0 : incoming;
  }
  let i = 0;
  let output = "";
  while (i < input.length) {
    const enc1 = indexOf(input.charAt(i++));
    const enc2 = i >= input.length ? 0 : indexOf(input.charAt(i++));
    const enc3 = i >= input.length ? 0 : indexOf(input.charAt(i++));
    const enc4 = i >= input.length ? 0 : indexOf(input.charAt(i++));
    const chr1 = test(enc1) << 2 | test(enc2) >> 4;
    const chr2 = (test(enc2) & 15) << 4 | test(enc3) >> 2;
    const chr3 = (test(enc3) & 3) << 6 | test(enc4);
    output += String.fromCharCode(chr1);
    if (enc3 !== 64) {
      output += String.fromCharCode(chr2);
    }
    if (enc4 !== 64) {
      output += String.fromCharCode(chr3);
    }
  }
  if (cutTailZeros) {
    const outputLength = output.length;
    let nonZeroStart = -1;
    for (let i2 = outputLength - 1; i2 >= 0; i2--) {
      if (output.charCodeAt(i2) !== 0) {
        nonZeroStart = i2;
        break;
      }
    }
    if (nonZeroStart !== -1) {
      output = output.slice(0, nonZeroStart + 1);
    } else {
      output = "";
    }
  }
  return output;
}
function arrayBufferToString(buffer) {
  let resultString = "";
  const view = new Uint8Array(buffer);
  for (const element of view) {
    resultString += String.fromCharCode(element);
  }
  return resultString;
}
function stringToArrayBuffer(str) {
  const stringLength = str.length;
  const resultBuffer = new ArrayBuffer(stringLength);
  const resultView = new Uint8Array(resultBuffer);
  for (let i = 0; i < stringLength; i++) {
    resultView[i] = str.charCodeAt(i);
  }
  return resultBuffer;
}
var log2 = Math.log(2);
function nearestPowerOf2(length) {
  const base = Math.log(length) / log2;
  const floor = Math.floor(base);
  const round = Math.round(base);
  return floor === round ? floor : round;
}
function clearProps(object, propsArray) {
  for (const prop of propsArray) {
    delete object[prop];
  }
}

// node_modules/asn1js/build/index.es.js
function assertBigInt() {
  if (typeof BigInt === "undefined") {
    throw new Error("BigInt is not defined. Your environment doesn't implement BigInt.");
  }
}
function concat2(buffers) {
  let outputLength = 0;
  let prevLength = 0;
  for (let i = 0; i < buffers.length; i++) {
    const buffer = buffers[i];
    outputLength += buffer.byteLength;
  }
  const retView = new Uint8Array(outputLength);
  for (let i = 0; i < buffers.length; i++) {
    const buffer = buffers[i];
    retView.set(new Uint8Array(buffer), prevLength);
    prevLength += buffer.byteLength;
  }
  return retView.buffer;
}
function checkBufferParams(baseBlock, inputBuffer, inputOffset, inputLength) {
  if (!(inputBuffer instanceof Uint8Array)) {
    baseBlock.error = "Wrong parameter: inputBuffer must be 'Uint8Array'";
    return false;
  }
  if (!inputBuffer.byteLength) {
    baseBlock.error = "Wrong parameter: inputBuffer has zero length";
    return false;
  }
  if (inputOffset < 0) {
    baseBlock.error = "Wrong parameter: inputOffset less than zero";
    return false;
  }
  if (inputLength < 0) {
    baseBlock.error = "Wrong parameter: inputLength less than zero";
    return false;
  }
  if (inputBuffer.byteLength - inputOffset - inputLength < 0) {
    baseBlock.error = "End of input reached before message was fully decoded (inconsistent offset and length values)";
    return false;
  }
  return true;
}
var ViewWriter = class {
  constructor() {
    this.items = [];
  }
  write(buf) {
    this.items.push(buf);
  }
  final() {
    return concat2(this.items);
  }
};
var powers2 = [new Uint8Array([1])];
var digitsString = "0123456789";
var NAME = "name";
var VALUE_HEX_VIEW = "valueHexView";
var IS_HEX_ONLY = "isHexOnly";
var ID_BLOCK = "idBlock";
var TAG_CLASS = "tagClass";
var TAG_NUMBER = "tagNumber";
var IS_CONSTRUCTED = "isConstructed";
var FROM_BER = "fromBER";
var TO_BER = "toBER";
var LOCAL = "local";
var EMPTY_STRING = "";
var EMPTY_BUFFER = new ArrayBuffer(0);
var EMPTY_VIEW = new Uint8Array(0);
var END_OF_CONTENT_NAME = "EndOfContent";
var OCTET_STRING_NAME = "OCTET STRING";
var BIT_STRING_NAME = "BIT STRING";
function HexBlock(BaseClass) {
  var _a3;
  return _a3 = class Some extends BaseClass {
    constructor(...args) {
      var _a4;
      super(...args);
      const params = args[0] || {};
      this.isHexOnly = (_a4 = params.isHexOnly) !== null && _a4 !== void 0 ? _a4 : false;
      this.valueHexView = params.valueHex ? pvtsutils.BufferSourceConverter.toUint8Array(params.valueHex) : EMPTY_VIEW;
    }
    get valueHex() {
      return this.valueHexView.slice().buffer;
    }
    set valueHex(value) {
      this.valueHexView = new Uint8Array(value);
    }
    fromBER(inputBuffer, inputOffset, inputLength) {
      const view = inputBuffer instanceof ArrayBuffer ? new Uint8Array(inputBuffer) : inputBuffer;
      if (!checkBufferParams(this, view, inputOffset, inputLength)) {
        return -1;
      }
      const endLength = inputOffset + inputLength;
      this.valueHexView = view.subarray(inputOffset, endLength);
      if (!this.valueHexView.length) {
        this.warnings.push("Zero buffer length");
        return inputOffset;
      }
      this.blockLength = inputLength;
      return endLength;
    }
    toBER(sizeOnly = false) {
      if (!this.isHexOnly) {
        this.error = "Flag 'isHexOnly' is not set, abort";
        return EMPTY_BUFFER;
      }
      if (sizeOnly) {
        return new ArrayBuffer(this.valueHexView.byteLength);
      }
      return this.valueHexView.byteLength === this.valueHexView.buffer.byteLength ? this.valueHexView.buffer : this.valueHexView.slice().buffer;
    }
    toJSON() {
      return {
        ...super.toJSON(),
        isHexOnly: this.isHexOnly,
        valueHex: pvtsutils.Convert.ToHex(this.valueHexView)
      };
    }
  }, _a3.NAME = "hexBlock", _a3;
}
var LocalBaseBlock = class {
  constructor({ blockLength = 0, error = EMPTY_STRING, warnings = [], valueBeforeDecode = EMPTY_VIEW } = {}) {
    this.blockLength = blockLength;
    this.error = error;
    this.warnings = warnings;
    this.valueBeforeDecodeView = pvtsutils.BufferSourceConverter.toUint8Array(valueBeforeDecode);
  }
  static blockName() {
    return this.NAME;
  }
  get valueBeforeDecode() {
    return this.valueBeforeDecodeView.slice().buffer;
  }
  set valueBeforeDecode(value) {
    this.valueBeforeDecodeView = new Uint8Array(value);
  }
  toJSON() {
    return {
      blockName: this.constructor.NAME,
      blockLength: this.blockLength,
      error: this.error,
      warnings: this.warnings,
      valueBeforeDecode: pvtsutils.Convert.ToHex(this.valueBeforeDecodeView)
    };
  }
};
LocalBaseBlock.NAME = "baseBlock";
var ValueBlock = class extends LocalBaseBlock {
  fromBER(inputBuffer, inputOffset, inputLength) {
    throw TypeError("User need to make a specific function in a class which extends 'ValueBlock'");
  }
  toBER(sizeOnly, writer) {
    throw TypeError("User need to make a specific function in a class which extends 'ValueBlock'");
  }
};
ValueBlock.NAME = "valueBlock";
var LocalIdentificationBlock = class extends HexBlock(LocalBaseBlock) {
  constructor({ idBlock = {} } = {}) {
    var _a3, _b, _c, _d;
    super();
    if (idBlock) {
      this.isHexOnly = (_a3 = idBlock.isHexOnly) !== null && _a3 !== void 0 ? _a3 : false;
      this.valueHexView = idBlock.valueHex ? pvtsutils.BufferSourceConverter.toUint8Array(idBlock.valueHex) : EMPTY_VIEW;
      this.tagClass = (_b = idBlock.tagClass) !== null && _b !== void 0 ? _b : -1;
      this.tagNumber = (_c = idBlock.tagNumber) !== null && _c !== void 0 ? _c : -1;
      this.isConstructed = (_d = idBlock.isConstructed) !== null && _d !== void 0 ? _d : false;
    } else {
      this.tagClass = -1;
      this.tagNumber = -1;
      this.isConstructed = false;
    }
  }
  toBER(sizeOnly = false) {
    let firstOctet = 0;
    switch (this.tagClass) {
      case 1:
        firstOctet |= 0;
        break;
      case 2:
        firstOctet |= 64;
        break;
      case 3:
        firstOctet |= 128;
        break;
      case 4:
        firstOctet |= 192;
        break;
      default:
        this.error = "Unknown tag class";
        return EMPTY_BUFFER;
    }
    if (this.isConstructed)
      firstOctet |= 32;
    if (this.tagNumber < 31 && !this.isHexOnly) {
      const retView2 = new Uint8Array(1);
      if (!sizeOnly) {
        let number = this.tagNumber;
        number &= 31;
        firstOctet |= number;
        retView2[0] = firstOctet;
      }
      return retView2.buffer;
    }
    if (!this.isHexOnly) {
      const encodedBuf = utilToBase(this.tagNumber, 7);
      const encodedView = new Uint8Array(encodedBuf);
      const size = encodedBuf.byteLength;
      const retView2 = new Uint8Array(size + 1);
      retView2[0] = firstOctet | 31;
      if (!sizeOnly) {
        for (let i = 0; i < size - 1; i++)
          retView2[i + 1] = encodedView[i] | 128;
        retView2[size] = encodedView[size - 1];
      }
      return retView2.buffer;
    }
    const retView = new Uint8Array(this.valueHexView.byteLength + 1);
    retView[0] = firstOctet | 31;
    if (!sizeOnly) {
      const curView = this.valueHexView;
      for (let i = 0; i < curView.length - 1; i++)
        retView[i + 1] = curView[i] | 128;
      retView[this.valueHexView.byteLength] = curView[curView.length - 1];
    }
    return retView.buffer;
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    const inputView = pvtsutils.BufferSourceConverter.toUint8Array(inputBuffer);
    if (!checkBufferParams(this, inputView, inputOffset, inputLength)) {
      return -1;
    }
    const intBuffer = inputView.subarray(inputOffset, inputOffset + inputLength);
    if (intBuffer.length === 0) {
      this.error = "Zero buffer length";
      return -1;
    }
    const tagClassMask = intBuffer[0] & 192;
    switch (tagClassMask) {
      case 0:
        this.tagClass = 1;
        break;
      case 64:
        this.tagClass = 2;
        break;
      case 128:
        this.tagClass = 3;
        break;
      case 192:
        this.tagClass = 4;
        break;
      default:
        this.error = "Unknown tag class";
        return -1;
    }
    this.isConstructed = (intBuffer[0] & 32) === 32;
    this.isHexOnly = false;
    const tagNumberMask = intBuffer[0] & 31;
    if (tagNumberMask !== 31) {
      this.tagNumber = tagNumberMask;
      this.blockLength = 1;
    } else {
      let count = 1;
      let intTagNumberBuffer = this.valueHexView = new Uint8Array(255);
      let tagNumberBufferMaxLength = 255;
      while (intBuffer[count] & 128) {
        intTagNumberBuffer[count - 1] = intBuffer[count] & 127;
        count++;
        if (count >= intBuffer.length) {
          this.error = "End of input reached before message was fully decoded";
          return -1;
        }
        if (count === tagNumberBufferMaxLength) {
          tagNumberBufferMaxLength += 255;
          const tempBufferView2 = new Uint8Array(tagNumberBufferMaxLength);
          for (let i = 0; i < intTagNumberBuffer.length; i++)
            tempBufferView2[i] = intTagNumberBuffer[i];
          intTagNumberBuffer = this.valueHexView = new Uint8Array(tagNumberBufferMaxLength);
        }
      }
      this.blockLength = count + 1;
      intTagNumberBuffer[count - 1] = intBuffer[count] & 127;
      const tempBufferView = new Uint8Array(count);
      for (let i = 0; i < count; i++)
        tempBufferView[i] = intTagNumberBuffer[i];
      intTagNumberBuffer = this.valueHexView = new Uint8Array(count);
      intTagNumberBuffer.set(tempBufferView);
      if (this.blockLength <= 9)
        this.tagNumber = utilFromBase(intTagNumberBuffer, 7);
      else {
        this.isHexOnly = true;
        this.warnings.push("Tag too long, represented as hex-coded");
      }
    }
    if (this.tagClass === 1 && this.isConstructed) {
      switch (this.tagNumber) {
        case 1:
        case 2:
        case 5:
        case 6:
        case 9:
        case 13:
        case 14:
        case 23:
        case 24:
        case 31:
        case 32:
        case 33:
        case 34:
          this.error = "Constructed encoding used for primitive type";
          return -1;
      }
    }
    return inputOffset + this.blockLength;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      tagClass: this.tagClass,
      tagNumber: this.tagNumber,
      isConstructed: this.isConstructed
    };
  }
};
LocalIdentificationBlock.NAME = "identificationBlock";
var LocalLengthBlock = class extends LocalBaseBlock {
  constructor({ lenBlock = {} } = {}) {
    var _a3, _b, _c;
    super();
    this.isIndefiniteForm = (_a3 = lenBlock.isIndefiniteForm) !== null && _a3 !== void 0 ? _a3 : false;
    this.longFormUsed = (_b = lenBlock.longFormUsed) !== null && _b !== void 0 ? _b : false;
    this.length = (_c = lenBlock.length) !== null && _c !== void 0 ? _c : 0;
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    const view = pvtsutils.BufferSourceConverter.toUint8Array(inputBuffer);
    if (!checkBufferParams(this, view, inputOffset, inputLength)) {
      return -1;
    }
    const intBuffer = view.subarray(inputOffset, inputOffset + inputLength);
    if (intBuffer.length === 0) {
      this.error = "Zero buffer length";
      return -1;
    }
    if (intBuffer[0] === 255) {
      this.error = "Length block 0xFF is reserved by standard";
      return -1;
    }
    this.isIndefiniteForm = intBuffer[0] === 128;
    if (this.isIndefiniteForm) {
      this.blockLength = 1;
      return inputOffset + this.blockLength;
    }
    this.longFormUsed = !!(intBuffer[0] & 128);
    if (this.longFormUsed === false) {
      this.length = intBuffer[0];
      this.blockLength = 1;
      return inputOffset + this.blockLength;
    }
    const count = intBuffer[0] & 127;
    if (count > 8) {
      this.error = "Too big integer";
      return -1;
    }
    if (count + 1 > intBuffer.length) {
      this.error = "End of input reached before message was fully decoded";
      return -1;
    }
    const lenOffset = inputOffset + 1;
    const lengthBufferView = view.subarray(lenOffset, lenOffset + count);
    if (lengthBufferView[count - 1] === 0)
      this.warnings.push("Needlessly long encoded length");
    this.length = utilFromBase(lengthBufferView, 8);
    if (this.longFormUsed && this.length <= 127)
      this.warnings.push("Unnecessary usage of long length form");
    this.blockLength = count + 1;
    return inputOffset + this.blockLength;
  }
  toBER(sizeOnly = false) {
    let retBuf;
    let retView;
    if (this.length > 127)
      this.longFormUsed = true;
    if (this.isIndefiniteForm) {
      retBuf = new ArrayBuffer(1);
      if (sizeOnly === false) {
        retView = new Uint8Array(retBuf);
        retView[0] = 128;
      }
      return retBuf;
    }
    if (this.longFormUsed) {
      const encodedBuf = utilToBase(this.length, 8);
      if (encodedBuf.byteLength > 127) {
        this.error = "Too big length";
        return EMPTY_BUFFER;
      }
      retBuf = new ArrayBuffer(encodedBuf.byteLength + 1);
      if (sizeOnly)
        return retBuf;
      const encodedView = new Uint8Array(encodedBuf);
      retView = new Uint8Array(retBuf);
      retView[0] = encodedBuf.byteLength | 128;
      for (let i = 0; i < encodedBuf.byteLength; i++)
        retView[i + 1] = encodedView[i];
      return retBuf;
    }
    retBuf = new ArrayBuffer(1);
    if (sizeOnly === false) {
      retView = new Uint8Array(retBuf);
      retView[0] = this.length;
    }
    return retBuf;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      isIndefiniteForm: this.isIndefiniteForm,
      longFormUsed: this.longFormUsed,
      length: this.length
    };
  }
};
LocalLengthBlock.NAME = "lengthBlock";
var typeStore = {};
var BaseBlock = class extends LocalBaseBlock {
  constructor({ name = EMPTY_STRING, optional = false, primitiveSchema, ...parameters } = {}, valueBlockType) {
    super(parameters);
    this.name = name;
    this.optional = optional;
    if (primitiveSchema) {
      this.primitiveSchema = primitiveSchema;
    }
    this.idBlock = new LocalIdentificationBlock(parameters);
    this.lenBlock = new LocalLengthBlock(parameters);
    this.valueBlock = valueBlockType ? new valueBlockType(parameters) : new ValueBlock(parameters);
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    const resultOffset = this.valueBlock.fromBER(inputBuffer, inputOffset, this.lenBlock.isIndefiniteForm ? inputLength : this.lenBlock.length);
    if (resultOffset === -1) {
      this.error = this.valueBlock.error;
      return resultOffset;
    }
    if (!this.idBlock.error.length)
      this.blockLength += this.idBlock.blockLength;
    if (!this.lenBlock.error.length)
      this.blockLength += this.lenBlock.blockLength;
    if (!this.valueBlock.error.length)
      this.blockLength += this.valueBlock.blockLength;
    return resultOffset;
  }
  toBER(sizeOnly, writer) {
    const _writer = writer || new ViewWriter();
    if (!writer) {
      prepareIndefiniteForm(this);
    }
    const idBlockBuf = this.idBlock.toBER(sizeOnly);
    _writer.write(idBlockBuf);
    if (this.lenBlock.isIndefiniteForm) {
      _writer.write(new Uint8Array([128]).buffer);
      this.valueBlock.toBER(sizeOnly, _writer);
      _writer.write(new ArrayBuffer(2));
    } else {
      const valueBlockBuf = this.valueBlock.toBER(sizeOnly);
      this.lenBlock.length = valueBlockBuf.byteLength;
      const lenBlockBuf = this.lenBlock.toBER(sizeOnly);
      _writer.write(lenBlockBuf);
      _writer.write(valueBlockBuf);
    }
    if (!writer) {
      return _writer.final();
    }
    return EMPTY_BUFFER;
  }
  toJSON() {
    const object = {
      ...super.toJSON(),
      idBlock: this.idBlock.toJSON(),
      lenBlock: this.lenBlock.toJSON(),
      valueBlock: this.valueBlock.toJSON(),
      name: this.name,
      optional: this.optional
    };
    if (this.primitiveSchema)
      object.primitiveSchema = this.primitiveSchema.toJSON();
    return object;
  }
  toString(encoding = "ascii") {
    if (encoding === "ascii") {
      return this.onAsciiEncoding();
    }
    return pvtsutils.Convert.ToHex(this.toBER());
  }
  onAsciiEncoding() {
    return `${this.constructor.NAME} : ${pvtsutils.Convert.ToHex(this.valueBlock.valueBeforeDecodeView)}`;
  }
  isEqual(other) {
    if (this === other) {
      return true;
    }
    if (!(other instanceof this.constructor)) {
      return false;
    }
    const thisRaw = this.toBER();
    const otherRaw = other.toBER();
    return isEqualBuffer(thisRaw, otherRaw);
  }
};
BaseBlock.NAME = "BaseBlock";
function prepareIndefiniteForm(baseBlock) {
  if (baseBlock instanceof typeStore.Constructed) {
    for (const value of baseBlock.valueBlock.value) {
      if (prepareIndefiniteForm(value)) {
        baseBlock.lenBlock.isIndefiniteForm = true;
      }
    }
  }
  return !!baseBlock.lenBlock.isIndefiniteForm;
}
var BaseStringBlock = class extends BaseBlock {
  constructor({ value = EMPTY_STRING, ...parameters } = {}, stringValueBlockType) {
    super(parameters, stringValueBlockType);
    if (value) {
      this.fromString(value);
    }
  }
  getValue() {
    return this.valueBlock.value;
  }
  setValue(value) {
    this.valueBlock.value = value;
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    const resultOffset = this.valueBlock.fromBER(inputBuffer, inputOffset, this.lenBlock.isIndefiniteForm ? inputLength : this.lenBlock.length);
    if (resultOffset === -1) {
      this.error = this.valueBlock.error;
      return resultOffset;
    }
    this.fromBuffer(this.valueBlock.valueHexView);
    if (!this.idBlock.error.length)
      this.blockLength += this.idBlock.blockLength;
    if (!this.lenBlock.error.length)
      this.blockLength += this.lenBlock.blockLength;
    if (!this.valueBlock.error.length)
      this.blockLength += this.valueBlock.blockLength;
    return resultOffset;
  }
  onAsciiEncoding() {
    return `${this.constructor.NAME} : '${this.valueBlock.value}'`;
  }
};
BaseStringBlock.NAME = "BaseStringBlock";
var LocalPrimitiveValueBlock = class extends HexBlock(ValueBlock) {
  constructor({ isHexOnly = true, ...parameters } = {}) {
    super(parameters);
    this.isHexOnly = isHexOnly;
  }
};
LocalPrimitiveValueBlock.NAME = "PrimitiveValueBlock";
var _a$w;
var Primitive = class extends BaseBlock {
  constructor(parameters = {}) {
    super(parameters, LocalPrimitiveValueBlock);
    this.idBlock.isConstructed = false;
  }
};
_a$w = Primitive;
(() => {
  typeStore.Primitive = _a$w;
})();
Primitive.NAME = "PRIMITIVE";
function localChangeType(inputObject, newType) {
  if (inputObject instanceof newType) {
    return inputObject;
  }
  const newObject = new newType();
  newObject.idBlock = inputObject.idBlock;
  newObject.lenBlock = inputObject.lenBlock;
  newObject.warnings = inputObject.warnings;
  newObject.valueBeforeDecodeView = inputObject.valueBeforeDecodeView;
  return newObject;
}
function localFromBER(inputBuffer, inputOffset = 0, inputLength = inputBuffer.length) {
  const incomingOffset = inputOffset;
  let returnObject = new BaseBlock({}, ValueBlock);
  const baseBlock = new LocalBaseBlock();
  if (!checkBufferParams(baseBlock, inputBuffer, inputOffset, inputLength)) {
    returnObject.error = baseBlock.error;
    return {
      offset: -1,
      result: returnObject
    };
  }
  const intBuffer = inputBuffer.subarray(inputOffset, inputOffset + inputLength);
  if (!intBuffer.length) {
    returnObject.error = "Zero buffer length";
    return {
      offset: -1,
      result: returnObject
    };
  }
  let resultOffset = returnObject.idBlock.fromBER(inputBuffer, inputOffset, inputLength);
  if (returnObject.idBlock.warnings.length) {
    returnObject.warnings.concat(returnObject.idBlock.warnings);
  }
  if (resultOffset === -1) {
    returnObject.error = returnObject.idBlock.error;
    return {
      offset: -1,
      result: returnObject
    };
  }
  inputOffset = resultOffset;
  inputLength -= returnObject.idBlock.blockLength;
  resultOffset = returnObject.lenBlock.fromBER(inputBuffer, inputOffset, inputLength);
  if (returnObject.lenBlock.warnings.length) {
    returnObject.warnings.concat(returnObject.lenBlock.warnings);
  }
  if (resultOffset === -1) {
    returnObject.error = returnObject.lenBlock.error;
    return {
      offset: -1,
      result: returnObject
    };
  }
  inputOffset = resultOffset;
  inputLength -= returnObject.lenBlock.blockLength;
  if (!returnObject.idBlock.isConstructed && returnObject.lenBlock.isIndefiniteForm) {
    returnObject.error = "Indefinite length form used for primitive encoding form";
    return {
      offset: -1,
      result: returnObject
    };
  }
  let newASN1Type = BaseBlock;
  switch (returnObject.idBlock.tagClass) {
    case 1:
      if (returnObject.idBlock.tagNumber >= 37 && returnObject.idBlock.isHexOnly === false) {
        returnObject.error = "UNIVERSAL 37 and upper tags are reserved by ASN.1 standard";
        return {
          offset: -1,
          result: returnObject
        };
      }
      switch (returnObject.idBlock.tagNumber) {
        case 0:
          if (returnObject.idBlock.isConstructed && returnObject.lenBlock.length > 0) {
            returnObject.error = "Type [UNIVERSAL 0] is reserved";
            return {
              offset: -1,
              result: returnObject
            };
          }
          newASN1Type = typeStore.EndOfContent;
          break;
        case 1:
          newASN1Type = typeStore.Boolean;
          break;
        case 2:
          newASN1Type = typeStore.Integer;
          break;
        case 3:
          newASN1Type = typeStore.BitString;
          break;
        case 4:
          newASN1Type = typeStore.OctetString;
          break;
        case 5:
          newASN1Type = typeStore.Null;
          break;
        case 6:
          newASN1Type = typeStore.ObjectIdentifier;
          break;
        case 10:
          newASN1Type = typeStore.Enumerated;
          break;
        case 12:
          newASN1Type = typeStore.Utf8String;
          break;
        case 13:
          newASN1Type = typeStore.RelativeObjectIdentifier;
          break;
        case 14:
          newASN1Type = typeStore.TIME;
          break;
        case 15:
          returnObject.error = "[UNIVERSAL 15] is reserved by ASN.1 standard";
          return {
            offset: -1,
            result: returnObject
          };
        case 16:
          newASN1Type = typeStore.Sequence;
          break;
        case 17:
          newASN1Type = typeStore.Set;
          break;
        case 18:
          newASN1Type = typeStore.NumericString;
          break;
        case 19:
          newASN1Type = typeStore.PrintableString;
          break;
        case 20:
          newASN1Type = typeStore.TeletexString;
          break;
        case 21:
          newASN1Type = typeStore.VideotexString;
          break;
        case 22:
          newASN1Type = typeStore.IA5String;
          break;
        case 23:
          newASN1Type = typeStore.UTCTime;
          break;
        case 24:
          newASN1Type = typeStore.GeneralizedTime;
          break;
        case 25:
          newASN1Type = typeStore.GraphicString;
          break;
        case 26:
          newASN1Type = typeStore.VisibleString;
          break;
        case 27:
          newASN1Type = typeStore.GeneralString;
          break;
        case 28:
          newASN1Type = typeStore.UniversalString;
          break;
        case 29:
          newASN1Type = typeStore.CharacterString;
          break;
        case 30:
          newASN1Type = typeStore.BmpString;
          break;
        case 31:
          newASN1Type = typeStore.DATE;
          break;
        case 32:
          newASN1Type = typeStore.TimeOfDay;
          break;
        case 33:
          newASN1Type = typeStore.DateTime;
          break;
        case 34:
          newASN1Type = typeStore.Duration;
          break;
        default: {
          const newObject = returnObject.idBlock.isConstructed ? new typeStore.Constructed() : new typeStore.Primitive();
          newObject.idBlock = returnObject.idBlock;
          newObject.lenBlock = returnObject.lenBlock;
          newObject.warnings = returnObject.warnings;
          returnObject = newObject;
        }
      }
      break;
    case 2:
    case 3:
    case 4:
    default: {
      newASN1Type = returnObject.idBlock.isConstructed ? typeStore.Constructed : typeStore.Primitive;
    }
  }
  returnObject = localChangeType(returnObject, newASN1Type);
  resultOffset = returnObject.fromBER(inputBuffer, inputOffset, returnObject.lenBlock.isIndefiniteForm ? inputLength : returnObject.lenBlock.length);
  returnObject.valueBeforeDecodeView = inputBuffer.subarray(incomingOffset, incomingOffset + returnObject.blockLength);
  return {
    offset: resultOffset,
    result: returnObject
  };
}
function fromBER(inputBuffer) {
  if (!inputBuffer.byteLength) {
    const result = new BaseBlock({}, ValueBlock);
    result.error = "Input buffer has zero length";
    return {
      offset: -1,
      result
    };
  }
  return localFromBER(pvtsutils.BufferSourceConverter.toUint8Array(inputBuffer).slice(), 0, inputBuffer.byteLength);
}
function checkLen(indefiniteLength, length) {
  if (indefiniteLength) {
    return 1;
  }
  return length;
}
var LocalConstructedValueBlock = class extends ValueBlock {
  constructor({ value = [], isIndefiniteForm = false, ...parameters } = {}) {
    super(parameters);
    this.value = value;
    this.isIndefiniteForm = isIndefiniteForm;
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    const view = pvtsutils.BufferSourceConverter.toUint8Array(inputBuffer);
    if (!checkBufferParams(this, view, inputOffset, inputLength)) {
      return -1;
    }
    this.valueBeforeDecodeView = view.subarray(inputOffset, inputOffset + inputLength);
    if (this.valueBeforeDecodeView.length === 0) {
      this.warnings.push("Zero buffer length");
      return inputOffset;
    }
    let currentOffset = inputOffset;
    while (checkLen(this.isIndefiniteForm, inputLength) > 0) {
      const returnObject = localFromBER(view, currentOffset, inputLength);
      if (returnObject.offset === -1) {
        this.error = returnObject.result.error;
        this.warnings.concat(returnObject.result.warnings);
        return -1;
      }
      currentOffset = returnObject.offset;
      this.blockLength += returnObject.result.blockLength;
      inputLength -= returnObject.result.blockLength;
      this.value.push(returnObject.result);
      if (this.isIndefiniteForm && returnObject.result.constructor.NAME === END_OF_CONTENT_NAME) {
        break;
      }
    }
    if (this.isIndefiniteForm) {
      if (this.value[this.value.length - 1].constructor.NAME === END_OF_CONTENT_NAME) {
        this.value.pop();
      } else {
        this.warnings.push("No EndOfContent block encoded");
      }
    }
    return currentOffset;
  }
  toBER(sizeOnly, writer) {
    const _writer = writer || new ViewWriter();
    for (let i = 0; i < this.value.length; i++) {
      this.value[i].toBER(sizeOnly, _writer);
    }
    if (!writer) {
      return _writer.final();
    }
    return EMPTY_BUFFER;
  }
  toJSON() {
    const object = {
      ...super.toJSON(),
      isIndefiniteForm: this.isIndefiniteForm,
      value: []
    };
    for (const value of this.value) {
      object.value.push(value.toJSON());
    }
    return object;
  }
};
LocalConstructedValueBlock.NAME = "ConstructedValueBlock";
var _a$v;
var Constructed = class extends BaseBlock {
  constructor(parameters = {}) {
    super(parameters, LocalConstructedValueBlock);
    this.idBlock.isConstructed = true;
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    this.valueBlock.isIndefiniteForm = this.lenBlock.isIndefiniteForm;
    const resultOffset = this.valueBlock.fromBER(inputBuffer, inputOffset, this.lenBlock.isIndefiniteForm ? inputLength : this.lenBlock.length);
    if (resultOffset === -1) {
      this.error = this.valueBlock.error;
      return resultOffset;
    }
    if (!this.idBlock.error.length)
      this.blockLength += this.idBlock.blockLength;
    if (!this.lenBlock.error.length)
      this.blockLength += this.lenBlock.blockLength;
    if (!this.valueBlock.error.length)
      this.blockLength += this.valueBlock.blockLength;
    return resultOffset;
  }
  onAsciiEncoding() {
    const values = [];
    for (const value of this.valueBlock.value) {
      values.push(value.toString("ascii").split("\n").map((o) => `  ${o}`).join("\n"));
    }
    const blockName = this.idBlock.tagClass === 3 ? `[${this.idBlock.tagNumber}]` : this.constructor.NAME;
    return values.length ? `${blockName} :
${values.join("\n")}` : `${blockName} :`;
  }
};
_a$v = Constructed;
(() => {
  typeStore.Constructed = _a$v;
})();
Constructed.NAME = "CONSTRUCTED";
var LocalEndOfContentValueBlock = class extends ValueBlock {
  fromBER(inputBuffer, inputOffset, inputLength) {
    return inputOffset;
  }
  toBER(sizeOnly) {
    return EMPTY_BUFFER;
  }
};
LocalEndOfContentValueBlock.override = "EndOfContentValueBlock";
var _a$u;
var EndOfContent = class extends BaseBlock {
  constructor(parameters = {}) {
    super(parameters, LocalEndOfContentValueBlock);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 0;
  }
};
_a$u = EndOfContent;
(() => {
  typeStore.EndOfContent = _a$u;
})();
EndOfContent.NAME = END_OF_CONTENT_NAME;
var _a$t;
var Null = class extends BaseBlock {
  constructor(parameters = {}) {
    super(parameters, ValueBlock);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 5;
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    if (this.lenBlock.length > 0)
      this.warnings.push("Non-zero length of value block for Null type");
    if (!this.idBlock.error.length)
      this.blockLength += this.idBlock.blockLength;
    if (!this.lenBlock.error.length)
      this.blockLength += this.lenBlock.blockLength;
    this.blockLength += inputLength;
    if (inputOffset + inputLength > inputBuffer.byteLength) {
      this.error = "End of input reached before message was fully decoded (inconsistent offset and length values)";
      return -1;
    }
    return inputOffset + inputLength;
  }
  toBER(sizeOnly, writer) {
    const retBuf = new ArrayBuffer(2);
    if (!sizeOnly) {
      const retView = new Uint8Array(retBuf);
      retView[0] = 5;
      retView[1] = 0;
    }
    if (writer) {
      writer.write(retBuf);
    }
    return retBuf;
  }
  onAsciiEncoding() {
    return `${this.constructor.NAME}`;
  }
};
_a$t = Null;
(() => {
  typeStore.Null = _a$t;
})();
Null.NAME = "NULL";
var LocalBooleanValueBlock = class extends HexBlock(ValueBlock) {
  constructor({ value, ...parameters } = {}) {
    super(parameters);
    if (parameters.valueHex) {
      this.valueHexView = pvtsutils.BufferSourceConverter.toUint8Array(parameters.valueHex);
    } else {
      this.valueHexView = new Uint8Array(1);
    }
    if (value) {
      this.value = value;
    }
  }
  get value() {
    for (const octet of this.valueHexView) {
      if (octet > 0) {
        return true;
      }
    }
    return false;
  }
  set value(value) {
    this.valueHexView[0] = value ? 255 : 0;
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    const inputView = pvtsutils.BufferSourceConverter.toUint8Array(inputBuffer);
    if (!checkBufferParams(this, inputView, inputOffset, inputLength)) {
      return -1;
    }
    this.valueHexView = inputView.subarray(inputOffset, inputOffset + inputLength);
    if (inputLength > 1)
      this.warnings.push("Boolean value encoded in more then 1 octet");
    this.isHexOnly = true;
    utilDecodeTC.call(this);
    this.blockLength = inputLength;
    return inputOffset + inputLength;
  }
  toBER() {
    return this.valueHexView.slice();
  }
  toJSON() {
    return {
      ...super.toJSON(),
      value: this.value
    };
  }
};
LocalBooleanValueBlock.NAME = "BooleanValueBlock";
var _a$s;
var Boolean2 = class extends BaseBlock {
  constructor(parameters = {}) {
    super(parameters, LocalBooleanValueBlock);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 1;
  }
  getValue() {
    return this.valueBlock.value;
  }
  setValue(value) {
    this.valueBlock.value = value;
  }
  onAsciiEncoding() {
    return `${this.constructor.NAME} : ${this.getValue}`;
  }
};
_a$s = Boolean2;
(() => {
  typeStore.Boolean = _a$s;
})();
Boolean2.NAME = "BOOLEAN";
var LocalOctetStringValueBlock = class extends HexBlock(LocalConstructedValueBlock) {
  constructor({ isConstructed = false, ...parameters } = {}) {
    super(parameters);
    this.isConstructed = isConstructed;
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    let resultOffset = 0;
    if (this.isConstructed) {
      this.isHexOnly = false;
      resultOffset = LocalConstructedValueBlock.prototype.fromBER.call(this, inputBuffer, inputOffset, inputLength);
      if (resultOffset === -1)
        return resultOffset;
      for (let i = 0; i < this.value.length; i++) {
        const currentBlockName = this.value[i].constructor.NAME;
        if (currentBlockName === END_OF_CONTENT_NAME) {
          if (this.isIndefiniteForm)
            break;
          else {
            this.error = "EndOfContent is unexpected, OCTET STRING may consists of OCTET STRINGs only";
            return -1;
          }
        }
        if (currentBlockName !== OCTET_STRING_NAME) {
          this.error = "OCTET STRING may consists of OCTET STRINGs only";
          return -1;
        }
      }
    } else {
      this.isHexOnly = true;
      resultOffset = super.fromBER(inputBuffer, inputOffset, inputLength);
      this.blockLength = inputLength;
    }
    return resultOffset;
  }
  toBER(sizeOnly, writer) {
    if (this.isConstructed)
      return LocalConstructedValueBlock.prototype.toBER.call(this, sizeOnly, writer);
    return sizeOnly ? new ArrayBuffer(this.valueHexView.byteLength) : this.valueHexView.slice().buffer;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      isConstructed: this.isConstructed
    };
  }
};
LocalOctetStringValueBlock.NAME = "OctetStringValueBlock";
var _a$r;
var OctetString = class _OctetString extends BaseBlock {
  constructor({ idBlock = {}, lenBlock = {}, ...parameters } = {}) {
    var _b, _c;
    (_b = parameters.isConstructed) !== null && _b !== void 0 ? _b : parameters.isConstructed = !!((_c = parameters.value) === null || _c === void 0 ? void 0 : _c.length);
    super({
      idBlock: {
        isConstructed: parameters.isConstructed,
        ...idBlock
      },
      lenBlock: {
        ...lenBlock,
        isIndefiniteForm: !!parameters.isIndefiniteForm
      },
      ...parameters
    }, LocalOctetStringValueBlock);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 4;
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    this.valueBlock.isConstructed = this.idBlock.isConstructed;
    this.valueBlock.isIndefiniteForm = this.lenBlock.isIndefiniteForm;
    if (inputLength === 0) {
      if (this.idBlock.error.length === 0)
        this.blockLength += this.idBlock.blockLength;
      if (this.lenBlock.error.length === 0)
        this.blockLength += this.lenBlock.blockLength;
      return inputOffset;
    }
    if (!this.valueBlock.isConstructed) {
      const view = inputBuffer instanceof ArrayBuffer ? new Uint8Array(inputBuffer) : inputBuffer;
      const buf = view.subarray(inputOffset, inputOffset + inputLength);
      try {
        if (buf.byteLength) {
          const asn = localFromBER(buf, 0, buf.byteLength);
          if (asn.offset !== -1 && asn.offset === inputLength) {
            this.valueBlock.value = [asn.result];
          }
        }
      } catch (e) {
      }
    }
    return super.fromBER(inputBuffer, inputOffset, inputLength);
  }
  onAsciiEncoding() {
    if (this.valueBlock.isConstructed || this.valueBlock.value && this.valueBlock.value.length) {
      return Constructed.prototype.onAsciiEncoding.call(this);
    }
    return `${this.constructor.NAME} : ${pvtsutils.Convert.ToHex(this.valueBlock.valueHexView)}`;
  }
  getValue() {
    if (!this.idBlock.isConstructed) {
      return this.valueBlock.valueHexView.slice().buffer;
    }
    const array = [];
    for (const content of this.valueBlock.value) {
      if (content instanceof _OctetString) {
        array.push(content.valueBlock.valueHexView);
      }
    }
    return pvtsutils.BufferSourceConverter.concat(array);
  }
};
_a$r = OctetString;
(() => {
  typeStore.OctetString = _a$r;
})();
OctetString.NAME = OCTET_STRING_NAME;
var LocalBitStringValueBlock = class extends HexBlock(LocalConstructedValueBlock) {
  constructor({ unusedBits = 0, isConstructed = false, ...parameters } = {}) {
    super(parameters);
    this.unusedBits = unusedBits;
    this.isConstructed = isConstructed;
    this.blockLength = this.valueHexView.byteLength;
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    if (!inputLength) {
      return inputOffset;
    }
    let resultOffset = -1;
    if (this.isConstructed) {
      resultOffset = LocalConstructedValueBlock.prototype.fromBER.call(this, inputBuffer, inputOffset, inputLength);
      if (resultOffset === -1)
        return resultOffset;
      for (const value of this.value) {
        const currentBlockName = value.constructor.NAME;
        if (currentBlockName === END_OF_CONTENT_NAME) {
          if (this.isIndefiniteForm)
            break;
          else {
            this.error = "EndOfContent is unexpected, BIT STRING may consists of BIT STRINGs only";
            return -1;
          }
        }
        if (currentBlockName !== BIT_STRING_NAME) {
          this.error = "BIT STRING may consists of BIT STRINGs only";
          return -1;
        }
        const valueBlock = value.valueBlock;
        if (this.unusedBits > 0 && valueBlock.unusedBits > 0) {
          this.error = 'Using of "unused bits" inside constructive BIT STRING allowed for least one only';
          return -1;
        }
        this.unusedBits = valueBlock.unusedBits;
      }
      return resultOffset;
    }
    const inputView = pvtsutils.BufferSourceConverter.toUint8Array(inputBuffer);
    if (!checkBufferParams(this, inputView, inputOffset, inputLength)) {
      return -1;
    }
    const intBuffer = inputView.subarray(inputOffset, inputOffset + inputLength);
    this.unusedBits = intBuffer[0];
    if (this.unusedBits > 7) {
      this.error = "Unused bits for BitString must be in range 0-7";
      return -1;
    }
    if (!this.unusedBits) {
      const buf = intBuffer.subarray(1);
      try {
        if (buf.byteLength) {
          const asn = localFromBER(buf, 0, buf.byteLength);
          if (asn.offset !== -1 && asn.offset === inputLength - 1) {
            this.value = [asn.result];
          }
        }
      } catch (e) {
      }
    }
    this.valueHexView = intBuffer.subarray(1);
    this.blockLength = intBuffer.length;
    return inputOffset + inputLength;
  }
  toBER(sizeOnly, writer) {
    if (this.isConstructed) {
      return LocalConstructedValueBlock.prototype.toBER.call(this, sizeOnly, writer);
    }
    if (sizeOnly) {
      return new ArrayBuffer(this.valueHexView.byteLength + 1);
    }
    if (!this.valueHexView.byteLength) {
      return EMPTY_BUFFER;
    }
    const retView = new Uint8Array(this.valueHexView.length + 1);
    retView[0] = this.unusedBits;
    retView.set(this.valueHexView, 1);
    return retView.buffer;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      unusedBits: this.unusedBits,
      isConstructed: this.isConstructed
    };
  }
};
LocalBitStringValueBlock.NAME = "BitStringValueBlock";
var _a$q;
var BitString = class extends BaseBlock {
  constructor({ idBlock = {}, lenBlock = {}, ...parameters } = {}) {
    var _b, _c;
    (_b = parameters.isConstructed) !== null && _b !== void 0 ? _b : parameters.isConstructed = !!((_c = parameters.value) === null || _c === void 0 ? void 0 : _c.length);
    super({
      idBlock: {
        isConstructed: parameters.isConstructed,
        ...idBlock
      },
      lenBlock: {
        ...lenBlock,
        isIndefiniteForm: !!parameters.isIndefiniteForm
      },
      ...parameters
    }, LocalBitStringValueBlock);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 3;
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    this.valueBlock.isConstructed = this.idBlock.isConstructed;
    this.valueBlock.isIndefiniteForm = this.lenBlock.isIndefiniteForm;
    return super.fromBER(inputBuffer, inputOffset, inputLength);
  }
  onAsciiEncoding() {
    if (this.valueBlock.isConstructed || this.valueBlock.value && this.valueBlock.value.length) {
      return Constructed.prototype.onAsciiEncoding.call(this);
    } else {
      const bits = [];
      const valueHex = this.valueBlock.valueHexView;
      for (const byte of valueHex) {
        bits.push(byte.toString(2).padStart(8, "0"));
      }
      const bitsStr = bits.join("");
      return `${this.constructor.NAME} : ${bitsStr.substring(0, bitsStr.length - this.valueBlock.unusedBits)}`;
    }
  }
};
_a$q = BitString;
(() => {
  typeStore.BitString = _a$q;
})();
BitString.NAME = BIT_STRING_NAME;
var _a$p;
function viewAdd(first, second) {
  const c = new Uint8Array([0]);
  const firstView = new Uint8Array(first);
  const secondView = new Uint8Array(second);
  let firstViewCopy = firstView.slice(0);
  const firstViewCopyLength = firstViewCopy.length - 1;
  const secondViewCopy = secondView.slice(0);
  const secondViewCopyLength = secondViewCopy.length - 1;
  let value = 0;
  const max = secondViewCopyLength < firstViewCopyLength ? firstViewCopyLength : secondViewCopyLength;
  let counter = 0;
  for (let i = max; i >= 0; i--, counter++) {
    switch (true) {
      case counter < secondViewCopy.length:
        value = firstViewCopy[firstViewCopyLength - counter] + secondViewCopy[secondViewCopyLength - counter] + c[0];
        break;
      default:
        value = firstViewCopy[firstViewCopyLength - counter] + c[0];
    }
    c[0] = value / 10;
    switch (true) {
      case counter >= firstViewCopy.length:
        firstViewCopy = utilConcatView(new Uint8Array([value % 10]), firstViewCopy);
        break;
      default:
        firstViewCopy[firstViewCopyLength - counter] = value % 10;
    }
  }
  if (c[0] > 0)
    firstViewCopy = utilConcatView(c, firstViewCopy);
  return firstViewCopy;
}
function power2(n) {
  if (n >= powers2.length) {
    for (let p = powers2.length; p <= n; p++) {
      const c = new Uint8Array([0]);
      let digits = powers2[p - 1].slice(0);
      for (let i = digits.length - 1; i >= 0; i--) {
        const newValue = new Uint8Array([(digits[i] << 1) + c[0]]);
        c[0] = newValue[0] / 10;
        digits[i] = newValue[0] % 10;
      }
      if (c[0] > 0)
        digits = utilConcatView(c, digits);
      powers2.push(digits);
    }
  }
  return powers2[n];
}
function viewSub(first, second) {
  let b = 0;
  const firstView = new Uint8Array(first);
  const secondView = new Uint8Array(second);
  const firstViewCopy = firstView.slice(0);
  const firstViewCopyLength = firstViewCopy.length - 1;
  const secondViewCopy = secondView.slice(0);
  const secondViewCopyLength = secondViewCopy.length - 1;
  let value;
  let counter = 0;
  for (let i = secondViewCopyLength; i >= 0; i--, counter++) {
    value = firstViewCopy[firstViewCopyLength - counter] - secondViewCopy[secondViewCopyLength - counter] - b;
    switch (true) {
      case value < 0:
        b = 1;
        firstViewCopy[firstViewCopyLength - counter] = value + 10;
        break;
      default:
        b = 0;
        firstViewCopy[firstViewCopyLength - counter] = value;
    }
  }
  if (b > 0) {
    for (let i = firstViewCopyLength - secondViewCopyLength + 1; i >= 0; i--, counter++) {
      value = firstViewCopy[firstViewCopyLength - counter] - b;
      if (value < 0) {
        b = 1;
        firstViewCopy[firstViewCopyLength - counter] = value + 10;
      } else {
        b = 0;
        firstViewCopy[firstViewCopyLength - counter] = value;
        break;
      }
    }
  }
  return firstViewCopy.slice();
}
var LocalIntegerValueBlock = class extends HexBlock(ValueBlock) {
  constructor({ value, ...parameters } = {}) {
    super(parameters);
    this._valueDec = 0;
    if (parameters.valueHex) {
      this.setValueHex();
    }
    if (value !== void 0) {
      this.valueDec = value;
    }
  }
  setValueHex() {
    if (this.valueHexView.length >= 4) {
      this.warnings.push("Too big Integer for decoding, hex only");
      this.isHexOnly = true;
      this._valueDec = 0;
    } else {
      this.isHexOnly = false;
      if (this.valueHexView.length > 0) {
        this._valueDec = utilDecodeTC.call(this);
      }
    }
  }
  set valueDec(v) {
    this._valueDec = v;
    this.isHexOnly = false;
    this.valueHexView = new Uint8Array(utilEncodeTC(v));
  }
  get valueDec() {
    return this._valueDec;
  }
  fromDER(inputBuffer, inputOffset, inputLength, expectedLength = 0) {
    const offset = this.fromBER(inputBuffer, inputOffset, inputLength);
    if (offset === -1)
      return offset;
    const view = this.valueHexView;
    if (view[0] === 0 && (view[1] & 128) !== 0) {
      this.valueHexView = view.subarray(1);
    } else {
      if (expectedLength !== 0) {
        if (view.length < expectedLength) {
          if (expectedLength - view.length > 1)
            expectedLength = view.length + 1;
          this.valueHexView = view.subarray(expectedLength - view.length);
        }
      }
    }
    return offset;
  }
  toDER(sizeOnly = false) {
    const view = this.valueHexView;
    switch (true) {
      case (view[0] & 128) !== 0:
        {
          const updatedView = new Uint8Array(this.valueHexView.length + 1);
          updatedView[0] = 0;
          updatedView.set(view, 1);
          this.valueHexView = updatedView;
        }
        break;
      case (view[0] === 0 && (view[1] & 128) === 0):
        {
          this.valueHexView = this.valueHexView.subarray(1);
        }
        break;
    }
    return this.toBER(sizeOnly);
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    const resultOffset = super.fromBER(inputBuffer, inputOffset, inputLength);
    if (resultOffset === -1) {
      return resultOffset;
    }
    this.setValueHex();
    return resultOffset;
  }
  toBER(sizeOnly) {
    return sizeOnly ? new ArrayBuffer(this.valueHexView.length) : this.valueHexView.slice().buffer;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      valueDec: this.valueDec
    };
  }
  toString() {
    const firstBit = this.valueHexView.length * 8 - 1;
    let digits = new Uint8Array(this.valueHexView.length * 8 / 3);
    let bitNumber = 0;
    let currentByte;
    const asn1View = this.valueHexView;
    let result = "";
    let flag = false;
    for (let byteNumber = asn1View.byteLength - 1; byteNumber >= 0; byteNumber--) {
      currentByte = asn1View[byteNumber];
      for (let i = 0; i < 8; i++) {
        if ((currentByte & 1) === 1) {
          switch (bitNumber) {
            case firstBit:
              digits = viewSub(power2(bitNumber), digits);
              result = "-";
              break;
            default:
              digits = viewAdd(digits, power2(bitNumber));
          }
        }
        bitNumber++;
        currentByte >>= 1;
      }
    }
    for (let i = 0; i < digits.length; i++) {
      if (digits[i])
        flag = true;
      if (flag)
        result += digitsString.charAt(digits[i]);
    }
    if (flag === false)
      result += digitsString.charAt(0);
    return result;
  }
};
_a$p = LocalIntegerValueBlock;
LocalIntegerValueBlock.NAME = "IntegerValueBlock";
(() => {
  Object.defineProperty(_a$p.prototype, "valueHex", {
    set: function(v) {
      this.valueHexView = new Uint8Array(v);
      this.setValueHex();
    },
    get: function() {
      return this.valueHexView.slice().buffer;
    }
  });
})();
var _a$o;
var Integer = class _Integer extends BaseBlock {
  constructor(parameters = {}) {
    super(parameters, LocalIntegerValueBlock);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 2;
  }
  toBigInt() {
    assertBigInt();
    return BigInt(this.valueBlock.toString());
  }
  static fromBigInt(value) {
    assertBigInt();
    const bigIntValue = BigInt(value);
    const writer = new ViewWriter();
    const hex = bigIntValue.toString(16).replace(/^-/, "");
    const view = new Uint8Array(pvtsutils.Convert.FromHex(hex));
    if (bigIntValue < 0) {
      const first = new Uint8Array(view.length + (view[0] & 128 ? 1 : 0));
      first[0] |= 128;
      const firstInt = BigInt(`0x${pvtsutils.Convert.ToHex(first)}`);
      const secondInt = firstInt + bigIntValue;
      const second = pvtsutils.BufferSourceConverter.toUint8Array(pvtsutils.Convert.FromHex(secondInt.toString(16)));
      second[0] |= 128;
      writer.write(second);
    } else {
      if (view[0] & 128) {
        writer.write(new Uint8Array([0]));
      }
      writer.write(view);
    }
    const res = new _Integer({
      valueHex: writer.final()
    });
    return res;
  }
  convertToDER() {
    const integer = new _Integer({ valueHex: this.valueBlock.valueHexView });
    integer.valueBlock.toDER();
    return integer;
  }
  convertFromDER() {
    return new _Integer({
      valueHex: this.valueBlock.valueHexView[0] === 0 ? this.valueBlock.valueHexView.subarray(1) : this.valueBlock.valueHexView
    });
  }
  onAsciiEncoding() {
    return `${this.constructor.NAME} : ${this.valueBlock.toString()}`;
  }
};
_a$o = Integer;
(() => {
  typeStore.Integer = _a$o;
})();
Integer.NAME = "INTEGER";
var _a$n;
var Enumerated = class extends Integer {
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 10;
  }
};
_a$n = Enumerated;
(() => {
  typeStore.Enumerated = _a$n;
})();
Enumerated.NAME = "ENUMERATED";
var LocalSidValueBlock = class extends HexBlock(ValueBlock) {
  constructor({ valueDec = -1, isFirstSid = false, ...parameters } = {}) {
    super(parameters);
    this.valueDec = valueDec;
    this.isFirstSid = isFirstSid;
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    if (!inputLength) {
      return inputOffset;
    }
    const inputView = pvtsutils.BufferSourceConverter.toUint8Array(inputBuffer);
    if (!checkBufferParams(this, inputView, inputOffset, inputLength)) {
      return -1;
    }
    const intBuffer = inputView.subarray(inputOffset, inputOffset + inputLength);
    this.valueHexView = new Uint8Array(inputLength);
    for (let i = 0; i < inputLength; i++) {
      this.valueHexView[i] = intBuffer[i] & 127;
      this.blockLength++;
      if ((intBuffer[i] & 128) === 0)
        break;
    }
    const tempView = new Uint8Array(this.blockLength);
    for (let i = 0; i < this.blockLength; i++) {
      tempView[i] = this.valueHexView[i];
    }
    this.valueHexView = tempView;
    if ((intBuffer[this.blockLength - 1] & 128) !== 0) {
      this.error = "End of input reached before message was fully decoded";
      return -1;
    }
    if (this.valueHexView[0] === 0)
      this.warnings.push("Needlessly long format of SID encoding");
    if (this.blockLength <= 8)
      this.valueDec = utilFromBase(this.valueHexView, 7);
    else {
      this.isHexOnly = true;
      this.warnings.push("Too big SID for decoding, hex only");
    }
    return inputOffset + this.blockLength;
  }
  set valueBigInt(value) {
    assertBigInt();
    let bits = BigInt(value).toString(2);
    while (bits.length % 7) {
      bits = "0" + bits;
    }
    const bytes = new Uint8Array(bits.length / 7);
    for (let i = 0; i < bytes.length; i++) {
      bytes[i] = parseInt(bits.slice(i * 7, i * 7 + 7), 2) + (i + 1 < bytes.length ? 128 : 0);
    }
    this.fromBER(bytes.buffer, 0, bytes.length);
  }
  toBER(sizeOnly) {
    if (this.isHexOnly) {
      if (sizeOnly)
        return new ArrayBuffer(this.valueHexView.byteLength);
      const curView = this.valueHexView;
      const retView2 = new Uint8Array(this.blockLength);
      for (let i = 0; i < this.blockLength - 1; i++)
        retView2[i] = curView[i] | 128;
      retView2[this.blockLength - 1] = curView[this.blockLength - 1];
      return retView2.buffer;
    }
    const encodedBuf = utilToBase(this.valueDec, 7);
    if (encodedBuf.byteLength === 0) {
      this.error = "Error during encoding SID value";
      return EMPTY_BUFFER;
    }
    const retView = new Uint8Array(encodedBuf.byteLength);
    if (!sizeOnly) {
      const encodedView = new Uint8Array(encodedBuf);
      const len = encodedBuf.byteLength - 1;
      for (let i = 0; i < len; i++)
        retView[i] = encodedView[i] | 128;
      retView[len] = encodedView[len];
    }
    return retView;
  }
  toString() {
    let result = "";
    if (this.isHexOnly)
      result = pvtsutils.Convert.ToHex(this.valueHexView);
    else {
      if (this.isFirstSid) {
        let sidValue = this.valueDec;
        if (this.valueDec <= 39)
          result = "0.";
        else {
          if (this.valueDec <= 79) {
            result = "1.";
            sidValue -= 40;
          } else {
            result = "2.";
            sidValue -= 80;
          }
        }
        result += sidValue.toString();
      } else
        result = this.valueDec.toString();
    }
    return result;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      valueDec: this.valueDec,
      isFirstSid: this.isFirstSid
    };
  }
};
LocalSidValueBlock.NAME = "sidBlock";
var LocalObjectIdentifierValueBlock = class extends ValueBlock {
  constructor({ value = EMPTY_STRING, ...parameters } = {}) {
    super(parameters);
    this.value = [];
    if (value) {
      this.fromString(value);
    }
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    let resultOffset = inputOffset;
    while (inputLength > 0) {
      const sidBlock = new LocalSidValueBlock();
      resultOffset = sidBlock.fromBER(inputBuffer, resultOffset, inputLength);
      if (resultOffset === -1) {
        this.blockLength = 0;
        this.error = sidBlock.error;
        return resultOffset;
      }
      if (this.value.length === 0)
        sidBlock.isFirstSid = true;
      this.blockLength += sidBlock.blockLength;
      inputLength -= sidBlock.blockLength;
      this.value.push(sidBlock);
    }
    return resultOffset;
  }
  toBER(sizeOnly) {
    const retBuffers = [];
    for (let i = 0; i < this.value.length; i++) {
      const valueBuf = this.value[i].toBER(sizeOnly);
      if (valueBuf.byteLength === 0) {
        this.error = this.value[i].error;
        return EMPTY_BUFFER;
      }
      retBuffers.push(valueBuf);
    }
    return concat2(retBuffers);
  }
  fromString(string) {
    this.value = [];
    let pos1 = 0;
    let pos2 = 0;
    let sid = "";
    let flag = false;
    do {
      pos2 = string.indexOf(".", pos1);
      if (pos2 === -1)
        sid = string.substring(pos1);
      else
        sid = string.substring(pos1, pos2);
      pos1 = pos2 + 1;
      if (flag) {
        const sidBlock = this.value[0];
        let plus = 0;
        switch (sidBlock.valueDec) {
          case 0:
            break;
          case 1:
            plus = 40;
            break;
          case 2:
            plus = 80;
            break;
          default:
            this.value = [];
            return;
        }
        const parsedSID = parseInt(sid, 10);
        if (isNaN(parsedSID))
          return;
        sidBlock.valueDec = parsedSID + plus;
        flag = false;
      } else {
        const sidBlock = new LocalSidValueBlock();
        if (sid > Number.MAX_SAFE_INTEGER) {
          assertBigInt();
          const sidValue = BigInt(sid);
          sidBlock.valueBigInt = sidValue;
        } else {
          sidBlock.valueDec = parseInt(sid, 10);
          if (isNaN(sidBlock.valueDec))
            return;
        }
        if (!this.value.length) {
          sidBlock.isFirstSid = true;
          flag = true;
        }
        this.value.push(sidBlock);
      }
    } while (pos2 !== -1);
  }
  toString() {
    let result = "";
    let isHexOnly = false;
    for (let i = 0; i < this.value.length; i++) {
      isHexOnly = this.value[i].isHexOnly;
      let sidStr = this.value[i].toString();
      if (i !== 0)
        result = `${result}.`;
      if (isHexOnly) {
        sidStr = `{${sidStr}}`;
        if (this.value[i].isFirstSid)
          result = `2.{${sidStr} - 80}`;
        else
          result += sidStr;
      } else
        result += sidStr;
    }
    return result;
  }
  toJSON() {
    const object = {
      ...super.toJSON(),
      value: this.toString(),
      sidArray: []
    };
    for (let i = 0; i < this.value.length; i++) {
      object.sidArray.push(this.value[i].toJSON());
    }
    return object;
  }
};
LocalObjectIdentifierValueBlock.NAME = "ObjectIdentifierValueBlock";
var _a$m;
var ObjectIdentifier = class extends BaseBlock {
  constructor(parameters = {}) {
    super(parameters, LocalObjectIdentifierValueBlock);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 6;
  }
  getValue() {
    return this.valueBlock.toString();
  }
  setValue(value) {
    this.valueBlock.fromString(value);
  }
  onAsciiEncoding() {
    return `${this.constructor.NAME} : ${this.valueBlock.toString() || "empty"}`;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      value: this.getValue()
    };
  }
};
_a$m = ObjectIdentifier;
(() => {
  typeStore.ObjectIdentifier = _a$m;
})();
ObjectIdentifier.NAME = "OBJECT IDENTIFIER";
var LocalRelativeSidValueBlock = class extends HexBlock(LocalBaseBlock) {
  constructor({ valueDec = 0, ...parameters } = {}) {
    super(parameters);
    this.valueDec = valueDec;
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    if (inputLength === 0)
      return inputOffset;
    const inputView = pvtsutils.BufferSourceConverter.toUint8Array(inputBuffer);
    if (!checkBufferParams(this, inputView, inputOffset, inputLength))
      return -1;
    const intBuffer = inputView.subarray(inputOffset, inputOffset + inputLength);
    this.valueHexView = new Uint8Array(inputLength);
    for (let i = 0; i < inputLength; i++) {
      this.valueHexView[i] = intBuffer[i] & 127;
      this.blockLength++;
      if ((intBuffer[i] & 128) === 0)
        break;
    }
    const tempView = new Uint8Array(this.blockLength);
    for (let i = 0; i < this.blockLength; i++)
      tempView[i] = this.valueHexView[i];
    this.valueHexView = tempView;
    if ((intBuffer[this.blockLength - 1] & 128) !== 0) {
      this.error = "End of input reached before message was fully decoded";
      return -1;
    }
    if (this.valueHexView[0] === 0)
      this.warnings.push("Needlessly long format of SID encoding");
    if (this.blockLength <= 8)
      this.valueDec = utilFromBase(this.valueHexView, 7);
    else {
      this.isHexOnly = true;
      this.warnings.push("Too big SID for decoding, hex only");
    }
    return inputOffset + this.blockLength;
  }
  toBER(sizeOnly) {
    if (this.isHexOnly) {
      if (sizeOnly)
        return new ArrayBuffer(this.valueHexView.byteLength);
      const curView = this.valueHexView;
      const retView2 = new Uint8Array(this.blockLength);
      for (let i = 0; i < this.blockLength - 1; i++)
        retView2[i] = curView[i] | 128;
      retView2[this.blockLength - 1] = curView[this.blockLength - 1];
      return retView2.buffer;
    }
    const encodedBuf = utilToBase(this.valueDec, 7);
    if (encodedBuf.byteLength === 0) {
      this.error = "Error during encoding SID value";
      return EMPTY_BUFFER;
    }
    const retView = new Uint8Array(encodedBuf.byteLength);
    if (!sizeOnly) {
      const encodedView = new Uint8Array(encodedBuf);
      const len = encodedBuf.byteLength - 1;
      for (let i = 0; i < len; i++)
        retView[i] = encodedView[i] | 128;
      retView[len] = encodedView[len];
    }
    return retView.buffer;
  }
  toString() {
    let result = "";
    if (this.isHexOnly)
      result = pvtsutils.Convert.ToHex(this.valueHexView);
    else {
      result = this.valueDec.toString();
    }
    return result;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      valueDec: this.valueDec
    };
  }
};
LocalRelativeSidValueBlock.NAME = "relativeSidBlock";
var LocalRelativeObjectIdentifierValueBlock = class extends ValueBlock {
  constructor({ value = EMPTY_STRING, ...parameters } = {}) {
    super(parameters);
    this.value = [];
    if (value) {
      this.fromString(value);
    }
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    let resultOffset = inputOffset;
    while (inputLength > 0) {
      const sidBlock = new LocalRelativeSidValueBlock();
      resultOffset = sidBlock.fromBER(inputBuffer, resultOffset, inputLength);
      if (resultOffset === -1) {
        this.blockLength = 0;
        this.error = sidBlock.error;
        return resultOffset;
      }
      this.blockLength += sidBlock.blockLength;
      inputLength -= sidBlock.blockLength;
      this.value.push(sidBlock);
    }
    return resultOffset;
  }
  toBER(sizeOnly, writer) {
    const retBuffers = [];
    for (let i = 0; i < this.value.length; i++) {
      const valueBuf = this.value[i].toBER(sizeOnly);
      if (valueBuf.byteLength === 0) {
        this.error = this.value[i].error;
        return EMPTY_BUFFER;
      }
      retBuffers.push(valueBuf);
    }
    return concat2(retBuffers);
  }
  fromString(string) {
    this.value = [];
    let pos1 = 0;
    let pos2 = 0;
    let sid = "";
    do {
      pos2 = string.indexOf(".", pos1);
      if (pos2 === -1)
        sid = string.substring(pos1);
      else
        sid = string.substring(pos1, pos2);
      pos1 = pos2 + 1;
      const sidBlock = new LocalRelativeSidValueBlock();
      sidBlock.valueDec = parseInt(sid, 10);
      if (isNaN(sidBlock.valueDec))
        return true;
      this.value.push(sidBlock);
    } while (pos2 !== -1);
    return true;
  }
  toString() {
    let result = "";
    let isHexOnly = false;
    for (let i = 0; i < this.value.length; i++) {
      isHexOnly = this.value[i].isHexOnly;
      let sidStr = this.value[i].toString();
      if (i !== 0)
        result = `${result}.`;
      if (isHexOnly) {
        sidStr = `{${sidStr}}`;
        result += sidStr;
      } else
        result += sidStr;
    }
    return result;
  }
  toJSON() {
    const object = {
      ...super.toJSON(),
      value: this.toString(),
      sidArray: []
    };
    for (let i = 0; i < this.value.length; i++)
      object.sidArray.push(this.value[i].toJSON());
    return object;
  }
};
LocalRelativeObjectIdentifierValueBlock.NAME = "RelativeObjectIdentifierValueBlock";
var _a$l;
var RelativeObjectIdentifier = class extends BaseBlock {
  constructor(parameters = {}) {
    super(parameters, LocalRelativeObjectIdentifierValueBlock);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 13;
  }
  getValue() {
    return this.valueBlock.toString();
  }
  setValue(value) {
    this.valueBlock.fromString(value);
  }
  onAsciiEncoding() {
    return `${this.constructor.NAME} : ${this.valueBlock.toString() || "empty"}`;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      value: this.getValue()
    };
  }
};
_a$l = RelativeObjectIdentifier;
(() => {
  typeStore.RelativeObjectIdentifier = _a$l;
})();
RelativeObjectIdentifier.NAME = "RelativeObjectIdentifier";
var _a$k;
var Sequence = class extends Constructed {
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 16;
  }
};
_a$k = Sequence;
(() => {
  typeStore.Sequence = _a$k;
})();
Sequence.NAME = "SEQUENCE";
var _a$j;
var Set2 = class extends Constructed {
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 17;
  }
};
_a$j = Set2;
(() => {
  typeStore.Set = _a$j;
})();
Set2.NAME = "SET";
var LocalStringValueBlock = class extends HexBlock(ValueBlock) {
  constructor({ ...parameters } = {}) {
    super(parameters);
    this.isHexOnly = true;
    this.value = EMPTY_STRING;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      value: this.value
    };
  }
};
LocalStringValueBlock.NAME = "StringValueBlock";
var LocalSimpleStringValueBlock = class extends LocalStringValueBlock {
};
LocalSimpleStringValueBlock.NAME = "SimpleStringValueBlock";
var LocalSimpleStringBlock = class extends BaseStringBlock {
  constructor({ ...parameters } = {}) {
    super(parameters, LocalSimpleStringValueBlock);
  }
  fromBuffer(inputBuffer) {
    this.valueBlock.value = String.fromCharCode.apply(null, pvtsutils.BufferSourceConverter.toUint8Array(inputBuffer));
  }
  fromString(inputString) {
    const strLen = inputString.length;
    const view = this.valueBlock.valueHexView = new Uint8Array(strLen);
    for (let i = 0; i < strLen; i++)
      view[i] = inputString.charCodeAt(i);
    this.valueBlock.value = inputString;
  }
};
LocalSimpleStringBlock.NAME = "SIMPLE STRING";
var LocalUtf8StringValueBlock = class extends LocalSimpleStringBlock {
  fromBuffer(inputBuffer) {
    this.valueBlock.valueHexView = pvtsutils.BufferSourceConverter.toUint8Array(inputBuffer);
    try {
      this.valueBlock.value = pvtsutils.Convert.ToUtf8String(inputBuffer);
    } catch (ex) {
      this.warnings.push(`Error during "decodeURIComponent": ${ex}, using raw string`);
      this.valueBlock.value = pvtsutils.Convert.ToBinary(inputBuffer);
    }
  }
  fromString(inputString) {
    this.valueBlock.valueHexView = new Uint8Array(pvtsutils.Convert.FromUtf8String(inputString));
    this.valueBlock.value = inputString;
  }
};
LocalUtf8StringValueBlock.NAME = "Utf8StringValueBlock";
var _a$i;
var Utf8String = class extends LocalUtf8StringValueBlock {
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 12;
  }
};
_a$i = Utf8String;
(() => {
  typeStore.Utf8String = _a$i;
})();
Utf8String.NAME = "UTF8String";
var LocalBmpStringValueBlock = class extends LocalSimpleStringBlock {
  fromBuffer(inputBuffer) {
    this.valueBlock.value = pvtsutils.Convert.ToUtf16String(inputBuffer);
    this.valueBlock.valueHexView = pvtsutils.BufferSourceConverter.toUint8Array(inputBuffer);
  }
  fromString(inputString) {
    this.valueBlock.value = inputString;
    this.valueBlock.valueHexView = new Uint8Array(pvtsutils.Convert.FromUtf16String(inputString));
  }
};
LocalBmpStringValueBlock.NAME = "BmpStringValueBlock";
var _a$h;
var BmpString = class extends LocalBmpStringValueBlock {
  constructor({ ...parameters } = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 30;
  }
};
_a$h = BmpString;
(() => {
  typeStore.BmpString = _a$h;
})();
BmpString.NAME = "BMPString";
var LocalUniversalStringValueBlock = class extends LocalSimpleStringBlock {
  fromBuffer(inputBuffer) {
    const copyBuffer = ArrayBuffer.isView(inputBuffer) ? inputBuffer.slice().buffer : inputBuffer.slice(0);
    const valueView = new Uint8Array(copyBuffer);
    for (let i = 0; i < valueView.length; i += 4) {
      valueView[i] = valueView[i + 3];
      valueView[i + 1] = valueView[i + 2];
      valueView[i + 2] = 0;
      valueView[i + 3] = 0;
    }
    this.valueBlock.value = String.fromCharCode.apply(null, new Uint32Array(copyBuffer));
  }
  fromString(inputString) {
    const strLength = inputString.length;
    const valueHexView = this.valueBlock.valueHexView = new Uint8Array(strLength * 4);
    for (let i = 0; i < strLength; i++) {
      const codeBuf = utilToBase(inputString.charCodeAt(i), 8);
      const codeView = new Uint8Array(codeBuf);
      if (codeView.length > 4)
        continue;
      const dif = 4 - codeView.length;
      for (let j = codeView.length - 1; j >= 0; j--)
        valueHexView[i * 4 + j + dif] = codeView[j];
    }
    this.valueBlock.value = inputString;
  }
};
LocalUniversalStringValueBlock.NAME = "UniversalStringValueBlock";
var _a$g;
var UniversalString = class extends LocalUniversalStringValueBlock {
  constructor({ ...parameters } = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 28;
  }
};
_a$g = UniversalString;
(() => {
  typeStore.UniversalString = _a$g;
})();
UniversalString.NAME = "UniversalString";
var _a$f;
var NumericString = class extends LocalSimpleStringBlock {
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 18;
  }
};
_a$f = NumericString;
(() => {
  typeStore.NumericString = _a$f;
})();
NumericString.NAME = "NumericString";
var _a$e;
var PrintableString = class extends LocalSimpleStringBlock {
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 19;
  }
};
_a$e = PrintableString;
(() => {
  typeStore.PrintableString = _a$e;
})();
PrintableString.NAME = "PrintableString";
var _a$d;
var TeletexString = class extends LocalSimpleStringBlock {
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 20;
  }
};
_a$d = TeletexString;
(() => {
  typeStore.TeletexString = _a$d;
})();
TeletexString.NAME = "TeletexString";
var _a$c;
var VideotexString = class extends LocalSimpleStringBlock {
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 21;
  }
};
_a$c = VideotexString;
(() => {
  typeStore.VideotexString = _a$c;
})();
VideotexString.NAME = "VideotexString";
var _a$b;
var IA5String = class extends LocalSimpleStringBlock {
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 22;
  }
};
_a$b = IA5String;
(() => {
  typeStore.IA5String = _a$b;
})();
IA5String.NAME = "IA5String";
var _a$a;
var GraphicString = class extends LocalSimpleStringBlock {
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 25;
  }
};
_a$a = GraphicString;
(() => {
  typeStore.GraphicString = _a$a;
})();
GraphicString.NAME = "GraphicString";
var _a$9;
var VisibleString = class extends LocalSimpleStringBlock {
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 26;
  }
};
_a$9 = VisibleString;
(() => {
  typeStore.VisibleString = _a$9;
})();
VisibleString.NAME = "VisibleString";
var _a$8;
var GeneralString = class extends LocalSimpleStringBlock {
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 27;
  }
};
_a$8 = GeneralString;
(() => {
  typeStore.GeneralString = _a$8;
})();
GeneralString.NAME = "GeneralString";
var _a$7;
var CharacterString = class extends LocalSimpleStringBlock {
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 29;
  }
};
_a$7 = CharacterString;
(() => {
  typeStore.CharacterString = _a$7;
})();
CharacterString.NAME = "CharacterString";
var _a$6;
var UTCTime = class extends VisibleString {
  constructor({ value, valueDate, ...parameters } = {}) {
    super(parameters);
    this.year = 0;
    this.month = 0;
    this.day = 0;
    this.hour = 0;
    this.minute = 0;
    this.second = 0;
    if (value) {
      this.fromString(value);
      this.valueBlock.valueHexView = new Uint8Array(value.length);
      for (let i = 0; i < value.length; i++)
        this.valueBlock.valueHexView[i] = value.charCodeAt(i);
    }
    if (valueDate) {
      this.fromDate(valueDate);
      this.valueBlock.valueHexView = new Uint8Array(this.toBuffer());
    }
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 23;
  }
  fromBuffer(inputBuffer) {
    this.fromString(String.fromCharCode.apply(null, pvtsutils.BufferSourceConverter.toUint8Array(inputBuffer)));
  }
  toBuffer() {
    const str = this.toString();
    const buffer = new ArrayBuffer(str.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < str.length; i++)
      view[i] = str.charCodeAt(i);
    return buffer;
  }
  fromDate(inputDate) {
    this.year = inputDate.getUTCFullYear();
    this.month = inputDate.getUTCMonth() + 1;
    this.day = inputDate.getUTCDate();
    this.hour = inputDate.getUTCHours();
    this.minute = inputDate.getUTCMinutes();
    this.second = inputDate.getUTCSeconds();
  }
  toDate() {
    return new Date(Date.UTC(this.year, this.month - 1, this.day, this.hour, this.minute, this.second));
  }
  fromString(inputString) {
    const parser = /(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})Z/ig;
    const parserArray = parser.exec(inputString);
    if (parserArray === null) {
      this.error = "Wrong input string for conversion";
      return;
    }
    const year2 = parseInt(parserArray[1], 10);
    if (year2 >= 50)
      this.year = 1900 + year2;
    else
      this.year = 2e3 + year2;
    this.month = parseInt(parserArray[2], 10);
    this.day = parseInt(parserArray[3], 10);
    this.hour = parseInt(parserArray[4], 10);
    this.minute = parseInt(parserArray[5], 10);
    this.second = parseInt(parserArray[6], 10);
  }
  toString(encoding = "iso") {
    if (encoding === "iso") {
      const outputArray = new Array(7);
      outputArray[0] = padNumber(this.year < 2e3 ? this.year - 1900 : this.year - 2e3, 2);
      outputArray[1] = padNumber(this.month, 2);
      outputArray[2] = padNumber(this.day, 2);
      outputArray[3] = padNumber(this.hour, 2);
      outputArray[4] = padNumber(this.minute, 2);
      outputArray[5] = padNumber(this.second, 2);
      outputArray[6] = "Z";
      return outputArray.join("");
    }
    return super.toString(encoding);
  }
  onAsciiEncoding() {
    return `${this.constructor.NAME} : ${this.toDate().toISOString()}`;
  }
  toJSON() {
    return {
      ...super.toJSON(),
      year: this.year,
      month: this.month,
      day: this.day,
      hour: this.hour,
      minute: this.minute,
      second: this.second
    };
  }
};
_a$6 = UTCTime;
(() => {
  typeStore.UTCTime = _a$6;
})();
UTCTime.NAME = "UTCTime";
var _a$5;
var GeneralizedTime = class extends UTCTime {
  constructor(parameters = {}) {
    var _b;
    super(parameters);
    (_b = this.millisecond) !== null && _b !== void 0 ? _b : this.millisecond = 0;
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 24;
  }
  fromDate(inputDate) {
    super.fromDate(inputDate);
    this.millisecond = inputDate.getUTCMilliseconds();
  }
  toDate() {
    return new Date(Date.UTC(this.year, this.month - 1, this.day, this.hour, this.minute, this.second, this.millisecond));
  }
  fromString(inputString) {
    let isUTC = false;
    let timeString = "";
    let dateTimeString = "";
    let fractionPart = 0;
    let parser;
    let hourDifference = 0;
    let minuteDifference = 0;
    if (inputString[inputString.length - 1] === "Z") {
      timeString = inputString.substring(0, inputString.length - 1);
      isUTC = true;
    } else {
      const number = new Number(inputString[inputString.length - 1]);
      if (isNaN(number.valueOf()))
        throw new Error("Wrong input string for conversion");
      timeString = inputString;
    }
    if (isUTC) {
      if (timeString.indexOf("+") !== -1)
        throw new Error("Wrong input string for conversion");
      if (timeString.indexOf("-") !== -1)
        throw new Error("Wrong input string for conversion");
    } else {
      let multiplier = 1;
      let differencePosition = timeString.indexOf("+");
      let differenceString = "";
      if (differencePosition === -1) {
        differencePosition = timeString.indexOf("-");
        multiplier = -1;
      }
      if (differencePosition !== -1) {
        differenceString = timeString.substring(differencePosition + 1);
        timeString = timeString.substring(0, differencePosition);
        if (differenceString.length !== 2 && differenceString.length !== 4)
          throw new Error("Wrong input string for conversion");
        let number = parseInt(differenceString.substring(0, 2), 10);
        if (isNaN(number.valueOf()))
          throw new Error("Wrong input string for conversion");
        hourDifference = multiplier * number;
        if (differenceString.length === 4) {
          number = parseInt(differenceString.substring(2, 4), 10);
          if (isNaN(number.valueOf()))
            throw new Error("Wrong input string for conversion");
          minuteDifference = multiplier * number;
        }
      }
    }
    let fractionPointPosition = timeString.indexOf(".");
    if (fractionPointPosition === -1)
      fractionPointPosition = timeString.indexOf(",");
    if (fractionPointPosition !== -1) {
      const fractionPartCheck = new Number(`0${timeString.substring(fractionPointPosition)}`);
      if (isNaN(fractionPartCheck.valueOf()))
        throw new Error("Wrong input string for conversion");
      fractionPart = fractionPartCheck.valueOf();
      dateTimeString = timeString.substring(0, fractionPointPosition);
    } else
      dateTimeString = timeString;
    switch (true) {
      case dateTimeString.length === 8:
        parser = /(\d{4})(\d{2})(\d{2})/ig;
        if (fractionPointPosition !== -1)
          throw new Error("Wrong input string for conversion");
        break;
      case dateTimeString.length === 10:
        parser = /(\d{4})(\d{2})(\d{2})(\d{2})/ig;
        if (fractionPointPosition !== -1) {
          let fractionResult = 60 * fractionPart;
          this.minute = Math.floor(fractionResult);
          fractionResult = 60 * (fractionResult - this.minute);
          this.second = Math.floor(fractionResult);
          fractionResult = 1e3 * (fractionResult - this.second);
          this.millisecond = Math.floor(fractionResult);
        }
        break;
      case dateTimeString.length === 12:
        parser = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/ig;
        if (fractionPointPosition !== -1) {
          let fractionResult = 60 * fractionPart;
          this.second = Math.floor(fractionResult);
          fractionResult = 1e3 * (fractionResult - this.second);
          this.millisecond = Math.floor(fractionResult);
        }
        break;
      case dateTimeString.length === 14:
        parser = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/ig;
        if (fractionPointPosition !== -1) {
          const fractionResult = 1e3 * fractionPart;
          this.millisecond = Math.floor(fractionResult);
        }
        break;
      default:
        throw new Error("Wrong input string for conversion");
    }
    const parserArray = parser.exec(dateTimeString);
    if (parserArray === null)
      throw new Error("Wrong input string for conversion");
    for (let j = 1; j < parserArray.length; j++) {
      switch (j) {
        case 1:
          this.year = parseInt(parserArray[j], 10);
          break;
        case 2:
          this.month = parseInt(parserArray[j], 10);
          break;
        case 3:
          this.day = parseInt(parserArray[j], 10);
          break;
        case 4:
          this.hour = parseInt(parserArray[j], 10) + hourDifference;
          break;
        case 5:
          this.minute = parseInt(parserArray[j], 10) + minuteDifference;
          break;
        case 6:
          this.second = parseInt(parserArray[j], 10);
          break;
        default:
          throw new Error("Wrong input string for conversion");
      }
    }
    if (isUTC === false) {
      const tempDate = new Date(this.year, this.month, this.day, this.hour, this.minute, this.second, this.millisecond);
      this.year = tempDate.getUTCFullYear();
      this.month = tempDate.getUTCMonth();
      this.day = tempDate.getUTCDay();
      this.hour = tempDate.getUTCHours();
      this.minute = tempDate.getUTCMinutes();
      this.second = tempDate.getUTCSeconds();
      this.millisecond = tempDate.getUTCMilliseconds();
    }
  }
  toString(encoding = "iso") {
    if (encoding === "iso") {
      const outputArray = [];
      outputArray.push(padNumber(this.year, 4));
      outputArray.push(padNumber(this.month, 2));
      outputArray.push(padNumber(this.day, 2));
      outputArray.push(padNumber(this.hour, 2));
      outputArray.push(padNumber(this.minute, 2));
      outputArray.push(padNumber(this.second, 2));
      if (this.millisecond !== 0) {
        outputArray.push(".");
        outputArray.push(padNumber(this.millisecond, 3));
      }
      outputArray.push("Z");
      return outputArray.join("");
    }
    return super.toString(encoding);
  }
  toJSON() {
    return {
      ...super.toJSON(),
      millisecond: this.millisecond
    };
  }
};
_a$5 = GeneralizedTime;
(() => {
  typeStore.GeneralizedTime = _a$5;
})();
GeneralizedTime.NAME = "GeneralizedTime";
var _a$4;
var DATE = class extends Utf8String {
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 31;
  }
};
_a$4 = DATE;
(() => {
  typeStore.DATE = _a$4;
})();
DATE.NAME = "DATE";
var _a$3;
var TimeOfDay = class extends Utf8String {
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 32;
  }
};
_a$3 = TimeOfDay;
(() => {
  typeStore.TimeOfDay = _a$3;
})();
TimeOfDay.NAME = "TimeOfDay";
var _a$2;
var DateTime = class extends Utf8String {
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 33;
  }
};
_a$2 = DateTime;
(() => {
  typeStore.DateTime = _a$2;
})();
DateTime.NAME = "DateTime";
var _a$1;
var Duration = class extends Utf8String {
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 34;
  }
};
_a$1 = Duration;
(() => {
  typeStore.Duration = _a$1;
})();
Duration.NAME = "Duration";
var _a;
var TIME = class extends Utf8String {
  constructor(parameters = {}) {
    super(parameters);
    this.idBlock.tagClass = 1;
    this.idBlock.tagNumber = 14;
  }
};
_a = TIME;
(() => {
  typeStore.TIME = _a;
})();
TIME.NAME = "TIME";
var Any = class {
  constructor({ name = EMPTY_STRING, optional = false } = {}) {
    this.name = name;
    this.optional = optional;
  }
};
var Choice = class extends Any {
  constructor({ value = [], ...parameters } = {}) {
    super(parameters);
    this.value = value;
  }
};
var Repeated = class extends Any {
  constructor({ value = new Any(), local = false, ...parameters } = {}) {
    super(parameters);
    this.value = value;
    this.local = local;
  }
};
var RawData = class {
  constructor({ data = EMPTY_VIEW } = {}) {
    this.dataView = pvtsutils.BufferSourceConverter.toUint8Array(data);
  }
  get data() {
    return this.dataView.slice().buffer;
  }
  set data(value) {
    this.dataView = pvtsutils.BufferSourceConverter.toUint8Array(value);
  }
  fromBER(inputBuffer, inputOffset, inputLength) {
    const endLength = inputOffset + inputLength;
    this.dataView = pvtsutils.BufferSourceConverter.toUint8Array(inputBuffer).subarray(inputOffset, endLength);
    return endLength;
  }
  toBER(sizeOnly) {
    return this.dataView.slice().buffer;
  }
};
function compareSchema(root, inputData, inputSchema) {
  if (inputSchema instanceof Choice) {
    for (let j = 0; j < inputSchema.value.length; j++) {
      const result = compareSchema(root, inputData, inputSchema.value[j]);
      if (result.verified) {
        return {
          verified: true,
          result: root
        };
      }
    }
    {
      const _result = {
        verified: false,
        result: {
          error: "Wrong values for Choice type"
        }
      };
      if (inputSchema.hasOwnProperty(NAME))
        _result.name = inputSchema.name;
      return _result;
    }
  }
  if (inputSchema instanceof Any) {
    if (inputSchema.hasOwnProperty(NAME))
      root[inputSchema.name] = inputData;
    return {
      verified: true,
      result: root
    };
  }
  if (root instanceof Object === false) {
    return {
      verified: false,
      result: { error: "Wrong root object" }
    };
  }
  if (inputData instanceof Object === false) {
    return {
      verified: false,
      result: { error: "Wrong ASN.1 data" }
    };
  }
  if (inputSchema instanceof Object === false) {
    return {
      verified: false,
      result: { error: "Wrong ASN.1 schema" }
    };
  }
  if (ID_BLOCK in inputSchema === false) {
    return {
      verified: false,
      result: { error: "Wrong ASN.1 schema" }
    };
  }
  if (FROM_BER in inputSchema.idBlock === false) {
    return {
      verified: false,
      result: { error: "Wrong ASN.1 schema" }
    };
  }
  if (TO_BER in inputSchema.idBlock === false) {
    return {
      verified: false,
      result: { error: "Wrong ASN.1 schema" }
    };
  }
  const encodedId = inputSchema.idBlock.toBER(false);
  if (encodedId.byteLength === 0) {
    return {
      verified: false,
      result: { error: "Error encoding idBlock for ASN.1 schema" }
    };
  }
  const decodedOffset = inputSchema.idBlock.fromBER(encodedId, 0, encodedId.byteLength);
  if (decodedOffset === -1) {
    return {
      verified: false,
      result: { error: "Error decoding idBlock for ASN.1 schema" }
    };
  }
  if (inputSchema.idBlock.hasOwnProperty(TAG_CLASS) === false) {
    return {
      verified: false,
      result: { error: "Wrong ASN.1 schema" }
    };
  }
  if (inputSchema.idBlock.tagClass !== inputData.idBlock.tagClass) {
    return {
      verified: false,
      result: root
    };
  }
  if (inputSchema.idBlock.hasOwnProperty(TAG_NUMBER) === false) {
    return {
      verified: false,
      result: { error: "Wrong ASN.1 schema" }
    };
  }
  if (inputSchema.idBlock.tagNumber !== inputData.idBlock.tagNumber) {
    return {
      verified: false,
      result: root
    };
  }
  if (inputSchema.idBlock.hasOwnProperty(IS_CONSTRUCTED) === false) {
    return {
      verified: false,
      result: { error: "Wrong ASN.1 schema" }
    };
  }
  if (inputSchema.idBlock.isConstructed !== inputData.idBlock.isConstructed) {
    return {
      verified: false,
      result: root
    };
  }
  if (!(IS_HEX_ONLY in inputSchema.idBlock)) {
    return {
      verified: false,
      result: { error: "Wrong ASN.1 schema" }
    };
  }
  if (inputSchema.idBlock.isHexOnly !== inputData.idBlock.isHexOnly) {
    return {
      verified: false,
      result: root
    };
  }
  if (inputSchema.idBlock.isHexOnly) {
    if (VALUE_HEX_VIEW in inputSchema.idBlock === false) {
      return {
        verified: false,
        result: { error: "Wrong ASN.1 schema" }
      };
    }
    const schemaView = inputSchema.idBlock.valueHexView;
    const asn1View = inputData.idBlock.valueHexView;
    if (schemaView.length !== asn1View.length) {
      return {
        verified: false,
        result: root
      };
    }
    for (let i = 0; i < schemaView.length; i++) {
      if (schemaView[i] !== asn1View[1]) {
        return {
          verified: false,
          result: root
        };
      }
    }
  }
  if (inputSchema.name) {
    inputSchema.name = inputSchema.name.replace(/^\s+|\s+$/g, EMPTY_STRING);
    if (inputSchema.name)
      root[inputSchema.name] = inputData;
  }
  if (inputSchema instanceof typeStore.Constructed) {
    let admission = 0;
    let result = {
      verified: false,
      result: {
        error: "Unknown error"
      }
    };
    let maxLength = inputSchema.valueBlock.value.length;
    if (maxLength > 0) {
      if (inputSchema.valueBlock.value[0] instanceof Repeated) {
        maxLength = inputData.valueBlock.value.length;
      }
    }
    if (maxLength === 0) {
      return {
        verified: true,
        result: root
      };
    }
    if (inputData.valueBlock.value.length === 0 && inputSchema.valueBlock.value.length !== 0) {
      let _optional = true;
      for (let i = 0; i < inputSchema.valueBlock.value.length; i++)
        _optional = _optional && (inputSchema.valueBlock.value[i].optional || false);
      if (_optional) {
        return {
          verified: true,
          result: root
        };
      }
      if (inputSchema.name) {
        inputSchema.name = inputSchema.name.replace(/^\s+|\s+$/g, EMPTY_STRING);
        if (inputSchema.name)
          delete root[inputSchema.name];
      }
      root.error = "Inconsistent object length";
      return {
        verified: false,
        result: root
      };
    }
    for (let i = 0; i < maxLength; i++) {
      if (i - admission >= inputData.valueBlock.value.length) {
        if (inputSchema.valueBlock.value[i].optional === false) {
          const _result = {
            verified: false,
            result: root
          };
          root.error = "Inconsistent length between ASN.1 data and schema";
          if (inputSchema.name) {
            inputSchema.name = inputSchema.name.replace(/^\s+|\s+$/g, EMPTY_STRING);
            if (inputSchema.name) {
              delete root[inputSchema.name];
              _result.name = inputSchema.name;
            }
          }
          return _result;
        }
      } else {
        if (inputSchema.valueBlock.value[0] instanceof Repeated) {
          result = compareSchema(root, inputData.valueBlock.value[i], inputSchema.valueBlock.value[0].value);
          if (result.verified === false) {
            if (inputSchema.valueBlock.value[0].optional)
              admission++;
            else {
              if (inputSchema.name) {
                inputSchema.name = inputSchema.name.replace(/^\s+|\s+$/g, EMPTY_STRING);
                if (inputSchema.name)
                  delete root[inputSchema.name];
              }
              return result;
            }
          }
          if (NAME in inputSchema.valueBlock.value[0] && inputSchema.valueBlock.value[0].name.length > 0) {
            let arrayRoot = {};
            if (LOCAL in inputSchema.valueBlock.value[0] && inputSchema.valueBlock.value[0].local)
              arrayRoot = inputData;
            else
              arrayRoot = root;
            if (typeof arrayRoot[inputSchema.valueBlock.value[0].name] === "undefined")
              arrayRoot[inputSchema.valueBlock.value[0].name] = [];
            arrayRoot[inputSchema.valueBlock.value[0].name].push(inputData.valueBlock.value[i]);
          }
        } else {
          result = compareSchema(root, inputData.valueBlock.value[i - admission], inputSchema.valueBlock.value[i]);
          if (result.verified === false) {
            if (inputSchema.valueBlock.value[i].optional)
              admission++;
            else {
              if (inputSchema.name) {
                inputSchema.name = inputSchema.name.replace(/^\s+|\s+$/g, EMPTY_STRING);
                if (inputSchema.name)
                  delete root[inputSchema.name];
              }
              return result;
            }
          }
        }
      }
    }
    if (result.verified === false) {
      const _result = {
        verified: false,
        result: root
      };
      if (inputSchema.name) {
        inputSchema.name = inputSchema.name.replace(/^\s+|\s+$/g, EMPTY_STRING);
        if (inputSchema.name) {
          delete root[inputSchema.name];
          _result.name = inputSchema.name;
        }
      }
      return _result;
    }
    return {
      verified: true,
      result: root
    };
  }
  if (inputSchema.primitiveSchema && VALUE_HEX_VIEW in inputData.valueBlock) {
    const asn1 = localFromBER(inputData.valueBlock.valueHexView);
    if (asn1.offset === -1) {
      const _result = {
        verified: false,
        result: asn1.result
      };
      if (inputSchema.name) {
        inputSchema.name = inputSchema.name.replace(/^\s+|\s+$/g, EMPTY_STRING);
        if (inputSchema.name) {
          delete root[inputSchema.name];
          _result.name = inputSchema.name;
        }
      }
      return _result;
    }
    return compareSchema(root, asn1.result, inputSchema.primitiveSchema);
  }
  return {
    verified: true,
    result: root
  };
}

// node_modules/pkijs/build/index.es.js
var pvtsutils2 = __toESM(require_build());
var import_pvtsutils = __toESM(require_build());

// node_modules/bytestreamjs/build/mjs/byte_stream.js
var ByteStream = class _ByteStream {
  constructor(parameters = {}) {
    if ("view" in parameters) {
      this.fromUint8Array(parameters.view);
    } else if ("buffer" in parameters) {
      this.fromArrayBuffer(parameters.buffer);
    } else if ("string" in parameters) {
      this.fromString(parameters.string);
    } else if ("hexstring" in parameters) {
      this.fromHexString(parameters.hexstring);
    } else {
      if ("length" in parameters && parameters.length > 0) {
        this.length = parameters.length;
        if (parameters.stub) {
          for (let i = 0; i < this._view.length; i++) {
            this._view[i] = parameters.stub;
          }
        }
      } else {
        this.length = 0;
      }
    }
  }
  set buffer(value) {
    this._buffer = value;
    this._view = new Uint8Array(this._buffer);
  }
  get buffer() {
    return this._buffer;
  }
  set view(value) {
    this._buffer = new ArrayBuffer(value.length);
    this._view = new Uint8Array(this._buffer);
    this._view.set(value);
  }
  get view() {
    return this._view;
  }
  get length() {
    return this.view.byteLength;
  }
  set length(value) {
    this._buffer = new ArrayBuffer(value);
    this._view = new Uint8Array(this._buffer);
  }
  clear() {
    this._buffer = new ArrayBuffer(0);
    this._view = new Uint8Array(this._buffer);
  }
  fromArrayBuffer(array) {
    this._buffer = array;
    this._view = new Uint8Array(this._buffer);
  }
  fromUint8Array(array) {
    this.fromArrayBuffer(new Uint8Array(array).buffer);
  }
  fromString(string) {
    const stringLength = string.length;
    this.length = stringLength;
    for (let i = 0; i < stringLength; i++)
      this.view[i] = string.charCodeAt(i);
  }
  toString(start = 0, length = this.view.length - start) {
    let result = "";
    if (start >= this.view.length || start < 0) {
      start = 0;
    }
    if (length >= this.view.length || length < 0) {
      length = this.view.length - start;
    }
    for (let i = start; i < start + length; i++)
      result += String.fromCharCode(this.view[i]);
    return result;
  }
  fromHexString(hexString) {
    const stringLength = hexString.length;
    this.buffer = new ArrayBuffer(stringLength >> 1);
    this.view = new Uint8Array(this.buffer);
    const hexMap = /* @__PURE__ */ new Map();
    hexMap.set("0", 0);
    hexMap.set("1", 1);
    hexMap.set("2", 2);
    hexMap.set("3", 3);
    hexMap.set("4", 4);
    hexMap.set("5", 5);
    hexMap.set("6", 6);
    hexMap.set("7", 7);
    hexMap.set("8", 8);
    hexMap.set("9", 9);
    hexMap.set("A", 10);
    hexMap.set("a", 10);
    hexMap.set("B", 11);
    hexMap.set("b", 11);
    hexMap.set("C", 12);
    hexMap.set("c", 12);
    hexMap.set("D", 13);
    hexMap.set("d", 13);
    hexMap.set("E", 14);
    hexMap.set("e", 14);
    hexMap.set("F", 15);
    hexMap.set("f", 15);
    let j = 0;
    let temp = 0;
    for (let i = 0; i < stringLength; i++) {
      if (!(i % 2)) {
        temp = hexMap.get(hexString.charAt(i)) << 4;
      } else {
        temp |= hexMap.get(hexString.charAt(i));
        this.view[j] = temp;
        j++;
      }
    }
  }
  toHexString(start = 0, length = this.view.length - start) {
    let result = "";
    if (start >= this.view.length || start < 0) {
      start = 0;
    }
    if (length >= this.view.length || length < 0) {
      length = this.view.length - start;
    }
    for (let i = start; i < start + length; i++) {
      const str = this.view[i].toString(16).toUpperCase();
      result = result + (str.length == 1 ? "0" : "") + str;
    }
    return result;
  }
  copy(start = 0, length = this.length - start) {
    if (!start && !this.length) {
      return new _ByteStream();
    }
    if (start < 0 || start > this.length - 1) {
      throw new Error(`Wrong start position: ${start}`);
    }
    const stream = new _ByteStream({
      buffer: this._buffer.slice(start, start + length)
    });
    return stream;
  }
  slice(start = 0, end = this.length) {
    if (!start && !this.length) {
      return new _ByteStream();
    }
    if (start < 0 || start > this.length - 1) {
      throw new Error(`Wrong start position: ${start}`);
    }
    const stream = new _ByteStream({
      buffer: this._buffer.slice(start, end)
    });
    return stream;
  }
  realloc(size) {
    const buffer = new ArrayBuffer(size);
    const view = new Uint8Array(buffer);
    if (size > this._view.length)
      view.set(this._view);
    else {
      view.set(new Uint8Array(this._buffer, 0, size));
    }
    this._buffer = buffer;
    this._view = new Uint8Array(this._buffer);
  }
  append(stream) {
    const initialSize = this.length;
    const streamViewLength = stream.length;
    const subarrayView = stream._view.subarray();
    this.realloc(initialSize + streamViewLength);
    this._view.set(subarrayView, initialSize);
  }
  insert(stream, start = 0, length = this.length - start) {
    if (start > this.length - 1)
      return false;
    if (length > this.length - start) {
      length = this.length - start;
    }
    if (length > stream.length) {
      length = stream.length;
    }
    if (length == stream.length)
      this._view.set(stream._view, start);
    else {
      this._view.set(stream._view.subarray(0, length), start);
    }
    return true;
  }
  isEqual(stream) {
    if (this.length != stream.length)
      return false;
    for (let i = 0; i < stream.length; i++) {
      if (this.view[i] != stream.view[i])
        return false;
    }
    return true;
  }
  isEqualView(view) {
    if (view.length != this.view.length)
      return false;
    for (let i = 0; i < view.length; i++) {
      if (this.view[i] != view[i])
        return false;
    }
    return true;
  }
  findPattern(pattern, start_, length_, backward_) {
    const { start, length, backward } = this.prepareFindParameters(start_, length_, backward_);
    const patternLength = pattern.length;
    if (patternLength > length) {
      return -1;
    }
    const patternArray = [];
    for (let i = 0; i < patternLength; i++)
      patternArray.push(pattern.view[i]);
    for (let i = 0; i <= length - patternLength; i++) {
      let equal = true;
      const equalStart = backward ? start - patternLength - i : start + i;
      for (let j = 0; j < patternLength; j++) {
        if (this.view[j + equalStart] != patternArray[j]) {
          equal = false;
          break;
        }
      }
      if (equal) {
        return backward ? start - patternLength - i : start + patternLength + i;
      }
    }
    return -1;
  }
  findFirstIn(patterns, start_, length_, backward_) {
    const { start, length, backward } = this.prepareFindParameters(start_, length_, backward_);
    const result = {
      id: -1,
      position: backward ? 0 : start + length,
      length: 0
    };
    for (let i = 0; i < patterns.length; i++) {
      const position3 = this.findPattern(patterns[i], start, length, backward);
      if (position3 != -1) {
        let valid = false;
        const patternLength = patterns[i].length;
        if (backward) {
          if (position3 - patternLength >= result.position - result.length)
            valid = true;
        } else {
          if (position3 - patternLength <= result.position - result.length)
            valid = true;
        }
        if (valid) {
          result.position = position3;
          result.id = i;
          result.length = patternLength;
        }
      }
    }
    return result;
  }
  findAllIn(patterns, start_, length_) {
    let { start, length } = this.prepareFindParameters(start_, length_);
    const result = [];
    let patternFound = {
      id: -1,
      position: start
    };
    do {
      const position3 = patternFound.position;
      patternFound = this.findFirstIn(patterns, patternFound.position, length);
      if (patternFound.id == -1) {
        break;
      }
      length -= patternFound.position - position3;
      result.push({
        id: patternFound.id,
        position: patternFound.position
      });
    } while (true);
    return result;
  }
  findAllPatternIn(pattern, start_, length_) {
    const { start, length } = this.prepareFindParameters(start_, length_);
    const result = [];
    const patternLength = pattern.length;
    if (patternLength > length) {
      return -1;
    }
    const patternArray = Array.from(pattern.view);
    for (let i = 0; i <= length - patternLength; i++) {
      let equal = true;
      const equalStart = start + i;
      for (let j = 0; j < patternLength; j++) {
        if (this.view[j + equalStart] != patternArray[j]) {
          equal = false;
          break;
        }
      }
      if (equal) {
        result.push(start + patternLength + i);
        i += patternLength - 1;
      }
    }
    return result;
  }
  findFirstNotIn(patterns, start_, length_, backward_) {
    let { start, length, backward } = this.prepareFindParameters(start_, length_, backward_);
    const result = {
      left: {
        id: -1,
        position: start
      },
      right: {
        id: -1,
        position: 0
      },
      value: new _ByteStream()
    };
    let currentLength = length;
    while (currentLength > 0) {
      result.right = this.findFirstIn(patterns, backward ? start - length + currentLength : start + length - currentLength, currentLength, backward);
      if (result.right.id == -1) {
        length = currentLength;
        if (backward) {
          start -= length;
        } else {
          start = result.left.position;
        }
        result.value = new _ByteStream({
          buffer: this._buffer.slice(start, start + length)
        });
        break;
      }
      if (result.right.position != (backward ? result.left.position - patterns[result.right.id].length : result.left.position + patterns[result.right.id].length)) {
        if (backward) {
          start = result.right.position + patterns[result.right.id].length;
          length = result.left.position - result.right.position - patterns[result.right.id].length;
        } else {
          start = result.left.position;
          length = result.right.position - result.left.position - patterns[result.right.id].length;
        }
        result.value = new _ByteStream({
          buffer: this._buffer.slice(start, start + length)
        });
        break;
      }
      result.left = result.right;
      currentLength -= patterns[result.right.id].length;
    }
    if (backward) {
      const temp = result.right;
      result.right = result.left;
      result.left = temp;
    }
    return result;
  }
  findAllNotIn(patterns, start_, length_) {
    let { start, length } = this.prepareFindParameters(start_, length_);
    const result = [];
    let patternFound = {
      left: {
        id: -1,
        position: start
      },
      right: {
        id: -1,
        position: start
      },
      value: new _ByteStream()
    };
    do {
      const position3 = patternFound.right.position;
      patternFound = this.findFirstNotIn(patterns, patternFound.right.position, length);
      length -= patternFound.right.position - position3;
      result.push({
        left: {
          id: patternFound.left.id,
          position: patternFound.left.position
        },
        right: {
          id: patternFound.right.id,
          position: patternFound.right.position
        },
        value: patternFound.value
      });
    } while (patternFound.right.id != -1);
    return result;
  }
  findFirstSequence(patterns, start_, length_, backward_) {
    let { start, length, backward } = this.prepareFindParameters(start_, length_, backward_);
    const firstIn = this.skipNotPatterns(patterns, start, length, backward);
    if (firstIn == -1) {
      return {
        position: -1,
        value: new _ByteStream()
      };
    }
    const firstNotIn = this.skipPatterns(patterns, firstIn, length - (backward ? start - firstIn : firstIn - start), backward);
    if (backward) {
      start = firstNotIn;
      length = firstIn - firstNotIn;
    } else {
      start = firstIn;
      length = firstNotIn - firstIn;
    }
    const value = new _ByteStream({
      buffer: this._buffer.slice(start, start + length)
    });
    return {
      position: firstNotIn,
      value
    };
  }
  findAllSequences(patterns, start_, length_) {
    let { start, length } = this.prepareFindParameters(start_, length_);
    const result = [];
    let patternFound = {
      position: start,
      value: new _ByteStream()
    };
    do {
      const position3 = patternFound.position;
      patternFound = this.findFirstSequence(patterns, patternFound.position, length);
      if (patternFound.position != -1) {
        length -= patternFound.position - position3;
        result.push({
          position: patternFound.position,
          value: patternFound.value
        });
      }
    } while (patternFound.position != -1);
    return result;
  }
  findPairedPatterns(leftPattern, rightPattern, start_, length_) {
    const result = [];
    if (leftPattern.isEqual(rightPattern))
      return result;
    const { start, length } = this.prepareFindParameters(start_, length_);
    let currentPositionLeft = 0;
    const leftPatterns = this.findAllPatternIn(leftPattern, start, length);
    if (!Array.isArray(leftPatterns) || leftPatterns.length == 0) {
      return result;
    }
    const rightPatterns = this.findAllPatternIn(rightPattern, start, length);
    if (!Array.isArray(rightPatterns) || rightPatterns.length == 0) {
      return result;
    }
    while (currentPositionLeft < leftPatterns.length) {
      if (rightPatterns.length == 0) {
        break;
      }
      if (leftPatterns[0] == rightPatterns[0]) {
        result.push({
          left: leftPatterns[0],
          right: rightPatterns[0]
        });
        leftPatterns.splice(0, 1);
        rightPatterns.splice(0, 1);
        continue;
      }
      if (leftPatterns[currentPositionLeft] > rightPatterns[0]) {
        break;
      }
      while (leftPatterns[currentPositionLeft] < rightPatterns[0]) {
        currentPositionLeft++;
        if (currentPositionLeft >= leftPatterns.length) {
          break;
        }
      }
      result.push({
        left: leftPatterns[currentPositionLeft - 1],
        right: rightPatterns[0]
      });
      leftPatterns.splice(currentPositionLeft - 1, 1);
      rightPatterns.splice(0, 1);
      currentPositionLeft = 0;
    }
    result.sort((a, b) => a.left - b.left);
    return result;
  }
  findPairedArrays(inputLeftPatterns, inputRightPatterns, start_, length_) {
    const { start, length } = this.prepareFindParameters(start_, length_);
    const result = [];
    let currentPositionLeft = 0;
    const leftPatterns = this.findAllIn(inputLeftPatterns, start, length);
    if (leftPatterns.length == 0)
      return result;
    const rightPatterns = this.findAllIn(inputRightPatterns, start, length);
    if (rightPatterns.length == 0)
      return result;
    while (currentPositionLeft < leftPatterns.length) {
      if (rightPatterns.length == 0) {
        break;
      }
      if (leftPatterns[0].position == rightPatterns[0].position) {
        result.push({
          left: leftPatterns[0],
          right: rightPatterns[0]
        });
        leftPatterns.splice(0, 1);
        rightPatterns.splice(0, 1);
        continue;
      }
      if (leftPatterns[currentPositionLeft].position > rightPatterns[0].position) {
        break;
      }
      while (leftPatterns[currentPositionLeft].position < rightPatterns[0].position) {
        currentPositionLeft++;
        if (currentPositionLeft >= leftPatterns.length) {
          break;
        }
      }
      result.push({
        left: leftPatterns[currentPositionLeft - 1],
        right: rightPatterns[0]
      });
      leftPatterns.splice(currentPositionLeft - 1, 1);
      rightPatterns.splice(0, 1);
      currentPositionLeft = 0;
    }
    result.sort((a, b) => a.left.position - b.left.position);
    return result;
  }
  replacePattern(searchPattern, replacePattern, start_, length_, findAllResult = null) {
    let result = [];
    let i;
    const output = {
      status: -1,
      searchPatternPositions: [],
      replacePatternPositions: []
    };
    const { start, length } = this.prepareFindParameters(start_, length_);
    if (findAllResult == null) {
      result = this.findAllIn([searchPattern], start, length);
      if (result.length == 0) {
        return output;
      }
    } else {
      result = findAllResult;
    }
    output.searchPatternPositions.push(...Array.from(result, (element) => element.position));
    const patternDifference = searchPattern.length - replacePattern.length;
    const changedBuffer = new ArrayBuffer(this.view.length - result.length * patternDifference);
    const changedView = new Uint8Array(changedBuffer);
    changedView.set(new Uint8Array(this.buffer, 0, start));
    for (i = 0; i < result.length; i++) {
      const currentPosition = i == 0 ? start : result[i - 1].position;
      changedView.set(new Uint8Array(this.buffer, currentPosition, result[i].position - searchPattern.length - currentPosition), currentPosition - i * patternDifference);
      changedView.set(replacePattern.view, result[i].position - searchPattern.length - i * patternDifference);
      output.replacePatternPositions.push(result[i].position - searchPattern.length - i * patternDifference);
    }
    i--;
    changedView.set(new Uint8Array(this.buffer, result[i].position, this.length - result[i].position), result[i].position - searchPattern.length + replacePattern.length - i * patternDifference);
    this.buffer = changedBuffer;
    this.view = new Uint8Array(this.buffer);
    output.status = 1;
    return output;
  }
  skipPatterns(patterns, start_, length_, backward_) {
    const { start, length, backward } = this.prepareFindParameters(start_, length_, backward_);
    let result = start;
    for (let k = 0; k < patterns.length; k++) {
      const patternLength = patterns[k].length;
      const equalStart = backward ? result - patternLength : result;
      let equal = true;
      for (let j = 0; j < patternLength; j++) {
        if (this.view[j + equalStart] != patterns[k].view[j]) {
          equal = false;
          break;
        }
      }
      if (equal) {
        k = -1;
        if (backward) {
          result -= patternLength;
          if (result <= 0)
            return result;
        } else {
          result += patternLength;
          if (result >= start + length)
            return result;
        }
      }
    }
    return result;
  }
  skipNotPatterns(patterns, start_, length_, backward_) {
    const { start, length, backward } = this.prepareFindParameters(start_, length_, backward_);
    let result = -1;
    for (let i = 0; i < length; i++) {
      for (let k = 0; k < patterns.length; k++) {
        const patternLength = patterns[k].length;
        const equalStart = backward ? start - i - patternLength : start + i;
        let equal = true;
        for (let j = 0; j < patternLength; j++) {
          if (this.view[j + equalStart] != patterns[k].view[j]) {
            equal = false;
            break;
          }
        }
        if (equal) {
          result = backward ? start - i : start + i;
          break;
        }
      }
      if (result != -1) {
        break;
      }
    }
    return result;
  }
  prepareFindParameters(start = null, length = null, backward = false) {
    if (start === null) {
      start = backward ? this.length : 0;
    }
    if (start > this.length) {
      start = this.length;
    }
    if (backward) {
      if (length === null) {
        length = start;
      }
      if (length > start) {
        length = start;
      }
    } else {
      if (length === null) {
        length = this.length - start;
      }
      if (length > this.length - start) {
        length = this.length - start;
      }
    }
    return { start, length, backward };
  }
};

// node_modules/bytestreamjs/build/mjs/seq_stream.js
var pow2_24 = 16777216;
var SeqStream = class _SeqStream {
  constructor(parameters = {}) {
    this._stream = new ByteStream();
    this._length = 0;
    this._start = 0;
    this.backward = false;
    this.appendBlock = 0;
    this.prevLength = 0;
    this.prevStart = 0;
    if ("view" in parameters) {
      this.stream = new ByteStream({ view: parameters.view });
    } else if ("buffer" in parameters) {
      this.stream = new ByteStream({ buffer: parameters.buffer });
    } else if ("string" in parameters) {
      this.stream = new ByteStream({ string: parameters.string });
    } else if ("hexstring" in parameters) {
      this.stream = new ByteStream({ hexstring: parameters.hexstring });
    } else if ("stream" in parameters) {
      this.stream = parameters.stream.slice();
    } else {
      this.stream = new ByteStream();
    }
    if ("backward" in parameters && parameters.backward) {
      this.backward = parameters.backward;
      this._start = this.stream.length;
    }
    if ("length" in parameters && parameters.length > 0) {
      this._length = parameters.length;
    }
    if ("start" in parameters && parameters.start && parameters.start > 0) {
      this._start = parameters.start;
    }
    if ("appendBlock" in parameters && parameters.appendBlock && parameters.appendBlock > 0) {
      this.appendBlock = parameters.appendBlock;
    }
  }
  set stream(value) {
    this._stream = value;
    this.prevLength = this._length;
    this._length = value.length;
    this.prevStart = this._start;
    this._start = 0;
  }
  get stream() {
    return this._stream;
  }
  set length(value) {
    this.prevLength = this._length;
    this._length = value;
  }
  get length() {
    if (this.appendBlock) {
      return this.start;
    }
    return this._length;
  }
  set start(value) {
    if (value > this.stream.length)
      return;
    this.prevStart = this._start;
    this.prevLength = this._length;
    this._length -= this.backward ? this._start - value : value - this._start;
    this._start = value;
  }
  get start() {
    return this._start;
  }
  get buffer() {
    return this._stream.buffer.slice(0, this._length);
  }
  resetPosition() {
    this._start = this.prevStart;
    this._length = this.prevLength;
  }
  findPattern(pattern, gap = null) {
    if (gap == null || gap > this.length) {
      gap = this.length;
    }
    const result = this.stream.findPattern(pattern, this.start, this.length, this.backward);
    if (result == -1)
      return result;
    if (this.backward) {
      if (result < this.start - pattern.length - gap) {
        return -1;
      }
    } else {
      if (result > this.start + pattern.length + gap) {
        return -1;
      }
    }
    this.start = result;
    return result;
  }
  findFirstIn(patterns, gap = null) {
    if (gap == null || gap > this.length) {
      gap = this.length;
    }
    const result = this.stream.findFirstIn(patterns, this.start, this.length, this.backward);
    if (result.id == -1)
      return result;
    if (this.backward) {
      if (result.position < this.start - patterns[result.id].length - gap) {
        return {
          id: -1,
          position: this.backward ? 0 : this.start + this.length
        };
      }
    } else {
      if (result.position > this.start + patterns[result.id].length + gap) {
        return {
          id: -1,
          position: this.backward ? 0 : this.start + this.length
        };
      }
    }
    this.start = result.position;
    return result;
  }
  findAllIn(patterns) {
    const start = this.backward ? this.start - this.length : this.start;
    return this.stream.findAllIn(patterns, start, this.length);
  }
  findFirstNotIn(patterns, gap = null) {
    if (gap == null || gap > this._length) {
      gap = this._length;
    }
    const result = this._stream.findFirstNotIn(patterns, this._start, this._length, this.backward);
    if (result.left.id == -1 && result.right.id == -1) {
      return result;
    }
    if (this.backward) {
      if (result.right.id != -1) {
        if (result.right.position < this._start - patterns[result.right.id].length - gap) {
          return {
            left: {
              id: -1,
              position: this._start
            },
            right: {
              id: -1,
              position: 0
            },
            value: new ByteStream()
          };
        }
      }
    } else {
      if (result.left.id != -1) {
        if (result.left.position > this._start + patterns[result.left.id].length + gap) {
          return {
            left: {
              id: -1,
              position: this._start
            },
            right: {
              id: -1,
              position: 0
            },
            value: new ByteStream()
          };
        }
      }
    }
    if (this.backward) {
      if (result.left.id == -1) {
        this.start = 0;
      } else {
        this.start = result.left.position;
      }
    } else {
      if (result.right.id == -1) {
        this.start = this._start + this._length;
      } else {
        this.start = result.right.position;
      }
    }
    return result;
  }
  findAllNotIn(patterns) {
    const start = this.backward ? this._start - this._length : this._start;
    return this._stream.findAllNotIn(patterns, start, this._length);
  }
  findFirstSequence(patterns, length = null, gap = null) {
    if (length == null || length > this._length) {
      length = this._length;
    }
    if (gap == null || gap > length) {
      gap = length;
    }
    const result = this._stream.findFirstSequence(patterns, this._start, length, this.backward);
    if (result.value.length == 0) {
      return result;
    }
    if (this.backward) {
      if (result.position < this._start - result.value.length - gap) {
        return {
          position: -1,
          value: new ByteStream()
        };
      }
    } else {
      if (result.position > this._start + result.value.length + gap) {
        return {
          position: -1,
          value: new ByteStream()
        };
      }
    }
    this.start = result.position;
    return result;
  }
  findAllSequences(patterns) {
    const start = this.backward ? this.start - this.length : this.start;
    return this.stream.findAllSequences(patterns, start, this.length);
  }
  findPairedPatterns(leftPattern, rightPattern, gap = null) {
    if (gap == null || gap > this.length) {
      gap = this.length;
    }
    const start = this.backward ? this.start - this.length : this.start;
    const result = this.stream.findPairedPatterns(leftPattern, rightPattern, start, this.length);
    if (result.length) {
      if (this.backward) {
        if (result[0].right < this.start - rightPattern.length - gap) {
          return [];
        }
      } else {
        if (result[0].left > this.start + leftPattern.length + gap) {
          return [];
        }
      }
    }
    return result;
  }
  findPairedArrays(leftPatterns, rightPatterns, gap = null) {
    if (gap == null || gap > this.length) {
      gap = this.length;
    }
    const start = this.backward ? this.start - this.length : this.start;
    const result = this.stream.findPairedArrays(leftPatterns, rightPatterns, start, this.length);
    if (result.length) {
      if (this.backward) {
        if (result[0].right.position < this.start - rightPatterns[result[0].right.id].length - gap) {
          return [];
        }
      } else {
        if (result[0].left.position > this.start + leftPatterns[result[0].left.id].length + gap) {
          return [];
        }
      }
    }
    return result;
  }
  replacePattern(searchPattern, replacePattern) {
    const start = this.backward ? this.start - this.length : this.start;
    return this.stream.replacePattern(searchPattern, replacePattern, start, this.length);
  }
  skipPatterns(patterns) {
    const result = this.stream.skipPatterns(patterns, this.start, this.length, this.backward);
    this.start = result;
    return result;
  }
  skipNotPatterns(patterns) {
    const result = this.stream.skipNotPatterns(patterns, this.start, this.length, this.backward);
    if (result == -1)
      return -1;
    this.start = result;
    return result;
  }
  append(stream) {
    this.beforeAppend(stream.length);
    this._stream.view.set(stream.view, this._start);
    this._length += stream.length * 2;
    this.start = this._start + stream.length;
    this.prevLength -= stream.length * 2;
  }
  appendView(view) {
    this.beforeAppend(view.length);
    this._stream.view.set(view, this._start);
    this._length += view.length * 2;
    this.start = this._start + view.length;
    this.prevLength -= view.length * 2;
  }
  appendChar(char) {
    this.beforeAppend(1);
    this._stream.view[this._start] = char;
    this._length += 2;
    this.start = this._start + 1;
    this.prevLength -= 2;
  }
  appendUint16(number) {
    this.beforeAppend(2);
    const value = new Uint16Array([number]);
    const view = new Uint8Array(value.buffer);
    this.stream.view[this._start] = view[1];
    this._stream.view[this._start + 1] = view[0];
    this._length += 4;
    this.start = this._start + 2;
    this.prevLength -= 4;
  }
  appendUint24(number) {
    this.beforeAppend(3);
    const value = new Uint32Array([number]);
    const view = new Uint8Array(value.buffer);
    this._stream.view[this._start] = view[2];
    this._stream.view[this._start + 1] = view[1];
    this._stream.view[this._start + 2] = view[0];
    this._length += 6;
    this.start = this._start + 3;
    this.prevLength -= 6;
  }
  appendUint32(number) {
    this.beforeAppend(4);
    const value = new Uint32Array([number]);
    const view = new Uint8Array(value.buffer);
    this._stream.view[this._start] = view[3];
    this._stream.view[this._start + 1] = view[2];
    this._stream.view[this._start + 2] = view[1];
    this._stream.view[this._start + 3] = view[0];
    this._length += 8;
    this.start = this._start + 4;
    this.prevLength -= 8;
  }
  appendInt16(number) {
    this.beforeAppend(2);
    const value = new Int16Array([number]);
    const view = new Uint8Array(value.buffer);
    this._stream.view[this._start] = view[1];
    this._stream.view[this._start + 1] = view[0];
    this._length += 4;
    this.start = this._start + 2;
    this.prevLength -= 4;
  }
  appendInt32(number) {
    this.beforeAppend(4);
    const value = new Int32Array([number]);
    const view = new Uint8Array(value.buffer);
    this._stream.view[this._start] = view[3];
    this._stream.view[this._start + 1] = view[2];
    this._stream.view[this._start + 2] = view[1];
    this._stream.view[this._start + 3] = view[0];
    this._length += 8;
    this.start = this._start + 4;
    this.prevLength -= 8;
  }
  getBlock(size, changeLength = true) {
    if (this._length <= 0) {
      return new Uint8Array(0);
    }
    if (this._length < size) {
      size = this._length;
    }
    let result;
    if (this.backward) {
      const view = this._stream.view.subarray(this._length - size, this._length);
      result = new Uint8Array(size);
      for (let i = 0; i < size; i++) {
        result[size - 1 - i] = view[i];
      }
    } else {
      result = this._stream.view.subarray(this._start, this._start + size);
    }
    if (changeLength) {
      this.start += this.backward ? -1 * size : size;
    }
    return result;
  }
  getUint16(changeLength = true) {
    const block = this.getBlock(2, changeLength);
    if (block.length < 2)
      return 0;
    return block[0] << 8 | block[1];
  }
  getInt16(changeLength = true) {
    const num = this.getUint16(changeLength);
    const negative = 32768;
    if (num & negative) {
      return -(negative - (num ^ negative));
    }
    return num;
  }
  getUint24(changeLength = true) {
    const block = this.getBlock(4, changeLength);
    if (block.length < 3)
      return 0;
    return block[0] << 16 | block[1] << 8 | block[2];
  }
  getUint32(changeLength = true) {
    const block = this.getBlock(4, changeLength);
    if (block.length < 4)
      return 0;
    return block[0] * pow2_24 + (block[1] << 16) + (block[2] << 8) + block[3];
  }
  getInt32(changeLength = true) {
    const num = this.getUint32(changeLength);
    const negative = 2147483648;
    if (num & negative) {
      return -(negative - (num ^ negative));
    }
    return num;
  }
  beforeAppend(size) {
    if (this._start + size > this._stream.length) {
      if (size > this.appendBlock) {
        this.appendBlock = size + _SeqStream.APPEND_BLOCK;
      }
      this._stream.realloc(this._stream.length + this.appendBlock);
    }
  }
};
SeqStream.APPEND_BLOCK = 1e3;

// node_modules/pkijs/build/index.es.js
var EMPTY_BUFFER2 = new ArrayBuffer(0);
var EMPTY_STRING2 = "";
var ArgumentError = class _ArgumentError extends TypeError {
  constructor() {
    super(...arguments);
    this.name = _ArgumentError.NAME;
  }
  static isType(value, type) {
    if (typeof type === "string") {
      if (type === "Array" && Array.isArray(value)) {
        return true;
      } else if (type === "ArrayBuffer" && value instanceof ArrayBuffer) {
        return true;
      } else if (type === "ArrayBufferView" && ArrayBuffer.isView(value)) {
        return true;
      } else if (typeof value === type) {
        return true;
      }
    } else if (value instanceof type) {
      return true;
    }
    return false;
  }
  static assert(value, name, ...types3) {
    for (const type of types3) {
      if (this.isType(value, type)) {
        return;
      }
    }
    const typeNames = types3.map((o) => o instanceof Function && "name" in o ? o.name : `${o}`);
    throw new _ArgumentError(`Parameter '${name}' is not of type ${typeNames.length > 1 ? `(${typeNames.join(" or ")})` : typeNames[0]}`);
  }
};
ArgumentError.NAME = "ArgumentError";
var ParameterError = class _ParameterError extends TypeError {
  constructor(field, target2 = null, message3) {
    super();
    this.name = _ParameterError.NAME;
    this.field = field;
    if (target2) {
      this.target = target2;
    }
    if (message3) {
      this.message = message3;
    } else {
      this.message = `Absent mandatory parameter '${field}' ${target2 ? ` in '${target2}'` : EMPTY_STRING2}`;
    }
  }
  static assert(...args) {
    let target2 = null;
    let params;
    let fields;
    if (typeof args[0] === "string") {
      target2 = args[0];
      params = args[1];
      fields = args.slice(2);
    } else {
      params = args[0];
      fields = args.slice(1);
    }
    ArgumentError.assert(params, "parameters", "object");
    for (const field of fields) {
      const value = params[field];
      if (value === void 0 || value === null) {
        throw new _ParameterError(field, target2);
      }
    }
  }
  static assertEmpty(value, name, target2) {
    if (value === void 0 || value === null) {
      throw new _ParameterError(name, target2);
    }
  }
};
ParameterError.NAME = "ParameterError";
var AsnError = class _AsnError extends Error {
  static assertSchema(asn1, target2) {
    if (!asn1.verified) {
      throw new Error(`Object's schema was not verified against input data for ${target2}`);
    }
  }
  static assert(asn, target2) {
    if (asn.offset === -1) {
      throw new _AsnError(`Error during parsing of ASN.1 data. Data is not correct for '${target2}'.`);
    }
  }
  constructor(message3) {
    super(message3);
    this.name = "AsnError";
  }
};
var PkiObject = class {
  static blockName() {
    return this.CLASS_NAME;
  }
  static fromBER(raw) {
    const asn1 = fromBER(raw);
    AsnError.assert(asn1, this.name);
    try {
      return new this({ schema: asn1.result });
    } catch (e) {
      throw new AsnError(`Cannot create '${this.CLASS_NAME}' from ASN.1 object`);
    }
  }
  static defaultValues(memberName) {
    throw new Error(`Invalid member name for ${this.CLASS_NAME} class: ${memberName}`);
  }
  static schema(parameters = {}) {
    throw new Error(`Method '${this.CLASS_NAME}.schema' should be overridden`);
  }
  get className() {
    return this.constructor.CLASS_NAME;
  }
  toString(encoding = "hex") {
    let schema;
    try {
      schema = this.toSchema();
    } catch {
      schema = this.toSchema(true);
    }
    return pvtsutils2.Convert.ToString(schema.toBER(), encoding);
  }
};
PkiObject.CLASS_NAME = "PkiObject";
function stringPrep(inputString) {
  let isSpace = false;
  let cutResult = EMPTY_STRING2;
  const result = inputString.trim();
  for (let i = 0; i < result.length; i++) {
    if (result.charCodeAt(i) === 32) {
      if (isSpace === false)
        isSpace = true;
    } else {
      if (isSpace) {
        cutResult += " ";
        isSpace = false;
      }
      cutResult += result[i];
    }
  }
  return cutResult.toLowerCase();
}
var TYPE$5 = "type";
var VALUE$6 = "value";
var AttributeTypeAndValue = class _AttributeTypeAndValue extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.type = getParametersValue(parameters, TYPE$5, _AttributeTypeAndValue.defaultValues(TYPE$5));
    this.value = getParametersValue(parameters, VALUE$6, _AttributeTypeAndValue.defaultValues(VALUE$6));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case TYPE$5:
        return EMPTY_STRING2;
      case VALUE$6:
        return {};
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new ObjectIdentifier({ name: names.type || EMPTY_STRING2 }),
        new Any({ name: names.value || EMPTY_STRING2 })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, [
      TYPE$5,
      "typeValue"
    ]);
    const asn1 = compareSchema(schema, schema, _AttributeTypeAndValue.schema({
      names: {
        type: TYPE$5,
        value: "typeValue"
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.type = asn1.result.type.valueBlock.toString();
    this.value = asn1.result.typeValue;
  }
  toSchema() {
    return new Sequence({
      value: [
        new ObjectIdentifier({ value: this.type }),
        this.value
      ]
    });
  }
  toJSON() {
    const _object = {
      type: this.type
    };
    if (Object.keys(this.value).length !== 0) {
      _object.value = this.value.toJSON();
    } else {
      _object.value = this.value;
    }
    return _object;
  }
  isEqual(compareTo) {
    const stringBlockNames = [
      Utf8String.blockName(),
      BmpString.blockName(),
      UniversalString.blockName(),
      NumericString.blockName(),
      PrintableString.blockName(),
      TeletexString.blockName(),
      VideotexString.blockName(),
      IA5String.blockName(),
      GraphicString.blockName(),
      VisibleString.blockName(),
      GeneralString.blockName(),
      CharacterString.blockName()
    ];
    if (compareTo instanceof ArrayBuffer) {
      return pvtsutils2.BufferSourceConverter.isEqual(this.value.valueBeforeDecodeView, compareTo);
    }
    if (compareTo.constructor.blockName() === _AttributeTypeAndValue.blockName()) {
      if (this.type !== compareTo.type)
        return false;
      const isStringPair = [false, false];
      const thisName = this.value.constructor.blockName();
      for (const name of stringBlockNames) {
        if (thisName === name) {
          isStringPair[0] = true;
        }
        if (compareTo.value.constructor.blockName() === name) {
          isStringPair[1] = true;
        }
      }
      if (isStringPair[0] !== isStringPair[1]) {
        return false;
      }
      const isString = isStringPair[0] && isStringPair[1];
      if (isString) {
        const value1 = stringPrep(this.value.valueBlock.value);
        const value2 = stringPrep(compareTo.value.valueBlock.value);
        if (value1.localeCompare(value2) !== 0)
          return false;
      } else {
        if (!pvtsutils2.BufferSourceConverter.isEqual(this.value.valueBeforeDecodeView, compareTo.value.valueBeforeDecodeView))
          return false;
      }
      return true;
    }
    return false;
  }
};
AttributeTypeAndValue.CLASS_NAME = "AttributeTypeAndValue";
var TYPE_AND_VALUES = "typesAndValues";
var VALUE_BEFORE_DECODE = "valueBeforeDecode";
var RDN = "RDN";
var RelativeDistinguishedNames = class _RelativeDistinguishedNames extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.typesAndValues = getParametersValue(parameters, TYPE_AND_VALUES, _RelativeDistinguishedNames.defaultValues(TYPE_AND_VALUES));
    this.valueBeforeDecode = getParametersValue(parameters, VALUE_BEFORE_DECODE, _RelativeDistinguishedNames.defaultValues(VALUE_BEFORE_DECODE));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case TYPE_AND_VALUES:
        return [];
      case VALUE_BEFORE_DECODE:
        return EMPTY_BUFFER2;
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case TYPE_AND_VALUES:
        return memberValue.length === 0;
      case VALUE_BEFORE_DECODE:
        return memberValue.byteLength === 0;
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new Repeated({
          name: names.repeatedSequence || EMPTY_STRING2,
          value: new Set2({
            value: [
              new Repeated({
                name: names.repeatedSet || EMPTY_STRING2,
                value: AttributeTypeAndValue.schema(names.typeAndValue || {})
              })
            ]
          })
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, [
      RDN,
      TYPE_AND_VALUES
    ]);
    const asn1 = compareSchema(schema, schema, _RelativeDistinguishedNames.schema({
      names: {
        blockName: RDN,
        repeatedSet: TYPE_AND_VALUES
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    if (TYPE_AND_VALUES in asn1.result) {
      this.typesAndValues = Array.from(asn1.result.typesAndValues, (element) => new AttributeTypeAndValue({ schema: element }));
    }
    this.valueBeforeDecode = asn1.result.RDN.valueBeforeDecodeView.slice().buffer;
  }
  toSchema() {
    if (this.valueBeforeDecode.byteLength === 0) {
      return new Sequence({
        value: [new Set2({
          value: Array.from(this.typesAndValues, (o) => o.toSchema())
        })]
      });
    }
    const asn1 = fromBER(this.valueBeforeDecode);
    AsnError.assert(asn1, "RelativeDistinguishedNames");
    if (!(asn1.result instanceof Sequence)) {
      throw new Error("ASN.1 result should be SEQUENCE");
    }
    return asn1.result;
  }
  toJSON() {
    return {
      typesAndValues: Array.from(this.typesAndValues, (o) => o.toJSON())
    };
  }
  isEqual(compareTo) {
    if (compareTo instanceof _RelativeDistinguishedNames) {
      if (this.typesAndValues.length !== compareTo.typesAndValues.length)
        return false;
      for (const [index, typeAndValue] of this.typesAndValues.entries()) {
        if (typeAndValue.isEqual(compareTo.typesAndValues[index]) === false)
          return false;
      }
      return true;
    }
    if (compareTo instanceof ArrayBuffer) {
      return isEqualBuffer(this.valueBeforeDecode, compareTo);
    }
    return false;
  }
};
RelativeDistinguishedNames.CLASS_NAME = "RelativeDistinguishedNames";
var TYPE$4 = "type";
var VALUE$5 = "value";
function builtInStandardAttributes(parameters = {}, optional = false) {
  const names = getParametersValue(parameters, "names", {});
  return new Sequence({
    optional,
    value: [
      new Constructed({
        optional: true,
        idBlock: {
          tagClass: 2,
          tagNumber: 1
        },
        name: names.country_name || EMPTY_STRING2,
        value: [
          new Choice({
            value: [
              new NumericString(),
              new PrintableString()
            ]
          })
        ]
      }),
      new Constructed({
        optional: true,
        idBlock: {
          tagClass: 2,
          tagNumber: 2
        },
        name: names.administration_domain_name || EMPTY_STRING2,
        value: [
          new Choice({
            value: [
              new NumericString(),
              new PrintableString()
            ]
          })
        ]
      }),
      new Primitive({
        optional: true,
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        name: names.network_address || EMPTY_STRING2,
        isHexOnly: true
      }),
      new Primitive({
        optional: true,
        idBlock: {
          tagClass: 3,
          tagNumber: 1
        },
        name: names.terminal_identifier || EMPTY_STRING2,
        isHexOnly: true
      }),
      new Constructed({
        optional: true,
        idBlock: {
          tagClass: 3,
          tagNumber: 2
        },
        name: names.private_domain_name || EMPTY_STRING2,
        value: [
          new Choice({
            value: [
              new NumericString(),
              new PrintableString()
            ]
          })
        ]
      }),
      new Primitive({
        optional: true,
        idBlock: {
          tagClass: 3,
          tagNumber: 3
        },
        name: names.organization_name || EMPTY_STRING2,
        isHexOnly: true
      }),
      new Primitive({
        optional: true,
        name: names.numeric_user_identifier || EMPTY_STRING2,
        idBlock: {
          tagClass: 3,
          tagNumber: 4
        },
        isHexOnly: true
      }),
      new Constructed({
        optional: true,
        name: names.personal_name || EMPTY_STRING2,
        idBlock: {
          tagClass: 3,
          tagNumber: 5
        },
        value: [
          new Primitive({
            idBlock: {
              tagClass: 3,
              tagNumber: 0
            },
            isHexOnly: true
          }),
          new Primitive({
            optional: true,
            idBlock: {
              tagClass: 3,
              tagNumber: 1
            },
            isHexOnly: true
          }),
          new Primitive({
            optional: true,
            idBlock: {
              tagClass: 3,
              tagNumber: 2
            },
            isHexOnly: true
          }),
          new Primitive({
            optional: true,
            idBlock: {
              tagClass: 3,
              tagNumber: 3
            },
            isHexOnly: true
          })
        ]
      }),
      new Constructed({
        optional: true,
        name: names.organizational_unit_names || EMPTY_STRING2,
        idBlock: {
          tagClass: 3,
          tagNumber: 6
        },
        value: [
          new Repeated({
            value: new PrintableString()
          })
        ]
      })
    ]
  });
}
function builtInDomainDefinedAttributes(optional = false) {
  return new Sequence({
    optional,
    value: [
      new PrintableString(),
      new PrintableString()
    ]
  });
}
function extensionAttributes(optional = false) {
  return new Set2({
    optional,
    value: [
      new Primitive({
        optional: true,
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        isHexOnly: true
      }),
      new Constructed({
        optional: true,
        idBlock: {
          tagClass: 3,
          tagNumber: 1
        },
        value: [new Any()]
      })
    ]
  });
}
var GeneralName = class _GeneralName extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.type = getParametersValue(parameters, TYPE$4, _GeneralName.defaultValues(TYPE$4));
    this.value = getParametersValue(parameters, VALUE$5, _GeneralName.defaultValues(VALUE$5));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case TYPE$4:
        return 9;
      case VALUE$5:
        return {};
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case TYPE$4:
        return memberValue === _GeneralName.defaultValues(memberName);
      case VALUE$5:
        return Object.keys(memberValue).length === 0;
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Choice({
      value: [
        new Constructed({
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          name: names.blockName || EMPTY_STRING2,
          value: [
            new ObjectIdentifier(),
            new Constructed({
              idBlock: {
                tagClass: 3,
                tagNumber: 0
              },
              value: [new Any()]
            })
          ]
        }),
        new Primitive({
          name: names.blockName || EMPTY_STRING2,
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          }
        }),
        new Primitive({
          name: names.blockName || EMPTY_STRING2,
          idBlock: {
            tagClass: 3,
            tagNumber: 2
          }
        }),
        new Constructed({
          idBlock: {
            tagClass: 3,
            tagNumber: 3
          },
          name: names.blockName || EMPTY_STRING2,
          value: [
            builtInStandardAttributes(names.builtInStandardAttributes || {}, false),
            builtInDomainDefinedAttributes(true),
            extensionAttributes(true)
          ]
        }),
        new Constructed({
          idBlock: {
            tagClass: 3,
            tagNumber: 4
          },
          name: names.blockName || EMPTY_STRING2,
          value: [RelativeDistinguishedNames.schema(names.directoryName || {})]
        }),
        new Constructed({
          idBlock: {
            tagClass: 3,
            tagNumber: 5
          },
          name: names.blockName || EMPTY_STRING2,
          value: [
            new Constructed({
              optional: true,
              idBlock: {
                tagClass: 3,
                tagNumber: 0
              },
              value: [
                new Choice({
                  value: [
                    new TeletexString(),
                    new PrintableString(),
                    new UniversalString(),
                    new Utf8String(),
                    new BmpString()
                  ]
                })
              ]
            }),
            new Constructed({
              idBlock: {
                tagClass: 3,
                tagNumber: 1
              },
              value: [
                new Choice({
                  value: [
                    new TeletexString(),
                    new PrintableString(),
                    new UniversalString(),
                    new Utf8String(),
                    new BmpString()
                  ]
                })
              ]
            })
          ]
        }),
        new Primitive({
          name: names.blockName || EMPTY_STRING2,
          idBlock: {
            tagClass: 3,
            tagNumber: 6
          }
        }),
        new Primitive({
          name: names.blockName || EMPTY_STRING2,
          idBlock: {
            tagClass: 3,
            tagNumber: 7
          }
        }),
        new Primitive({
          name: names.blockName || EMPTY_STRING2,
          idBlock: {
            tagClass: 3,
            tagNumber: 8
          }
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, [
      "blockName",
      "otherName",
      "rfc822Name",
      "dNSName",
      "x400Address",
      "directoryName",
      "ediPartyName",
      "uniformResourceIdentifier",
      "iPAddress",
      "registeredID"
    ]);
    const asn1 = compareSchema(schema, schema, _GeneralName.schema({
      names: {
        blockName: "blockName",
        otherName: "otherName",
        rfc822Name: "rfc822Name",
        dNSName: "dNSName",
        x400Address: "x400Address",
        directoryName: {
          names: {
            blockName: "directoryName"
          }
        },
        ediPartyName: "ediPartyName",
        uniformResourceIdentifier: "uniformResourceIdentifier",
        iPAddress: "iPAddress",
        registeredID: "registeredID"
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.type = asn1.result.blockName.idBlock.tagNumber;
    switch (this.type) {
      case 0:
        this.value = asn1.result.blockName;
        break;
      case 1:
      case 2:
      case 6:
        {
          const value = asn1.result.blockName;
          value.idBlock.tagClass = 1;
          value.idBlock.tagNumber = 22;
          const valueBER = value.toBER(false);
          const asnValue = fromBER(valueBER);
          AsnError.assert(asnValue, "GeneralName value");
          this.value = asnValue.result.valueBlock.value;
        }
        break;
      case 3:
        this.value = asn1.result.blockName;
        break;
      case 4:
        this.value = new RelativeDistinguishedNames({ schema: asn1.result.directoryName });
        break;
      case 5:
        this.value = asn1.result.ediPartyName;
        break;
      case 7:
        this.value = new OctetString({ valueHex: asn1.result.blockName.valueBlock.valueHex });
        break;
      case 8:
        {
          const value = asn1.result.blockName;
          value.idBlock.tagClass = 1;
          value.idBlock.tagNumber = 6;
          const valueBER = value.toBER(false);
          const asnValue = fromBER(valueBER);
          AsnError.assert(asnValue, "GeneralName registeredID");
          this.value = asnValue.result.valueBlock.toString();
        }
        break;
    }
  }
  toSchema() {
    switch (this.type) {
      case 0:
      case 3:
      case 5:
        return new Constructed({
          idBlock: {
            tagClass: 3,
            tagNumber: this.type
          },
          value: [
            this.value
          ]
        });
      case 1:
      case 2:
      case 6: {
        const value = new IA5String({ value: this.value });
        value.idBlock.tagClass = 3;
        value.idBlock.tagNumber = this.type;
        return value;
      }
      case 4:
        return new Constructed({
          idBlock: {
            tagClass: 3,
            tagNumber: 4
          },
          value: [this.value.toSchema()]
        });
      case 7: {
        const value = this.value;
        value.idBlock.tagClass = 3;
        value.idBlock.tagNumber = this.type;
        return value;
      }
      case 8: {
        const value = new ObjectIdentifier({ value: this.value });
        value.idBlock.tagClass = 3;
        value.idBlock.tagNumber = this.type;
        return value;
      }
      default:
        return _GeneralName.schema();
    }
  }
  toJSON() {
    const _object = {
      type: this.type,
      value: EMPTY_STRING2
    };
    if (typeof this.value === "string")
      _object.value = this.value;
    else {
      try {
        _object.value = this.value.toJSON();
      } catch (ex) {
      }
    }
    return _object;
  }
};
GeneralName.CLASS_NAME = "GeneralName";
var ACCESS_METHOD = "accessMethod";
var ACCESS_LOCATION = "accessLocation";
var CLEAR_PROPS$1v = [
  ACCESS_METHOD,
  ACCESS_LOCATION
];
var AccessDescription = class _AccessDescription extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.accessMethod = getParametersValue(parameters, ACCESS_METHOD, _AccessDescription.defaultValues(ACCESS_METHOD));
    this.accessLocation = getParametersValue(parameters, ACCESS_LOCATION, _AccessDescription.defaultValues(ACCESS_LOCATION));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case ACCESS_METHOD:
        return EMPTY_STRING2;
      case ACCESS_LOCATION:
        return new GeneralName();
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new ObjectIdentifier({ name: names.accessMethod || EMPTY_STRING2 }),
        GeneralName.schema(names.accessLocation || {})
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$1v);
    const asn1 = compareSchema(schema, schema, _AccessDescription.schema({
      names: {
        accessMethod: ACCESS_METHOD,
        accessLocation: {
          names: {
            blockName: ACCESS_LOCATION
          }
        }
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.accessMethod = asn1.result.accessMethod.valueBlock.toString();
    this.accessLocation = new GeneralName({ schema: asn1.result.accessLocation });
  }
  toSchema() {
    return new Sequence({
      value: [
        new ObjectIdentifier({ value: this.accessMethod }),
        this.accessLocation.toSchema()
      ]
    });
  }
  toJSON() {
    return {
      accessMethod: this.accessMethod,
      accessLocation: this.accessLocation.toJSON()
    };
  }
};
AccessDescription.CLASS_NAME = "AccessDescription";
var SECONDS = "seconds";
var MILLIS = "millis";
var MICROS = "micros";
var Accuracy = class _Accuracy extends PkiObject {
  constructor(parameters = {}) {
    super();
    if (SECONDS in parameters) {
      this.seconds = getParametersValue(parameters, SECONDS, _Accuracy.defaultValues(SECONDS));
    }
    if (MILLIS in parameters) {
      this.millis = getParametersValue(parameters, MILLIS, _Accuracy.defaultValues(MILLIS));
    }
    if (MICROS in parameters) {
      this.micros = getParametersValue(parameters, MICROS, _Accuracy.defaultValues(MICROS));
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case SECONDS:
      case MILLIS:
      case MICROS:
        return 0;
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case SECONDS:
      case MILLIS:
      case MICROS:
        return memberValue === _Accuracy.defaultValues(memberName);
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      optional: true,
      value: [
        new Integer({
          optional: true,
          name: names.seconds || EMPTY_STRING2
        }),
        new Primitive({
          name: names.millis || EMPTY_STRING2,
          optional: true,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          }
        }),
        new Primitive({
          name: names.micros || EMPTY_STRING2,
          optional: true,
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          }
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, [
      SECONDS,
      MILLIS,
      MICROS
    ]);
    const asn1 = compareSchema(schema, schema, _Accuracy.schema({
      names: {
        seconds: SECONDS,
        millis: MILLIS,
        micros: MICROS
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    if ("seconds" in asn1.result) {
      this.seconds = asn1.result.seconds.valueBlock.valueDec;
    }
    if ("millis" in asn1.result) {
      const intMillis = new Integer({ valueHex: asn1.result.millis.valueBlock.valueHex });
      this.millis = intMillis.valueBlock.valueDec;
    }
    if ("micros" in asn1.result) {
      const intMicros = new Integer({ valueHex: asn1.result.micros.valueBlock.valueHex });
      this.micros = intMicros.valueBlock.valueDec;
    }
  }
  toSchema() {
    const outputArray = [];
    if (this.seconds !== void 0)
      outputArray.push(new Integer({ value: this.seconds }));
    if (this.millis !== void 0) {
      const intMillis = new Integer({ value: this.millis });
      outputArray.push(new Primitive({
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        valueHex: intMillis.valueBlock.valueHexView
      }));
    }
    if (this.micros !== void 0) {
      const intMicros = new Integer({ value: this.micros });
      outputArray.push(new Primitive({
        idBlock: {
          tagClass: 3,
          tagNumber: 1
        },
        valueHex: intMicros.valueBlock.valueHexView
      }));
    }
    return new Sequence({
      value: outputArray
    });
  }
  toJSON() {
    const _object = {};
    if (this.seconds !== void 0)
      _object.seconds = this.seconds;
    if (this.millis !== void 0)
      _object.millis = this.millis;
    if (this.micros !== void 0)
      _object.micros = this.micros;
    return _object;
  }
};
Accuracy.CLASS_NAME = "Accuracy";
var ALGORITHM_ID = "algorithmId";
var ALGORITHM_PARAMS = "algorithmParams";
var ALGORITHM$2 = "algorithm";
var PARAMS = "params";
var CLEAR_PROPS$1u = [
  ALGORITHM$2,
  PARAMS
];
var AlgorithmIdentifier = class _AlgorithmIdentifier extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.algorithmId = getParametersValue(parameters, ALGORITHM_ID, _AlgorithmIdentifier.defaultValues(ALGORITHM_ID));
    if (ALGORITHM_PARAMS in parameters) {
      this.algorithmParams = getParametersValue(parameters, ALGORITHM_PARAMS, _AlgorithmIdentifier.defaultValues(ALGORITHM_PARAMS));
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case ALGORITHM_ID:
        return EMPTY_STRING2;
      case ALGORITHM_PARAMS:
        return new Any();
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case ALGORITHM_ID:
        return memberValue === EMPTY_STRING2;
      case ALGORITHM_PARAMS:
        return memberValue instanceof Any;
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      optional: names.optional || false,
      value: [
        new ObjectIdentifier({ name: names.algorithmIdentifier || EMPTY_STRING2 }),
        new Any({ name: names.algorithmParams || EMPTY_STRING2, optional: true })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$1u);
    const asn1 = compareSchema(schema, schema, _AlgorithmIdentifier.schema({
      names: {
        algorithmIdentifier: ALGORITHM$2,
        algorithmParams: PARAMS
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.algorithmId = asn1.result.algorithm.valueBlock.toString();
    if (PARAMS in asn1.result) {
      this.algorithmParams = asn1.result.params;
    }
  }
  toSchema() {
    const outputArray = [];
    outputArray.push(new ObjectIdentifier({ value: this.algorithmId }));
    if (this.algorithmParams && !(this.algorithmParams instanceof Any)) {
      outputArray.push(this.algorithmParams);
    }
    return new Sequence({
      value: outputArray
    });
  }
  toJSON() {
    const object = {
      algorithmId: this.algorithmId
    };
    if (this.algorithmParams && !(this.algorithmParams instanceof Any)) {
      object.algorithmParams = this.algorithmParams.toJSON();
    }
    return object;
  }
  isEqual(algorithmIdentifier) {
    if (!(algorithmIdentifier instanceof _AlgorithmIdentifier)) {
      return false;
    }
    if (this.algorithmId !== algorithmIdentifier.algorithmId) {
      return false;
    }
    if (this.algorithmParams) {
      if (algorithmIdentifier.algorithmParams) {
        return JSON.stringify(this.algorithmParams) === JSON.stringify(algorithmIdentifier.algorithmParams);
      }
      return false;
    }
    if (algorithmIdentifier.algorithmParams) {
      return false;
    }
    return true;
  }
};
AlgorithmIdentifier.CLASS_NAME = "AlgorithmIdentifier";
var ALT_NAMES = "altNames";
var CLEAR_PROPS$1t = [
  ALT_NAMES
];
var AltName = class _AltName extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.altNames = getParametersValue(parameters, ALT_NAMES, _AltName.defaultValues(ALT_NAMES));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case ALT_NAMES:
        return [];
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new Repeated({
          name: names.altNames || EMPTY_STRING2,
          value: GeneralName.schema()
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$1t);
    const asn1 = compareSchema(schema, schema, _AltName.schema({
      names: {
        altNames: ALT_NAMES
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    if (ALT_NAMES in asn1.result) {
      this.altNames = Array.from(asn1.result.altNames, (element) => new GeneralName({ schema: element }));
    }
  }
  toSchema() {
    return new Sequence({
      value: Array.from(this.altNames, (o) => o.toSchema())
    });
  }
  toJSON() {
    return {
      altNames: Array.from(this.altNames, (o) => o.toJSON())
    };
  }
};
AltName.CLASS_NAME = "AltName";
var TYPE$3 = "type";
var VALUES$1 = "values";
var CLEAR_PROPS$1s = [
  TYPE$3,
  VALUES$1
];
var Attribute = class _Attribute extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.type = getParametersValue(parameters, TYPE$3, _Attribute.defaultValues(TYPE$3));
    this.values = getParametersValue(parameters, VALUES$1, _Attribute.defaultValues(VALUES$1));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case TYPE$3:
        return EMPTY_STRING2;
      case VALUES$1:
        return [];
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case TYPE$3:
        return memberValue === EMPTY_STRING2;
      case VALUES$1:
        return memberValue.length === 0;
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new ObjectIdentifier({ name: names.type || EMPTY_STRING2 }),
        new Set2({
          name: names.setName || EMPTY_STRING2,
          value: [
            new Repeated({
              name: names.values || EMPTY_STRING2,
              value: new Any()
            })
          ]
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$1s);
    const asn1 = compareSchema(schema, schema, _Attribute.schema({
      names: {
        type: TYPE$3,
        values: VALUES$1
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.type = asn1.result.type.valueBlock.toString();
    this.values = asn1.result.values;
  }
  toSchema() {
    return new Sequence({
      value: [
        new ObjectIdentifier({ value: this.type }),
        new Set2({
          value: this.values
        })
      ]
    });
  }
  toJSON() {
    return {
      type: this.type,
      values: Array.from(this.values, (o) => o.toJSON())
    };
  }
};
Attribute.CLASS_NAME = "Attribute";
var NOT_BEFORE_TIME = "notBeforeTime";
var NOT_AFTER_TIME = "notAfterTime";
var CLEAR_PROPS$1r = [
  NOT_BEFORE_TIME,
  NOT_AFTER_TIME
];
var AttCertValidityPeriod = class _AttCertValidityPeriod extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.notBeforeTime = getParametersValue(parameters, NOT_BEFORE_TIME, _AttCertValidityPeriod.defaultValues(NOT_BEFORE_TIME));
    this.notAfterTime = getParametersValue(parameters, NOT_AFTER_TIME, _AttCertValidityPeriod.defaultValues(NOT_AFTER_TIME));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case NOT_BEFORE_TIME:
      case NOT_AFTER_TIME:
        return new Date(0, 0, 0);
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new GeneralizedTime({ name: names.notBeforeTime || EMPTY_STRING2 }),
        new GeneralizedTime({ name: names.notAfterTime || EMPTY_STRING2 })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$1r);
    const asn1 = compareSchema(schema, schema, _AttCertValidityPeriod.schema({
      names: {
        notBeforeTime: NOT_BEFORE_TIME,
        notAfterTime: NOT_AFTER_TIME
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.notBeforeTime = asn1.result.notBeforeTime.toDate();
    this.notAfterTime = asn1.result.notAfterTime.toDate();
  }
  toSchema() {
    return new Sequence({
      value: [
        new GeneralizedTime({ valueDate: this.notBeforeTime }),
        new GeneralizedTime({ valueDate: this.notAfterTime })
      ]
    });
  }
  toJSON() {
    return {
      notBeforeTime: this.notBeforeTime,
      notAfterTime: this.notAfterTime
    };
  }
};
AttCertValidityPeriod.CLASS_NAME = "AttCertValidityPeriod";
var NAMES = "names";
var GENERAL_NAMES = "generalNames";
var GeneralNames = class _GeneralNames extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.names = getParametersValue(parameters, NAMES, _GeneralNames.defaultValues(NAMES));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case "names":
        return [];
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}, optional = false) {
    const names = getParametersValue(parameters, NAMES, {});
    return new Sequence({
      optional,
      name: names.blockName || EMPTY_STRING2,
      value: [
        new Repeated({
          name: names.generalNames || EMPTY_STRING2,
          value: GeneralName.schema()
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, [
      NAMES,
      GENERAL_NAMES
    ]);
    const asn1 = compareSchema(schema, schema, _GeneralNames.schema({
      names: {
        blockName: NAMES,
        generalNames: GENERAL_NAMES
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.names = Array.from(asn1.result.generalNames, (element) => new GeneralName({ schema: element }));
  }
  toSchema() {
    return new Sequence({
      value: Array.from(this.names, (o) => o.toSchema())
    });
  }
  toJSON() {
    return {
      names: Array.from(this.names, (o) => o.toJSON())
    };
  }
};
GeneralNames.CLASS_NAME = "GeneralNames";
var id_SubjectDirectoryAttributes = "2.5.29.9";
var id_SubjectKeyIdentifier = "2.5.29.14";
var id_KeyUsage = "2.5.29.15";
var id_PrivateKeyUsagePeriod = "2.5.29.16";
var id_SubjectAltName = "2.5.29.17";
var id_IssuerAltName = "2.5.29.18";
var id_BasicConstraints = "2.5.29.19";
var id_CRLNumber = "2.5.29.20";
var id_BaseCRLNumber = "2.5.29.27";
var id_CRLReason = "2.5.29.21";
var id_InvalidityDate = "2.5.29.24";
var id_IssuingDistributionPoint = "2.5.29.28";
var id_CertificateIssuer = "2.5.29.29";
var id_NameConstraints = "2.5.29.30";
var id_CRLDistributionPoints = "2.5.29.31";
var id_FreshestCRL = "2.5.29.46";
var id_CertificatePolicies = "2.5.29.32";
var id_AnyPolicy = "2.5.29.32.0";
var id_MicrosoftAppPolicies = "1.3.6.1.4.1.311.21.10";
var id_PolicyMappings = "2.5.29.33";
var id_AuthorityKeyIdentifier = "2.5.29.35";
var id_PolicyConstraints = "2.5.29.36";
var id_ExtKeyUsage = "2.5.29.37";
var id_InhibitAnyPolicy = "2.5.29.54";
var id_AuthorityInfoAccess = "1.3.6.1.5.5.7.1.1";
var id_SubjectInfoAccess = "1.3.6.1.5.5.7.1.11";
var id_SignedCertificateTimestampList = "1.3.6.1.4.1.11129.2.4.2";
var id_MicrosoftCertTemplateV1 = "1.3.6.1.4.1.311.20.2";
var id_MicrosoftPrevCaCertHash = "1.3.6.1.4.1.311.21.2";
var id_MicrosoftCertTemplateV2 = "1.3.6.1.4.1.311.21.7";
var id_MicrosoftCaVersion = "1.3.6.1.4.1.311.21.1";
var id_QCStatements = "1.3.6.1.5.5.7.1.3";
var id_ContentType_Data = "1.2.840.113549.1.7.1";
var id_ContentType_SignedData = "1.2.840.113549.1.7.2";
var id_ContentType_EnvelopedData = "1.2.840.113549.1.7.3";
var id_ContentType_EncryptedData = "1.2.840.113549.1.7.6";
var id_eContentType_TSTInfo = "1.2.840.113549.1.9.16.1.4";
var id_CertBag_X509Certificate = "1.2.840.113549.1.9.22.1";
var id_CertBag_SDSICertificate = "1.2.840.113549.1.9.22.2";
var id_CertBag_AttributeCertificate = "1.2.840.113549.1.9.22.3";
var id_CRLBag_X509CRL = "1.2.840.113549.1.9.23.1";
var id_pkix = "1.3.6.1.5.5.7";
var id_ad = `${id_pkix}.48`;
var id_PKIX_OCSP_Basic = `${id_ad}.1.1`;
var id_ad_caIssuers = `${id_ad}.2`;
var id_ad_ocsp = `${id_ad}.1`;
var id_sha1 = "1.3.14.3.2.26";
var id_sha256 = "2.16.840.1.101.3.4.2.1";
var id_sha384 = "2.16.840.1.101.3.4.2.2";
var id_sha512 = "2.16.840.1.101.3.4.2.3";
var KEY_IDENTIFIER$1 = "keyIdentifier";
var AUTHORITY_CERT_ISSUER = "authorityCertIssuer";
var AUTHORITY_CERT_SERIAL_NUMBER = "authorityCertSerialNumber";
var CLEAR_PROPS$1q = [
  KEY_IDENTIFIER$1,
  AUTHORITY_CERT_ISSUER,
  AUTHORITY_CERT_SERIAL_NUMBER
];
var AuthorityKeyIdentifier = class _AuthorityKeyIdentifier extends PkiObject {
  constructor(parameters = {}) {
    super();
    if (KEY_IDENTIFIER$1 in parameters) {
      this.keyIdentifier = getParametersValue(parameters, KEY_IDENTIFIER$1, _AuthorityKeyIdentifier.defaultValues(KEY_IDENTIFIER$1));
    }
    if (AUTHORITY_CERT_ISSUER in parameters) {
      this.authorityCertIssuer = getParametersValue(parameters, AUTHORITY_CERT_ISSUER, _AuthorityKeyIdentifier.defaultValues(AUTHORITY_CERT_ISSUER));
    }
    if (AUTHORITY_CERT_SERIAL_NUMBER in parameters) {
      this.authorityCertSerialNumber = getParametersValue(parameters, AUTHORITY_CERT_SERIAL_NUMBER, _AuthorityKeyIdentifier.defaultValues(AUTHORITY_CERT_SERIAL_NUMBER));
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case KEY_IDENTIFIER$1:
        return new OctetString();
      case AUTHORITY_CERT_ISSUER:
        return [];
      case AUTHORITY_CERT_SERIAL_NUMBER:
        return new Integer();
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new Primitive({
          name: names.keyIdentifier || EMPTY_STRING2,
          optional: true,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          }
        }),
        new Constructed({
          optional: true,
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          },
          value: [
            new Repeated({
              name: names.authorityCertIssuer || EMPTY_STRING2,
              value: GeneralName.schema()
            })
          ]
        }),
        new Primitive({
          name: names.authorityCertSerialNumber || EMPTY_STRING2,
          optional: true,
          idBlock: {
            tagClass: 3,
            tagNumber: 2
          }
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$1q);
    const asn1 = compareSchema(schema, schema, _AuthorityKeyIdentifier.schema({
      names: {
        keyIdentifier: KEY_IDENTIFIER$1,
        authorityCertIssuer: AUTHORITY_CERT_ISSUER,
        authorityCertSerialNumber: AUTHORITY_CERT_SERIAL_NUMBER
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    if (KEY_IDENTIFIER$1 in asn1.result)
      this.keyIdentifier = new OctetString({ valueHex: asn1.result.keyIdentifier.valueBlock.valueHex });
    if (AUTHORITY_CERT_ISSUER in asn1.result)
      this.authorityCertIssuer = Array.from(asn1.result.authorityCertIssuer, (o) => new GeneralName({ schema: o }));
    if (AUTHORITY_CERT_SERIAL_NUMBER in asn1.result)
      this.authorityCertSerialNumber = new Integer({ valueHex: asn1.result.authorityCertSerialNumber.valueBlock.valueHex });
  }
  toSchema() {
    const outputArray = [];
    if (this.keyIdentifier) {
      outputArray.push(new Primitive({
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        valueHex: this.keyIdentifier.valueBlock.valueHexView
      }));
    }
    if (this.authorityCertIssuer) {
      outputArray.push(new Constructed({
        idBlock: {
          tagClass: 3,
          tagNumber: 1
        },
        value: Array.from(this.authorityCertIssuer, (o) => o.toSchema())
      }));
    }
    if (this.authorityCertSerialNumber) {
      outputArray.push(new Primitive({
        idBlock: {
          tagClass: 3,
          tagNumber: 2
        },
        valueHex: this.authorityCertSerialNumber.valueBlock.valueHexView
      }));
    }
    return new Sequence({
      value: outputArray
    });
  }
  toJSON() {
    const object = {};
    if (this.keyIdentifier) {
      object.keyIdentifier = this.keyIdentifier.toJSON();
    }
    if (this.authorityCertIssuer) {
      object.authorityCertIssuer = Array.from(this.authorityCertIssuer, (o) => o.toJSON());
    }
    if (this.authorityCertSerialNumber) {
      object.authorityCertSerialNumber = this.authorityCertSerialNumber.toJSON();
    }
    return object;
  }
};
AuthorityKeyIdentifier.CLASS_NAME = "AuthorityKeyIdentifier";
var PATH_LENGTH_CONSTRAINT = "pathLenConstraint";
var CA = "cA";
var BasicConstraints = class _BasicConstraints extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.cA = getParametersValue(parameters, CA, false);
    if (PATH_LENGTH_CONSTRAINT in parameters) {
      this.pathLenConstraint = getParametersValue(parameters, PATH_LENGTH_CONSTRAINT, 0);
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case CA:
        return false;
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new Boolean2({
          optional: true,
          name: names.cA || EMPTY_STRING2
        }),
        new Integer({
          optional: true,
          name: names.pathLenConstraint || EMPTY_STRING2
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, [
      CA,
      PATH_LENGTH_CONSTRAINT
    ]);
    const asn1 = compareSchema(schema, schema, _BasicConstraints.schema({
      names: {
        cA: CA,
        pathLenConstraint: PATH_LENGTH_CONSTRAINT
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    if (CA in asn1.result) {
      this.cA = asn1.result.cA.valueBlock.value;
    }
    if (PATH_LENGTH_CONSTRAINT in asn1.result) {
      if (asn1.result.pathLenConstraint.valueBlock.isHexOnly) {
        this.pathLenConstraint = asn1.result.pathLenConstraint;
      } else {
        this.pathLenConstraint = asn1.result.pathLenConstraint.valueBlock.valueDec;
      }
    }
  }
  toSchema() {
    const outputArray = [];
    if (this.cA !== _BasicConstraints.defaultValues(CA))
      outputArray.push(new Boolean2({ value: this.cA }));
    if (PATH_LENGTH_CONSTRAINT in this) {
      if (this.pathLenConstraint instanceof Integer) {
        outputArray.push(this.pathLenConstraint);
      } else {
        outputArray.push(new Integer({ value: this.pathLenConstraint }));
      }
    }
    return new Sequence({
      value: outputArray
    });
  }
  toJSON() {
    const object = {};
    if (this.cA !== _BasicConstraints.defaultValues(CA)) {
      object.cA = this.cA;
    }
    if (PATH_LENGTH_CONSTRAINT in this) {
      if (this.pathLenConstraint instanceof Integer) {
        object.pathLenConstraint = this.pathLenConstraint.toJSON();
      } else {
        object.pathLenConstraint = this.pathLenConstraint;
      }
    }
    return object;
  }
};
BasicConstraints.CLASS_NAME = "BasicConstraints";
var CERTIFICATE_INDEX = "certificateIndex";
var KEY_INDEX = "keyIndex";
var CAVersion = class _CAVersion extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.certificateIndex = getParametersValue(parameters, CERTIFICATE_INDEX, _CAVersion.defaultValues(CERTIFICATE_INDEX));
    this.keyIndex = getParametersValue(parameters, KEY_INDEX, _CAVersion.defaultValues(KEY_INDEX));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case CERTIFICATE_INDEX:
      case KEY_INDEX:
        return 0;
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema() {
    return new Integer();
  }
  fromSchema(schema) {
    if (schema.constructor.blockName() !== Integer.blockName()) {
      throw new Error("Object's schema was not verified against input data for CAVersion");
    }
    let value = schema.valueBlock.valueHex.slice(0);
    const valueView = new Uint8Array(value);
    switch (true) {
      case value.byteLength < 4:
        {
          const tempValue = new ArrayBuffer(4);
          const tempValueView = new Uint8Array(tempValue);
          tempValueView.set(valueView, 4 - value.byteLength);
          value = tempValue.slice(0);
        }
        break;
      case value.byteLength > 4:
        {
          const tempValue = new ArrayBuffer(4);
          const tempValueView = new Uint8Array(tempValue);
          tempValueView.set(valueView.slice(0, 4));
          value = tempValue.slice(0);
        }
        break;
    }
    const keyIndexBuffer = value.slice(0, 2);
    const keyIndexView8 = new Uint8Array(keyIndexBuffer);
    let temp = keyIndexView8[0];
    keyIndexView8[0] = keyIndexView8[1];
    keyIndexView8[1] = temp;
    const keyIndexView16 = new Uint16Array(keyIndexBuffer);
    this.keyIndex = keyIndexView16[0];
    const certificateIndexBuffer = value.slice(2);
    const certificateIndexView8 = new Uint8Array(certificateIndexBuffer);
    temp = certificateIndexView8[0];
    certificateIndexView8[0] = certificateIndexView8[1];
    certificateIndexView8[1] = temp;
    const certificateIndexView16 = new Uint16Array(certificateIndexBuffer);
    this.certificateIndex = certificateIndexView16[0];
  }
  toSchema() {
    const certificateIndexBuffer = new ArrayBuffer(2);
    const certificateIndexView = new Uint16Array(certificateIndexBuffer);
    certificateIndexView[0] = this.certificateIndex;
    const certificateIndexView8 = new Uint8Array(certificateIndexBuffer);
    let temp = certificateIndexView8[0];
    certificateIndexView8[0] = certificateIndexView8[1];
    certificateIndexView8[1] = temp;
    const keyIndexBuffer = new ArrayBuffer(2);
    const keyIndexView = new Uint16Array(keyIndexBuffer);
    keyIndexView[0] = this.keyIndex;
    const keyIndexView8 = new Uint8Array(keyIndexBuffer);
    temp = keyIndexView8[0];
    keyIndexView8[0] = keyIndexView8[1];
    keyIndexView8[1] = temp;
    return new Integer({
      valueHex: utilConcatBuf(keyIndexBuffer, certificateIndexBuffer)
    });
  }
  toJSON() {
    return {
      certificateIndex: this.certificateIndex,
      keyIndex: this.keyIndex
    };
  }
};
CAVersion.CLASS_NAME = "CAVersion";
var POLICY_QUALIFIER_ID = "policyQualifierId";
var QUALIFIER = "qualifier";
var CLEAR_PROPS$1p = [
  POLICY_QUALIFIER_ID,
  QUALIFIER
];
var PolicyQualifierInfo = class _PolicyQualifierInfo extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.policyQualifierId = getParametersValue(parameters, POLICY_QUALIFIER_ID, _PolicyQualifierInfo.defaultValues(POLICY_QUALIFIER_ID));
    this.qualifier = getParametersValue(parameters, QUALIFIER, _PolicyQualifierInfo.defaultValues(QUALIFIER));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case POLICY_QUALIFIER_ID:
        return EMPTY_STRING2;
      case QUALIFIER:
        return new Any();
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new ObjectIdentifier({ name: names.policyQualifierId || EMPTY_STRING2 }),
        new Any({ name: names.qualifier || EMPTY_STRING2 })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$1p);
    const asn1 = compareSchema(schema, schema, _PolicyQualifierInfo.schema({
      names: {
        policyQualifierId: POLICY_QUALIFIER_ID,
        qualifier: QUALIFIER
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.policyQualifierId = asn1.result.policyQualifierId.valueBlock.toString();
    this.qualifier = asn1.result.qualifier;
  }
  toSchema() {
    return new Sequence({
      value: [
        new ObjectIdentifier({ value: this.policyQualifierId }),
        this.qualifier
      ]
    });
  }
  toJSON() {
    return {
      policyQualifierId: this.policyQualifierId,
      qualifier: this.qualifier.toJSON()
    };
  }
};
PolicyQualifierInfo.CLASS_NAME = "PolicyQualifierInfo";
var POLICY_IDENTIFIER = "policyIdentifier";
var POLICY_QUALIFIERS = "policyQualifiers";
var CLEAR_PROPS$1o = [
  POLICY_IDENTIFIER,
  POLICY_QUALIFIERS
];
var PolicyInformation = class _PolicyInformation extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.policyIdentifier = getParametersValue(parameters, POLICY_IDENTIFIER, _PolicyInformation.defaultValues(POLICY_IDENTIFIER));
    if (POLICY_QUALIFIERS in parameters) {
      this.policyQualifiers = getParametersValue(parameters, POLICY_QUALIFIERS, _PolicyInformation.defaultValues(POLICY_QUALIFIERS));
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case POLICY_IDENTIFIER:
        return EMPTY_STRING2;
      case POLICY_QUALIFIERS:
        return [];
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new ObjectIdentifier({ name: names.policyIdentifier || EMPTY_STRING2 }),
        new Sequence({
          optional: true,
          value: [
            new Repeated({
              name: names.policyQualifiers || EMPTY_STRING2,
              value: PolicyQualifierInfo.schema()
            })
          ]
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$1o);
    const asn1 = compareSchema(schema, schema, _PolicyInformation.schema({
      names: {
        policyIdentifier: POLICY_IDENTIFIER,
        policyQualifiers: POLICY_QUALIFIERS
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.policyIdentifier = asn1.result.policyIdentifier.valueBlock.toString();
    if (POLICY_QUALIFIERS in asn1.result) {
      this.policyQualifiers = Array.from(asn1.result.policyQualifiers, (element) => new PolicyQualifierInfo({ schema: element }));
    }
  }
  toSchema() {
    const outputArray = [];
    outputArray.push(new ObjectIdentifier({ value: this.policyIdentifier }));
    if (this.policyQualifiers) {
      outputArray.push(new Sequence({
        value: Array.from(this.policyQualifiers, (o) => o.toSchema())
      }));
    }
    return new Sequence({
      value: outputArray
    });
  }
  toJSON() {
    const res = {
      policyIdentifier: this.policyIdentifier
    };
    if (this.policyQualifiers)
      res.policyQualifiers = Array.from(this.policyQualifiers, (o) => o.toJSON());
    return res;
  }
};
PolicyInformation.CLASS_NAME = "PolicyInformation";
var CERTIFICATE_POLICIES = "certificatePolicies";
var CLEAR_PROPS$1n = [
  CERTIFICATE_POLICIES
];
var CertificatePolicies = class _CertificatePolicies extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.certificatePolicies = getParametersValue(parameters, CERTIFICATE_POLICIES, _CertificatePolicies.defaultValues(CERTIFICATE_POLICIES));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case CERTIFICATE_POLICIES:
        return [];
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new Repeated({
          name: names.certificatePolicies || EMPTY_STRING2,
          value: PolicyInformation.schema()
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$1n);
    const asn1 = compareSchema(schema, schema, _CertificatePolicies.schema({
      names: {
        certificatePolicies: CERTIFICATE_POLICIES
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.certificatePolicies = Array.from(asn1.result.certificatePolicies, (element) => new PolicyInformation({ schema: element }));
  }
  toSchema() {
    return new Sequence({
      value: Array.from(this.certificatePolicies, (o) => o.toSchema())
    });
  }
  toJSON() {
    return {
      certificatePolicies: Array.from(this.certificatePolicies, (o) => o.toJSON())
    };
  }
};
CertificatePolicies.CLASS_NAME = "CertificatePolicies";
var TEMPLATE_ID = "templateID";
var TEMPLATE_MAJOR_VERSION = "templateMajorVersion";
var TEMPLATE_MINOR_VERSION = "templateMinorVersion";
var CLEAR_PROPS$1m = [
  TEMPLATE_ID,
  TEMPLATE_MAJOR_VERSION,
  TEMPLATE_MINOR_VERSION
];
var CertificateTemplate = class _CertificateTemplate extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.templateID = getParametersValue(parameters, TEMPLATE_ID, _CertificateTemplate.defaultValues(TEMPLATE_ID));
    if (TEMPLATE_MAJOR_VERSION in parameters) {
      this.templateMajorVersion = getParametersValue(parameters, TEMPLATE_MAJOR_VERSION, _CertificateTemplate.defaultValues(TEMPLATE_MAJOR_VERSION));
    }
    if (TEMPLATE_MINOR_VERSION in parameters) {
      this.templateMinorVersion = getParametersValue(parameters, TEMPLATE_MINOR_VERSION, _CertificateTemplate.defaultValues(TEMPLATE_MINOR_VERSION));
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case TEMPLATE_ID:
        return EMPTY_STRING2;
      case TEMPLATE_MAJOR_VERSION:
      case TEMPLATE_MINOR_VERSION:
        return 0;
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new ObjectIdentifier({ name: names.templateID || EMPTY_STRING2 }),
        new Integer({
          name: names.templateMajorVersion || EMPTY_STRING2,
          optional: true
        }),
        new Integer({
          name: names.templateMinorVersion || EMPTY_STRING2,
          optional: true
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$1m);
    const asn1 = compareSchema(schema, schema, _CertificateTemplate.schema({
      names: {
        templateID: TEMPLATE_ID,
        templateMajorVersion: TEMPLATE_MAJOR_VERSION,
        templateMinorVersion: TEMPLATE_MINOR_VERSION
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.templateID = asn1.result.templateID.valueBlock.toString();
    if (TEMPLATE_MAJOR_VERSION in asn1.result) {
      this.templateMajorVersion = asn1.result.templateMajorVersion.valueBlock.valueDec;
    }
    if (TEMPLATE_MINOR_VERSION in asn1.result) {
      this.templateMinorVersion = asn1.result.templateMinorVersion.valueBlock.valueDec;
    }
  }
  toSchema() {
    const outputArray = [];
    outputArray.push(new ObjectIdentifier({ value: this.templateID }));
    if (TEMPLATE_MAJOR_VERSION in this) {
      outputArray.push(new Integer({ value: this.templateMajorVersion }));
    }
    if (TEMPLATE_MINOR_VERSION in this) {
      outputArray.push(new Integer({ value: this.templateMinorVersion }));
    }
    return new Sequence({
      value: outputArray
    });
  }
  toJSON() {
    const res = {
      templateID: this.templateID
    };
    if (TEMPLATE_MAJOR_VERSION in this)
      res.templateMajorVersion = this.templateMajorVersion;
    if (TEMPLATE_MINOR_VERSION in this)
      res.templateMinorVersion = this.templateMinorVersion;
    return res;
  }
};
var DISTRIBUTION_POINT$1 = "distributionPoint";
var DISTRIBUTION_POINT_NAMES$1 = "distributionPointNames";
var REASONS = "reasons";
var CRL_ISSUER = "cRLIssuer";
var CRL_ISSUER_NAMES = "cRLIssuerNames";
var CLEAR_PROPS$1l = [
  DISTRIBUTION_POINT$1,
  DISTRIBUTION_POINT_NAMES$1,
  REASONS,
  CRL_ISSUER,
  CRL_ISSUER_NAMES
];
var DistributionPoint = class _DistributionPoint extends PkiObject {
  constructor(parameters = {}) {
    super();
    if (DISTRIBUTION_POINT$1 in parameters) {
      this.distributionPoint = getParametersValue(parameters, DISTRIBUTION_POINT$1, _DistributionPoint.defaultValues(DISTRIBUTION_POINT$1));
    }
    if (REASONS in parameters) {
      this.reasons = getParametersValue(parameters, REASONS, _DistributionPoint.defaultValues(REASONS));
    }
    if (CRL_ISSUER in parameters) {
      this.cRLIssuer = getParametersValue(parameters, CRL_ISSUER, _DistributionPoint.defaultValues(CRL_ISSUER));
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case DISTRIBUTION_POINT$1:
        return [];
      case REASONS:
        return new BitString();
      case CRL_ISSUER:
        return [];
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new Constructed({
          optional: true,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [
            new Choice({
              value: [
                new Constructed({
                  name: names.distributionPoint || EMPTY_STRING2,
                  optional: true,
                  idBlock: {
                    tagClass: 3,
                    tagNumber: 0
                  },
                  value: [
                    new Repeated({
                      name: names.distributionPointNames || EMPTY_STRING2,
                      value: GeneralName.schema()
                    })
                  ]
                }),
                new Constructed({
                  name: names.distributionPoint || EMPTY_STRING2,
                  optional: true,
                  idBlock: {
                    tagClass: 3,
                    tagNumber: 1
                  },
                  value: RelativeDistinguishedNames.schema().valueBlock.value
                })
              ]
            })
          ]
        }),
        new Primitive({
          name: names.reasons || EMPTY_STRING2,
          optional: true,
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          }
        }),
        new Constructed({
          name: names.cRLIssuer || EMPTY_STRING2,
          optional: true,
          idBlock: {
            tagClass: 3,
            tagNumber: 2
          },
          value: [
            new Repeated({
              name: names.cRLIssuerNames || EMPTY_STRING2,
              value: GeneralName.schema()
            })
          ]
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$1l);
    const asn1 = compareSchema(schema, schema, _DistributionPoint.schema({
      names: {
        distributionPoint: DISTRIBUTION_POINT$1,
        distributionPointNames: DISTRIBUTION_POINT_NAMES$1,
        reasons: REASONS,
        cRLIssuer: CRL_ISSUER,
        cRLIssuerNames: CRL_ISSUER_NAMES
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    if (DISTRIBUTION_POINT$1 in asn1.result) {
      if (asn1.result.distributionPoint.idBlock.tagNumber === 0) {
        this.distributionPoint = Array.from(asn1.result.distributionPointNames, (element) => new GeneralName({ schema: element }));
      }
      if (asn1.result.distributionPoint.idBlock.tagNumber === 1) {
        this.distributionPoint = new RelativeDistinguishedNames({
          schema: new Sequence({
            value: asn1.result.distributionPoint.valueBlock.value
          })
        });
      }
    }
    if (REASONS in asn1.result) {
      this.reasons = new BitString({ valueHex: asn1.result.reasons.valueBlock.valueHex });
    }
    if (CRL_ISSUER in asn1.result) {
      this.cRLIssuer = Array.from(asn1.result.cRLIssuerNames, (element) => new GeneralName({ schema: element }));
    }
  }
  toSchema() {
    const outputArray = [];
    if (this.distributionPoint) {
      let internalValue;
      if (this.distributionPoint instanceof Array) {
        internalValue = new Constructed({
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: Array.from(this.distributionPoint, (o) => o.toSchema())
        });
      } else {
        internalValue = new Constructed({
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          },
          value: [this.distributionPoint.toSchema()]
        });
      }
      outputArray.push(new Constructed({
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        value: [internalValue]
      }));
    }
    if (this.reasons) {
      outputArray.push(new Primitive({
        idBlock: {
          tagClass: 3,
          tagNumber: 1
        },
        valueHex: this.reasons.valueBlock.valueHexView
      }));
    }
    if (this.cRLIssuer) {
      outputArray.push(new Constructed({
        idBlock: {
          tagClass: 3,
          tagNumber: 2
        },
        value: Array.from(this.cRLIssuer, (o) => o.toSchema())
      }));
    }
    return new Sequence({
      value: outputArray
    });
  }
  toJSON() {
    const object = {};
    if (this.distributionPoint) {
      if (this.distributionPoint instanceof Array) {
        object.distributionPoint = Array.from(this.distributionPoint, (o) => o.toJSON());
      } else {
        object.distributionPoint = this.distributionPoint.toJSON();
      }
    }
    if (this.reasons) {
      object.reasons = this.reasons.toJSON();
    }
    if (this.cRLIssuer) {
      object.cRLIssuer = Array.from(this.cRLIssuer, (o) => o.toJSON());
    }
    return object;
  }
};
DistributionPoint.CLASS_NAME = "DistributionPoint";
var DISTRIBUTION_POINTS = "distributionPoints";
var CLEAR_PROPS$1k = [
  DISTRIBUTION_POINTS
];
var CRLDistributionPoints = class _CRLDistributionPoints extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.distributionPoints = getParametersValue(parameters, DISTRIBUTION_POINTS, _CRLDistributionPoints.defaultValues(DISTRIBUTION_POINTS));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case DISTRIBUTION_POINTS:
        return [];
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new Repeated({
          name: names.distributionPoints || EMPTY_STRING2,
          value: DistributionPoint.schema()
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$1k);
    const asn1 = compareSchema(schema, schema, _CRLDistributionPoints.schema({
      names: {
        distributionPoints: DISTRIBUTION_POINTS
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.distributionPoints = Array.from(asn1.result.distributionPoints, (element) => new DistributionPoint({ schema: element }));
  }
  toSchema() {
    return new Sequence({
      value: Array.from(this.distributionPoints, (o) => o.toSchema())
    });
  }
  toJSON() {
    return {
      distributionPoints: Array.from(this.distributionPoints, (o) => o.toJSON())
    };
  }
};
CRLDistributionPoints.CLASS_NAME = "CRLDistributionPoints";
var KEY_PURPOSES = "keyPurposes";
var CLEAR_PROPS$1j = [
  KEY_PURPOSES
];
var ExtKeyUsage = class _ExtKeyUsage extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.keyPurposes = getParametersValue(parameters, KEY_PURPOSES, _ExtKeyUsage.defaultValues(KEY_PURPOSES));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case KEY_PURPOSES:
        return [];
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new Repeated({
          name: names.keyPurposes || EMPTY_STRING2,
          value: new ObjectIdentifier()
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$1j);
    const asn1 = compareSchema(schema, schema, _ExtKeyUsage.schema({
      names: {
        keyPurposes: KEY_PURPOSES
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.keyPurposes = Array.from(asn1.result.keyPurposes, (element) => element.valueBlock.toString());
  }
  toSchema() {
    return new Sequence({
      value: Array.from(this.keyPurposes, (element) => new ObjectIdentifier({ value: element }))
    });
  }
  toJSON() {
    return {
      keyPurposes: Array.from(this.keyPurposes)
    };
  }
};
ExtKeyUsage.CLASS_NAME = "ExtKeyUsage";
var ACCESS_DESCRIPTIONS = "accessDescriptions";
var InfoAccess = class _InfoAccess extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.accessDescriptions = getParametersValue(parameters, ACCESS_DESCRIPTIONS, _InfoAccess.defaultValues(ACCESS_DESCRIPTIONS));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case ACCESS_DESCRIPTIONS:
        return [];
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new Repeated({
          name: names.accessDescriptions || EMPTY_STRING2,
          value: AccessDescription.schema()
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, [
      ACCESS_DESCRIPTIONS
    ]);
    const asn1 = compareSchema(schema, schema, _InfoAccess.schema({
      names: {
        accessDescriptions: ACCESS_DESCRIPTIONS
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.accessDescriptions = Array.from(asn1.result.accessDescriptions, (element) => new AccessDescription({ schema: element }));
  }
  toSchema() {
    return new Sequence({
      value: Array.from(this.accessDescriptions, (o) => o.toSchema())
    });
  }
  toJSON() {
    return {
      accessDescriptions: Array.from(this.accessDescriptions, (o) => o.toJSON())
    };
  }
};
InfoAccess.CLASS_NAME = "InfoAccess";
var DISTRIBUTION_POINT = "distributionPoint";
var DISTRIBUTION_POINT_NAMES = "distributionPointNames";
var ONLY_CONTAINS_USER_CERTS = "onlyContainsUserCerts";
var ONLY_CONTAINS_CA_CERTS = "onlyContainsCACerts";
var ONLY_SOME_REASON = "onlySomeReasons";
var INDIRECT_CRL = "indirectCRL";
var ONLY_CONTAINS_ATTRIBUTE_CERTS = "onlyContainsAttributeCerts";
var CLEAR_PROPS$1i = [
  DISTRIBUTION_POINT,
  DISTRIBUTION_POINT_NAMES,
  ONLY_CONTAINS_USER_CERTS,
  ONLY_CONTAINS_CA_CERTS,
  ONLY_SOME_REASON,
  INDIRECT_CRL,
  ONLY_CONTAINS_ATTRIBUTE_CERTS
];
var IssuingDistributionPoint = class _IssuingDistributionPoint extends PkiObject {
  constructor(parameters = {}) {
    super();
    if (DISTRIBUTION_POINT in parameters) {
      this.distributionPoint = getParametersValue(parameters, DISTRIBUTION_POINT, _IssuingDistributionPoint.defaultValues(DISTRIBUTION_POINT));
    }
    this.onlyContainsUserCerts = getParametersValue(parameters, ONLY_CONTAINS_USER_CERTS, _IssuingDistributionPoint.defaultValues(ONLY_CONTAINS_USER_CERTS));
    this.onlyContainsCACerts = getParametersValue(parameters, ONLY_CONTAINS_CA_CERTS, _IssuingDistributionPoint.defaultValues(ONLY_CONTAINS_CA_CERTS));
    if (ONLY_SOME_REASON in parameters) {
      this.onlySomeReasons = getParametersValue(parameters, ONLY_SOME_REASON, _IssuingDistributionPoint.defaultValues(ONLY_SOME_REASON));
    }
    this.indirectCRL = getParametersValue(parameters, INDIRECT_CRL, _IssuingDistributionPoint.defaultValues(INDIRECT_CRL));
    this.onlyContainsAttributeCerts = getParametersValue(parameters, ONLY_CONTAINS_ATTRIBUTE_CERTS, _IssuingDistributionPoint.defaultValues(ONLY_CONTAINS_ATTRIBUTE_CERTS));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case DISTRIBUTION_POINT:
        return [];
      case ONLY_CONTAINS_USER_CERTS:
        return false;
      case ONLY_CONTAINS_CA_CERTS:
        return false;
      case ONLY_SOME_REASON:
        return 0;
      case INDIRECT_CRL:
        return false;
      case ONLY_CONTAINS_ATTRIBUTE_CERTS:
        return false;
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new Constructed({
          optional: true,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [
            new Choice({
              value: [
                new Constructed({
                  name: names.distributionPoint || EMPTY_STRING2,
                  idBlock: {
                    tagClass: 3,
                    tagNumber: 0
                  },
                  value: [
                    new Repeated({
                      name: names.distributionPointNames || EMPTY_STRING2,
                      value: GeneralName.schema()
                    })
                  ]
                }),
                new Constructed({
                  name: names.distributionPoint || EMPTY_STRING2,
                  idBlock: {
                    tagClass: 3,
                    tagNumber: 1
                  },
                  value: RelativeDistinguishedNames.schema().valueBlock.value
                })
              ]
            })
          ]
        }),
        new Primitive({
          name: names.onlyContainsUserCerts || EMPTY_STRING2,
          optional: true,
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          }
        }),
        new Primitive({
          name: names.onlyContainsCACerts || EMPTY_STRING2,
          optional: true,
          idBlock: {
            tagClass: 3,
            tagNumber: 2
          }
        }),
        new Primitive({
          name: names.onlySomeReasons || EMPTY_STRING2,
          optional: true,
          idBlock: {
            tagClass: 3,
            tagNumber: 3
          }
        }),
        new Primitive({
          name: names.indirectCRL || EMPTY_STRING2,
          optional: true,
          idBlock: {
            tagClass: 3,
            tagNumber: 4
          }
        }),
        new Primitive({
          name: names.onlyContainsAttributeCerts || EMPTY_STRING2,
          optional: true,
          idBlock: {
            tagClass: 3,
            tagNumber: 5
          }
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$1i);
    const asn1 = compareSchema(schema, schema, _IssuingDistributionPoint.schema({
      names: {
        distributionPoint: DISTRIBUTION_POINT,
        distributionPointNames: DISTRIBUTION_POINT_NAMES,
        onlyContainsUserCerts: ONLY_CONTAINS_USER_CERTS,
        onlyContainsCACerts: ONLY_CONTAINS_CA_CERTS,
        onlySomeReasons: ONLY_SOME_REASON,
        indirectCRL: INDIRECT_CRL,
        onlyContainsAttributeCerts: ONLY_CONTAINS_ATTRIBUTE_CERTS
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    if (DISTRIBUTION_POINT in asn1.result) {
      switch (true) {
        case asn1.result.distributionPoint.idBlock.tagNumber === 0:
          this.distributionPoint = Array.from(asn1.result.distributionPointNames, (element) => new GeneralName({ schema: element }));
          break;
        case asn1.result.distributionPoint.idBlock.tagNumber === 1:
          {
            this.distributionPoint = new RelativeDistinguishedNames({
              schema: new Sequence({
                value: asn1.result.distributionPoint.valueBlock.value
              })
            });
          }
          break;
        default:
          throw new Error("Unknown tagNumber for distributionPoint: {$asn1.result.distributionPoint.idBlock.tagNumber}");
      }
    }
    if (ONLY_CONTAINS_USER_CERTS in asn1.result) {
      const view = new Uint8Array(asn1.result.onlyContainsUserCerts.valueBlock.valueHex);
      this.onlyContainsUserCerts = view[0] !== 0;
    }
    if (ONLY_CONTAINS_CA_CERTS in asn1.result) {
      const view = new Uint8Array(asn1.result.onlyContainsCACerts.valueBlock.valueHex);
      this.onlyContainsCACerts = view[0] !== 0;
    }
    if (ONLY_SOME_REASON in asn1.result) {
      const view = new Uint8Array(asn1.result.onlySomeReasons.valueBlock.valueHex);
      this.onlySomeReasons = view[0];
    }
    if (INDIRECT_CRL in asn1.result) {
      const view = new Uint8Array(asn1.result.indirectCRL.valueBlock.valueHex);
      this.indirectCRL = view[0] !== 0;
    }
    if (ONLY_CONTAINS_ATTRIBUTE_CERTS in asn1.result) {
      const view = new Uint8Array(asn1.result.onlyContainsAttributeCerts.valueBlock.valueHex);
      this.onlyContainsAttributeCerts = view[0] !== 0;
    }
  }
  toSchema() {
    const outputArray = [];
    if (this.distributionPoint) {
      let value;
      if (this.distributionPoint instanceof Array) {
        value = new Constructed({
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: Array.from(this.distributionPoint, (o) => o.toSchema())
        });
      } else {
        value = this.distributionPoint.toSchema();
        value.idBlock.tagClass = 3;
        value.idBlock.tagNumber = 1;
      }
      outputArray.push(new Constructed({
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        value: [value]
      }));
    }
    if (this.onlyContainsUserCerts !== _IssuingDistributionPoint.defaultValues(ONLY_CONTAINS_USER_CERTS)) {
      outputArray.push(new Primitive({
        idBlock: {
          tagClass: 3,
          tagNumber: 1
        },
        valueHex: new Uint8Array([255]).buffer
      }));
    }
    if (this.onlyContainsCACerts !== _IssuingDistributionPoint.defaultValues(ONLY_CONTAINS_CA_CERTS)) {
      outputArray.push(new Primitive({
        idBlock: {
          tagClass: 3,
          tagNumber: 2
        },
        valueHex: new Uint8Array([255]).buffer
      }));
    }
    if (this.onlySomeReasons !== void 0) {
      const buffer = new ArrayBuffer(1);
      const view = new Uint8Array(buffer);
      view[0] = this.onlySomeReasons;
      outputArray.push(new Primitive({
        idBlock: {
          tagClass: 3,
          tagNumber: 3
        },
        valueHex: buffer
      }));
    }
    if (this.indirectCRL !== _IssuingDistributionPoint.defaultValues(INDIRECT_CRL)) {
      outputArray.push(new Primitive({
        idBlock: {
          tagClass: 3,
          tagNumber: 4
        },
        valueHex: new Uint8Array([255]).buffer
      }));
    }
    if (this.onlyContainsAttributeCerts !== _IssuingDistributionPoint.defaultValues(ONLY_CONTAINS_ATTRIBUTE_CERTS)) {
      outputArray.push(new Primitive({
        idBlock: {
          tagClass: 3,
          tagNumber: 5
        },
        valueHex: new Uint8Array([255]).buffer
      }));
    }
    return new Sequence({
      value: outputArray
    });
  }
  toJSON() {
    const obj = {};
    if (this.distributionPoint) {
      if (this.distributionPoint instanceof Array) {
        obj.distributionPoint = Array.from(this.distributionPoint, (o) => o.toJSON());
      } else {
        obj.distributionPoint = this.distributionPoint.toJSON();
      }
    }
    if (this.onlyContainsUserCerts !== _IssuingDistributionPoint.defaultValues(ONLY_CONTAINS_USER_CERTS)) {
      obj.onlyContainsUserCerts = this.onlyContainsUserCerts;
    }
    if (this.onlyContainsCACerts !== _IssuingDistributionPoint.defaultValues(ONLY_CONTAINS_CA_CERTS)) {
      obj.onlyContainsCACerts = this.onlyContainsCACerts;
    }
    if (ONLY_SOME_REASON in this) {
      obj.onlySomeReasons = this.onlySomeReasons;
    }
    if (this.indirectCRL !== _IssuingDistributionPoint.defaultValues(INDIRECT_CRL)) {
      obj.indirectCRL = this.indirectCRL;
    }
    if (this.onlyContainsAttributeCerts !== _IssuingDistributionPoint.defaultValues(ONLY_CONTAINS_ATTRIBUTE_CERTS)) {
      obj.onlyContainsAttributeCerts = this.onlyContainsAttributeCerts;
    }
    return obj;
  }
};
IssuingDistributionPoint.CLASS_NAME = "IssuingDistributionPoint";
var BASE = "base";
var MINIMUM = "minimum";
var MAXIMUM = "maximum";
var CLEAR_PROPS$1h = [
  BASE,
  MINIMUM,
  MAXIMUM
];
var GeneralSubtree = class _GeneralSubtree extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.base = getParametersValue(parameters, BASE, _GeneralSubtree.defaultValues(BASE));
    this.minimum = getParametersValue(parameters, MINIMUM, _GeneralSubtree.defaultValues(MINIMUM));
    if (MAXIMUM in parameters) {
      this.maximum = getParametersValue(parameters, MAXIMUM, _GeneralSubtree.defaultValues(MAXIMUM));
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case BASE:
        return new GeneralName();
      case MINIMUM:
        return 0;
      case MAXIMUM:
        return 0;
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        GeneralName.schema(names.base || {}),
        new Constructed({
          optional: true,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [new Integer({ name: names.minimum || EMPTY_STRING2 })]
        }),
        new Constructed({
          optional: true,
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          },
          value: [new Integer({ name: names.maximum || EMPTY_STRING2 })]
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$1h);
    const asn1 = compareSchema(schema, schema, _GeneralSubtree.schema({
      names: {
        base: {
          names: {
            blockName: BASE
          }
        },
        minimum: MINIMUM,
        maximum: MAXIMUM
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.base = new GeneralName({ schema: asn1.result.base });
    if (MINIMUM in asn1.result) {
      if (asn1.result.minimum.valueBlock.isHexOnly)
        this.minimum = asn1.result.minimum;
      else
        this.minimum = asn1.result.minimum.valueBlock.valueDec;
    }
    if (MAXIMUM in asn1.result) {
      if (asn1.result.maximum.valueBlock.isHexOnly)
        this.maximum = asn1.result.maximum;
      else
        this.maximum = asn1.result.maximum.valueBlock.valueDec;
    }
  }
  toSchema() {
    const outputArray = [];
    outputArray.push(this.base.toSchema());
    if (this.minimum !== 0) {
      let valueMinimum = 0;
      if (this.minimum instanceof Integer) {
        valueMinimum = this.minimum;
      } else {
        valueMinimum = new Integer({ value: this.minimum });
      }
      outputArray.push(new Constructed({
        optional: true,
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        value: [valueMinimum]
      }));
    }
    if (MAXIMUM in this) {
      let valueMaximum = 0;
      if (this.maximum instanceof Integer) {
        valueMaximum = this.maximum;
      } else {
        valueMaximum = new Integer({ value: this.maximum });
      }
      outputArray.push(new Constructed({
        optional: true,
        idBlock: {
          tagClass: 3,
          tagNumber: 1
        },
        value: [valueMaximum]
      }));
    }
    return new Sequence({
      value: outputArray
    });
  }
  toJSON() {
    const res = {
      base: this.base.toJSON()
    };
    if (this.minimum !== 0) {
      if (typeof this.minimum === "number") {
        res.minimum = this.minimum;
      } else {
        res.minimum = this.minimum.toJSON();
      }
    }
    if (this.maximum !== void 0) {
      if (typeof this.maximum === "number") {
        res.maximum = this.maximum;
      } else {
        res.maximum = this.maximum.toJSON();
      }
    }
    return res;
  }
};
GeneralSubtree.CLASS_NAME = "GeneralSubtree";
var PERMITTED_SUBTREES = "permittedSubtrees";
var EXCLUDED_SUBTREES = "excludedSubtrees";
var CLEAR_PROPS$1g = [
  PERMITTED_SUBTREES,
  EXCLUDED_SUBTREES
];
var NameConstraints = class _NameConstraints extends PkiObject {
  constructor(parameters = {}) {
    super();
    if (PERMITTED_SUBTREES in parameters) {
      this.permittedSubtrees = getParametersValue(parameters, PERMITTED_SUBTREES, _NameConstraints.defaultValues(PERMITTED_SUBTREES));
    }
    if (EXCLUDED_SUBTREES in parameters) {
      this.excludedSubtrees = getParametersValue(parameters, EXCLUDED_SUBTREES, _NameConstraints.defaultValues(EXCLUDED_SUBTREES));
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case PERMITTED_SUBTREES:
      case EXCLUDED_SUBTREES:
        return [];
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new Constructed({
          optional: true,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [
            new Repeated({
              name: names.permittedSubtrees || EMPTY_STRING2,
              value: GeneralSubtree.schema()
            })
          ]
        }),
        new Constructed({
          optional: true,
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          },
          value: [
            new Repeated({
              name: names.excludedSubtrees || EMPTY_STRING2,
              value: GeneralSubtree.schema()
            })
          ]
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$1g);
    const asn1 = compareSchema(schema, schema, _NameConstraints.schema({
      names: {
        permittedSubtrees: PERMITTED_SUBTREES,
        excludedSubtrees: EXCLUDED_SUBTREES
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    if (PERMITTED_SUBTREES in asn1.result)
      this.permittedSubtrees = Array.from(asn1.result.permittedSubtrees, (element) => new GeneralSubtree({ schema: element }));
    if (EXCLUDED_SUBTREES in asn1.result)
      this.excludedSubtrees = Array.from(asn1.result.excludedSubtrees, (element) => new GeneralSubtree({ schema: element }));
  }
  toSchema() {
    const outputArray = [];
    if (this.permittedSubtrees) {
      outputArray.push(new Constructed({
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        value: Array.from(this.permittedSubtrees, (o) => o.toSchema())
      }));
    }
    if (this.excludedSubtrees) {
      outputArray.push(new Constructed({
        idBlock: {
          tagClass: 3,
          tagNumber: 1
        },
        value: Array.from(this.excludedSubtrees, (o) => o.toSchema())
      }));
    }
    return new Sequence({
      value: outputArray
    });
  }
  toJSON() {
    const object = {};
    if (this.permittedSubtrees) {
      object.permittedSubtrees = Array.from(this.permittedSubtrees, (o) => o.toJSON());
    }
    if (this.excludedSubtrees) {
      object.excludedSubtrees = Array.from(this.excludedSubtrees, (o) => o.toJSON());
    }
    return object;
  }
};
NameConstraints.CLASS_NAME = "NameConstraints";
var REQUIRE_EXPLICIT_POLICY = "requireExplicitPolicy";
var INHIBIT_POLICY_MAPPING = "inhibitPolicyMapping";
var CLEAR_PROPS$1f = [
  REQUIRE_EXPLICIT_POLICY,
  INHIBIT_POLICY_MAPPING
];
var PolicyConstraints = class _PolicyConstraints extends PkiObject {
  constructor(parameters = {}) {
    super();
    if (REQUIRE_EXPLICIT_POLICY in parameters) {
      this.requireExplicitPolicy = getParametersValue(parameters, REQUIRE_EXPLICIT_POLICY, _PolicyConstraints.defaultValues(REQUIRE_EXPLICIT_POLICY));
    }
    if (INHIBIT_POLICY_MAPPING in parameters) {
      this.inhibitPolicyMapping = getParametersValue(parameters, INHIBIT_POLICY_MAPPING, _PolicyConstraints.defaultValues(INHIBIT_POLICY_MAPPING));
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case REQUIRE_EXPLICIT_POLICY:
        return 0;
      case INHIBIT_POLICY_MAPPING:
        return 0;
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new Primitive({
          name: names.requireExplicitPolicy || EMPTY_STRING2,
          optional: true,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          }
        }),
        new Primitive({
          name: names.inhibitPolicyMapping || EMPTY_STRING2,
          optional: true,
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          }
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$1f);
    const asn1 = compareSchema(schema, schema, _PolicyConstraints.schema({
      names: {
        requireExplicitPolicy: REQUIRE_EXPLICIT_POLICY,
        inhibitPolicyMapping: INHIBIT_POLICY_MAPPING
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    if (REQUIRE_EXPLICIT_POLICY in asn1.result) {
      const field1 = asn1.result.requireExplicitPolicy;
      field1.idBlock.tagClass = 1;
      field1.idBlock.tagNumber = 2;
      const ber1 = field1.toBER(false);
      const int1 = fromBER(ber1);
      AsnError.assert(int1, "Integer");
      this.requireExplicitPolicy = int1.result.valueBlock.valueDec;
    }
    if (INHIBIT_POLICY_MAPPING in asn1.result) {
      const field2 = asn1.result.inhibitPolicyMapping;
      field2.idBlock.tagClass = 1;
      field2.idBlock.tagNumber = 2;
      const ber2 = field2.toBER(false);
      const int2 = fromBER(ber2);
      AsnError.assert(int2, "Integer");
      this.inhibitPolicyMapping = int2.result.valueBlock.valueDec;
    }
  }
  toSchema() {
    const outputArray = [];
    if (REQUIRE_EXPLICIT_POLICY in this) {
      const int1 = new Integer({ value: this.requireExplicitPolicy });
      int1.idBlock.tagClass = 3;
      int1.idBlock.tagNumber = 0;
      outputArray.push(int1);
    }
    if (INHIBIT_POLICY_MAPPING in this) {
      const int2 = new Integer({ value: this.inhibitPolicyMapping });
      int2.idBlock.tagClass = 3;
      int2.idBlock.tagNumber = 1;
      outputArray.push(int2);
    }
    return new Sequence({
      value: outputArray
    });
  }
  toJSON() {
    const res = {};
    if (REQUIRE_EXPLICIT_POLICY in this) {
      res.requireExplicitPolicy = this.requireExplicitPolicy;
    }
    if (INHIBIT_POLICY_MAPPING in this) {
      res.inhibitPolicyMapping = this.inhibitPolicyMapping;
    }
    return res;
  }
};
PolicyConstraints.CLASS_NAME = "PolicyConstraints";
var ISSUER_DOMAIN_POLICY = "issuerDomainPolicy";
var SUBJECT_DOMAIN_POLICY = "subjectDomainPolicy";
var CLEAR_PROPS$1e = [
  ISSUER_DOMAIN_POLICY,
  SUBJECT_DOMAIN_POLICY
];
var PolicyMapping = class _PolicyMapping extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.issuerDomainPolicy = getParametersValue(parameters, ISSUER_DOMAIN_POLICY, _PolicyMapping.defaultValues(ISSUER_DOMAIN_POLICY));
    this.subjectDomainPolicy = getParametersValue(parameters, SUBJECT_DOMAIN_POLICY, _PolicyMapping.defaultValues(SUBJECT_DOMAIN_POLICY));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case ISSUER_DOMAIN_POLICY:
        return EMPTY_STRING2;
      case SUBJECT_DOMAIN_POLICY:
        return EMPTY_STRING2;
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new ObjectIdentifier({ name: names.issuerDomainPolicy || EMPTY_STRING2 }),
        new ObjectIdentifier({ name: names.subjectDomainPolicy || EMPTY_STRING2 })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$1e);
    const asn1 = compareSchema(schema, schema, _PolicyMapping.schema({
      names: {
        issuerDomainPolicy: ISSUER_DOMAIN_POLICY,
        subjectDomainPolicy: SUBJECT_DOMAIN_POLICY
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.issuerDomainPolicy = asn1.result.issuerDomainPolicy.valueBlock.toString();
    this.subjectDomainPolicy = asn1.result.subjectDomainPolicy.valueBlock.toString();
  }
  toSchema() {
    return new Sequence({
      value: [
        new ObjectIdentifier({ value: this.issuerDomainPolicy }),
        new ObjectIdentifier({ value: this.subjectDomainPolicy })
      ]
    });
  }
  toJSON() {
    return {
      issuerDomainPolicy: this.issuerDomainPolicy,
      subjectDomainPolicy: this.subjectDomainPolicy
    };
  }
};
PolicyMapping.CLASS_NAME = "PolicyMapping";
var MAPPINGS = "mappings";
var CLEAR_PROPS$1d = [
  MAPPINGS
];
var PolicyMappings = class _PolicyMappings extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.mappings = getParametersValue(parameters, MAPPINGS, _PolicyMappings.defaultValues(MAPPINGS));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case MAPPINGS:
        return [];
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new Repeated({
          name: names.mappings || EMPTY_STRING2,
          value: PolicyMapping.schema()
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$1d);
    const asn1 = compareSchema(schema, schema, _PolicyMappings.schema({
      names: {
        mappings: MAPPINGS
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.mappings = Array.from(asn1.result.mappings, (element) => new PolicyMapping({ schema: element }));
  }
  toSchema() {
    return new Sequence({
      value: Array.from(this.mappings, (o) => o.toSchema())
    });
  }
  toJSON() {
    return {
      mappings: Array.from(this.mappings, (o) => o.toJSON())
    };
  }
};
PolicyMappings.CLASS_NAME = "PolicyMappings";
var NOT_BEFORE$1 = "notBefore";
var NOT_AFTER$1 = "notAfter";
var CLEAR_PROPS$1c = [
  NOT_BEFORE$1,
  NOT_AFTER$1
];
var PrivateKeyUsagePeriod = class _PrivateKeyUsagePeriod extends PkiObject {
  constructor(parameters = {}) {
    super();
    if (NOT_BEFORE$1 in parameters) {
      this.notBefore = getParametersValue(parameters, NOT_BEFORE$1, _PrivateKeyUsagePeriod.defaultValues(NOT_BEFORE$1));
    }
    if (NOT_AFTER$1 in parameters) {
      this.notAfter = getParametersValue(parameters, NOT_AFTER$1, _PrivateKeyUsagePeriod.defaultValues(NOT_AFTER$1));
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case NOT_BEFORE$1:
        return /* @__PURE__ */ new Date();
      case NOT_AFTER$1:
        return /* @__PURE__ */ new Date();
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new Primitive({
          name: names.notBefore || EMPTY_STRING2,
          optional: true,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          }
        }),
        new Primitive({
          name: names.notAfter || EMPTY_STRING2,
          optional: true,
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          }
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$1c);
    const asn1 = compareSchema(schema, schema, _PrivateKeyUsagePeriod.schema({
      names: {
        notBefore: NOT_BEFORE$1,
        notAfter: NOT_AFTER$1
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    if (NOT_BEFORE$1 in asn1.result) {
      const localNotBefore = new GeneralizedTime();
      localNotBefore.fromBuffer(asn1.result.notBefore.valueBlock.valueHex);
      this.notBefore = localNotBefore.toDate();
    }
    if (NOT_AFTER$1 in asn1.result) {
      const localNotAfter = new GeneralizedTime({ valueHex: asn1.result.notAfter.valueBlock.valueHex });
      localNotAfter.fromBuffer(asn1.result.notAfter.valueBlock.valueHex);
      this.notAfter = localNotAfter.toDate();
    }
  }
  toSchema() {
    const outputArray = [];
    if (NOT_BEFORE$1 in this) {
      outputArray.push(new Primitive({
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        valueHex: new GeneralizedTime({ valueDate: this.notBefore }).valueBlock.valueHexView
      }));
    }
    if (NOT_AFTER$1 in this) {
      outputArray.push(new Primitive({
        idBlock: {
          tagClass: 3,
          tagNumber: 1
        },
        valueHex: new GeneralizedTime({ valueDate: this.notAfter }).valueBlock.valueHexView
      }));
    }
    return new Sequence({
      value: outputArray
    });
  }
  toJSON() {
    const res = {};
    if (this.notBefore) {
      res.notBefore = this.notBefore;
    }
    if (this.notAfter) {
      res.notAfter = this.notAfter;
    }
    return res;
  }
};
PrivateKeyUsagePeriod.CLASS_NAME = "PrivateKeyUsagePeriod";
var ID = "id";
var TYPE$2 = "type";
var VALUES = "values";
var QC_STATEMENT_CLEAR_PROPS = [
  ID,
  TYPE$2
];
var QC_STATEMENTS_CLEAR_PROPS = [
  VALUES
];
var QCStatement = class _QCStatement extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.id = getParametersValue(parameters, ID, _QCStatement.defaultValues(ID));
    if (TYPE$2 in parameters) {
      this.type = getParametersValue(parameters, TYPE$2, _QCStatement.defaultValues(TYPE$2));
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case ID:
        return EMPTY_STRING2;
      case TYPE$2:
        return new Null();
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case ID:
        return memberValue === EMPTY_STRING2;
      case TYPE$2:
        return memberValue instanceof Null;
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new ObjectIdentifier({ name: names.id || EMPTY_STRING2 }),
        new Any({
          name: names.type || EMPTY_STRING2,
          optional: true
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, QC_STATEMENT_CLEAR_PROPS);
    const asn1 = compareSchema(schema, schema, _QCStatement.schema({
      names: {
        id: ID,
        type: TYPE$2
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.id = asn1.result.id.valueBlock.toString();
    if (TYPE$2 in asn1.result)
      this.type = asn1.result.type;
  }
  toSchema() {
    const value = [
      new ObjectIdentifier({ value: this.id })
    ];
    if (TYPE$2 in this)
      value.push(this.type);
    return new Sequence({
      value
    });
  }
  toJSON() {
    const object = {
      id: this.id
    };
    if (this.type) {
      object.type = this.type.toJSON();
    }
    return object;
  }
};
QCStatement.CLASS_NAME = "QCStatement";
var QCStatements = class _QCStatements extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.values = getParametersValue(parameters, VALUES, _QCStatements.defaultValues(VALUES));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case VALUES:
        return [];
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case VALUES:
        return memberValue.length === 0;
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new Repeated({
          name: names.values || EMPTY_STRING2,
          value: QCStatement.schema(names.value || {})
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, QC_STATEMENTS_CLEAR_PROPS);
    const asn1 = compareSchema(schema, schema, _QCStatements.schema({
      names: {
        values: VALUES
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.values = Array.from(asn1.result.values, (element) => new QCStatement({ schema: element }));
  }
  toSchema() {
    return new Sequence({
      value: Array.from(this.values, (o) => o.toSchema())
    });
  }
  toJSON() {
    return {
      values: Array.from(this.values, (o) => o.toJSON())
    };
  }
};
QCStatements.CLASS_NAME = "QCStatements";
var _a2;
var ECNamedCurves = class {
  static register(name, id, size) {
    this.namedCurves[name.toLowerCase()] = this.namedCurves[id] = { name, id, size };
  }
  static find(nameOrId) {
    return this.namedCurves[nameOrId.toLowerCase()] || null;
  }
};
_a2 = ECNamedCurves;
ECNamedCurves.namedCurves = {};
(() => {
  _a2.register("P-256", "1.2.840.10045.3.1.7", 32);
  _a2.register("P-384", "1.3.132.0.34", 48);
  _a2.register("P-521", "1.3.132.0.35", 66);
  _a2.register("brainpoolP256r1", "1.3.36.3.3.2.8.1.1.7", 32);
  _a2.register("brainpoolP384r1", "1.3.36.3.3.2.8.1.1.11", 48);
  _a2.register("brainpoolP512r1", "1.3.36.3.3.2.8.1.1.13", 64);
})();
var X = "x";
var Y = "y";
var NAMED_CURVE$1 = "namedCurve";
var ECPublicKey = class _ECPublicKey extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.x = getParametersValue(parameters, X, _ECPublicKey.defaultValues(X));
    this.y = getParametersValue(parameters, Y, _ECPublicKey.defaultValues(Y));
    this.namedCurve = getParametersValue(parameters, NAMED_CURVE$1, _ECPublicKey.defaultValues(NAMED_CURVE$1));
    if (parameters.json) {
      this.fromJSON(parameters.json);
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case X:
      case Y:
        return EMPTY_BUFFER2;
      case NAMED_CURVE$1:
        return EMPTY_STRING2;
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case X:
      case Y:
        return memberValue instanceof ArrayBuffer && isEqualBuffer(memberValue, _ECPublicKey.defaultValues(memberName));
      case NAMED_CURVE$1:
        return typeof memberValue === "string" && memberValue === _ECPublicKey.defaultValues(memberName);
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema() {
    return new RawData();
  }
  fromSchema(schema1) {
    const view = import_pvtsutils.BufferSourceConverter.toUint8Array(schema1);
    if (view[0] !== 4) {
      throw new Error("Object's schema was not verified against input data for ECPublicKey");
    }
    const namedCurve = ECNamedCurves.find(this.namedCurve);
    if (!namedCurve) {
      throw new Error(`Incorrect curve OID: ${this.namedCurve}`);
    }
    const coordinateLength = namedCurve.size;
    if (view.byteLength !== coordinateLength * 2 + 1) {
      throw new Error("Object's schema was not verified against input data for ECPublicKey");
    }
    this.namedCurve = namedCurve.name;
    this.x = view.slice(1, coordinateLength + 1).buffer;
    this.y = view.slice(1 + coordinateLength, coordinateLength * 2 + 1).buffer;
  }
  toSchema() {
    return new RawData({
      data: utilConcatBuf(new Uint8Array([4]).buffer, this.x, this.y)
    });
  }
  toJSON() {
    const namedCurve = ECNamedCurves.find(this.namedCurve);
    return {
      crv: namedCurve ? namedCurve.name : this.namedCurve,
      x: toBase64(arrayBufferToString(this.x), true, true, false),
      y: toBase64(arrayBufferToString(this.y), true, true, false)
    };
  }
  fromJSON(json) {
    ParameterError.assert("json", json, "crv", "x", "y");
    let coordinateLength = 0;
    const namedCurve = ECNamedCurves.find(json.crv);
    if (namedCurve) {
      this.namedCurve = namedCurve.id;
      coordinateLength = namedCurve.size;
    }
    const xConvertBuffer = stringToArrayBuffer(fromBase64(json.x, true));
    if (xConvertBuffer.byteLength < coordinateLength) {
      this.x = new ArrayBuffer(coordinateLength);
      const view = new Uint8Array(this.x);
      const convertBufferView = new Uint8Array(xConvertBuffer);
      view.set(convertBufferView, 1);
    } else {
      this.x = xConvertBuffer.slice(0, coordinateLength);
    }
    const yConvertBuffer = stringToArrayBuffer(fromBase64(json.y, true));
    if (yConvertBuffer.byteLength < coordinateLength) {
      this.y = new ArrayBuffer(coordinateLength);
      const view = new Uint8Array(this.y);
      const convertBufferView = new Uint8Array(yConvertBuffer);
      view.set(convertBufferView, 1);
    } else {
      this.y = yConvertBuffer.slice(0, coordinateLength);
    }
  }
};
ECPublicKey.CLASS_NAME = "ECPublicKey";
var MODULUS$1 = "modulus";
var PUBLIC_EXPONENT$1 = "publicExponent";
var CLEAR_PROPS$1b = [MODULUS$1, PUBLIC_EXPONENT$1];
var RSAPublicKey = class _RSAPublicKey extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.modulus = getParametersValue(parameters, MODULUS$1, _RSAPublicKey.defaultValues(MODULUS$1));
    this.publicExponent = getParametersValue(parameters, PUBLIC_EXPONENT$1, _RSAPublicKey.defaultValues(PUBLIC_EXPONENT$1));
    if (parameters.json) {
      this.fromJSON(parameters.json);
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case MODULUS$1:
        return new Integer();
      case PUBLIC_EXPONENT$1:
        return new Integer();
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new Integer({ name: names.modulus || EMPTY_STRING2 }),
        new Integer({ name: names.publicExponent || EMPTY_STRING2 })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$1b);
    const asn1 = compareSchema(schema, schema, _RSAPublicKey.schema({
      names: {
        modulus: MODULUS$1,
        publicExponent: PUBLIC_EXPONENT$1
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.modulus = asn1.result.modulus.convertFromDER(256);
    this.publicExponent = asn1.result.publicExponent;
  }
  toSchema() {
    return new Sequence({
      value: [
        this.modulus.convertToDER(),
        this.publicExponent
      ]
    });
  }
  toJSON() {
    return {
      n: pvtsutils2.Convert.ToBase64Url(this.modulus.valueBlock.valueHexView),
      e: pvtsutils2.Convert.ToBase64Url(this.publicExponent.valueBlock.valueHexView)
    };
  }
  fromJSON(json) {
    ParameterError.assert("json", json, "n", "e");
    const array = stringToArrayBuffer(fromBase64(json.n, true));
    this.modulus = new Integer({ valueHex: array.slice(0, Math.pow(2, nearestPowerOf2(array.byteLength))) });
    this.publicExponent = new Integer({ valueHex: stringToArrayBuffer(fromBase64(json.e, true)).slice(0, 3) });
  }
};
RSAPublicKey.CLASS_NAME = "RSAPublicKey";
var ALGORITHM$1 = "algorithm";
var SUBJECT_PUBLIC_KEY = "subjectPublicKey";
var CLEAR_PROPS$1a = [ALGORITHM$1, SUBJECT_PUBLIC_KEY];
var PublicKeyInfo = class _PublicKeyInfo extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.algorithm = getParametersValue(parameters, ALGORITHM$1, _PublicKeyInfo.defaultValues(ALGORITHM$1));
    this.subjectPublicKey = getParametersValue(parameters, SUBJECT_PUBLIC_KEY, _PublicKeyInfo.defaultValues(SUBJECT_PUBLIC_KEY));
    const parsedKey = getParametersValue(parameters, "parsedKey", null);
    if (parsedKey) {
      this.parsedKey = parsedKey;
    }
    if (parameters.json) {
      this.fromJSON(parameters.json);
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  get parsedKey() {
    if (this._parsedKey === void 0) {
      switch (this.algorithm.algorithmId) {
        case "1.2.840.10045.2.1":
          if ("algorithmParams" in this.algorithm) {
            if (this.algorithm.algorithmParams.constructor.blockName() === ObjectIdentifier.blockName()) {
              try {
                this._parsedKey = new ECPublicKey({
                  namedCurve: this.algorithm.algorithmParams.valueBlock.toString(),
                  schema: this.subjectPublicKey.valueBlock.valueHexView
                });
              } catch (ex) {
              }
            }
          }
          break;
        case "1.2.840.113549.1.1.1":
          {
            const publicKeyASN1 = fromBER(this.subjectPublicKey.valueBlock.valueHexView);
            if (publicKeyASN1.offset !== -1) {
              try {
                this._parsedKey = new RSAPublicKey({ schema: publicKeyASN1.result });
              } catch (ex) {
              }
            }
          }
          break;
      }
      this._parsedKey || (this._parsedKey = null);
    }
    return this._parsedKey || void 0;
  }
  set parsedKey(value) {
    this._parsedKey = value;
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case ALGORITHM$1:
        return new AlgorithmIdentifier();
      case SUBJECT_PUBLIC_KEY:
        return new BitString();
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        AlgorithmIdentifier.schema(names.algorithm || {}),
        new BitString({ name: names.subjectPublicKey || EMPTY_STRING2 })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$1a);
    const asn1 = compareSchema(schema, schema, _PublicKeyInfo.schema({
      names: {
        algorithm: {
          names: {
            blockName: ALGORITHM$1
          }
        },
        subjectPublicKey: SUBJECT_PUBLIC_KEY
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.algorithm = new AlgorithmIdentifier({ schema: asn1.result.algorithm });
    this.subjectPublicKey = asn1.result.subjectPublicKey;
  }
  toSchema() {
    return new Sequence({
      value: [
        this.algorithm.toSchema(),
        this.subjectPublicKey
      ]
    });
  }
  toJSON() {
    if (!this.parsedKey) {
      return {
        algorithm: this.algorithm.toJSON(),
        subjectPublicKey: this.subjectPublicKey.toJSON()
      };
    }
    const jwk = {};
    switch (this.algorithm.algorithmId) {
      case "1.2.840.10045.2.1":
        jwk.kty = "EC";
        break;
      case "1.2.840.113549.1.1.1":
        jwk.kty = "RSA";
        break;
    }
    const publicKeyJWK = this.parsedKey.toJSON();
    Object.assign(jwk, publicKeyJWK);
    return jwk;
  }
  fromJSON(json) {
    if ("kty" in json) {
      switch (json.kty.toUpperCase()) {
        case "EC":
          this.parsedKey = new ECPublicKey({ json });
          this.algorithm = new AlgorithmIdentifier({
            algorithmId: "1.2.840.10045.2.1",
            algorithmParams: new ObjectIdentifier({ value: this.parsedKey.namedCurve })
          });
          break;
        case "RSA":
          this.parsedKey = new RSAPublicKey({ json });
          this.algorithm = new AlgorithmIdentifier({
            algorithmId: "1.2.840.113549.1.1.1",
            algorithmParams: new Null()
          });
          break;
        default:
          throw new Error(`Invalid value for "kty" parameter: ${json.kty}`);
      }
      this.subjectPublicKey = new BitString({ valueHex: this.parsedKey.toSchema().toBER(false) });
    }
  }
  async importKey(publicKey, crypto2 = getCrypto(true)) {
    try {
      if (!publicKey) {
        throw new Error("Need to provide publicKey input parameter");
      }
      const exportedKey = await crypto2.exportKey("spki", publicKey);
      const asn1 = fromBER(exportedKey);
      try {
        this.fromSchema(asn1.result);
      } catch (exception) {
        throw new Error("Error during initializing object from schema");
      }
    } catch (e) {
      const message3 = e instanceof Error ? e.message : `${e}`;
      throw new Error(`Error during exporting public key: ${message3}`);
    }
  }
};
PublicKeyInfo.CLASS_NAME = "PublicKeyInfo";
var VERSION$l = "version";
var PRIVATE_KEY$1 = "privateKey";
var NAMED_CURVE = "namedCurve";
var PUBLIC_KEY$1 = "publicKey";
var CLEAR_PROPS$19 = [
  VERSION$l,
  PRIVATE_KEY$1,
  NAMED_CURVE,
  PUBLIC_KEY$1
];
var ECPrivateKey = class _ECPrivateKey extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.version = getParametersValue(parameters, VERSION$l, _ECPrivateKey.defaultValues(VERSION$l));
    this.privateKey = getParametersValue(parameters, PRIVATE_KEY$1, _ECPrivateKey.defaultValues(PRIVATE_KEY$1));
    if (NAMED_CURVE in parameters) {
      this.namedCurve = getParametersValue(parameters, NAMED_CURVE, _ECPrivateKey.defaultValues(NAMED_CURVE));
    }
    if (PUBLIC_KEY$1 in parameters) {
      this.publicKey = getParametersValue(parameters, PUBLIC_KEY$1, _ECPrivateKey.defaultValues(PUBLIC_KEY$1));
    }
    if (parameters.json) {
      this.fromJSON(parameters.json);
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case VERSION$l:
        return 1;
      case PRIVATE_KEY$1:
        return new OctetString();
      case NAMED_CURVE:
        return EMPTY_STRING2;
      case PUBLIC_KEY$1:
        return new ECPublicKey();
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case VERSION$l:
        return memberValue === _ECPrivateKey.defaultValues(memberName);
      case PRIVATE_KEY$1:
        return memberValue.isEqual(_ECPrivateKey.defaultValues(memberName));
      case NAMED_CURVE:
        return memberValue === EMPTY_STRING2;
      case PUBLIC_KEY$1:
        return ECPublicKey.compareWithDefault(NAMED_CURVE, memberValue.namedCurve) && ECPublicKey.compareWithDefault("x", memberValue.x) && ECPublicKey.compareWithDefault("y", memberValue.y);
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new Integer({ name: names.version || EMPTY_STRING2 }),
        new OctetString({ name: names.privateKey || EMPTY_STRING2 }),
        new Constructed({
          optional: true,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [
            new ObjectIdentifier({ name: names.namedCurve || EMPTY_STRING2 })
          ]
        }),
        new Constructed({
          optional: true,
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          },
          value: [
            new BitString({ name: names.publicKey || EMPTY_STRING2 })
          ]
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$19);
    const asn1 = compareSchema(schema, schema, _ECPrivateKey.schema({
      names: {
        version: VERSION$l,
        privateKey: PRIVATE_KEY$1,
        namedCurve: NAMED_CURVE,
        publicKey: PUBLIC_KEY$1
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.version = asn1.result.version.valueBlock.valueDec;
    this.privateKey = asn1.result.privateKey;
    if (NAMED_CURVE in asn1.result) {
      this.namedCurve = asn1.result.namedCurve.valueBlock.toString();
    }
    if (PUBLIC_KEY$1 in asn1.result) {
      const publicKeyData = { schema: asn1.result.publicKey.valueBlock.valueHex };
      if (NAMED_CURVE in this) {
        publicKeyData.namedCurve = this.namedCurve;
      }
      this.publicKey = new ECPublicKey(publicKeyData);
    }
  }
  toSchema() {
    const outputArray = [
      new Integer({ value: this.version }),
      this.privateKey
    ];
    if (this.namedCurve) {
      outputArray.push(new Constructed({
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        value: [
          new ObjectIdentifier({ value: this.namedCurve })
        ]
      }));
    }
    if (this.publicKey) {
      outputArray.push(new Constructed({
        idBlock: {
          tagClass: 3,
          tagNumber: 1
        },
        value: [
          new BitString({ valueHex: this.publicKey.toSchema().toBER(false) })
        ]
      }));
    }
    return new Sequence({
      value: outputArray
    });
  }
  toJSON() {
    if (!this.namedCurve || _ECPrivateKey.compareWithDefault(NAMED_CURVE, this.namedCurve)) {
      throw new Error('Not enough information for making JSON: absent "namedCurve" value');
    }
    const curve = ECNamedCurves.find(this.namedCurve);
    const privateKeyJSON = {
      crv: curve ? curve.name : this.namedCurve,
      d: pvtsutils2.Convert.ToBase64Url(this.privateKey.valueBlock.valueHexView)
    };
    if (this.publicKey) {
      const publicKeyJSON = this.publicKey.toJSON();
      privateKeyJSON.x = publicKeyJSON.x;
      privateKeyJSON.y = publicKeyJSON.y;
    }
    return privateKeyJSON;
  }
  fromJSON(json) {
    ParameterError.assert("json", json, "crv", "d");
    let coordinateLength = 0;
    const curve = ECNamedCurves.find(json.crv);
    if (curve) {
      this.namedCurve = curve.id;
      coordinateLength = curve.size;
    }
    const convertBuffer = pvtsutils2.Convert.FromBase64Url(json.d);
    if (convertBuffer.byteLength < coordinateLength) {
      const buffer = new ArrayBuffer(coordinateLength);
      const view = new Uint8Array(buffer);
      const convertBufferView = new Uint8Array(convertBuffer);
      view.set(convertBufferView, 1);
      this.privateKey = new OctetString({ valueHex: buffer });
    } else {
      this.privateKey = new OctetString({ valueHex: convertBuffer.slice(0, coordinateLength) });
    }
    if (json.x && json.y) {
      this.publicKey = new ECPublicKey({ json });
    }
  }
};
ECPrivateKey.CLASS_NAME = "ECPrivateKey";
var PRIME = "prime";
var EXPONENT = "exponent";
var COEFFICIENT$1 = "coefficient";
var CLEAR_PROPS$18 = [
  PRIME,
  EXPONENT,
  COEFFICIENT$1
];
var OtherPrimeInfo = class _OtherPrimeInfo extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.prime = getParametersValue(parameters, PRIME, _OtherPrimeInfo.defaultValues(PRIME));
    this.exponent = getParametersValue(parameters, EXPONENT, _OtherPrimeInfo.defaultValues(EXPONENT));
    this.coefficient = getParametersValue(parameters, COEFFICIENT$1, _OtherPrimeInfo.defaultValues(COEFFICIENT$1));
    if (parameters.json) {
      this.fromJSON(parameters.json);
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case PRIME:
        return new Integer();
      case EXPONENT:
        return new Integer();
      case COEFFICIENT$1:
        return new Integer();
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new Integer({ name: names.prime || EMPTY_STRING2 }),
        new Integer({ name: names.exponent || EMPTY_STRING2 }),
        new Integer({ name: names.coefficient || EMPTY_STRING2 })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$18);
    const asn1 = compareSchema(schema, schema, _OtherPrimeInfo.schema({
      names: {
        prime: PRIME,
        exponent: EXPONENT,
        coefficient: COEFFICIENT$1
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.prime = asn1.result.prime.convertFromDER();
    this.exponent = asn1.result.exponent.convertFromDER();
    this.coefficient = asn1.result.coefficient.convertFromDER();
  }
  toSchema() {
    return new Sequence({
      value: [
        this.prime.convertToDER(),
        this.exponent.convertToDER(),
        this.coefficient.convertToDER()
      ]
    });
  }
  toJSON() {
    return {
      r: pvtsutils2.Convert.ToBase64Url(this.prime.valueBlock.valueHexView),
      d: pvtsutils2.Convert.ToBase64Url(this.exponent.valueBlock.valueHexView),
      t: pvtsutils2.Convert.ToBase64Url(this.coefficient.valueBlock.valueHexView)
    };
  }
  fromJSON(json) {
    ParameterError.assert("json", json, "r", "d", "r");
    this.prime = new Integer({ valueHex: pvtsutils2.Convert.FromBase64Url(json.r) });
    this.exponent = new Integer({ valueHex: pvtsutils2.Convert.FromBase64Url(json.d) });
    this.coefficient = new Integer({ valueHex: pvtsutils2.Convert.FromBase64Url(json.t) });
  }
};
OtherPrimeInfo.CLASS_NAME = "OtherPrimeInfo";
var VERSION$k = "version";
var MODULUS = "modulus";
var PUBLIC_EXPONENT = "publicExponent";
var PRIVATE_EXPONENT = "privateExponent";
var PRIME1 = "prime1";
var PRIME2 = "prime2";
var EXPONENT1 = "exponent1";
var EXPONENT2 = "exponent2";
var COEFFICIENT = "coefficient";
var OTHER_PRIME_INFOS = "otherPrimeInfos";
var CLEAR_PROPS$17 = [
  VERSION$k,
  MODULUS,
  PUBLIC_EXPONENT,
  PRIVATE_EXPONENT,
  PRIME1,
  PRIME2,
  EXPONENT1,
  EXPONENT2,
  COEFFICIENT,
  OTHER_PRIME_INFOS
];
var RSAPrivateKey = class _RSAPrivateKey extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.version = getParametersValue(parameters, VERSION$k, _RSAPrivateKey.defaultValues(VERSION$k));
    this.modulus = getParametersValue(parameters, MODULUS, _RSAPrivateKey.defaultValues(MODULUS));
    this.publicExponent = getParametersValue(parameters, PUBLIC_EXPONENT, _RSAPrivateKey.defaultValues(PUBLIC_EXPONENT));
    this.privateExponent = getParametersValue(parameters, PRIVATE_EXPONENT, _RSAPrivateKey.defaultValues(PRIVATE_EXPONENT));
    this.prime1 = getParametersValue(parameters, PRIME1, _RSAPrivateKey.defaultValues(PRIME1));
    this.prime2 = getParametersValue(parameters, PRIME2, _RSAPrivateKey.defaultValues(PRIME2));
    this.exponent1 = getParametersValue(parameters, EXPONENT1, _RSAPrivateKey.defaultValues(EXPONENT1));
    this.exponent2 = getParametersValue(parameters, EXPONENT2, _RSAPrivateKey.defaultValues(EXPONENT2));
    this.coefficient = getParametersValue(parameters, COEFFICIENT, _RSAPrivateKey.defaultValues(COEFFICIENT));
    if (OTHER_PRIME_INFOS in parameters) {
      this.otherPrimeInfos = getParametersValue(parameters, OTHER_PRIME_INFOS, _RSAPrivateKey.defaultValues(OTHER_PRIME_INFOS));
    }
    if (parameters.json) {
      this.fromJSON(parameters.json);
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case VERSION$k:
        return 0;
      case MODULUS:
        return new Integer();
      case PUBLIC_EXPONENT:
        return new Integer();
      case PRIVATE_EXPONENT:
        return new Integer();
      case PRIME1:
        return new Integer();
      case PRIME2:
        return new Integer();
      case EXPONENT1:
        return new Integer();
      case EXPONENT2:
        return new Integer();
      case COEFFICIENT:
        return new Integer();
      case OTHER_PRIME_INFOS:
        return [];
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new Integer({ name: names.version || EMPTY_STRING2 }),
        new Integer({ name: names.modulus || EMPTY_STRING2 }),
        new Integer({ name: names.publicExponent || EMPTY_STRING2 }),
        new Integer({ name: names.privateExponent || EMPTY_STRING2 }),
        new Integer({ name: names.prime1 || EMPTY_STRING2 }),
        new Integer({ name: names.prime2 || EMPTY_STRING2 }),
        new Integer({ name: names.exponent1 || EMPTY_STRING2 }),
        new Integer({ name: names.exponent2 || EMPTY_STRING2 }),
        new Integer({ name: names.coefficient || EMPTY_STRING2 }),
        new Sequence({
          optional: true,
          value: [
            new Repeated({
              name: names.otherPrimeInfosName || EMPTY_STRING2,
              value: OtherPrimeInfo.schema(names.otherPrimeInfo || {})
            })
          ]
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$17);
    const asn1 = compareSchema(schema, schema, _RSAPrivateKey.schema({
      names: {
        version: VERSION$k,
        modulus: MODULUS,
        publicExponent: PUBLIC_EXPONENT,
        privateExponent: PRIVATE_EXPONENT,
        prime1: PRIME1,
        prime2: PRIME2,
        exponent1: EXPONENT1,
        exponent2: EXPONENT2,
        coefficient: COEFFICIENT,
        otherPrimeInfo: {
          names: {
            blockName: OTHER_PRIME_INFOS
          }
        }
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.version = asn1.result.version.valueBlock.valueDec;
    this.modulus = asn1.result.modulus.convertFromDER(256);
    this.publicExponent = asn1.result.publicExponent;
    this.privateExponent = asn1.result.privateExponent.convertFromDER(256);
    this.prime1 = asn1.result.prime1.convertFromDER(128);
    this.prime2 = asn1.result.prime2.convertFromDER(128);
    this.exponent1 = asn1.result.exponent1.convertFromDER(128);
    this.exponent2 = asn1.result.exponent2.convertFromDER(128);
    this.coefficient = asn1.result.coefficient.convertFromDER(128);
    if (OTHER_PRIME_INFOS in asn1.result)
      this.otherPrimeInfos = Array.from(asn1.result.otherPrimeInfos, (element) => new OtherPrimeInfo({ schema: element }));
  }
  toSchema() {
    const outputArray = [];
    outputArray.push(new Integer({ value: this.version }));
    outputArray.push(this.modulus.convertToDER());
    outputArray.push(this.publicExponent);
    outputArray.push(this.privateExponent.convertToDER());
    outputArray.push(this.prime1.convertToDER());
    outputArray.push(this.prime2.convertToDER());
    outputArray.push(this.exponent1.convertToDER());
    outputArray.push(this.exponent2.convertToDER());
    outputArray.push(this.coefficient.convertToDER());
    if (this.otherPrimeInfos) {
      outputArray.push(new Sequence({
        value: Array.from(this.otherPrimeInfos, (o) => o.toSchema())
      }));
    }
    return new Sequence({
      value: outputArray
    });
  }
  toJSON() {
    const jwk = {
      n: pvtsutils2.Convert.ToBase64Url(this.modulus.valueBlock.valueHexView),
      e: pvtsutils2.Convert.ToBase64Url(this.publicExponent.valueBlock.valueHexView),
      d: pvtsutils2.Convert.ToBase64Url(this.privateExponent.valueBlock.valueHexView),
      p: pvtsutils2.Convert.ToBase64Url(this.prime1.valueBlock.valueHexView),
      q: pvtsutils2.Convert.ToBase64Url(this.prime2.valueBlock.valueHexView),
      dp: pvtsutils2.Convert.ToBase64Url(this.exponent1.valueBlock.valueHexView),
      dq: pvtsutils2.Convert.ToBase64Url(this.exponent2.valueBlock.valueHexView),
      qi: pvtsutils2.Convert.ToBase64Url(this.coefficient.valueBlock.valueHexView)
    };
    if (this.otherPrimeInfos) {
      jwk.oth = Array.from(this.otherPrimeInfos, (o) => o.toJSON());
    }
    return jwk;
  }
  fromJSON(json) {
    ParameterError.assert("json", json, "n", "e", "d", "p", "q", "dp", "dq", "qi");
    this.modulus = new Integer({ valueHex: pvtsutils2.Convert.FromBase64Url(json.n) });
    this.publicExponent = new Integer({ valueHex: pvtsutils2.Convert.FromBase64Url(json.e) });
    this.privateExponent = new Integer({ valueHex: pvtsutils2.Convert.FromBase64Url(json.d) });
    this.prime1 = new Integer({ valueHex: pvtsutils2.Convert.FromBase64Url(json.p) });
    this.prime2 = new Integer({ valueHex: pvtsutils2.Convert.FromBase64Url(json.q) });
    this.exponent1 = new Integer({ valueHex: pvtsutils2.Convert.FromBase64Url(json.dp) });
    this.exponent2 = new Integer({ valueHex: pvtsutils2.Convert.FromBase64Url(json.dq) });
    this.coefficient = new Integer({ valueHex: pvtsutils2.Convert.FromBase64Url(json.qi) });
    if (json.oth) {
      this.otherPrimeInfos = Array.from(json.oth, (element) => new OtherPrimeInfo({ json: element }));
    }
  }
};
RSAPrivateKey.CLASS_NAME = "RSAPrivateKey";
var VERSION$j = "version";
var PRIVATE_KEY_ALGORITHM = "privateKeyAlgorithm";
var PRIVATE_KEY = "privateKey";
var ATTRIBUTES$5 = "attributes";
var PARSED_KEY = "parsedKey";
var CLEAR_PROPS$16 = [
  VERSION$j,
  PRIVATE_KEY_ALGORITHM,
  PRIVATE_KEY,
  ATTRIBUTES$5
];
var PrivateKeyInfo = class _PrivateKeyInfo extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.version = getParametersValue(parameters, VERSION$j, _PrivateKeyInfo.defaultValues(VERSION$j));
    this.privateKeyAlgorithm = getParametersValue(parameters, PRIVATE_KEY_ALGORITHM, _PrivateKeyInfo.defaultValues(PRIVATE_KEY_ALGORITHM));
    this.privateKey = getParametersValue(parameters, PRIVATE_KEY, _PrivateKeyInfo.defaultValues(PRIVATE_KEY));
    if (ATTRIBUTES$5 in parameters) {
      this.attributes = getParametersValue(parameters, ATTRIBUTES$5, _PrivateKeyInfo.defaultValues(ATTRIBUTES$5));
    }
    if (PARSED_KEY in parameters) {
      this.parsedKey = getParametersValue(parameters, PARSED_KEY, _PrivateKeyInfo.defaultValues(PARSED_KEY));
    }
    if (parameters.json) {
      this.fromJSON(parameters.json);
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case VERSION$j:
        return 0;
      case PRIVATE_KEY_ALGORITHM:
        return new AlgorithmIdentifier();
      case PRIVATE_KEY:
        return new OctetString();
      case ATTRIBUTES$5:
        return [];
      case PARSED_KEY:
        return {};
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new Integer({ name: names.version || EMPTY_STRING2 }),
        AlgorithmIdentifier.schema(names.privateKeyAlgorithm || {}),
        new OctetString({ name: names.privateKey || EMPTY_STRING2 }),
        new Constructed({
          optional: true,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [
            new Repeated({
              name: names.attributes || EMPTY_STRING2,
              value: Attribute.schema()
            })
          ]
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$16);
    const asn1 = compareSchema(schema, schema, _PrivateKeyInfo.schema({
      names: {
        version: VERSION$j,
        privateKeyAlgorithm: {
          names: {
            blockName: PRIVATE_KEY_ALGORITHM
          }
        },
        privateKey: PRIVATE_KEY,
        attributes: ATTRIBUTES$5
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.version = asn1.result.version.valueBlock.valueDec;
    this.privateKeyAlgorithm = new AlgorithmIdentifier({ schema: asn1.result.privateKeyAlgorithm });
    this.privateKey = asn1.result.privateKey;
    if (ATTRIBUTES$5 in asn1.result)
      this.attributes = Array.from(asn1.result.attributes, (element) => new Attribute({ schema: element }));
    switch (this.privateKeyAlgorithm.algorithmId) {
      case "1.2.840.113549.1.1.1":
        {
          const privateKeyASN1 = fromBER(this.privateKey.valueBlock.valueHexView);
          if (privateKeyASN1.offset !== -1)
            this.parsedKey = new RSAPrivateKey({ schema: privateKeyASN1.result });
        }
        break;
      case "1.2.840.10045.2.1":
        if ("algorithmParams" in this.privateKeyAlgorithm) {
          if (this.privateKeyAlgorithm.algorithmParams instanceof ObjectIdentifier) {
            const privateKeyASN1 = fromBER(this.privateKey.valueBlock.valueHexView);
            if (privateKeyASN1.offset !== -1) {
              this.parsedKey = new ECPrivateKey({
                namedCurve: this.privateKeyAlgorithm.algorithmParams.valueBlock.toString(),
                schema: privateKeyASN1.result
              });
            }
          }
        }
        break;
    }
  }
  toSchema() {
    const outputArray = [
      new Integer({ value: this.version }),
      this.privateKeyAlgorithm.toSchema(),
      this.privateKey
    ];
    if (this.attributes) {
      outputArray.push(new Constructed({
        optional: true,
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        value: Array.from(this.attributes, (o) => o.toSchema())
      }));
    }
    return new Sequence({
      value: outputArray
    });
  }
  toJSON() {
    if (!this.parsedKey) {
      const object = {
        version: this.version,
        privateKeyAlgorithm: this.privateKeyAlgorithm.toJSON(),
        privateKey: this.privateKey.toJSON()
      };
      if (this.attributes) {
        object.attributes = Array.from(this.attributes, (o) => o.toJSON());
      }
      return object;
    }
    const jwk = {};
    switch (this.privateKeyAlgorithm.algorithmId) {
      case "1.2.840.10045.2.1":
        jwk.kty = "EC";
        break;
      case "1.2.840.113549.1.1.1":
        jwk.kty = "RSA";
        break;
    }
    const publicKeyJWK = this.parsedKey.toJSON();
    Object.assign(jwk, publicKeyJWK);
    return jwk;
  }
  fromJSON(json) {
    if ("kty" in json) {
      switch (json.kty.toUpperCase()) {
        case "EC":
          this.parsedKey = new ECPrivateKey({ json });
          this.privateKeyAlgorithm = new AlgorithmIdentifier({
            algorithmId: "1.2.840.10045.2.1",
            algorithmParams: new ObjectIdentifier({ value: this.parsedKey.namedCurve })
          });
          break;
        case "RSA":
          this.parsedKey = new RSAPrivateKey({ json });
          this.privateKeyAlgorithm = new AlgorithmIdentifier({
            algorithmId: "1.2.840.113549.1.1.1",
            algorithmParams: new Null()
          });
          break;
        default:
          throw new Error(`Invalid value for "kty" parameter: ${json.kty}`);
      }
      this.privateKey = new OctetString({ valueHex: this.parsedKey.toSchema().toBER(false) });
    }
  }
};
PrivateKeyInfo.CLASS_NAME = "PrivateKeyInfo";
var CONTENT_TYPE$1 = "contentType";
var CONTENT_ENCRYPTION_ALGORITHM = "contentEncryptionAlgorithm";
var ENCRYPTED_CONTENT = "encryptedContent";
var CLEAR_PROPS$15 = [
  CONTENT_TYPE$1,
  CONTENT_ENCRYPTION_ALGORITHM,
  ENCRYPTED_CONTENT
];
var PIECE_SIZE = 1024;
var EncryptedContentInfo = class _EncryptedContentInfo extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.contentType = getParametersValue(parameters, CONTENT_TYPE$1, _EncryptedContentInfo.defaultValues(CONTENT_TYPE$1));
    this.contentEncryptionAlgorithm = getParametersValue(parameters, CONTENT_ENCRYPTION_ALGORITHM, _EncryptedContentInfo.defaultValues(CONTENT_ENCRYPTION_ALGORITHM));
    if (ENCRYPTED_CONTENT in parameters && parameters.encryptedContent) {
      this.encryptedContent = parameters.encryptedContent;
      if (this.encryptedContent.idBlock.tagClass === 1 && this.encryptedContent.idBlock.tagNumber === 4) {
        if (this.encryptedContent.idBlock.isConstructed === false && !parameters.disableSplit) {
          const constrString = new OctetString({
            idBlock: { isConstructed: true },
            isConstructed: true
          });
          let offset = 0;
          const valueHex = this.encryptedContent.valueBlock.valueHexView.slice().buffer;
          let length = valueHex.byteLength;
          while (length > 0) {
            const pieceView = new Uint8Array(valueHex, offset, offset + PIECE_SIZE > valueHex.byteLength ? valueHex.byteLength - offset : PIECE_SIZE);
            const _array = new ArrayBuffer(pieceView.length);
            const _view = new Uint8Array(_array);
            for (let i = 0; i < _view.length; i++)
              _view[i] = pieceView[i];
            constrString.valueBlock.value.push(new OctetString({ valueHex: _array }));
            length -= pieceView.length;
            offset += pieceView.length;
          }
          this.encryptedContent = constrString;
        }
      }
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case CONTENT_TYPE$1:
        return EMPTY_STRING2;
      case CONTENT_ENCRYPTION_ALGORITHM:
        return new AlgorithmIdentifier();
      case ENCRYPTED_CONTENT:
        return new OctetString();
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case CONTENT_TYPE$1:
        return memberValue === EMPTY_STRING2;
      case CONTENT_ENCRYPTION_ALGORITHM:
        return memberValue.algorithmId === EMPTY_STRING2 && "algorithmParams" in memberValue === false;
      case ENCRYPTED_CONTENT:
        return memberValue.isEqual(_EncryptedContentInfo.defaultValues(ENCRYPTED_CONTENT));
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new ObjectIdentifier({ name: names.contentType || EMPTY_STRING2 }),
        AlgorithmIdentifier.schema(names.contentEncryptionAlgorithm || {}),
        new Choice({
          value: [
            new Constructed({
              name: names.encryptedContent || EMPTY_STRING2,
              idBlock: {
                tagClass: 3,
                tagNumber: 0
              },
              value: [
                new Repeated({
                  value: new OctetString()
                })
              ]
            }),
            new Primitive({
              name: names.encryptedContent || EMPTY_STRING2,
              idBlock: {
                tagClass: 3,
                tagNumber: 0
              }
            })
          ]
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$15);
    const asn1 = compareSchema(schema, schema, _EncryptedContentInfo.schema({
      names: {
        contentType: CONTENT_TYPE$1,
        contentEncryptionAlgorithm: {
          names: {
            blockName: CONTENT_ENCRYPTION_ALGORITHM
          }
        },
        encryptedContent: ENCRYPTED_CONTENT
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.contentType = asn1.result.contentType.valueBlock.toString();
    this.contentEncryptionAlgorithm = new AlgorithmIdentifier({ schema: asn1.result.contentEncryptionAlgorithm });
    if (ENCRYPTED_CONTENT in asn1.result) {
      this.encryptedContent = asn1.result.encryptedContent;
      this.encryptedContent.idBlock.tagClass = 1;
      this.encryptedContent.idBlock.tagNumber = 4;
    }
  }
  toSchema() {
    const sequenceLengthBlock = {
      isIndefiniteForm: false
    };
    const outputArray = [];
    outputArray.push(new ObjectIdentifier({ value: this.contentType }));
    outputArray.push(this.contentEncryptionAlgorithm.toSchema());
    if (this.encryptedContent) {
      sequenceLengthBlock.isIndefiniteForm = this.encryptedContent.idBlock.isConstructed;
      const encryptedValue = this.encryptedContent;
      encryptedValue.idBlock.tagClass = 3;
      encryptedValue.idBlock.tagNumber = 0;
      encryptedValue.lenBlock.isIndefiniteForm = this.encryptedContent.idBlock.isConstructed;
      outputArray.push(encryptedValue);
    }
    return new Sequence({
      lenBlock: sequenceLengthBlock,
      value: outputArray
    });
  }
  toJSON() {
    const res = {
      contentType: this.contentType,
      contentEncryptionAlgorithm: this.contentEncryptionAlgorithm.toJSON()
    };
    if (this.encryptedContent) {
      res.encryptedContent = this.encryptedContent.toJSON();
    }
    return res;
  }
  getEncryptedContent() {
    if (!this.encryptedContent) {
      throw new Error("Parameter 'encryptedContent' is undefined");
    }
    return OctetString.prototype.getValue.call(this.encryptedContent);
  }
};
EncryptedContentInfo.CLASS_NAME = "EncryptedContentInfo";
var HASH_ALGORITHM$4 = "hashAlgorithm";
var MASK_GEN_ALGORITHM$1 = "maskGenAlgorithm";
var SALT_LENGTH = "saltLength";
var TRAILER_FIELD = "trailerField";
var CLEAR_PROPS$14 = [
  HASH_ALGORITHM$4,
  MASK_GEN_ALGORITHM$1,
  SALT_LENGTH,
  TRAILER_FIELD
];
var RSASSAPSSParams = class _RSASSAPSSParams extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.hashAlgorithm = getParametersValue(parameters, HASH_ALGORITHM$4, _RSASSAPSSParams.defaultValues(HASH_ALGORITHM$4));
    this.maskGenAlgorithm = getParametersValue(parameters, MASK_GEN_ALGORITHM$1, _RSASSAPSSParams.defaultValues(MASK_GEN_ALGORITHM$1));
    this.saltLength = getParametersValue(parameters, SALT_LENGTH, _RSASSAPSSParams.defaultValues(SALT_LENGTH));
    this.trailerField = getParametersValue(parameters, TRAILER_FIELD, _RSASSAPSSParams.defaultValues(TRAILER_FIELD));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case HASH_ALGORITHM$4:
        return new AlgorithmIdentifier({
          algorithmId: "1.3.14.3.2.26",
          algorithmParams: new Null()
        });
      case MASK_GEN_ALGORITHM$1:
        return new AlgorithmIdentifier({
          algorithmId: "1.2.840.113549.1.1.8",
          algorithmParams: new AlgorithmIdentifier({
            algorithmId: "1.3.14.3.2.26",
            algorithmParams: new Null()
          }).toSchema()
        });
      case SALT_LENGTH:
        return 20;
      case TRAILER_FIELD:
        return 1;
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new Constructed({
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          optional: true,
          value: [AlgorithmIdentifier.schema(names.hashAlgorithm || {})]
        }),
        new Constructed({
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          },
          optional: true,
          value: [AlgorithmIdentifier.schema(names.maskGenAlgorithm || {})]
        }),
        new Constructed({
          idBlock: {
            tagClass: 3,
            tagNumber: 2
          },
          optional: true,
          value: [new Integer({ name: names.saltLength || EMPTY_STRING2 })]
        }),
        new Constructed({
          idBlock: {
            tagClass: 3,
            tagNumber: 3
          },
          optional: true,
          value: [new Integer({ name: names.trailerField || EMPTY_STRING2 })]
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$14);
    const asn1 = compareSchema(schema, schema, _RSASSAPSSParams.schema({
      names: {
        hashAlgorithm: {
          names: {
            blockName: HASH_ALGORITHM$4
          }
        },
        maskGenAlgorithm: {
          names: {
            blockName: MASK_GEN_ALGORITHM$1
          }
        },
        saltLength: SALT_LENGTH,
        trailerField: TRAILER_FIELD
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    if (HASH_ALGORITHM$4 in asn1.result)
      this.hashAlgorithm = new AlgorithmIdentifier({ schema: asn1.result.hashAlgorithm });
    if (MASK_GEN_ALGORITHM$1 in asn1.result)
      this.maskGenAlgorithm = new AlgorithmIdentifier({ schema: asn1.result.maskGenAlgorithm });
    if (SALT_LENGTH in asn1.result)
      this.saltLength = asn1.result.saltLength.valueBlock.valueDec;
    if (TRAILER_FIELD in asn1.result)
      this.trailerField = asn1.result.trailerField.valueBlock.valueDec;
  }
  toSchema() {
    const outputArray = [];
    if (!this.hashAlgorithm.isEqual(_RSASSAPSSParams.defaultValues(HASH_ALGORITHM$4))) {
      outputArray.push(new Constructed({
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        value: [this.hashAlgorithm.toSchema()]
      }));
    }
    if (!this.maskGenAlgorithm.isEqual(_RSASSAPSSParams.defaultValues(MASK_GEN_ALGORITHM$1))) {
      outputArray.push(new Constructed({
        idBlock: {
          tagClass: 3,
          tagNumber: 1
        },
        value: [this.maskGenAlgorithm.toSchema()]
      }));
    }
    if (this.saltLength !== _RSASSAPSSParams.defaultValues(SALT_LENGTH)) {
      outputArray.push(new Constructed({
        idBlock: {
          tagClass: 3,
          tagNumber: 2
        },
        value: [new Integer({ value: this.saltLength })]
      }));
    }
    if (this.trailerField !== _RSASSAPSSParams.defaultValues(TRAILER_FIELD)) {
      outputArray.push(new Constructed({
        idBlock: {
          tagClass: 3,
          tagNumber: 3
        },
        value: [new Integer({ value: this.trailerField })]
      }));
    }
    return new Sequence({
      value: outputArray
    });
  }
  toJSON() {
    const res = {};
    if (!this.hashAlgorithm.isEqual(_RSASSAPSSParams.defaultValues(HASH_ALGORITHM$4))) {
      res.hashAlgorithm = this.hashAlgorithm.toJSON();
    }
    if (!this.maskGenAlgorithm.isEqual(_RSASSAPSSParams.defaultValues(MASK_GEN_ALGORITHM$1))) {
      res.maskGenAlgorithm = this.maskGenAlgorithm.toJSON();
    }
    if (this.saltLength !== _RSASSAPSSParams.defaultValues(SALT_LENGTH)) {
      res.saltLength = this.saltLength;
    }
    if (this.trailerField !== _RSASSAPSSParams.defaultValues(TRAILER_FIELD)) {
      res.trailerField = this.trailerField;
    }
    return res;
  }
};
RSASSAPSSParams.CLASS_NAME = "RSASSAPSSParams";
var SALT = "salt";
var ITERATION_COUNT = "iterationCount";
var KEY_LENGTH = "keyLength";
var PRF = "prf";
var CLEAR_PROPS$13 = [
  SALT,
  ITERATION_COUNT,
  KEY_LENGTH,
  PRF
];
var PBKDF2Params = class _PBKDF2Params extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.salt = getParametersValue(parameters, SALT, _PBKDF2Params.defaultValues(SALT));
    this.iterationCount = getParametersValue(parameters, ITERATION_COUNT, _PBKDF2Params.defaultValues(ITERATION_COUNT));
    if (KEY_LENGTH in parameters) {
      this.keyLength = getParametersValue(parameters, KEY_LENGTH, _PBKDF2Params.defaultValues(KEY_LENGTH));
    }
    if (PRF in parameters) {
      this.prf = getParametersValue(parameters, PRF, _PBKDF2Params.defaultValues(PRF));
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case SALT:
        return {};
      case ITERATION_COUNT:
        return -1;
      case KEY_LENGTH:
        return 0;
      case PRF:
        return new AlgorithmIdentifier({
          algorithmId: "1.3.14.3.2.26",
          algorithmParams: new Null()
        });
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new Choice({
          value: [
            new OctetString({ name: names.saltPrimitive || EMPTY_STRING2 }),
            AlgorithmIdentifier.schema(names.saltConstructed || {})
          ]
        }),
        new Integer({ name: names.iterationCount || EMPTY_STRING2 }),
        new Integer({
          name: names.keyLength || EMPTY_STRING2,
          optional: true
        }),
        AlgorithmIdentifier.schema(names.prf || {
          names: {
            optional: true
          }
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$13);
    const asn1 = compareSchema(schema, schema, _PBKDF2Params.schema({
      names: {
        saltPrimitive: SALT,
        saltConstructed: {
          names: {
            blockName: SALT
          }
        },
        iterationCount: ITERATION_COUNT,
        keyLength: KEY_LENGTH,
        prf: {
          names: {
            blockName: PRF,
            optional: true
          }
        }
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.salt = asn1.result.salt;
    this.iterationCount = asn1.result.iterationCount.valueBlock.valueDec;
    if (KEY_LENGTH in asn1.result)
      this.keyLength = asn1.result.keyLength.valueBlock.valueDec;
    if (PRF in asn1.result)
      this.prf = new AlgorithmIdentifier({ schema: asn1.result.prf });
  }
  toSchema() {
    const outputArray = [];
    outputArray.push(this.salt);
    outputArray.push(new Integer({ value: this.iterationCount }));
    if (KEY_LENGTH in this) {
      if (_PBKDF2Params.defaultValues(KEY_LENGTH) !== this.keyLength)
        outputArray.push(new Integer({ value: this.keyLength }));
    }
    if (this.prf) {
      if (_PBKDF2Params.defaultValues(PRF).isEqual(this.prf) === false)
        outputArray.push(this.prf.toSchema());
    }
    return new Sequence({
      value: outputArray
    });
  }
  toJSON() {
    const res = {
      salt: this.salt.toJSON(),
      iterationCount: this.iterationCount
    };
    if (KEY_LENGTH in this) {
      if (_PBKDF2Params.defaultValues(KEY_LENGTH) !== this.keyLength)
        res.keyLength = this.keyLength;
    }
    if (this.prf) {
      if (_PBKDF2Params.defaultValues(PRF).isEqual(this.prf) === false)
        res.prf = this.prf.toJSON();
    }
    return res;
  }
};
PBKDF2Params.CLASS_NAME = "PBKDF2Params";
var KEY_DERIVATION_FUNC = "keyDerivationFunc";
var ENCRYPTION_SCHEME = "encryptionScheme";
var CLEAR_PROPS$12 = [
  KEY_DERIVATION_FUNC,
  ENCRYPTION_SCHEME
];
var PBES2Params = class _PBES2Params extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.keyDerivationFunc = getParametersValue(parameters, KEY_DERIVATION_FUNC, _PBES2Params.defaultValues(KEY_DERIVATION_FUNC));
    this.encryptionScheme = getParametersValue(parameters, ENCRYPTION_SCHEME, _PBES2Params.defaultValues(ENCRYPTION_SCHEME));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case KEY_DERIVATION_FUNC:
        return new AlgorithmIdentifier();
      case ENCRYPTION_SCHEME:
        return new AlgorithmIdentifier();
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        AlgorithmIdentifier.schema(names.keyDerivationFunc || {}),
        AlgorithmIdentifier.schema(names.encryptionScheme || {})
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$12);
    const asn1 = compareSchema(schema, schema, _PBES2Params.schema({
      names: {
        keyDerivationFunc: {
          names: {
            blockName: KEY_DERIVATION_FUNC
          }
        },
        encryptionScheme: {
          names: {
            blockName: ENCRYPTION_SCHEME
          }
        }
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.keyDerivationFunc = new AlgorithmIdentifier({ schema: asn1.result.keyDerivationFunc });
    this.encryptionScheme = new AlgorithmIdentifier({ schema: asn1.result.encryptionScheme });
  }
  toSchema() {
    return new Sequence({
      value: [
        this.keyDerivationFunc.toSchema(),
        this.encryptionScheme.toSchema()
      ]
    });
  }
  toJSON() {
    return {
      keyDerivationFunc: this.keyDerivationFunc.toJSON(),
      encryptionScheme: this.encryptionScheme.toJSON()
    };
  }
};
PBES2Params.CLASS_NAME = "PBES2Params";
var AbstractCryptoEngine = class {
  constructor(parameters) {
    this.crypto = parameters.crypto;
    this.subtle = "webkitSubtle" in parameters.crypto ? parameters.crypto.webkitSubtle : parameters.crypto.subtle;
    this.name = getParametersValue(parameters, "name", EMPTY_STRING2);
  }
  async encrypt(...args) {
    return this.subtle.encrypt(...args);
  }
  async decrypt(...args) {
    return this.subtle.decrypt(...args);
  }
  sign(...args) {
    return this.subtle.sign(...args);
  }
  async verify(...args) {
    return this.subtle.verify(...args);
  }
  async digest(...args) {
    return this.subtle.digest(...args);
  }
  async generateKey(...args) {
    return this.subtle.generateKey(...args);
  }
  async deriveKey(...args) {
    return this.subtle.deriveKey(...args);
  }
  async deriveBits(...args) {
    return this.subtle.deriveBits(...args);
  }
  async wrapKey(...args) {
    return this.subtle.wrapKey(...args);
  }
  async unwrapKey(...args) {
    return this.subtle.unwrapKey(...args);
  }
  exportKey(...args) {
    return this.subtle.exportKey(...args);
  }
  importKey(...args) {
    return this.subtle.importKey(...args);
  }
  getRandomValues(array) {
    return this.crypto.getRandomValues(array);
  }
};
async function makePKCS12B2Key(cryptoEngine, hashAlgorithm, keyLength, password, salt, iterationCount) {
  let u;
  let v;
  const result = [];
  switch (hashAlgorithm.toUpperCase()) {
    case "SHA-1":
      u = 20;
      v = 64;
      break;
    case "SHA-256":
      u = 32;
      v = 64;
      break;
    case "SHA-384":
      u = 48;
      v = 128;
      break;
    case "SHA-512":
      u = 64;
      v = 128;
      break;
    default:
      throw new Error("Unsupported hashing algorithm");
  }
  const passwordViewInitial = new Uint8Array(password);
  const passwordTransformed = new ArrayBuffer(password.byteLength * 2 + 2);
  const passwordTransformedView = new Uint8Array(passwordTransformed);
  for (let i = 0; i < passwordViewInitial.length; i++) {
    passwordTransformedView[i * 2] = 0;
    passwordTransformedView[i * 2 + 1] = passwordViewInitial[i];
  }
  passwordTransformedView[passwordTransformedView.length - 2] = 0;
  passwordTransformedView[passwordTransformedView.length - 1] = 0;
  password = passwordTransformed.slice(0);
  const D = new ArrayBuffer(v);
  const dView = new Uint8Array(D);
  for (let i = 0; i < D.byteLength; i++)
    dView[i] = 3;
  const saltLength = salt.byteLength;
  const sLen = v * Math.ceil(saltLength / v);
  const S = new ArrayBuffer(sLen);
  const sView = new Uint8Array(S);
  const saltView = new Uint8Array(salt);
  for (let i = 0; i < sLen; i++)
    sView[i] = saltView[i % saltLength];
  const passwordLength = password.byteLength;
  const pLen = v * Math.ceil(passwordLength / v);
  const P = new ArrayBuffer(pLen);
  const pView = new Uint8Array(P);
  const passwordView = new Uint8Array(password);
  for (let i = 0; i < pLen; i++)
    pView[i] = passwordView[i % passwordLength];
  const sPlusPLength = S.byteLength + P.byteLength;
  let I = new ArrayBuffer(sPlusPLength);
  let iView = new Uint8Array(I);
  iView.set(sView);
  iView.set(pView, sView.length);
  const c = Math.ceil((keyLength >> 3) / u);
  let internalSequence = Promise.resolve(I);
  for (let i = 0; i <= c; i++) {
    internalSequence = internalSequence.then((_I) => {
      const dAndI = new ArrayBuffer(D.byteLength + _I.byteLength);
      const dAndIView = new Uint8Array(dAndI);
      dAndIView.set(dView);
      dAndIView.set(iView, dView.length);
      return dAndI;
    });
    for (let j = 0; j < iterationCount; j++)
      internalSequence = internalSequence.then((roundBuffer) => cryptoEngine.digest({ name: hashAlgorithm }, new Uint8Array(roundBuffer)));
    internalSequence = internalSequence.then((roundBuffer) => {
      const B = new ArrayBuffer(v);
      const bView = new Uint8Array(B);
      for (let j = 0; j < B.byteLength; j++)
        bView[j] = roundBuffer[j % roundBuffer.byteLength];
      const k = Math.ceil(saltLength / v) + Math.ceil(passwordLength / v);
      const iRound = [];
      let sliceStart = 0;
      let sliceLength = v;
      for (let j = 0; j < k; j++) {
        const chunk = Array.from(new Uint8Array(I.slice(sliceStart, sliceStart + sliceLength)));
        sliceStart += v;
        if (sliceStart + v > I.byteLength)
          sliceLength = I.byteLength - sliceStart;
        let x = 511;
        for (let l = B.byteLength - 1; l >= 0; l--) {
          x >>= 8;
          x += bView[l] + chunk[l];
          chunk[l] = x & 255;
        }
        iRound.push(...chunk);
      }
      I = new ArrayBuffer(iRound.length);
      iView = new Uint8Array(I);
      iView.set(iRound);
      result.push(...new Uint8Array(roundBuffer));
      return I;
    });
  }
  internalSequence = internalSequence.then(() => {
    const resultBuffer = new ArrayBuffer(keyLength >> 3);
    const resultView = new Uint8Array(resultBuffer);
    resultView.set(new Uint8Array(result).slice(0, keyLength >> 3));
    return resultBuffer;
  });
  return internalSequence;
}
function prepareAlgorithm(data) {
  const res = typeof data === "string" ? { name: data } : data;
  if ("hash" in res) {
    return {
      ...res,
      hash: prepareAlgorithm(res.hash)
    };
  }
  return res;
}
var CryptoEngine = class extends AbstractCryptoEngine {
  async importKey(format, keyData, algorithm, extractable, keyUsages) {
    var _a3, _b, _c, _d, _e, _f;
    let jwk = {};
    const alg = prepareAlgorithm(algorithm);
    switch (format.toLowerCase()) {
      case "raw":
        return this.subtle.importKey("raw", keyData, algorithm, extractable, keyUsages);
      case "spki":
        {
          const asn1 = fromBER(pvtsutils2.BufferSourceConverter.toArrayBuffer(keyData));
          AsnError.assert(asn1, "keyData");
          const publicKeyInfo = new PublicKeyInfo();
          try {
            publicKeyInfo.fromSchema(asn1.result);
          } catch {
            throw new ArgumentError("Incorrect keyData");
          }
          switch (alg.name.toUpperCase()) {
            case "RSA-PSS": {
              if (!alg.hash) {
                throw new ParameterError("hash", "algorithm.hash", "Incorrect hash algorithm: Hash algorithm is missed");
              }
              switch (alg.hash.name.toUpperCase()) {
                case "SHA-1":
                  jwk.alg = "PS1";
                  break;
                case "SHA-256":
                  jwk.alg = "PS256";
                  break;
                case "SHA-384":
                  jwk.alg = "PS384";
                  break;
                case "SHA-512":
                  jwk.alg = "PS512";
                  break;
                default:
                  throw new Error(`Incorrect hash algorithm: ${alg.hash.name.toUpperCase()}`);
              }
            }
            case "RSASSA-PKCS1-V1_5":
              {
                keyUsages = ["verify"];
                jwk.kty = "RSA";
                jwk.ext = extractable;
                jwk.key_ops = keyUsages;
                if (publicKeyInfo.algorithm.algorithmId !== "1.2.840.113549.1.1.1")
                  throw new Error(`Incorrect public key algorithm: ${publicKeyInfo.algorithm.algorithmId}`);
                if (!jwk.alg) {
                  if (!alg.hash) {
                    throw new ParameterError("hash", "algorithm.hash", "Incorrect hash algorithm: Hash algorithm is missed");
                  }
                  switch (alg.hash.name.toUpperCase()) {
                    case "SHA-1":
                      jwk.alg = "RS1";
                      break;
                    case "SHA-256":
                      jwk.alg = "RS256";
                      break;
                    case "SHA-384":
                      jwk.alg = "RS384";
                      break;
                    case "SHA-512":
                      jwk.alg = "RS512";
                      break;
                    default:
                      throw new Error(`Incorrect hash algorithm: ${alg.hash.name.toUpperCase()}`);
                  }
                }
                const publicKeyJSON = publicKeyInfo.toJSON();
                Object.assign(jwk, publicKeyJSON);
              }
              break;
            case "ECDSA":
              keyUsages = ["verify"];
            case "ECDH":
              {
                jwk = {
                  kty: "EC",
                  ext: extractable,
                  key_ops: keyUsages
                };
                if (publicKeyInfo.algorithm.algorithmId !== "1.2.840.10045.2.1") {
                  throw new Error(`Incorrect public key algorithm: ${publicKeyInfo.algorithm.algorithmId}`);
                }
                const publicKeyJSON = publicKeyInfo.toJSON();
                Object.assign(jwk, publicKeyJSON);
              }
              break;
            case "RSA-OAEP":
              {
                jwk.kty = "RSA";
                jwk.ext = extractable;
                jwk.key_ops = keyUsages;
                if (this.name.toLowerCase() === "safari")
                  jwk.alg = "RSA-OAEP";
                else {
                  if (!alg.hash) {
                    throw new ParameterError("hash", "algorithm.hash", "Incorrect hash algorithm: Hash algorithm is missed");
                  }
                  switch (alg.hash.name.toUpperCase()) {
                    case "SHA-1":
                      jwk.alg = "RSA-OAEP";
                      break;
                    case "SHA-256":
                      jwk.alg = "RSA-OAEP-256";
                      break;
                    case "SHA-384":
                      jwk.alg = "RSA-OAEP-384";
                      break;
                    case "SHA-512":
                      jwk.alg = "RSA-OAEP-512";
                      break;
                    default:
                      throw new Error(`Incorrect hash algorithm: ${alg.hash.name.toUpperCase()}`);
                  }
                }
                const publicKeyJSON = publicKeyInfo.toJSON();
                Object.assign(jwk, publicKeyJSON);
              }
              break;
            case "RSAES-PKCS1-V1_5":
              {
                jwk.kty = "RSA";
                jwk.ext = extractable;
                jwk.key_ops = keyUsages;
                jwk.alg = "PS1";
                const publicKeyJSON = publicKeyInfo.toJSON();
                Object.assign(jwk, publicKeyJSON);
              }
              break;
            default:
              throw new Error(`Incorrect algorithm name: ${alg.name.toUpperCase()}`);
          }
        }
        break;
      case "pkcs8":
        {
          const privateKeyInfo = new PrivateKeyInfo();
          const asn1 = fromBER(pvtsutils2.BufferSourceConverter.toArrayBuffer(keyData));
          AsnError.assert(asn1, "keyData");
          try {
            privateKeyInfo.fromSchema(asn1.result);
          } catch (ex) {
            throw new Error("Incorrect keyData");
          }
          if (!privateKeyInfo.parsedKey)
            throw new Error("Incorrect keyData");
          switch (alg.name.toUpperCase()) {
            case "RSA-PSS": {
              switch ((_a3 = alg.hash) === null || _a3 === void 0 ? void 0 : _a3.name.toUpperCase()) {
                case "SHA-1":
                  jwk.alg = "PS1";
                  break;
                case "SHA-256":
                  jwk.alg = "PS256";
                  break;
                case "SHA-384":
                  jwk.alg = "PS384";
                  break;
                case "SHA-512":
                  jwk.alg = "PS512";
                  break;
                default:
                  throw new Error(`Incorrect hash algorithm: ${(_b = alg.hash) === null || _b === void 0 ? void 0 : _b.name.toUpperCase()}`);
              }
            }
            case "RSASSA-PKCS1-V1_5":
              {
                keyUsages = ["sign"];
                jwk.kty = "RSA";
                jwk.ext = extractable;
                jwk.key_ops = keyUsages;
                if (privateKeyInfo.privateKeyAlgorithm.algorithmId !== "1.2.840.113549.1.1.1")
                  throw new Error(`Incorrect private key algorithm: ${privateKeyInfo.privateKeyAlgorithm.algorithmId}`);
                if ("alg" in jwk === false) {
                  switch ((_c = alg.hash) === null || _c === void 0 ? void 0 : _c.name.toUpperCase()) {
                    case "SHA-1":
                      jwk.alg = "RS1";
                      break;
                    case "SHA-256":
                      jwk.alg = "RS256";
                      break;
                    case "SHA-384":
                      jwk.alg = "RS384";
                      break;
                    case "SHA-512":
                      jwk.alg = "RS512";
                      break;
                    default:
                      throw new Error(`Incorrect hash algorithm: ${(_d = alg.hash) === null || _d === void 0 ? void 0 : _d.name.toUpperCase()}`);
                  }
                }
                const privateKeyJSON = privateKeyInfo.toJSON();
                Object.assign(jwk, privateKeyJSON);
              }
              break;
            case "ECDSA":
              keyUsages = ["sign"];
            case "ECDH":
              {
                jwk = {
                  kty: "EC",
                  ext: extractable,
                  key_ops: keyUsages
                };
                if (privateKeyInfo.privateKeyAlgorithm.algorithmId !== "1.2.840.10045.2.1")
                  throw new Error(`Incorrect algorithm: ${privateKeyInfo.privateKeyAlgorithm.algorithmId}`);
                const privateKeyJSON = privateKeyInfo.toJSON();
                Object.assign(jwk, privateKeyJSON);
              }
              break;
            case "RSA-OAEP":
              {
                jwk.kty = "RSA";
                jwk.ext = extractable;
                jwk.key_ops = keyUsages;
                if (this.name.toLowerCase() === "safari")
                  jwk.alg = "RSA-OAEP";
                else {
                  switch ((_e = alg.hash) === null || _e === void 0 ? void 0 : _e.name.toUpperCase()) {
                    case "SHA-1":
                      jwk.alg = "RSA-OAEP";
                      break;
                    case "SHA-256":
                      jwk.alg = "RSA-OAEP-256";
                      break;
                    case "SHA-384":
                      jwk.alg = "RSA-OAEP-384";
                      break;
                    case "SHA-512":
                      jwk.alg = "RSA-OAEP-512";
                      break;
                    default:
                      throw new Error(`Incorrect hash algorithm: ${(_f = alg.hash) === null || _f === void 0 ? void 0 : _f.name.toUpperCase()}`);
                  }
                }
                const privateKeyJSON = privateKeyInfo.toJSON();
                Object.assign(jwk, privateKeyJSON);
              }
              break;
            case "RSAES-PKCS1-V1_5":
              {
                keyUsages = ["decrypt"];
                jwk.kty = "RSA";
                jwk.ext = extractable;
                jwk.key_ops = keyUsages;
                jwk.alg = "PS1";
                const privateKeyJSON = privateKeyInfo.toJSON();
                Object.assign(jwk, privateKeyJSON);
              }
              break;
            default:
              throw new Error(`Incorrect algorithm name: ${alg.name.toUpperCase()}`);
          }
        }
        break;
      case "jwk":
        jwk = keyData;
        break;
      default:
        throw new Error(`Incorrect format: ${format}`);
    }
    if (this.name.toLowerCase() === "safari") {
      try {
        return this.subtle.importKey("jwk", stringToArrayBuffer(JSON.stringify(jwk)), algorithm, extractable, keyUsages);
      } catch {
        return this.subtle.importKey("jwk", jwk, algorithm, extractable, keyUsages);
      }
    }
    return this.subtle.importKey("jwk", jwk, algorithm, extractable, keyUsages);
  }
  async exportKey(format, key) {
    let jwk = await this.subtle.exportKey("jwk", key);
    if (this.name.toLowerCase() === "safari") {
      if (jwk instanceof ArrayBuffer) {
        jwk = JSON.parse(arrayBufferToString(jwk));
      }
    }
    switch (format.toLowerCase()) {
      case "raw":
        return this.subtle.exportKey("raw", key);
      case "spki": {
        const publicKeyInfo = new PublicKeyInfo();
        try {
          publicKeyInfo.fromJSON(jwk);
        } catch (ex) {
          throw new Error("Incorrect key data");
        }
        return publicKeyInfo.toSchema().toBER(false);
      }
      case "pkcs8": {
        const privateKeyInfo = new PrivateKeyInfo();
        try {
          privateKeyInfo.fromJSON(jwk);
        } catch (ex) {
          throw new Error("Incorrect key data");
        }
        return privateKeyInfo.toSchema().toBER(false);
      }
      case "jwk":
        return jwk;
      default:
        throw new Error(`Incorrect format: ${format}`);
    }
  }
  async convert(inputFormat, outputFormat, keyData, algorithm, extractable, keyUsages) {
    if (inputFormat.toLowerCase() === outputFormat.toLowerCase()) {
      return keyData;
    }
    const key = await this.importKey(inputFormat, keyData, algorithm, extractable, keyUsages);
    return this.exportKey(outputFormat, key);
  }
  getAlgorithmByOID(oid, safety = false, target2) {
    switch (oid) {
      case "1.2.840.113549.1.1.1":
        return {
          name: "RSAES-PKCS1-v1_5"
        };
      case "1.2.840.113549.1.1.5":
        return {
          name: "RSASSA-PKCS1-v1_5",
          hash: {
            name: "SHA-1"
          }
        };
      case "1.2.840.113549.1.1.11":
        return {
          name: "RSASSA-PKCS1-v1_5",
          hash: {
            name: "SHA-256"
          }
        };
      case "1.2.840.113549.1.1.12":
        return {
          name: "RSASSA-PKCS1-v1_5",
          hash: {
            name: "SHA-384"
          }
        };
      case "1.2.840.113549.1.1.13":
        return {
          name: "RSASSA-PKCS1-v1_5",
          hash: {
            name: "SHA-512"
          }
        };
      case "1.2.840.113549.1.1.10":
        return {
          name: "RSA-PSS"
        };
      case "1.2.840.113549.1.1.7":
        return {
          name: "RSA-OAEP"
        };
      case "1.2.840.10045.2.1":
      case "1.2.840.10045.4.1":
        return {
          name: "ECDSA",
          hash: {
            name: "SHA-1"
          }
        };
      case "1.2.840.10045.4.3.2":
        return {
          name: "ECDSA",
          hash: {
            name: "SHA-256"
          }
        };
      case "1.2.840.10045.4.3.3":
        return {
          name: "ECDSA",
          hash: {
            name: "SHA-384"
          }
        };
      case "1.2.840.10045.4.3.4":
        return {
          name: "ECDSA",
          hash: {
            name: "SHA-512"
          }
        };
      case "1.3.133.16.840.63.0.2":
        return {
          name: "ECDH",
          kdf: "SHA-1"
        };
      case "1.3.132.1.11.1":
        return {
          name: "ECDH",
          kdf: "SHA-256"
        };
      case "1.3.132.1.11.2":
        return {
          name: "ECDH",
          kdf: "SHA-384"
        };
      case "1.3.132.1.11.3":
        return {
          name: "ECDH",
          kdf: "SHA-512"
        };
      case "2.16.840.1.101.3.4.1.2":
        return {
          name: "AES-CBC",
          length: 128
        };
      case "2.16.840.1.101.3.4.1.22":
        return {
          name: "AES-CBC",
          length: 192
        };
      case "2.16.840.1.101.3.4.1.42":
        return {
          name: "AES-CBC",
          length: 256
        };
      case "2.16.840.1.101.3.4.1.6":
        return {
          name: "AES-GCM",
          length: 128
        };
      case "2.16.840.1.101.3.4.1.26":
        return {
          name: "AES-GCM",
          length: 192
        };
      case "2.16.840.1.101.3.4.1.46":
        return {
          name: "AES-GCM",
          length: 256
        };
      case "2.16.840.1.101.3.4.1.4":
        return {
          name: "AES-CFB",
          length: 128
        };
      case "2.16.840.1.101.3.4.1.24":
        return {
          name: "AES-CFB",
          length: 192
        };
      case "2.16.840.1.101.3.4.1.44":
        return {
          name: "AES-CFB",
          length: 256
        };
      case "2.16.840.1.101.3.4.1.5":
        return {
          name: "AES-KW",
          length: 128
        };
      case "2.16.840.1.101.3.4.1.25":
        return {
          name: "AES-KW",
          length: 192
        };
      case "2.16.840.1.101.3.4.1.45":
        return {
          name: "AES-KW",
          length: 256
        };
      case "1.2.840.113549.2.7":
        return {
          name: "HMAC",
          hash: {
            name: "SHA-1"
          }
        };
      case "1.2.840.113549.2.9":
        return {
          name: "HMAC",
          hash: {
            name: "SHA-256"
          }
        };
      case "1.2.840.113549.2.10":
        return {
          name: "HMAC",
          hash: {
            name: "SHA-384"
          }
        };
      case "1.2.840.113549.2.11":
        return {
          name: "HMAC",
          hash: {
            name: "SHA-512"
          }
        };
      case "1.2.840.113549.1.9.16.3.5":
        return {
          name: "DH"
        };
      case "1.3.14.3.2.26":
        return {
          name: "SHA-1"
        };
      case "2.16.840.1.101.3.4.2.1":
        return {
          name: "SHA-256"
        };
      case "2.16.840.1.101.3.4.2.2":
        return {
          name: "SHA-384"
        };
      case "2.16.840.1.101.3.4.2.3":
        return {
          name: "SHA-512"
        };
      case "1.2.840.113549.1.5.12":
        return {
          name: "PBKDF2"
        };
      case "1.2.840.10045.3.1.7":
        return {
          name: "P-256"
        };
      case "1.3.132.0.34":
        return {
          name: "P-384"
        };
      case "1.3.132.0.35":
        return {
          name: "P-521"
        };
    }
    if (safety) {
      throw new Error(`Unsupported algorithm identifier ${target2 ? `for ${target2} ` : EMPTY_STRING2}: ${oid}`);
    }
    return {};
  }
  getOIDByAlgorithm(algorithm, safety = false, target2) {
    let result = EMPTY_STRING2;
    switch (algorithm.name.toUpperCase()) {
      case "RSAES-PKCS1-V1_5":
        result = "1.2.840.113549.1.1.1";
        break;
      case "RSASSA-PKCS1-V1_5":
        switch (algorithm.hash.name.toUpperCase()) {
          case "SHA-1":
            result = "1.2.840.113549.1.1.5";
            break;
          case "SHA-256":
            result = "1.2.840.113549.1.1.11";
            break;
          case "SHA-384":
            result = "1.2.840.113549.1.1.12";
            break;
          case "SHA-512":
            result = "1.2.840.113549.1.1.13";
            break;
        }
        break;
      case "RSA-PSS":
        result = "1.2.840.113549.1.1.10";
        break;
      case "RSA-OAEP":
        result = "1.2.840.113549.1.1.7";
        break;
      case "ECDSA":
        switch (algorithm.hash.name.toUpperCase()) {
          case "SHA-1":
            result = "1.2.840.10045.4.1";
            break;
          case "SHA-256":
            result = "1.2.840.10045.4.3.2";
            break;
          case "SHA-384":
            result = "1.2.840.10045.4.3.3";
            break;
          case "SHA-512":
            result = "1.2.840.10045.4.3.4";
            break;
        }
        break;
      case "ECDH":
        switch (algorithm.kdf.toUpperCase()) {
          case "SHA-1":
            result = "1.3.133.16.840.63.0.2";
            break;
          case "SHA-256":
            result = "1.3.132.1.11.1";
            break;
          case "SHA-384":
            result = "1.3.132.1.11.2";
            break;
          case "SHA-512":
            result = "1.3.132.1.11.3";
            break;
        }
        break;
      case "AES-CTR":
        break;
      case "AES-CBC":
        switch (algorithm.length) {
          case 128:
            result = "2.16.840.1.101.3.4.1.2";
            break;
          case 192:
            result = "2.16.840.1.101.3.4.1.22";
            break;
          case 256:
            result = "2.16.840.1.101.3.4.1.42";
            break;
        }
        break;
      case "AES-CMAC":
        break;
      case "AES-GCM":
        switch (algorithm.length) {
          case 128:
            result = "2.16.840.1.101.3.4.1.6";
            break;
          case 192:
            result = "2.16.840.1.101.3.4.1.26";
            break;
          case 256:
            result = "2.16.840.1.101.3.4.1.46";
            break;
        }
        break;
      case "AES-CFB":
        switch (algorithm.length) {
          case 128:
            result = "2.16.840.1.101.3.4.1.4";
            break;
          case 192:
            result = "2.16.840.1.101.3.4.1.24";
            break;
          case 256:
            result = "2.16.840.1.101.3.4.1.44";
            break;
        }
        break;
      case "AES-KW":
        switch (algorithm.length) {
          case 128:
            result = "2.16.840.1.101.3.4.1.5";
            break;
          case 192:
            result = "2.16.840.1.101.3.4.1.25";
            break;
          case 256:
            result = "2.16.840.1.101.3.4.1.45";
            break;
        }
        break;
      case "HMAC":
        switch (algorithm.hash.name.toUpperCase()) {
          case "SHA-1":
            result = "1.2.840.113549.2.7";
            break;
          case "SHA-256":
            result = "1.2.840.113549.2.9";
            break;
          case "SHA-384":
            result = "1.2.840.113549.2.10";
            break;
          case "SHA-512":
            result = "1.2.840.113549.2.11";
            break;
        }
        break;
      case "DH":
        result = "1.2.840.113549.1.9.16.3.5";
        break;
      case "SHA-1":
        result = "1.3.14.3.2.26";
        break;
      case "SHA-256":
        result = "2.16.840.1.101.3.4.2.1";
        break;
      case "SHA-384":
        result = "2.16.840.1.101.3.4.2.2";
        break;
      case "SHA-512":
        result = "2.16.840.1.101.3.4.2.3";
        break;
      case "CONCAT":
        break;
      case "HKDF":
        break;
      case "PBKDF2":
        result = "1.2.840.113549.1.5.12";
        break;
      case "P-256":
        result = "1.2.840.10045.3.1.7";
        break;
      case "P-384":
        result = "1.3.132.0.34";
        break;
      case "P-521":
        result = "1.3.132.0.35";
        break;
    }
    if (!result && safety) {
      throw new Error(`Unsupported algorithm ${target2 ? `for ${target2} ` : EMPTY_STRING2}: ${algorithm.name}`);
    }
    return result;
  }
  getAlgorithmParameters(algorithmName, operation) {
    let result = {
      algorithm: {},
      usages: []
    };
    switch (algorithmName.toUpperCase()) {
      case "RSAES-PKCS1-V1_5":
      case "RSASSA-PKCS1-V1_5":
        switch (operation.toLowerCase()) {
          case "generatekey":
            result = {
              algorithm: {
                name: "RSASSA-PKCS1-v1_5",
                modulusLength: 2048,
                publicExponent: new Uint8Array([1, 0, 1]),
                hash: {
                  name: "SHA-256"
                }
              },
              usages: ["sign", "verify"]
            };
            break;
          case "verify":
          case "sign":
          case "importkey":
            result = {
              algorithm: {
                name: "RSASSA-PKCS1-v1_5",
                hash: {
                  name: "SHA-256"
                }
              },
              usages: ["verify"]
            };
            break;
          case "exportkey":
          default:
            return {
              algorithm: {
                name: "RSASSA-PKCS1-v1_5"
              },
              usages: []
            };
        }
        break;
      case "RSA-PSS":
        switch (operation.toLowerCase()) {
          case "sign":
          case "verify":
            result = {
              algorithm: {
                name: "RSA-PSS",
                hash: {
                  name: "SHA-1"
                },
                saltLength: 20
              },
              usages: ["sign", "verify"]
            };
            break;
          case "generatekey":
            result = {
              algorithm: {
                name: "RSA-PSS",
                modulusLength: 2048,
                publicExponent: new Uint8Array([1, 0, 1]),
                hash: {
                  name: "SHA-1"
                }
              },
              usages: ["sign", "verify"]
            };
            break;
          case "importkey":
            result = {
              algorithm: {
                name: "RSA-PSS",
                hash: {
                  name: "SHA-1"
                }
              },
              usages: ["verify"]
            };
            break;
          case "exportkey":
          default:
            return {
              algorithm: {
                name: "RSA-PSS"
              },
              usages: []
            };
        }
        break;
      case "RSA-OAEP":
        switch (operation.toLowerCase()) {
          case "encrypt":
          case "decrypt":
            result = {
              algorithm: {
                name: "RSA-OAEP"
              },
              usages: ["encrypt", "decrypt"]
            };
            break;
          case "generatekey":
            result = {
              algorithm: {
                name: "RSA-OAEP",
                modulusLength: 2048,
                publicExponent: new Uint8Array([1, 0, 1]),
                hash: {
                  name: "SHA-256"
                }
              },
              usages: ["encrypt", "decrypt", "wrapKey", "unwrapKey"]
            };
            break;
          case "importkey":
            result = {
              algorithm: {
                name: "RSA-OAEP",
                hash: {
                  name: "SHA-256"
                }
              },
              usages: ["encrypt"]
            };
            break;
          case "exportkey":
          default:
            return {
              algorithm: {
                name: "RSA-OAEP"
              },
              usages: []
            };
        }
        break;
      case "ECDSA":
        switch (operation.toLowerCase()) {
          case "generatekey":
            result = {
              algorithm: {
                name: "ECDSA",
                namedCurve: "P-256"
              },
              usages: ["sign", "verify"]
            };
            break;
          case "importkey":
            result = {
              algorithm: {
                name: "ECDSA",
                namedCurve: "P-256"
              },
              usages: ["verify"]
            };
            break;
          case "verify":
          case "sign":
            result = {
              algorithm: {
                name: "ECDSA",
                hash: {
                  name: "SHA-256"
                }
              },
              usages: ["sign"]
            };
            break;
          default:
            return {
              algorithm: {
                name: "ECDSA"
              },
              usages: []
            };
        }
        break;
      case "ECDH":
        switch (operation.toLowerCase()) {
          case "exportkey":
          case "importkey":
          case "generatekey":
            result = {
              algorithm: {
                name: "ECDH",
                namedCurve: "P-256"
              },
              usages: ["deriveKey", "deriveBits"]
            };
            break;
          case "derivekey":
          case "derivebits":
            result = {
              algorithm: {
                name: "ECDH",
                namedCurve: "P-256",
                public: []
              },
              usages: ["encrypt", "decrypt"]
            };
            break;
          default:
            return {
              algorithm: {
                name: "ECDH"
              },
              usages: []
            };
        }
        break;
      case "AES-CTR":
        switch (operation.toLowerCase()) {
          case "importkey":
          case "exportkey":
          case "generatekey":
            result = {
              algorithm: {
                name: "AES-CTR",
                length: 256
              },
              usages: ["encrypt", "decrypt", "wrapKey", "unwrapKey"]
            };
            break;
          case "decrypt":
          case "encrypt":
            result = {
              algorithm: {
                name: "AES-CTR",
                counter: new Uint8Array(16),
                length: 10
              },
              usages: ["encrypt", "decrypt", "wrapKey", "unwrapKey"]
            };
            break;
          default:
            return {
              algorithm: {
                name: "AES-CTR"
              },
              usages: []
            };
        }
        break;
      case "AES-CBC":
        switch (operation.toLowerCase()) {
          case "importkey":
          case "exportkey":
          case "generatekey":
            result = {
              algorithm: {
                name: "AES-CBC",
                length: 256
              },
              usages: ["encrypt", "decrypt", "wrapKey", "unwrapKey"]
            };
            break;
          case "decrypt":
          case "encrypt":
            result = {
              algorithm: {
                name: "AES-CBC",
                iv: this.getRandomValues(new Uint8Array(16))
              },
              usages: ["encrypt", "decrypt", "wrapKey", "unwrapKey"]
            };
            break;
          default:
            return {
              algorithm: {
                name: "AES-CBC"
              },
              usages: []
            };
        }
        break;
      case "AES-GCM":
        switch (operation.toLowerCase()) {
          case "importkey":
          case "exportkey":
          case "generatekey":
            result = {
              algorithm: {
                name: "AES-GCM",
                length: 256
              },
              usages: ["encrypt", "decrypt", "wrapKey", "unwrapKey"]
            };
            break;
          case "decrypt":
          case "encrypt":
            result = {
              algorithm: {
                name: "AES-GCM",
                iv: this.getRandomValues(new Uint8Array(16))
              },
              usages: ["encrypt", "decrypt", "wrapKey", "unwrapKey"]
            };
            break;
          default:
            return {
              algorithm: {
                name: "AES-GCM"
              },
              usages: []
            };
        }
        break;
      case "AES-KW":
        switch (operation.toLowerCase()) {
          case "importkey":
          case "exportkey":
          case "generatekey":
          case "wrapkey":
          case "unwrapkey":
            result = {
              algorithm: {
                name: "AES-KW",
                length: 256
              },
              usages: ["wrapKey", "unwrapKey"]
            };
            break;
          default:
            return {
              algorithm: {
                name: "AES-KW"
              },
              usages: []
            };
        }
        break;
      case "HMAC":
        switch (operation.toLowerCase()) {
          case "sign":
          case "verify":
            result = {
              algorithm: {
                name: "HMAC"
              },
              usages: ["sign", "verify"]
            };
            break;
          case "importkey":
          case "exportkey":
          case "generatekey":
            result = {
              algorithm: {
                name: "HMAC",
                length: 32,
                hash: {
                  name: "SHA-256"
                }
              },
              usages: ["sign", "verify"]
            };
            break;
          default:
            return {
              algorithm: {
                name: "HMAC"
              },
              usages: []
            };
        }
        break;
      case "HKDF":
        switch (operation.toLowerCase()) {
          case "derivekey":
            result = {
              algorithm: {
                name: "HKDF",
                hash: "SHA-256",
                salt: new Uint8Array([]),
                info: new Uint8Array([])
              },
              usages: ["encrypt", "decrypt"]
            };
            break;
          default:
            return {
              algorithm: {
                name: "HKDF"
              },
              usages: []
            };
        }
        break;
      case "PBKDF2":
        switch (operation.toLowerCase()) {
          case "derivekey":
            result = {
              algorithm: {
                name: "PBKDF2",
                hash: { name: "SHA-256" },
                salt: new Uint8Array([]),
                iterations: 1e4
              },
              usages: ["encrypt", "decrypt"]
            };
            break;
          default:
            return {
              algorithm: {
                name: "PBKDF2"
              },
              usages: []
            };
        }
        break;
    }
    return result;
  }
  getHashAlgorithm(signatureAlgorithm) {
    let result = EMPTY_STRING2;
    switch (signatureAlgorithm.algorithmId) {
      case "1.2.840.10045.4.1":
      case "1.2.840.113549.1.1.5":
        result = "SHA-1";
        break;
      case "1.2.840.10045.4.3.2":
      case "1.2.840.113549.1.1.11":
        result = "SHA-256";
        break;
      case "1.2.840.10045.4.3.3":
      case "1.2.840.113549.1.1.12":
        result = "SHA-384";
        break;
      case "1.2.840.10045.4.3.4":
      case "1.2.840.113549.1.1.13":
        result = "SHA-512";
        break;
      case "1.2.840.113549.1.1.10":
        {
          try {
            const params = new RSASSAPSSParams({ schema: signatureAlgorithm.algorithmParams });
            if (params.hashAlgorithm) {
              const algorithm = this.getAlgorithmByOID(params.hashAlgorithm.algorithmId);
              if ("name" in algorithm) {
                result = algorithm.name;
              } else {
                return EMPTY_STRING2;
              }
            } else
              result = "SHA-1";
          } catch {
          }
        }
        break;
    }
    return result;
  }
  async encryptEncryptedContentInfo(parameters) {
    ParameterError.assert(parameters, "password", "contentEncryptionAlgorithm", "hmacHashAlgorithm", "iterationCount", "contentToEncrypt", "contentToEncrypt", "contentType");
    const contentEncryptionOID = this.getOIDByAlgorithm(parameters.contentEncryptionAlgorithm, true, "contentEncryptionAlgorithm");
    const pbkdf2OID = this.getOIDByAlgorithm({
      name: "PBKDF2"
    }, true, "PBKDF2");
    const hmacOID = this.getOIDByAlgorithm({
      name: "HMAC",
      hash: {
        name: parameters.hmacHashAlgorithm
      }
    }, true, "hmacHashAlgorithm");
    const ivBuffer = new ArrayBuffer(16);
    const ivView = new Uint8Array(ivBuffer);
    this.getRandomValues(ivView);
    const saltBuffer = new ArrayBuffer(64);
    const saltView = new Uint8Array(saltBuffer);
    this.getRandomValues(saltView);
    const contentView = new Uint8Array(parameters.contentToEncrypt);
    const pbkdf2Params = new PBKDF2Params({
      salt: new OctetString({ valueHex: saltBuffer }),
      iterationCount: parameters.iterationCount,
      prf: new AlgorithmIdentifier({
        algorithmId: hmacOID,
        algorithmParams: new Null()
      })
    });
    const passwordView = new Uint8Array(parameters.password);
    const pbkdfKey = await this.importKey("raw", passwordView, "PBKDF2", false, ["deriveKey"]);
    const derivedKey = await this.deriveKey({
      name: "PBKDF2",
      hash: {
        name: parameters.hmacHashAlgorithm
      },
      salt: saltView,
      iterations: parameters.iterationCount
    }, pbkdfKey, parameters.contentEncryptionAlgorithm, false, ["encrypt"]);
    const encryptedData = await this.encrypt({
      name: parameters.contentEncryptionAlgorithm.name,
      iv: ivView
    }, derivedKey, contentView);
    const pbes2Parameters = new PBES2Params({
      keyDerivationFunc: new AlgorithmIdentifier({
        algorithmId: pbkdf2OID,
        algorithmParams: pbkdf2Params.toSchema()
      }),
      encryptionScheme: new AlgorithmIdentifier({
        algorithmId: contentEncryptionOID,
        algorithmParams: new OctetString({ valueHex: ivBuffer })
      })
    });
    return new EncryptedContentInfo({
      contentType: parameters.contentType,
      contentEncryptionAlgorithm: new AlgorithmIdentifier({
        algorithmId: "1.2.840.113549.1.5.13",
        algorithmParams: pbes2Parameters.toSchema()
      }),
      encryptedContent: new OctetString({ valueHex: encryptedData })
    });
  }
  async decryptEncryptedContentInfo(parameters) {
    ParameterError.assert(parameters, "password", "encryptedContentInfo");
    if (parameters.encryptedContentInfo.contentEncryptionAlgorithm.algorithmId !== "1.2.840.113549.1.5.13")
      throw new Error(`Unknown "contentEncryptionAlgorithm": ${parameters.encryptedContentInfo.contentEncryptionAlgorithm.algorithmId}`);
    let pbes2Parameters;
    try {
      pbes2Parameters = new PBES2Params({ schema: parameters.encryptedContentInfo.contentEncryptionAlgorithm.algorithmParams });
    } catch (ex) {
      throw new Error('Incorrectly encoded "pbes2Parameters"');
    }
    let pbkdf2Params;
    try {
      pbkdf2Params = new PBKDF2Params({ schema: pbes2Parameters.keyDerivationFunc.algorithmParams });
    } catch (ex) {
      throw new Error('Incorrectly encoded "pbkdf2Params"');
    }
    const contentEncryptionAlgorithm = this.getAlgorithmByOID(pbes2Parameters.encryptionScheme.algorithmId, true);
    const ivBuffer = pbes2Parameters.encryptionScheme.algorithmParams.valueBlock.valueHex;
    const ivView = new Uint8Array(ivBuffer);
    const saltBuffer = pbkdf2Params.salt.valueBlock.valueHex;
    const saltView = new Uint8Array(saltBuffer);
    const iterationCount = pbkdf2Params.iterationCount;
    let hmacHashAlgorithm = "SHA-1";
    if (pbkdf2Params.prf) {
      const algorithm = this.getAlgorithmByOID(pbkdf2Params.prf.algorithmId, true);
      hmacHashAlgorithm = algorithm.hash.name;
    }
    const pbkdfKey = await this.importKey("raw", parameters.password, "PBKDF2", false, ["deriveKey"]);
    const result = await this.deriveKey({
      name: "PBKDF2",
      hash: {
        name: hmacHashAlgorithm
      },
      salt: saltView,
      iterations: iterationCount
    }, pbkdfKey, contentEncryptionAlgorithm, false, ["decrypt"]);
    const dataBuffer = parameters.encryptedContentInfo.getEncryptedContent();
    return this.decrypt({
      name: contentEncryptionAlgorithm.name,
      iv: ivView
    }, result, dataBuffer);
  }
  async stampDataWithPassword(parameters) {
    if (parameters instanceof Object === false)
      throw new Error('Parameters must have type "Object"');
    ParameterError.assert(parameters, "password", "hashAlgorithm", "iterationCount", "salt", "contentToStamp");
    let length;
    switch (parameters.hashAlgorithm.toLowerCase()) {
      case "sha-1":
        length = 160;
        break;
      case "sha-256":
        length = 256;
        break;
      case "sha-384":
        length = 384;
        break;
      case "sha-512":
        length = 512;
        break;
      default:
        throw new Error(`Incorrect "parameters.hashAlgorithm" parameter: ${parameters.hashAlgorithm}`);
    }
    const hmacAlgorithm = {
      name: "HMAC",
      length,
      hash: {
        name: parameters.hashAlgorithm
      }
    };
    const pkcsKey = await makePKCS12B2Key(this, parameters.hashAlgorithm, length, parameters.password, parameters.salt, parameters.iterationCount);
    const hmacKey = await this.importKey("raw", new Uint8Array(pkcsKey), hmacAlgorithm, false, ["sign"]);
    return this.sign(hmacAlgorithm, hmacKey, new Uint8Array(parameters.contentToStamp));
  }
  async verifyDataStampedWithPassword(parameters) {
    ParameterError.assert(parameters, "password", "hashAlgorithm", "salt", "iterationCount", "contentToVerify", "signatureToVerify");
    let length = 0;
    switch (parameters.hashAlgorithm.toLowerCase()) {
      case "sha-1":
        length = 160;
        break;
      case "sha-256":
        length = 256;
        break;
      case "sha-384":
        length = 384;
        break;
      case "sha-512":
        length = 512;
        break;
      default:
        throw new Error(`Incorrect "parameters.hashAlgorithm" parameter: ${parameters.hashAlgorithm}`);
    }
    const hmacAlgorithm = {
      name: "HMAC",
      length,
      hash: {
        name: parameters.hashAlgorithm
      }
    };
    const pkcsKey = await makePKCS12B2Key(this, parameters.hashAlgorithm, length, parameters.password, parameters.salt, parameters.iterationCount);
    const hmacKey = await this.importKey("raw", new Uint8Array(pkcsKey), hmacAlgorithm, false, ["verify"]);
    return this.verify(hmacAlgorithm, hmacKey, new Uint8Array(parameters.signatureToVerify), new Uint8Array(parameters.contentToVerify));
  }
  async getSignatureParameters(privateKey, hashAlgorithm = "SHA-1") {
    this.getOIDByAlgorithm({ name: hashAlgorithm }, true, "hashAlgorithm");
    const signatureAlgorithm = new AlgorithmIdentifier();
    const parameters = this.getAlgorithmParameters(privateKey.algorithm.name, "sign");
    if (!Object.keys(parameters.algorithm).length) {
      throw new Error("Parameter 'algorithm' is empty");
    }
    const algorithm = parameters.algorithm;
    algorithm.hash.name = hashAlgorithm;
    switch (privateKey.algorithm.name.toUpperCase()) {
      case "RSASSA-PKCS1-V1_5":
      case "ECDSA":
        signatureAlgorithm.algorithmId = this.getOIDByAlgorithm(algorithm, true);
        break;
      case "RSA-PSS":
        {
          switch (hashAlgorithm.toUpperCase()) {
            case "SHA-256":
              algorithm.saltLength = 32;
              break;
            case "SHA-384":
              algorithm.saltLength = 48;
              break;
            case "SHA-512":
              algorithm.saltLength = 64;
              break;
          }
          const paramsObject = {};
          if (hashAlgorithm.toUpperCase() !== "SHA-1") {
            const hashAlgorithmOID = this.getOIDByAlgorithm({ name: hashAlgorithm }, true, "hashAlgorithm");
            paramsObject.hashAlgorithm = new AlgorithmIdentifier({
              algorithmId: hashAlgorithmOID,
              algorithmParams: new Null()
            });
            paramsObject.maskGenAlgorithm = new AlgorithmIdentifier({
              algorithmId: "1.2.840.113549.1.1.8",
              algorithmParams: paramsObject.hashAlgorithm.toSchema()
            });
          }
          if (algorithm.saltLength !== 20)
            paramsObject.saltLength = algorithm.saltLength;
          const pssParameters = new RSASSAPSSParams(paramsObject);
          signatureAlgorithm.algorithmId = "1.2.840.113549.1.1.10";
          signatureAlgorithm.algorithmParams = pssParameters.toSchema();
        }
        break;
      default:
        throw new Error(`Unsupported signature algorithm: ${privateKey.algorithm.name}`);
    }
    return {
      signatureAlgorithm,
      parameters
    };
  }
  async signWithPrivateKey(data, privateKey, parameters) {
    const signature = await this.sign(parameters.algorithm, privateKey, data);
    if (parameters.algorithm.name === "ECDSA") {
      return createCMSECDSASignature(signature);
    }
    return signature;
  }
  fillPublicKeyParameters(publicKeyInfo, signatureAlgorithm) {
    const parameters = {};
    const shaAlgorithm = this.getHashAlgorithm(signatureAlgorithm);
    if (shaAlgorithm === EMPTY_STRING2)
      throw new Error(`Unsupported signature algorithm: ${signatureAlgorithm.algorithmId}`);
    let algorithmId;
    if (signatureAlgorithm.algorithmId === "1.2.840.113549.1.1.10")
      algorithmId = signatureAlgorithm.algorithmId;
    else
      algorithmId = publicKeyInfo.algorithm.algorithmId;
    const algorithmObject = this.getAlgorithmByOID(algorithmId, true);
    parameters.algorithm = this.getAlgorithmParameters(algorithmObject.name, "importKey");
    if ("hash" in parameters.algorithm.algorithm)
      parameters.algorithm.algorithm.hash.name = shaAlgorithm;
    if (algorithmObject.name === "ECDSA") {
      const publicKeyAlgorithm = publicKeyInfo.algorithm;
      if (!publicKeyAlgorithm.algorithmParams) {
        throw new Error("Algorithm parameters for ECDSA public key are missed");
      }
      const publicKeyAlgorithmParams = publicKeyAlgorithm.algorithmParams;
      if ("idBlock" in publicKeyAlgorithm.algorithmParams) {
        if (!(publicKeyAlgorithmParams.idBlock.tagClass === 1 && publicKeyAlgorithmParams.idBlock.tagNumber === 6)) {
          throw new Error("Incorrect type for ECDSA public key parameters");
        }
      }
      const curveObject = this.getAlgorithmByOID(publicKeyAlgorithmParams.valueBlock.toString(), true);
      parameters.algorithm.algorithm.namedCurve = curveObject.name;
    }
    return parameters;
  }
  async getPublicKey(publicKeyInfo, signatureAlgorithm, parameters) {
    if (!parameters) {
      parameters = this.fillPublicKeyParameters(publicKeyInfo, signatureAlgorithm);
    }
    const publicKeyInfoBuffer = publicKeyInfo.toSchema().toBER(false);
    return this.importKey("spki", publicKeyInfoBuffer, parameters.algorithm.algorithm, true, parameters.algorithm.usages);
  }
  async verifyWithPublicKey(data, signature, publicKeyInfo, signatureAlgorithm, shaAlgorithm) {
    let publicKey;
    if (!shaAlgorithm) {
      shaAlgorithm = this.getHashAlgorithm(signatureAlgorithm);
      if (!shaAlgorithm)
        throw new Error(`Unsupported signature algorithm: ${signatureAlgorithm.algorithmId}`);
      publicKey = await this.getPublicKey(publicKeyInfo, signatureAlgorithm);
    } else {
      const parameters = {};
      let algorithmId;
      if (signatureAlgorithm.algorithmId === "1.2.840.113549.1.1.10")
        algorithmId = signatureAlgorithm.algorithmId;
      else
        algorithmId = publicKeyInfo.algorithm.algorithmId;
      const algorithmObject = this.getAlgorithmByOID(algorithmId, true);
      parameters.algorithm = this.getAlgorithmParameters(algorithmObject.name, "importKey");
      if ("hash" in parameters.algorithm.algorithm)
        parameters.algorithm.algorithm.hash.name = shaAlgorithm;
      if (algorithmObject.name === "ECDSA") {
        let algorithmParamsChecked = false;
        if ("algorithmParams" in publicKeyInfo.algorithm === true) {
          if ("idBlock" in publicKeyInfo.algorithm.algorithmParams) {
            if (publicKeyInfo.algorithm.algorithmParams.idBlock.tagClass === 1 && publicKeyInfo.algorithm.algorithmParams.idBlock.tagNumber === 6)
              algorithmParamsChecked = true;
          }
        }
        if (algorithmParamsChecked === false) {
          throw new Error("Incorrect type for ECDSA public key parameters");
        }
        const curveObject = this.getAlgorithmByOID(publicKeyInfo.algorithm.algorithmParams.valueBlock.toString(), true);
        parameters.algorithm.algorithm.namedCurve = curveObject.name;
      }
      publicKey = await this.getPublicKey(publicKeyInfo, null, parameters);
    }
    const algorithm = this.getAlgorithmParameters(publicKey.algorithm.name, "verify");
    if ("hash" in algorithm.algorithm)
      algorithm.algorithm.hash.name = shaAlgorithm;
    let signatureValue = signature.valueBlock.valueHexView;
    if (publicKey.algorithm.name === "ECDSA") {
      const namedCurve = ECNamedCurves.find(publicKey.algorithm.namedCurve);
      if (!namedCurve) {
        throw new Error("Unsupported named curve in use");
      }
      const asn1 = fromBER(signatureValue);
      AsnError.assert(asn1, "Signature value");
      signatureValue = createECDSASignatureFromCMS(asn1.result, namedCurve.size);
    }
    if (publicKey.algorithm.name === "RSA-PSS") {
      const pssParameters = new RSASSAPSSParams({ schema: signatureAlgorithm.algorithmParams });
      if ("saltLength" in pssParameters)
        algorithm.algorithm.saltLength = pssParameters.saltLength;
      else
        algorithm.algorithm.saltLength = 20;
      let hashAlgo = "SHA-1";
      if ("hashAlgorithm" in pssParameters) {
        const hashAlgorithm = this.getAlgorithmByOID(pssParameters.hashAlgorithm.algorithmId, true);
        hashAlgo = hashAlgorithm.name;
      }
      algorithm.algorithm.hash.name = hashAlgo;
    }
    return this.verify(algorithm.algorithm, publicKey, signatureValue, data);
  }
};
var engine = {
  name: "none",
  crypto: null
};
function isCryptoEngine(engine2) {
  return engine2 && typeof engine2 === "object" && "crypto" in engine2 ? true : false;
}
function setEngine(name, ...args) {
  let crypto2 = null;
  if (args.length < 2) {
    if (args.length) {
      crypto2 = args[0];
    } else {
      crypto2 = typeof self !== "undefined" && self.crypto ? new CryptoEngine({ name: "browser", crypto: self.crypto }) : null;
    }
  } else {
    const cryptoArg = args[0];
    const subtleArg = args[1];
    if (isCryptoEngine(subtleArg)) {
      crypto2 = subtleArg;
    } else if (isCryptoEngine(cryptoArg)) {
      crypto2 = cryptoArg;
    } else if ("subtle" in cryptoArg && "getRandomValues" in cryptoArg) {
      crypto2 = new CryptoEngine({
        crypto: cryptoArg
      });
    }
  }
  if (typeof process !== "undefined" && "pid" in process && typeof global !== "undefined" && typeof window === "undefined") {
    if (typeof global[process.pid] === "undefined") {
      global[process.pid] = {};
    } else {
      if (typeof global[process.pid] !== "object") {
        throw new Error(`Name global.${process.pid} already exists and it is not an object`);
      }
    }
    if (typeof global[process.pid].pkijs === "undefined") {
      global[process.pid].pkijs = {};
    } else {
      if (typeof global[process.pid].pkijs !== "object") {
        throw new Error(`Name global.${process.pid}.pkijs already exists and it is not an object`);
      }
    }
    global[process.pid].pkijs.engine = {
      name,
      crypto: crypto2
    };
  } else {
    engine = {
      name,
      crypto: crypto2
    };
  }
}
function getEngine() {
  if (typeof process !== "undefined" && "pid" in process && typeof global !== "undefined" && typeof window === "undefined") {
    let _engine;
    try {
      _engine = global[process.pid].pkijs.engine;
    } catch (ex) {
      throw new Error("Please call 'setEngine' before call to 'getEngine'");
    }
    return _engine;
  }
  return engine;
}
function getCrypto(safety = false) {
  const _engine = getEngine();
  if (!_engine.crypto && safety) {
    throw new Error("Unable to create WebCrypto object");
  }
  return _engine.crypto;
}
function getRandomValues(view) {
  return getCrypto(true).getRandomValues(view);
}
function getOIDByAlgorithm(algorithm, safety, target2) {
  return getCrypto(true).getOIDByAlgorithm(algorithm, safety, target2);
}
function getAlgorithmParameters(algorithmName, operation) {
  return getCrypto(true).getAlgorithmParameters(algorithmName, operation);
}
function createCMSECDSASignature(signatureBuffer) {
  if (signatureBuffer.byteLength % 2 !== 0)
    return EMPTY_BUFFER2;
  const length = signatureBuffer.byteLength / 2;
  const rBuffer = new ArrayBuffer(length);
  const rView = new Uint8Array(rBuffer);
  rView.set(new Uint8Array(signatureBuffer, 0, length));
  const rInteger = new Integer({ valueHex: rBuffer });
  const sBuffer = new ArrayBuffer(length);
  const sView = new Uint8Array(sBuffer);
  sView.set(new Uint8Array(signatureBuffer, length, length));
  const sInteger = new Integer({ valueHex: sBuffer });
  return new Sequence({
    value: [
      rInteger.convertToDER(),
      sInteger.convertToDER()
    ]
  }).toBER(false);
}
function createECDSASignatureFromCMS(cmsSignature, pointSize) {
  if (!(cmsSignature instanceof Sequence && cmsSignature.valueBlock.value.length === 2 && cmsSignature.valueBlock.value[0] instanceof Integer && cmsSignature.valueBlock.value[1] instanceof Integer))
    return EMPTY_BUFFER2;
  const rValueView = cmsSignature.valueBlock.value[0].convertFromDER().valueBlock.valueHexView;
  const sValueView = cmsSignature.valueBlock.value[1].convertFromDER().valueBlock.valueHexView;
  const res = new Uint8Array(pointSize * 2);
  res.set(rValueView, pointSize - rValueView.byteLength);
  res.set(sValueView, 2 * pointSize - sValueView.byteLength);
  return res.buffer;
}
function getAlgorithmByOID(oid, safety = false, target2) {
  return getCrypto(true).getAlgorithmByOID(oid, safety, target2);
}
function getHashAlgorithm(signatureAlgorithm) {
  return getCrypto(true).getHashAlgorithm(signatureAlgorithm);
}
async function kdfWithCounter(hashFunction, zBuffer, Counter, SharedInfo, crypto2) {
  switch (hashFunction.toUpperCase()) {
    case "SHA-1":
    case "SHA-256":
    case "SHA-384":
    case "SHA-512":
      break;
    default:
      throw new ArgumentError(`Unknown hash function: ${hashFunction}`);
  }
  ArgumentError.assert(zBuffer, "zBuffer", "ArrayBuffer");
  if (zBuffer.byteLength === 0)
    throw new ArgumentError("'zBuffer' has zero length, error");
  ArgumentError.assert(SharedInfo, "SharedInfo", "ArrayBuffer");
  if (Counter > 255)
    throw new ArgumentError("Please set 'Counter' argument to value less or equal to 255");
  const counterBuffer = new ArrayBuffer(4);
  const counterView = new Uint8Array(counterBuffer);
  counterView[0] = 0;
  counterView[1] = 0;
  counterView[2] = 0;
  counterView[3] = Counter;
  let combinedBuffer = EMPTY_BUFFER2;
  combinedBuffer = utilConcatBuf(combinedBuffer, zBuffer);
  combinedBuffer = utilConcatBuf(combinedBuffer, counterBuffer);
  combinedBuffer = utilConcatBuf(combinedBuffer, SharedInfo);
  const result = await crypto2.digest({ name: hashFunction }, combinedBuffer);
  return {
    counter: Counter,
    result
  };
}
async function kdf(hashFunction, Zbuffer, keydatalen, SharedInfo, crypto2 = getCrypto(true)) {
  let hashLength = 0;
  let maxCounter = 1;
  switch (hashFunction.toUpperCase()) {
    case "SHA-1":
      hashLength = 160;
      break;
    case "SHA-256":
      hashLength = 256;
      break;
    case "SHA-384":
      hashLength = 384;
      break;
    case "SHA-512":
      hashLength = 512;
      break;
    default:
      throw new ArgumentError(`Unknown hash function: ${hashFunction}`);
  }
  ArgumentError.assert(Zbuffer, "Zbuffer", "ArrayBuffer");
  if (Zbuffer.byteLength === 0)
    throw new ArgumentError("'Zbuffer' has zero length, error");
  ArgumentError.assert(SharedInfo, "SharedInfo", "ArrayBuffer");
  const quotient = keydatalen / hashLength;
  if (Math.floor(quotient) > 0) {
    maxCounter = Math.floor(quotient);
    if (quotient - maxCounter > 0)
      maxCounter++;
  }
  const incomingResult = [];
  for (let i = 1; i <= maxCounter; i++)
    incomingResult.push(await kdfWithCounter(hashFunction, Zbuffer, i, SharedInfo, crypto2));
  let combinedBuffer = EMPTY_BUFFER2;
  let currentCounter = 1;
  let found = true;
  while (found) {
    found = false;
    for (const result of incomingResult) {
      if (result.counter === currentCounter) {
        combinedBuffer = utilConcatBuf(combinedBuffer, result.result);
        found = true;
        break;
      }
    }
    currentCounter++;
  }
  keydatalen >>= 3;
  if (combinedBuffer.byteLength > keydatalen) {
    const newBuffer = new ArrayBuffer(keydatalen);
    const newView = new Uint8Array(newBuffer);
    const combinedView = new Uint8Array(combinedBuffer);
    for (let i = 0; i < keydatalen; i++)
      newView[i] = combinedView[i];
    return newBuffer;
  }
  return combinedBuffer;
}
var VERSION$i = "version";
var LOG_ID = "logID";
var EXTENSIONS$6 = "extensions";
var TIMESTAMP = "timestamp";
var HASH_ALGORITHM$3 = "hashAlgorithm";
var SIGNATURE_ALGORITHM$8 = "signatureAlgorithm";
var SIGNATURE$7 = "signature";
var NONE = "none";
var MD5 = "md5";
var SHA1 = "sha1";
var SHA224 = "sha224";
var SHA256 = "sha256";
var SHA384 = "sha384";
var SHA512 = "sha512";
var ANONYMOUS = "anonymous";
var RSA = "rsa";
var DSA = "dsa";
var ECDSA = "ecdsa";
var SignedCertificateTimestamp = class _SignedCertificateTimestamp extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.version = getParametersValue(parameters, VERSION$i, _SignedCertificateTimestamp.defaultValues(VERSION$i));
    this.logID = getParametersValue(parameters, LOG_ID, _SignedCertificateTimestamp.defaultValues(LOG_ID));
    this.timestamp = getParametersValue(parameters, TIMESTAMP, _SignedCertificateTimestamp.defaultValues(TIMESTAMP));
    this.extensions = getParametersValue(parameters, EXTENSIONS$6, _SignedCertificateTimestamp.defaultValues(EXTENSIONS$6));
    this.hashAlgorithm = getParametersValue(parameters, HASH_ALGORITHM$3, _SignedCertificateTimestamp.defaultValues(HASH_ALGORITHM$3));
    this.signatureAlgorithm = getParametersValue(parameters, SIGNATURE_ALGORITHM$8, _SignedCertificateTimestamp.defaultValues(SIGNATURE_ALGORITHM$8));
    this.signature = getParametersValue(parameters, SIGNATURE$7, _SignedCertificateTimestamp.defaultValues(SIGNATURE$7));
    if ("stream" in parameters && parameters.stream) {
      this.fromStream(parameters.stream);
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case VERSION$i:
        return 0;
      case LOG_ID:
      case EXTENSIONS$6:
        return EMPTY_BUFFER2;
      case TIMESTAMP:
        return /* @__PURE__ */ new Date(0);
      case HASH_ALGORITHM$3:
      case SIGNATURE_ALGORITHM$8:
        return EMPTY_STRING2;
      case SIGNATURE$7:
        return new Any();
      default:
        return super.defaultValues(memberName);
    }
  }
  fromSchema(schema) {
    if (schema instanceof RawData === false)
      throw new Error("Object's schema was not verified against input data for SignedCertificateTimestamp");
    const seqStream = new SeqStream({
      stream: new ByteStream({
        buffer: schema.data
      })
    });
    this.fromStream(seqStream);
  }
  fromStream(stream) {
    const blockLength = stream.getUint16();
    this.version = stream.getBlock(1)[0];
    if (this.version === 0) {
      this.logID = new Uint8Array(stream.getBlock(32)).buffer.slice(0);
      this.timestamp = new Date(utilFromBase(new Uint8Array(stream.getBlock(8)), 8));
      const extensionsLength = stream.getUint16();
      this.extensions = new Uint8Array(stream.getBlock(extensionsLength)).buffer.slice(0);
      switch (stream.getBlock(1)[0]) {
        case 0:
          this.hashAlgorithm = NONE;
          break;
        case 1:
          this.hashAlgorithm = MD5;
          break;
        case 2:
          this.hashAlgorithm = SHA1;
          break;
        case 3:
          this.hashAlgorithm = SHA224;
          break;
        case 4:
          this.hashAlgorithm = SHA256;
          break;
        case 5:
          this.hashAlgorithm = SHA384;
          break;
        case 6:
          this.hashAlgorithm = SHA512;
          break;
        default:
          throw new Error("Object's stream was not correct for SignedCertificateTimestamp");
      }
      switch (stream.getBlock(1)[0]) {
        case 0:
          this.signatureAlgorithm = ANONYMOUS;
          break;
        case 1:
          this.signatureAlgorithm = RSA;
          break;
        case 2:
          this.signatureAlgorithm = DSA;
          break;
        case 3:
          this.signatureAlgorithm = ECDSA;
          break;
        default:
          throw new Error("Object's stream was not correct for SignedCertificateTimestamp");
      }
      const signatureLength = stream.getUint16();
      const signatureData = new Uint8Array(stream.getBlock(signatureLength)).buffer.slice(0);
      const asn1 = fromBER(signatureData);
      AsnError.assert(asn1, "SignedCertificateTimestamp");
      this.signature = asn1.result;
      if (blockLength !== 47 + extensionsLength + signatureLength) {
        throw new Error("Object's stream was not correct for SignedCertificateTimestamp");
      }
    }
  }
  toSchema() {
    const stream = this.toStream();
    return new RawData({ data: stream.stream.buffer });
  }
  toStream() {
    const stream = new SeqStream();
    stream.appendUint16(47 + this.extensions.byteLength + this.signature.valueBeforeDecodeView.byteLength);
    stream.appendChar(this.version);
    stream.appendView(new Uint8Array(this.logID));
    const timeBuffer = new ArrayBuffer(8);
    const timeView = new Uint8Array(timeBuffer);
    const baseArray = utilToBase(this.timestamp.valueOf(), 8);
    timeView.set(new Uint8Array(baseArray), 8 - baseArray.byteLength);
    stream.appendView(timeView);
    stream.appendUint16(this.extensions.byteLength);
    if (this.extensions.byteLength)
      stream.appendView(new Uint8Array(this.extensions));
    let _hashAlgorithm;
    switch (this.hashAlgorithm.toLowerCase()) {
      case NONE:
        _hashAlgorithm = 0;
        break;
      case MD5:
        _hashAlgorithm = 1;
        break;
      case SHA1:
        _hashAlgorithm = 2;
        break;
      case SHA224:
        _hashAlgorithm = 3;
        break;
      case SHA256:
        _hashAlgorithm = 4;
        break;
      case SHA384:
        _hashAlgorithm = 5;
        break;
      case SHA512:
        _hashAlgorithm = 6;
        break;
      default:
        throw new Error(`Incorrect data for hashAlgorithm: ${this.hashAlgorithm}`);
    }
    stream.appendChar(_hashAlgorithm);
    let _signatureAlgorithm;
    switch (this.signatureAlgorithm.toLowerCase()) {
      case ANONYMOUS:
        _signatureAlgorithm = 0;
        break;
      case RSA:
        _signatureAlgorithm = 1;
        break;
      case DSA:
        _signatureAlgorithm = 2;
        break;
      case ECDSA:
        _signatureAlgorithm = 3;
        break;
      default:
        throw new Error(`Incorrect data for signatureAlgorithm: ${this.signatureAlgorithm}`);
    }
    stream.appendChar(_signatureAlgorithm);
    const _signature = this.signature.toBER(false);
    stream.appendUint16(_signature.byteLength);
    stream.appendView(new Uint8Array(_signature));
    return stream;
  }
  toJSON() {
    return {
      version: this.version,
      logID: bufferToHexCodes(this.logID),
      timestamp: this.timestamp,
      extensions: bufferToHexCodes(this.extensions),
      hashAlgorithm: this.hashAlgorithm,
      signatureAlgorithm: this.signatureAlgorithm,
      signature: this.signature.toJSON()
    };
  }
  async verify(logs, data, dataType = 0, crypto2 = getCrypto(true)) {
    const logId = toBase64(arrayBufferToString(this.logID));
    let publicKeyBase64 = null;
    const stream = new SeqStream();
    for (const log of logs) {
      if (log.log_id === logId) {
        publicKeyBase64 = log.key;
        break;
      }
    }
    if (!publicKeyBase64) {
      throw new Error(`Public key not found for CT with logId: ${logId}`);
    }
    const pki = stringToArrayBuffer(fromBase64(publicKeyBase64));
    const publicKeyInfo = PublicKeyInfo.fromBER(pki);
    stream.appendChar(0);
    stream.appendChar(0);
    const timeBuffer = new ArrayBuffer(8);
    const timeView = new Uint8Array(timeBuffer);
    const baseArray = utilToBase(this.timestamp.valueOf(), 8);
    timeView.set(new Uint8Array(baseArray), 8 - baseArray.byteLength);
    stream.appendView(timeView);
    stream.appendUint16(dataType);
    if (dataType === 0)
      stream.appendUint24(data.byteLength);
    stream.appendView(new Uint8Array(data));
    stream.appendUint16(this.extensions.byteLength);
    if (this.extensions.byteLength !== 0)
      stream.appendView(new Uint8Array(this.extensions));
    return crypto2.verifyWithPublicKey(stream.buffer.slice(0, stream.length), new OctetString({ valueHex: this.signature.toBER(false) }), publicKeyInfo, { algorithmId: EMPTY_STRING2 }, "SHA-256");
  }
};
SignedCertificateTimestamp.CLASS_NAME = "SignedCertificateTimestamp";
async function verifySCTsForCertificate(certificate, issuerCertificate, logs, index = -1, crypto2 = getCrypto(true)) {
  let parsedValue = null;
  const stream = new SeqStream();
  for (let i = 0; certificate.extensions && i < certificate.extensions.length; i++) {
    switch (certificate.extensions[i].extnID) {
      case id_SignedCertificateTimestampList:
        {
          parsedValue = certificate.extensions[i].parsedValue;
          if (!parsedValue || parsedValue.timestamps.length === 0)
            throw new Error("Nothing to verify in the certificate");
          certificate.extensions.splice(i, 1);
        }
        break;
    }
  }
  if (parsedValue === null)
    throw new Error("No SignedCertificateTimestampList extension in the specified certificate");
  const tbs = certificate.encodeTBS().toBER();
  const issuerId = await crypto2.digest({ name: "SHA-256" }, new Uint8Array(issuerCertificate.subjectPublicKeyInfo.toSchema().toBER(false)));
  stream.appendView(new Uint8Array(issuerId));
  stream.appendUint24(tbs.byteLength);
  stream.appendView(new Uint8Array(tbs));
  const preCert = stream.stream.slice(0, stream.length);
  if (index === -1) {
    const verifyArray = [];
    for (const timestamp of parsedValue.timestamps) {
      const verifyResult = await timestamp.verify(logs, preCert.buffer, 1, crypto2);
      verifyArray.push(verifyResult);
    }
    return verifyArray;
  }
  if (index >= parsedValue.timestamps.length)
    index = parsedValue.timestamps.length - 1;
  return [await parsedValue.timestamps[index].verify(logs, preCert.buffer, 1, crypto2)];
}
var TIMESTAMPS = "timestamps";
var SignedCertificateTimestampList = class _SignedCertificateTimestampList extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.timestamps = getParametersValue(parameters, TIMESTAMPS, _SignedCertificateTimestampList.defaultValues(TIMESTAMPS));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case TIMESTAMPS:
        return [];
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case TIMESTAMPS:
        return memberValue.length === 0;
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    var _a3;
    const names = getParametersValue(parameters, "names", {});
    (_a3 = names.optional) !== null && _a3 !== void 0 ? _a3 : names.optional = false;
    return new OctetString({
      name: names.blockName || "SignedCertificateTimestampList",
      optional: names.optional
    });
  }
  fromSchema(schema) {
    if (schema instanceof OctetString === false) {
      throw new Error("Object's schema was not verified against input data for SignedCertificateTimestampList");
    }
    const seqStream = new SeqStream({
      stream: new ByteStream({
        buffer: schema.valueBlock.valueHex
      })
    });
    const dataLength = seqStream.getUint16();
    if (dataLength !== seqStream.length) {
      throw new Error("Object's schema was not verified against input data for SignedCertificateTimestampList");
    }
    while (seqStream.length) {
      this.timestamps.push(new SignedCertificateTimestamp({ stream: seqStream }));
    }
  }
  toSchema() {
    const stream = new SeqStream();
    let overallLength = 0;
    const timestampsData = [];
    for (const timestamp of this.timestamps) {
      const timestampStream = timestamp.toStream();
      timestampsData.push(timestampStream);
      overallLength += timestampStream.stream.buffer.byteLength;
    }
    stream.appendUint16(overallLength);
    for (const timestamp of timestampsData) {
      stream.appendView(timestamp.stream.view);
    }
    return new OctetString({ valueHex: stream.stream.buffer.slice(0) });
  }
  toJSON() {
    return {
      timestamps: Array.from(this.timestamps, (o) => o.toJSON())
    };
  }
};
SignedCertificateTimestampList.CLASS_NAME = "SignedCertificateTimestampList";
var ATTRIBUTES$4 = "attributes";
var CLEAR_PROPS$11 = [
  ATTRIBUTES$4
];
var SubjectDirectoryAttributes = class _SubjectDirectoryAttributes extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.attributes = getParametersValue(parameters, ATTRIBUTES$4, _SubjectDirectoryAttributes.defaultValues(ATTRIBUTES$4));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case ATTRIBUTES$4:
        return [];
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new Repeated({
          name: names.attributes || EMPTY_STRING2,
          value: Attribute.schema()
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$11);
    const asn1 = compareSchema(schema, schema, _SubjectDirectoryAttributes.schema({
      names: {
        attributes: ATTRIBUTES$4
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.attributes = Array.from(asn1.result.attributes, (element) => new Attribute({ schema: element }));
  }
  toSchema() {
    return new Sequence({
      value: Array.from(this.attributes, (o) => o.toSchema())
    });
  }
  toJSON() {
    return {
      attributes: Array.from(this.attributes, (o) => o.toJSON())
    };
  }
};
SubjectDirectoryAttributes.CLASS_NAME = "SubjectDirectoryAttributes";
var ExtensionValueFactory = class _ExtensionValueFactory {
  static getItems() {
    if (!this.types) {
      this.types = {};
      _ExtensionValueFactory.register(id_SubjectAltName, "SubjectAltName", AltName);
      _ExtensionValueFactory.register(id_IssuerAltName, "IssuerAltName", AltName);
      _ExtensionValueFactory.register(id_AuthorityKeyIdentifier, "AuthorityKeyIdentifier", AuthorityKeyIdentifier);
      _ExtensionValueFactory.register(id_BasicConstraints, "BasicConstraints", BasicConstraints);
      _ExtensionValueFactory.register(id_MicrosoftCaVersion, "MicrosoftCaVersion", CAVersion);
      _ExtensionValueFactory.register(id_CertificatePolicies, "CertificatePolicies", CertificatePolicies);
      _ExtensionValueFactory.register(id_MicrosoftAppPolicies, "CertificatePoliciesMicrosoft", CertificatePolicies);
      _ExtensionValueFactory.register(id_MicrosoftCertTemplateV2, "MicrosoftCertTemplateV2", CertificateTemplate);
      _ExtensionValueFactory.register(id_CRLDistributionPoints, "CRLDistributionPoints", CRLDistributionPoints);
      _ExtensionValueFactory.register(id_FreshestCRL, "FreshestCRL", CRLDistributionPoints);
      _ExtensionValueFactory.register(id_ExtKeyUsage, "ExtKeyUsage", ExtKeyUsage);
      _ExtensionValueFactory.register(id_CertificateIssuer, "CertificateIssuer", GeneralNames);
      _ExtensionValueFactory.register(id_AuthorityInfoAccess, "AuthorityInfoAccess", InfoAccess);
      _ExtensionValueFactory.register(id_SubjectInfoAccess, "SubjectInfoAccess", InfoAccess);
      _ExtensionValueFactory.register(id_IssuingDistributionPoint, "IssuingDistributionPoint", IssuingDistributionPoint);
      _ExtensionValueFactory.register(id_NameConstraints, "NameConstraints", NameConstraints);
      _ExtensionValueFactory.register(id_PolicyConstraints, "PolicyConstraints", PolicyConstraints);
      _ExtensionValueFactory.register(id_PolicyMappings, "PolicyMappings", PolicyMappings);
      _ExtensionValueFactory.register(id_PrivateKeyUsagePeriod, "PrivateKeyUsagePeriod", PrivateKeyUsagePeriod);
      _ExtensionValueFactory.register(id_QCStatements, "QCStatements", QCStatements);
      _ExtensionValueFactory.register(id_SignedCertificateTimestampList, "SignedCertificateTimestampList", SignedCertificateTimestampList);
      _ExtensionValueFactory.register(id_SubjectDirectoryAttributes, "SubjectDirectoryAttributes", SubjectDirectoryAttributes);
    }
    return this.types;
  }
  static fromBER(id, raw) {
    const asn1 = fromBER(raw);
    if (asn1.offset === -1) {
      return null;
    }
    const item = this.find(id);
    if (item) {
      try {
        return new item.type({ schema: asn1.result });
      } catch (ex) {
        const res = new item.type();
        res.parsingError = `Incorrectly formatted value of extension ${item.name} (${id})`;
        return res;
      }
    }
    return asn1.result;
  }
  static find(id) {
    const types3 = this.getItems();
    return types3[id] || null;
  }
  static register(id, name, type) {
    this.getItems()[id] = { name, type };
  }
};
var EXTN_ID = "extnID";
var CRITICAL = "critical";
var EXTN_VALUE = "extnValue";
var PARSED_VALUE$5 = "parsedValue";
var CLEAR_PROPS$10 = [
  EXTN_ID,
  CRITICAL,
  EXTN_VALUE
];
var Extension = class _Extension extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.extnID = getParametersValue(parameters, EXTN_ID, _Extension.defaultValues(EXTN_ID));
    this.critical = getParametersValue(parameters, CRITICAL, _Extension.defaultValues(CRITICAL));
    if (EXTN_VALUE in parameters) {
      this.extnValue = new OctetString({ valueHex: parameters.extnValue });
    } else {
      this.extnValue = _Extension.defaultValues(EXTN_VALUE);
    }
    if (PARSED_VALUE$5 in parameters) {
      this.parsedValue = getParametersValue(parameters, PARSED_VALUE$5, _Extension.defaultValues(PARSED_VALUE$5));
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  get parsedValue() {
    if (this._parsedValue === void 0) {
      const parsedValue = ExtensionValueFactory.fromBER(this.extnID, this.extnValue.valueBlock.valueHexView);
      this._parsedValue = parsedValue;
    }
    return this._parsedValue || void 0;
  }
  set parsedValue(value) {
    this._parsedValue = value;
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case EXTN_ID:
        return EMPTY_STRING2;
      case CRITICAL:
        return false;
      case EXTN_VALUE:
        return new OctetString();
      case PARSED_VALUE$5:
        return {};
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new ObjectIdentifier({ name: names.extnID || EMPTY_STRING2 }),
        new Boolean2({
          name: names.critical || EMPTY_STRING2,
          optional: true
        }),
        new OctetString({ name: names.extnValue || EMPTY_STRING2 })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$10);
    const asn1 = compareSchema(schema, schema, _Extension.schema({
      names: {
        extnID: EXTN_ID,
        critical: CRITICAL,
        extnValue: EXTN_VALUE
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.extnID = asn1.result.extnID.valueBlock.toString();
    if (CRITICAL in asn1.result) {
      this.critical = asn1.result.critical.valueBlock.value;
    }
    this.extnValue = asn1.result.extnValue;
  }
  toSchema() {
    const outputArray = [];
    outputArray.push(new ObjectIdentifier({ value: this.extnID }));
    if (this.critical !== _Extension.defaultValues(CRITICAL)) {
      outputArray.push(new Boolean2({ value: this.critical }));
    }
    outputArray.push(this.extnValue);
    return new Sequence({
      value: outputArray
    });
  }
  toJSON() {
    const object = {
      extnID: this.extnID,
      extnValue: this.extnValue.toJSON()
    };
    if (this.critical !== _Extension.defaultValues(CRITICAL)) {
      object.critical = this.critical;
    }
    if (this.parsedValue && this.parsedValue.toJSON) {
      object.parsedValue = this.parsedValue.toJSON();
    }
    return object;
  }
};
Extension.CLASS_NAME = "Extension";
var EXTENSIONS$5 = "extensions";
var CLEAR_PROPS$$ = [
  EXTENSIONS$5
];
var Extensions = class _Extensions extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.extensions = getParametersValue(parameters, EXTENSIONS$5, _Extensions.defaultValues(EXTENSIONS$5));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case EXTENSIONS$5:
        return [];
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}, optional = false) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      optional,
      name: names.blockName || EMPTY_STRING2,
      value: [
        new Repeated({
          name: names.extensions || EMPTY_STRING2,
          value: Extension.schema(names.extension || {})
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$$);
    const asn1 = compareSchema(schema, schema, _Extensions.schema({
      names: {
        extensions: EXTENSIONS$5
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.extensions = Array.from(asn1.result.extensions, (element) => new Extension({ schema: element }));
  }
  toSchema() {
    return new Sequence({
      value: Array.from(this.extensions, (o) => o.toSchema())
    });
  }
  toJSON() {
    return {
      extensions: this.extensions.map((o) => o.toJSON())
    };
  }
};
Extensions.CLASS_NAME = "Extensions";
var ISSUER$5 = "issuer";
var SERIAL_NUMBER$6 = "serialNumber";
var ISSUER_UID = "issuerUID";
var CLEAR_PROPS$_ = [
  ISSUER$5,
  SERIAL_NUMBER$6,
  ISSUER_UID
];
var IssuerSerial = class _IssuerSerial extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.issuer = getParametersValue(parameters, ISSUER$5, _IssuerSerial.defaultValues(ISSUER$5));
    this.serialNumber = getParametersValue(parameters, SERIAL_NUMBER$6, _IssuerSerial.defaultValues(SERIAL_NUMBER$6));
    if (ISSUER_UID in parameters) {
      this.issuerUID = getParametersValue(parameters, ISSUER_UID, _IssuerSerial.defaultValues(ISSUER_UID));
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case ISSUER$5:
        return new GeneralNames();
      case SERIAL_NUMBER$6:
        return new Integer();
      case ISSUER_UID:
        return new BitString();
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        GeneralNames.schema(names.issuer || {}),
        new Integer({ name: names.serialNumber || EMPTY_STRING2 }),
        new BitString({
          optional: true,
          name: names.issuerUID || EMPTY_STRING2
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$_);
    const asn1 = compareSchema(schema, schema, _IssuerSerial.schema({
      names: {
        issuer: {
          names: {
            blockName: ISSUER$5
          }
        },
        serialNumber: SERIAL_NUMBER$6,
        issuerUID: ISSUER_UID
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.issuer = new GeneralNames({ schema: asn1.result.issuer });
    this.serialNumber = asn1.result.serialNumber;
    if (ISSUER_UID in asn1.result)
      this.issuerUID = asn1.result.issuerUID;
  }
  toSchema() {
    const result = new Sequence({
      value: [
        this.issuer.toSchema(),
        this.serialNumber
      ]
    });
    if (this.issuerUID) {
      result.valueBlock.value.push(this.issuerUID);
    }
    return result;
  }
  toJSON() {
    const result = {
      issuer: this.issuer.toJSON(),
      serialNumber: this.serialNumber.toJSON()
    };
    if (this.issuerUID) {
      result.issuerUID = this.issuerUID.toJSON();
    }
    return result;
  }
};
IssuerSerial.CLASS_NAME = "IssuerSerial";
var VERSION$h = "version";
var BASE_CERTIFICATE_ID$2 = "baseCertificateID";
var SUBJECT_NAME = "subjectName";
var ISSUER$4 = "issuer";
var SIGNATURE$6 = "signature";
var SERIAL_NUMBER$5 = "serialNumber";
var ATTR_CERT_VALIDITY_PERIOD$1 = "attrCertValidityPeriod";
var ATTRIBUTES$3 = "attributes";
var ISSUER_UNIQUE_ID$2 = "issuerUniqueID";
var EXTENSIONS$4 = "extensions";
var CLEAR_PROPS$Z = [
  VERSION$h,
  BASE_CERTIFICATE_ID$2,
  SUBJECT_NAME,
  ISSUER$4,
  SIGNATURE$6,
  SERIAL_NUMBER$5,
  ATTR_CERT_VALIDITY_PERIOD$1,
  ATTRIBUTES$3,
  ISSUER_UNIQUE_ID$2,
  EXTENSIONS$4
];
var AttributeCertificateInfoV1 = class _AttributeCertificateInfoV1 extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.version = getParametersValue(parameters, VERSION$h, _AttributeCertificateInfoV1.defaultValues(VERSION$h));
    if (BASE_CERTIFICATE_ID$2 in parameters) {
      this.baseCertificateID = getParametersValue(parameters, BASE_CERTIFICATE_ID$2, _AttributeCertificateInfoV1.defaultValues(BASE_CERTIFICATE_ID$2));
    }
    if (SUBJECT_NAME in parameters) {
      this.subjectName = getParametersValue(parameters, SUBJECT_NAME, _AttributeCertificateInfoV1.defaultValues(SUBJECT_NAME));
    }
    this.issuer = getParametersValue(parameters, ISSUER$4, _AttributeCertificateInfoV1.defaultValues(ISSUER$4));
    this.signature = getParametersValue(parameters, SIGNATURE$6, _AttributeCertificateInfoV1.defaultValues(SIGNATURE$6));
    this.serialNumber = getParametersValue(parameters, SERIAL_NUMBER$5, _AttributeCertificateInfoV1.defaultValues(SERIAL_NUMBER$5));
    this.attrCertValidityPeriod = getParametersValue(parameters, ATTR_CERT_VALIDITY_PERIOD$1, _AttributeCertificateInfoV1.defaultValues(ATTR_CERT_VALIDITY_PERIOD$1));
    this.attributes = getParametersValue(parameters, ATTRIBUTES$3, _AttributeCertificateInfoV1.defaultValues(ATTRIBUTES$3));
    if (ISSUER_UNIQUE_ID$2 in parameters)
      this.issuerUniqueID = getParametersValue(parameters, ISSUER_UNIQUE_ID$2, _AttributeCertificateInfoV1.defaultValues(ISSUER_UNIQUE_ID$2));
    if (EXTENSIONS$4 in parameters) {
      this.extensions = getParametersValue(parameters, EXTENSIONS$4, _AttributeCertificateInfoV1.defaultValues(EXTENSIONS$4));
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case VERSION$h:
        return 0;
      case BASE_CERTIFICATE_ID$2:
        return new IssuerSerial();
      case SUBJECT_NAME:
        return new GeneralNames();
      case ISSUER$4:
        return new GeneralNames();
      case SIGNATURE$6:
        return new AlgorithmIdentifier();
      case SERIAL_NUMBER$5:
        return new Integer();
      case ATTR_CERT_VALIDITY_PERIOD$1:
        return new AttCertValidityPeriod();
      case ATTRIBUTES$3:
        return [];
      case ISSUER_UNIQUE_ID$2:
        return new BitString();
      case EXTENSIONS$4:
        return new Extensions();
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new Integer({ name: names.version || EMPTY_STRING2 }),
        new Choice({
          value: [
            new Constructed({
              name: names.baseCertificateID || EMPTY_STRING2,
              idBlock: {
                tagClass: 3,
                tagNumber: 0
              },
              value: IssuerSerial.schema().valueBlock.value
            }),
            new Constructed({
              name: names.subjectName || EMPTY_STRING2,
              idBlock: {
                tagClass: 3,
                tagNumber: 1
              },
              value: GeneralNames.schema().valueBlock.value
            })
          ]
        }),
        GeneralNames.schema({
          names: {
            blockName: names.issuer || EMPTY_STRING2
          }
        }),
        AlgorithmIdentifier.schema(names.signature || {}),
        new Integer({ name: names.serialNumber || EMPTY_STRING2 }),
        AttCertValidityPeriod.schema(names.attrCertValidityPeriod || {}),
        new Sequence({
          name: names.attributes || EMPTY_STRING2,
          value: [
            new Repeated({
              value: Attribute.schema()
            })
          ]
        }),
        new BitString({
          optional: true,
          name: names.issuerUniqueID || EMPTY_STRING2
        }),
        Extensions.schema(names.extensions || {}, true)
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$Z);
    const asn1 = compareSchema(schema, schema, _AttributeCertificateInfoV1.schema({
      names: {
        version: VERSION$h,
        baseCertificateID: BASE_CERTIFICATE_ID$2,
        subjectName: SUBJECT_NAME,
        issuer: ISSUER$4,
        signature: {
          names: {
            blockName: SIGNATURE$6
          }
        },
        serialNumber: SERIAL_NUMBER$5,
        attrCertValidityPeriod: {
          names: {
            blockName: ATTR_CERT_VALIDITY_PERIOD$1
          }
        },
        attributes: ATTRIBUTES$3,
        issuerUniqueID: ISSUER_UNIQUE_ID$2,
        extensions: {
          names: {
            blockName: EXTENSIONS$4
          }
        }
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.version = asn1.result.version.valueBlock.valueDec;
    if (BASE_CERTIFICATE_ID$2 in asn1.result) {
      this.baseCertificateID = new IssuerSerial({
        schema: new Sequence({
          value: asn1.result.baseCertificateID.valueBlock.value
        })
      });
    }
    if (SUBJECT_NAME in asn1.result) {
      this.subjectName = new GeneralNames({
        schema: new Sequence({
          value: asn1.result.subjectName.valueBlock.value
        })
      });
    }
    this.issuer = asn1.result.issuer;
    this.signature = new AlgorithmIdentifier({ schema: asn1.result.signature });
    this.serialNumber = asn1.result.serialNumber;
    this.attrCertValidityPeriod = new AttCertValidityPeriod({ schema: asn1.result.attrCertValidityPeriod });
    this.attributes = Array.from(asn1.result.attributes.valueBlock.value, (element) => new Attribute({ schema: element }));
    if (ISSUER_UNIQUE_ID$2 in asn1.result) {
      this.issuerUniqueID = asn1.result.issuerUniqueID;
    }
    if (EXTENSIONS$4 in asn1.result) {
      this.extensions = new Extensions({ schema: asn1.result.extensions });
    }
  }
  toSchema() {
    const result = new Sequence({
      value: [new Integer({ value: this.version })]
    });
    if (this.baseCertificateID) {
      result.valueBlock.value.push(new Constructed({
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        value: this.baseCertificateID.toSchema().valueBlock.value
      }));
    }
    if (this.subjectName) {
      result.valueBlock.value.push(new Constructed({
        idBlock: {
          tagClass: 3,
          tagNumber: 1
        },
        value: this.subjectName.toSchema().valueBlock.value
      }));
    }
    result.valueBlock.value.push(this.issuer.toSchema());
    result.valueBlock.value.push(this.signature.toSchema());
    result.valueBlock.value.push(this.serialNumber);
    result.valueBlock.value.push(this.attrCertValidityPeriod.toSchema());
    result.valueBlock.value.push(new Sequence({
      value: Array.from(this.attributes, (o) => o.toSchema())
    }));
    if (this.issuerUniqueID) {
      result.valueBlock.value.push(this.issuerUniqueID);
    }
    if (this.extensions) {
      result.valueBlock.value.push(this.extensions.toSchema());
    }
    return result;
  }
  toJSON() {
    const result = {
      version: this.version
    };
    if (this.baseCertificateID) {
      result.baseCertificateID = this.baseCertificateID.toJSON();
    }
    if (this.subjectName) {
      result.subjectName = this.subjectName.toJSON();
    }
    result.issuer = this.issuer.toJSON();
    result.signature = this.signature.toJSON();
    result.serialNumber = this.serialNumber.toJSON();
    result.attrCertValidityPeriod = this.attrCertValidityPeriod.toJSON();
    result.attributes = Array.from(this.attributes, (o) => o.toJSON());
    if (this.issuerUniqueID) {
      result.issuerUniqueID = this.issuerUniqueID.toJSON();
    }
    if (this.extensions) {
      result.extensions = this.extensions.toJSON();
    }
    return result;
  }
};
AttributeCertificateInfoV1.CLASS_NAME = "AttributeCertificateInfoV1";
var ACINFO$1 = "acinfo";
var SIGNATURE_ALGORITHM$7 = "signatureAlgorithm";
var SIGNATURE_VALUE$4 = "signatureValue";
var CLEAR_PROPS$Y = [
  ACINFO$1,
  SIGNATURE_VALUE$4,
  SIGNATURE_ALGORITHM$7
];
var AttributeCertificateV1 = class _AttributeCertificateV1 extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.acinfo = getParametersValue(parameters, ACINFO$1, _AttributeCertificateV1.defaultValues(ACINFO$1));
    this.signatureAlgorithm = getParametersValue(parameters, SIGNATURE_ALGORITHM$7, _AttributeCertificateV1.defaultValues(SIGNATURE_ALGORITHM$7));
    this.signatureValue = getParametersValue(parameters, SIGNATURE_VALUE$4, _AttributeCertificateV1.defaultValues(SIGNATURE_VALUE$4));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case ACINFO$1:
        return new AttributeCertificateInfoV1();
      case SIGNATURE_ALGORITHM$7:
        return new AlgorithmIdentifier();
      case SIGNATURE_VALUE$4:
        return new BitString();
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        AttributeCertificateInfoV1.schema(names.acinfo || {}),
        AlgorithmIdentifier.schema(names.signatureAlgorithm || {}),
        new BitString({ name: names.signatureValue || EMPTY_STRING2 })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$Y);
    const asn1 = compareSchema(schema, schema, _AttributeCertificateV1.schema({
      names: {
        acinfo: {
          names: {
            blockName: ACINFO$1
          }
        },
        signatureAlgorithm: {
          names: {
            blockName: SIGNATURE_ALGORITHM$7
          }
        },
        signatureValue: SIGNATURE_VALUE$4
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.acinfo = new AttributeCertificateInfoV1({ schema: asn1.result.acinfo });
    this.signatureAlgorithm = new AlgorithmIdentifier({ schema: asn1.result.signatureAlgorithm });
    this.signatureValue = asn1.result.signatureValue;
  }
  toSchema() {
    return new Sequence({
      value: [
        this.acinfo.toSchema(),
        this.signatureAlgorithm.toSchema(),
        this.signatureValue
      ]
    });
  }
  toJSON() {
    return {
      acinfo: this.acinfo.toJSON(),
      signatureAlgorithm: this.signatureAlgorithm.toJSON(),
      signatureValue: this.signatureValue.toJSON()
    };
  }
};
AttributeCertificateV1.CLASS_NAME = "AttributeCertificateV1";
var DIGESTED_OBJECT_TYPE = "digestedObjectType";
var OTHER_OBJECT_TYPE_ID = "otherObjectTypeID";
var DIGEST_ALGORITHM$2 = "digestAlgorithm";
var OBJECT_DIGEST = "objectDigest";
var CLEAR_PROPS$X = [
  DIGESTED_OBJECT_TYPE,
  OTHER_OBJECT_TYPE_ID,
  DIGEST_ALGORITHM$2,
  OBJECT_DIGEST
];
var ObjectDigestInfo = class _ObjectDigestInfo extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.digestedObjectType = getParametersValue(parameters, DIGESTED_OBJECT_TYPE, _ObjectDigestInfo.defaultValues(DIGESTED_OBJECT_TYPE));
    if (OTHER_OBJECT_TYPE_ID in parameters) {
      this.otherObjectTypeID = getParametersValue(parameters, OTHER_OBJECT_TYPE_ID, _ObjectDigestInfo.defaultValues(OTHER_OBJECT_TYPE_ID));
    }
    this.digestAlgorithm = getParametersValue(parameters, DIGEST_ALGORITHM$2, _ObjectDigestInfo.defaultValues(DIGEST_ALGORITHM$2));
    this.objectDigest = getParametersValue(parameters, OBJECT_DIGEST, _ObjectDigestInfo.defaultValues(OBJECT_DIGEST));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case DIGESTED_OBJECT_TYPE:
        return new Enumerated();
      case OTHER_OBJECT_TYPE_ID:
        return new ObjectIdentifier();
      case DIGEST_ALGORITHM$2:
        return new AlgorithmIdentifier();
      case OBJECT_DIGEST:
        return new BitString();
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new Enumerated({ name: names.digestedObjectType || EMPTY_STRING2 }),
        new ObjectIdentifier({
          optional: true,
          name: names.otherObjectTypeID || EMPTY_STRING2
        }),
        AlgorithmIdentifier.schema(names.digestAlgorithm || {}),
        new BitString({ name: names.objectDigest || EMPTY_STRING2 })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$X);
    const asn1 = compareSchema(schema, schema, _ObjectDigestInfo.schema({
      names: {
        digestedObjectType: DIGESTED_OBJECT_TYPE,
        otherObjectTypeID: OTHER_OBJECT_TYPE_ID,
        digestAlgorithm: {
          names: {
            blockName: DIGEST_ALGORITHM$2
          }
        },
        objectDigest: OBJECT_DIGEST
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.digestedObjectType = asn1.result.digestedObjectType;
    if (OTHER_OBJECT_TYPE_ID in asn1.result) {
      this.otherObjectTypeID = asn1.result.otherObjectTypeID;
    }
    this.digestAlgorithm = new AlgorithmIdentifier({ schema: asn1.result.digestAlgorithm });
    this.objectDigest = asn1.result.objectDigest;
  }
  toSchema() {
    const result = new Sequence({
      value: [this.digestedObjectType]
    });
    if (this.otherObjectTypeID) {
      result.valueBlock.value.push(this.otherObjectTypeID);
    }
    result.valueBlock.value.push(this.digestAlgorithm.toSchema());
    result.valueBlock.value.push(this.objectDigest);
    return result;
  }
  toJSON() {
    const result = {
      digestedObjectType: this.digestedObjectType.toJSON(),
      digestAlgorithm: this.digestAlgorithm.toJSON(),
      objectDigest: this.objectDigest.toJSON()
    };
    if (this.otherObjectTypeID) {
      result.otherObjectTypeID = this.otherObjectTypeID.toJSON();
    }
    return result;
  }
};
ObjectDigestInfo.CLASS_NAME = "ObjectDigestInfo";
var ISSUER_NAME = "issuerName";
var BASE_CERTIFICATE_ID$1 = "baseCertificateID";
var OBJECT_DIGEST_INFO$1 = "objectDigestInfo";
var CLEAR_PROPS$W = [
  ISSUER_NAME,
  BASE_CERTIFICATE_ID$1,
  OBJECT_DIGEST_INFO$1
];
var V2Form = class _V2Form extends PkiObject {
  constructor(parameters = {}) {
    super();
    if (ISSUER_NAME in parameters) {
      this.issuerName = getParametersValue(parameters, ISSUER_NAME, _V2Form.defaultValues(ISSUER_NAME));
    }
    if (BASE_CERTIFICATE_ID$1 in parameters) {
      this.baseCertificateID = getParametersValue(parameters, BASE_CERTIFICATE_ID$1, _V2Form.defaultValues(BASE_CERTIFICATE_ID$1));
    }
    if (OBJECT_DIGEST_INFO$1 in parameters) {
      this.objectDigestInfo = getParametersValue(parameters, OBJECT_DIGEST_INFO$1, _V2Form.defaultValues(OBJECT_DIGEST_INFO$1));
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case ISSUER_NAME:
        return new GeneralNames();
      case BASE_CERTIFICATE_ID$1:
        return new IssuerSerial();
      case OBJECT_DIGEST_INFO$1:
        return new ObjectDigestInfo();
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        GeneralNames.schema({
          names: {
            blockName: names.issuerName
          }
        }, true),
        new Constructed({
          optional: true,
          name: names.baseCertificateID || EMPTY_STRING2,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: IssuerSerial.schema().valueBlock.value
        }),
        new Constructed({
          optional: true,
          name: names.objectDigestInfo || EMPTY_STRING2,
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          },
          value: ObjectDigestInfo.schema().valueBlock.value
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$W);
    const asn1 = compareSchema(schema, schema, _V2Form.schema({
      names: {
        issuerName: ISSUER_NAME,
        baseCertificateID: BASE_CERTIFICATE_ID$1,
        objectDigestInfo: OBJECT_DIGEST_INFO$1
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    if (ISSUER_NAME in asn1.result)
      this.issuerName = new GeneralNames({ schema: asn1.result.issuerName });
    if (BASE_CERTIFICATE_ID$1 in asn1.result) {
      this.baseCertificateID = new IssuerSerial({
        schema: new Sequence({
          value: asn1.result.baseCertificateID.valueBlock.value
        })
      });
    }
    if (OBJECT_DIGEST_INFO$1 in asn1.result) {
      this.objectDigestInfo = new ObjectDigestInfo({
        schema: new Sequence({
          value: asn1.result.objectDigestInfo.valueBlock.value
        })
      });
    }
  }
  toSchema() {
    const result = new Sequence();
    if (this.issuerName)
      result.valueBlock.value.push(this.issuerName.toSchema());
    if (this.baseCertificateID) {
      result.valueBlock.value.push(new Constructed({
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        value: this.baseCertificateID.toSchema().valueBlock.value
      }));
    }
    if (this.objectDigestInfo) {
      result.valueBlock.value.push(new Constructed({
        idBlock: {
          tagClass: 3,
          tagNumber: 1
        },
        value: this.objectDigestInfo.toSchema().valueBlock.value
      }));
    }
    return result;
  }
  toJSON() {
    const result = {};
    if (this.issuerName) {
      result.issuerName = this.issuerName.toJSON();
    }
    if (this.baseCertificateID) {
      result.baseCertificateID = this.baseCertificateID.toJSON();
    }
    if (this.objectDigestInfo) {
      result.objectDigestInfo = this.objectDigestInfo.toJSON();
    }
    return result;
  }
};
V2Form.CLASS_NAME = "V2Form";
var BASE_CERTIFICATE_ID = "baseCertificateID";
var ENTITY_NAME = "entityName";
var OBJECT_DIGEST_INFO = "objectDigestInfo";
var CLEAR_PROPS$V = [
  BASE_CERTIFICATE_ID,
  ENTITY_NAME,
  OBJECT_DIGEST_INFO
];
var Holder = class _Holder extends PkiObject {
  constructor(parameters = {}) {
    super();
    if (BASE_CERTIFICATE_ID in parameters) {
      this.baseCertificateID = getParametersValue(parameters, BASE_CERTIFICATE_ID, _Holder.defaultValues(BASE_CERTIFICATE_ID));
    }
    if (ENTITY_NAME in parameters) {
      this.entityName = getParametersValue(parameters, ENTITY_NAME, _Holder.defaultValues(ENTITY_NAME));
    }
    if (OBJECT_DIGEST_INFO in parameters) {
      this.objectDigestInfo = getParametersValue(parameters, OBJECT_DIGEST_INFO, _Holder.defaultValues(OBJECT_DIGEST_INFO));
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case BASE_CERTIFICATE_ID:
        return new IssuerSerial();
      case ENTITY_NAME:
        return new GeneralNames();
      case OBJECT_DIGEST_INFO:
        return new ObjectDigestInfo();
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new Constructed({
          optional: true,
          name: names.baseCertificateID || EMPTY_STRING2,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: IssuerSerial.schema().valueBlock.value
        }),
        new Constructed({
          optional: true,
          name: names.entityName || EMPTY_STRING2,
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          },
          value: GeneralNames.schema().valueBlock.value
        }),
        new Constructed({
          optional: true,
          name: names.objectDigestInfo || EMPTY_STRING2,
          idBlock: {
            tagClass: 3,
            tagNumber: 2
          },
          value: ObjectDigestInfo.schema().valueBlock.value
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$V);
    const asn1 = compareSchema(schema, schema, _Holder.schema({
      names: {
        baseCertificateID: BASE_CERTIFICATE_ID,
        entityName: ENTITY_NAME,
        objectDigestInfo: OBJECT_DIGEST_INFO
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    if (BASE_CERTIFICATE_ID in asn1.result) {
      this.baseCertificateID = new IssuerSerial({
        schema: new Sequence({
          value: asn1.result.baseCertificateID.valueBlock.value
        })
      });
    }
    if (ENTITY_NAME in asn1.result) {
      this.entityName = new GeneralNames({
        schema: new Sequence({
          value: asn1.result.entityName.valueBlock.value
        })
      });
    }
    if (OBJECT_DIGEST_INFO in asn1.result) {
      this.objectDigestInfo = new ObjectDigestInfo({
        schema: new Sequence({
          value: asn1.result.objectDigestInfo.valueBlock.value
        })
      });
    }
  }
  toSchema() {
    const result = new Sequence();
    if (this.baseCertificateID) {
      result.valueBlock.value.push(new Constructed({
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        value: this.baseCertificateID.toSchema().valueBlock.value
      }));
    }
    if (this.entityName) {
      result.valueBlock.value.push(new Constructed({
        idBlock: {
          tagClass: 3,
          tagNumber: 1
        },
        value: this.entityName.toSchema().valueBlock.value
      }));
    }
    if (this.objectDigestInfo) {
      result.valueBlock.value.push(new Constructed({
        idBlock: {
          tagClass: 3,
          tagNumber: 2
        },
        value: this.objectDigestInfo.toSchema().valueBlock.value
      }));
    }
    return result;
  }
  toJSON() {
    const result = {};
    if (this.baseCertificateID) {
      result.baseCertificateID = this.baseCertificateID.toJSON();
    }
    if (this.entityName) {
      result.entityName = this.entityName.toJSON();
    }
    if (this.objectDigestInfo) {
      result.objectDigestInfo = this.objectDigestInfo.toJSON();
    }
    return result;
  }
};
Holder.CLASS_NAME = "Holder";
var VERSION$g = "version";
var HOLDER = "holder";
var ISSUER$3 = "issuer";
var SIGNATURE$5 = "signature";
var SERIAL_NUMBER$4 = "serialNumber";
var ATTR_CERT_VALIDITY_PERIOD = "attrCertValidityPeriod";
var ATTRIBUTES$2 = "attributes";
var ISSUER_UNIQUE_ID$1 = "issuerUniqueID";
var EXTENSIONS$3 = "extensions";
var CLEAR_PROPS$U = [
  VERSION$g,
  HOLDER,
  ISSUER$3,
  SIGNATURE$5,
  SERIAL_NUMBER$4,
  ATTR_CERT_VALIDITY_PERIOD,
  ATTRIBUTES$2,
  ISSUER_UNIQUE_ID$1,
  EXTENSIONS$3
];
var AttributeCertificateInfoV2 = class _AttributeCertificateInfoV2 extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.version = getParametersValue(parameters, VERSION$g, _AttributeCertificateInfoV2.defaultValues(VERSION$g));
    this.holder = getParametersValue(parameters, HOLDER, _AttributeCertificateInfoV2.defaultValues(HOLDER));
    this.issuer = getParametersValue(parameters, ISSUER$3, _AttributeCertificateInfoV2.defaultValues(ISSUER$3));
    this.signature = getParametersValue(parameters, SIGNATURE$5, _AttributeCertificateInfoV2.defaultValues(SIGNATURE$5));
    this.serialNumber = getParametersValue(parameters, SERIAL_NUMBER$4, _AttributeCertificateInfoV2.defaultValues(SERIAL_NUMBER$4));
    this.attrCertValidityPeriod = getParametersValue(parameters, ATTR_CERT_VALIDITY_PERIOD, _AttributeCertificateInfoV2.defaultValues(ATTR_CERT_VALIDITY_PERIOD));
    this.attributes = getParametersValue(parameters, ATTRIBUTES$2, _AttributeCertificateInfoV2.defaultValues(ATTRIBUTES$2));
    if (ISSUER_UNIQUE_ID$1 in parameters) {
      this.issuerUniqueID = getParametersValue(parameters, ISSUER_UNIQUE_ID$1, _AttributeCertificateInfoV2.defaultValues(ISSUER_UNIQUE_ID$1));
    }
    if (EXTENSIONS$3 in parameters) {
      this.extensions = getParametersValue(parameters, EXTENSIONS$3, _AttributeCertificateInfoV2.defaultValues(EXTENSIONS$3));
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case VERSION$g:
        return 1;
      case HOLDER:
        return new Holder();
      case ISSUER$3:
        return {};
      case SIGNATURE$5:
        return new AlgorithmIdentifier();
      case SERIAL_NUMBER$4:
        return new Integer();
      case ATTR_CERT_VALIDITY_PERIOD:
        return new AttCertValidityPeriod();
      case ATTRIBUTES$2:
        return [];
      case ISSUER_UNIQUE_ID$1:
        return new BitString();
      case EXTENSIONS$3:
        return new Extensions();
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new Integer({ name: names.version || EMPTY_STRING2 }),
        Holder.schema(names.holder || {}),
        new Choice({
          value: [
            GeneralNames.schema({
              names: {
                blockName: names.issuer || EMPTY_STRING2
              }
            }),
            new Constructed({
              name: names.issuer || EMPTY_STRING2,
              idBlock: {
                tagClass: 3,
                tagNumber: 0
              },
              value: V2Form.schema().valueBlock.value
            })
          ]
        }),
        AlgorithmIdentifier.schema(names.signature || {}),
        new Integer({ name: names.serialNumber || EMPTY_STRING2 }),
        AttCertValidityPeriod.schema(names.attrCertValidityPeriod || {}),
        new Sequence({
          name: names.attributes || EMPTY_STRING2,
          value: [
            new Repeated({
              value: Attribute.schema()
            })
          ]
        }),
        new BitString({
          optional: true,
          name: names.issuerUniqueID || EMPTY_STRING2
        }),
        Extensions.schema(names.extensions || {}, true)
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$U);
    const asn1 = compareSchema(schema, schema, _AttributeCertificateInfoV2.schema({
      names: {
        version: VERSION$g,
        holder: {
          names: {
            blockName: HOLDER
          }
        },
        issuer: ISSUER$3,
        signature: {
          names: {
            blockName: SIGNATURE$5
          }
        },
        serialNumber: SERIAL_NUMBER$4,
        attrCertValidityPeriod: {
          names: {
            blockName: ATTR_CERT_VALIDITY_PERIOD
          }
        },
        attributes: ATTRIBUTES$2,
        issuerUniqueID: ISSUER_UNIQUE_ID$1,
        extensions: {
          names: {
            blockName: EXTENSIONS$3
          }
        }
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.version = asn1.result.version.valueBlock.valueDec;
    this.holder = new Holder({ schema: asn1.result.holder });
    switch (asn1.result.issuer.idBlock.tagClass) {
      case 3:
        this.issuer = new V2Form({
          schema: new Sequence({
            value: asn1.result.issuer.valueBlock.value
          })
        });
        break;
      case 1:
      default:
        throw new Error("Incorrect value for 'issuer' in AttributeCertificateInfoV2");
    }
    this.signature = new AlgorithmIdentifier({ schema: asn1.result.signature });
    this.serialNumber = asn1.result.serialNumber;
    this.attrCertValidityPeriod = new AttCertValidityPeriod({ schema: asn1.result.attrCertValidityPeriod });
    this.attributes = Array.from(asn1.result.attributes.valueBlock.value, (element) => new Attribute({ schema: element }));
    if (ISSUER_UNIQUE_ID$1 in asn1.result) {
      this.issuerUniqueID = asn1.result.issuerUniqueID;
    }
    if (EXTENSIONS$3 in asn1.result) {
      this.extensions = new Extensions({ schema: asn1.result.extensions });
    }
  }
  toSchema() {
    const result = new Sequence({
      value: [
        new Integer({ value: this.version }),
        this.holder.toSchema(),
        new Constructed({
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: this.issuer.toSchema().valueBlock.value
        }),
        this.signature.toSchema(),
        this.serialNumber,
        this.attrCertValidityPeriod.toSchema(),
        new Sequence({
          value: Array.from(this.attributes, (o) => o.toSchema())
        })
      ]
    });
    if (this.issuerUniqueID) {
      result.valueBlock.value.push(this.issuerUniqueID);
    }
    if (this.extensions) {
      result.valueBlock.value.push(this.extensions.toSchema());
    }
    return result;
  }
  toJSON() {
    const result = {
      version: this.version,
      holder: this.holder.toJSON(),
      issuer: this.issuer.toJSON(),
      signature: this.signature.toJSON(),
      serialNumber: this.serialNumber.toJSON(),
      attrCertValidityPeriod: this.attrCertValidityPeriod.toJSON(),
      attributes: Array.from(this.attributes, (o) => o.toJSON())
    };
    if (this.issuerUniqueID) {
      result.issuerUniqueID = this.issuerUniqueID.toJSON();
    }
    if (this.extensions) {
      result.extensions = this.extensions.toJSON();
    }
    return result;
  }
};
AttributeCertificateInfoV2.CLASS_NAME = "AttributeCertificateInfoV2";
var ACINFO = "acinfo";
var SIGNATURE_ALGORITHM$6 = "signatureAlgorithm";
var SIGNATURE_VALUE$3 = "signatureValue";
var CLEAR_PROPS$T = [
  ACINFO,
  SIGNATURE_ALGORITHM$6,
  SIGNATURE_VALUE$3
];
var AttributeCertificateV2 = class _AttributeCertificateV2 extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.acinfo = getParametersValue(parameters, ACINFO, _AttributeCertificateV2.defaultValues(ACINFO));
    this.signatureAlgorithm = getParametersValue(parameters, SIGNATURE_ALGORITHM$6, _AttributeCertificateV2.defaultValues(SIGNATURE_ALGORITHM$6));
    this.signatureValue = getParametersValue(parameters, SIGNATURE_VALUE$3, _AttributeCertificateV2.defaultValues(SIGNATURE_VALUE$3));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case ACINFO:
        return new AttributeCertificateInfoV2();
      case SIGNATURE_ALGORITHM$6:
        return new AlgorithmIdentifier();
      case SIGNATURE_VALUE$3:
        return new BitString();
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        AttributeCertificateInfoV2.schema(names.acinfo || {}),
        AlgorithmIdentifier.schema(names.signatureAlgorithm || {}),
        new BitString({ name: names.signatureValue || EMPTY_STRING2 })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$T);
    const asn1 = compareSchema(schema, schema, _AttributeCertificateV2.schema({
      names: {
        acinfo: {
          names: {
            blockName: ACINFO
          }
        },
        signatureAlgorithm: {
          names: {
            blockName: SIGNATURE_ALGORITHM$6
          }
        },
        signatureValue: SIGNATURE_VALUE$3
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.acinfo = new AttributeCertificateInfoV2({ schema: asn1.result.acinfo });
    this.signatureAlgorithm = new AlgorithmIdentifier({ schema: asn1.result.signatureAlgorithm });
    this.signatureValue = asn1.result.signatureValue;
  }
  toSchema() {
    return new Sequence({
      value: [
        this.acinfo.toSchema(),
        this.signatureAlgorithm.toSchema(),
        this.signatureValue
      ]
    });
  }
  toJSON() {
    return {
      acinfo: this.acinfo.toJSON(),
      signatureAlgorithm: this.signatureAlgorithm.toJSON(),
      signatureValue: this.signatureValue.toJSON()
    };
  }
};
AttributeCertificateV2.CLASS_NAME = "AttributeCertificateV2";
var CONTENT_TYPE = "contentType";
var CONTENT = "content";
var CLEAR_PROPS$S = [CONTENT_TYPE, CONTENT];
var ContentInfo = class _ContentInfo extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.contentType = getParametersValue(parameters, CONTENT_TYPE, _ContentInfo.defaultValues(CONTENT_TYPE));
    this.content = getParametersValue(parameters, CONTENT, _ContentInfo.defaultValues(CONTENT));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case CONTENT_TYPE:
        return EMPTY_STRING2;
      case CONTENT:
        return new Any();
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case CONTENT_TYPE:
        return typeof memberValue === "string" && memberValue === this.defaultValues(CONTENT_TYPE);
      case CONTENT:
        return memberValue instanceof Any;
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    if ("optional" in names === false) {
      names.optional = false;
    }
    return new Sequence({
      name: names.blockName || "ContentInfo",
      optional: names.optional,
      value: [
        new ObjectIdentifier({ name: names.contentType || CONTENT_TYPE }),
        new Constructed({
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [new Any({ name: names.content || CONTENT })]
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$S);
    const asn1 = compareSchema(schema, schema, _ContentInfo.schema());
    AsnError.assertSchema(asn1, this.className);
    this.contentType = asn1.result.contentType.valueBlock.toString();
    this.content = asn1.result.content;
  }
  toSchema() {
    return new Sequence({
      value: [
        new ObjectIdentifier({ value: this.contentType }),
        new Constructed({
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [this.content]
        })
      ]
    });
  }
  toJSON() {
    const object = {
      contentType: this.contentType
    };
    if (!(this.content instanceof Any)) {
      object.content = this.content.toJSON();
    }
    return object;
  }
};
ContentInfo.CLASS_NAME = "ContentInfo";
ContentInfo.DATA = id_ContentType_Data;
ContentInfo.SIGNED_DATA = id_ContentType_SignedData;
ContentInfo.ENVELOPED_DATA = id_ContentType_EnvelopedData;
ContentInfo.ENCRYPTED_DATA = id_ContentType_EncryptedData;
var TYPE$1 = "type";
var VALUE$4 = "value";
var UTC_TIME_NAME = "utcTimeName";
var GENERAL_TIME_NAME = "generalTimeName";
var CLEAR_PROPS$R = [UTC_TIME_NAME, GENERAL_TIME_NAME];
var TimeType;
(function(TimeType2) {
  TimeType2[TimeType2["UTCTime"] = 0] = "UTCTime";
  TimeType2[TimeType2["GeneralizedTime"] = 1] = "GeneralizedTime";
  TimeType2[TimeType2["empty"] = 2] = "empty";
})(TimeType || (TimeType = {}));
var Time = class _Time extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.type = getParametersValue(parameters, TYPE$1, _Time.defaultValues(TYPE$1));
    this.value = getParametersValue(parameters, VALUE$4, _Time.defaultValues(VALUE$4));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case TYPE$1:
        return 0;
      case VALUE$4:
        return new Date(0, 0, 0);
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}, optional = false) {
    const names = getParametersValue(parameters, "names", {});
    return new Choice({
      optional,
      value: [
        new UTCTime({ name: names.utcTimeName || EMPTY_STRING2 }),
        new GeneralizedTime({ name: names.generalTimeName || EMPTY_STRING2 })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$R);
    const asn1 = compareSchema(schema, schema, _Time.schema({
      names: {
        utcTimeName: UTC_TIME_NAME,
        generalTimeName: GENERAL_TIME_NAME
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    if (UTC_TIME_NAME in asn1.result) {
      this.type = 0;
      this.value = asn1.result.utcTimeName.toDate();
    }
    if (GENERAL_TIME_NAME in asn1.result) {
      this.type = 1;
      this.value = asn1.result.generalTimeName.toDate();
    }
  }
  toSchema() {
    if (this.type === 0) {
      return new UTCTime({ valueDate: this.value });
    } else if (this.type === 1) {
      return new GeneralizedTime({ valueDate: this.value });
    }
    return {};
  }
  toJSON() {
    return {
      type: this.type,
      value: this.value
    };
  }
};
Time.CLASS_NAME = "Time";
var TBS$4 = "tbs";
var VERSION$f = "version";
var SERIAL_NUMBER$3 = "serialNumber";
var SIGNATURE$4 = "signature";
var ISSUER$2 = "issuer";
var NOT_BEFORE = "notBefore";
var NOT_AFTER = "notAfter";
var SUBJECT$1 = "subject";
var SUBJECT_PUBLIC_KEY_INFO = "subjectPublicKeyInfo";
var ISSUER_UNIQUE_ID = "issuerUniqueID";
var SUBJECT_UNIQUE_ID = "subjectUniqueID";
var EXTENSIONS$2 = "extensions";
var SIGNATURE_ALGORITHM$5 = "signatureAlgorithm";
var SIGNATURE_VALUE$2 = "signatureValue";
var TBS_CERTIFICATE = "tbsCertificate";
var TBS_CERTIFICATE_VERSION = `${TBS_CERTIFICATE}.${VERSION$f}`;
var TBS_CERTIFICATE_SERIAL_NUMBER = `${TBS_CERTIFICATE}.${SERIAL_NUMBER$3}`;
var TBS_CERTIFICATE_SIGNATURE = `${TBS_CERTIFICATE}.${SIGNATURE$4}`;
var TBS_CERTIFICATE_ISSUER = `${TBS_CERTIFICATE}.${ISSUER$2}`;
var TBS_CERTIFICATE_NOT_BEFORE = `${TBS_CERTIFICATE}.${NOT_BEFORE}`;
var TBS_CERTIFICATE_NOT_AFTER = `${TBS_CERTIFICATE}.${NOT_AFTER}`;
var TBS_CERTIFICATE_SUBJECT = `${TBS_CERTIFICATE}.${SUBJECT$1}`;
var TBS_CERTIFICATE_SUBJECT_PUBLIC_KEY = `${TBS_CERTIFICATE}.${SUBJECT_PUBLIC_KEY_INFO}`;
var TBS_CERTIFICATE_ISSUER_UNIQUE_ID = `${TBS_CERTIFICATE}.${ISSUER_UNIQUE_ID}`;
var TBS_CERTIFICATE_SUBJECT_UNIQUE_ID = `${TBS_CERTIFICATE}.${SUBJECT_UNIQUE_ID}`;
var TBS_CERTIFICATE_EXTENSIONS = `${TBS_CERTIFICATE}.${EXTENSIONS$2}`;
var CLEAR_PROPS$Q = [
  TBS_CERTIFICATE,
  TBS_CERTIFICATE_VERSION,
  TBS_CERTIFICATE_SERIAL_NUMBER,
  TBS_CERTIFICATE_SIGNATURE,
  TBS_CERTIFICATE_ISSUER,
  TBS_CERTIFICATE_NOT_BEFORE,
  TBS_CERTIFICATE_NOT_AFTER,
  TBS_CERTIFICATE_SUBJECT,
  TBS_CERTIFICATE_SUBJECT_PUBLIC_KEY,
  TBS_CERTIFICATE_ISSUER_UNIQUE_ID,
  TBS_CERTIFICATE_SUBJECT_UNIQUE_ID,
  TBS_CERTIFICATE_EXTENSIONS,
  SIGNATURE_ALGORITHM$5,
  SIGNATURE_VALUE$2
];
function tbsCertificate(parameters = {}) {
  const names = getParametersValue(parameters, "names", {});
  return new Sequence({
    name: names.blockName || TBS_CERTIFICATE,
    value: [
      new Constructed({
        optional: true,
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        value: [
          new Integer({ name: names.tbsCertificateVersion || TBS_CERTIFICATE_VERSION })
        ]
      }),
      new Integer({ name: names.tbsCertificateSerialNumber || TBS_CERTIFICATE_SERIAL_NUMBER }),
      AlgorithmIdentifier.schema(names.signature || {
        names: {
          blockName: TBS_CERTIFICATE_SIGNATURE
        }
      }),
      RelativeDistinguishedNames.schema(names.issuer || {
        names: {
          blockName: TBS_CERTIFICATE_ISSUER
        }
      }),
      new Sequence({
        name: names.tbsCertificateValidity || "tbsCertificate.validity",
        value: [
          Time.schema(names.notBefore || {
            names: {
              utcTimeName: TBS_CERTIFICATE_NOT_BEFORE,
              generalTimeName: TBS_CERTIFICATE_NOT_BEFORE
            }
          }),
          Time.schema(names.notAfter || {
            names: {
              utcTimeName: TBS_CERTIFICATE_NOT_AFTER,
              generalTimeName: TBS_CERTIFICATE_NOT_AFTER
            }
          })
        ]
      }),
      RelativeDistinguishedNames.schema(names.subject || {
        names: {
          blockName: TBS_CERTIFICATE_SUBJECT
        }
      }),
      PublicKeyInfo.schema(names.subjectPublicKeyInfo || {
        names: {
          blockName: TBS_CERTIFICATE_SUBJECT_PUBLIC_KEY
        }
      }),
      new Primitive({
        name: names.tbsCertificateIssuerUniqueID || TBS_CERTIFICATE_ISSUER_UNIQUE_ID,
        optional: true,
        idBlock: {
          tagClass: 3,
          tagNumber: 1
        }
      }),
      new Primitive({
        name: names.tbsCertificateSubjectUniqueID || TBS_CERTIFICATE_SUBJECT_UNIQUE_ID,
        optional: true,
        idBlock: {
          tagClass: 3,
          tagNumber: 2
        }
      }),
      new Constructed({
        optional: true,
        idBlock: {
          tagClass: 3,
          tagNumber: 3
        },
        value: [Extensions.schema(names.extensions || {
          names: {
            blockName: TBS_CERTIFICATE_EXTENSIONS
          }
        })]
      })
    ]
  });
}
var Certificate = class _Certificate extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.tbsView = new Uint8Array(getParametersValue(parameters, TBS$4, _Certificate.defaultValues(TBS$4)));
    this.version = getParametersValue(parameters, VERSION$f, _Certificate.defaultValues(VERSION$f));
    this.serialNumber = getParametersValue(parameters, SERIAL_NUMBER$3, _Certificate.defaultValues(SERIAL_NUMBER$3));
    this.signature = getParametersValue(parameters, SIGNATURE$4, _Certificate.defaultValues(SIGNATURE$4));
    this.issuer = getParametersValue(parameters, ISSUER$2, _Certificate.defaultValues(ISSUER$2));
    this.notBefore = getParametersValue(parameters, NOT_BEFORE, _Certificate.defaultValues(NOT_BEFORE));
    this.notAfter = getParametersValue(parameters, NOT_AFTER, _Certificate.defaultValues(NOT_AFTER));
    this.subject = getParametersValue(parameters, SUBJECT$1, _Certificate.defaultValues(SUBJECT$1));
    this.subjectPublicKeyInfo = getParametersValue(parameters, SUBJECT_PUBLIC_KEY_INFO, _Certificate.defaultValues(SUBJECT_PUBLIC_KEY_INFO));
    if (ISSUER_UNIQUE_ID in parameters) {
      this.issuerUniqueID = getParametersValue(parameters, ISSUER_UNIQUE_ID, _Certificate.defaultValues(ISSUER_UNIQUE_ID));
    }
    if (SUBJECT_UNIQUE_ID in parameters) {
      this.subjectUniqueID = getParametersValue(parameters, SUBJECT_UNIQUE_ID, _Certificate.defaultValues(SUBJECT_UNIQUE_ID));
    }
    if (EXTENSIONS$2 in parameters) {
      this.extensions = getParametersValue(parameters, EXTENSIONS$2, _Certificate.defaultValues(EXTENSIONS$2));
    }
    this.signatureAlgorithm = getParametersValue(parameters, SIGNATURE_ALGORITHM$5, _Certificate.defaultValues(SIGNATURE_ALGORITHM$5));
    this.signatureValue = getParametersValue(parameters, SIGNATURE_VALUE$2, _Certificate.defaultValues(SIGNATURE_VALUE$2));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  get tbs() {
    return pvtsutils2.BufferSourceConverter.toArrayBuffer(this.tbsView);
  }
  set tbs(value) {
    this.tbsView = new Uint8Array(value);
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case TBS$4:
        return EMPTY_BUFFER2;
      case VERSION$f:
        return 0;
      case SERIAL_NUMBER$3:
        return new Integer();
      case SIGNATURE$4:
        return new AlgorithmIdentifier();
      case ISSUER$2:
        return new RelativeDistinguishedNames();
      case NOT_BEFORE:
        return new Time();
      case NOT_AFTER:
        return new Time();
      case SUBJECT$1:
        return new RelativeDistinguishedNames();
      case SUBJECT_PUBLIC_KEY_INFO:
        return new PublicKeyInfo();
      case ISSUER_UNIQUE_ID:
        return EMPTY_BUFFER2;
      case SUBJECT_UNIQUE_ID:
        return EMPTY_BUFFER2;
      case EXTENSIONS$2:
        return [];
      case SIGNATURE_ALGORITHM$5:
        return new AlgorithmIdentifier();
      case SIGNATURE_VALUE$2:
        return new BitString();
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        tbsCertificate(names.tbsCertificate),
        AlgorithmIdentifier.schema(names.signatureAlgorithm || {
          names: {
            blockName: SIGNATURE_ALGORITHM$5
          }
        }),
        new BitString({ name: names.signatureValue || SIGNATURE_VALUE$2 })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$Q);
    const asn1 = compareSchema(schema, schema, _Certificate.schema({
      names: {
        tbsCertificate: {
          names: {
            extensions: {
              names: {
                extensions: TBS_CERTIFICATE_EXTENSIONS
              }
            }
          }
        }
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.tbsView = asn1.result.tbsCertificate.valueBeforeDecodeView;
    if (TBS_CERTIFICATE_VERSION in asn1.result)
      this.version = asn1.result[TBS_CERTIFICATE_VERSION].valueBlock.valueDec;
    this.serialNumber = asn1.result[TBS_CERTIFICATE_SERIAL_NUMBER];
    this.signature = new AlgorithmIdentifier({ schema: asn1.result[TBS_CERTIFICATE_SIGNATURE] });
    this.issuer = new RelativeDistinguishedNames({ schema: asn1.result[TBS_CERTIFICATE_ISSUER] });
    this.notBefore = new Time({ schema: asn1.result[TBS_CERTIFICATE_NOT_BEFORE] });
    this.notAfter = new Time({ schema: asn1.result[TBS_CERTIFICATE_NOT_AFTER] });
    this.subject = new RelativeDistinguishedNames({ schema: asn1.result[TBS_CERTIFICATE_SUBJECT] });
    this.subjectPublicKeyInfo = new PublicKeyInfo({ schema: asn1.result[TBS_CERTIFICATE_SUBJECT_PUBLIC_KEY] });
    if (TBS_CERTIFICATE_ISSUER_UNIQUE_ID in asn1.result)
      this.issuerUniqueID = asn1.result[TBS_CERTIFICATE_ISSUER_UNIQUE_ID].valueBlock.valueHex;
    if (TBS_CERTIFICATE_SUBJECT_UNIQUE_ID in asn1.result)
      this.subjectUniqueID = asn1.result[TBS_CERTIFICATE_SUBJECT_UNIQUE_ID].valueBlock.valueHex;
    if (TBS_CERTIFICATE_EXTENSIONS in asn1.result)
      this.extensions = Array.from(asn1.result[TBS_CERTIFICATE_EXTENSIONS], (element) => new Extension({ schema: element }));
    this.signatureAlgorithm = new AlgorithmIdentifier({ schema: asn1.result.signatureAlgorithm });
    this.signatureValue = asn1.result.signatureValue;
  }
  encodeTBS() {
    const outputArray = [];
    if (VERSION$f in this && this.version !== _Certificate.defaultValues(VERSION$f)) {
      outputArray.push(new Constructed({
        optional: true,
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        value: [
          new Integer({ value: this.version })
        ]
      }));
    }
    outputArray.push(this.serialNumber);
    outputArray.push(this.signature.toSchema());
    outputArray.push(this.issuer.toSchema());
    outputArray.push(new Sequence({
      value: [
        this.notBefore.toSchema(),
        this.notAfter.toSchema()
      ]
    }));
    outputArray.push(this.subject.toSchema());
    outputArray.push(this.subjectPublicKeyInfo.toSchema());
    if (this.issuerUniqueID) {
      outputArray.push(new Primitive({
        optional: true,
        idBlock: {
          tagClass: 3,
          tagNumber: 1
        },
        valueHex: this.issuerUniqueID
      }));
    }
    if (this.subjectUniqueID) {
      outputArray.push(new Primitive({
        optional: true,
        idBlock: {
          tagClass: 3,
          tagNumber: 2
        },
        valueHex: this.subjectUniqueID
      }));
    }
    if (this.extensions) {
      outputArray.push(new Constructed({
        optional: true,
        idBlock: {
          tagClass: 3,
          tagNumber: 3
        },
        value: [new Sequence({
          value: Array.from(this.extensions, (o) => o.toSchema())
        })]
      }));
    }
    return new Sequence({
      value: outputArray
    });
  }
  toSchema(encodeFlag = false) {
    let tbsSchema;
    if (encodeFlag === false) {
      if (!this.tbsView.byteLength) {
        return _Certificate.schema().value[0];
      }
      const asn1 = fromBER(this.tbsView);
      AsnError.assert(asn1, "TBS Certificate");
      tbsSchema = asn1.result;
    } else {
      tbsSchema = this.encodeTBS();
    }
    return new Sequence({
      value: [
        tbsSchema,
        this.signatureAlgorithm.toSchema(),
        this.signatureValue
      ]
    });
  }
  toJSON() {
    const res = {
      tbs: pvtsutils2.Convert.ToHex(this.tbsView),
      version: this.version,
      serialNumber: this.serialNumber.toJSON(),
      signature: this.signature.toJSON(),
      issuer: this.issuer.toJSON(),
      notBefore: this.notBefore.toJSON(),
      notAfter: this.notAfter.toJSON(),
      subject: this.subject.toJSON(),
      subjectPublicKeyInfo: this.subjectPublicKeyInfo.toJSON(),
      signatureAlgorithm: this.signatureAlgorithm.toJSON(),
      signatureValue: this.signatureValue.toJSON()
    };
    if (VERSION$f in this && this.version !== _Certificate.defaultValues(VERSION$f)) {
      res.version = this.version;
    }
    if (this.issuerUniqueID) {
      res.issuerUniqueID = pvtsutils2.Convert.ToHex(this.issuerUniqueID);
    }
    if (this.subjectUniqueID) {
      res.subjectUniqueID = pvtsutils2.Convert.ToHex(this.subjectUniqueID);
    }
    if (this.extensions) {
      res.extensions = Array.from(this.extensions, (o) => o.toJSON());
    }
    return res;
  }
  async getPublicKey(parameters, crypto2 = getCrypto(true)) {
    return crypto2.getPublicKey(this.subjectPublicKeyInfo, this.signatureAlgorithm, parameters);
  }
  async getKeyHash(hashAlgorithm = "SHA-1", crypto2 = getCrypto(true)) {
    return crypto2.digest({ name: hashAlgorithm }, this.subjectPublicKeyInfo.subjectPublicKey.valueBlock.valueHexView);
  }
  async sign(privateKey, hashAlgorithm = "SHA-1", crypto2 = getCrypto(true)) {
    if (!privateKey) {
      throw new Error("Need to provide a private key for signing");
    }
    const signatureParameters = await crypto2.getSignatureParameters(privateKey, hashAlgorithm);
    const parameters = signatureParameters.parameters;
    this.signature = signatureParameters.signatureAlgorithm;
    this.signatureAlgorithm = signatureParameters.signatureAlgorithm;
    this.tbsView = new Uint8Array(this.encodeTBS().toBER());
    const signature = await crypto2.signWithPrivateKey(this.tbsView, privateKey, parameters);
    this.signatureValue = new BitString({ valueHex: signature });
  }
  async verify(issuerCertificate, crypto2 = getCrypto(true)) {
    let subjectPublicKeyInfo;
    if (issuerCertificate) {
      subjectPublicKeyInfo = issuerCertificate.subjectPublicKeyInfo;
    } else if (this.issuer.isEqual(this.subject)) {
      subjectPublicKeyInfo = this.subjectPublicKeyInfo;
    }
    if (!(subjectPublicKeyInfo instanceof PublicKeyInfo)) {
      throw new Error("Please provide issuer certificate as a parameter");
    }
    return crypto2.verifyWithPublicKey(this.tbsView, this.signatureValue, subjectPublicKeyInfo, this.signatureAlgorithm);
  }
};
Certificate.CLASS_NAME = "Certificate";
function checkCA(cert, signerCert = null) {
  if (signerCert && cert.issuer.isEqual(signerCert.issuer) && cert.serialNumber.isEqual(signerCert.serialNumber)) {
    return null;
  }
  let isCA = false;
  if (cert.extensions) {
    for (const extension of cert.extensions) {
      if (extension.extnID === id_BasicConstraints && extension.parsedValue instanceof BasicConstraints) {
        if (extension.parsedValue.cA) {
          isCA = true;
          break;
        }
      }
    }
  }
  if (isCA) {
    return cert;
  }
  return null;
}
var CERT_ID$1 = "certId";
var CERT_VALUE = "certValue";
var PARSED_VALUE$4 = "parsedValue";
var CLEAR_PROPS$P = [
  CERT_ID$1,
  CERT_VALUE
];
var CertBag = class _CertBag extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.certId = getParametersValue(parameters, CERT_ID$1, _CertBag.defaultValues(CERT_ID$1));
    this.certValue = getParametersValue(parameters, CERT_VALUE, _CertBag.defaultValues(CERT_VALUE));
    if (PARSED_VALUE$4 in parameters) {
      this.parsedValue = getParametersValue(parameters, PARSED_VALUE$4, _CertBag.defaultValues(PARSED_VALUE$4));
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case CERT_ID$1:
        return EMPTY_STRING2;
      case CERT_VALUE:
        return new Any();
      case PARSED_VALUE$4:
        return {};
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case CERT_ID$1:
        return memberValue === EMPTY_STRING2;
      case CERT_VALUE:
        return memberValue instanceof Any;
      case PARSED_VALUE$4:
        return memberValue instanceof Object && Object.keys(memberValue).length === 0;
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new ObjectIdentifier({ name: names.id || "id" }),
        new Constructed({
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [new Any({ name: names.value || "value" })]
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$P);
    const asn1 = compareSchema(schema, schema, _CertBag.schema({
      names: {
        id: CERT_ID$1,
        value: CERT_VALUE
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.certId = asn1.result.certId.valueBlock.toString();
    this.certValue = asn1.result.certValue;
    const certValueHex = this.certValue.valueBlock.valueHexView;
    switch (this.certId) {
      case id_CertBag_X509Certificate:
        {
          try {
            this.parsedValue = Certificate.fromBER(certValueHex);
          } catch (ex) {
            AttributeCertificateV2.fromBER(certValueHex);
          }
        }
        break;
      case id_CertBag_AttributeCertificate:
        {
          this.parsedValue = AttributeCertificateV2.fromBER(certValueHex);
        }
        break;
      case id_CertBag_SDSICertificate:
      default:
        throw new Error(`Incorrect CERT_ID value in CertBag: ${this.certId}`);
    }
  }
  toSchema() {
    if (PARSED_VALUE$4 in this) {
      if ("acinfo" in this.parsedValue) {
        this.certId = id_CertBag_AttributeCertificate;
      } else {
        this.certId = id_CertBag_X509Certificate;
      }
      this.certValue = new OctetString({ valueHex: this.parsedValue.toSchema().toBER(false) });
    }
    return new Sequence({
      value: [
        new ObjectIdentifier({ value: this.certId }),
        new Constructed({
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: ["toSchema" in this.certValue ? this.certValue.toSchema() : this.certValue]
        })
      ]
    });
  }
  toJSON() {
    return {
      certId: this.certId,
      certValue: this.certValue.toJSON()
    };
  }
};
CertBag.CLASS_NAME = "CertBag";
var USER_CERTIFICATE = "userCertificate";
var REVOCATION_DATE = "revocationDate";
var CRL_ENTRY_EXTENSIONS = "crlEntryExtensions";
var CLEAR_PROPS$O = [
  USER_CERTIFICATE,
  REVOCATION_DATE,
  CRL_ENTRY_EXTENSIONS
];
var RevokedCertificate = class _RevokedCertificate extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.userCertificate = getParametersValue(parameters, USER_CERTIFICATE, _RevokedCertificate.defaultValues(USER_CERTIFICATE));
    this.revocationDate = getParametersValue(parameters, REVOCATION_DATE, _RevokedCertificate.defaultValues(REVOCATION_DATE));
    if (CRL_ENTRY_EXTENSIONS in parameters) {
      this.crlEntryExtensions = getParametersValue(parameters, CRL_ENTRY_EXTENSIONS, _RevokedCertificate.defaultValues(CRL_ENTRY_EXTENSIONS));
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case USER_CERTIFICATE:
        return new Integer();
      case REVOCATION_DATE:
        return new Time();
      case CRL_ENTRY_EXTENSIONS:
        return new Extensions();
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new Integer({ name: names.userCertificate || USER_CERTIFICATE }),
        Time.schema({
          names: {
            utcTimeName: names.revocationDate || REVOCATION_DATE,
            generalTimeName: names.revocationDate || REVOCATION_DATE
          }
        }),
        Extensions.schema({
          names: {
            blockName: names.crlEntryExtensions || CRL_ENTRY_EXTENSIONS
          }
        }, true)
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$O);
    const asn1 = compareSchema(schema, schema, _RevokedCertificate.schema());
    AsnError.assertSchema(asn1, this.className);
    this.userCertificate = asn1.result.userCertificate;
    this.revocationDate = new Time({ schema: asn1.result.revocationDate });
    if (CRL_ENTRY_EXTENSIONS in asn1.result) {
      this.crlEntryExtensions = new Extensions({ schema: asn1.result.crlEntryExtensions });
    }
  }
  toSchema() {
    const outputArray = [
      this.userCertificate,
      this.revocationDate.toSchema()
    ];
    if (this.crlEntryExtensions) {
      outputArray.push(this.crlEntryExtensions.toSchema());
    }
    return new Sequence({
      value: outputArray
    });
  }
  toJSON() {
    const res = {
      userCertificate: this.userCertificate.toJSON(),
      revocationDate: this.revocationDate.toJSON()
    };
    if (this.crlEntryExtensions) {
      res.crlEntryExtensions = this.crlEntryExtensions.toJSON();
    }
    return res;
  }
};
RevokedCertificate.CLASS_NAME = "RevokedCertificate";
var TBS$3 = "tbs";
var VERSION$e = "version";
var SIGNATURE$3 = "signature";
var ISSUER$1 = "issuer";
var THIS_UPDATE$1 = "thisUpdate";
var NEXT_UPDATE$1 = "nextUpdate";
var REVOKED_CERTIFICATES = "revokedCertificates";
var CRL_EXTENSIONS = "crlExtensions";
var SIGNATURE_ALGORITHM$4 = "signatureAlgorithm";
var SIGNATURE_VALUE$1 = "signatureValue";
var TBS_CERT_LIST = "tbsCertList";
var TBS_CERT_LIST_VERSION = `${TBS_CERT_LIST}.version`;
var TBS_CERT_LIST_SIGNATURE = `${TBS_CERT_LIST}.signature`;
var TBS_CERT_LIST_ISSUER = `${TBS_CERT_LIST}.issuer`;
var TBS_CERT_LIST_THIS_UPDATE = `${TBS_CERT_LIST}.thisUpdate`;
var TBS_CERT_LIST_NEXT_UPDATE = `${TBS_CERT_LIST}.nextUpdate`;
var TBS_CERT_LIST_REVOKED_CERTIFICATES = `${TBS_CERT_LIST}.revokedCertificates`;
var TBS_CERT_LIST_EXTENSIONS = `${TBS_CERT_LIST}.extensions`;
var CLEAR_PROPS$N = [
  TBS_CERT_LIST,
  TBS_CERT_LIST_VERSION,
  TBS_CERT_LIST_SIGNATURE,
  TBS_CERT_LIST_ISSUER,
  TBS_CERT_LIST_THIS_UPDATE,
  TBS_CERT_LIST_NEXT_UPDATE,
  TBS_CERT_LIST_REVOKED_CERTIFICATES,
  TBS_CERT_LIST_EXTENSIONS,
  SIGNATURE_ALGORITHM$4,
  SIGNATURE_VALUE$1
];
function tbsCertList(parameters = {}) {
  const names = getParametersValue(parameters, "names", {});
  return new Sequence({
    name: names.blockName || TBS_CERT_LIST,
    value: [
      new Integer({
        optional: true,
        name: names.tbsCertListVersion || TBS_CERT_LIST_VERSION,
        value: 2
      }),
      AlgorithmIdentifier.schema(names.signature || {
        names: {
          blockName: TBS_CERT_LIST_SIGNATURE
        }
      }),
      RelativeDistinguishedNames.schema(names.issuer || {
        names: {
          blockName: TBS_CERT_LIST_ISSUER
        }
      }),
      Time.schema(names.tbsCertListThisUpdate || {
        names: {
          utcTimeName: TBS_CERT_LIST_THIS_UPDATE,
          generalTimeName: TBS_CERT_LIST_THIS_UPDATE
        }
      }),
      Time.schema(names.tbsCertListNextUpdate || {
        names: {
          utcTimeName: TBS_CERT_LIST_NEXT_UPDATE,
          generalTimeName: TBS_CERT_LIST_NEXT_UPDATE
        }
      }, true),
      new Sequence({
        optional: true,
        value: [
          new Repeated({
            name: names.tbsCertListRevokedCertificates || TBS_CERT_LIST_REVOKED_CERTIFICATES,
            value: new Sequence({
              value: [
                new Integer(),
                Time.schema(),
                Extensions.schema({}, true)
              ]
            })
          })
        ]
      }),
      new Constructed({
        optional: true,
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        value: [Extensions.schema(names.crlExtensions || {
          names: {
            blockName: TBS_CERT_LIST_EXTENSIONS
          }
        })]
      })
    ]
  });
}
var WELL_KNOWN_EXTENSIONS = [
  id_AuthorityKeyIdentifier,
  id_IssuerAltName,
  id_CRLNumber,
  id_BaseCRLNumber,
  id_IssuingDistributionPoint,
  id_FreshestCRL,
  id_AuthorityInfoAccess,
  id_CRLReason,
  id_InvalidityDate,
  id_CertificateIssuer
];
var CertificateRevocationList = class _CertificateRevocationList extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.tbsView = new Uint8Array(getParametersValue(parameters, TBS$3, _CertificateRevocationList.defaultValues(TBS$3)));
    this.version = getParametersValue(parameters, VERSION$e, _CertificateRevocationList.defaultValues(VERSION$e));
    this.signature = getParametersValue(parameters, SIGNATURE$3, _CertificateRevocationList.defaultValues(SIGNATURE$3));
    this.issuer = getParametersValue(parameters, ISSUER$1, _CertificateRevocationList.defaultValues(ISSUER$1));
    this.thisUpdate = getParametersValue(parameters, THIS_UPDATE$1, _CertificateRevocationList.defaultValues(THIS_UPDATE$1));
    if (NEXT_UPDATE$1 in parameters) {
      this.nextUpdate = getParametersValue(parameters, NEXT_UPDATE$1, _CertificateRevocationList.defaultValues(NEXT_UPDATE$1));
    }
    if (REVOKED_CERTIFICATES in parameters) {
      this.revokedCertificates = getParametersValue(parameters, REVOKED_CERTIFICATES, _CertificateRevocationList.defaultValues(REVOKED_CERTIFICATES));
    }
    if (CRL_EXTENSIONS in parameters) {
      this.crlExtensions = getParametersValue(parameters, CRL_EXTENSIONS, _CertificateRevocationList.defaultValues(CRL_EXTENSIONS));
    }
    this.signatureAlgorithm = getParametersValue(parameters, SIGNATURE_ALGORITHM$4, _CertificateRevocationList.defaultValues(SIGNATURE_ALGORITHM$4));
    this.signatureValue = getParametersValue(parameters, SIGNATURE_VALUE$1, _CertificateRevocationList.defaultValues(SIGNATURE_VALUE$1));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  get tbs() {
    return pvtsutils2.BufferSourceConverter.toArrayBuffer(this.tbsView);
  }
  set tbs(value) {
    this.tbsView = new Uint8Array(value);
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case TBS$3:
        return EMPTY_BUFFER2;
      case VERSION$e:
        return 0;
      case SIGNATURE$3:
        return new AlgorithmIdentifier();
      case ISSUER$1:
        return new RelativeDistinguishedNames();
      case THIS_UPDATE$1:
        return new Time();
      case NEXT_UPDATE$1:
        return new Time();
      case REVOKED_CERTIFICATES:
        return [];
      case CRL_EXTENSIONS:
        return new Extensions();
      case SIGNATURE_ALGORITHM$4:
        return new AlgorithmIdentifier();
      case SIGNATURE_VALUE$1:
        return new BitString();
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || "CertificateList",
      value: [
        tbsCertList(parameters),
        AlgorithmIdentifier.schema(names.signatureAlgorithm || {
          names: {
            blockName: SIGNATURE_ALGORITHM$4
          }
        }),
        new BitString({ name: names.signatureValue || SIGNATURE_VALUE$1 })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$N);
    const asn1 = compareSchema(schema, schema, _CertificateRevocationList.schema());
    AsnError.assertSchema(asn1, this.className);
    this.tbsView = asn1.result.tbsCertList.valueBeforeDecodeView;
    if (TBS_CERT_LIST_VERSION in asn1.result) {
      this.version = asn1.result[TBS_CERT_LIST_VERSION].valueBlock.valueDec;
    }
    this.signature = new AlgorithmIdentifier({ schema: asn1.result[TBS_CERT_LIST_SIGNATURE] });
    this.issuer = new RelativeDistinguishedNames({ schema: asn1.result[TBS_CERT_LIST_ISSUER] });
    this.thisUpdate = new Time({ schema: asn1.result[TBS_CERT_LIST_THIS_UPDATE] });
    if (TBS_CERT_LIST_NEXT_UPDATE in asn1.result) {
      this.nextUpdate = new Time({ schema: asn1.result[TBS_CERT_LIST_NEXT_UPDATE] });
    }
    if (TBS_CERT_LIST_REVOKED_CERTIFICATES in asn1.result) {
      this.revokedCertificates = Array.from(asn1.result[TBS_CERT_LIST_REVOKED_CERTIFICATES], (element) => new RevokedCertificate({ schema: element }));
    }
    if (TBS_CERT_LIST_EXTENSIONS in asn1.result) {
      this.crlExtensions = new Extensions({ schema: asn1.result[TBS_CERT_LIST_EXTENSIONS] });
    }
    this.signatureAlgorithm = new AlgorithmIdentifier({ schema: asn1.result.signatureAlgorithm });
    this.signatureValue = asn1.result.signatureValue;
  }
  encodeTBS() {
    const outputArray = [];
    if (this.version !== _CertificateRevocationList.defaultValues(VERSION$e)) {
      outputArray.push(new Integer({ value: this.version }));
    }
    outputArray.push(this.signature.toSchema());
    outputArray.push(this.issuer.toSchema());
    outputArray.push(this.thisUpdate.toSchema());
    if (this.nextUpdate) {
      outputArray.push(this.nextUpdate.toSchema());
    }
    if (this.revokedCertificates) {
      outputArray.push(new Sequence({
        value: Array.from(this.revokedCertificates, (o) => o.toSchema())
      }));
    }
    if (this.crlExtensions) {
      outputArray.push(new Constructed({
        optional: true,
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        value: [
          this.crlExtensions.toSchema()
        ]
      }));
    }
    return new Sequence({
      value: outputArray
    });
  }
  toSchema(encodeFlag = false) {
    let tbsSchema;
    if (!encodeFlag) {
      if (!this.tbsView.byteLength) {
        return _CertificateRevocationList.schema();
      }
      const asn1 = fromBER(this.tbsView);
      AsnError.assert(asn1, "TBS Certificate Revocation List");
      tbsSchema = asn1.result;
    } else {
      tbsSchema = this.encodeTBS();
    }
    return new Sequence({
      value: [
        tbsSchema,
        this.signatureAlgorithm.toSchema(),
        this.signatureValue
      ]
    });
  }
  toJSON() {
    const res = {
      tbs: pvtsutils2.Convert.ToHex(this.tbsView),
      version: this.version,
      signature: this.signature.toJSON(),
      issuer: this.issuer.toJSON(),
      thisUpdate: this.thisUpdate.toJSON(),
      signatureAlgorithm: this.signatureAlgorithm.toJSON(),
      signatureValue: this.signatureValue.toJSON()
    };
    if (this.version !== _CertificateRevocationList.defaultValues(VERSION$e))
      res.version = this.version;
    if (this.nextUpdate) {
      res.nextUpdate = this.nextUpdate.toJSON();
    }
    if (this.revokedCertificates) {
      res.revokedCertificates = Array.from(this.revokedCertificates, (o) => o.toJSON());
    }
    if (this.crlExtensions) {
      res.crlExtensions = this.crlExtensions.toJSON();
    }
    return res;
  }
  isCertificateRevoked(certificate) {
    if (!this.issuer.isEqual(certificate.issuer)) {
      return false;
    }
    if (!this.revokedCertificates) {
      return false;
    }
    for (const revokedCertificate of this.revokedCertificates) {
      if (revokedCertificate.userCertificate.isEqual(certificate.serialNumber)) {
        return true;
      }
    }
    return false;
  }
  async sign(privateKey, hashAlgorithm = "SHA-1", crypto2 = getCrypto(true)) {
    if (!privateKey) {
      throw new Error("Need to provide a private key for signing");
    }
    const signatureParameters = await crypto2.getSignatureParameters(privateKey, hashAlgorithm);
    const { parameters } = signatureParameters;
    this.signature = signatureParameters.signatureAlgorithm;
    this.signatureAlgorithm = signatureParameters.signatureAlgorithm;
    this.tbsView = new Uint8Array(this.encodeTBS().toBER());
    const signature = await crypto2.signWithPrivateKey(this.tbsView, privateKey, parameters);
    this.signatureValue = new BitString({ valueHex: signature });
  }
  async verify(parameters = {}, crypto2 = getCrypto(true)) {
    let subjectPublicKeyInfo;
    if (parameters.issuerCertificate) {
      subjectPublicKeyInfo = parameters.issuerCertificate.subjectPublicKeyInfo;
      if (!this.issuer.isEqual(parameters.issuerCertificate.subject)) {
        return false;
      }
    }
    if (parameters.publicKeyInfo) {
      subjectPublicKeyInfo = parameters.publicKeyInfo;
    }
    if (!subjectPublicKeyInfo) {
      throw new Error("Issuer's certificate must be provided as an input parameter");
    }
    if (this.crlExtensions) {
      for (const extension of this.crlExtensions.extensions) {
        if (extension.critical) {
          if (!WELL_KNOWN_EXTENSIONS.includes(extension.extnID))
            return false;
        }
      }
    }
    return crypto2.verifyWithPublicKey(this.tbsView, this.signatureValue, subjectPublicKeyInfo, this.signatureAlgorithm);
  }
};
CertificateRevocationList.CLASS_NAME = "CertificateRevocationList";
var CRL_ID = "crlId";
var CRL_VALUE = "crlValue";
var PARSED_VALUE$3 = "parsedValue";
var CLEAR_PROPS$M = [
  CRL_ID,
  CRL_VALUE
];
var CRLBag = class _CRLBag extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.crlId = getParametersValue(parameters, CRL_ID, _CRLBag.defaultValues(CRL_ID));
    this.crlValue = getParametersValue(parameters, CRL_VALUE, _CRLBag.defaultValues(CRL_VALUE));
    if (PARSED_VALUE$3 in parameters) {
      this.parsedValue = getParametersValue(parameters, PARSED_VALUE$3, _CRLBag.defaultValues(PARSED_VALUE$3));
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case CRL_ID:
        return EMPTY_STRING2;
      case CRL_VALUE:
        return new Any();
      case PARSED_VALUE$3:
        return {};
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case CRL_ID:
        return memberValue === EMPTY_STRING2;
      case CRL_VALUE:
        return memberValue instanceof Any;
      case PARSED_VALUE$3:
        return memberValue instanceof Object && Object.keys(memberValue).length === 0;
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new ObjectIdentifier({ name: names.id || "id" }),
        new Constructed({
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [new Any({ name: names.value || "value" })]
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$M);
    const asn1 = compareSchema(schema, schema, _CRLBag.schema({
      names: {
        id: CRL_ID,
        value: CRL_VALUE
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.crlId = asn1.result.crlId.valueBlock.toString();
    this.crlValue = asn1.result.crlValue;
    switch (this.crlId) {
      case id_CRLBag_X509CRL:
        {
          this.parsedValue = CertificateRevocationList.fromBER(this.certValue.valueBlock.valueHex);
        }
        break;
      default:
        throw new Error(`Incorrect CRL_ID value in CRLBag: ${this.crlId}`);
    }
  }
  toSchema() {
    if (this.parsedValue) {
      this.crlId = id_CRLBag_X509CRL;
      this.crlValue = new OctetString({ valueHex: this.parsedValue.toSchema().toBER(false) });
    }
    return new Sequence({
      value: [
        new ObjectIdentifier({ value: this.crlId }),
        new Constructed({
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [this.crlValue.toSchema()]
        })
      ]
    });
  }
  toJSON() {
    return {
      crlId: this.crlId,
      crlValue: this.crlValue.toJSON()
    };
  }
};
CRLBag.CLASS_NAME = "CRLBag";
var VERSION$d = "version";
var ENCRYPTED_CONTENT_INFO$1 = "encryptedContentInfo";
var UNPROTECTED_ATTRS$1 = "unprotectedAttrs";
var CLEAR_PROPS$L = [
  VERSION$d,
  ENCRYPTED_CONTENT_INFO$1,
  UNPROTECTED_ATTRS$1
];
var EncryptedData = class _EncryptedData extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.version = getParametersValue(parameters, VERSION$d, _EncryptedData.defaultValues(VERSION$d));
    this.encryptedContentInfo = getParametersValue(parameters, ENCRYPTED_CONTENT_INFO$1, _EncryptedData.defaultValues(ENCRYPTED_CONTENT_INFO$1));
    if (UNPROTECTED_ATTRS$1 in parameters) {
      this.unprotectedAttrs = getParametersValue(parameters, UNPROTECTED_ATTRS$1, _EncryptedData.defaultValues(UNPROTECTED_ATTRS$1));
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case VERSION$d:
        return 0;
      case ENCRYPTED_CONTENT_INFO$1:
        return new EncryptedContentInfo();
      case UNPROTECTED_ATTRS$1:
        return [];
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case VERSION$d:
        return memberValue === 0;
      case ENCRYPTED_CONTENT_INFO$1:
        return EncryptedContentInfo.compareWithDefault("contentType", memberValue.contentType) && EncryptedContentInfo.compareWithDefault("contentEncryptionAlgorithm", memberValue.contentEncryptionAlgorithm) && EncryptedContentInfo.compareWithDefault("encryptedContent", memberValue.encryptedContent);
      case UNPROTECTED_ATTRS$1:
        return memberValue.length === 0;
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new Integer({ name: names.version || EMPTY_STRING2 }),
        EncryptedContentInfo.schema(names.encryptedContentInfo || {}),
        new Constructed({
          optional: true,
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          },
          value: [
            new Repeated({
              name: names.unprotectedAttrs || EMPTY_STRING2,
              value: Attribute.schema()
            })
          ]
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$L);
    const asn1 = compareSchema(schema, schema, _EncryptedData.schema({
      names: {
        version: VERSION$d,
        encryptedContentInfo: {
          names: {
            blockName: ENCRYPTED_CONTENT_INFO$1
          }
        },
        unprotectedAttrs: UNPROTECTED_ATTRS$1
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.version = asn1.result.version.valueBlock.valueDec;
    this.encryptedContentInfo = new EncryptedContentInfo({ schema: asn1.result.encryptedContentInfo });
    if (UNPROTECTED_ATTRS$1 in asn1.result)
      this.unprotectedAttrs = Array.from(asn1.result.unprotectedAttrs, (element) => new Attribute({ schema: element }));
  }
  toSchema() {
    const outputArray = [];
    outputArray.push(new Integer({ value: this.version }));
    outputArray.push(this.encryptedContentInfo.toSchema());
    if (this.unprotectedAttrs) {
      outputArray.push(new Constructed({
        optional: true,
        idBlock: {
          tagClass: 3,
          tagNumber: 1
        },
        value: Array.from(this.unprotectedAttrs, (o) => o.toSchema())
      }));
    }
    return new Sequence({
      value: outputArray
    });
  }
  toJSON() {
    const res = {
      version: this.version,
      encryptedContentInfo: this.encryptedContentInfo.toJSON()
    };
    if (this.unprotectedAttrs)
      res.unprotectedAttrs = Array.from(this.unprotectedAttrs, (o) => o.toJSON());
    return res;
  }
  async encrypt(parameters, crypto2 = getCrypto(true)) {
    ArgumentError.assert(parameters, "parameters", "object");
    const encryptParams = {
      ...parameters,
      contentType: "1.2.840.113549.1.7.1"
    };
    this.encryptedContentInfo = await crypto2.encryptEncryptedContentInfo(encryptParams);
  }
  async decrypt(parameters, crypto2 = getCrypto(true)) {
    ArgumentError.assert(parameters, "parameters", "object");
    const decryptParams = {
      ...parameters,
      encryptedContentInfo: this.encryptedContentInfo
    };
    return crypto2.decryptEncryptedContentInfo(decryptParams);
  }
};
EncryptedData.CLASS_NAME = "EncryptedData";
var ENCRYPTION_ALGORITHM = "encryptionAlgorithm";
var ENCRYPTED_DATA = "encryptedData";
var PARSED_VALUE$2 = "parsedValue";
var CLEAR_PROPS$K = [
  ENCRYPTION_ALGORITHM,
  ENCRYPTED_DATA
];
var PKCS8ShroudedKeyBag = class _PKCS8ShroudedKeyBag extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.encryptionAlgorithm = getParametersValue(parameters, ENCRYPTION_ALGORITHM, _PKCS8ShroudedKeyBag.defaultValues(ENCRYPTION_ALGORITHM));
    this.encryptedData = getParametersValue(parameters, ENCRYPTED_DATA, _PKCS8ShroudedKeyBag.defaultValues(ENCRYPTED_DATA));
    if (PARSED_VALUE$2 in parameters) {
      this.parsedValue = getParametersValue(parameters, PARSED_VALUE$2, _PKCS8ShroudedKeyBag.defaultValues(PARSED_VALUE$2));
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case ENCRYPTION_ALGORITHM:
        return new AlgorithmIdentifier();
      case ENCRYPTED_DATA:
        return new OctetString();
      case PARSED_VALUE$2:
        return {};
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case ENCRYPTION_ALGORITHM:
        return AlgorithmIdentifier.compareWithDefault("algorithmId", memberValue.algorithmId) && "algorithmParams" in memberValue === false;
      case ENCRYPTED_DATA:
        return memberValue.isEqual(_PKCS8ShroudedKeyBag.defaultValues(memberName));
      case PARSED_VALUE$2:
        return memberValue instanceof Object && Object.keys(memberValue).length === 0;
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        AlgorithmIdentifier.schema(names.encryptionAlgorithm || {
          names: {
            blockName: ENCRYPTION_ALGORITHM
          }
        }),
        new Choice({
          value: [
            new OctetString({ name: names.encryptedData || ENCRYPTED_DATA }),
            new OctetString({
              idBlock: {
                isConstructed: true
              },
              name: names.encryptedData || ENCRYPTED_DATA
            })
          ]
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$K);
    const asn1 = compareSchema(schema, schema, _PKCS8ShroudedKeyBag.schema({
      names: {
        encryptionAlgorithm: {
          names: {
            blockName: ENCRYPTION_ALGORITHM
          }
        },
        encryptedData: ENCRYPTED_DATA
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.encryptionAlgorithm = new AlgorithmIdentifier({ schema: asn1.result.encryptionAlgorithm });
    this.encryptedData = asn1.result.encryptedData;
  }
  toSchema() {
    return new Sequence({
      value: [
        this.encryptionAlgorithm.toSchema(),
        this.encryptedData
      ]
    });
  }
  toJSON() {
    return {
      encryptionAlgorithm: this.encryptionAlgorithm.toJSON(),
      encryptedData: this.encryptedData.toJSON()
    };
  }
  async parseInternalValues(parameters, crypto2 = getCrypto(true)) {
    const cmsEncrypted = new EncryptedData({
      encryptedContentInfo: new EncryptedContentInfo({
        contentEncryptionAlgorithm: this.encryptionAlgorithm,
        encryptedContent: this.encryptedData
      })
    });
    const decryptedData = await cmsEncrypted.decrypt(parameters, crypto2);
    this.parsedValue = PrivateKeyInfo.fromBER(decryptedData);
  }
  async makeInternalValues(parameters, crypto2 = getCrypto(true)) {
    if (!this.parsedValue) {
      throw new Error('Please initialize "parsedValue" first');
    }
    const cmsEncrypted = new EncryptedData();
    const encryptParams = {
      ...parameters,
      contentToEncrypt: this.parsedValue.toSchema().toBER(false)
    };
    await cmsEncrypted.encrypt(encryptParams, crypto2);
    if (!cmsEncrypted.encryptedContentInfo.encryptedContent) {
      throw new Error("The filed `encryptedContent` in EncryptedContentInfo is empty");
    }
    this.encryptionAlgorithm = cmsEncrypted.encryptedContentInfo.contentEncryptionAlgorithm;
    this.encryptedData = cmsEncrypted.encryptedContentInfo.encryptedContent;
  }
};
PKCS8ShroudedKeyBag.CLASS_NAME = "PKCS8ShroudedKeyBag";
var SECRET_TYPE_ID = "secretTypeId";
var SECRET_VALUE = "secretValue";
var CLEAR_PROPS$J = [
  SECRET_TYPE_ID,
  SECRET_VALUE
];
var SecretBag = class _SecretBag extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.secretTypeId = getParametersValue(parameters, SECRET_TYPE_ID, _SecretBag.defaultValues(SECRET_TYPE_ID));
    this.secretValue = getParametersValue(parameters, SECRET_VALUE, _SecretBag.defaultValues(SECRET_VALUE));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case SECRET_TYPE_ID:
        return EMPTY_STRING2;
      case SECRET_VALUE:
        return new Any();
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case SECRET_TYPE_ID:
        return memberValue === EMPTY_STRING2;
      case SECRET_VALUE:
        return memberValue instanceof Any;
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new ObjectIdentifier({ name: names.id || "id" }),
        new Constructed({
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [new Any({ name: names.value || "value" })]
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$J);
    const asn1 = compareSchema(schema, schema, _SecretBag.schema({
      names: {
        id: SECRET_TYPE_ID,
        value: SECRET_VALUE
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.secretTypeId = asn1.result.secretTypeId.valueBlock.toString();
    this.secretValue = asn1.result.secretValue;
  }
  toSchema() {
    return new Sequence({
      value: [
        new ObjectIdentifier({ value: this.secretTypeId }),
        new Constructed({
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [this.secretValue.toSchema()]
        })
      ]
    });
  }
  toJSON() {
    return {
      secretTypeId: this.secretTypeId,
      secretValue: this.secretValue.toJSON()
    };
  }
};
SecretBag.CLASS_NAME = "SecretBag";
var SafeBagValueFactory = class _SafeBagValueFactory {
  static getItems() {
    if (!this.items) {
      this.items = {};
      _SafeBagValueFactory.register("1.2.840.113549.1.12.10.1.1", PrivateKeyInfo);
      _SafeBagValueFactory.register("1.2.840.113549.1.12.10.1.2", PKCS8ShroudedKeyBag);
      _SafeBagValueFactory.register("1.2.840.113549.1.12.10.1.3", CertBag);
      _SafeBagValueFactory.register("1.2.840.113549.1.12.10.1.4", CRLBag);
      _SafeBagValueFactory.register("1.2.840.113549.1.12.10.1.5", SecretBag);
      _SafeBagValueFactory.register("1.2.840.113549.1.12.10.1.6", SafeContents);
    }
    return this.items;
  }
  static register(id, type) {
    this.getItems()[id] = type;
  }
  static find(id) {
    return this.getItems()[id] || null;
  }
};
var BAG_ID = "bagId";
var BAG_VALUE = "bagValue";
var BAG_ATTRIBUTES = "bagAttributes";
var CLEAR_PROPS$I = [
  BAG_ID,
  BAG_VALUE,
  BAG_ATTRIBUTES
];
var SafeBag = class _SafeBag extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.bagId = getParametersValue(parameters, BAG_ID, _SafeBag.defaultValues(BAG_ID));
    this.bagValue = getParametersValue(parameters, BAG_VALUE, _SafeBag.defaultValues(BAG_VALUE));
    if (BAG_ATTRIBUTES in parameters) {
      this.bagAttributes = getParametersValue(parameters, BAG_ATTRIBUTES, _SafeBag.defaultValues(BAG_ATTRIBUTES));
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case BAG_ID:
        return EMPTY_STRING2;
      case BAG_VALUE:
        return new Any();
      case BAG_ATTRIBUTES:
        return [];
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case BAG_ID:
        return memberValue === EMPTY_STRING2;
      case BAG_VALUE:
        return memberValue instanceof Any;
      case BAG_ATTRIBUTES:
        return memberValue.length === 0;
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new ObjectIdentifier({ name: names.bagId || BAG_ID }),
        new Constructed({
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [new Any({ name: names.bagValue || BAG_VALUE })]
        }),
        new Set2({
          optional: true,
          value: [
            new Repeated({
              name: names.bagAttributes || BAG_ATTRIBUTES,
              value: Attribute.schema()
            })
          ]
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$I);
    const asn1 = compareSchema(schema, schema, _SafeBag.schema({
      names: {
        bagId: BAG_ID,
        bagValue: BAG_VALUE,
        bagAttributes: BAG_ATTRIBUTES
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.bagId = asn1.result.bagId.valueBlock.toString();
    const bagType = SafeBagValueFactory.find(this.bagId);
    if (!bagType) {
      throw new Error(`Invalid BAG_ID for SafeBag: ${this.bagId}`);
    }
    this.bagValue = new bagType({ schema: asn1.result.bagValue });
    if (BAG_ATTRIBUTES in asn1.result) {
      this.bagAttributes = Array.from(asn1.result.bagAttributes, (element) => new Attribute({ schema: element }));
    }
  }
  toSchema() {
    const outputArray = [
      new ObjectIdentifier({ value: this.bagId }),
      new Constructed({
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        value: [this.bagValue.toSchema()]
      })
    ];
    if (this.bagAttributes) {
      outputArray.push(new Set2({
        value: Array.from(this.bagAttributes, (o) => o.toSchema())
      }));
    }
    return new Sequence({
      value: outputArray
    });
  }
  toJSON() {
    const output = {
      bagId: this.bagId,
      bagValue: this.bagValue.toJSON()
    };
    if (this.bagAttributes) {
      output.bagAttributes = Array.from(this.bagAttributes, (o) => o.toJSON());
    }
    return output;
  }
};
SafeBag.CLASS_NAME = "SafeBag";
var SAFE_BUGS = "safeBags";
var SafeContents = class _SafeContents extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.safeBags = getParametersValue(parameters, SAFE_BUGS, _SafeContents.defaultValues(SAFE_BUGS));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case SAFE_BUGS:
        return [];
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case SAFE_BUGS:
        return memberValue.length === 0;
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new Repeated({
          name: names.safeBags || EMPTY_STRING2,
          value: SafeBag.schema()
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, [
      SAFE_BUGS
    ]);
    const asn1 = compareSchema(schema, schema, _SafeContents.schema({
      names: {
        safeBags: SAFE_BUGS
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.safeBags = Array.from(asn1.result.safeBags, (element) => new SafeBag({ schema: element }));
  }
  toSchema() {
    return new Sequence({
      value: Array.from(this.safeBags, (o) => o.toSchema())
    });
  }
  toJSON() {
    return {
      safeBags: Array.from(this.safeBags, (o) => o.toJSON())
    };
  }
};
SafeContents.CLASS_NAME = "SafeContents";
var OTHER_CERT_FORMAT = "otherCertFormat";
var OTHER_CERT = "otherCert";
var CLEAR_PROPS$H = [
  OTHER_CERT_FORMAT,
  OTHER_CERT
];
var OtherCertificateFormat = class _OtherCertificateFormat extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.otherCertFormat = getParametersValue(parameters, OTHER_CERT_FORMAT, _OtherCertificateFormat.defaultValues(OTHER_CERT_FORMAT));
    this.otherCert = getParametersValue(parameters, OTHER_CERT, _OtherCertificateFormat.defaultValues(OTHER_CERT));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case OTHER_CERT_FORMAT:
        return EMPTY_STRING2;
      case OTHER_CERT:
        return new Any();
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new ObjectIdentifier({ name: names.otherCertFormat || OTHER_CERT_FORMAT }),
        new Any({ name: names.otherCert || OTHER_CERT })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$H);
    const asn1 = compareSchema(schema, schema, _OtherCertificateFormat.schema());
    AsnError.assertSchema(asn1, this.className);
    this.otherCertFormat = asn1.result.otherCertFormat.valueBlock.toString();
    this.otherCert = asn1.result.otherCert;
  }
  toSchema() {
    return new Sequence({
      value: [
        new ObjectIdentifier({ value: this.otherCertFormat }),
        this.otherCert
      ]
    });
  }
  toJSON() {
    const res = {
      otherCertFormat: this.otherCertFormat
    };
    if (!(this.otherCert instanceof Any)) {
      res.otherCert = this.otherCert.toJSON();
    }
    return res;
  }
};
var CERTIFICATES$1 = "certificates";
var CLEAR_PROPS$G = [
  CERTIFICATES$1
];
var CertificateSet = class _CertificateSet extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.certificates = getParametersValue(parameters, CERTIFICATES$1, _CertificateSet.defaultValues(CERTIFICATES$1));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case CERTIFICATES$1:
        return [];
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Set2({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new Repeated({
          name: names.certificates || CERTIFICATES$1,
          value: new Choice({
            value: [
              Certificate.schema(),
              new Constructed({
                idBlock: {
                  tagClass: 3,
                  tagNumber: 0
                },
                value: [
                  new Any()
                ]
              }),
              new Constructed({
                idBlock: {
                  tagClass: 3,
                  tagNumber: 1
                },
                value: [
                  new Sequence()
                ]
              }),
              new Constructed({
                idBlock: {
                  tagClass: 3,
                  tagNumber: 2
                },
                value: AttributeCertificateV2.schema().valueBlock.value
              }),
              new Constructed({
                idBlock: {
                  tagClass: 3,
                  tagNumber: 3
                },
                value: OtherCertificateFormat.schema().valueBlock.value
              })
            ]
          })
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$G);
    const asn1 = compareSchema(schema, schema, _CertificateSet.schema());
    AsnError.assertSchema(asn1, this.className);
    this.certificates = Array.from(asn1.result.certificates || [], (element) => {
      const initialTagNumber = element.idBlock.tagNumber;
      if (element.idBlock.tagClass === 1)
        return new Certificate({ schema: element });
      const elementSequence = new Sequence({
        value: element.valueBlock.value
      });
      switch (initialTagNumber) {
        case 1:
          if (elementSequence.valueBlock.value[0].valueBlock.value[0].valueBlock.valueDec === 1) {
            return new AttributeCertificateV2({ schema: elementSequence });
          } else {
            return new AttributeCertificateV1({ schema: elementSequence });
          }
        case 2:
          return new AttributeCertificateV2({ schema: elementSequence });
        case 3:
          return new OtherCertificateFormat({ schema: elementSequence });
      }
      return element;
    });
  }
  toSchema() {
    return new Set2({
      value: Array.from(this.certificates, (element) => {
        switch (true) {
          case element instanceof Certificate:
            return element.toSchema();
          case element instanceof AttributeCertificateV1:
            return new Constructed({
              idBlock: {
                tagClass: 3,
                tagNumber: 1
              },
              value: element.toSchema().valueBlock.value
            });
          case element instanceof AttributeCertificateV2:
            return new Constructed({
              idBlock: {
                tagClass: 3,
                tagNumber: 2
              },
              value: element.toSchema().valueBlock.value
            });
          case element instanceof OtherCertificateFormat:
            return new Constructed({
              idBlock: {
                tagClass: 3,
                tagNumber: 3
              },
              value: element.toSchema().valueBlock.value
            });
        }
        return element.toSchema();
      })
    });
  }
  toJSON() {
    return {
      certificates: Array.from(this.certificates, (o) => o.toJSON())
    };
  }
};
CertificateSet.CLASS_NAME = "CertificateSet";
var OTHER_REV_INFO_FORMAT = "otherRevInfoFormat";
var OTHER_REV_INFO = "otherRevInfo";
var CLEAR_PROPS$F = [
  OTHER_REV_INFO_FORMAT,
  OTHER_REV_INFO
];
var OtherRevocationInfoFormat = class _OtherRevocationInfoFormat extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.otherRevInfoFormat = getParametersValue(parameters, OTHER_REV_INFO_FORMAT, _OtherRevocationInfoFormat.defaultValues(OTHER_REV_INFO_FORMAT));
    this.otherRevInfo = getParametersValue(parameters, OTHER_REV_INFO, _OtherRevocationInfoFormat.defaultValues(OTHER_REV_INFO));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case OTHER_REV_INFO_FORMAT:
        return EMPTY_STRING2;
      case OTHER_REV_INFO:
        return new Any();
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new ObjectIdentifier({ name: names.otherRevInfoFormat || OTHER_REV_INFO_FORMAT }),
        new Any({ name: names.otherRevInfo || OTHER_REV_INFO })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$F);
    const asn1 = compareSchema(schema, schema, _OtherRevocationInfoFormat.schema());
    AsnError.assertSchema(asn1, this.className);
    this.otherRevInfoFormat = asn1.result.otherRevInfoFormat.valueBlock.toString();
    this.otherRevInfo = asn1.result.otherRevInfo;
  }
  toSchema() {
    return new Sequence({
      value: [
        new ObjectIdentifier({ value: this.otherRevInfoFormat }),
        this.otherRevInfo
      ]
    });
  }
  toJSON() {
    const res = {
      otherRevInfoFormat: this.otherRevInfoFormat
    };
    if (!(this.otherRevInfo instanceof Any)) {
      res.otherRevInfo = this.otherRevInfo.toJSON();
    }
    return res;
  }
};
OtherRevocationInfoFormat.CLASS_NAME = "OtherRevocationInfoFormat";
var CRLS$3 = "crls";
var OTHER_REVOCATION_INFOS = "otherRevocationInfos";
var CLEAR_PROPS$E = [
  CRLS$3
];
var RevocationInfoChoices = class _RevocationInfoChoices extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.crls = getParametersValue(parameters, CRLS$3, _RevocationInfoChoices.defaultValues(CRLS$3));
    this.otherRevocationInfos = getParametersValue(parameters, OTHER_REVOCATION_INFOS, _RevocationInfoChoices.defaultValues(OTHER_REVOCATION_INFOS));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case CRLS$3:
        return [];
      case OTHER_REVOCATION_INFOS:
        return [];
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Set2({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new Repeated({
          name: names.crls || EMPTY_STRING2,
          value: new Choice({
            value: [
              CertificateRevocationList.schema(),
              new Constructed({
                idBlock: {
                  tagClass: 3,
                  tagNumber: 1
                },
                value: [
                  new ObjectIdentifier(),
                  new Any()
                ]
              })
            ]
          })
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$E);
    const asn1 = compareSchema(schema, schema, _RevocationInfoChoices.schema({
      names: {
        crls: CRLS$3
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    if (asn1.result.crls) {
      for (const element of asn1.result.crls) {
        if (element.idBlock.tagClass === 1)
          this.crls.push(new CertificateRevocationList({ schema: element }));
        else
          this.otherRevocationInfos.push(new OtherRevocationInfoFormat({ schema: element }));
      }
    }
  }
  toSchema() {
    const outputArray = [];
    outputArray.push(...Array.from(this.crls, (o) => o.toSchema()));
    outputArray.push(...Array.from(this.otherRevocationInfos, (element) => {
      const schema = element.toSchema();
      schema.idBlock.tagClass = 3;
      schema.idBlock.tagNumber = 1;
      return schema;
    }));
    return new Set2({
      value: outputArray
    });
  }
  toJSON() {
    return {
      crls: Array.from(this.crls, (o) => o.toJSON()),
      otherRevocationInfos: Array.from(this.otherRevocationInfos, (o) => o.toJSON())
    };
  }
};
RevocationInfoChoices.CLASS_NAME = "RevocationInfoChoices";
var CERTS$3 = "certs";
var CRLS$2 = "crls";
var CLEAR_PROPS$D = [
  CERTS$3,
  CRLS$2
];
var OriginatorInfo = class _OriginatorInfo extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.crls = getParametersValue(parameters, CRLS$2, _OriginatorInfo.defaultValues(CRLS$2));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case CERTS$3:
        return new CertificateSet();
      case CRLS$2:
        return new RevocationInfoChoices();
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case CERTS$3:
        return memberValue.certificates.length === 0;
      case CRLS$2:
        return memberValue.crls.length === 0 && memberValue.otherRevocationInfos.length === 0;
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new Constructed({
          name: names.certs || EMPTY_STRING2,
          optional: true,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: CertificateSet.schema().valueBlock.value
        }),
        new Constructed({
          name: names.crls || EMPTY_STRING2,
          optional: true,
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          },
          value: RevocationInfoChoices.schema().valueBlock.value
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$D);
    const asn1 = compareSchema(schema, schema, _OriginatorInfo.schema({
      names: {
        certs: CERTS$3,
        crls: CRLS$2
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    if (CERTS$3 in asn1.result) {
      this.certs = new CertificateSet({
        schema: new Set2({
          value: asn1.result.certs.valueBlock.value
        })
      });
    }
    if (CRLS$2 in asn1.result) {
      this.crls = new RevocationInfoChoices({
        schema: new Set2({
          value: asn1.result.crls.valueBlock.value
        })
      });
    }
  }
  toSchema() {
    const sequenceValue = [];
    if (this.certs) {
      sequenceValue.push(new Constructed({
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        value: this.certs.toSchema().valueBlock.value
      }));
    }
    if (this.crls) {
      sequenceValue.push(new Constructed({
        idBlock: {
          tagClass: 3,
          tagNumber: 1
        },
        value: this.crls.toSchema().valueBlock.value
      }));
    }
    return new Sequence({
      value: sequenceValue
    });
  }
  toJSON() {
    const res = {};
    if (this.certs) {
      res.certs = this.certs.toJSON();
    }
    if (this.crls) {
      res.crls = this.crls.toJSON();
    }
    return res;
  }
};
OriginatorInfo.CLASS_NAME = "OriginatorInfo";
var ISSUER = "issuer";
var SERIAL_NUMBER$2 = "serialNumber";
var CLEAR_PROPS$C = [
  ISSUER,
  SERIAL_NUMBER$2
];
var IssuerAndSerialNumber = class _IssuerAndSerialNumber extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.issuer = getParametersValue(parameters, ISSUER, _IssuerAndSerialNumber.defaultValues(ISSUER));
    this.serialNumber = getParametersValue(parameters, SERIAL_NUMBER$2, _IssuerAndSerialNumber.defaultValues(SERIAL_NUMBER$2));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case ISSUER:
        return new RelativeDistinguishedNames();
      case SERIAL_NUMBER$2:
        return new Integer();
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        RelativeDistinguishedNames.schema(names.issuer || {}),
        new Integer({ name: names.serialNumber || EMPTY_STRING2 })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$C);
    const asn1 = compareSchema(schema, schema, _IssuerAndSerialNumber.schema({
      names: {
        issuer: {
          names: {
            blockName: ISSUER
          }
        },
        serialNumber: SERIAL_NUMBER$2
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.issuer = new RelativeDistinguishedNames({ schema: asn1.result.issuer });
    this.serialNumber = asn1.result.serialNumber;
  }
  toSchema() {
    return new Sequence({
      value: [
        this.issuer.toSchema(),
        this.serialNumber
      ]
    });
  }
  toJSON() {
    return {
      issuer: this.issuer.toJSON(),
      serialNumber: this.serialNumber.toJSON()
    };
  }
};
IssuerAndSerialNumber.CLASS_NAME = "IssuerAndSerialNumber";
var VARIANT$3 = "variant";
var VALUE$3 = "value";
var CLEAR_PROPS$B = [
  "blockName"
];
var RecipientIdentifier = class _RecipientIdentifier extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.variant = getParametersValue(parameters, VARIANT$3, _RecipientIdentifier.defaultValues(VARIANT$3));
    if (VALUE$3 in parameters) {
      this.value = getParametersValue(parameters, VALUE$3, _RecipientIdentifier.defaultValues(VALUE$3));
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case VARIANT$3:
        return -1;
      case VALUE$3:
        return {};
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case VARIANT$3:
        return memberValue === -1;
      case VALUE$3:
        return Object.keys(memberValue).length === 0;
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Choice({
      value: [
        IssuerAndSerialNumber.schema({
          names: {
            blockName: names.blockName || EMPTY_STRING2
          }
        }),
        new Primitive({
          name: names.blockName || EMPTY_STRING2,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          }
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$B);
    const asn1 = compareSchema(schema, schema, _RecipientIdentifier.schema({
      names: {
        blockName: "blockName"
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    if (asn1.result.blockName.idBlock.tagClass === 1) {
      this.variant = 1;
      this.value = new IssuerAndSerialNumber({ schema: asn1.result.blockName });
    } else {
      this.variant = 2;
      this.value = new OctetString({ valueHex: asn1.result.blockName.valueBlock.valueHex });
    }
  }
  toSchema() {
    switch (this.variant) {
      case 1:
        if (!(this.value instanceof IssuerAndSerialNumber)) {
          throw new Error("Incorrect type of RecipientIdentifier.value. It should be IssuerAndSerialNumber.");
        }
        return this.value.toSchema();
      case 2:
        if (!(this.value instanceof OctetString)) {
          throw new Error("Incorrect type of RecipientIdentifier.value. It should be ASN.1 OctetString.");
        }
        return new Primitive({
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          valueHex: this.value.valueBlock.valueHexView
        });
      default:
        return new Any();
    }
  }
  toJSON() {
    const res = {
      variant: this.variant
    };
    if ((this.variant === 1 || this.variant === 2) && this.value) {
      res.value = this.value.toJSON();
    }
    return res;
  }
};
RecipientIdentifier.CLASS_NAME = "RecipientIdentifier";
var VERSION$c = "version";
var RID$1 = "rid";
var KEY_ENCRYPTION_ALGORITHM$3 = "keyEncryptionAlgorithm";
var ENCRYPTED_KEY$3 = "encryptedKey";
var RECIPIENT_CERTIFICATE$1 = "recipientCertificate";
var CLEAR_PROPS$A = [
  VERSION$c,
  RID$1,
  KEY_ENCRYPTION_ALGORITHM$3,
  ENCRYPTED_KEY$3
];
var KeyTransRecipientInfo = class _KeyTransRecipientInfo extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.version = getParametersValue(parameters, VERSION$c, _KeyTransRecipientInfo.defaultValues(VERSION$c));
    this.rid = getParametersValue(parameters, RID$1, _KeyTransRecipientInfo.defaultValues(RID$1));
    this.keyEncryptionAlgorithm = getParametersValue(parameters, KEY_ENCRYPTION_ALGORITHM$3, _KeyTransRecipientInfo.defaultValues(KEY_ENCRYPTION_ALGORITHM$3));
    this.encryptedKey = getParametersValue(parameters, ENCRYPTED_KEY$3, _KeyTransRecipientInfo.defaultValues(ENCRYPTED_KEY$3));
    this.recipientCertificate = getParametersValue(parameters, RECIPIENT_CERTIFICATE$1, _KeyTransRecipientInfo.defaultValues(RECIPIENT_CERTIFICATE$1));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case VERSION$c:
        return -1;
      case RID$1:
        return {};
      case KEY_ENCRYPTION_ALGORITHM$3:
        return new AlgorithmIdentifier();
      case ENCRYPTED_KEY$3:
        return new OctetString();
      case RECIPIENT_CERTIFICATE$1:
        return new Certificate();
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case VERSION$c:
        return memberValue === _KeyTransRecipientInfo.defaultValues(VERSION$c);
      case RID$1:
        return Object.keys(memberValue).length === 0;
      case KEY_ENCRYPTION_ALGORITHM$3:
      case ENCRYPTED_KEY$3:
        return memberValue.isEqual(_KeyTransRecipientInfo.defaultValues(memberName));
      case RECIPIENT_CERTIFICATE$1:
        return false;
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new Integer({ name: names.version || EMPTY_STRING2 }),
        RecipientIdentifier.schema(names.rid || {}),
        AlgorithmIdentifier.schema(names.keyEncryptionAlgorithm || {}),
        new OctetString({ name: names.encryptedKey || EMPTY_STRING2 })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$A);
    const asn1 = compareSchema(schema, schema, _KeyTransRecipientInfo.schema({
      names: {
        version: VERSION$c,
        rid: {
          names: {
            blockName: RID$1
          }
        },
        keyEncryptionAlgorithm: {
          names: {
            blockName: KEY_ENCRYPTION_ALGORITHM$3
          }
        },
        encryptedKey: ENCRYPTED_KEY$3
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.version = asn1.result.version.valueBlock.valueDec;
    if (asn1.result.rid.idBlock.tagClass === 3) {
      this.rid = new OctetString({ valueHex: asn1.result.rid.valueBlock.valueHex });
    } else {
      this.rid = new IssuerAndSerialNumber({ schema: asn1.result.rid });
    }
    this.keyEncryptionAlgorithm = new AlgorithmIdentifier({ schema: asn1.result.keyEncryptionAlgorithm });
    this.encryptedKey = asn1.result.encryptedKey;
  }
  toSchema() {
    const outputArray = [];
    if (this.rid instanceof IssuerAndSerialNumber) {
      this.version = 0;
      outputArray.push(new Integer({ value: this.version }));
      outputArray.push(this.rid.toSchema());
    } else {
      this.version = 2;
      outputArray.push(new Integer({ value: this.version }));
      outputArray.push(new Primitive({
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        valueHex: this.rid.valueBlock.valueHexView
      }));
    }
    outputArray.push(this.keyEncryptionAlgorithm.toSchema());
    outputArray.push(this.encryptedKey);
    return new Sequence({
      value: outputArray
    });
  }
  toJSON() {
    return {
      version: this.version,
      rid: this.rid.toJSON(),
      keyEncryptionAlgorithm: this.keyEncryptionAlgorithm.toJSON(),
      encryptedKey: this.encryptedKey.toJSON()
    };
  }
};
KeyTransRecipientInfo.CLASS_NAME = "KeyTransRecipientInfo";
var ALGORITHM = "algorithm";
var PUBLIC_KEY = "publicKey";
var CLEAR_PROPS$z = [
  ALGORITHM,
  PUBLIC_KEY
];
var OriginatorPublicKey = class _OriginatorPublicKey extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.algorithm = getParametersValue(parameters, ALGORITHM, _OriginatorPublicKey.defaultValues(ALGORITHM));
    this.publicKey = getParametersValue(parameters, PUBLIC_KEY, _OriginatorPublicKey.defaultValues(PUBLIC_KEY));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case ALGORITHM:
        return new AlgorithmIdentifier();
      case PUBLIC_KEY:
        return new BitString();
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case ALGORITHM:
      case PUBLIC_KEY:
        return memberValue.isEqual(_OriginatorPublicKey.defaultValues(memberName));
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        AlgorithmIdentifier.schema(names.algorithm || {}),
        new BitString({ name: names.publicKey || EMPTY_STRING2 })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$z);
    const asn1 = compareSchema(schema, schema, _OriginatorPublicKey.schema({
      names: {
        algorithm: {
          names: {
            blockName: ALGORITHM
          }
        },
        publicKey: PUBLIC_KEY
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.algorithm = new AlgorithmIdentifier({ schema: asn1.result.algorithm });
    this.publicKey = asn1.result.publicKey;
  }
  toSchema() {
    return new Sequence({
      value: [
        this.algorithm.toSchema(),
        this.publicKey
      ]
    });
  }
  toJSON() {
    return {
      algorithm: this.algorithm.toJSON(),
      publicKey: this.publicKey.toJSON()
    };
  }
};
OriginatorPublicKey.CLASS_NAME = "OriginatorPublicKey";
var VARIANT$2 = "variant";
var VALUE$2 = "value";
var CLEAR_PROPS$y = [
  "blockName"
];
var OriginatorIdentifierOrKey = class _OriginatorIdentifierOrKey extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.variant = getParametersValue(parameters, VARIANT$2, _OriginatorIdentifierOrKey.defaultValues(VARIANT$2));
    if (VALUE$2 in parameters) {
      this.value = getParametersValue(parameters, VALUE$2, _OriginatorIdentifierOrKey.defaultValues(VALUE$2));
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case VARIANT$2:
        return -1;
      case VALUE$2:
        return {};
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case VARIANT$2:
        return memberValue === -1;
      case VALUE$2:
        return Object.keys(memberValue).length === 0;
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Choice({
      value: [
        IssuerAndSerialNumber.schema({
          names: {
            blockName: names.blockName || EMPTY_STRING2
          }
        }),
        new Primitive({
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          name: names.blockName || EMPTY_STRING2
        }),
        new Constructed({
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          },
          name: names.blockName || EMPTY_STRING2,
          value: OriginatorPublicKey.schema().valueBlock.value
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$y);
    const asn1 = compareSchema(schema, schema, _OriginatorIdentifierOrKey.schema({
      names: {
        blockName: "blockName"
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    if (asn1.result.blockName.idBlock.tagClass === 1) {
      this.variant = 1;
      this.value = new IssuerAndSerialNumber({ schema: asn1.result.blockName });
    } else {
      if (asn1.result.blockName.idBlock.tagNumber === 0) {
        asn1.result.blockName.idBlock.tagClass = 1;
        asn1.result.blockName.idBlock.tagNumber = 4;
        this.variant = 2;
        this.value = asn1.result.blockName;
      } else {
        this.variant = 3;
        this.value = new OriginatorPublicKey({
          schema: new Sequence({
            value: asn1.result.blockName.valueBlock.value
          })
        });
      }
    }
  }
  toSchema() {
    switch (this.variant) {
      case 1:
        return this.value.toSchema();
      case 2:
        this.value.idBlock.tagClass = 3;
        this.value.idBlock.tagNumber = 0;
        return this.value;
      case 3: {
        const _schema = this.value.toSchema();
        _schema.idBlock.tagClass = 3;
        _schema.idBlock.tagNumber = 1;
        return _schema;
      }
      default:
        return new Any();
    }
  }
  toJSON() {
    const res = {
      variant: this.variant
    };
    if (this.variant === 1 || this.variant === 2 || this.variant === 3) {
      res.value = this.value.toJSON();
    }
    return res;
  }
};
OriginatorIdentifierOrKey.CLASS_NAME = "OriginatorIdentifierOrKey";
var KEY_ATTR_ID = "keyAttrId";
var KEY_ATTR = "keyAttr";
var CLEAR_PROPS$x = [
  KEY_ATTR_ID,
  KEY_ATTR
];
var OtherKeyAttribute = class _OtherKeyAttribute extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.keyAttrId = getParametersValue(parameters, KEY_ATTR_ID, _OtherKeyAttribute.defaultValues(KEY_ATTR_ID));
    if (KEY_ATTR in parameters) {
      this.keyAttr = getParametersValue(parameters, KEY_ATTR, _OtherKeyAttribute.defaultValues(KEY_ATTR));
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case KEY_ATTR_ID:
        return EMPTY_STRING2;
      case KEY_ATTR:
        return {};
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case KEY_ATTR_ID:
        return typeof memberValue === "string" && memberValue === EMPTY_STRING2;
      case KEY_ATTR:
        return Object.keys(memberValue).length === 0;
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      optional: names.optional || true,
      name: names.blockName || EMPTY_STRING2,
      value: [
        new ObjectIdentifier({ name: names.keyAttrId || EMPTY_STRING2 }),
        new Any({
          optional: true,
          name: names.keyAttr || EMPTY_STRING2
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$x);
    const asn1 = compareSchema(schema, schema, _OtherKeyAttribute.schema({
      names: {
        keyAttrId: KEY_ATTR_ID,
        keyAttr: KEY_ATTR
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.keyAttrId = asn1.result.keyAttrId.valueBlock.toString();
    if (KEY_ATTR in asn1.result) {
      this.keyAttr = asn1.result.keyAttr;
    }
  }
  toSchema() {
    const outputArray = [];
    outputArray.push(new ObjectIdentifier({ value: this.keyAttrId }));
    if (KEY_ATTR in this) {
      outputArray.push(this.keyAttr);
    }
    return new Sequence({
      value: outputArray
    });
  }
  toJSON() {
    const res = {
      keyAttrId: this.keyAttrId
    };
    if (KEY_ATTR in this) {
      res.keyAttr = this.keyAttr.toJSON();
    }
    return res;
  }
};
OtherKeyAttribute.CLASS_NAME = "OtherKeyAttribute";
var SUBJECT_KEY_IDENTIFIER = "subjectKeyIdentifier";
var DATE$1 = "date";
var OTHER$1 = "other";
var CLEAR_PROPS$w = [
  SUBJECT_KEY_IDENTIFIER,
  DATE$1,
  OTHER$1
];
var RecipientKeyIdentifier = class _RecipientKeyIdentifier extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.subjectKeyIdentifier = getParametersValue(parameters, SUBJECT_KEY_IDENTIFIER, _RecipientKeyIdentifier.defaultValues(SUBJECT_KEY_IDENTIFIER));
    if (DATE$1 in parameters) {
      this.date = getParametersValue(parameters, DATE$1, _RecipientKeyIdentifier.defaultValues(DATE$1));
    }
    if (OTHER$1 in parameters) {
      this.other = getParametersValue(parameters, OTHER$1, _RecipientKeyIdentifier.defaultValues(OTHER$1));
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case SUBJECT_KEY_IDENTIFIER:
        return new OctetString();
      case DATE$1:
        return new GeneralizedTime();
      case OTHER$1:
        return new OtherKeyAttribute();
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case SUBJECT_KEY_IDENTIFIER:
        return memberValue.isEqual(_RecipientKeyIdentifier.defaultValues(SUBJECT_KEY_IDENTIFIER));
      case DATE$1:
        return memberValue.year === 0 && memberValue.month === 0 && memberValue.day === 0 && memberValue.hour === 0 && memberValue.minute === 0 && memberValue.second === 0 && memberValue.millisecond === 0;
      case OTHER$1:
        return memberValue.keyAttrId === EMPTY_STRING2 && "keyAttr" in memberValue === false;
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new OctetString({ name: names.subjectKeyIdentifier || EMPTY_STRING2 }),
        new GeneralizedTime({
          optional: true,
          name: names.date || EMPTY_STRING2
        }),
        OtherKeyAttribute.schema(names.other || {})
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$w);
    const asn1 = compareSchema(schema, schema, _RecipientKeyIdentifier.schema({
      names: {
        subjectKeyIdentifier: SUBJECT_KEY_IDENTIFIER,
        date: DATE$1,
        other: {
          names: {
            blockName: OTHER$1
          }
        }
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.subjectKeyIdentifier = asn1.result.subjectKeyIdentifier;
    if (DATE$1 in asn1.result)
      this.date = asn1.result.date;
    if (OTHER$1 in asn1.result)
      this.other = new OtherKeyAttribute({ schema: asn1.result.other });
  }
  toSchema() {
    const outputArray = [];
    outputArray.push(this.subjectKeyIdentifier);
    if (this.date) {
      outputArray.push(this.date);
    }
    if (this.other) {
      outputArray.push(this.other.toSchema());
    }
    return new Sequence({
      value: outputArray
    });
  }
  toJSON() {
    const res = {
      subjectKeyIdentifier: this.subjectKeyIdentifier.toJSON()
    };
    if (this.date) {
      res.date = this.date.toJSON();
    }
    if (this.other) {
      res.other = this.other.toJSON();
    }
    return res;
  }
};
RecipientKeyIdentifier.CLASS_NAME = "RecipientKeyIdentifier";
var VARIANT$1 = "variant";
var VALUE$1 = "value";
var CLEAR_PROPS$v = [
  "blockName"
];
var KeyAgreeRecipientIdentifier = class _KeyAgreeRecipientIdentifier extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.variant = getParametersValue(parameters, VARIANT$1, _KeyAgreeRecipientIdentifier.defaultValues(VARIANT$1));
    this.value = getParametersValue(parameters, VALUE$1, _KeyAgreeRecipientIdentifier.defaultValues(VALUE$1));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case VARIANT$1:
        return -1;
      case VALUE$1:
        return {};
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case VARIANT$1:
        return memberValue === -1;
      case VALUE$1:
        return Object.keys(memberValue).length === 0;
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Choice({
      value: [
        IssuerAndSerialNumber.schema(names.issuerAndSerialNumber || {
          names: {
            blockName: names.blockName || EMPTY_STRING2
          }
        }),
        new Constructed({
          name: names.blockName || EMPTY_STRING2,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: RecipientKeyIdentifier.schema(names.rKeyId || {
            names: {
              blockName: names.blockName || EMPTY_STRING2
            }
          }).valueBlock.value
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$v);
    const asn1 = compareSchema(schema, schema, _KeyAgreeRecipientIdentifier.schema({
      names: {
        blockName: "blockName"
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    if (asn1.result.blockName.idBlock.tagClass === 1) {
      this.variant = 1;
      this.value = new IssuerAndSerialNumber({ schema: asn1.result.blockName });
    } else {
      this.variant = 2;
      this.value = new RecipientKeyIdentifier({
        schema: new Sequence({
          value: asn1.result.blockName.valueBlock.value
        })
      });
    }
  }
  toSchema() {
    switch (this.variant) {
      case 1:
        return this.value.toSchema();
      case 2:
        return new Constructed({
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: this.value.toSchema().valueBlock.value
        });
      default:
        return new Any();
    }
  }
  toJSON() {
    const res = {
      variant: this.variant
    };
    if (this.variant === 1 || this.variant === 2) {
      res.value = this.value.toJSON();
    }
    return res;
  }
};
KeyAgreeRecipientIdentifier.CLASS_NAME = "KeyAgreeRecipientIdentifier";
var RID = "rid";
var ENCRYPTED_KEY$2 = "encryptedKey";
var CLEAR_PROPS$u = [
  RID,
  ENCRYPTED_KEY$2
];
var RecipientEncryptedKey = class _RecipientEncryptedKey extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.rid = getParametersValue(parameters, RID, _RecipientEncryptedKey.defaultValues(RID));
    this.encryptedKey = getParametersValue(parameters, ENCRYPTED_KEY$2, _RecipientEncryptedKey.defaultValues(ENCRYPTED_KEY$2));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case RID:
        return new KeyAgreeRecipientIdentifier();
      case ENCRYPTED_KEY$2:
        return new OctetString();
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case RID:
        return memberValue.variant === -1 && "value" in memberValue === false;
      case ENCRYPTED_KEY$2:
        return memberValue.isEqual(_RecipientEncryptedKey.defaultValues(ENCRYPTED_KEY$2));
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        KeyAgreeRecipientIdentifier.schema(names.rid || {}),
        new OctetString({ name: names.encryptedKey || EMPTY_STRING2 })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$u);
    const asn1 = compareSchema(schema, schema, _RecipientEncryptedKey.schema({
      names: {
        rid: {
          names: {
            blockName: RID
          }
        },
        encryptedKey: ENCRYPTED_KEY$2
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.rid = new KeyAgreeRecipientIdentifier({ schema: asn1.result.rid });
    this.encryptedKey = asn1.result.encryptedKey;
  }
  toSchema() {
    return new Sequence({
      value: [
        this.rid.toSchema(),
        this.encryptedKey
      ]
    });
  }
  toJSON() {
    return {
      rid: this.rid.toJSON(),
      encryptedKey: this.encryptedKey.toJSON()
    };
  }
};
RecipientEncryptedKey.CLASS_NAME = "RecipientEncryptedKey";
var ENCRYPTED_KEYS = "encryptedKeys";
var RECIPIENT_ENCRYPTED_KEYS = "RecipientEncryptedKeys";
var CLEAR_PROPS$t = [
  RECIPIENT_ENCRYPTED_KEYS
];
var RecipientEncryptedKeys = class _RecipientEncryptedKeys extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.encryptedKeys = getParametersValue(parameters, ENCRYPTED_KEYS, _RecipientEncryptedKeys.defaultValues(ENCRYPTED_KEYS));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case ENCRYPTED_KEYS:
        return [];
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case ENCRYPTED_KEYS:
        return memberValue.length === 0;
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new Repeated({
          name: names.RecipientEncryptedKeys || EMPTY_STRING2,
          value: RecipientEncryptedKey.schema()
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$t);
    const asn1 = compareSchema(schema, schema, _RecipientEncryptedKeys.schema({
      names: {
        RecipientEncryptedKeys: RECIPIENT_ENCRYPTED_KEYS
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.encryptedKeys = Array.from(asn1.result.RecipientEncryptedKeys, (element) => new RecipientEncryptedKey({ schema: element }));
  }
  toSchema() {
    return new Sequence({
      value: Array.from(this.encryptedKeys, (o) => o.toSchema())
    });
  }
  toJSON() {
    return {
      encryptedKeys: Array.from(this.encryptedKeys, (o) => o.toJSON())
    };
  }
};
RecipientEncryptedKeys.CLASS_NAME = "RecipientEncryptedKeys";
var VERSION$b = "version";
var ORIGINATOR = "originator";
var UKM = "ukm";
var KEY_ENCRYPTION_ALGORITHM$2 = "keyEncryptionAlgorithm";
var RECIPIENT_ENCRYPTED_KEY = "recipientEncryptedKeys";
var RECIPIENT_CERTIFICATE = "recipientCertificate";
var RECIPIENT_PUBLIC_KEY = "recipientPublicKey";
var CLEAR_PROPS$s = [
  VERSION$b,
  ORIGINATOR,
  UKM,
  KEY_ENCRYPTION_ALGORITHM$2,
  RECIPIENT_ENCRYPTED_KEY
];
var KeyAgreeRecipientInfo = class _KeyAgreeRecipientInfo extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.version = getParametersValue(parameters, VERSION$b, _KeyAgreeRecipientInfo.defaultValues(VERSION$b));
    this.originator = getParametersValue(parameters, ORIGINATOR, _KeyAgreeRecipientInfo.defaultValues(ORIGINATOR));
    if (UKM in parameters) {
      this.ukm = getParametersValue(parameters, UKM, _KeyAgreeRecipientInfo.defaultValues(UKM));
    }
    this.keyEncryptionAlgorithm = getParametersValue(parameters, KEY_ENCRYPTION_ALGORITHM$2, _KeyAgreeRecipientInfo.defaultValues(KEY_ENCRYPTION_ALGORITHM$2));
    this.recipientEncryptedKeys = getParametersValue(parameters, RECIPIENT_ENCRYPTED_KEY, _KeyAgreeRecipientInfo.defaultValues(RECIPIENT_ENCRYPTED_KEY));
    this.recipientCertificate = getParametersValue(parameters, RECIPIENT_CERTIFICATE, _KeyAgreeRecipientInfo.defaultValues(RECIPIENT_CERTIFICATE));
    this.recipientPublicKey = getParametersValue(parameters, RECIPIENT_PUBLIC_KEY, _KeyAgreeRecipientInfo.defaultValues(RECIPIENT_PUBLIC_KEY));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case VERSION$b:
        return 0;
      case ORIGINATOR:
        return new OriginatorIdentifierOrKey();
      case UKM:
        return new OctetString();
      case KEY_ENCRYPTION_ALGORITHM$2:
        return new AlgorithmIdentifier();
      case RECIPIENT_ENCRYPTED_KEY:
        return new RecipientEncryptedKeys();
      case RECIPIENT_CERTIFICATE:
        return new Certificate();
      case RECIPIENT_PUBLIC_KEY:
        return null;
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case VERSION$b:
        return memberValue === 0;
      case ORIGINATOR:
        return memberValue.variant === -1 && "value" in memberValue === false;
      case UKM:
        return memberValue.isEqual(_KeyAgreeRecipientInfo.defaultValues(UKM));
      case KEY_ENCRYPTION_ALGORITHM$2:
        return memberValue.algorithmId === EMPTY_STRING2 && "algorithmParams" in memberValue === false;
      case RECIPIENT_ENCRYPTED_KEY:
        return memberValue.encryptedKeys.length === 0;
      case RECIPIENT_CERTIFICATE:
        return false;
      case RECIPIENT_PUBLIC_KEY:
        return false;
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new Integer({ name: names.version || EMPTY_STRING2 }),
        new Constructed({
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [
            OriginatorIdentifierOrKey.schema(names.originator || {})
          ]
        }),
        new Constructed({
          optional: true,
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          },
          value: [new OctetString({ name: names.ukm || EMPTY_STRING2 })]
        }),
        AlgorithmIdentifier.schema(names.keyEncryptionAlgorithm || {}),
        RecipientEncryptedKeys.schema(names.recipientEncryptedKeys || {})
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$s);
    const asn1 = compareSchema(schema, schema, _KeyAgreeRecipientInfo.schema({
      names: {
        version: VERSION$b,
        originator: {
          names: {
            blockName: ORIGINATOR
          }
        },
        ukm: UKM,
        keyEncryptionAlgorithm: {
          names: {
            blockName: KEY_ENCRYPTION_ALGORITHM$2
          }
        },
        recipientEncryptedKeys: {
          names: {
            blockName: RECIPIENT_ENCRYPTED_KEY
          }
        }
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.version = asn1.result.version.valueBlock.valueDec;
    this.originator = new OriginatorIdentifierOrKey({ schema: asn1.result.originator });
    if (UKM in asn1.result)
      this.ukm = asn1.result.ukm;
    this.keyEncryptionAlgorithm = new AlgorithmIdentifier({ schema: asn1.result.keyEncryptionAlgorithm });
    this.recipientEncryptedKeys = new RecipientEncryptedKeys({ schema: asn1.result.recipientEncryptedKeys });
  }
  toSchema() {
    const outputArray = [];
    outputArray.push(new Integer({ value: this.version }));
    outputArray.push(new Constructed({
      idBlock: {
        tagClass: 3,
        tagNumber: 0
      },
      value: [this.originator.toSchema()]
    }));
    if (this.ukm) {
      outputArray.push(new Constructed({
        optional: true,
        idBlock: {
          tagClass: 3,
          tagNumber: 1
        },
        value: [this.ukm]
      }));
    }
    outputArray.push(this.keyEncryptionAlgorithm.toSchema());
    outputArray.push(this.recipientEncryptedKeys.toSchema());
    return new Sequence({
      value: outputArray
    });
  }
  toJSON() {
    const res = {
      version: this.version,
      originator: this.originator.toJSON(),
      keyEncryptionAlgorithm: this.keyEncryptionAlgorithm.toJSON(),
      recipientEncryptedKeys: this.recipientEncryptedKeys.toJSON()
    };
    if (this.ukm) {
      res.ukm = this.ukm.toJSON();
    }
    return res;
  }
};
KeyAgreeRecipientInfo.CLASS_NAME = "KeyAgreeRecipientInfo";
var KEY_IDENTIFIER = "keyIdentifier";
var DATE2 = "date";
var OTHER = "other";
var CLEAR_PROPS$r = [
  KEY_IDENTIFIER,
  DATE2,
  OTHER
];
var KEKIdentifier = class _KEKIdentifier extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.keyIdentifier = getParametersValue(parameters, KEY_IDENTIFIER, _KEKIdentifier.defaultValues(KEY_IDENTIFIER));
    if (DATE2 in parameters) {
      this.date = getParametersValue(parameters, DATE2, _KEKIdentifier.defaultValues(DATE2));
    }
    if (OTHER in parameters) {
      this.other = getParametersValue(parameters, OTHER, _KEKIdentifier.defaultValues(OTHER));
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case KEY_IDENTIFIER:
        return new OctetString();
      case DATE2:
        return new GeneralizedTime();
      case OTHER:
        return new OtherKeyAttribute();
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case KEY_IDENTIFIER:
        return memberValue.isEqual(_KEKIdentifier.defaultValues(KEY_IDENTIFIER));
      case DATE2:
        return memberValue.year === 0 && memberValue.month === 0 && memberValue.day === 0 && memberValue.hour === 0 && memberValue.minute === 0 && memberValue.second === 0 && memberValue.millisecond === 0;
      case OTHER:
        return memberValue.compareWithDefault("keyAttrId", memberValue.keyAttrId) && "keyAttr" in memberValue === false;
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new OctetString({ name: names.keyIdentifier || EMPTY_STRING2 }),
        new GeneralizedTime({
          optional: true,
          name: names.date || EMPTY_STRING2
        }),
        OtherKeyAttribute.schema(names.other || {})
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$r);
    const asn1 = compareSchema(schema, schema, _KEKIdentifier.schema({
      names: {
        keyIdentifier: KEY_IDENTIFIER,
        date: DATE2,
        other: {
          names: {
            blockName: OTHER
          }
        }
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.keyIdentifier = asn1.result.keyIdentifier;
    if (DATE2 in asn1.result)
      this.date = asn1.result.date;
    if (OTHER in asn1.result)
      this.other = new OtherKeyAttribute({ schema: asn1.result.other });
  }
  toSchema() {
    const outputArray = [];
    outputArray.push(this.keyIdentifier);
    if (this.date) {
      outputArray.push(this.date);
    }
    if (this.other) {
      outputArray.push(this.other.toSchema());
    }
    return new Sequence({
      value: outputArray
    });
  }
  toJSON() {
    const res = {
      keyIdentifier: this.keyIdentifier.toJSON()
    };
    if (this.date) {
      res.date = this.date;
    }
    if (this.other) {
      res.other = this.other.toJSON();
    }
    return res;
  }
};
KEKIdentifier.CLASS_NAME = "KEKIdentifier";
var VERSION$a = "version";
var KEK_ID = "kekid";
var KEY_ENCRYPTION_ALGORITHM$1 = "keyEncryptionAlgorithm";
var ENCRYPTED_KEY$1 = "encryptedKey";
var PER_DEFINED_KEK = "preDefinedKEK";
var CLEAR_PROPS$q = [
  VERSION$a,
  KEK_ID,
  KEY_ENCRYPTION_ALGORITHM$1,
  ENCRYPTED_KEY$1
];
var KEKRecipientInfo = class _KEKRecipientInfo extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.version = getParametersValue(parameters, VERSION$a, _KEKRecipientInfo.defaultValues(VERSION$a));
    this.kekid = getParametersValue(parameters, KEK_ID, _KEKRecipientInfo.defaultValues(KEK_ID));
    this.keyEncryptionAlgorithm = getParametersValue(parameters, KEY_ENCRYPTION_ALGORITHM$1, _KEKRecipientInfo.defaultValues(KEY_ENCRYPTION_ALGORITHM$1));
    this.encryptedKey = getParametersValue(parameters, ENCRYPTED_KEY$1, _KEKRecipientInfo.defaultValues(ENCRYPTED_KEY$1));
    this.preDefinedKEK = getParametersValue(parameters, PER_DEFINED_KEK, _KEKRecipientInfo.defaultValues(PER_DEFINED_KEK));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case VERSION$a:
        return 0;
      case KEK_ID:
        return new KEKIdentifier();
      case KEY_ENCRYPTION_ALGORITHM$1:
        return new AlgorithmIdentifier();
      case ENCRYPTED_KEY$1:
        return new OctetString();
      case PER_DEFINED_KEK:
        return EMPTY_BUFFER2;
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case "KEKRecipientInfo":
        return memberValue === _KEKRecipientInfo.defaultValues(VERSION$a);
      case KEK_ID:
        return memberValue.compareWithDefault("keyIdentifier", memberValue.keyIdentifier) && "date" in memberValue === false && "other" in memberValue === false;
      case KEY_ENCRYPTION_ALGORITHM$1:
        return memberValue.algorithmId === EMPTY_STRING2 && "algorithmParams" in memberValue === false;
      case ENCRYPTED_KEY$1:
        return memberValue.isEqual(_KEKRecipientInfo.defaultValues(ENCRYPTED_KEY$1));
      case PER_DEFINED_KEK:
        return memberValue.byteLength === 0;
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new Integer({ name: names.version || EMPTY_STRING2 }),
        KEKIdentifier.schema(names.kekid || {}),
        AlgorithmIdentifier.schema(names.keyEncryptionAlgorithm || {}),
        new OctetString({ name: names.encryptedKey || EMPTY_STRING2 })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$q);
    const asn1 = compareSchema(schema, schema, _KEKRecipientInfo.schema({
      names: {
        version: VERSION$a,
        kekid: {
          names: {
            blockName: KEK_ID
          }
        },
        keyEncryptionAlgorithm: {
          names: {
            blockName: KEY_ENCRYPTION_ALGORITHM$1
          }
        },
        encryptedKey: ENCRYPTED_KEY$1
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.version = asn1.result.version.valueBlock.valueDec;
    this.kekid = new KEKIdentifier({ schema: asn1.result.kekid });
    this.keyEncryptionAlgorithm = new AlgorithmIdentifier({ schema: asn1.result.keyEncryptionAlgorithm });
    this.encryptedKey = asn1.result.encryptedKey;
  }
  toSchema() {
    return new Sequence({
      value: [
        new Integer({ value: this.version }),
        this.kekid.toSchema(),
        this.keyEncryptionAlgorithm.toSchema(),
        this.encryptedKey
      ]
    });
  }
  toJSON() {
    return {
      version: this.version,
      kekid: this.kekid.toJSON(),
      keyEncryptionAlgorithm: this.keyEncryptionAlgorithm.toJSON(),
      encryptedKey: this.encryptedKey.toJSON()
    };
  }
};
KEKRecipientInfo.CLASS_NAME = "KEKRecipientInfo";
var VERSION$9 = "version";
var KEY_DERIVATION_ALGORITHM = "keyDerivationAlgorithm";
var KEY_ENCRYPTION_ALGORITHM = "keyEncryptionAlgorithm";
var ENCRYPTED_KEY = "encryptedKey";
var PASSWORD = "password";
var CLEAR_PROPS$p = [
  VERSION$9,
  KEY_DERIVATION_ALGORITHM,
  KEY_ENCRYPTION_ALGORITHM,
  ENCRYPTED_KEY
];
var PasswordRecipientinfo = class _PasswordRecipientinfo extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.version = getParametersValue(parameters, VERSION$9, _PasswordRecipientinfo.defaultValues(VERSION$9));
    if (KEY_DERIVATION_ALGORITHM in parameters) {
      this.keyDerivationAlgorithm = getParametersValue(parameters, KEY_DERIVATION_ALGORITHM, _PasswordRecipientinfo.defaultValues(KEY_DERIVATION_ALGORITHM));
    }
    this.keyEncryptionAlgorithm = getParametersValue(parameters, KEY_ENCRYPTION_ALGORITHM, _PasswordRecipientinfo.defaultValues(KEY_ENCRYPTION_ALGORITHM));
    this.encryptedKey = getParametersValue(parameters, ENCRYPTED_KEY, _PasswordRecipientinfo.defaultValues(ENCRYPTED_KEY));
    this.password = getParametersValue(parameters, PASSWORD, _PasswordRecipientinfo.defaultValues(PASSWORD));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case VERSION$9:
        return -1;
      case KEY_DERIVATION_ALGORITHM:
        return new AlgorithmIdentifier();
      case KEY_ENCRYPTION_ALGORITHM:
        return new AlgorithmIdentifier();
      case ENCRYPTED_KEY:
        return new OctetString();
      case PASSWORD:
        return EMPTY_BUFFER2;
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case VERSION$9:
        return memberValue === -1;
      case KEY_DERIVATION_ALGORITHM:
      case KEY_ENCRYPTION_ALGORITHM:
        return memberValue.algorithmId === EMPTY_STRING2 && "algorithmParams" in memberValue === false;
      case ENCRYPTED_KEY:
        return memberValue.isEqual(_PasswordRecipientinfo.defaultValues(ENCRYPTED_KEY));
      case PASSWORD:
        return memberValue.byteLength === 0;
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new Integer({ name: names.version || EMPTY_STRING2 }),
        new Constructed({
          name: names.keyDerivationAlgorithm || EMPTY_STRING2,
          optional: true,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: AlgorithmIdentifier.schema().valueBlock.value
        }),
        AlgorithmIdentifier.schema(names.keyEncryptionAlgorithm || {}),
        new OctetString({ name: names.encryptedKey || EMPTY_STRING2 })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$p);
    const asn1 = compareSchema(schema, schema, _PasswordRecipientinfo.schema({
      names: {
        version: VERSION$9,
        keyDerivationAlgorithm: KEY_DERIVATION_ALGORITHM,
        keyEncryptionAlgorithm: {
          names: {
            blockName: KEY_ENCRYPTION_ALGORITHM
          }
        },
        encryptedKey: ENCRYPTED_KEY
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.version = asn1.result.version.valueBlock.valueDec;
    if (KEY_DERIVATION_ALGORITHM in asn1.result) {
      this.keyDerivationAlgorithm = new AlgorithmIdentifier({
        schema: new Sequence({
          value: asn1.result.keyDerivationAlgorithm.valueBlock.value
        })
      });
    }
    this.keyEncryptionAlgorithm = new AlgorithmIdentifier({ schema: asn1.result.keyEncryptionAlgorithm });
    this.encryptedKey = asn1.result.encryptedKey;
  }
  toSchema() {
    const outputArray = [];
    outputArray.push(new Integer({ value: this.version }));
    if (this.keyDerivationAlgorithm) {
      outputArray.push(new Constructed({
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        value: this.keyDerivationAlgorithm.toSchema().valueBlock.value
      }));
    }
    outputArray.push(this.keyEncryptionAlgorithm.toSchema());
    outputArray.push(this.encryptedKey);
    return new Sequence({
      value: outputArray
    });
  }
  toJSON() {
    const res = {
      version: this.version,
      keyEncryptionAlgorithm: this.keyEncryptionAlgorithm.toJSON(),
      encryptedKey: this.encryptedKey.toJSON()
    };
    if (this.keyDerivationAlgorithm) {
      res.keyDerivationAlgorithm = this.keyDerivationAlgorithm.toJSON();
    }
    return res;
  }
};
PasswordRecipientinfo.CLASS_NAME = "PasswordRecipientInfo";
var ORI_TYPE = "oriType";
var ORI_VALUE = "oriValue";
var CLEAR_PROPS$o = [
  ORI_TYPE,
  ORI_VALUE
];
var OtherRecipientInfo = class _OtherRecipientInfo extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.oriType = getParametersValue(parameters, ORI_TYPE, _OtherRecipientInfo.defaultValues(ORI_TYPE));
    this.oriValue = getParametersValue(parameters, ORI_VALUE, _OtherRecipientInfo.defaultValues(ORI_VALUE));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case ORI_TYPE:
        return EMPTY_STRING2;
      case ORI_VALUE:
        return {};
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case ORI_TYPE:
        return memberValue === EMPTY_STRING2;
      case ORI_VALUE:
        return Object.keys(memberValue).length === 0;
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new ObjectIdentifier({ name: names.oriType || EMPTY_STRING2 }),
        new Any({ name: names.oriValue || EMPTY_STRING2 })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$o);
    const asn1 = compareSchema(schema, schema, _OtherRecipientInfo.schema({
      names: {
        oriType: ORI_TYPE,
        oriValue: ORI_VALUE
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.oriType = asn1.result.oriType.valueBlock.toString();
    this.oriValue = asn1.result.oriValue;
  }
  toSchema() {
    return new Sequence({
      value: [
        new ObjectIdentifier({ value: this.oriType }),
        this.oriValue
      ]
    });
  }
  toJSON() {
    const res = {
      oriType: this.oriType
    };
    if (!_OtherRecipientInfo.compareWithDefault(ORI_VALUE, this.oriValue)) {
      res.oriValue = this.oriValue.toJSON();
    }
    return res;
  }
};
OtherRecipientInfo.CLASS_NAME = "OtherRecipientInfo";
var VARIANT = "variant";
var VALUE = "value";
var CLEAR_PROPS$n = [
  "blockName"
];
var RecipientInfo = class _RecipientInfo extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.variant = getParametersValue(parameters, VARIANT, _RecipientInfo.defaultValues(VARIANT));
    if (VALUE in parameters) {
      this.value = getParametersValue(parameters, VALUE, _RecipientInfo.defaultValues(VALUE));
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case VARIANT:
        return -1;
      case VALUE:
        return {};
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case VARIANT:
        return memberValue === _RecipientInfo.defaultValues(memberName);
      case VALUE:
        return Object.keys(memberValue).length === 0;
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Choice({
      value: [
        KeyTransRecipientInfo.schema({
          names: {
            blockName: names.blockName || EMPTY_STRING2
          }
        }),
        new Constructed({
          name: names.blockName || EMPTY_STRING2,
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          },
          value: KeyAgreeRecipientInfo.schema().valueBlock.value
        }),
        new Constructed({
          name: names.blockName || EMPTY_STRING2,
          idBlock: {
            tagClass: 3,
            tagNumber: 2
          },
          value: KEKRecipientInfo.schema().valueBlock.value
        }),
        new Constructed({
          name: names.blockName || EMPTY_STRING2,
          idBlock: {
            tagClass: 3,
            tagNumber: 3
          },
          value: PasswordRecipientinfo.schema().valueBlock.value
        }),
        new Constructed({
          name: names.blockName || EMPTY_STRING2,
          idBlock: {
            tagClass: 3,
            tagNumber: 4
          },
          value: OtherRecipientInfo.schema().valueBlock.value
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$n);
    const asn1 = compareSchema(schema, schema, _RecipientInfo.schema({
      names: {
        blockName: "blockName"
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    if (asn1.result.blockName.idBlock.tagClass === 1) {
      this.variant = 1;
      this.value = new KeyTransRecipientInfo({ schema: asn1.result.blockName });
    } else {
      const blockSequence = new Sequence({
        value: asn1.result.blockName.valueBlock.value
      });
      switch (asn1.result.blockName.idBlock.tagNumber) {
        case 1:
          this.variant = 2;
          this.value = new KeyAgreeRecipientInfo({ schema: blockSequence });
          break;
        case 2:
          this.variant = 3;
          this.value = new KEKRecipientInfo({ schema: blockSequence });
          break;
        case 3:
          this.variant = 4;
          this.value = new PasswordRecipientinfo({ schema: blockSequence });
          break;
        case 4:
          this.variant = 5;
          this.value = new OtherRecipientInfo({ schema: blockSequence });
          break;
        default:
          throw new Error("Incorrect structure of RecipientInfo block");
      }
    }
  }
  toSchema() {
    ParameterError.assertEmpty(this.value, "value", "RecipientInfo");
    const _schema = this.value.toSchema();
    switch (this.variant) {
      case 1:
        return _schema;
      case 2:
      case 3:
      case 4:
        _schema.idBlock.tagClass = 3;
        _schema.idBlock.tagNumber = this.variant - 1;
        return _schema;
      default:
        return new Any();
    }
  }
  toJSON() {
    const res = {
      variant: this.variant
    };
    if (this.value && this.variant >= 1 && this.variant <= 4) {
      res.value = this.value.toJSON();
    }
    return res;
  }
};
RecipientInfo.CLASS_NAME = "RecipientInfo";
var HASH_ALGORITHM$2 = "hashAlgorithm";
var MASK_GEN_ALGORITHM = "maskGenAlgorithm";
var P_SOURCE_ALGORITHM = "pSourceAlgorithm";
var CLEAR_PROPS$m = [
  HASH_ALGORITHM$2,
  MASK_GEN_ALGORITHM,
  P_SOURCE_ALGORITHM
];
var RSAESOAEPParams = class _RSAESOAEPParams extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.hashAlgorithm = getParametersValue(parameters, HASH_ALGORITHM$2, _RSAESOAEPParams.defaultValues(HASH_ALGORITHM$2));
    this.maskGenAlgorithm = getParametersValue(parameters, MASK_GEN_ALGORITHM, _RSAESOAEPParams.defaultValues(MASK_GEN_ALGORITHM));
    this.pSourceAlgorithm = getParametersValue(parameters, P_SOURCE_ALGORITHM, _RSAESOAEPParams.defaultValues(P_SOURCE_ALGORITHM));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case HASH_ALGORITHM$2:
        return new AlgorithmIdentifier({
          algorithmId: "1.3.14.3.2.26",
          algorithmParams: new Null()
        });
      case MASK_GEN_ALGORITHM:
        return new AlgorithmIdentifier({
          algorithmId: "1.2.840.113549.1.1.8",
          algorithmParams: new AlgorithmIdentifier({
            algorithmId: "1.3.14.3.2.26",
            algorithmParams: new Null()
          }).toSchema()
        });
      case P_SOURCE_ALGORITHM:
        return new AlgorithmIdentifier({
          algorithmId: "1.2.840.113549.1.1.9",
          algorithmParams: new OctetString({ valueHex: new Uint8Array([218, 57, 163, 238, 94, 107, 75, 13, 50, 85, 191, 239, 149, 96, 24, 144, 175, 216, 7, 9]).buffer })
        });
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new Constructed({
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          optional: true,
          value: [AlgorithmIdentifier.schema(names.hashAlgorithm || {})]
        }),
        new Constructed({
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          },
          optional: true,
          value: [AlgorithmIdentifier.schema(names.maskGenAlgorithm || {})]
        }),
        new Constructed({
          idBlock: {
            tagClass: 3,
            tagNumber: 2
          },
          optional: true,
          value: [AlgorithmIdentifier.schema(names.pSourceAlgorithm || {})]
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$m);
    const asn1 = compareSchema(schema, schema, _RSAESOAEPParams.schema({
      names: {
        hashAlgorithm: {
          names: {
            blockName: HASH_ALGORITHM$2
          }
        },
        maskGenAlgorithm: {
          names: {
            blockName: MASK_GEN_ALGORITHM
          }
        },
        pSourceAlgorithm: {
          names: {
            blockName: P_SOURCE_ALGORITHM
          }
        }
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    if (HASH_ALGORITHM$2 in asn1.result)
      this.hashAlgorithm = new AlgorithmIdentifier({ schema: asn1.result.hashAlgorithm });
    if (MASK_GEN_ALGORITHM in asn1.result)
      this.maskGenAlgorithm = new AlgorithmIdentifier({ schema: asn1.result.maskGenAlgorithm });
    if (P_SOURCE_ALGORITHM in asn1.result)
      this.pSourceAlgorithm = new AlgorithmIdentifier({ schema: asn1.result.pSourceAlgorithm });
  }
  toSchema() {
    const outputArray = [];
    if (!this.hashAlgorithm.isEqual(_RSAESOAEPParams.defaultValues(HASH_ALGORITHM$2))) {
      outputArray.push(new Constructed({
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        value: [this.hashAlgorithm.toSchema()]
      }));
    }
    if (!this.maskGenAlgorithm.isEqual(_RSAESOAEPParams.defaultValues(MASK_GEN_ALGORITHM))) {
      outputArray.push(new Constructed({
        idBlock: {
          tagClass: 3,
          tagNumber: 1
        },
        value: [this.maskGenAlgorithm.toSchema()]
      }));
    }
    if (!this.pSourceAlgorithm.isEqual(_RSAESOAEPParams.defaultValues(P_SOURCE_ALGORITHM))) {
      outputArray.push(new Constructed({
        idBlock: {
          tagClass: 3,
          tagNumber: 2
        },
        value: [this.pSourceAlgorithm.toSchema()]
      }));
    }
    return new Sequence({
      value: outputArray
    });
  }
  toJSON() {
    const res = {};
    if (!this.hashAlgorithm.isEqual(_RSAESOAEPParams.defaultValues(HASH_ALGORITHM$2))) {
      res.hashAlgorithm = this.hashAlgorithm.toJSON();
    }
    if (!this.maskGenAlgorithm.isEqual(_RSAESOAEPParams.defaultValues(MASK_GEN_ALGORITHM))) {
      res.maskGenAlgorithm = this.maskGenAlgorithm.toJSON();
    }
    if (!this.pSourceAlgorithm.isEqual(_RSAESOAEPParams.defaultValues(P_SOURCE_ALGORITHM))) {
      res.pSourceAlgorithm = this.pSourceAlgorithm.toJSON();
    }
    return res;
  }
};
RSAESOAEPParams.CLASS_NAME = "RSAESOAEPParams";
var KEY_INFO = "keyInfo";
var ENTITY_U_INFO = "entityUInfo";
var SUPP_PUB_INFO = "suppPubInfo";
var CLEAR_PROPS$l = [
  KEY_INFO,
  ENTITY_U_INFO,
  SUPP_PUB_INFO
];
var ECCCMSSharedInfo = class _ECCCMSSharedInfo extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.keyInfo = getParametersValue(parameters, KEY_INFO, _ECCCMSSharedInfo.defaultValues(KEY_INFO));
    if (ENTITY_U_INFO in parameters) {
      this.entityUInfo = getParametersValue(parameters, ENTITY_U_INFO, _ECCCMSSharedInfo.defaultValues(ENTITY_U_INFO));
    }
    this.suppPubInfo = getParametersValue(parameters, SUPP_PUB_INFO, _ECCCMSSharedInfo.defaultValues(SUPP_PUB_INFO));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case KEY_INFO:
        return new AlgorithmIdentifier();
      case ENTITY_U_INFO:
        return new OctetString();
      case SUPP_PUB_INFO:
        return new OctetString();
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case KEY_INFO:
      case ENTITY_U_INFO:
      case SUPP_PUB_INFO:
        return memberValue.isEqual(_ECCCMSSharedInfo.defaultValues(memberName));
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        AlgorithmIdentifier.schema(names.keyInfo || {}),
        new Constructed({
          name: names.entityUInfo || EMPTY_STRING2,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          optional: true,
          value: [new OctetString()]
        }),
        new Constructed({
          name: names.suppPubInfo || EMPTY_STRING2,
          idBlock: {
            tagClass: 3,
            tagNumber: 2
          },
          value: [new OctetString()]
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$l);
    const asn1 = compareSchema(schema, schema, _ECCCMSSharedInfo.schema({
      names: {
        keyInfo: {
          names: {
            blockName: KEY_INFO
          }
        },
        entityUInfo: ENTITY_U_INFO,
        suppPubInfo: SUPP_PUB_INFO
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.keyInfo = new AlgorithmIdentifier({ schema: asn1.result.keyInfo });
    if (ENTITY_U_INFO in asn1.result)
      this.entityUInfo = asn1.result.entityUInfo.valueBlock.value[0];
    this.suppPubInfo = asn1.result.suppPubInfo.valueBlock.value[0];
  }
  toSchema() {
    const outputArray = [];
    outputArray.push(this.keyInfo.toSchema());
    if (this.entityUInfo) {
      outputArray.push(new Constructed({
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        value: [this.entityUInfo]
      }));
    }
    outputArray.push(new Constructed({
      idBlock: {
        tagClass: 3,
        tagNumber: 2
      },
      value: [this.suppPubInfo]
    }));
    return new Sequence({
      value: outputArray
    });
  }
  toJSON() {
    const res = {
      keyInfo: this.keyInfo.toJSON(),
      suppPubInfo: this.suppPubInfo.toJSON()
    };
    if (this.entityUInfo) {
      res.entityUInfo = this.entityUInfo.toJSON();
    }
    return res;
  }
};
ECCCMSSharedInfo.CLASS_NAME = "ECCCMSSharedInfo";
var VERSION$8 = "version";
var ORIGINATOR_INFO = "originatorInfo";
var RECIPIENT_INFOS = "recipientInfos";
var ENCRYPTED_CONTENT_INFO = "encryptedContentInfo";
var UNPROTECTED_ATTRS = "unprotectedAttrs";
var CLEAR_PROPS$k = [
  VERSION$8,
  ORIGINATOR_INFO,
  RECIPIENT_INFOS,
  ENCRYPTED_CONTENT_INFO,
  UNPROTECTED_ATTRS
];
var defaultEncryptionParams = {
  kdfAlgorithm: "SHA-512",
  kekEncryptionLength: 256
};
var curveLengthByName = {
  "P-256": 256,
  "P-384": 384,
  "P-521": 528
};
var EnvelopedData = class _EnvelopedData extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.version = getParametersValue(parameters, VERSION$8, _EnvelopedData.defaultValues(VERSION$8));
    if (ORIGINATOR_INFO in parameters) {
      this.originatorInfo = getParametersValue(parameters, ORIGINATOR_INFO, _EnvelopedData.defaultValues(ORIGINATOR_INFO));
    }
    this.recipientInfos = getParametersValue(parameters, RECIPIENT_INFOS, _EnvelopedData.defaultValues(RECIPIENT_INFOS));
    this.encryptedContentInfo = getParametersValue(parameters, ENCRYPTED_CONTENT_INFO, _EnvelopedData.defaultValues(ENCRYPTED_CONTENT_INFO));
    if (UNPROTECTED_ATTRS in parameters) {
      this.unprotectedAttrs = getParametersValue(parameters, UNPROTECTED_ATTRS, _EnvelopedData.defaultValues(UNPROTECTED_ATTRS));
    }
    this.policy = {
      disableSplit: !!parameters.disableSplit
    };
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case VERSION$8:
        return 0;
      case ORIGINATOR_INFO:
        return new OriginatorInfo();
      case RECIPIENT_INFOS:
        return [];
      case ENCRYPTED_CONTENT_INFO:
        return new EncryptedContentInfo();
      case UNPROTECTED_ATTRS:
        return [];
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case VERSION$8:
        return memberValue === _EnvelopedData.defaultValues(memberName);
      case ORIGINATOR_INFO:
        return memberValue.certs.certificates.length === 0 && memberValue.crls.crls.length === 0;
      case RECIPIENT_INFOS:
      case UNPROTECTED_ATTRS:
        return memberValue.length === 0;
      case ENCRYPTED_CONTENT_INFO:
        return EncryptedContentInfo.compareWithDefault("contentType", memberValue.contentType) && (EncryptedContentInfo.compareWithDefault("contentEncryptionAlgorithm", memberValue.contentEncryptionAlgorithm) && EncryptedContentInfo.compareWithDefault("encryptedContent", memberValue.encryptedContent));
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new Integer({ name: names.version || EMPTY_STRING2 }),
        new Constructed({
          name: names.originatorInfo || EMPTY_STRING2,
          optional: true,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: OriginatorInfo.schema().valueBlock.value
        }),
        new Set2({
          value: [
            new Repeated({
              name: names.recipientInfos || EMPTY_STRING2,
              value: RecipientInfo.schema()
            })
          ]
        }),
        EncryptedContentInfo.schema(names.encryptedContentInfo || {}),
        new Constructed({
          optional: true,
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          },
          value: [
            new Repeated({
              name: names.unprotectedAttrs || EMPTY_STRING2,
              value: Attribute.schema()
            })
          ]
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$k);
    const asn1 = compareSchema(schema, schema, _EnvelopedData.schema({
      names: {
        version: VERSION$8,
        originatorInfo: ORIGINATOR_INFO,
        recipientInfos: RECIPIENT_INFOS,
        encryptedContentInfo: {
          names: {
            blockName: ENCRYPTED_CONTENT_INFO
          }
        },
        unprotectedAttrs: UNPROTECTED_ATTRS
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.version = asn1.result.version.valueBlock.valueDec;
    if (ORIGINATOR_INFO in asn1.result) {
      this.originatorInfo = new OriginatorInfo({
        schema: new Sequence({
          value: asn1.result.originatorInfo.valueBlock.value
        })
      });
    }
    this.recipientInfos = Array.from(asn1.result.recipientInfos, (o) => new RecipientInfo({ schema: o }));
    this.encryptedContentInfo = new EncryptedContentInfo({ schema: asn1.result.encryptedContentInfo });
    if (UNPROTECTED_ATTRS in asn1.result)
      this.unprotectedAttrs = Array.from(asn1.result.unprotectedAttrs, (o) => new Attribute({ schema: o }));
  }
  toSchema() {
    const outputArray = [];
    outputArray.push(new Integer({ value: this.version }));
    if (this.originatorInfo) {
      outputArray.push(new Constructed({
        optional: true,
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        value: this.originatorInfo.toSchema().valueBlock.value
      }));
    }
    outputArray.push(new Set2({
      value: Array.from(this.recipientInfos, (o) => o.toSchema())
    }));
    outputArray.push(this.encryptedContentInfo.toSchema());
    if (this.unprotectedAttrs) {
      outputArray.push(new Constructed({
        optional: true,
        idBlock: {
          tagClass: 3,
          tagNumber: 1
        },
        value: Array.from(this.unprotectedAttrs, (o) => o.toSchema())
      }));
    }
    return new Sequence({
      value: outputArray
    });
  }
  toJSON() {
    const res = {
      version: this.version,
      recipientInfos: Array.from(this.recipientInfos, (o) => o.toJSON()),
      encryptedContentInfo: this.encryptedContentInfo.toJSON()
    };
    if (this.originatorInfo)
      res.originatorInfo = this.originatorInfo.toJSON();
    if (this.unprotectedAttrs)
      res.unprotectedAttrs = Array.from(this.unprotectedAttrs, (o) => o.toJSON());
    return res;
  }
  addRecipientByCertificate(certificate, parameters, variant, crypto2 = getCrypto(true)) {
    const encryptionParameters = Object.assign({ useOAEP: true, oaepHashAlgorithm: "SHA-512" }, defaultEncryptionParams, parameters || {});
    if (certificate.subjectPublicKeyInfo.algorithm.algorithmId.indexOf("1.2.840.113549") !== -1)
      variant = 1;
    else {
      if (certificate.subjectPublicKeyInfo.algorithm.algorithmId.indexOf("1.2.840.10045") !== -1)
        variant = 2;
      else
        throw new Error(`Unknown type of certificate's public key: ${certificate.subjectPublicKeyInfo.algorithm.algorithmId}`);
    }
    switch (variant) {
      case 1:
        {
          let algorithmId;
          let algorithmParams;
          if (encryptionParameters.useOAEP === true) {
            algorithmId = crypto2.getOIDByAlgorithm({
              name: "RSA-OAEP"
            }, true, "keyEncryptionAlgorithm");
            const hashOID = crypto2.getOIDByAlgorithm({
              name: encryptionParameters.oaepHashAlgorithm
            }, true, "RSAES-OAEP-params");
            const hashAlgorithm = new AlgorithmIdentifier({
              algorithmId: hashOID,
              algorithmParams: new Null()
            });
            const rsaOAEPParams = new RSAESOAEPParams({
              hashAlgorithm,
              maskGenAlgorithm: new AlgorithmIdentifier({
                algorithmId: "1.2.840.113549.1.1.8",
                algorithmParams: hashAlgorithm.toSchema()
              })
            });
            algorithmParams = rsaOAEPParams.toSchema();
          } else {
            algorithmId = crypto2.getOIDByAlgorithm({
              name: "RSAES-PKCS1-v1_5"
            });
            if (algorithmId === EMPTY_STRING2)
              throw new Error("Can not find OID for RSAES-PKCS1-v1_5");
            algorithmParams = new Null();
          }
          const keyInfo = new KeyTransRecipientInfo({
            version: 0,
            rid: new IssuerAndSerialNumber({
              issuer: certificate.issuer,
              serialNumber: certificate.serialNumber
            }),
            keyEncryptionAlgorithm: new AlgorithmIdentifier({
              algorithmId,
              algorithmParams
            }),
            recipientCertificate: certificate
          });
          this.recipientInfos.push(new RecipientInfo({
            variant: 1,
            value: keyInfo
          }));
        }
        break;
      case 2:
        {
          const recipientIdentifier = new KeyAgreeRecipientIdentifier({
            variant: 1,
            value: new IssuerAndSerialNumber({
              issuer: certificate.issuer,
              serialNumber: certificate.serialNumber
            })
          });
          this._addKeyAgreeRecipientInfo(recipientIdentifier, encryptionParameters, { recipientCertificate: certificate }, crypto2);
        }
        break;
      default:
        throw new Error(`Unknown "variant" value: ${variant}`);
    }
    return true;
  }
  addRecipientByPreDefinedData(preDefinedData, parameters = {}, variant, crypto2 = getCrypto(true)) {
    ArgumentError.assert(preDefinedData, "preDefinedData", "ArrayBuffer");
    if (!preDefinedData.byteLength) {
      throw new Error("Pre-defined data could have zero length");
    }
    if (!parameters.keyIdentifier) {
      const keyIdentifierBuffer = new ArrayBuffer(16);
      const keyIdentifierView = new Uint8Array(keyIdentifierBuffer);
      crypto2.getRandomValues(keyIdentifierView);
      parameters.keyIdentifier = keyIdentifierBuffer;
    }
    if (!parameters.hmacHashAlgorithm)
      parameters.hmacHashAlgorithm = "SHA-512";
    if (parameters.iterationCount === void 0) {
      parameters.iterationCount = 2048;
    }
    if (!parameters.keyEncryptionAlgorithm) {
      parameters.keyEncryptionAlgorithm = {
        name: "AES-KW",
        length: 256
      };
    }
    if (!parameters.keyEncryptionAlgorithmParams)
      parameters.keyEncryptionAlgorithmParams = new Null();
    switch (variant) {
      case 1:
        {
          const kekOID = crypto2.getOIDByAlgorithm(parameters.keyEncryptionAlgorithm, true, "keyEncryptionAlgorithm");
          const keyInfo = new KEKRecipientInfo({
            version: 4,
            kekid: new KEKIdentifier({
              keyIdentifier: new OctetString({ valueHex: parameters.keyIdentifier })
            }),
            keyEncryptionAlgorithm: new AlgorithmIdentifier({
              algorithmId: kekOID,
              algorithmParams: parameters.keyEncryptionAlgorithmParams
            }),
            preDefinedKEK: preDefinedData
          });
          this.recipientInfos.push(new RecipientInfo({
            variant: 3,
            value: keyInfo
          }));
        }
        break;
      case 2:
        {
          const pbkdf2OID = crypto2.getOIDByAlgorithm({ name: "PBKDF2" }, true, "keyDerivationAlgorithm");
          const saltBuffer = new ArrayBuffer(64);
          const saltView = new Uint8Array(saltBuffer);
          crypto2.getRandomValues(saltView);
          const hmacOID = crypto2.getOIDByAlgorithm({
            name: "HMAC",
            hash: {
              name: parameters.hmacHashAlgorithm
            }
          }, true, "hmacHashAlgorithm");
          const pbkdf2Params = new PBKDF2Params({
            salt: new OctetString({ valueHex: saltBuffer }),
            iterationCount: parameters.iterationCount,
            prf: new AlgorithmIdentifier({
              algorithmId: hmacOID,
              algorithmParams: new Null()
            })
          });
          const kekOID = crypto2.getOIDByAlgorithm(parameters.keyEncryptionAlgorithm, true, "keyEncryptionAlgorithm");
          const keyInfo = new PasswordRecipientinfo({
            version: 0,
            keyDerivationAlgorithm: new AlgorithmIdentifier({
              algorithmId: pbkdf2OID,
              algorithmParams: pbkdf2Params.toSchema()
            }),
            keyEncryptionAlgorithm: new AlgorithmIdentifier({
              algorithmId: kekOID,
              algorithmParams: parameters.keyEncryptionAlgorithmParams
            }),
            password: preDefinedData
          });
          this.recipientInfos.push(new RecipientInfo({
            variant: 4,
            value: keyInfo
          }));
        }
        break;
      default:
        throw new Error(`Unknown value for "variant": ${variant}`);
    }
  }
  addRecipientByKeyIdentifier(key, keyId, parameters, crypto2 = getCrypto(true)) {
    const encryptionParameters = Object.assign({}, defaultEncryptionParams, parameters || {});
    const recipientIdentifier = new KeyAgreeRecipientIdentifier({
      variant: 2,
      value: new RecipientKeyIdentifier({
        subjectKeyIdentifier: new OctetString({ valueHex: keyId })
      })
    });
    this._addKeyAgreeRecipientInfo(recipientIdentifier, encryptionParameters, { recipientPublicKey: key }, crypto2);
  }
  _addKeyAgreeRecipientInfo(recipientIdentifier, encryptionParameters, extraRecipientInfoParams, crypto2 = getCrypto(true)) {
    const encryptedKey = new RecipientEncryptedKey({
      rid: recipientIdentifier
    });
    const aesKWoid = crypto2.getOIDByAlgorithm({
      name: "AES-KW",
      length: encryptionParameters.kekEncryptionLength
    }, true, "keyEncryptionAlgorithm");
    const aesKW = new AlgorithmIdentifier({
      algorithmId: aesKWoid
    });
    const ecdhOID = crypto2.getOIDByAlgorithm({
      name: "ECDH",
      kdf: encryptionParameters.kdfAlgorithm
    }, true, "KeyAgreeRecipientInfo");
    const ukmBuffer = new ArrayBuffer(64);
    const ukmView = new Uint8Array(ukmBuffer);
    crypto2.getRandomValues(ukmView);
    const recipientInfoParams = {
      version: 3,
      ukm: new OctetString({ valueHex: ukmBuffer }),
      keyEncryptionAlgorithm: new AlgorithmIdentifier({
        algorithmId: ecdhOID,
        algorithmParams: aesKW.toSchema()
      }),
      recipientEncryptedKeys: new RecipientEncryptedKeys({
        encryptedKeys: [encryptedKey]
      })
    };
    const keyInfo = new KeyAgreeRecipientInfo(Object.assign(recipientInfoParams, extraRecipientInfoParams));
    this.recipientInfos.push(new RecipientInfo({
      variant: 2,
      value: keyInfo
    }));
  }
  async encrypt(contentEncryptionAlgorithm, contentToEncrypt, crypto2 = getCrypto(true)) {
    const ivBuffer = new ArrayBuffer(16);
    const ivView = new Uint8Array(ivBuffer);
    crypto2.getRandomValues(ivView);
    const contentView = new Uint8Array(contentToEncrypt);
    const contentEncryptionOID = crypto2.getOIDByAlgorithm(contentEncryptionAlgorithm, true, "contentEncryptionAlgorithm");
    const sessionKey = await crypto2.generateKey(contentEncryptionAlgorithm, true, ["encrypt"]);
    const encryptedContent = await crypto2.encrypt({
      name: contentEncryptionAlgorithm.name,
      iv: ivView
    }, sessionKey, contentView);
    const exportedSessionKey = await crypto2.exportKey("raw", sessionKey);
    this.version = 2;
    this.encryptedContentInfo = new EncryptedContentInfo({
      disableSplit: this.policy.disableSplit,
      contentType: "1.2.840.113549.1.7.1",
      contentEncryptionAlgorithm: new AlgorithmIdentifier({
        algorithmId: contentEncryptionOID,
        algorithmParams: new OctetString({ valueHex: ivBuffer })
      }),
      encryptedContent: new OctetString({ valueHex: encryptedContent })
    });
    const SubKeyAgreeRecipientInfo = async (index) => {
      const recipientInfo = this.recipientInfos[index].value;
      let recipientCurve;
      let recipientPublicKey;
      if (recipientInfo.recipientPublicKey) {
        recipientCurve = recipientInfo.recipientPublicKey.algorithm.namedCurve;
        recipientPublicKey = recipientInfo.recipientPublicKey;
      } else if (recipientInfo.recipientCertificate) {
        const curveObject = recipientInfo.recipientCertificate.subjectPublicKeyInfo.algorithm.algorithmParams;
        if (curveObject.constructor.blockName() !== ObjectIdentifier.blockName())
          throw new Error(`Incorrect "recipientCertificate" for index ${index}`);
        const curveOID = curveObject.valueBlock.toString();
        switch (curveOID) {
          case "1.2.840.10045.3.1.7":
            recipientCurve = "P-256";
            break;
          case "1.3.132.0.34":
            recipientCurve = "P-384";
            break;
          case "1.3.132.0.35":
            recipientCurve = "P-521";
            break;
          default:
            throw new Error(`Incorrect curve OID for index ${index}`);
        }
        recipientPublicKey = await recipientInfo.recipientCertificate.getPublicKey({
          algorithm: {
            algorithm: {
              name: "ECDH",
              namedCurve: recipientCurve
            },
            usages: []
          }
        }, crypto2);
      } else {
        throw new Error("Unsupported RecipientInfo");
      }
      const recipientCurveLength = curveLengthByName[recipientCurve];
      const ecdhKeys = await crypto2.generateKey({ name: "ECDH", namedCurve: recipientCurve }, true, ["deriveBits"]);
      const exportedECDHPublicKey = await crypto2.exportKey("spki", ecdhKeys.publicKey);
      const derivedBits = await crypto2.deriveBits({
        name: "ECDH",
        public: recipientPublicKey
      }, ecdhKeys.privateKey, recipientCurveLength);
      const aesKWAlgorithm = new AlgorithmIdentifier({ schema: recipientInfo.keyEncryptionAlgorithm.algorithmParams });
      const kwAlgorithm = crypto2.getAlgorithmByOID(aesKWAlgorithm.algorithmId, true, "aesKWAlgorithm");
      let kwLength = kwAlgorithm.length;
      const kwLengthBuffer = new ArrayBuffer(4);
      const kwLengthView = new Uint8Array(kwLengthBuffer);
      for (let j = 3; j >= 0; j--) {
        kwLengthView[j] = kwLength;
        kwLength >>= 8;
      }
      const eccInfo = new ECCCMSSharedInfo({
        keyInfo: new AlgorithmIdentifier({
          algorithmId: aesKWAlgorithm.algorithmId
        }),
        entityUInfo: recipientInfo.ukm,
        suppPubInfo: new OctetString({ valueHex: kwLengthBuffer })
      });
      const encodedInfo = eccInfo.toSchema().toBER(false);
      const ecdhAlgorithm = crypto2.getAlgorithmByOID(recipientInfo.keyEncryptionAlgorithm.algorithmId, true, "ecdhAlgorithm");
      const derivedKeyRaw = await kdf(ecdhAlgorithm.kdf, derivedBits, kwAlgorithm.length, encodedInfo, crypto2);
      const awsKW = await crypto2.importKey("raw", derivedKeyRaw, { name: "AES-KW" }, true, ["wrapKey"]);
      const wrappedKey = await crypto2.wrapKey("raw", sessionKey, awsKW, { name: "AES-KW" });
      const originator = new OriginatorIdentifierOrKey();
      originator.variant = 3;
      originator.value = OriginatorPublicKey.fromBER(exportedECDHPublicKey);
      recipientInfo.originator = originator;
      recipientInfo.recipientEncryptedKeys.encryptedKeys[0].encryptedKey = new OctetString({ valueHex: wrappedKey });
      return { ecdhPrivateKey: ecdhKeys.privateKey };
    };
    const SubKeyTransRecipientInfo = async (index) => {
      const recipientInfo = this.recipientInfos[index].value;
      const algorithmParameters = crypto2.getAlgorithmByOID(recipientInfo.keyEncryptionAlgorithm.algorithmId, true, "keyEncryptionAlgorithm");
      if (algorithmParameters.name === "RSA-OAEP") {
        const schema = recipientInfo.keyEncryptionAlgorithm.algorithmParams;
        const rsaOAEPParams = new RSAESOAEPParams({ schema });
        algorithmParameters.hash = crypto2.getAlgorithmByOID(rsaOAEPParams.hashAlgorithm.algorithmId);
        if ("name" in algorithmParameters.hash === false)
          throw new Error(`Incorrect OID for hash algorithm: ${rsaOAEPParams.hashAlgorithm.algorithmId}`);
      }
      try {
        const publicKey = await recipientInfo.recipientCertificate.getPublicKey({
          algorithm: {
            algorithm: algorithmParameters,
            usages: ["encrypt", "wrapKey"]
          }
        }, crypto2);
        const encryptedKey = await crypto2.encrypt(publicKey.algorithm, publicKey, exportedSessionKey);
        recipientInfo.encryptedKey = new OctetString({ valueHex: encryptedKey });
      } catch {
      }
    };
    const SubKEKRecipientInfo = async (index) => {
      const recipientInfo = this.recipientInfos[index].value;
      const kekAlgorithm = crypto2.getAlgorithmByOID(recipientInfo.keyEncryptionAlgorithm.algorithmId, true, "kekAlgorithm");
      const kekKey = await crypto2.importKey("raw", new Uint8Array(recipientInfo.preDefinedKEK), kekAlgorithm, true, ["wrapKey"]);
      const wrappedKey = await crypto2.wrapKey("raw", sessionKey, kekKey, kekAlgorithm);
      recipientInfo.encryptedKey = new OctetString({ valueHex: wrappedKey });
    };
    const SubPasswordRecipientinfo = async (index) => {
      const recipientInfo = this.recipientInfos[index].value;
      let pbkdf2Params;
      if (!recipientInfo.keyDerivationAlgorithm)
        throw new Error('Please append encoded "keyDerivationAlgorithm"');
      if (!recipientInfo.keyDerivationAlgorithm.algorithmParams)
        throw new Error('Incorrectly encoded "keyDerivationAlgorithm"');
      try {
        pbkdf2Params = new PBKDF2Params({ schema: recipientInfo.keyDerivationAlgorithm.algorithmParams });
      } catch (ex) {
        throw new Error('Incorrectly encoded "keyDerivationAlgorithm"');
      }
      const passwordView = new Uint8Array(recipientInfo.password);
      const derivationKey = await crypto2.importKey("raw", passwordView, "PBKDF2", false, ["deriveKey"]);
      const kekAlgorithm = crypto2.getAlgorithmByOID(recipientInfo.keyEncryptionAlgorithm.algorithmId, true, "kekAlgorithm");
      let hmacHashAlgorithm = "SHA-1";
      if (pbkdf2Params.prf) {
        const prfAlgorithm = crypto2.getAlgorithmByOID(pbkdf2Params.prf.algorithmId, true, "prfAlgorithm");
        hmacHashAlgorithm = prfAlgorithm.hash.name;
      }
      const saltView = new Uint8Array(pbkdf2Params.salt.valueBlock.valueHex);
      const iterations = pbkdf2Params.iterationCount;
      const derivedKey = await crypto2.deriveKey({
        name: "PBKDF2",
        hash: {
          name: hmacHashAlgorithm
        },
        salt: saltView,
        iterations
      }, derivationKey, kekAlgorithm, true, ["wrapKey"]);
      const wrappedKey = await crypto2.wrapKey("raw", sessionKey, derivedKey, kekAlgorithm);
      recipientInfo.encryptedKey = new OctetString({ valueHex: wrappedKey });
    };
    const res = [];
    for (let i = 0; i < this.recipientInfos.length; i++) {
      switch (this.recipientInfos[i].variant) {
        case 1:
          res.push(await SubKeyTransRecipientInfo(i));
          break;
        case 2:
          res.push(await SubKeyAgreeRecipientInfo(i));
          break;
        case 3:
          res.push(await SubKEKRecipientInfo(i));
          break;
        case 4:
          res.push(await SubPasswordRecipientinfo(i));
          break;
        default:
          throw new Error(`Unknown recipient type in array with index ${i}`);
      }
    }
    return res;
  }
  async decrypt(recipientIndex, parameters, crypto2 = getCrypto(true)) {
    const decryptionParameters = parameters || {};
    if (recipientIndex + 1 > this.recipientInfos.length) {
      throw new Error(`Maximum value for "index" is: ${this.recipientInfos.length - 1}`);
    }
    const SubKeyAgreeRecipientInfo = async (index) => {
      const recipientInfo = this.recipientInfos[index].value;
      let curveOID;
      let recipientCurve;
      let recipientCurveLength;
      const originator = recipientInfo.originator;
      if (decryptionParameters.recipientCertificate) {
        const curveObject = decryptionParameters.recipientCertificate.subjectPublicKeyInfo.algorithm.algorithmParams;
        if (curveObject.constructor.blockName() !== ObjectIdentifier.blockName()) {
          throw new Error(`Incorrect "recipientCertificate" for index ${index}`);
        }
        curveOID = curveObject.valueBlock.toString();
      } else if (originator.value.algorithm.algorithmParams) {
        const curveObject = originator.value.algorithm.algorithmParams;
        if (curveObject.constructor.blockName() !== ObjectIdentifier.blockName()) {
          throw new Error(`Incorrect originator for index ${index}`);
        }
        curveOID = curveObject.valueBlock.toString();
      } else {
        throw new Error('Parameter "recipientCertificate" is mandatory for "KeyAgreeRecipientInfo" if algorithm params are missing from originator');
      }
      if (!decryptionParameters.recipientPrivateKey)
        throw new Error('Parameter "recipientPrivateKey" is mandatory for "KeyAgreeRecipientInfo"');
      switch (curveOID) {
        case "1.2.840.10045.3.1.7":
          recipientCurve = "P-256";
          recipientCurveLength = 256;
          break;
        case "1.3.132.0.34":
          recipientCurve = "P-384";
          recipientCurveLength = 384;
          break;
        case "1.3.132.0.35":
          recipientCurve = "P-521";
          recipientCurveLength = 528;
          break;
        default:
          throw new Error(`Incorrect curve OID for index ${index}`);
      }
      let ecdhPrivateKey;
      let keyCrypto = crypto2;
      if (import_pvtsutils.BufferSourceConverter.isBufferSource(decryptionParameters.recipientPrivateKey)) {
        ecdhPrivateKey = await crypto2.importKey("pkcs8", decryptionParameters.recipientPrivateKey, {
          name: "ECDH",
          namedCurve: recipientCurve
        }, true, ["deriveBits"]);
      } else {
        ecdhPrivateKey = decryptionParameters.recipientPrivateKey;
        if ("crypto" in decryptionParameters && decryptionParameters.crypto) {
          keyCrypto = decryptionParameters.crypto.subtle;
        }
      }
      if ("algorithmParams" in originator.value.algorithm === false)
        originator.value.algorithm.algorithmParams = new ObjectIdentifier({ value: curveOID });
      const buffer = originator.value.toSchema().toBER(false);
      const ecdhPublicKey = await crypto2.importKey("spki", buffer, {
        name: "ECDH",
        namedCurve: recipientCurve
      }, true, []);
      const sharedSecret = await keyCrypto.deriveBits({
        name: "ECDH",
        public: ecdhPublicKey
      }, ecdhPrivateKey, recipientCurveLength);
      async function applyKDF(includeAlgorithmParams) {
        includeAlgorithmParams = includeAlgorithmParams || false;
        const aesKWAlgorithm = new AlgorithmIdentifier({ schema: recipientInfo.keyEncryptionAlgorithm.algorithmParams });
        const kwAlgorithm = crypto2.getAlgorithmByOID(aesKWAlgorithm.algorithmId, true, "kwAlgorithm");
        let kwLength = kwAlgorithm.length;
        const kwLengthBuffer = new ArrayBuffer(4);
        const kwLengthView = new Uint8Array(kwLengthBuffer);
        for (let j = 3; j >= 0; j--) {
          kwLengthView[j] = kwLength;
          kwLength >>= 8;
        }
        const keyInfoAlgorithm = {
          algorithmId: aesKWAlgorithm.algorithmId
        };
        if (includeAlgorithmParams) {
          keyInfoAlgorithm.algorithmParams = new Null();
        }
        const eccInfo = new ECCCMSSharedInfo({
          keyInfo: new AlgorithmIdentifier(keyInfoAlgorithm),
          entityUInfo: recipientInfo.ukm,
          suppPubInfo: new OctetString({ valueHex: kwLengthBuffer })
        });
        const encodedInfo = eccInfo.toSchema().toBER(false);
        const ecdhAlgorithm = crypto2.getAlgorithmByOID(recipientInfo.keyEncryptionAlgorithm.algorithmId, true, "ecdhAlgorithm");
        if (!ecdhAlgorithm.name) {
          throw new Error(`Incorrect OID for key encryption algorithm: ${recipientInfo.keyEncryptionAlgorithm.algorithmId}`);
        }
        return kdf(ecdhAlgorithm.kdf, sharedSecret, kwAlgorithm.length, encodedInfo, crypto2);
      }
      const kdfResult = await applyKDF();
      const importAesKwKey = async (kdfResult2) => {
        return crypto2.importKey("raw", kdfResult2, { name: "AES-KW" }, true, ["unwrapKey"]);
      };
      const aesKwKey = await importAesKwKey(kdfResult);
      const unwrapSessionKey = async (aesKwKey2) => {
        const algorithmId2 = this.encryptedContentInfo.contentEncryptionAlgorithm.algorithmId;
        const contentEncryptionAlgorithm2 = crypto2.getAlgorithmByOID(algorithmId2, true, "contentEncryptionAlgorithm");
        return crypto2.unwrapKey("raw", recipientInfo.recipientEncryptedKeys.encryptedKeys[0].encryptedKey.valueBlock.valueHexView, aesKwKey2, { name: "AES-KW" }, contentEncryptionAlgorithm2, true, ["decrypt"]);
      };
      try {
        return await unwrapSessionKey(aesKwKey);
      } catch {
        const kdfResult2 = await applyKDF(true);
        const aesKwKey2 = await importAesKwKey(kdfResult2);
        return unwrapSessionKey(aesKwKey2);
      }
    };
    const SubKeyTransRecipientInfo = async (index) => {
      const recipientInfo = this.recipientInfos[index].value;
      if (!decryptionParameters.recipientPrivateKey) {
        throw new Error('Parameter "recipientPrivateKey" is mandatory for "KeyTransRecipientInfo"');
      }
      const algorithmParameters = crypto2.getAlgorithmByOID(recipientInfo.keyEncryptionAlgorithm.algorithmId, true, "keyEncryptionAlgorithm");
      if (algorithmParameters.name === "RSA-OAEP") {
        const schema = recipientInfo.keyEncryptionAlgorithm.algorithmParams;
        const rsaOAEPParams = new RSAESOAEPParams({ schema });
        algorithmParameters.hash = crypto2.getAlgorithmByOID(rsaOAEPParams.hashAlgorithm.algorithmId);
        if ("name" in algorithmParameters.hash === false)
          throw new Error(`Incorrect OID for hash algorithm: ${rsaOAEPParams.hashAlgorithm.algorithmId}`);
      }
      let privateKey;
      let keyCrypto = crypto2;
      if (import_pvtsutils.BufferSourceConverter.isBufferSource(decryptionParameters.recipientPrivateKey)) {
        privateKey = await crypto2.importKey("pkcs8", decryptionParameters.recipientPrivateKey, algorithmParameters, true, ["decrypt"]);
      } else {
        privateKey = decryptionParameters.recipientPrivateKey;
        if ("crypto" in decryptionParameters && decryptionParameters.crypto) {
          keyCrypto = decryptionParameters.crypto.subtle;
        }
      }
      const sessionKey = await keyCrypto.decrypt(privateKey.algorithm, privateKey, recipientInfo.encryptedKey.valueBlock.valueHexView);
      const algorithmId2 = this.encryptedContentInfo.contentEncryptionAlgorithm.algorithmId;
      const contentEncryptionAlgorithm2 = crypto2.getAlgorithmByOID(algorithmId2, true, "contentEncryptionAlgorithm");
      if ("name" in contentEncryptionAlgorithm2 === false)
        throw new Error(`Incorrect "contentEncryptionAlgorithm": ${algorithmId2}`);
      return crypto2.importKey("raw", sessionKey, contentEncryptionAlgorithm2, true, ["decrypt"]);
    };
    const SubKEKRecipientInfo = async (index) => {
      const recipientInfo = this.recipientInfos[index].value;
      if (!decryptionParameters.preDefinedData)
        throw new Error('Parameter "preDefinedData" is mandatory for "KEKRecipientInfo"');
      const kekAlgorithm = crypto2.getAlgorithmByOID(recipientInfo.keyEncryptionAlgorithm.algorithmId, true, "kekAlgorithm");
      const importedKey = await crypto2.importKey("raw", decryptionParameters.preDefinedData, kekAlgorithm, true, ["unwrapKey"]);
      const algorithmId2 = this.encryptedContentInfo.contentEncryptionAlgorithm.algorithmId;
      const contentEncryptionAlgorithm2 = crypto2.getAlgorithmByOID(algorithmId2, true, "contentEncryptionAlgorithm");
      if (!contentEncryptionAlgorithm2.name) {
        throw new Error(`Incorrect "contentEncryptionAlgorithm": ${algorithmId2}`);
      }
      return crypto2.unwrapKey("raw", recipientInfo.encryptedKey.valueBlock.valueHexView, importedKey, kekAlgorithm, contentEncryptionAlgorithm2, true, ["decrypt"]);
    };
    const SubPasswordRecipientinfo = async (index) => {
      const recipientInfo = this.recipientInfos[index].value;
      let pbkdf2Params;
      if (!decryptionParameters.preDefinedData) {
        throw new Error('Parameter "preDefinedData" is mandatory for "KEKRecipientInfo"');
      }
      if (!recipientInfo.keyDerivationAlgorithm) {
        throw new Error('Please append encoded "keyDerivationAlgorithm"');
      }
      if (!recipientInfo.keyDerivationAlgorithm.algorithmParams) {
        throw new Error('Incorrectly encoded "keyDerivationAlgorithm"');
      }
      try {
        pbkdf2Params = new PBKDF2Params({ schema: recipientInfo.keyDerivationAlgorithm.algorithmParams });
      } catch (ex) {
        throw new Error('Incorrectly encoded "keyDerivationAlgorithm"');
      }
      const pbkdf2Key = await crypto2.importKey("raw", decryptionParameters.preDefinedData, "PBKDF2", false, ["deriveKey"]);
      const kekAlgorithm = crypto2.getAlgorithmByOID(recipientInfo.keyEncryptionAlgorithm.algorithmId, true, "keyEncryptionAlgorithm");
      const hmacHashAlgorithm = pbkdf2Params.prf ? crypto2.getAlgorithmByOID(pbkdf2Params.prf.algorithmId, true, "prfAlgorithm").hash.name : "SHA-1";
      const saltView = new Uint8Array(pbkdf2Params.salt.valueBlock.valueHex);
      const iterations = pbkdf2Params.iterationCount;
      const kekKey = await crypto2.deriveKey({
        name: "PBKDF2",
        hash: {
          name: hmacHashAlgorithm
        },
        salt: saltView,
        iterations
      }, pbkdf2Key, kekAlgorithm, true, ["unwrapKey"]);
      const algorithmId2 = this.encryptedContentInfo.contentEncryptionAlgorithm.algorithmId;
      const contentEncryptionAlgorithm2 = crypto2.getAlgorithmByOID(algorithmId2, true, "contentEncryptionAlgorithm");
      return crypto2.unwrapKey("raw", recipientInfo.encryptedKey.valueBlock.valueHexView, kekKey, kekAlgorithm, contentEncryptionAlgorithm2, true, ["decrypt"]);
    };
    let unwrappedKey;
    switch (this.recipientInfos[recipientIndex].variant) {
      case 1:
        unwrappedKey = await SubKeyTransRecipientInfo(recipientIndex);
        break;
      case 2:
        unwrappedKey = await SubKeyAgreeRecipientInfo(recipientIndex);
        break;
      case 3:
        unwrappedKey = await SubKEKRecipientInfo(recipientIndex);
        break;
      case 4:
        unwrappedKey = await SubPasswordRecipientinfo(recipientIndex);
        break;
      default:
        throw new Error(`Unknown recipient type in array with index ${recipientIndex}`);
    }
    const algorithmId = this.encryptedContentInfo.contentEncryptionAlgorithm.algorithmId;
    const contentEncryptionAlgorithm = crypto2.getAlgorithmByOID(algorithmId, true, "contentEncryptionAlgorithm");
    const ivBuffer = this.encryptedContentInfo.contentEncryptionAlgorithm.algorithmParams.valueBlock.valueHex;
    const ivView = new Uint8Array(ivBuffer);
    if (!this.encryptedContentInfo.encryptedContent) {
      throw new Error("Required property `encryptedContent` is empty");
    }
    const dataBuffer = this.encryptedContentInfo.getEncryptedContent();
    return crypto2.decrypt({
      name: contentEncryptionAlgorithm.name,
      iv: ivView
    }, unwrappedKey, dataBuffer);
  }
};
EnvelopedData.CLASS_NAME = "EnvelopedData";
var SAFE_CONTENTS = "safeContents";
var PARSED_VALUE$1 = "parsedValue";
var CONTENT_INFOS = "contentInfos";
var AuthenticatedSafe = class _AuthenticatedSafe extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.safeContents = getParametersValue(parameters, SAFE_CONTENTS, _AuthenticatedSafe.defaultValues(SAFE_CONTENTS));
    if (PARSED_VALUE$1 in parameters) {
      this.parsedValue = getParametersValue(parameters, PARSED_VALUE$1, _AuthenticatedSafe.defaultValues(PARSED_VALUE$1));
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case SAFE_CONTENTS:
        return [];
      case PARSED_VALUE$1:
        return {};
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case SAFE_CONTENTS:
        return memberValue.length === 0;
      case PARSED_VALUE$1:
        return memberValue instanceof Object && Object.keys(memberValue).length === 0;
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new Repeated({
          name: names.contentInfos || EMPTY_STRING2,
          value: ContentInfo.schema()
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, [
      CONTENT_INFOS
    ]);
    const asn1 = compareSchema(schema, schema, _AuthenticatedSafe.schema({
      names: {
        contentInfos: CONTENT_INFOS
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.safeContents = Array.from(asn1.result.contentInfos, (element) => new ContentInfo({ schema: element }));
  }
  toSchema() {
    return new Sequence({
      value: Array.from(this.safeContents, (o) => o.toSchema())
    });
  }
  toJSON() {
    return {
      safeContents: Array.from(this.safeContents, (o) => o.toJSON())
    };
  }
  async parseInternalValues(parameters, crypto2 = getCrypto(true)) {
    ParameterError.assert(parameters, SAFE_CONTENTS);
    ArgumentError.assert(parameters.safeContents, SAFE_CONTENTS, "Array");
    if (parameters.safeContents.length !== this.safeContents.length) {
      throw new ArgumentError('Length of "parameters.safeContents" must be equal to "this.safeContents.length"');
    }
    this.parsedValue = {
      safeContents: []
    };
    for (const [index, content] of this.safeContents.entries()) {
      const safeContent = parameters.safeContents[index];
      const errorTarget = `parameters.safeContents[${index}]`;
      switch (content.contentType) {
        case id_ContentType_Data:
          {
            ArgumentError.assert(content.content, "this.safeContents[j].content", OctetString);
            const authSafeContent = content.content.getValue();
            this.parsedValue.safeContents.push({
              privacyMode: 0,
              value: SafeContents.fromBER(authSafeContent)
            });
          }
          break;
        case id_ContentType_EnvelopedData:
          {
            const cmsEnveloped = new EnvelopedData({ schema: content.content });
            ParameterError.assert(errorTarget, safeContent, "recipientCertificate", "recipientKey");
            const envelopedData = safeContent;
            const recipientCertificate = envelopedData.recipientCertificate;
            const recipientKey = envelopedData.recipientKey;
            const decrypted = await cmsEnveloped.decrypt(0, {
              recipientCertificate,
              recipientPrivateKey: recipientKey
            }, crypto2);
            this.parsedValue.safeContents.push({
              privacyMode: 2,
              value: SafeContents.fromBER(decrypted)
            });
          }
          break;
        case id_ContentType_EncryptedData:
          {
            const cmsEncrypted = new EncryptedData({ schema: content.content });
            ParameterError.assert(errorTarget, safeContent, "password");
            const password = safeContent.password;
            const decrypted = await cmsEncrypted.decrypt({
              password
            }, crypto2);
            this.parsedValue.safeContents.push({
              privacyMode: 1,
              value: SafeContents.fromBER(decrypted)
            });
          }
          break;
        default:
          throw new Error(`Unknown "contentType" for AuthenticatedSafe: " ${content.contentType}`);
      }
    }
  }
  async makeInternalValues(parameters, crypto2 = getCrypto(true)) {
    if (!this.parsedValue) {
      throw new Error('Please run "parseValues" first or add "parsedValue" manually');
    }
    ArgumentError.assert(this.parsedValue, "this.parsedValue", "object");
    ArgumentError.assert(this.parsedValue.safeContents, "this.parsedValue.safeContents", "Array");
    ArgumentError.assert(parameters, "parameters", "object");
    ParameterError.assert(parameters, "safeContents");
    ArgumentError.assert(parameters.safeContents, "parameters.safeContents", "Array");
    if (parameters.safeContents.length !== this.parsedValue.safeContents.length) {
      throw new ArgumentError('Length of "parameters.safeContents" must be equal to "this.parsedValue.safeContents"');
    }
    this.safeContents = [];
    for (const [index, content] of this.parsedValue.safeContents.entries()) {
      ParameterError.assert("content", content, "privacyMode", "value");
      ArgumentError.assert(content.value, "content.value", SafeContents);
      switch (content.privacyMode) {
        case 0:
          {
            const contentBuffer = content.value.toSchema().toBER(false);
            this.safeContents.push(new ContentInfo({
              contentType: "1.2.840.113549.1.7.1",
              content: new OctetString({ valueHex: contentBuffer })
            }));
          }
          break;
        case 1:
          {
            const cmsEncrypted = new EncryptedData();
            const currentParameters = parameters.safeContents[index];
            currentParameters.contentToEncrypt = content.value.toSchema().toBER(false);
            await cmsEncrypted.encrypt(currentParameters, crypto2);
            this.safeContents.push(new ContentInfo({
              contentType: "1.2.840.113549.1.7.6",
              content: cmsEncrypted.toSchema()
            }));
          }
          break;
        case 2:
          {
            const cmsEnveloped = new EnvelopedData();
            const contentToEncrypt = content.value.toSchema().toBER(false);
            const safeContent = parameters.safeContents[index];
            ParameterError.assert(`parameters.safeContents[${index}]`, safeContent, "encryptingCertificate", "encryptionAlgorithm");
            switch (true) {
              case safeContent.encryptionAlgorithm.name.toLowerCase() === "aes-cbc":
              case safeContent.encryptionAlgorithm.name.toLowerCase() === "aes-gcm":
                break;
              default:
                throw new Error(`Incorrect parameter "encryptionAlgorithm" in "parameters.safeContents[i]": ${safeContent.encryptionAlgorithm}`);
            }
            switch (true) {
              case safeContent.encryptionAlgorithm.length === 128:
              case safeContent.encryptionAlgorithm.length === 192:
              case safeContent.encryptionAlgorithm.length === 256:
                break;
              default:
                throw new Error(`Incorrect parameter "encryptionAlgorithm.length" in "parameters.safeContents[i]": ${safeContent.encryptionAlgorithm.length}`);
            }
            const encryptionAlgorithm = safeContent.encryptionAlgorithm;
            cmsEnveloped.addRecipientByCertificate(safeContent.encryptingCertificate, {}, void 0, crypto2);
            await cmsEnveloped.encrypt(encryptionAlgorithm, contentToEncrypt, crypto2);
            this.safeContents.push(new ContentInfo({
              contentType: "1.2.840.113549.1.7.3",
              content: cmsEnveloped.toSchema()
            }));
          }
          break;
        default:
          throw new Error(`Incorrect value for "content.privacyMode": ${content.privacyMode}`);
      }
    }
    return this;
  }
};
AuthenticatedSafe.CLASS_NAME = "AuthenticatedSafe";
var HASH_ALGORITHM$1 = "hashAlgorithm";
var ISSUER_NAME_HASH = "issuerNameHash";
var ISSUER_KEY_HASH = "issuerKeyHash";
var SERIAL_NUMBER$1 = "serialNumber";
var CLEAR_PROPS$j = [
  HASH_ALGORITHM$1,
  ISSUER_NAME_HASH,
  ISSUER_KEY_HASH,
  SERIAL_NUMBER$1
];
var CertID = class _CertID extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.hashAlgorithm = getParametersValue(parameters, HASH_ALGORITHM$1, _CertID.defaultValues(HASH_ALGORITHM$1));
    this.issuerNameHash = getParametersValue(parameters, ISSUER_NAME_HASH, _CertID.defaultValues(ISSUER_NAME_HASH));
    this.issuerKeyHash = getParametersValue(parameters, ISSUER_KEY_HASH, _CertID.defaultValues(ISSUER_KEY_HASH));
    this.serialNumber = getParametersValue(parameters, SERIAL_NUMBER$1, _CertID.defaultValues(SERIAL_NUMBER$1));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static async create(certificate, parameters, crypto2 = getCrypto(true)) {
    const certID = new _CertID();
    await certID.createForCertificate(certificate, parameters, crypto2);
    return certID;
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case HASH_ALGORITHM$1:
        return new AlgorithmIdentifier();
      case ISSUER_NAME_HASH:
      case ISSUER_KEY_HASH:
        return new OctetString();
      case SERIAL_NUMBER$1:
        return new Integer();
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case HASH_ALGORITHM$1:
        return memberValue.algorithmId === EMPTY_STRING2 && "algorithmParams" in memberValue === false;
      case ISSUER_NAME_HASH:
      case ISSUER_KEY_HASH:
      case SERIAL_NUMBER$1:
        return memberValue.isEqual(_CertID.defaultValues(SERIAL_NUMBER$1));
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        AlgorithmIdentifier.schema(names.hashAlgorithmObject || {
          names: {
            blockName: names.hashAlgorithm || EMPTY_STRING2
          }
        }),
        new OctetString({ name: names.issuerNameHash || EMPTY_STRING2 }),
        new OctetString({ name: names.issuerKeyHash || EMPTY_STRING2 }),
        new Integer({ name: names.serialNumber || EMPTY_STRING2 })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$j);
    const asn1 = compareSchema(schema, schema, _CertID.schema({
      names: {
        hashAlgorithm: HASH_ALGORITHM$1,
        issuerNameHash: ISSUER_NAME_HASH,
        issuerKeyHash: ISSUER_KEY_HASH,
        serialNumber: SERIAL_NUMBER$1
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.hashAlgorithm = new AlgorithmIdentifier({ schema: asn1.result.hashAlgorithm });
    this.issuerNameHash = asn1.result.issuerNameHash;
    this.issuerKeyHash = asn1.result.issuerKeyHash;
    this.serialNumber = asn1.result.serialNumber;
  }
  toSchema() {
    return new Sequence({
      value: [
        this.hashAlgorithm.toSchema(),
        this.issuerNameHash,
        this.issuerKeyHash,
        this.serialNumber
      ]
    });
  }
  toJSON() {
    return {
      hashAlgorithm: this.hashAlgorithm.toJSON(),
      issuerNameHash: this.issuerNameHash.toJSON(),
      issuerKeyHash: this.issuerKeyHash.toJSON(),
      serialNumber: this.serialNumber.toJSON()
    };
  }
  isEqual(certificateID) {
    if (this.hashAlgorithm.algorithmId !== certificateID.hashAlgorithm.algorithmId) {
      return false;
    }
    if (!pvtsutils2.BufferSourceConverter.isEqual(this.issuerNameHash.valueBlock.valueHexView, certificateID.issuerNameHash.valueBlock.valueHexView)) {
      return false;
    }
    if (!pvtsutils2.BufferSourceConverter.isEqual(this.issuerKeyHash.valueBlock.valueHexView, certificateID.issuerKeyHash.valueBlock.valueHexView)) {
      return false;
    }
    if (!this.serialNumber.isEqual(certificateID.serialNumber)) {
      return false;
    }
    return true;
  }
  async createForCertificate(certificate, parameters, crypto2 = getCrypto(true)) {
    ParameterError.assert(parameters, HASH_ALGORITHM$1, "issuerCertificate");
    const hashOID = crypto2.getOIDByAlgorithm({ name: parameters.hashAlgorithm }, true, "hashAlgorithm");
    this.hashAlgorithm = new AlgorithmIdentifier({
      algorithmId: hashOID,
      algorithmParams: new Null()
    });
    const issuerCertificate = parameters.issuerCertificate;
    this.serialNumber = certificate.serialNumber;
    const hashIssuerName = await crypto2.digest({ name: parameters.hashAlgorithm }, issuerCertificate.subject.toSchema().toBER(false));
    this.issuerNameHash = new OctetString({ valueHex: hashIssuerName });
    const issuerKeyBuffer = issuerCertificate.subjectPublicKeyInfo.subjectPublicKey.valueBlock.valueHexView;
    const hashIssuerKey = await crypto2.digest({ name: parameters.hashAlgorithm }, issuerKeyBuffer);
    this.issuerKeyHash = new OctetString({ valueHex: hashIssuerKey });
  }
};
CertID.CLASS_NAME = "CertID";
var CERT_ID = "certID";
var CERT_STATUS = "certStatus";
var THIS_UPDATE = "thisUpdate";
var NEXT_UPDATE = "nextUpdate";
var SINGLE_EXTENSIONS = "singleExtensions";
var CLEAR_PROPS$i = [
  CERT_ID,
  CERT_STATUS,
  THIS_UPDATE,
  NEXT_UPDATE,
  SINGLE_EXTENSIONS
];
var SingleResponse = class _SingleResponse extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.certID = getParametersValue(parameters, CERT_ID, _SingleResponse.defaultValues(CERT_ID));
    this.certStatus = getParametersValue(parameters, CERT_STATUS, _SingleResponse.defaultValues(CERT_STATUS));
    this.thisUpdate = getParametersValue(parameters, THIS_UPDATE, _SingleResponse.defaultValues(THIS_UPDATE));
    if (NEXT_UPDATE in parameters) {
      this.nextUpdate = getParametersValue(parameters, NEXT_UPDATE, _SingleResponse.defaultValues(NEXT_UPDATE));
    }
    if (SINGLE_EXTENSIONS in parameters) {
      this.singleExtensions = getParametersValue(parameters, SINGLE_EXTENSIONS, _SingleResponse.defaultValues(SINGLE_EXTENSIONS));
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case CERT_ID:
        return new CertID();
      case CERT_STATUS:
        return {};
      case THIS_UPDATE:
      case NEXT_UPDATE:
        return new Date(0, 0, 0);
      case SINGLE_EXTENSIONS:
        return [];
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case CERT_ID:
        return CertID.compareWithDefault("hashAlgorithm", memberValue.hashAlgorithm) && CertID.compareWithDefault("issuerNameHash", memberValue.issuerNameHash) && CertID.compareWithDefault("issuerKeyHash", memberValue.issuerKeyHash) && CertID.compareWithDefault("serialNumber", memberValue.serialNumber);
      case CERT_STATUS:
        return Object.keys(memberValue).length === 0;
      case THIS_UPDATE:
      case NEXT_UPDATE:
        return memberValue === _SingleResponse.defaultValues(memberName);
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        CertID.schema(names.certID || {}),
        new Choice({
          value: [
            new Primitive({
              name: names.certStatus || EMPTY_STRING2,
              idBlock: {
                tagClass: 3,
                tagNumber: 0
              }
            }),
            new Constructed({
              name: names.certStatus || EMPTY_STRING2,
              idBlock: {
                tagClass: 3,
                tagNumber: 1
              },
              value: [
                new GeneralizedTime(),
                new Constructed({
                  optional: true,
                  idBlock: {
                    tagClass: 3,
                    tagNumber: 0
                  },
                  value: [new Enumerated()]
                })
              ]
            }),
            new Primitive({
              name: names.certStatus || EMPTY_STRING2,
              idBlock: {
                tagClass: 3,
                tagNumber: 2
              },
              lenBlock: { length: 1 }
            })
          ]
        }),
        new GeneralizedTime({ name: names.thisUpdate || EMPTY_STRING2 }),
        new Constructed({
          optional: true,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [new GeneralizedTime({ name: names.nextUpdate || EMPTY_STRING2 })]
        }),
        new Constructed({
          optional: true,
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          },
          value: [Extensions.schema(names.singleExtensions || {})]
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$i);
    const asn1 = compareSchema(schema, schema, _SingleResponse.schema({
      names: {
        certID: {
          names: {
            blockName: CERT_ID
          }
        },
        certStatus: CERT_STATUS,
        thisUpdate: THIS_UPDATE,
        nextUpdate: NEXT_UPDATE,
        singleExtensions: {
          names: {
            blockName: SINGLE_EXTENSIONS
          }
        }
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.certID = new CertID({ schema: asn1.result.certID });
    this.certStatus = asn1.result.certStatus;
    this.thisUpdate = asn1.result.thisUpdate.toDate();
    if (NEXT_UPDATE in asn1.result)
      this.nextUpdate = asn1.result.nextUpdate.toDate();
    if (SINGLE_EXTENSIONS in asn1.result)
      this.singleExtensions = Array.from(asn1.result.singleExtensions.valueBlock.value, (element) => new Extension({ schema: element }));
  }
  toSchema() {
    const outputArray = [];
    outputArray.push(this.certID.toSchema());
    outputArray.push(this.certStatus);
    outputArray.push(new GeneralizedTime({ valueDate: this.thisUpdate }));
    if (this.nextUpdate) {
      outputArray.push(new Constructed({
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        value: [new GeneralizedTime({ valueDate: this.nextUpdate })]
      }));
    }
    if (this.singleExtensions) {
      outputArray.push(new Sequence({
        value: Array.from(this.singleExtensions, (o) => o.toSchema())
      }));
    }
    return new Sequence({
      value: outputArray
    });
  }
  toJSON() {
    const res = {
      certID: this.certID.toJSON(),
      certStatus: this.certStatus.toJSON(),
      thisUpdate: this.thisUpdate
    };
    if (this.nextUpdate) {
      res.nextUpdate = this.nextUpdate;
    }
    if (this.singleExtensions) {
      res.singleExtensions = Array.from(this.singleExtensions, (o) => o.toJSON());
    }
    return res;
  }
};
SingleResponse.CLASS_NAME = "SingleResponse";
var TBS$2 = "tbs";
var VERSION$7 = "version";
var RESPONDER_ID = "responderID";
var PRODUCED_AT = "producedAt";
var RESPONSES = "responses";
var RESPONSE_EXTENSIONS = "responseExtensions";
var RESPONSE_DATA = "ResponseData";
var RESPONSE_DATA_VERSION = `${RESPONSE_DATA}.${VERSION$7}`;
var RESPONSE_DATA_RESPONDER_ID = `${RESPONSE_DATA}.${RESPONDER_ID}`;
var RESPONSE_DATA_PRODUCED_AT = `${RESPONSE_DATA}.${PRODUCED_AT}`;
var RESPONSE_DATA_RESPONSES = `${RESPONSE_DATA}.${RESPONSES}`;
var RESPONSE_DATA_RESPONSE_EXTENSIONS = `${RESPONSE_DATA}.${RESPONSE_EXTENSIONS}`;
var CLEAR_PROPS$h = [
  RESPONSE_DATA,
  RESPONSE_DATA_VERSION,
  RESPONSE_DATA_RESPONDER_ID,
  RESPONSE_DATA_PRODUCED_AT,
  RESPONSE_DATA_RESPONSES,
  RESPONSE_DATA_RESPONSE_EXTENSIONS
];
var ResponseData = class _ResponseData extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.tbsView = new Uint8Array(getParametersValue(parameters, TBS$2, _ResponseData.defaultValues(TBS$2)));
    if (VERSION$7 in parameters) {
      this.version = getParametersValue(parameters, VERSION$7, _ResponseData.defaultValues(VERSION$7));
    }
    this.responderID = getParametersValue(parameters, RESPONDER_ID, _ResponseData.defaultValues(RESPONDER_ID));
    this.producedAt = getParametersValue(parameters, PRODUCED_AT, _ResponseData.defaultValues(PRODUCED_AT));
    this.responses = getParametersValue(parameters, RESPONSES, _ResponseData.defaultValues(RESPONSES));
    if (RESPONSE_EXTENSIONS in parameters) {
      this.responseExtensions = getParametersValue(parameters, RESPONSE_EXTENSIONS, _ResponseData.defaultValues(RESPONSE_EXTENSIONS));
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  get tbs() {
    return pvtsutils2.BufferSourceConverter.toArrayBuffer(this.tbsView);
  }
  set tbs(value) {
    this.tbsView = new Uint8Array(value);
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case VERSION$7:
        return 0;
      case TBS$2:
        return EMPTY_BUFFER2;
      case RESPONDER_ID:
        return {};
      case PRODUCED_AT:
        return new Date(0, 0, 0);
      case RESPONSES:
      case RESPONSE_EXTENSIONS:
        return [];
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case TBS$2:
        return memberValue.byteLength === 0;
      case RESPONDER_ID:
        return Object.keys(memberValue).length === 0;
      case PRODUCED_AT:
        return memberValue === _ResponseData.defaultValues(memberName);
      case RESPONSES:
      case RESPONSE_EXTENSIONS:
        return memberValue.length === 0;
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || RESPONSE_DATA,
      value: [
        new Constructed({
          optional: true,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [new Integer({ name: names.version || RESPONSE_DATA_VERSION })]
        }),
        new Choice({
          value: [
            new Constructed({
              name: names.responderID || RESPONSE_DATA_RESPONDER_ID,
              idBlock: {
                tagClass: 3,
                tagNumber: 1
              },
              value: [RelativeDistinguishedNames.schema(names.ResponseDataByName || {
                names: {
                  blockName: "ResponseData.byName"
                }
              })]
            }),
            new Constructed({
              name: names.responderID || RESPONSE_DATA_RESPONDER_ID,
              idBlock: {
                tagClass: 3,
                tagNumber: 2
              },
              value: [new OctetString({ name: names.ResponseDataByKey || "ResponseData.byKey" })]
            })
          ]
        }),
        new GeneralizedTime({ name: names.producedAt || RESPONSE_DATA_PRODUCED_AT }),
        new Sequence({
          value: [
            new Repeated({
              name: RESPONSE_DATA_RESPONSES,
              value: SingleResponse.schema(names.response || {})
            })
          ]
        }),
        new Constructed({
          optional: true,
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          },
          value: [Extensions.schema(names.extensions || {
            names: {
              blockName: RESPONSE_DATA_RESPONSE_EXTENSIONS
            }
          })]
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$h);
    const asn1 = compareSchema(schema, schema, _ResponseData.schema());
    AsnError.assertSchema(asn1, this.className);
    this.tbsView = asn1.result.ResponseData.valueBeforeDecodeView;
    if (RESPONSE_DATA_VERSION in asn1.result)
      this.version = asn1.result[RESPONSE_DATA_VERSION].valueBlock.valueDec;
    if (asn1.result[RESPONSE_DATA_RESPONDER_ID].idBlock.tagNumber === 1)
      this.responderID = new RelativeDistinguishedNames({ schema: asn1.result[RESPONSE_DATA_RESPONDER_ID].valueBlock.value[0] });
    else
      this.responderID = asn1.result[RESPONSE_DATA_RESPONDER_ID].valueBlock.value[0];
    this.producedAt = asn1.result[RESPONSE_DATA_PRODUCED_AT].toDate();
    this.responses = Array.from(asn1.result[RESPONSE_DATA_RESPONSES], (element) => new SingleResponse({ schema: element }));
    if (RESPONSE_DATA_RESPONSE_EXTENSIONS in asn1.result)
      this.responseExtensions = Array.from(asn1.result[RESPONSE_DATA_RESPONSE_EXTENSIONS].valueBlock.value, (element) => new Extension({ schema: element }));
  }
  toSchema(encodeFlag = false) {
    let tbsSchema;
    if (encodeFlag === false) {
      if (!this.tbsView.byteLength) {
        return _ResponseData.schema();
      }
      const asn1 = fromBER(this.tbsView);
      AsnError.assert(asn1, "TBS Response Data");
      tbsSchema = asn1.result;
    } else {
      const outputArray = [];
      if (VERSION$7 in this) {
        outputArray.push(new Constructed({
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [new Integer({ value: this.version })]
        }));
      }
      if (this.responderID instanceof RelativeDistinguishedNames) {
        outputArray.push(new Constructed({
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          },
          value: [this.responderID.toSchema()]
        }));
      } else {
        outputArray.push(new Constructed({
          idBlock: {
            tagClass: 3,
            tagNumber: 2
          },
          value: [this.responderID]
        }));
      }
      outputArray.push(new GeneralizedTime({ valueDate: this.producedAt }));
      outputArray.push(new Sequence({
        value: Array.from(this.responses, (o) => o.toSchema())
      }));
      if (this.responseExtensions) {
        outputArray.push(new Constructed({
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          },
          value: [new Sequence({
            value: Array.from(this.responseExtensions, (o) => o.toSchema())
          })]
        }));
      }
      tbsSchema = new Sequence({
        value: outputArray
      });
    }
    return tbsSchema;
  }
  toJSON() {
    const res = {};
    if (VERSION$7 in this) {
      res.version = this.version;
    }
    if (this.responderID) {
      res.responderID = this.responderID;
    }
    if (this.producedAt) {
      res.producedAt = this.producedAt;
    }
    if (this.responses) {
      res.responses = Array.from(this.responses, (o) => o.toJSON());
    }
    if (this.responseExtensions) {
      res.responseExtensions = Array.from(this.responseExtensions, (o) => o.toJSON());
    }
    return res;
  }
};
ResponseData.CLASS_NAME = "ResponseData";
var TRUSTED_CERTS = "trustedCerts";
var CERTS$2 = "certs";
var CRLS$1 = "crls";
var OCSPS$1 = "ocsps";
var CHECK_DATE = "checkDate";
var FIND_ORIGIN = "findOrigin";
var FIND_ISSUER = "findIssuer";
var ChainValidationCode;
(function(ChainValidationCode2) {
  ChainValidationCode2[ChainValidationCode2["unknown"] = -1] = "unknown";
  ChainValidationCode2[ChainValidationCode2["success"] = 0] = "success";
  ChainValidationCode2[ChainValidationCode2["noRevocation"] = 11] = "noRevocation";
  ChainValidationCode2[ChainValidationCode2["noPath"] = 60] = "noPath";
  ChainValidationCode2[ChainValidationCode2["noValidPath"] = 97] = "noValidPath";
})(ChainValidationCode || (ChainValidationCode = {}));
var ChainValidationError = class _ChainValidationError extends Error {
  constructor(code, message3) {
    super(message3);
    this.name = _ChainValidationError.NAME;
    this.code = code;
    this.message = message3;
  }
};
ChainValidationError.NAME = "ChainValidationError";
function isTrusted(cert, trustedList) {
  for (let i = 0; i < trustedList.length; i++) {
    if (pvtsutils2.BufferSourceConverter.isEqual(cert.tbsView, trustedList[i].tbsView)) {
      return true;
    }
  }
  return false;
}
var CertificateChainValidationEngine = class _CertificateChainValidationEngine {
  constructor(parameters = {}) {
    this.trustedCerts = getParametersValue(parameters, TRUSTED_CERTS, this.defaultValues(TRUSTED_CERTS));
    this.certs = getParametersValue(parameters, CERTS$2, this.defaultValues(CERTS$2));
    this.crls = getParametersValue(parameters, CRLS$1, this.defaultValues(CRLS$1));
    this.ocsps = getParametersValue(parameters, OCSPS$1, this.defaultValues(OCSPS$1));
    this.checkDate = getParametersValue(parameters, CHECK_DATE, this.defaultValues(CHECK_DATE));
    this.findOrigin = getParametersValue(parameters, FIND_ORIGIN, this.defaultValues(FIND_ORIGIN));
    this.findIssuer = getParametersValue(parameters, FIND_ISSUER, this.defaultValues(FIND_ISSUER));
  }
  static defaultFindOrigin(certificate, validationEngine) {
    if (certificate.tbsView.byteLength === 0) {
      certificate.tbsView = new Uint8Array(certificate.encodeTBS().toBER());
    }
    for (const localCert of validationEngine.certs) {
      if (localCert.tbsView.byteLength === 0) {
        localCert.tbsView = new Uint8Array(localCert.encodeTBS().toBER());
      }
      if (pvtsutils2.BufferSourceConverter.isEqual(certificate.tbsView, localCert.tbsView))
        return "Intermediate Certificates";
    }
    for (const trustedCert of validationEngine.trustedCerts) {
      if (trustedCert.tbsView.byteLength === 0)
        trustedCert.tbsView = new Uint8Array(trustedCert.encodeTBS().toBER());
      if (pvtsutils2.BufferSourceConverter.isEqual(certificate.tbsView, trustedCert.tbsView))
        return "Trusted Certificates";
    }
    return "Unknown";
  }
  async defaultFindIssuer(certificate, validationEngine, crypto2 = getCrypto(true)) {
    const result = [];
    let keyIdentifier = null;
    let authorityCertIssuer = null;
    let authorityCertSerialNumber = null;
    if (certificate.subject.isEqual(certificate.issuer)) {
      try {
        const verificationResult = await certificate.verify(void 0, crypto2);
        if (verificationResult) {
          return [certificate];
        }
      } catch (ex) {
      }
    }
    if (certificate.extensions) {
      for (const extension of certificate.extensions) {
        if (extension.extnID === id_AuthorityKeyIdentifier && extension.parsedValue instanceof AuthorityKeyIdentifier) {
          if (extension.parsedValue.keyIdentifier) {
            keyIdentifier = extension.parsedValue.keyIdentifier;
          } else {
            if (extension.parsedValue.authorityCertIssuer) {
              authorityCertIssuer = extension.parsedValue.authorityCertIssuer;
            }
            if (extension.parsedValue.authorityCertSerialNumber) {
              authorityCertSerialNumber = extension.parsedValue.authorityCertSerialNumber;
            }
          }
          break;
        }
      }
    }
    function checkCertificate(possibleIssuer) {
      if (keyIdentifier !== null) {
        if (possibleIssuer.extensions) {
          let extensionFound = false;
          for (const extension of possibleIssuer.extensions) {
            if (extension.extnID === id_SubjectKeyIdentifier && extension.parsedValue) {
              extensionFound = true;
              if (pvtsutils2.BufferSourceConverter.isEqual(extension.parsedValue.valueBlock.valueHex, keyIdentifier.valueBlock.valueHexView)) {
                result.push(possibleIssuer);
              }
              break;
            }
          }
          if (extensionFound) {
            return;
          }
        }
      }
      let authorityCertSerialNumberEqual = false;
      if (authorityCertSerialNumber !== null)
        authorityCertSerialNumberEqual = possibleIssuer.serialNumber.isEqual(authorityCertSerialNumber);
      if (authorityCertIssuer !== null) {
        if (possibleIssuer.subject.isEqual(authorityCertIssuer)) {
          if (authorityCertSerialNumberEqual)
            result.push(possibleIssuer);
        }
      } else {
        if (certificate.issuer.isEqual(possibleIssuer.subject))
          result.push(possibleIssuer);
      }
    }
    for (const trustedCert of validationEngine.trustedCerts) {
      checkCertificate(trustedCert);
    }
    for (const intermediateCert of validationEngine.certs) {
      checkCertificate(intermediateCert);
    }
    for (let i = 0; i < result.length; i++) {
      try {
        const verificationResult = await certificate.verify(result[i], crypto2);
        if (verificationResult === false)
          result.splice(i, 1);
      } catch (ex) {
        result.splice(i, 1);
      }
    }
    return result;
  }
  defaultValues(memberName) {
    switch (memberName) {
      case TRUSTED_CERTS:
        return [];
      case CERTS$2:
        return [];
      case CRLS$1:
        return [];
      case OCSPS$1:
        return [];
      case CHECK_DATE:
        return /* @__PURE__ */ new Date();
      case FIND_ORIGIN:
        return _CertificateChainValidationEngine.defaultFindOrigin;
      case FIND_ISSUER:
        return this.defaultFindIssuer;
      default:
        throw new Error(`Invalid member name for CertificateChainValidationEngine class: ${memberName}`);
    }
  }
  async sort(passedWhenNotRevValues = false, crypto2 = getCrypto(true)) {
    const localCerts = [];
    const buildPath = async (certificate, crypto3) => {
      const result2 = [];
      function checkUnique(array) {
        let unique = true;
        for (let i = 0; i < array.length; i++) {
          for (let j = 0; j < array.length; j++) {
            if (j === i)
              continue;
            if (array[i] === array[j]) {
              unique = false;
              break;
            }
          }
          if (!unique)
            break;
        }
        return unique;
      }
      if (isTrusted(certificate, this.trustedCerts)) {
        return [[certificate]];
      }
      const findIssuerResult = await this.findIssuer(certificate, this, crypto3);
      if (findIssuerResult.length === 0) {
        throw new Error("No valid certificate paths found");
      }
      for (let i = 0; i < findIssuerResult.length; i++) {
        if (pvtsutils2.BufferSourceConverter.isEqual(findIssuerResult[i].tbsView, certificate.tbsView)) {
          result2.push([findIssuerResult[i]]);
          continue;
        }
        const buildPathResult = await buildPath(findIssuerResult[i], crypto3);
        for (let j = 0; j < buildPathResult.length; j++) {
          const copy = buildPathResult[j].slice();
          copy.splice(0, 0, findIssuerResult[i]);
          if (checkUnique(copy))
            result2.push(copy);
          else
            result2.push(buildPathResult[j]);
        }
      }
      return result2;
    };
    const findCRL = async (certificate) => {
      const issuerCertificates = [];
      const crls = [];
      const crlsAndCertificates = [];
      issuerCertificates.push(...localCerts.filter((element) => certificate.issuer.isEqual(element.subject)));
      if (issuerCertificates.length === 0) {
        return {
          status: 1,
          statusMessage: "No certificate's issuers"
        };
      }
      crls.push(...this.crls.filter((o) => o.issuer.isEqual(certificate.issuer)));
      if (crls.length === 0) {
        return {
          status: 2,
          statusMessage: "No CRLs for specific certificate issuer"
        };
      }
      for (let i = 0; i < crls.length; i++) {
        const crl = crls[i];
        if (crl.nextUpdate && crl.nextUpdate.value < this.checkDate) {
          continue;
        }
        for (let j = 0; j < issuerCertificates.length; j++) {
          try {
            const result2 = await crls[i].verify({ issuerCertificate: issuerCertificates[j] }, crypto2);
            if (result2) {
              crlsAndCertificates.push({
                crl: crls[i],
                certificate: issuerCertificates[j]
              });
              break;
            }
          } catch (ex) {
          }
        }
      }
      if (crlsAndCertificates.length) {
        return {
          status: 0,
          statusMessage: EMPTY_STRING2,
          result: crlsAndCertificates
        };
      }
      return {
        status: 3,
        statusMessage: "No valid CRLs found"
      };
    };
    const findOCSP = async (certificate, issuerCertificate) => {
      const hashAlgorithm = crypto2.getAlgorithmByOID(certificate.signatureAlgorithm.algorithmId);
      if (!hashAlgorithm.name) {
        return 1;
      }
      if (!hashAlgorithm.hash) {
        return 1;
      }
      for (let i = 0; i < this.ocsps.length; i++) {
        const ocsp = this.ocsps[i];
        const result2 = await ocsp.getCertificateStatus(certificate, issuerCertificate, crypto2);
        if (result2.isForCertificate) {
          if (result2.status === 0)
            return 0;
          return 1;
        }
      }
      return 2;
    };
    async function checkForCA(certificate, needToCheckCRL = false) {
      let isCA = false;
      let mustBeCA = false;
      let keyUsagePresent = false;
      let cRLSign = false;
      if (certificate.extensions) {
        for (let j = 0; j < certificate.extensions.length; j++) {
          const extension = certificate.extensions[j];
          if (extension.critical && !extension.parsedValue) {
            return {
              result: false,
              resultCode: 6,
              resultMessage: `Unable to parse critical certificate extension: ${extension.extnID}`
            };
          }
          if (extension.extnID === id_KeyUsage) {
            keyUsagePresent = true;
            const view = new Uint8Array(extension.parsedValue.valueBlock.valueHex);
            if ((view[0] & 4) === 4)
              mustBeCA = true;
            if ((view[0] & 2) === 2)
              cRLSign = true;
          }
          if (extension.extnID === id_BasicConstraints) {
            if ("cA" in extension.parsedValue) {
              if (extension.parsedValue.cA === true)
                isCA = true;
            }
          }
        }
        if (mustBeCA === true && isCA === false) {
          return {
            result: false,
            resultCode: 3,
            resultMessage: 'Unable to build certificate chain - using "keyCertSign" flag set without BasicConstraints'
          };
        }
        if (keyUsagePresent === true && isCA === true && mustBeCA === false) {
          return {
            result: false,
            resultCode: 4,
            resultMessage: 'Unable to build certificate chain - "keyCertSign" flag was not set'
          };
        }
        if (isCA === true && keyUsagePresent === true && (needToCheckCRL && cRLSign === false)) {
          return {
            result: false,
            resultCode: 5,
            resultMessage: 'Unable to build certificate chain - intermediate certificate must have "cRLSign" key usage flag'
          };
        }
      }
      if (isCA === false) {
        return {
          result: false,
          resultCode: 7,
          resultMessage: "Unable to build certificate chain - more than one possible end-user certificate"
        };
      }
      return {
        result: true,
        resultCode: 0,
        resultMessage: EMPTY_STRING2
      };
    }
    const basicCheck = async (path, checkDate) => {
      for (let i = 0; i < path.length; i++) {
        if (path[i].notBefore.value > checkDate || path[i].notAfter.value < checkDate) {
          return {
            result: false,
            resultCode: 8,
            resultMessage: "The certificate is either not yet valid or expired"
          };
        }
      }
      if (path.length < 2) {
        return {
          result: false,
          resultCode: 9,
          resultMessage: "Too short certificate path"
        };
      }
      for (let i = path.length - 2; i >= 0; i--) {
        if (path[i].issuer.isEqual(path[i].subject) === false) {
          if (path[i].issuer.isEqual(path[i + 1].subject) === false) {
            return {
              result: false,
              resultCode: 10,
              resultMessage: "Incorrect name chaining"
            };
          }
        }
      }
      if (this.crls.length !== 0 || this.ocsps.length !== 0) {
        for (let i = 0; i < path.length - 1; i++) {
          let ocspResult = 2;
          let crlResult = {
            status: 0,
            statusMessage: EMPTY_STRING2
          };
          if (this.ocsps.length !== 0) {
            ocspResult = await findOCSP(path[i], path[i + 1]);
            switch (ocspResult) {
              case 0:
                continue;
              case 1:
                return {
                  result: false,
                  resultCode: 12,
                  resultMessage: "One of certificates was revoked via OCSP response"
                };
            }
          }
          if (this.crls.length !== 0) {
            crlResult = await findCRL(path[i]);
            if (crlResult.status === 0 && crlResult.result) {
              for (let j = 0; j < crlResult.result.length; j++) {
                const isCertificateRevoked = crlResult.result[j].crl.isCertificateRevoked(path[i]);
                if (isCertificateRevoked) {
                  return {
                    result: false,
                    resultCode: 12,
                    resultMessage: "One of certificates had been revoked"
                  };
                }
                const isCertificateCA = await checkForCA(crlResult.result[j].certificate, true);
                if (isCertificateCA.result === false) {
                  return {
                    result: false,
                    resultCode: 13,
                    resultMessage: "CRL issuer certificate is not a CA certificate or does not have crlSign flag"
                  };
                }
              }
            } else {
              if (passedWhenNotRevValues === false) {
                throw new ChainValidationError(ChainValidationCode.noRevocation, `No revocation values found for one of certificates: ${crlResult.statusMessage}`);
              }
            }
          } else {
            if (ocspResult === 2) {
              return {
                result: false,
                resultCode: 11,
                resultMessage: "No revocation values found for one of certificates"
              };
            }
          }
          if (ocspResult === 2 && crlResult.status === 2 && passedWhenNotRevValues) {
            const issuerCertificate = path[i + 1];
            let extensionFound = false;
            if (issuerCertificate.extensions) {
              for (const extension of issuerCertificate.extensions) {
                switch (extension.extnID) {
                  case id_CRLDistributionPoints:
                  case id_FreshestCRL:
                  case id_AuthorityInfoAccess:
                    extensionFound = true;
                    break;
                }
              }
            }
            if (extensionFound) {
              throw new ChainValidationError(ChainValidationCode.noRevocation, `No revocation values found for one of certificates: ${crlResult.statusMessage}`);
            }
          }
        }
      }
      for (const [i, cert] of path.entries()) {
        if (!i) {
          continue;
        }
        const result2 = await checkForCA(cert);
        if (!result2.result) {
          return {
            result: false,
            resultCode: 14,
            resultMessage: "One of intermediate certificates is not a CA certificate"
          };
        }
      }
      return {
        result: true
      };
    };
    localCerts.push(...this.trustedCerts);
    localCerts.push(...this.certs);
    for (let i = 0; i < localCerts.length; i++) {
      for (let j = 0; j < localCerts.length; j++) {
        if (i === j)
          continue;
        if (pvtsutils2.BufferSourceConverter.isEqual(localCerts[i].tbsView, localCerts[j].tbsView)) {
          localCerts.splice(j, 1);
          i = 0;
          break;
        }
      }
    }
    const leafCert = localCerts[localCerts.length - 1];
    let result;
    const certificatePath = [leafCert];
    result = await buildPath(leafCert, crypto2);
    if (result.length === 0) {
      throw new ChainValidationError(ChainValidationCode.noPath, "Unable to find certificate path");
    }
    for (let i = 0; i < result.length; i++) {
      let found = false;
      for (let j = 0; j < result[i].length; j++) {
        const certificate = result[i][j];
        for (let k = 0; k < this.trustedCerts.length; k++) {
          if (pvtsutils2.BufferSourceConverter.isEqual(certificate.tbsView, this.trustedCerts[k].tbsView)) {
            found = true;
            break;
          }
        }
        if (found)
          break;
      }
      if (!found) {
        result.splice(i, 1);
        i = 0;
      }
    }
    if (result.length === 0) {
      throw new ChainValidationError(ChainValidationCode.noValidPath, "No valid certificate paths found");
    }
    let shortestLength = result[0].length;
    let shortestIndex = 0;
    for (let i = 0; i < result.length; i++) {
      if (result[i].length < shortestLength) {
        shortestLength = result[i].length;
        shortestIndex = i;
      }
    }
    for (let i = 0; i < result[shortestIndex].length; i++)
      certificatePath.push(result[shortestIndex][i]);
    result = await basicCheck(certificatePath, this.checkDate);
    if (result.result === false)
      throw result;
    return certificatePath;
  }
  async verify(parameters = {}, crypto2 = getCrypto(true)) {
    function compareDNSName(name, constraint) {
      const namePrepared = stringPrep(name);
      const constraintPrepared = stringPrep(constraint);
      const nameSplitted = namePrepared.split(".");
      const constraintSplitted = constraintPrepared.split(".");
      const nameLen = nameSplitted.length;
      const constrLen = constraintSplitted.length;
      if (nameLen === 0 || constrLen === 0 || nameLen < constrLen) {
        return false;
      }
      for (let i = 0; i < nameLen; i++) {
        if (nameSplitted[i].length === 0) {
          return false;
        }
      }
      for (let i = 0; i < constrLen; i++) {
        if (constraintSplitted[i].length === 0) {
          if (i === 0) {
            if (constrLen === 1) {
              return false;
            }
            continue;
          }
          return false;
        }
      }
      for (let i = 0; i < constrLen; i++) {
        if (constraintSplitted[constrLen - 1 - i].length === 0) {
          continue;
        }
        if (nameSplitted[nameLen - 1 - i].localeCompare(constraintSplitted[constrLen - 1 - i]) !== 0) {
          return false;
        }
      }
      return true;
    }
    function compareRFC822Name(name, constraint) {
      const namePrepared = stringPrep(name);
      const constraintPrepared = stringPrep(constraint);
      const nameSplitted = namePrepared.split("@");
      const constraintSplitted = constraintPrepared.split("@");
      if (nameSplitted.length === 0 || constraintSplitted.length === 0 || nameSplitted.length < constraintSplitted.length)
        return false;
      if (constraintSplitted.length === 1) {
        const result = compareDNSName(nameSplitted[1], constraintSplitted[0]);
        if (result) {
          const ns = nameSplitted[1].split(".");
          const cs = constraintSplitted[0].split(".");
          if (cs[0].length === 0)
            return true;
          return ns.length === cs.length;
        }
        return false;
      }
      return namePrepared.localeCompare(constraintPrepared) === 0;
    }
    function compareUniformResourceIdentifier(name, constraint) {
      let namePrepared = stringPrep(name);
      const constraintPrepared = stringPrep(constraint);
      const ns = namePrepared.split("/");
      const cs = constraintPrepared.split("/");
      if (cs.length > 1)
        return false;
      if (ns.length > 1) {
        for (let i = 0; i < ns.length; i++) {
          if (ns[i].length > 0 && ns[i].charAt(ns[i].length - 1) !== ":") {
            const nsPort = ns[i].split(":");
            namePrepared = nsPort[0];
            break;
          }
        }
      }
      const result = compareDNSName(namePrepared, constraintPrepared);
      if (result) {
        const nameSplitted = namePrepared.split(".");
        const constraintSplitted = constraintPrepared.split(".");
        if (constraintSplitted[0].length === 0)
          return true;
        return nameSplitted.length === constraintSplitted.length;
      }
      return false;
    }
    function compareIPAddress(name, constraint) {
      const nameView = name.valueBlock.valueHexView;
      const constraintView = constraint.valueBlock.valueHexView;
      if (nameView.length === 4 && constraintView.length === 8) {
        for (let i = 0; i < 4; i++) {
          if ((nameView[i] ^ constraintView[i]) & constraintView[i + 4])
            return false;
        }
        return true;
      }
      if (nameView.length === 16 && constraintView.length === 32) {
        for (let i = 0; i < 16; i++) {
          if ((nameView[i] ^ constraintView[i]) & constraintView[i + 16])
            return false;
        }
        return true;
      }
      return false;
    }
    function compareDirectoryName(name, constraint) {
      if (name.typesAndValues.length === 0 || constraint.typesAndValues.length === 0)
        return true;
      if (name.typesAndValues.length < constraint.typesAndValues.length)
        return false;
      let result = true;
      let nameStart = 0;
      for (let i = 0; i < constraint.typesAndValues.length; i++) {
        let localResult = false;
        for (let j = nameStart; j < name.typesAndValues.length; j++) {
          localResult = name.typesAndValues[j].isEqual(constraint.typesAndValues[i]);
          if (name.typesAndValues[j].type === constraint.typesAndValues[i].type)
            result = result && localResult;
          if (localResult === true) {
            if (nameStart === 0 || nameStart === j) {
              nameStart = j + 1;
              break;
            } else
              return false;
          }
        }
        if (localResult === false)
          return false;
      }
      return nameStart === 0 ? false : result;
    }
    try {
      if (this.certs.length === 0)
        throw new Error("Empty certificate array");
      const passedWhenNotRevValues = parameters.passedWhenNotRevValues || false;
      const initialPolicySet = parameters.initialPolicySet || [id_AnyPolicy];
      const initialExplicitPolicy = parameters.initialExplicitPolicy || false;
      const initialPolicyMappingInhibit = parameters.initialPolicyMappingInhibit || false;
      const initialInhibitPolicy = parameters.initialInhibitPolicy || false;
      const initialPermittedSubtreesSet = parameters.initialPermittedSubtreesSet || [];
      const initialExcludedSubtreesSet = parameters.initialExcludedSubtreesSet || [];
      const initialRequiredNameForms = parameters.initialRequiredNameForms || [];
      let explicitPolicyIndicator = initialExplicitPolicy;
      let policyMappingInhibitIndicator = initialPolicyMappingInhibit;
      let inhibitAnyPolicyIndicator = initialInhibitPolicy;
      const pendingConstraints = [
        false,
        false,
        false
      ];
      let explicitPolicyPending = 0;
      let policyMappingInhibitPending = 0;
      let inhibitAnyPolicyPending = 0;
      let permittedSubtrees = initialPermittedSubtreesSet;
      let excludedSubtrees = initialExcludedSubtreesSet;
      const requiredNameForms = initialRequiredNameForms;
      let pathDepth = 1;
      this.certs = await this.sort(passedWhenNotRevValues, crypto2);
      const allPolicies = [];
      allPolicies.push(id_AnyPolicy);
      const policiesAndCerts = [];
      const anyPolicyArray = new Array(this.certs.length - 1);
      for (let ii = 0; ii < this.certs.length - 1; ii++)
        anyPolicyArray[ii] = true;
      policiesAndCerts.push(anyPolicyArray);
      const policyMappings = new Array(this.certs.length - 1);
      const certPolicies = new Array(this.certs.length - 1);
      let explicitPolicyStart = explicitPolicyIndicator ? this.certs.length - 1 : -1;
      for (let i = this.certs.length - 2; i >= 0; i--, pathDepth++) {
        const cert = this.certs[i];
        if (cert.extensions) {
          for (let j = 0; j < cert.extensions.length; j++) {
            const extension = cert.extensions[j];
            if (extension.extnID === id_CertificatePolicies) {
              certPolicies[i] = extension.parsedValue;
              for (let s = 0; s < allPolicies.length; s++) {
                if (allPolicies[s] === id_AnyPolicy) {
                  delete policiesAndCerts[s][i];
                  break;
                }
              }
              for (let k = 0; k < extension.parsedValue.certificatePolicies.length; k++) {
                let policyIndex = -1;
                const policyId = extension.parsedValue.certificatePolicies[k].policyIdentifier;
                for (let s = 0; s < allPolicies.length; s++) {
                  if (policyId === allPolicies[s]) {
                    policyIndex = s;
                    break;
                  }
                }
                if (policyIndex === -1) {
                  allPolicies.push(policyId);
                  const certArray = new Array(this.certs.length - 1);
                  certArray[i] = true;
                  policiesAndCerts.push(certArray);
                } else
                  policiesAndCerts[policyIndex][i] = true;
              }
            }
            if (extension.extnID === id_PolicyMappings) {
              if (policyMappingInhibitIndicator) {
                return {
                  result: false,
                  resultCode: 98,
                  resultMessage: "Policy mapping prohibited"
                };
              }
              policyMappings[i] = extension.parsedValue;
            }
            if (extension.extnID === id_PolicyConstraints) {
              if (explicitPolicyIndicator === false) {
                if (extension.parsedValue.requireExplicitPolicy === 0) {
                  explicitPolicyIndicator = true;
                  explicitPolicyStart = i;
                } else {
                  if (pendingConstraints[0] === false) {
                    pendingConstraints[0] = true;
                    explicitPolicyPending = extension.parsedValue.requireExplicitPolicy;
                  } else
                    explicitPolicyPending = explicitPolicyPending > extension.parsedValue.requireExplicitPolicy ? extension.parsedValue.requireExplicitPolicy : explicitPolicyPending;
                }
                if (extension.parsedValue.inhibitPolicyMapping === 0)
                  policyMappingInhibitIndicator = true;
                else {
                  if (pendingConstraints[1] === false) {
                    pendingConstraints[1] = true;
                    policyMappingInhibitPending = extension.parsedValue.inhibitPolicyMapping + 1;
                  } else
                    policyMappingInhibitPending = policyMappingInhibitPending > extension.parsedValue.inhibitPolicyMapping + 1 ? extension.parsedValue.inhibitPolicyMapping + 1 : policyMappingInhibitPending;
                }
              }
            }
            if (extension.extnID === id_InhibitAnyPolicy) {
              if (inhibitAnyPolicyIndicator === false) {
                if (extension.parsedValue.valueBlock.valueDec === 0)
                  inhibitAnyPolicyIndicator = true;
                else {
                  if (pendingConstraints[2] === false) {
                    pendingConstraints[2] = true;
                    inhibitAnyPolicyPending = extension.parsedValue.valueBlock.valueDec;
                  } else
                    inhibitAnyPolicyPending = inhibitAnyPolicyPending > extension.parsedValue.valueBlock.valueDec ? extension.parsedValue.valueBlock.valueDec : inhibitAnyPolicyPending;
                }
              }
            }
          }
          if (inhibitAnyPolicyIndicator === true) {
            let policyIndex = -1;
            for (let searchAnyPolicy = 0; searchAnyPolicy < allPolicies.length; searchAnyPolicy++) {
              if (allPolicies[searchAnyPolicy] === id_AnyPolicy) {
                policyIndex = searchAnyPolicy;
                break;
              }
            }
            if (policyIndex !== -1)
              delete policiesAndCerts[0][i];
          }
          if (explicitPolicyIndicator === false) {
            if (pendingConstraints[0] === true) {
              explicitPolicyPending--;
              if (explicitPolicyPending === 0) {
                explicitPolicyIndicator = true;
                explicitPolicyStart = i;
                pendingConstraints[0] = false;
              }
            }
          }
          if (policyMappingInhibitIndicator === false) {
            if (pendingConstraints[1] === true) {
              policyMappingInhibitPending--;
              if (policyMappingInhibitPending === 0) {
                policyMappingInhibitIndicator = true;
                pendingConstraints[1] = false;
              }
            }
          }
          if (inhibitAnyPolicyIndicator === false) {
            if (pendingConstraints[2] === true) {
              inhibitAnyPolicyPending--;
              if (inhibitAnyPolicyPending === 0) {
                inhibitAnyPolicyIndicator = true;
                pendingConstraints[2] = false;
              }
            }
          }
        }
      }
      for (let i = 0; i < this.certs.length - 1; i++) {
        if (i < this.certs.length - 2 && typeof policyMappings[i + 1] !== "undefined") {
          for (let k = 0; k < policyMappings[i + 1].mappings.length; k++) {
            if (policyMappings[i + 1].mappings[k].issuerDomainPolicy === id_AnyPolicy || policyMappings[i + 1].mappings[k].subjectDomainPolicy === id_AnyPolicy) {
              return {
                result: false,
                resultCode: 99,
                resultMessage: 'The "anyPolicy" should not be a part of policy mapping scheme'
              };
            }
            let issuerDomainPolicyIndex = -1;
            let subjectDomainPolicyIndex = -1;
            for (let n = 0; n < allPolicies.length; n++) {
              if (allPolicies[n] === policyMappings[i + 1].mappings[k].issuerDomainPolicy)
                issuerDomainPolicyIndex = n;
              if (allPolicies[n] === policyMappings[i + 1].mappings[k].subjectDomainPolicy)
                subjectDomainPolicyIndex = n;
            }
            if (typeof policiesAndCerts[issuerDomainPolicyIndex][i] !== "undefined")
              delete policiesAndCerts[issuerDomainPolicyIndex][i];
            for (let j = 0; j < certPolicies[i].certificatePolicies.length; j++) {
              if (policyMappings[i + 1].mappings[k].subjectDomainPolicy === certPolicies[i].certificatePolicies[j].policyIdentifier) {
                if (issuerDomainPolicyIndex !== -1 && subjectDomainPolicyIndex !== -1) {
                  for (let m = 0; m <= i; m++) {
                    if (typeof policiesAndCerts[subjectDomainPolicyIndex][m] !== "undefined") {
                      policiesAndCerts[issuerDomainPolicyIndex][m] = true;
                      delete policiesAndCerts[subjectDomainPolicyIndex][m];
                    }
                  }
                }
              }
            }
          }
        }
      }
      for (let i = 0; i < allPolicies.length; i++) {
        if (allPolicies[i] === id_AnyPolicy) {
          for (let j = 0; j < explicitPolicyStart; j++)
            delete policiesAndCerts[i][j];
        }
      }
      const authConstrPolicies = [];
      for (let i = 0; i < policiesAndCerts.length; i++) {
        let found = true;
        for (let j = 0; j < this.certs.length - 1; j++) {
          let anyPolicyFound = false;
          if (j < explicitPolicyStart && allPolicies[i] === id_AnyPolicy && allPolicies.length > 1) {
            found = false;
            break;
          }
          if (typeof policiesAndCerts[i][j] === "undefined") {
            if (j >= explicitPolicyStart) {
              for (let k = 0; k < allPolicies.length; k++) {
                if (allPolicies[k] === id_AnyPolicy) {
                  if (policiesAndCerts[k][j] === true)
                    anyPolicyFound = true;
                  break;
                }
              }
            }
            if (!anyPolicyFound) {
              found = false;
              break;
            }
          }
        }
        if (found === true)
          authConstrPolicies.push(allPolicies[i]);
      }
      let userConstrPolicies = [];
      if (initialPolicySet.length === 1 && initialPolicySet[0] === id_AnyPolicy && explicitPolicyIndicator === false)
        userConstrPolicies = initialPolicySet;
      else {
        if (authConstrPolicies.length === 1 && authConstrPolicies[0] === id_AnyPolicy)
          userConstrPolicies = initialPolicySet;
        else {
          for (let i = 0; i < authConstrPolicies.length; i++) {
            for (let j = 0; j < initialPolicySet.length; j++) {
              if (initialPolicySet[j] === authConstrPolicies[i] || initialPolicySet[j] === id_AnyPolicy) {
                userConstrPolicies.push(authConstrPolicies[i]);
                break;
              }
            }
          }
        }
      }
      const policyResult = {
        result: userConstrPolicies.length > 0,
        resultCode: 0,
        resultMessage: userConstrPolicies.length > 0 ? EMPTY_STRING2 : 'Zero "userConstrPolicies" array, no intersections with "authConstrPolicies"',
        authConstrPolicies,
        userConstrPolicies,
        explicitPolicyIndicator,
        policyMappings,
        certificatePath: this.certs
      };
      if (userConstrPolicies.length === 0)
        return policyResult;
      if (policyResult.result === false)
        return policyResult;
      pathDepth = 1;
      for (let i = this.certs.length - 2; i >= 0; i--, pathDepth++) {
        const cert = this.certs[i];
        let subjectAltNames = [];
        let certPermittedSubtrees = [];
        let certExcludedSubtrees = [];
        if (cert.extensions) {
          for (let j = 0; j < cert.extensions.length; j++) {
            const extension = cert.extensions[j];
            if (extension.extnID === id_NameConstraints) {
              if ("permittedSubtrees" in extension.parsedValue)
                certPermittedSubtrees = certPermittedSubtrees.concat(extension.parsedValue.permittedSubtrees);
              if ("excludedSubtrees" in extension.parsedValue)
                certExcludedSubtrees = certExcludedSubtrees.concat(extension.parsedValue.excludedSubtrees);
            }
            if (extension.extnID === id_SubjectAltName)
              subjectAltNames = subjectAltNames.concat(extension.parsedValue.altNames);
          }
        }
        let formFound = requiredNameForms.length <= 0;
        for (let j = 0; j < requiredNameForms.length; j++) {
          switch (requiredNameForms[j].base.type) {
            case 4:
              {
                if (requiredNameForms[j].base.value.typesAndValues.length !== cert.subject.typesAndValues.length)
                  continue;
                formFound = true;
                for (let k = 0; k < cert.subject.typesAndValues.length; k++) {
                  if (cert.subject.typesAndValues[k].type !== requiredNameForms[j].base.value.typesAndValues[k].type) {
                    formFound = false;
                    break;
                  }
                }
                if (formFound === true)
                  break;
              }
              break;
            default:
          }
        }
        if (formFound === false) {
          policyResult.result = false;
          policyResult.resultCode = 21;
          policyResult.resultMessage = "No necessary name form found";
          throw policyResult;
        }
        const constrGroups = [
          [],
          [],
          [],
          [],
          []
        ];
        for (let j = 0; j < permittedSubtrees.length; j++) {
          switch (permittedSubtrees[j].base.type) {
            case 1:
              constrGroups[0].push(permittedSubtrees[j]);
              break;
            case 2:
              constrGroups[1].push(permittedSubtrees[j]);
              break;
            case 4:
              constrGroups[2].push(permittedSubtrees[j]);
              break;
            case 6:
              constrGroups[3].push(permittedSubtrees[j]);
              break;
            case 7:
              constrGroups[4].push(permittedSubtrees[j]);
              break;
            default:
          }
        }
        for (let p = 0; p < 5; p++) {
          let groupPermitted = false;
          let valueExists = false;
          const group = constrGroups[p];
          for (let j = 0; j < group.length; j++) {
            switch (p) {
              case 0:
                if (subjectAltNames.length > 0) {
                  for (let k = 0; k < subjectAltNames.length; k++) {
                    if (subjectAltNames[k].type === 1) {
                      valueExists = true;
                      groupPermitted = groupPermitted || compareRFC822Name(subjectAltNames[k].value, group[j].base.value);
                    }
                  }
                } else {
                  for (let k = 0; k < cert.subject.typesAndValues.length; k++) {
                    if (cert.subject.typesAndValues[k].type === "1.2.840.113549.1.9.1" || cert.subject.typesAndValues[k].type === "0.9.2342.19200300.100.1.3") {
                      valueExists = true;
                      groupPermitted = groupPermitted || compareRFC822Name(cert.subject.typesAndValues[k].value.valueBlock.value, group[j].base.value);
                    }
                  }
                }
                break;
              case 1:
                if (subjectAltNames.length > 0) {
                  for (let k = 0; k < subjectAltNames.length; k++) {
                    if (subjectAltNames[k].type === 2) {
                      valueExists = true;
                      groupPermitted = groupPermitted || compareDNSName(subjectAltNames[k].value, group[j].base.value);
                    }
                  }
                }
                break;
              case 2:
                valueExists = true;
                groupPermitted = compareDirectoryName(cert.subject, group[j].base.value);
                break;
              case 3:
                if (subjectAltNames.length > 0) {
                  for (let k = 0; k < subjectAltNames.length; k++) {
                    if (subjectAltNames[k].type === 6) {
                      valueExists = true;
                      groupPermitted = groupPermitted || compareUniformResourceIdentifier(subjectAltNames[k].value, group[j].base.value);
                    }
                  }
                }
                break;
              case 4:
                if (subjectAltNames.length > 0) {
                  for (let k = 0; k < subjectAltNames.length; k++) {
                    if (subjectAltNames[k].type === 7) {
                      valueExists = true;
                      groupPermitted = groupPermitted || compareIPAddress(subjectAltNames[k].value, group[j].base.value);
                    }
                  }
                }
                break;
              default:
            }
            if (groupPermitted)
              break;
          }
          if (groupPermitted === false && group.length > 0 && valueExists) {
            policyResult.result = false;
            policyResult.resultCode = 41;
            policyResult.resultMessage = 'Failed to meet "permitted sub-trees" name constraint';
            throw policyResult;
          }
        }
        let excluded = false;
        for (let j = 0; j < excludedSubtrees.length; j++) {
          switch (excludedSubtrees[j].base.type) {
            case 1:
              if (subjectAltNames.length >= 0) {
                for (let k = 0; k < subjectAltNames.length; k++) {
                  if (subjectAltNames[k].type === 1)
                    excluded = excluded || compareRFC822Name(subjectAltNames[k].value, excludedSubtrees[j].base.value);
                }
              } else {
                for (let k = 0; k < cert.subject.typesAndValues.length; k++) {
                  if (cert.subject.typesAndValues[k].type === "1.2.840.113549.1.9.1" || cert.subject.typesAndValues[k].type === "0.9.2342.19200300.100.1.3")
                    excluded = excluded || compareRFC822Name(cert.subject.typesAndValues[k].value.valueBlock.value, excludedSubtrees[j].base.value);
                }
              }
              break;
            case 2:
              if (subjectAltNames.length > 0) {
                for (let k = 0; k < subjectAltNames.length; k++) {
                  if (subjectAltNames[k].type === 2)
                    excluded = excluded || compareDNSName(subjectAltNames[k].value, excludedSubtrees[j].base.value);
                }
              }
              break;
            case 4:
              excluded = excluded || compareDirectoryName(cert.subject, excludedSubtrees[j].base.value);
              break;
            case 6:
              if (subjectAltNames.length > 0) {
                for (let k = 0; k < subjectAltNames.length; k++) {
                  if (subjectAltNames[k].type === 6)
                    excluded = excluded || compareUniformResourceIdentifier(subjectAltNames[k].value, excludedSubtrees[j].base.value);
                }
              }
              break;
            case 7:
              if (subjectAltNames.length > 0) {
                for (let k = 0; k < subjectAltNames.length; k++) {
                  if (subjectAltNames[k].type === 7)
                    excluded = excluded || compareIPAddress(subjectAltNames[k].value, excludedSubtrees[j].base.value);
                }
              }
              break;
            default:
          }
          if (excluded)
            break;
        }
        if (excluded === true) {
          policyResult.result = false;
          policyResult.resultCode = 42;
          policyResult.resultMessage = 'Failed to meet "excluded sub-trees" name constraint';
          throw policyResult;
        }
        permittedSubtrees = permittedSubtrees.concat(certPermittedSubtrees);
        excludedSubtrees = excludedSubtrees.concat(certExcludedSubtrees);
      }
      return policyResult;
    } catch (error) {
      if (error instanceof Error) {
        if (error instanceof ChainValidationError) {
          return {
            result: false,
            resultCode: error.code,
            resultMessage: error.message,
            error
          };
        }
        return {
          result: false,
          resultCode: ChainValidationCode.unknown,
          resultMessage: error.message,
          error
        };
      }
      if (error && typeof error === "object" && "resultMessage" in error) {
        return error;
      }
      return {
        result: false,
        resultCode: -1,
        resultMessage: `${error}`
      };
    }
  }
};
var TBS_RESPONSE_DATA = "tbsResponseData";
var SIGNATURE_ALGORITHM$3 = "signatureAlgorithm";
var SIGNATURE$2 = "signature";
var CERTS$1 = "certs";
var BASIC_OCSP_RESPONSE = "BasicOCSPResponse";
var BASIC_OCSP_RESPONSE_TBS_RESPONSE_DATA = `${BASIC_OCSP_RESPONSE}.${TBS_RESPONSE_DATA}`;
var BASIC_OCSP_RESPONSE_SIGNATURE_ALGORITHM = `${BASIC_OCSP_RESPONSE}.${SIGNATURE_ALGORITHM$3}`;
var BASIC_OCSP_RESPONSE_SIGNATURE = `${BASIC_OCSP_RESPONSE}.${SIGNATURE$2}`;
var BASIC_OCSP_RESPONSE_CERTS = `${BASIC_OCSP_RESPONSE}.${CERTS$1}`;
var CLEAR_PROPS$g = [
  BASIC_OCSP_RESPONSE_TBS_RESPONSE_DATA,
  BASIC_OCSP_RESPONSE_SIGNATURE_ALGORITHM,
  BASIC_OCSP_RESPONSE_SIGNATURE,
  BASIC_OCSP_RESPONSE_CERTS
];
var BasicOCSPResponse = class _BasicOCSPResponse extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.tbsResponseData = getParametersValue(parameters, TBS_RESPONSE_DATA, _BasicOCSPResponse.defaultValues(TBS_RESPONSE_DATA));
    this.signatureAlgorithm = getParametersValue(parameters, SIGNATURE_ALGORITHM$3, _BasicOCSPResponse.defaultValues(SIGNATURE_ALGORITHM$3));
    this.signature = getParametersValue(parameters, SIGNATURE$2, _BasicOCSPResponse.defaultValues(SIGNATURE$2));
    if (CERTS$1 in parameters) {
      this.certs = getParametersValue(parameters, CERTS$1, _BasicOCSPResponse.defaultValues(CERTS$1));
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case TBS_RESPONSE_DATA:
        return new ResponseData();
      case SIGNATURE_ALGORITHM$3:
        return new AlgorithmIdentifier();
      case SIGNATURE$2:
        return new BitString();
      case CERTS$1:
        return [];
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case "type": {
        let comparisonResult = ResponseData.compareWithDefault("tbs", memberValue.tbs) && ResponseData.compareWithDefault("responderID", memberValue.responderID) && ResponseData.compareWithDefault("producedAt", memberValue.producedAt) && ResponseData.compareWithDefault("responses", memberValue.responses);
        if ("responseExtensions" in memberValue)
          comparisonResult = comparisonResult && ResponseData.compareWithDefault("responseExtensions", memberValue.responseExtensions);
        return comparisonResult;
      }
      case SIGNATURE_ALGORITHM$3:
        return memberValue.algorithmId === EMPTY_STRING2 && "algorithmParams" in memberValue === false;
      case SIGNATURE$2:
        return memberValue.isEqual(_BasicOCSPResponse.defaultValues(memberName));
      case CERTS$1:
        return memberValue.length === 0;
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || BASIC_OCSP_RESPONSE,
      value: [
        ResponseData.schema(names.tbsResponseData || {
          names: {
            blockName: BASIC_OCSP_RESPONSE_TBS_RESPONSE_DATA
          }
        }),
        AlgorithmIdentifier.schema(names.signatureAlgorithm || {
          names: {
            blockName: BASIC_OCSP_RESPONSE_SIGNATURE_ALGORITHM
          }
        }),
        new BitString({ name: names.signature || BASIC_OCSP_RESPONSE_SIGNATURE }),
        new Constructed({
          optional: true,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [
            new Sequence({
              value: [new Repeated({
                name: BASIC_OCSP_RESPONSE_CERTS,
                value: Certificate.schema(names.certs || {})
              })]
            })
          ]
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$g);
    const asn1 = compareSchema(schema, schema, _BasicOCSPResponse.schema());
    AsnError.assertSchema(asn1, this.className);
    this.tbsResponseData = new ResponseData({ schema: asn1.result[BASIC_OCSP_RESPONSE_TBS_RESPONSE_DATA] });
    this.signatureAlgorithm = new AlgorithmIdentifier({ schema: asn1.result[BASIC_OCSP_RESPONSE_SIGNATURE_ALGORITHM] });
    this.signature = asn1.result[BASIC_OCSP_RESPONSE_SIGNATURE];
    if (BASIC_OCSP_RESPONSE_CERTS in asn1.result) {
      this.certs = Array.from(asn1.result[BASIC_OCSP_RESPONSE_CERTS], (element) => new Certificate({ schema: element }));
    }
  }
  toSchema() {
    const outputArray = [];
    outputArray.push(this.tbsResponseData.toSchema());
    outputArray.push(this.signatureAlgorithm.toSchema());
    outputArray.push(this.signature);
    if (this.certs) {
      outputArray.push(new Constructed({
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        value: [
          new Sequence({
            value: Array.from(this.certs, (o) => o.toSchema())
          })
        ]
      }));
    }
    return new Sequence({
      value: outputArray
    });
  }
  toJSON() {
    const res = {
      tbsResponseData: this.tbsResponseData.toJSON(),
      signatureAlgorithm: this.signatureAlgorithm.toJSON(),
      signature: this.signature.toJSON()
    };
    if (this.certs) {
      res.certs = Array.from(this.certs, (o) => o.toJSON());
    }
    return res;
  }
  async getCertificateStatus(certificate, issuerCertificate, crypto2 = getCrypto(true)) {
    const result = {
      isForCertificate: false,
      status: 2
    };
    const hashesObject = {};
    const certIDs = [];
    for (const response of this.tbsResponseData.responses) {
      const hashAlgorithm = crypto2.getAlgorithmByOID(response.certID.hashAlgorithm.algorithmId, true, "CertID.hashAlgorithm");
      if (!hashesObject[hashAlgorithm.name]) {
        hashesObject[hashAlgorithm.name] = 1;
        const certID = new CertID();
        certIDs.push(certID);
        await certID.createForCertificate(certificate, {
          hashAlgorithm: hashAlgorithm.name,
          issuerCertificate
        }, crypto2);
      }
    }
    for (const response of this.tbsResponseData.responses) {
      for (const id of certIDs) {
        if (response.certID.isEqual(id)) {
          result.isForCertificate = true;
          try {
            switch (response.certStatus.idBlock.isConstructed) {
              case true:
                if (response.certStatus.idBlock.tagNumber === 1)
                  result.status = 1;
                break;
              case false:
                switch (response.certStatus.idBlock.tagNumber) {
                  case 0:
                    result.status = 0;
                    break;
                  case 2:
                    result.status = 2;
                    break;
                  default:
                }
                break;
              default:
            }
          } catch (ex) {
          }
          return result;
        }
      }
    }
    return result;
  }
  async sign(privateKey, hashAlgorithm = "SHA-1", crypto2 = getCrypto(true)) {
    if (!privateKey) {
      throw new Error("Need to provide a private key for signing");
    }
    const signatureParams = await crypto2.getSignatureParameters(privateKey, hashAlgorithm);
    const algorithm = signatureParams.parameters.algorithm;
    if (!("name" in algorithm)) {
      throw new Error("Empty algorithm");
    }
    this.signatureAlgorithm = signatureParams.signatureAlgorithm;
    this.tbsResponseData.tbsView = new Uint8Array(this.tbsResponseData.toSchema(true).toBER());
    const signature = await crypto2.signWithPrivateKey(this.tbsResponseData.tbsView, privateKey, { algorithm });
    this.signature = new BitString({ valueHex: signature });
  }
  async verify(params = {}, crypto2 = getCrypto(true)) {
    let signerCert = null;
    let certIndex = -1;
    const trustedCerts = params.trustedCerts || [];
    if (!this.certs) {
      throw new Error("No certificates attached to the BasicOCSPResponse");
    }
    switch (true) {
      case this.tbsResponseData.responderID instanceof RelativeDistinguishedNames:
        for (const [index, certificate] of this.certs.entries()) {
          if (certificate.subject.isEqual(this.tbsResponseData.responderID)) {
            certIndex = index;
            break;
          }
        }
        break;
      case this.tbsResponseData.responderID instanceof OctetString:
        for (const [index, cert] of this.certs.entries()) {
          const hash2 = await crypto2.digest({ name: "sha-1" }, cert.subjectPublicKeyInfo.subjectPublicKey.valueBlock.valueHexView);
          if (isEqualBuffer(hash2, this.tbsResponseData.responderID.valueBlock.valueHex)) {
            certIndex = index;
            break;
          }
        }
        break;
      default:
        throw new Error("Wrong value for responderID");
    }
    if (certIndex === -1)
      throw new Error("Correct certificate was not found in OCSP response");
    signerCert = this.certs[certIndex];
    const additionalCerts = [signerCert];
    for (const cert of this.certs) {
      const caCert = await checkCA(cert, signerCert);
      if (caCert) {
        additionalCerts.push(caCert);
      }
    }
    const certChain = new CertificateChainValidationEngine({
      certs: additionalCerts,
      trustedCerts
    });
    const verificationResult = await certChain.verify({}, crypto2);
    if (!verificationResult.result) {
      throw new Error("Validation of signer's certificate failed");
    }
    return crypto2.verifyWithPublicKey(this.tbsResponseData.tbsView, this.signature, this.certs[certIndex].subjectPublicKeyInfo, this.signatureAlgorithm);
  }
};
BasicOCSPResponse.CLASS_NAME = "BasicOCSPResponse";
var TBS$1 = "tbs";
var VERSION$6 = "version";
var SUBJECT = "subject";
var SPKI = "subjectPublicKeyInfo";
var ATTRIBUTES$1 = "attributes";
var SIGNATURE_ALGORITHM$2 = "signatureAlgorithm";
var SIGNATURE_VALUE = "signatureValue";
var CSR_INFO = "CertificationRequestInfo";
var CSR_INFO_VERSION = `${CSR_INFO}.version`;
var CSR_INFO_SUBJECT = `${CSR_INFO}.subject`;
var CSR_INFO_SPKI = `${CSR_INFO}.subjectPublicKeyInfo`;
var CSR_INFO_ATTRS = `${CSR_INFO}.attributes`;
var CLEAR_PROPS$f = [
  CSR_INFO,
  CSR_INFO_VERSION,
  CSR_INFO_SUBJECT,
  CSR_INFO_SPKI,
  CSR_INFO_ATTRS,
  SIGNATURE_ALGORITHM$2,
  SIGNATURE_VALUE
];
function CertificationRequestInfo(parameters = {}) {
  const names = getParametersValue(parameters, "names", {});
  return new Sequence({
    name: names.CertificationRequestInfo || CSR_INFO,
    value: [
      new Integer({ name: names.CertificationRequestInfoVersion || CSR_INFO_VERSION }),
      RelativeDistinguishedNames.schema(names.subject || {
        names: {
          blockName: CSR_INFO_SUBJECT
        }
      }),
      PublicKeyInfo.schema({
        names: {
          blockName: CSR_INFO_SPKI
        }
      }),
      new Constructed({
        optional: true,
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        value: [
          new Repeated({
            optional: true,
            name: names.CertificationRequestInfoAttributes || CSR_INFO_ATTRS,
            value: Attribute.schema(names.attributes || {})
          })
        ]
      })
    ]
  });
}
var CertificationRequest = class _CertificationRequest extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.tbsView = new Uint8Array(getParametersValue(parameters, TBS$1, _CertificationRequest.defaultValues(TBS$1)));
    this.version = getParametersValue(parameters, VERSION$6, _CertificationRequest.defaultValues(VERSION$6));
    this.subject = getParametersValue(parameters, SUBJECT, _CertificationRequest.defaultValues(SUBJECT));
    this.subjectPublicKeyInfo = getParametersValue(parameters, SPKI, _CertificationRequest.defaultValues(SPKI));
    if (ATTRIBUTES$1 in parameters) {
      this.attributes = getParametersValue(parameters, ATTRIBUTES$1, _CertificationRequest.defaultValues(ATTRIBUTES$1));
    }
    this.signatureAlgorithm = getParametersValue(parameters, SIGNATURE_ALGORITHM$2, _CertificationRequest.defaultValues(SIGNATURE_ALGORITHM$2));
    this.signatureValue = getParametersValue(parameters, SIGNATURE_VALUE, _CertificationRequest.defaultValues(SIGNATURE_VALUE));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  get tbs() {
    return pvtsutils2.BufferSourceConverter.toArrayBuffer(this.tbsView);
  }
  set tbs(value) {
    this.tbsView = new Uint8Array(value);
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case TBS$1:
        return EMPTY_BUFFER2;
      case VERSION$6:
        return 0;
      case SUBJECT:
        return new RelativeDistinguishedNames();
      case SPKI:
        return new PublicKeyInfo();
      case ATTRIBUTES$1:
        return [];
      case SIGNATURE_ALGORITHM$2:
        return new AlgorithmIdentifier();
      case SIGNATURE_VALUE:
        return new BitString();
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      value: [
        CertificationRequestInfo(names.certificationRequestInfo || {}),
        new Sequence({
          name: names.signatureAlgorithm || SIGNATURE_ALGORITHM$2,
          value: [
            new ObjectIdentifier(),
            new Any({ optional: true })
          ]
        }),
        new BitString({ name: names.signatureValue || SIGNATURE_VALUE })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$f);
    const asn1 = compareSchema(schema, schema, _CertificationRequest.schema());
    AsnError.assertSchema(asn1, this.className);
    this.tbsView = asn1.result.CertificationRequestInfo.valueBeforeDecodeView;
    this.version = asn1.result[CSR_INFO_VERSION].valueBlock.valueDec;
    this.subject = new RelativeDistinguishedNames({ schema: asn1.result[CSR_INFO_SUBJECT] });
    this.subjectPublicKeyInfo = new PublicKeyInfo({ schema: asn1.result[CSR_INFO_SPKI] });
    if (CSR_INFO_ATTRS in asn1.result) {
      this.attributes = Array.from(asn1.result[CSR_INFO_ATTRS], (element) => new Attribute({ schema: element }));
    }
    this.signatureAlgorithm = new AlgorithmIdentifier({ schema: asn1.result.signatureAlgorithm });
    this.signatureValue = asn1.result.signatureValue;
  }
  encodeTBS() {
    const outputArray = [
      new Integer({ value: this.version }),
      this.subject.toSchema(),
      this.subjectPublicKeyInfo.toSchema()
    ];
    if (ATTRIBUTES$1 in this) {
      outputArray.push(new Constructed({
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        value: Array.from(this.attributes || [], (o) => o.toSchema())
      }));
    }
    return new Sequence({
      value: outputArray
    });
  }
  toSchema(encodeFlag = false) {
    let tbsSchema;
    if (encodeFlag === false) {
      if (this.tbsView.byteLength === 0) {
        return _CertificationRequest.schema();
      }
      const asn1 = fromBER(this.tbsView);
      AsnError.assert(asn1, "PKCS#10 Certificate Request");
      tbsSchema = asn1.result;
    } else {
      tbsSchema = this.encodeTBS();
    }
    return new Sequence({
      value: [
        tbsSchema,
        this.signatureAlgorithm.toSchema(),
        this.signatureValue
      ]
    });
  }
  toJSON() {
    const object = {
      tbs: pvtsutils2.Convert.ToHex(this.tbsView),
      version: this.version,
      subject: this.subject.toJSON(),
      subjectPublicKeyInfo: this.subjectPublicKeyInfo.toJSON(),
      signatureAlgorithm: this.signatureAlgorithm.toJSON(),
      signatureValue: this.signatureValue.toJSON()
    };
    if (ATTRIBUTES$1 in this) {
      object.attributes = Array.from(this.attributes || [], (o) => o.toJSON());
    }
    return object;
  }
  async sign(privateKey, hashAlgorithm = "SHA-1", crypto2 = getCrypto(true)) {
    if (!privateKey) {
      throw new Error("Need to provide a private key for signing");
    }
    const signatureParams = await crypto2.getSignatureParameters(privateKey, hashAlgorithm);
    const parameters = signatureParams.parameters;
    this.signatureAlgorithm = signatureParams.signatureAlgorithm;
    this.tbsView = new Uint8Array(this.encodeTBS().toBER());
    const signature = await crypto2.signWithPrivateKey(this.tbsView, privateKey, parameters);
    this.signatureValue = new BitString({ valueHex: signature });
  }
  async verify(crypto2 = getCrypto(true)) {
    return crypto2.verifyWithPublicKey(this.tbsView, this.signatureValue, this.subjectPublicKeyInfo, this.signatureAlgorithm);
  }
  async getPublicKey(parameters, crypto2 = getCrypto(true)) {
    return crypto2.getPublicKey(this.subjectPublicKeyInfo, this.signatureAlgorithm, parameters);
  }
};
CertificationRequest.CLASS_NAME = "CertificationRequest";
var DIGEST_ALGORITHM$1 = "digestAlgorithm";
var DIGEST = "digest";
var CLEAR_PROPS$e = [
  DIGEST_ALGORITHM$1,
  DIGEST
];
var DigestInfo = class _DigestInfo extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.digestAlgorithm = getParametersValue(parameters, DIGEST_ALGORITHM$1, _DigestInfo.defaultValues(DIGEST_ALGORITHM$1));
    this.digest = getParametersValue(parameters, DIGEST, _DigestInfo.defaultValues(DIGEST));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case DIGEST_ALGORITHM$1:
        return new AlgorithmIdentifier();
      case DIGEST:
        return new OctetString();
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case DIGEST_ALGORITHM$1:
        return AlgorithmIdentifier.compareWithDefault("algorithmId", memberValue.algorithmId) && "algorithmParams" in memberValue === false;
      case DIGEST:
        return memberValue.isEqual(_DigestInfo.defaultValues(memberName));
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        AlgorithmIdentifier.schema(names.digestAlgorithm || {
          names: {
            blockName: DIGEST_ALGORITHM$1
          }
        }),
        new OctetString({ name: names.digest || DIGEST })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$e);
    const asn1 = compareSchema(schema, schema, _DigestInfo.schema({
      names: {
        digestAlgorithm: {
          names: {
            blockName: DIGEST_ALGORITHM$1
          }
        },
        digest: DIGEST
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.digestAlgorithm = new AlgorithmIdentifier({ schema: asn1.result.digestAlgorithm });
    this.digest = asn1.result.digest;
  }
  toSchema() {
    return new Sequence({
      value: [
        this.digestAlgorithm.toSchema(),
        this.digest
      ]
    });
  }
  toJSON() {
    return {
      digestAlgorithm: this.digestAlgorithm.toJSON(),
      digest: this.digest.toJSON()
    };
  }
};
DigestInfo.CLASS_NAME = "DigestInfo";
var E_CONTENT_TYPE = "eContentType";
var E_CONTENT = "eContent";
var CLEAR_PROPS$d = [
  E_CONTENT_TYPE,
  E_CONTENT
];
var EncapsulatedContentInfo = class _EncapsulatedContentInfo extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.eContentType = getParametersValue(parameters, E_CONTENT_TYPE, _EncapsulatedContentInfo.defaultValues(E_CONTENT_TYPE));
    if (E_CONTENT in parameters) {
      this.eContent = getParametersValue(parameters, E_CONTENT, _EncapsulatedContentInfo.defaultValues(E_CONTENT));
      if (this.eContent.idBlock.tagClass === 1 && this.eContent.idBlock.tagNumber === 4) {
        if (this.eContent.idBlock.isConstructed === false) {
          const constrString = new OctetString({
            idBlock: { isConstructed: true },
            isConstructed: true
          });
          let offset = 0;
          const viewHex = this.eContent.valueBlock.valueHexView.slice().buffer;
          let length = viewHex.byteLength;
          while (length > 0) {
            const pieceView = new Uint8Array(viewHex, offset, offset + 65536 > viewHex.byteLength ? viewHex.byteLength - offset : 65536);
            const _array = new ArrayBuffer(pieceView.length);
            const _view = new Uint8Array(_array);
            for (let i = 0; i < _view.length; i++) {
              _view[i] = pieceView[i];
            }
            constrString.valueBlock.value.push(new OctetString({ valueHex: _array }));
            length -= pieceView.length;
            offset += pieceView.length;
          }
          this.eContent = constrString;
        }
      }
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case E_CONTENT_TYPE:
        return EMPTY_STRING2;
      case E_CONTENT:
        return new OctetString();
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case E_CONTENT_TYPE:
        return memberValue === EMPTY_STRING2;
      case E_CONTENT: {
        if (memberValue.idBlock.tagClass === 1 && memberValue.idBlock.tagNumber === 4)
          return memberValue.isEqual(_EncapsulatedContentInfo.defaultValues(E_CONTENT));
        return false;
      }
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new ObjectIdentifier({ name: names.eContentType || EMPTY_STRING2 }),
        new Constructed({
          optional: true,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [
            new Any({ name: names.eContent || EMPTY_STRING2 })
          ]
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$d);
    const asn1 = compareSchema(schema, schema, _EncapsulatedContentInfo.schema({
      names: {
        eContentType: E_CONTENT_TYPE,
        eContent: E_CONTENT
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.eContentType = asn1.result.eContentType.valueBlock.toString();
    if (E_CONTENT in asn1.result)
      this.eContent = asn1.result.eContent;
  }
  toSchema() {
    const outputArray = [];
    outputArray.push(new ObjectIdentifier({ value: this.eContentType }));
    if (this.eContent) {
      if (_EncapsulatedContentInfo.compareWithDefault(E_CONTENT, this.eContent) === false) {
        outputArray.push(new Constructed({
          optional: true,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [this.eContent]
        }));
      }
    }
    return new Sequence({
      value: outputArray
    });
  }
  toJSON() {
    const res = {
      eContentType: this.eContentType
    };
    if (this.eContent && _EncapsulatedContentInfo.compareWithDefault(E_CONTENT, this.eContent) === false) {
      res.eContent = this.eContent.toJSON();
    }
    return res;
  }
};
EncapsulatedContentInfo.CLASS_NAME = "EncapsulatedContentInfo";
var KeyBag = class extends PrivateKeyInfo {
  constructor(parameters = {}) {
    super(parameters);
  }
};
var MAC = "mac";
var MAC_SALT = "macSalt";
var ITERATIONS = "iterations";
var CLEAR_PROPS$c = [
  MAC,
  MAC_SALT,
  ITERATIONS
];
var MacData = class _MacData extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.mac = getParametersValue(parameters, MAC, _MacData.defaultValues(MAC));
    this.macSalt = getParametersValue(parameters, MAC_SALT, _MacData.defaultValues(MAC_SALT));
    if (ITERATIONS in parameters) {
      this.iterations = getParametersValue(parameters, ITERATIONS, _MacData.defaultValues(ITERATIONS));
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case MAC:
        return new DigestInfo();
      case MAC_SALT:
        return new OctetString();
      case ITERATIONS:
        return 1;
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case MAC:
        return DigestInfo.compareWithDefault("digestAlgorithm", memberValue.digestAlgorithm) && DigestInfo.compareWithDefault("digest", memberValue.digest);
      case MAC_SALT:
        return memberValue.isEqual(_MacData.defaultValues(memberName));
      case ITERATIONS:
        return memberValue === _MacData.defaultValues(memberName);
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      optional: names.optional || true,
      value: [
        DigestInfo.schema(names.mac || {
          names: {
            blockName: MAC
          }
        }),
        new OctetString({ name: names.macSalt || MAC_SALT }),
        new Integer({
          optional: true,
          name: names.iterations || ITERATIONS
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$c);
    const asn1 = compareSchema(schema, schema, _MacData.schema({
      names: {
        mac: {
          names: {
            blockName: MAC
          }
        },
        macSalt: MAC_SALT,
        iterations: ITERATIONS
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.mac = new DigestInfo({ schema: asn1.result.mac });
    this.macSalt = asn1.result.macSalt;
    if (ITERATIONS in asn1.result)
      this.iterations = asn1.result.iterations.valueBlock.valueDec;
  }
  toSchema() {
    const outputArray = [
      this.mac.toSchema(),
      this.macSalt
    ];
    if (this.iterations !== void 0) {
      outputArray.push(new Integer({ value: this.iterations }));
    }
    return new Sequence({
      value: outputArray
    });
  }
  toJSON() {
    const res = {
      mac: this.mac.toJSON(),
      macSalt: this.macSalt.toJSON()
    };
    if (this.iterations !== void 0) {
      res.iterations = this.iterations;
    }
    return res;
  }
};
MacData.CLASS_NAME = "MacData";
var HASH_ALGORITHM = "hashAlgorithm";
var HASHED_MESSAGE = "hashedMessage";
var CLEAR_PROPS$b = [
  HASH_ALGORITHM,
  HASHED_MESSAGE
];
var MessageImprint = class _MessageImprint extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.hashAlgorithm = getParametersValue(parameters, HASH_ALGORITHM, _MessageImprint.defaultValues(HASH_ALGORITHM));
    this.hashedMessage = getParametersValue(parameters, HASHED_MESSAGE, _MessageImprint.defaultValues(HASHED_MESSAGE));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static async create(hashAlgorithm, message3, crypto2 = getCrypto(true)) {
    const hashAlgorithmOID = crypto2.getOIDByAlgorithm({ name: hashAlgorithm }, true, "hashAlgorithm");
    const hashedMessage = await crypto2.digest(hashAlgorithm, message3);
    const res = new _MessageImprint({
      hashAlgorithm: new AlgorithmIdentifier({
        algorithmId: hashAlgorithmOID,
        algorithmParams: new Null()
      }),
      hashedMessage: new OctetString({ valueHex: hashedMessage })
    });
    return res;
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case HASH_ALGORITHM:
        return new AlgorithmIdentifier();
      case HASHED_MESSAGE:
        return new OctetString();
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case HASH_ALGORITHM:
        return memberValue.algorithmId === EMPTY_STRING2 && "algorithmParams" in memberValue === false;
      case HASHED_MESSAGE:
        return memberValue.isEqual(_MessageImprint.defaultValues(memberName)) === 0;
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        AlgorithmIdentifier.schema(names.hashAlgorithm || {}),
        new OctetString({ name: names.hashedMessage || EMPTY_STRING2 })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$b);
    const asn1 = compareSchema(schema, schema, _MessageImprint.schema({
      names: {
        hashAlgorithm: {
          names: {
            blockName: HASH_ALGORITHM
          }
        },
        hashedMessage: HASHED_MESSAGE
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.hashAlgorithm = new AlgorithmIdentifier({ schema: asn1.result.hashAlgorithm });
    this.hashedMessage = asn1.result.hashedMessage;
  }
  toSchema() {
    return new Sequence({
      value: [
        this.hashAlgorithm.toSchema(),
        this.hashedMessage
      ]
    });
  }
  toJSON() {
    return {
      hashAlgorithm: this.hashAlgorithm.toJSON(),
      hashedMessage: this.hashedMessage.toJSON()
    };
  }
};
MessageImprint.CLASS_NAME = "MessageImprint";
var REQ_CERT = "reqCert";
var SINGLE_REQUEST_EXTENSIONS = "singleRequestExtensions";
var CLEAR_PROPS$a = [
  REQ_CERT,
  SINGLE_REQUEST_EXTENSIONS
];
var Request = class _Request extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.reqCert = getParametersValue(parameters, REQ_CERT, _Request.defaultValues(REQ_CERT));
    if (SINGLE_REQUEST_EXTENSIONS in parameters) {
      this.singleRequestExtensions = getParametersValue(parameters, SINGLE_REQUEST_EXTENSIONS, _Request.defaultValues(SINGLE_REQUEST_EXTENSIONS));
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case REQ_CERT:
        return new CertID();
      case SINGLE_REQUEST_EXTENSIONS:
        return [];
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case REQ_CERT:
        return memberValue.isEqual(_Request.defaultValues(memberName));
      case SINGLE_REQUEST_EXTENSIONS:
        return memberValue.length === 0;
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        CertID.schema(names.reqCert || {}),
        new Constructed({
          optional: true,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [Extension.schema(names.extensions || {
            names: {
              blockName: names.singleRequestExtensions || EMPTY_STRING2
            }
          })]
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$a);
    const asn1 = compareSchema(schema, schema, _Request.schema({
      names: {
        reqCert: {
          names: {
            blockName: REQ_CERT
          }
        },
        extensions: {
          names: {
            blockName: SINGLE_REQUEST_EXTENSIONS
          }
        }
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.reqCert = new CertID({ schema: asn1.result.reqCert });
    if (SINGLE_REQUEST_EXTENSIONS in asn1.result) {
      this.singleRequestExtensions = Array.from(asn1.result.singleRequestExtensions.valueBlock.value, (element) => new Extension({ schema: element }));
    }
  }
  toSchema() {
    const outputArray = [];
    outputArray.push(this.reqCert.toSchema());
    if (this.singleRequestExtensions) {
      outputArray.push(new Constructed({
        optional: true,
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        value: [
          new Sequence({
            value: Array.from(this.singleRequestExtensions, (o) => o.toSchema())
          })
        ]
      }));
    }
    return new Sequence({
      value: outputArray
    });
  }
  toJSON() {
    const res = {
      reqCert: this.reqCert.toJSON()
    };
    if (this.singleRequestExtensions) {
      res.singleRequestExtensions = Array.from(this.singleRequestExtensions, (o) => o.toJSON());
    }
    return res;
  }
};
Request.CLASS_NAME = "Request";
var TBS = "tbs";
var VERSION$5 = "version";
var REQUESTOR_NAME = "requestorName";
var REQUEST_LIST = "requestList";
var REQUEST_EXTENSIONS = "requestExtensions";
var TBS_REQUEST$1 = "TBSRequest";
var TBS_REQUEST_VERSION = `${TBS_REQUEST$1}.${VERSION$5}`;
var TBS_REQUEST_REQUESTOR_NAME = `${TBS_REQUEST$1}.${REQUESTOR_NAME}`;
var TBS_REQUEST_REQUESTS = `${TBS_REQUEST$1}.requests`;
var TBS_REQUEST_REQUEST_EXTENSIONS = `${TBS_REQUEST$1}.${REQUEST_EXTENSIONS}`;
var CLEAR_PROPS$9 = [
  TBS_REQUEST$1,
  TBS_REQUEST_VERSION,
  TBS_REQUEST_REQUESTOR_NAME,
  TBS_REQUEST_REQUESTS,
  TBS_REQUEST_REQUEST_EXTENSIONS
];
var TBSRequest = class _TBSRequest extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.tbsView = new Uint8Array(getParametersValue(parameters, TBS, _TBSRequest.defaultValues(TBS)));
    if (VERSION$5 in parameters) {
      this.version = getParametersValue(parameters, VERSION$5, _TBSRequest.defaultValues(VERSION$5));
    }
    if (REQUESTOR_NAME in parameters) {
      this.requestorName = getParametersValue(parameters, REQUESTOR_NAME, _TBSRequest.defaultValues(REQUESTOR_NAME));
    }
    this.requestList = getParametersValue(parameters, REQUEST_LIST, _TBSRequest.defaultValues(REQUEST_LIST));
    if (REQUEST_EXTENSIONS in parameters) {
      this.requestExtensions = getParametersValue(parameters, REQUEST_EXTENSIONS, _TBSRequest.defaultValues(REQUEST_EXTENSIONS));
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  get tbs() {
    return pvtsutils2.BufferSourceConverter.toArrayBuffer(this.tbsView);
  }
  set tbs(value) {
    this.tbsView = new Uint8Array(value);
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case TBS:
        return EMPTY_BUFFER2;
      case VERSION$5:
        return 0;
      case REQUESTOR_NAME:
        return new GeneralName();
      case REQUEST_LIST:
      case REQUEST_EXTENSIONS:
        return [];
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case TBS:
        return memberValue.byteLength === 0;
      case VERSION$5:
        return memberValue === _TBSRequest.defaultValues(memberName);
      case REQUESTOR_NAME:
        return memberValue.type === GeneralName.defaultValues("type") && Object.keys(memberValue.value).length === 0;
      case REQUEST_LIST:
      case REQUEST_EXTENSIONS:
        return memberValue.length === 0;
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || TBS_REQUEST$1,
      value: [
        new Constructed({
          optional: true,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [new Integer({ name: names.TBSRequestVersion || TBS_REQUEST_VERSION })]
        }),
        new Constructed({
          optional: true,
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          },
          value: [GeneralName.schema(names.requestorName || {
            names: {
              blockName: TBS_REQUEST_REQUESTOR_NAME
            }
          })]
        }),
        new Sequence({
          name: names.requestList || "TBSRequest.requestList",
          value: [
            new Repeated({
              name: names.requests || TBS_REQUEST_REQUESTS,
              value: Request.schema(names.requestNames || {})
            })
          ]
        }),
        new Constructed({
          optional: true,
          idBlock: {
            tagClass: 3,
            tagNumber: 2
          },
          value: [Extensions.schema(names.extensions || {
            names: {
              blockName: names.requestExtensions || TBS_REQUEST_REQUEST_EXTENSIONS
            }
          })]
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$9);
    const asn1 = compareSchema(schema, schema, _TBSRequest.schema());
    AsnError.assertSchema(asn1, this.className);
    this.tbsView = asn1.result.TBSRequest.valueBeforeDecodeView;
    if (TBS_REQUEST_VERSION in asn1.result)
      this.version = asn1.result[TBS_REQUEST_VERSION].valueBlock.valueDec;
    if (TBS_REQUEST_REQUESTOR_NAME in asn1.result)
      this.requestorName = new GeneralName({ schema: asn1.result[TBS_REQUEST_REQUESTOR_NAME] });
    this.requestList = Array.from(asn1.result[TBS_REQUEST_REQUESTS], (element) => new Request({ schema: element }));
    if (TBS_REQUEST_REQUEST_EXTENSIONS in asn1.result)
      this.requestExtensions = Array.from(asn1.result[TBS_REQUEST_REQUEST_EXTENSIONS].valueBlock.value, (element) => new Extension({ schema: element }));
  }
  toSchema(encodeFlag = false) {
    let tbsSchema;
    if (encodeFlag === false) {
      if (this.tbsView.byteLength === 0)
        return _TBSRequest.schema();
      const asn1 = fromBER(this.tbsView);
      AsnError.assert(asn1, "TBS Request");
      if (!(asn1.result instanceof Sequence)) {
        throw new Error("ASN.1 result should be SEQUENCE");
      }
      tbsSchema = asn1.result;
    } else {
      const outputArray = [];
      if (this.version !== void 0) {
        outputArray.push(new Constructed({
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [new Integer({ value: this.version })]
        }));
      }
      if (this.requestorName) {
        outputArray.push(new Constructed({
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          },
          value: [this.requestorName.toSchema()]
        }));
      }
      outputArray.push(new Sequence({
        value: Array.from(this.requestList, (o) => o.toSchema())
      }));
      if (this.requestExtensions) {
        outputArray.push(new Constructed({
          idBlock: {
            tagClass: 3,
            tagNumber: 2
          },
          value: [
            new Sequence({
              value: Array.from(this.requestExtensions, (o) => o.toSchema())
            })
          ]
        }));
      }
      tbsSchema = new Sequence({
        value: outputArray
      });
    }
    return tbsSchema;
  }
  toJSON() {
    const res = {};
    if (this.version != void 0)
      res.version = this.version;
    if (this.requestorName) {
      res.requestorName = this.requestorName.toJSON();
    }
    res.requestList = Array.from(this.requestList, (o) => o.toJSON());
    if (this.requestExtensions) {
      res.requestExtensions = Array.from(this.requestExtensions, (o) => o.toJSON());
    }
    return res;
  }
};
TBSRequest.CLASS_NAME = "TBSRequest";
var SIGNATURE_ALGORITHM$1 = "signatureAlgorithm";
var SIGNATURE$1 = "signature";
var CERTS = "certs";
var Signature = class _Signature extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.signatureAlgorithm = getParametersValue(parameters, SIGNATURE_ALGORITHM$1, _Signature.defaultValues(SIGNATURE_ALGORITHM$1));
    this.signature = getParametersValue(parameters, SIGNATURE$1, _Signature.defaultValues(SIGNATURE$1));
    if (CERTS in parameters) {
      this.certs = getParametersValue(parameters, CERTS, _Signature.defaultValues(CERTS));
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case SIGNATURE_ALGORITHM$1:
        return new AlgorithmIdentifier();
      case SIGNATURE$1:
        return new BitString();
      case CERTS:
        return [];
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case SIGNATURE_ALGORITHM$1:
        return memberValue.algorithmId === EMPTY_STRING2 && "algorithmParams" in memberValue === false;
      case SIGNATURE$1:
        return memberValue.isEqual(_Signature.defaultValues(memberName));
      case CERTS:
        return memberValue.length === 0;
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        AlgorithmIdentifier.schema(names.signatureAlgorithm || {}),
        new BitString({ name: names.signature || EMPTY_STRING2 }),
        new Constructed({
          optional: true,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [
            new Sequence({
              value: [new Repeated({
                name: names.certs || EMPTY_STRING2,
                value: Certificate.schema({})
              })]
            })
          ]
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, [
      SIGNATURE_ALGORITHM$1,
      SIGNATURE$1,
      CERTS
    ]);
    const asn1 = compareSchema(schema, schema, _Signature.schema({
      names: {
        signatureAlgorithm: {
          names: {
            blockName: SIGNATURE_ALGORITHM$1
          }
        },
        signature: SIGNATURE$1,
        certs: CERTS
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.signatureAlgorithm = new AlgorithmIdentifier({ schema: asn1.result.signatureAlgorithm });
    this.signature = asn1.result.signature;
    if (CERTS in asn1.result)
      this.certs = Array.from(asn1.result.certs, (element) => new Certificate({ schema: element }));
  }
  toSchema() {
    const outputArray = [];
    outputArray.push(this.signatureAlgorithm.toSchema());
    outputArray.push(this.signature);
    if (this.certs) {
      outputArray.push(new Constructed({
        optional: true,
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        value: [
          new Sequence({
            value: Array.from(this.certs, (o) => o.toSchema())
          })
        ]
      }));
    }
    return new Sequence({
      value: outputArray
    });
  }
  toJSON() {
    const res = {
      signatureAlgorithm: this.signatureAlgorithm.toJSON(),
      signature: this.signature.toJSON()
    };
    if (this.certs) {
      res.certs = Array.from(this.certs, (o) => o.toJSON());
    }
    return res;
  }
};
Signature.CLASS_NAME = "Signature";
var TBS_REQUEST = "tbsRequest";
var OPTIONAL_SIGNATURE = "optionalSignature";
var CLEAR_PROPS$8 = [
  TBS_REQUEST,
  OPTIONAL_SIGNATURE
];
var OCSPRequest = class _OCSPRequest extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.tbsRequest = getParametersValue(parameters, TBS_REQUEST, _OCSPRequest.defaultValues(TBS_REQUEST));
    if (OPTIONAL_SIGNATURE in parameters) {
      this.optionalSignature = getParametersValue(parameters, OPTIONAL_SIGNATURE, _OCSPRequest.defaultValues(OPTIONAL_SIGNATURE));
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case TBS_REQUEST:
        return new TBSRequest();
      case OPTIONAL_SIGNATURE:
        return new Signature();
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case TBS_REQUEST:
        return TBSRequest.compareWithDefault("tbs", memberValue.tbs) && TBSRequest.compareWithDefault("version", memberValue.version) && TBSRequest.compareWithDefault("requestorName", memberValue.requestorName) && TBSRequest.compareWithDefault("requestList", memberValue.requestList) && TBSRequest.compareWithDefault("requestExtensions", memberValue.requestExtensions);
      case OPTIONAL_SIGNATURE:
        return Signature.compareWithDefault("signatureAlgorithm", memberValue.signatureAlgorithm) && Signature.compareWithDefault("signature", memberValue.signature) && Signature.compareWithDefault("certs", memberValue.certs);
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || "OCSPRequest",
      value: [
        TBSRequest.schema(names.tbsRequest || {
          names: {
            blockName: TBS_REQUEST
          }
        }),
        new Constructed({
          optional: true,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [
            Signature.schema(names.optionalSignature || {
              names: {
                blockName: OPTIONAL_SIGNATURE
              }
            })
          ]
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$8);
    const asn1 = compareSchema(schema, schema, _OCSPRequest.schema());
    AsnError.assertSchema(asn1, this.className);
    this.tbsRequest = new TBSRequest({ schema: asn1.result.tbsRequest });
    if (OPTIONAL_SIGNATURE in asn1.result)
      this.optionalSignature = new Signature({ schema: asn1.result.optionalSignature });
  }
  toSchema(encodeFlag = false) {
    const outputArray = [];
    outputArray.push(this.tbsRequest.toSchema(encodeFlag));
    if (this.optionalSignature)
      outputArray.push(new Constructed({
        optional: true,
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        value: [
          this.optionalSignature.toSchema()
        ]
      }));
    return new Sequence({
      value: outputArray
    });
  }
  toJSON() {
    const res = {
      tbsRequest: this.tbsRequest.toJSON()
    };
    if (this.optionalSignature) {
      res.optionalSignature = this.optionalSignature.toJSON();
    }
    return res;
  }
  async createForCertificate(certificate, parameters, crypto2 = getCrypto(true)) {
    const certID = new CertID();
    await certID.createForCertificate(certificate, parameters, crypto2);
    this.tbsRequest.requestList.push(new Request({
      reqCert: certID
    }));
  }
  async sign(privateKey, hashAlgorithm = "SHA-1", crypto2 = getCrypto(true)) {
    ParameterError.assertEmpty(privateKey, "privateKey", "OCSPRequest.sign method");
    if (!this.optionalSignature) {
      throw new Error('Need to create "optionalSignature" field before signing');
    }
    const signatureParams = await crypto2.getSignatureParameters(privateKey, hashAlgorithm);
    const parameters = signatureParams.parameters;
    this.optionalSignature.signatureAlgorithm = signatureParams.signatureAlgorithm;
    const tbs = this.tbsRequest.toSchema(true).toBER(false);
    const signature = await crypto2.signWithPrivateKey(tbs, privateKey, parameters);
    this.optionalSignature.signature = new BitString({ valueHex: signature });
  }
  verify() {
  }
};
OCSPRequest.CLASS_NAME = "OCSPRequest";
var RESPONSE_TYPE = "responseType";
var RESPONSE = "response";
var CLEAR_PROPS$7 = [
  RESPONSE_TYPE,
  RESPONSE
];
var ResponseBytes = class _ResponseBytes extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.responseType = getParametersValue(parameters, RESPONSE_TYPE, _ResponseBytes.defaultValues(RESPONSE_TYPE));
    this.response = getParametersValue(parameters, RESPONSE, _ResponseBytes.defaultValues(RESPONSE));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case RESPONSE_TYPE:
        return EMPTY_STRING2;
      case RESPONSE:
        return new OctetString();
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case RESPONSE_TYPE:
        return memberValue === EMPTY_STRING2;
      case RESPONSE:
        return memberValue.isEqual(_ResponseBytes.defaultValues(memberName));
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new ObjectIdentifier({ name: names.responseType || EMPTY_STRING2 }),
        new OctetString({ name: names.response || EMPTY_STRING2 })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$7);
    const asn1 = compareSchema(schema, schema, _ResponseBytes.schema({
      names: {
        responseType: RESPONSE_TYPE,
        response: RESPONSE
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.responseType = asn1.result.responseType.valueBlock.toString();
    this.response = asn1.result.response;
  }
  toSchema() {
    return new Sequence({
      value: [
        new ObjectIdentifier({ value: this.responseType }),
        this.response
      ]
    });
  }
  toJSON() {
    return {
      responseType: this.responseType,
      response: this.response.toJSON()
    };
  }
};
ResponseBytes.CLASS_NAME = "ResponseBytes";
var RESPONSE_STATUS = "responseStatus";
var RESPONSE_BYTES = "responseBytes";
var OCSPResponse = class _OCSPResponse extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.responseStatus = getParametersValue(parameters, RESPONSE_STATUS, _OCSPResponse.defaultValues(RESPONSE_STATUS));
    if (RESPONSE_BYTES in parameters) {
      this.responseBytes = getParametersValue(parameters, RESPONSE_BYTES, _OCSPResponse.defaultValues(RESPONSE_BYTES));
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case RESPONSE_STATUS:
        return new Enumerated();
      case RESPONSE_BYTES:
        return new ResponseBytes();
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case RESPONSE_STATUS:
        return memberValue.isEqual(_OCSPResponse.defaultValues(memberName));
      case RESPONSE_BYTES:
        return ResponseBytes.compareWithDefault("responseType", memberValue.responseType) && ResponseBytes.compareWithDefault("response", memberValue.response);
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || "OCSPResponse",
      value: [
        new Enumerated({ name: names.responseStatus || RESPONSE_STATUS }),
        new Constructed({
          optional: true,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [
            ResponseBytes.schema(names.responseBytes || {
              names: {
                blockName: RESPONSE_BYTES
              }
            })
          ]
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, [
      RESPONSE_STATUS,
      RESPONSE_BYTES
    ]);
    const asn1 = compareSchema(schema, schema, _OCSPResponse.schema());
    AsnError.assertSchema(asn1, this.className);
    this.responseStatus = asn1.result.responseStatus;
    if (RESPONSE_BYTES in asn1.result)
      this.responseBytes = new ResponseBytes({ schema: asn1.result.responseBytes });
  }
  toSchema() {
    const outputArray = [];
    outputArray.push(this.responseStatus);
    if (this.responseBytes) {
      outputArray.push(new Constructed({
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        value: [this.responseBytes.toSchema()]
      }));
    }
    return new Sequence({
      value: outputArray
    });
  }
  toJSON() {
    const res = {
      responseStatus: this.responseStatus.toJSON()
    };
    if (this.responseBytes) {
      res.responseBytes = this.responseBytes.toJSON();
    }
    return res;
  }
  async getCertificateStatus(certificate, issuerCertificate, crypto2 = getCrypto(true)) {
    let basicResponse;
    const result = {
      isForCertificate: false,
      status: 2
    };
    if (!this.responseBytes)
      return result;
    if (this.responseBytes.responseType !== id_PKIX_OCSP_Basic)
      return result;
    try {
      const asn1Basic = fromBER(this.responseBytes.response.valueBlock.valueHexView);
      AsnError.assert(asn1Basic, "Basic OCSP response");
      basicResponse = new BasicOCSPResponse({ schema: asn1Basic.result });
    } catch (ex) {
      return result;
    }
    return basicResponse.getCertificateStatus(certificate, issuerCertificate, crypto2);
  }
  async sign(privateKey, hashAlgorithm, crypto2 = getCrypto(true)) {
    var _a3;
    if (this.responseBytes && this.responseBytes.responseType === id_PKIX_OCSP_Basic) {
      const basicResponse = BasicOCSPResponse.fromBER(this.responseBytes.response.valueBlock.valueHexView);
      return basicResponse.sign(privateKey, hashAlgorithm, crypto2);
    }
    throw new Error(`Unknown ResponseBytes type: ${((_a3 = this.responseBytes) === null || _a3 === void 0 ? void 0 : _a3.responseType) || "Unknown"}`);
  }
  async verify(issuerCertificate = null, crypto2 = getCrypto(true)) {
    var _a3;
    if (RESPONSE_BYTES in this === false)
      throw new Error("Empty ResponseBytes field");
    if (this.responseBytes && this.responseBytes.responseType === id_PKIX_OCSP_Basic) {
      const basicResponse = BasicOCSPResponse.fromBER(this.responseBytes.response.valueBlock.valueHexView);
      if (issuerCertificate !== null) {
        if (!basicResponse.certs) {
          basicResponse.certs = [];
        }
        basicResponse.certs.push(issuerCertificate);
      }
      return basicResponse.verify({}, crypto2);
    }
    throw new Error(`Unknown ResponseBytes type: ${((_a3 = this.responseBytes) === null || _a3 === void 0 ? void 0 : _a3.responseType) || "Unknown"}`);
  }
};
OCSPResponse.CLASS_NAME = "OCSPResponse";
var TYPE = "type";
var ATTRIBUTES = "attributes";
var ENCODED_VALUE = "encodedValue";
var CLEAR_PROPS$6 = [
  ATTRIBUTES
];
var SignedAndUnsignedAttributes = class _SignedAndUnsignedAttributes extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.type = getParametersValue(parameters, TYPE, _SignedAndUnsignedAttributes.defaultValues(TYPE));
    this.attributes = getParametersValue(parameters, ATTRIBUTES, _SignedAndUnsignedAttributes.defaultValues(ATTRIBUTES));
    this.encodedValue = getParametersValue(parameters, ENCODED_VALUE, _SignedAndUnsignedAttributes.defaultValues(ENCODED_VALUE));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case TYPE:
        return -1;
      case ATTRIBUTES:
        return [];
      case ENCODED_VALUE:
        return EMPTY_BUFFER2;
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case TYPE:
        return memberValue === _SignedAndUnsignedAttributes.defaultValues(TYPE);
      case ATTRIBUTES:
        return memberValue.length === 0;
      case ENCODED_VALUE:
        return memberValue.byteLength === 0;
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Constructed({
      name: names.blockName || EMPTY_STRING2,
      optional: true,
      idBlock: {
        tagClass: 3,
        tagNumber: names.tagNumber || 0
      },
      value: [
        new Repeated({
          name: names.attributes || EMPTY_STRING2,
          value: Attribute.schema()
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$6);
    const asn1 = compareSchema(schema, schema, _SignedAndUnsignedAttributes.schema({
      names: {
        tagNumber: this.type,
        attributes: ATTRIBUTES
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.type = asn1.result.idBlock.tagNumber;
    this.encodedValue = pvtsutils2.BufferSourceConverter.toArrayBuffer(asn1.result.valueBeforeDecodeView);
    const encodedView = new Uint8Array(this.encodedValue);
    encodedView[0] = 49;
    if (ATTRIBUTES in asn1.result === false) {
      if (this.type === 0)
        throw new Error("Wrong structure of SignedUnsignedAttributes");
      else
        return;
    }
    this.attributes = Array.from(asn1.result.attributes, (element) => new Attribute({ schema: element }));
  }
  toSchema() {
    if (_SignedAndUnsignedAttributes.compareWithDefault(TYPE, this.type) || _SignedAndUnsignedAttributes.compareWithDefault(ATTRIBUTES, this.attributes))
      throw new Error('Incorrectly initialized "SignedAndUnsignedAttributes" class');
    return new Constructed({
      optional: true,
      idBlock: {
        tagClass: 3,
        tagNumber: this.type
      },
      value: Array.from(this.attributes, (o) => o.toSchema())
    });
  }
  toJSON() {
    if (_SignedAndUnsignedAttributes.compareWithDefault(TYPE, this.type) || _SignedAndUnsignedAttributes.compareWithDefault(ATTRIBUTES, this.attributes))
      throw new Error('Incorrectly initialized "SignedAndUnsignedAttributes" class');
    return {
      type: this.type,
      attributes: Array.from(this.attributes, (o) => o.toJSON())
    };
  }
};
SignedAndUnsignedAttributes.CLASS_NAME = "SignedAndUnsignedAttributes";
var VERSION$4 = "version";
var SID = "sid";
var DIGEST_ALGORITHM = "digestAlgorithm";
var SIGNED_ATTRS = "signedAttrs";
var SIGNATURE_ALGORITHM = "signatureAlgorithm";
var SIGNATURE = "signature";
var UNSIGNED_ATTRS = "unsignedAttrs";
var SIGNER_INFO = "SignerInfo";
var SIGNER_INFO_VERSION = `${SIGNER_INFO}.${VERSION$4}`;
var SIGNER_INFO_SID = `${SIGNER_INFO}.${SID}`;
var SIGNER_INFO_DIGEST_ALGORITHM = `${SIGNER_INFO}.${DIGEST_ALGORITHM}`;
var SIGNER_INFO_SIGNED_ATTRS = `${SIGNER_INFO}.${SIGNED_ATTRS}`;
var SIGNER_INFO_SIGNATURE_ALGORITHM = `${SIGNER_INFO}.${SIGNATURE_ALGORITHM}`;
var SIGNER_INFO_SIGNATURE = `${SIGNER_INFO}.${SIGNATURE}`;
var SIGNER_INFO_UNSIGNED_ATTRS = `${SIGNER_INFO}.${UNSIGNED_ATTRS}`;
var CLEAR_PROPS$5 = [
  SIGNER_INFO_VERSION,
  SIGNER_INFO_SID,
  SIGNER_INFO_DIGEST_ALGORITHM,
  SIGNER_INFO_SIGNED_ATTRS,
  SIGNER_INFO_SIGNATURE_ALGORITHM,
  SIGNER_INFO_SIGNATURE,
  SIGNER_INFO_UNSIGNED_ATTRS
];
var SignerInfo = class _SignerInfo extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.version = getParametersValue(parameters, VERSION$4, _SignerInfo.defaultValues(VERSION$4));
    this.sid = getParametersValue(parameters, SID, _SignerInfo.defaultValues(SID));
    this.digestAlgorithm = getParametersValue(parameters, DIGEST_ALGORITHM, _SignerInfo.defaultValues(DIGEST_ALGORITHM));
    if (SIGNED_ATTRS in parameters) {
      this.signedAttrs = getParametersValue(parameters, SIGNED_ATTRS, _SignerInfo.defaultValues(SIGNED_ATTRS));
    }
    this.signatureAlgorithm = getParametersValue(parameters, SIGNATURE_ALGORITHM, _SignerInfo.defaultValues(SIGNATURE_ALGORITHM));
    this.signature = getParametersValue(parameters, SIGNATURE, _SignerInfo.defaultValues(SIGNATURE));
    if (UNSIGNED_ATTRS in parameters) {
      this.unsignedAttrs = getParametersValue(parameters, UNSIGNED_ATTRS, _SignerInfo.defaultValues(UNSIGNED_ATTRS));
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case VERSION$4:
        return 0;
      case SID:
        return new Any();
      case DIGEST_ALGORITHM:
        return new AlgorithmIdentifier();
      case SIGNED_ATTRS:
        return new SignedAndUnsignedAttributes({ type: 0 });
      case SIGNATURE_ALGORITHM:
        return new AlgorithmIdentifier();
      case SIGNATURE:
        return new OctetString();
      case UNSIGNED_ATTRS:
        return new SignedAndUnsignedAttributes({ type: 1 });
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case VERSION$4:
        return _SignerInfo.defaultValues(VERSION$4) === memberValue;
      case SID:
        return memberValue instanceof Any;
      case DIGEST_ALGORITHM:
        if (memberValue instanceof AlgorithmIdentifier === false)
          return false;
        return memberValue.isEqual(_SignerInfo.defaultValues(DIGEST_ALGORITHM));
      case SIGNED_ATTRS:
        return SignedAndUnsignedAttributes.compareWithDefault("type", memberValue.type) && SignedAndUnsignedAttributes.compareWithDefault("attributes", memberValue.attributes) && SignedAndUnsignedAttributes.compareWithDefault("encodedValue", memberValue.encodedValue);
      case SIGNATURE_ALGORITHM:
        if (memberValue instanceof AlgorithmIdentifier === false)
          return false;
        return memberValue.isEqual(_SignerInfo.defaultValues(SIGNATURE_ALGORITHM));
      case SIGNATURE:
      case UNSIGNED_ATTRS:
        return SignedAndUnsignedAttributes.compareWithDefault("type", memberValue.type) && SignedAndUnsignedAttributes.compareWithDefault("attributes", memberValue.attributes) && SignedAndUnsignedAttributes.compareWithDefault("encodedValue", memberValue.encodedValue);
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: SIGNER_INFO,
      value: [
        new Integer({ name: names.version || SIGNER_INFO_VERSION }),
        new Choice({
          value: [
            IssuerAndSerialNumber.schema(names.sidSchema || {
              names: {
                blockName: SIGNER_INFO_SID
              }
            }),
            new Choice({
              value: [
                new Constructed({
                  optional: true,
                  name: names.sid || SIGNER_INFO_SID,
                  idBlock: {
                    tagClass: 3,
                    tagNumber: 0
                  },
                  value: [new OctetString()]
                }),
                new Primitive({
                  optional: true,
                  name: names.sid || SIGNER_INFO_SID,
                  idBlock: {
                    tagClass: 3,
                    tagNumber: 0
                  }
                })
              ]
            })
          ]
        }),
        AlgorithmIdentifier.schema(names.digestAlgorithm || {
          names: {
            blockName: SIGNER_INFO_DIGEST_ALGORITHM
          }
        }),
        SignedAndUnsignedAttributes.schema(names.signedAttrs || {
          names: {
            blockName: SIGNER_INFO_SIGNED_ATTRS,
            tagNumber: 0
          }
        }),
        AlgorithmIdentifier.schema(names.signatureAlgorithm || {
          names: {
            blockName: SIGNER_INFO_SIGNATURE_ALGORITHM
          }
        }),
        new OctetString({ name: names.signature || SIGNER_INFO_SIGNATURE }),
        SignedAndUnsignedAttributes.schema(names.unsignedAttrs || {
          names: {
            blockName: SIGNER_INFO_UNSIGNED_ATTRS,
            tagNumber: 1
          }
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$5);
    const asn1 = compareSchema(schema, schema, _SignerInfo.schema());
    AsnError.assertSchema(asn1, this.className);
    this.version = asn1.result[SIGNER_INFO_VERSION].valueBlock.valueDec;
    const currentSid = asn1.result[SIGNER_INFO_SID];
    if (currentSid.idBlock.tagClass === 1)
      this.sid = new IssuerAndSerialNumber({ schema: currentSid });
    else
      this.sid = currentSid;
    this.digestAlgorithm = new AlgorithmIdentifier({ schema: asn1.result[SIGNER_INFO_DIGEST_ALGORITHM] });
    if (SIGNER_INFO_SIGNED_ATTRS in asn1.result)
      this.signedAttrs = new SignedAndUnsignedAttributes({ type: 0, schema: asn1.result[SIGNER_INFO_SIGNED_ATTRS] });
    this.signatureAlgorithm = new AlgorithmIdentifier({ schema: asn1.result[SIGNER_INFO_SIGNATURE_ALGORITHM] });
    this.signature = asn1.result[SIGNER_INFO_SIGNATURE];
    if (SIGNER_INFO_UNSIGNED_ATTRS in asn1.result)
      this.unsignedAttrs = new SignedAndUnsignedAttributes({ type: 1, schema: asn1.result[SIGNER_INFO_UNSIGNED_ATTRS] });
  }
  toSchema() {
    if (_SignerInfo.compareWithDefault(SID, this.sid))
      throw new Error('Incorrectly initialized "SignerInfo" class');
    const outputArray = [];
    outputArray.push(new Integer({ value: this.version }));
    if (this.sid instanceof IssuerAndSerialNumber)
      outputArray.push(this.sid.toSchema());
    else
      outputArray.push(this.sid);
    outputArray.push(this.digestAlgorithm.toSchema());
    if (this.signedAttrs) {
      if (_SignerInfo.compareWithDefault(SIGNED_ATTRS, this.signedAttrs) === false)
        outputArray.push(this.signedAttrs.toSchema());
    }
    outputArray.push(this.signatureAlgorithm.toSchema());
    outputArray.push(this.signature);
    if (this.unsignedAttrs) {
      if (_SignerInfo.compareWithDefault(UNSIGNED_ATTRS, this.unsignedAttrs) === false)
        outputArray.push(this.unsignedAttrs.toSchema());
    }
    return new Sequence({
      value: outputArray
    });
  }
  toJSON() {
    if (_SignerInfo.compareWithDefault(SID, this.sid)) {
      throw new Error('Incorrectly initialized "SignerInfo" class');
    }
    const res = {
      version: this.version,
      digestAlgorithm: this.digestAlgorithm.toJSON(),
      signatureAlgorithm: this.signatureAlgorithm.toJSON(),
      signature: this.signature.toJSON()
    };
    if (!(this.sid instanceof Any))
      res.sid = this.sid.toJSON();
    if (this.signedAttrs && _SignerInfo.compareWithDefault(SIGNED_ATTRS, this.signedAttrs) === false) {
      res.signedAttrs = this.signedAttrs.toJSON();
    }
    if (this.unsignedAttrs && _SignerInfo.compareWithDefault(UNSIGNED_ATTRS, this.unsignedAttrs) === false) {
      res.unsignedAttrs = this.unsignedAttrs.toJSON();
    }
    return res;
  }
};
SignerInfo.CLASS_NAME = "SignerInfo";
var VERSION$3 = "version";
var POLICY = "policy";
var MESSAGE_IMPRINT$1 = "messageImprint";
var SERIAL_NUMBER = "serialNumber";
var GEN_TIME = "genTime";
var ORDERING = "ordering";
var NONCE$1 = "nonce";
var ACCURACY = "accuracy";
var TSA = "tsa";
var EXTENSIONS$1 = "extensions";
var TST_INFO = "TSTInfo";
var TST_INFO_VERSION = `${TST_INFO}.${VERSION$3}`;
var TST_INFO_POLICY = `${TST_INFO}.${POLICY}`;
var TST_INFO_MESSAGE_IMPRINT = `${TST_INFO}.${MESSAGE_IMPRINT$1}`;
var TST_INFO_SERIAL_NUMBER = `${TST_INFO}.${SERIAL_NUMBER}`;
var TST_INFO_GEN_TIME = `${TST_INFO}.${GEN_TIME}`;
var TST_INFO_ACCURACY = `${TST_INFO}.${ACCURACY}`;
var TST_INFO_ORDERING = `${TST_INFO}.${ORDERING}`;
var TST_INFO_NONCE = `${TST_INFO}.${NONCE$1}`;
var TST_INFO_TSA = `${TST_INFO}.${TSA}`;
var TST_INFO_EXTENSIONS = `${TST_INFO}.${EXTENSIONS$1}`;
var CLEAR_PROPS$4 = [
  TST_INFO_VERSION,
  TST_INFO_POLICY,
  TST_INFO_MESSAGE_IMPRINT,
  TST_INFO_SERIAL_NUMBER,
  TST_INFO_GEN_TIME,
  TST_INFO_ACCURACY,
  TST_INFO_ORDERING,
  TST_INFO_NONCE,
  TST_INFO_TSA,
  TST_INFO_EXTENSIONS
];
var TSTInfo = class _TSTInfo extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.version = getParametersValue(parameters, VERSION$3, _TSTInfo.defaultValues(VERSION$3));
    this.policy = getParametersValue(parameters, POLICY, _TSTInfo.defaultValues(POLICY));
    this.messageImprint = getParametersValue(parameters, MESSAGE_IMPRINT$1, _TSTInfo.defaultValues(MESSAGE_IMPRINT$1));
    this.serialNumber = getParametersValue(parameters, SERIAL_NUMBER, _TSTInfo.defaultValues(SERIAL_NUMBER));
    this.genTime = getParametersValue(parameters, GEN_TIME, _TSTInfo.defaultValues(GEN_TIME));
    if (ACCURACY in parameters) {
      this.accuracy = getParametersValue(parameters, ACCURACY, _TSTInfo.defaultValues(ACCURACY));
    }
    if (ORDERING in parameters) {
      this.ordering = getParametersValue(parameters, ORDERING, _TSTInfo.defaultValues(ORDERING));
    }
    if (NONCE$1 in parameters) {
      this.nonce = getParametersValue(parameters, NONCE$1, _TSTInfo.defaultValues(NONCE$1));
    }
    if (TSA in parameters) {
      this.tsa = getParametersValue(parameters, TSA, _TSTInfo.defaultValues(TSA));
    }
    if (EXTENSIONS$1 in parameters) {
      this.extensions = getParametersValue(parameters, EXTENSIONS$1, _TSTInfo.defaultValues(EXTENSIONS$1));
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case VERSION$3:
        return 0;
      case POLICY:
        return EMPTY_STRING2;
      case MESSAGE_IMPRINT$1:
        return new MessageImprint();
      case SERIAL_NUMBER:
        return new Integer();
      case GEN_TIME:
        return new Date(0, 0, 0);
      case ACCURACY:
        return new Accuracy();
      case ORDERING:
        return false;
      case NONCE$1:
        return new Integer();
      case TSA:
        return new GeneralName();
      case EXTENSIONS$1:
        return [];
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case VERSION$3:
      case POLICY:
      case GEN_TIME:
      case ORDERING:
        return memberValue === _TSTInfo.defaultValues(ORDERING);
      case MESSAGE_IMPRINT$1:
        return MessageImprint.compareWithDefault(HASH_ALGORITHM, memberValue.hashAlgorithm) && MessageImprint.compareWithDefault(HASHED_MESSAGE, memberValue.hashedMessage);
      case SERIAL_NUMBER:
      case NONCE$1:
        return memberValue.isEqual(_TSTInfo.defaultValues(NONCE$1));
      case ACCURACY:
        return Accuracy.compareWithDefault(SECONDS, memberValue.seconds) && Accuracy.compareWithDefault(MILLIS, memberValue.millis) && Accuracy.compareWithDefault(MICROS, memberValue.micros);
      case TSA:
        return GeneralName.compareWithDefault(TYPE$4, memberValue.type) && GeneralName.compareWithDefault(VALUE$5, memberValue.value);
      case EXTENSIONS$1:
        return memberValue.length === 0;
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || TST_INFO,
      value: [
        new Integer({ name: names.version || TST_INFO_VERSION }),
        new ObjectIdentifier({ name: names.policy || TST_INFO_POLICY }),
        MessageImprint.schema(names.messageImprint || {
          names: {
            blockName: TST_INFO_MESSAGE_IMPRINT
          }
        }),
        new Integer({ name: names.serialNumber || TST_INFO_SERIAL_NUMBER }),
        new GeneralizedTime({ name: names.genTime || TST_INFO_GEN_TIME }),
        Accuracy.schema(names.accuracy || {
          names: {
            blockName: TST_INFO_ACCURACY
          }
        }),
        new Boolean2({
          name: names.ordering || TST_INFO_ORDERING,
          optional: true
        }),
        new Integer({
          name: names.nonce || TST_INFO_NONCE,
          optional: true
        }),
        new Constructed({
          optional: true,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [GeneralName.schema(names.tsa || {
            names: {
              blockName: TST_INFO_TSA
            }
          })]
        }),
        new Constructed({
          optional: true,
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          },
          value: [
            new Repeated({
              name: names.extensions || TST_INFO_EXTENSIONS,
              value: Extension.schema(names.extension || {})
            })
          ]
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$4);
    const asn1 = compareSchema(schema, schema, _TSTInfo.schema());
    AsnError.assertSchema(asn1, this.className);
    this.version = asn1.result[TST_INFO_VERSION].valueBlock.valueDec;
    this.policy = asn1.result[TST_INFO_POLICY].valueBlock.toString();
    this.messageImprint = new MessageImprint({ schema: asn1.result[TST_INFO_MESSAGE_IMPRINT] });
    this.serialNumber = asn1.result[TST_INFO_SERIAL_NUMBER];
    this.genTime = asn1.result[TST_INFO_GEN_TIME].toDate();
    if (TST_INFO_ACCURACY in asn1.result)
      this.accuracy = new Accuracy({ schema: asn1.result[TST_INFO_ACCURACY] });
    if (TST_INFO_ORDERING in asn1.result)
      this.ordering = asn1.result[TST_INFO_ORDERING].valueBlock.value;
    if (TST_INFO_NONCE in asn1.result)
      this.nonce = asn1.result[TST_INFO_NONCE];
    if (TST_INFO_TSA in asn1.result)
      this.tsa = new GeneralName({ schema: asn1.result[TST_INFO_TSA] });
    if (TST_INFO_EXTENSIONS in asn1.result)
      this.extensions = Array.from(asn1.result[TST_INFO_EXTENSIONS], (element) => new Extension({ schema: element }));
  }
  toSchema() {
    const outputArray = [];
    outputArray.push(new Integer({ value: this.version }));
    outputArray.push(new ObjectIdentifier({ value: this.policy }));
    outputArray.push(this.messageImprint.toSchema());
    outputArray.push(this.serialNumber);
    outputArray.push(new GeneralizedTime({ valueDate: this.genTime }));
    if (this.accuracy)
      outputArray.push(this.accuracy.toSchema());
    if (this.ordering !== void 0)
      outputArray.push(new Boolean2({ value: this.ordering }));
    if (this.nonce)
      outputArray.push(this.nonce);
    if (this.tsa) {
      outputArray.push(new Constructed({
        optional: true,
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        value: [this.tsa.toSchema()]
      }));
    }
    if (this.extensions) {
      outputArray.push(new Constructed({
        optional: true,
        idBlock: {
          tagClass: 3,
          tagNumber: 1
        },
        value: Array.from(this.extensions, (o) => o.toSchema())
      }));
    }
    return new Sequence({
      value: outputArray
    });
  }
  toJSON() {
    const res = {
      version: this.version,
      policy: this.policy,
      messageImprint: this.messageImprint.toJSON(),
      serialNumber: this.serialNumber.toJSON(),
      genTime: this.genTime
    };
    if (this.accuracy)
      res.accuracy = this.accuracy.toJSON();
    if (this.ordering !== void 0)
      res.ordering = this.ordering;
    if (this.nonce)
      res.nonce = this.nonce.toJSON();
    if (this.tsa)
      res.tsa = this.tsa.toJSON();
    if (this.extensions)
      res.extensions = Array.from(this.extensions, (o) => o.toJSON());
    return res;
  }
  async verify(params, crypto2 = getCrypto(true)) {
    if (!params.data) {
      throw new Error('"data" is a mandatory attribute for TST_INFO verification');
    }
    const data = params.data;
    if (params.notBefore) {
      if (this.genTime < params.notBefore)
        throw new Error("Generation time for TSTInfo object is less than notBefore value");
    }
    if (params.notAfter) {
      if (this.genTime > params.notAfter)
        throw new Error("Generation time for TSTInfo object is more than notAfter value");
    }
    const shaAlgorithm = crypto2.getAlgorithmByOID(this.messageImprint.hashAlgorithm.algorithmId, true, "MessageImprint.hashAlgorithm");
    const hash2 = await crypto2.digest(shaAlgorithm.name, new Uint8Array(data));
    return pvtsutils2.BufferSourceConverter.isEqual(hash2, this.messageImprint.hashedMessage.valueBlock.valueHexView);
  }
};
TSTInfo.CLASS_NAME = "TSTInfo";
var VERSION$2 = "version";
var DIGEST_ALGORITHMS = "digestAlgorithms";
var ENCAP_CONTENT_INFO = "encapContentInfo";
var CERTIFICATES = "certificates";
var CRLS = "crls";
var SIGNER_INFOS = "signerInfos";
var OCSPS = "ocsps";
var SIGNED_DATA = "SignedData";
var SIGNED_DATA_VERSION = `${SIGNED_DATA}.${VERSION$2}`;
var SIGNED_DATA_DIGEST_ALGORITHMS = `${SIGNED_DATA}.${DIGEST_ALGORITHMS}`;
var SIGNED_DATA_ENCAP_CONTENT_INFO = `${SIGNED_DATA}.${ENCAP_CONTENT_INFO}`;
var SIGNED_DATA_CERTIFICATES = `${SIGNED_DATA}.${CERTIFICATES}`;
var SIGNED_DATA_CRLS = `${SIGNED_DATA}.${CRLS}`;
var SIGNED_DATA_SIGNER_INFOS = `${SIGNED_DATA}.${SIGNER_INFOS}`;
var CLEAR_PROPS$3 = [
  SIGNED_DATA_VERSION,
  SIGNED_DATA_DIGEST_ALGORITHMS,
  SIGNED_DATA_ENCAP_CONTENT_INFO,
  SIGNED_DATA_CERTIFICATES,
  SIGNED_DATA_CRLS,
  SIGNED_DATA_SIGNER_INFOS
];
var SignedDataVerifyError = class extends Error {
  constructor({ message: message3, code = 0, date = /* @__PURE__ */ new Date(), signatureVerified = null, signerCertificate = null, signerCertificateVerified = null, timestampSerial = null, certificatePath = [] }) {
    super(message3);
    this.name = "SignedDataVerifyError";
    this.date = date;
    this.code = code;
    this.timestampSerial = timestampSerial;
    this.signatureVerified = signatureVerified;
    this.signerCertificate = signerCertificate;
    this.signerCertificateVerified = signerCertificateVerified;
    this.certificatePath = certificatePath;
  }
};
var SignedData = class _SignedData extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.version = getParametersValue(parameters, VERSION$2, _SignedData.defaultValues(VERSION$2));
    this.digestAlgorithms = getParametersValue(parameters, DIGEST_ALGORITHMS, _SignedData.defaultValues(DIGEST_ALGORITHMS));
    this.encapContentInfo = getParametersValue(parameters, ENCAP_CONTENT_INFO, _SignedData.defaultValues(ENCAP_CONTENT_INFO));
    if (CERTIFICATES in parameters) {
      this.certificates = getParametersValue(parameters, CERTIFICATES, _SignedData.defaultValues(CERTIFICATES));
    }
    if (CRLS in parameters) {
      this.crls = getParametersValue(parameters, CRLS, _SignedData.defaultValues(CRLS));
    }
    if (OCSPS in parameters) {
      this.ocsps = getParametersValue(parameters, OCSPS, _SignedData.defaultValues(OCSPS));
    }
    this.signerInfos = getParametersValue(parameters, SIGNER_INFOS, _SignedData.defaultValues(SIGNER_INFOS));
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case VERSION$2:
        return 0;
      case DIGEST_ALGORITHMS:
        return [];
      case ENCAP_CONTENT_INFO:
        return new EncapsulatedContentInfo();
      case CERTIFICATES:
        return [];
      case CRLS:
        return [];
      case OCSPS:
        return [];
      case SIGNER_INFOS:
        return [];
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case VERSION$2:
        return memberValue === _SignedData.defaultValues(VERSION$2);
      case ENCAP_CONTENT_INFO:
        return EncapsulatedContentInfo.compareWithDefault("eContentType", memberValue.eContentType) && EncapsulatedContentInfo.compareWithDefault("eContent", memberValue.eContent);
      case DIGEST_ALGORITHMS:
      case CERTIFICATES:
      case CRLS:
      case OCSPS:
      case SIGNER_INFOS:
        return memberValue.length === 0;
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    if (names.optional === void 0) {
      names.optional = false;
    }
    return new Sequence({
      name: names.blockName || SIGNED_DATA,
      optional: names.optional,
      value: [
        new Integer({ name: names.version || SIGNED_DATA_VERSION }),
        new Set2({
          value: [
            new Repeated({
              name: names.digestAlgorithms || SIGNED_DATA_DIGEST_ALGORITHMS,
              value: AlgorithmIdentifier.schema()
            })
          ]
        }),
        EncapsulatedContentInfo.schema(names.encapContentInfo || {
          names: {
            blockName: SIGNED_DATA_ENCAP_CONTENT_INFO
          }
        }),
        new Constructed({
          name: names.certificates || SIGNED_DATA_CERTIFICATES,
          optional: true,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: CertificateSet.schema().valueBlock.value
        }),
        new Constructed({
          optional: true,
          idBlock: {
            tagClass: 3,
            tagNumber: 1
          },
          value: RevocationInfoChoices.schema(names.crls || {
            names: {
              crls: SIGNED_DATA_CRLS
            }
          }).valueBlock.value
        }),
        new Set2({
          value: [
            new Repeated({
              name: names.signerInfos || SIGNED_DATA_SIGNER_INFOS,
              value: SignerInfo.schema()
            })
          ]
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$3);
    const asn1 = compareSchema(schema, schema, _SignedData.schema());
    AsnError.assertSchema(asn1, this.className);
    this.version = asn1.result[SIGNED_DATA_VERSION].valueBlock.valueDec;
    if (SIGNED_DATA_DIGEST_ALGORITHMS in asn1.result)
      this.digestAlgorithms = Array.from(asn1.result[SIGNED_DATA_DIGEST_ALGORITHMS], (algorithm) => new AlgorithmIdentifier({ schema: algorithm }));
    this.encapContentInfo = new EncapsulatedContentInfo({ schema: asn1.result[SIGNED_DATA_ENCAP_CONTENT_INFO] });
    if (SIGNED_DATA_CERTIFICATES in asn1.result) {
      const certificateSet = new CertificateSet({
        schema: new Set2({
          value: asn1.result[SIGNED_DATA_CERTIFICATES].valueBlock.value
        })
      });
      this.certificates = certificateSet.certificates.slice(0);
    }
    if (SIGNED_DATA_CRLS in asn1.result) {
      this.crls = Array.from(asn1.result[SIGNED_DATA_CRLS], (crl) => {
        if (crl.idBlock.tagClass === 1)
          return new CertificateRevocationList({ schema: crl });
        crl.idBlock.tagClass = 1;
        crl.idBlock.tagNumber = 16;
        return new OtherRevocationInfoFormat({ schema: crl });
      });
    }
    if (SIGNED_DATA_SIGNER_INFOS in asn1.result)
      this.signerInfos = Array.from(asn1.result[SIGNED_DATA_SIGNER_INFOS], (signerInfoSchema) => new SignerInfo({ schema: signerInfoSchema }));
  }
  toSchema(encodeFlag = false) {
    const outputArray = [];
    if (this.certificates && this.certificates.length && this.certificates.some((o) => o instanceof OtherCertificateFormat) || this.crls && this.crls.length && this.crls.some((o) => o instanceof OtherRevocationInfoFormat)) {
      this.version = 5;
    } else if (this.certificates && this.certificates.length && this.certificates.some((o) => o instanceof AttributeCertificateV2)) {
      this.version = 4;
    } else if (this.certificates && this.certificates.length && this.certificates.some((o) => o instanceof AttributeCertificateV1) || this.signerInfos.some((o) => o.version === 3) || this.encapContentInfo.eContentType !== _SignedData.ID_DATA) {
      this.version = 3;
    } else {
      this.version = 1;
    }
    outputArray.push(new Integer({ value: this.version }));
    outputArray.push(new Set2({
      value: Array.from(this.digestAlgorithms, (algorithm) => algorithm.toSchema())
    }));
    outputArray.push(this.encapContentInfo.toSchema());
    if (this.certificates) {
      const certificateSet = new CertificateSet({ certificates: this.certificates });
      const certificateSetSchema = certificateSet.toSchema();
      outputArray.push(new Constructed({
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        value: certificateSetSchema.valueBlock.value
      }));
    }
    if (this.crls) {
      outputArray.push(new Constructed({
        idBlock: {
          tagClass: 3,
          tagNumber: 1
        },
        value: Array.from(this.crls, (crl) => {
          if (crl instanceof OtherRevocationInfoFormat) {
            const crlSchema = crl.toSchema();
            crlSchema.idBlock.tagClass = 3;
            crlSchema.idBlock.tagNumber = 1;
            return crlSchema;
          }
          return crl.toSchema(encodeFlag);
        })
      }));
    }
    outputArray.push(new Set2({
      value: Array.from(this.signerInfos, (signerInfo) => signerInfo.toSchema())
    }));
    return new Sequence({
      value: outputArray
    });
  }
  toJSON() {
    const res = {
      version: this.version,
      digestAlgorithms: Array.from(this.digestAlgorithms, (algorithm) => algorithm.toJSON()),
      encapContentInfo: this.encapContentInfo.toJSON(),
      signerInfos: Array.from(this.signerInfos, (signerInfo) => signerInfo.toJSON())
    };
    if (this.certificates) {
      res.certificates = Array.from(this.certificates, (certificate) => certificate.toJSON());
    }
    if (this.crls) {
      res.crls = Array.from(this.crls, (crl) => crl.toJSON());
    }
    return res;
  }
  async verify({ signer = -1, data = EMPTY_BUFFER2, trustedCerts = [], checkDate = /* @__PURE__ */ new Date(), checkChain = false, passedWhenNotRevValues = false, extendedMode = false, findOrigin = null, findIssuer = null } = {}, crypto2 = getCrypto(true)) {
    let signerCert = null;
    let timestampSerial = null;
    try {
      let messageDigestValue = EMPTY_BUFFER2;
      let shaAlgorithm = EMPTY_STRING2;
      let certificatePath = [];
      const signerInfo = this.signerInfos[signer];
      if (!signerInfo) {
        throw new SignedDataVerifyError({
          date: checkDate,
          code: 1,
          message: "Unable to get signer by supplied index"
        });
      }
      if (!this.certificates) {
        throw new SignedDataVerifyError({
          date: checkDate,
          code: 2,
          message: "No certificates attached to this signed data"
        });
      }
      if (signerInfo.sid instanceof IssuerAndSerialNumber) {
        for (const certificate of this.certificates) {
          if (!(certificate instanceof Certificate))
            continue;
          if (certificate.issuer.isEqual(signerInfo.sid.issuer) && certificate.serialNumber.isEqual(signerInfo.sid.serialNumber)) {
            signerCert = certificate;
            break;
          }
        }
      } else {
        const sid = signerInfo.sid;
        const keyId = sid.idBlock.isConstructed ? sid.valueBlock.value[0].valueBlock.valueHex : sid.valueBlock.valueHex;
        for (const certificate of this.certificates) {
          if (!(certificate instanceof Certificate)) {
            continue;
          }
          const digest = await crypto2.digest({ name: "sha-1" }, certificate.subjectPublicKeyInfo.subjectPublicKey.valueBlock.valueHexView);
          if (isEqualBuffer(digest, keyId)) {
            signerCert = certificate;
            break;
          }
        }
      }
      if (!signerCert) {
        throw new SignedDataVerifyError({
          date: checkDate,
          code: 3,
          message: "Unable to find signer certificate"
        });
      }
      if (this.encapContentInfo.eContentType === id_eContentType_TSTInfo) {
        if (!this.encapContentInfo.eContent) {
          throw new SignedDataVerifyError({
            date: checkDate,
            code: 15,
            message: "Error during verification: TSTInfo eContent is empty",
            signatureVerified: null,
            signerCertificate: signerCert,
            timestampSerial,
            signerCertificateVerified: true
          });
        }
        let tstInfo;
        try {
          tstInfo = TSTInfo.fromBER(this.encapContentInfo.eContent.valueBlock.valueHexView);
        } catch (ex) {
          throw new SignedDataVerifyError({
            date: checkDate,
            code: 15,
            message: "Error during verification: TSTInfo wrong ASN.1 schema ",
            signatureVerified: null,
            signerCertificate: signerCert,
            timestampSerial,
            signerCertificateVerified: true
          });
        }
        checkDate = tstInfo.genTime;
        timestampSerial = tstInfo.serialNumber.valueBlock.valueHexView.slice();
        if (data.byteLength === 0) {
          throw new SignedDataVerifyError({
            date: checkDate,
            code: 4,
            message: "Missed detached data input array"
          });
        }
        if (!await tstInfo.verify({ data }, crypto2)) {
          throw new SignedDataVerifyError({
            date: checkDate,
            code: 15,
            message: "Error during verification: TSTInfo verification is failed",
            signatureVerified: false,
            signerCertificate: signerCert,
            timestampSerial,
            signerCertificateVerified: true
          });
        }
      }
      if (checkChain) {
        const certs = this.certificates.filter((certificate) => certificate instanceof Certificate && !!checkCA(certificate, signerCert));
        const chainParams = {
          checkDate,
          certs,
          trustedCerts
        };
        if (findIssuer) {
          chainParams.findIssuer = findIssuer;
        }
        if (findOrigin) {
          chainParams.findOrigin = findOrigin;
        }
        const chainEngine = new CertificateChainValidationEngine(chainParams);
        chainEngine.certs.push(signerCert);
        if (this.crls) {
          for (const crl of this.crls) {
            if ("thisUpdate" in crl)
              chainEngine.crls.push(crl);
            else {
              if (crl.otherRevInfoFormat === id_PKIX_OCSP_Basic)
                chainEngine.ocsps.push(new BasicOCSPResponse({ schema: crl.otherRevInfo }));
            }
          }
        }
        if (this.ocsps) {
          chainEngine.ocsps.push(...this.ocsps);
        }
        const verificationResult = await chainEngine.verify({ passedWhenNotRevValues }, crypto2).catch((e) => {
          throw new SignedDataVerifyError({
            date: checkDate,
            code: 5,
            message: `Validation of signer's certificate failed with error: ${e instanceof Object ? e.resultMessage : e}`,
            signerCertificate: signerCert,
            signerCertificateVerified: false
          });
        });
        if (verificationResult.certificatePath) {
          certificatePath = verificationResult.certificatePath;
        }
        if (!verificationResult.result)
          throw new SignedDataVerifyError({
            date: checkDate,
            code: 5,
            message: `Validation of signer's certificate failed: ${verificationResult.resultMessage}`,
            signerCertificate: signerCert,
            signerCertificateVerified: false
          });
      }
      const signerInfoHashAlgorithm = crypto2.getAlgorithmByOID(signerInfo.digestAlgorithm.algorithmId);
      if (!("name" in signerInfoHashAlgorithm)) {
        throw new SignedDataVerifyError({
          date: checkDate,
          code: 7,
          message: `Unsupported signature algorithm: ${signerInfo.digestAlgorithm.algorithmId}`,
          signerCertificate: signerCert,
          signerCertificateVerified: true
        });
      }
      shaAlgorithm = signerInfoHashAlgorithm.name;
      const eContent = this.encapContentInfo.eContent;
      if (eContent) {
        if (eContent.idBlock.tagClass === 1 && eContent.idBlock.tagNumber === 4) {
          data = eContent.getValue();
        } else
          data = eContent.valueBlock.valueBeforeDecodeView;
      } else {
        if (data.byteLength === 0) {
          throw new SignedDataVerifyError({
            date: checkDate,
            code: 8,
            message: "Missed detached data input array",
            signerCertificate: signerCert,
            signerCertificateVerified: true
          });
        }
      }
      if (signerInfo.signedAttrs) {
        let foundContentType = false;
        let foundMessageDigest = false;
        for (const attribute of signerInfo.signedAttrs.attributes) {
          if (attribute.type === "1.2.840.113549.1.9.3")
            foundContentType = true;
          if (attribute.type === "1.2.840.113549.1.9.4") {
            foundMessageDigest = true;
            messageDigestValue = attribute.values[0].valueBlock.valueHex;
          }
          if (foundContentType && foundMessageDigest)
            break;
        }
        if (foundContentType === false) {
          throw new SignedDataVerifyError({
            date: checkDate,
            code: 9,
            message: 'Attribute "content-type" is a mandatory attribute for "signed attributes"',
            signerCertificate: signerCert,
            signerCertificateVerified: true
          });
        }
        if (foundMessageDigest === false) {
          throw new SignedDataVerifyError({
            date: checkDate,
            code: 10,
            message: 'Attribute "message-digest" is a mandatory attribute for "signed attributes"',
            signatureVerified: null,
            signerCertificate: signerCert,
            signerCertificateVerified: true
          });
        }
      }
      if (signerInfo.signedAttrs) {
        const messageDigest = await crypto2.digest(shaAlgorithm, new Uint8Array(data));
        if (!isEqualBuffer(messageDigest, messageDigestValue)) {
          throw new SignedDataVerifyError({
            date: checkDate,
            code: 15,
            message: "Error during verification: Message digest doesn't match",
            signatureVerified: null,
            signerCertificate: signerCert,
            timestampSerial,
            signerCertificateVerified: true
          });
        }
        data = signerInfo.signedAttrs.encodedValue;
      }
      const verifyResult = await crypto2.verifyWithPublicKey(data, signerInfo.signature, signerCert.subjectPublicKeyInfo, signerCert.signatureAlgorithm, shaAlgorithm);
      if (extendedMode) {
        return {
          date: checkDate,
          code: 14,
          message: EMPTY_STRING2,
          signatureVerified: verifyResult,
          signerCertificate: signerCert,
          timestampSerial,
          signerCertificateVerified: true,
          certificatePath
        };
      } else {
        return verifyResult;
      }
    } catch (e) {
      if (e instanceof SignedDataVerifyError) {
        throw e;
      }
      throw new SignedDataVerifyError({
        date: checkDate,
        code: 15,
        message: `Error during verification: ${e instanceof Error ? e.message : e}`,
        signatureVerified: null,
        signerCertificate: signerCert,
        timestampSerial,
        signerCertificateVerified: true
      });
    }
  }
  async sign(privateKey, signerIndex, hashAlgorithm = "SHA-1", data = EMPTY_BUFFER2, crypto2 = getCrypto(true)) {
    if (!privateKey)
      throw new Error("Need to provide a private key for signing");
    const hashAlgorithmOID = crypto2.getOIDByAlgorithm({ name: hashAlgorithm }, true, "hashAlgorithm");
    if (this.digestAlgorithms.filter((algorithm) => algorithm.algorithmId === hashAlgorithmOID).length === 0) {
      this.digestAlgorithms.push(new AlgorithmIdentifier({
        algorithmId: hashAlgorithmOID,
        algorithmParams: new Null()
      }));
    }
    const signerInfo = this.signerInfos[signerIndex];
    if (!signerInfo) {
      throw new RangeError("SignerInfo index is out of range");
    }
    signerInfo.digestAlgorithm = new AlgorithmIdentifier({
      algorithmId: hashAlgorithmOID,
      algorithmParams: new Null()
    });
    const signatureParams = await crypto2.getSignatureParameters(privateKey, hashAlgorithm);
    const parameters = signatureParams.parameters;
    signerInfo.signatureAlgorithm = signatureParams.signatureAlgorithm;
    if (signerInfo.signedAttrs) {
      if (signerInfo.signedAttrs.encodedValue.byteLength !== 0)
        data = signerInfo.signedAttrs.encodedValue;
      else {
        data = signerInfo.signedAttrs.toSchema().toBER();
        const view = pvtsutils2.BufferSourceConverter.toUint8Array(data);
        view[0] = 49;
      }
    } else {
      const eContent = this.encapContentInfo.eContent;
      if (eContent) {
        if (eContent.idBlock.tagClass === 1 && eContent.idBlock.tagNumber === 4) {
          data = eContent.getValue();
        } else
          data = eContent.valueBlock.valueBeforeDecodeView;
      } else {
        if (data.byteLength === 0)
          throw new Error("Missed detached data input array");
      }
    }
    const signature = await crypto2.signWithPrivateKey(data, privateKey, parameters);
    signerInfo.signature = new OctetString({ valueHex: signature });
  }
};
SignedData.CLASS_NAME = "SignedData";
SignedData.ID_DATA = id_ContentType_Data;
var VERSION$1 = "version";
var AUTH_SAFE = "authSafe";
var MAC_DATA = "macData";
var PARSED_VALUE = "parsedValue";
var CLERA_PROPS = [
  VERSION$1,
  AUTH_SAFE,
  MAC_DATA
];
var PFX = class _PFX extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.version = getParametersValue(parameters, VERSION$1, _PFX.defaultValues(VERSION$1));
    this.authSafe = getParametersValue(parameters, AUTH_SAFE, _PFX.defaultValues(AUTH_SAFE));
    if (MAC_DATA in parameters) {
      this.macData = getParametersValue(parameters, MAC_DATA, _PFX.defaultValues(MAC_DATA));
    }
    if (PARSED_VALUE in parameters) {
      this.parsedValue = getParametersValue(parameters, PARSED_VALUE, _PFX.defaultValues(PARSED_VALUE));
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case VERSION$1:
        return 3;
      case AUTH_SAFE:
        return new ContentInfo();
      case MAC_DATA:
        return new MacData();
      case PARSED_VALUE:
        return {};
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case VERSION$1:
        return memberValue === _PFX.defaultValues(memberName);
      case AUTH_SAFE:
        return ContentInfo.compareWithDefault("contentType", memberValue.contentType) && ContentInfo.compareWithDefault("content", memberValue.content);
      case MAC_DATA:
        return MacData.compareWithDefault("mac", memberValue.mac) && MacData.compareWithDefault("macSalt", memberValue.macSalt) && MacData.compareWithDefault("iterations", memberValue.iterations);
      case PARSED_VALUE:
        return memberValue instanceof Object && Object.keys(memberValue).length === 0;
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new Integer({ name: names.version || VERSION$1 }),
        ContentInfo.schema(names.authSafe || {
          names: {
            blockName: AUTH_SAFE
          }
        }),
        MacData.schema(names.macData || {
          names: {
            blockName: MAC_DATA,
            optional: true
          }
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLERA_PROPS);
    const asn1 = compareSchema(schema, schema, _PFX.schema({
      names: {
        version: VERSION$1,
        authSafe: {
          names: {
            blockName: AUTH_SAFE
          }
        },
        macData: {
          names: {
            blockName: MAC_DATA
          }
        }
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    this.version = asn1.result.version.valueBlock.valueDec;
    this.authSafe = new ContentInfo({ schema: asn1.result.authSafe });
    if (MAC_DATA in asn1.result)
      this.macData = new MacData({ schema: asn1.result.macData });
  }
  toSchema() {
    const outputArray = [
      new Integer({ value: this.version }),
      this.authSafe.toSchema()
    ];
    if (this.macData) {
      outputArray.push(this.macData.toSchema());
    }
    return new Sequence({
      value: outputArray
    });
  }
  toJSON() {
    const output = {
      version: this.version,
      authSafe: this.authSafe.toJSON()
    };
    if (this.macData) {
      output.macData = this.macData.toJSON();
    }
    return output;
  }
  async makeInternalValues(parameters = {}, crypto2 = getCrypto(true)) {
    ArgumentError.assert(parameters, "parameters", "object");
    if (!this.parsedValue) {
      throw new Error('Please call "parseValues" function first in order to make "parsedValue" data');
    }
    ParameterError.assertEmpty(this.parsedValue.integrityMode, "integrityMode", "parsedValue");
    ParameterError.assertEmpty(this.parsedValue.authenticatedSafe, "authenticatedSafe", "parsedValue");
    switch (this.parsedValue.integrityMode) {
      case 0:
        {
          if (!("iterations" in parameters))
            throw new ParameterError("iterations");
          ParameterError.assertEmpty(parameters.pbkdf2HashAlgorithm, "pbkdf2HashAlgorithm");
          ParameterError.assertEmpty(parameters.hmacHashAlgorithm, "hmacHashAlgorithm");
          ParameterError.assertEmpty(parameters.password, "password");
          const saltBuffer = new ArrayBuffer(64);
          const saltView = new Uint8Array(saltBuffer);
          crypto2.getRandomValues(saltView);
          const data = this.parsedValue.authenticatedSafe.toSchema().toBER(false);
          this.authSafe = new ContentInfo({
            contentType: ContentInfo.DATA,
            content: new OctetString({ valueHex: data })
          });
          const result = await crypto2.stampDataWithPassword({
            password: parameters.password,
            hashAlgorithm: parameters.hmacHashAlgorithm,
            salt: saltBuffer,
            iterationCount: parameters.iterations,
            contentToStamp: data
          });
          this.macData = new MacData({
            mac: new DigestInfo({
              digestAlgorithm: new AlgorithmIdentifier({
                algorithmId: crypto2.getOIDByAlgorithm({ name: parameters.hmacHashAlgorithm }, true, "hmacHashAlgorithm")
              }),
              digest: new OctetString({ valueHex: result })
            }),
            macSalt: new OctetString({ valueHex: saltBuffer }),
            iterations: parameters.iterations
          });
        }
        break;
      case 1:
        {
          if (!("signingCertificate" in parameters)) {
            throw new ParameterError("signingCertificate");
          }
          ParameterError.assertEmpty(parameters.privateKey, "privateKey");
          ParameterError.assertEmpty(parameters.hashAlgorithm, "hashAlgorithm");
          const toBeSigned = this.parsedValue.authenticatedSafe.toSchema().toBER(false);
          const cmsSigned = new SignedData({
            version: 1,
            encapContentInfo: new EncapsulatedContentInfo({
              eContentType: "1.2.840.113549.1.7.1",
              eContent: new OctetString({ valueHex: toBeSigned })
            }),
            certificates: [parameters.signingCertificate]
          });
          const result = await crypto2.digest({ name: parameters.hashAlgorithm }, new Uint8Array(toBeSigned));
          const signedAttr = [];
          signedAttr.push(new Attribute({
            type: "1.2.840.113549.1.9.3",
            values: [
              new ObjectIdentifier({ value: "1.2.840.113549.1.7.1" })
            ]
          }));
          signedAttr.push(new Attribute({
            type: "1.2.840.113549.1.9.5",
            values: [
              new UTCTime({ valueDate: /* @__PURE__ */ new Date() })
            ]
          }));
          signedAttr.push(new Attribute({
            type: "1.2.840.113549.1.9.4",
            values: [
              new OctetString({ valueHex: result })
            ]
          }));
          cmsSigned.signerInfos.push(new SignerInfo({
            version: 1,
            sid: new IssuerAndSerialNumber({
              issuer: parameters.signingCertificate.issuer,
              serialNumber: parameters.signingCertificate.serialNumber
            }),
            signedAttrs: new SignedAndUnsignedAttributes({
              type: 0,
              attributes: signedAttr
            })
          }));
          await cmsSigned.sign(parameters.privateKey, 0, parameters.hashAlgorithm, void 0, crypto2);
          this.authSafe = new ContentInfo({
            contentType: "1.2.840.113549.1.7.2",
            content: cmsSigned.toSchema(true)
          });
        }
        break;
      default:
        throw new Error(`Parameter "integrityMode" has unknown value: ${this.parsedValue.integrityMode}`);
    }
  }
  async parseInternalValues(parameters, crypto2 = getCrypto(true)) {
    ArgumentError.assert(parameters, "parameters", "object");
    if (parameters.checkIntegrity === void 0) {
      parameters.checkIntegrity = true;
    }
    this.parsedValue = {};
    switch (this.authSafe.contentType) {
      case ContentInfo.DATA:
        {
          ParameterError.assertEmpty(parameters.password, "password");
          this.parsedValue.integrityMode = 0;
          ArgumentError.assert(this.authSafe.content, "authSafe.content", OctetString);
          const authSafeContent = this.authSafe.content.getValue();
          this.parsedValue.authenticatedSafe = AuthenticatedSafe.fromBER(authSafeContent);
          if (parameters.checkIntegrity) {
            if (!this.macData) {
              throw new Error('Absent "macData" value, can not check PKCS#12 data integrity');
            }
            const hashAlgorithm = crypto2.getAlgorithmByOID(this.macData.mac.digestAlgorithm.algorithmId, true, "digestAlgorithm");
            const result = await crypto2.verifyDataStampedWithPassword({
              password: parameters.password,
              hashAlgorithm: hashAlgorithm.name,
              salt: import_pvtsutils.BufferSourceConverter.toArrayBuffer(this.macData.macSalt.valueBlock.valueHexView),
              iterationCount: this.macData.iterations || 1,
              contentToVerify: authSafeContent,
              signatureToVerify: import_pvtsutils.BufferSourceConverter.toArrayBuffer(this.macData.mac.digest.valueBlock.valueHexView)
            });
            if (!result) {
              throw new Error("Integrity for the PKCS#12 data is broken!");
            }
          }
        }
        break;
      case ContentInfo.SIGNED_DATA:
        {
          this.parsedValue.integrityMode = 1;
          const cmsSigned = new SignedData({ schema: this.authSafe.content });
          const eContent = cmsSigned.encapContentInfo.eContent;
          ParameterError.assert(eContent, "eContent", "cmsSigned.encapContentInfo");
          ArgumentError.assert(eContent, "eContent", OctetString);
          const data = eContent.getValue();
          this.parsedValue.authenticatedSafe = AuthenticatedSafe.fromBER(data);
          const ok = await cmsSigned.verify({ signer: 0, checkChain: false }, crypto2);
          if (!ok) {
            throw new Error("Integrity for the PKCS#12 data is broken!");
          }
        }
        break;
      default:
        throw new Error(`Incorrect value for "this.authSafe.contentType": ${this.authSafe.contentType}`);
    }
  }
};
PFX.CLASS_NAME = "PFX";
var STATUS$1 = "status";
var STATUS_STRINGS = "statusStrings";
var FAIL_INFO = "failInfo";
var CLEAR_PROPS$2 = [
  STATUS$1,
  STATUS_STRINGS,
  FAIL_INFO
];
var PKIStatus;
(function(PKIStatus2) {
  PKIStatus2[PKIStatus2["granted"] = 0] = "granted";
  PKIStatus2[PKIStatus2["grantedWithMods"] = 1] = "grantedWithMods";
  PKIStatus2[PKIStatus2["rejection"] = 2] = "rejection";
  PKIStatus2[PKIStatus2["waiting"] = 3] = "waiting";
  PKIStatus2[PKIStatus2["revocationWarning"] = 4] = "revocationWarning";
  PKIStatus2[PKIStatus2["revocationNotification"] = 5] = "revocationNotification";
})(PKIStatus || (PKIStatus = {}));
var PKIStatusInfo = class _PKIStatusInfo extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.status = getParametersValue(parameters, STATUS$1, _PKIStatusInfo.defaultValues(STATUS$1));
    if (STATUS_STRINGS in parameters) {
      this.statusStrings = getParametersValue(parameters, STATUS_STRINGS, _PKIStatusInfo.defaultValues(STATUS_STRINGS));
    }
    if (FAIL_INFO in parameters) {
      this.failInfo = getParametersValue(parameters, FAIL_INFO, _PKIStatusInfo.defaultValues(FAIL_INFO));
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case STATUS$1:
        return 2;
      case STATUS_STRINGS:
        return [];
      case FAIL_INFO:
        return new BitString();
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case STATUS$1:
        return memberValue === _PKIStatusInfo.defaultValues(memberName);
      case STATUS_STRINGS:
        return memberValue.length === 0;
      case FAIL_INFO:
        return memberValue.isEqual(_PKIStatusInfo.defaultValues(memberName));
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || EMPTY_STRING2,
      value: [
        new Integer({ name: names.status || EMPTY_STRING2 }),
        new Sequence({
          optional: true,
          value: [
            new Repeated({
              name: names.statusStrings || EMPTY_STRING2,
              value: new Utf8String()
            })
          ]
        }),
        new BitString({
          name: names.failInfo || EMPTY_STRING2,
          optional: true
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$2);
    const asn1 = compareSchema(schema, schema, _PKIStatusInfo.schema({
      names: {
        status: STATUS$1,
        statusStrings: STATUS_STRINGS,
        failInfo: FAIL_INFO
      }
    }));
    AsnError.assertSchema(asn1, this.className);
    const _status = asn1.result.status;
    if (_status.valueBlock.isHexOnly === true || _status.valueBlock.valueDec < 0 || _status.valueBlock.valueDec > 5)
      throw new Error('PKIStatusInfo "status" has invalid value');
    this.status = _status.valueBlock.valueDec;
    if (STATUS_STRINGS in asn1.result)
      this.statusStrings = asn1.result.statusStrings;
    if (FAIL_INFO in asn1.result)
      this.failInfo = asn1.result.failInfo;
  }
  toSchema() {
    const outputArray = [];
    outputArray.push(new Integer({ value: this.status }));
    if (this.statusStrings) {
      outputArray.push(new Sequence({
        optional: true,
        value: this.statusStrings
      }));
    }
    if (this.failInfo) {
      outputArray.push(this.failInfo);
    }
    return new Sequence({
      value: outputArray
    });
  }
  toJSON() {
    const res = {
      status: this.status
    };
    if (this.statusStrings) {
      res.statusStrings = Array.from(this.statusStrings, (o) => o.toJSON());
    }
    if (this.failInfo) {
      res.failInfo = this.failInfo.toJSON();
    }
    return res;
  }
};
PKIStatusInfo.CLASS_NAME = "PKIStatusInfo";
var VERSION = "version";
var MESSAGE_IMPRINT = "messageImprint";
var REQ_POLICY = "reqPolicy";
var NONCE = "nonce";
var CERT_REQ = "certReq";
var EXTENSIONS = "extensions";
var TIME_STAMP_REQ = "TimeStampReq";
var TIME_STAMP_REQ_VERSION = `${TIME_STAMP_REQ}.${VERSION}`;
var TIME_STAMP_REQ_MESSAGE_IMPRINT = `${TIME_STAMP_REQ}.${MESSAGE_IMPRINT}`;
var TIME_STAMP_REQ_POLICY = `${TIME_STAMP_REQ}.${REQ_POLICY}`;
var TIME_STAMP_REQ_NONCE = `${TIME_STAMP_REQ}.${NONCE}`;
var TIME_STAMP_REQ_CERT_REQ = `${TIME_STAMP_REQ}.${CERT_REQ}`;
var TIME_STAMP_REQ_EXTENSIONS = `${TIME_STAMP_REQ}.${EXTENSIONS}`;
var CLEAR_PROPS$1 = [
  TIME_STAMP_REQ_VERSION,
  TIME_STAMP_REQ_MESSAGE_IMPRINT,
  TIME_STAMP_REQ_POLICY,
  TIME_STAMP_REQ_NONCE,
  TIME_STAMP_REQ_CERT_REQ,
  TIME_STAMP_REQ_EXTENSIONS
];
var TimeStampReq = class _TimeStampReq extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.version = getParametersValue(parameters, VERSION, _TimeStampReq.defaultValues(VERSION));
    this.messageImprint = getParametersValue(parameters, MESSAGE_IMPRINT, _TimeStampReq.defaultValues(MESSAGE_IMPRINT));
    if (REQ_POLICY in parameters) {
      this.reqPolicy = getParametersValue(parameters, REQ_POLICY, _TimeStampReq.defaultValues(REQ_POLICY));
    }
    if (NONCE in parameters) {
      this.nonce = getParametersValue(parameters, NONCE, _TimeStampReq.defaultValues(NONCE));
    }
    if (CERT_REQ in parameters) {
      this.certReq = getParametersValue(parameters, CERT_REQ, _TimeStampReq.defaultValues(CERT_REQ));
    }
    if (EXTENSIONS in parameters) {
      this.extensions = getParametersValue(parameters, EXTENSIONS, _TimeStampReq.defaultValues(EXTENSIONS));
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case VERSION:
        return 0;
      case MESSAGE_IMPRINT:
        return new MessageImprint();
      case REQ_POLICY:
        return EMPTY_STRING2;
      case NONCE:
        return new Integer();
      case CERT_REQ:
        return false;
      case EXTENSIONS:
        return [];
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case VERSION:
      case REQ_POLICY:
      case CERT_REQ:
        return memberValue === _TimeStampReq.defaultValues(memberName);
      case MESSAGE_IMPRINT:
        return MessageImprint.compareWithDefault("hashAlgorithm", memberValue.hashAlgorithm) && MessageImprint.compareWithDefault("hashedMessage", memberValue.hashedMessage);
      case NONCE:
        return memberValue.isEqual(_TimeStampReq.defaultValues(memberName));
      case EXTENSIONS:
        return memberValue.length === 0;
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || TIME_STAMP_REQ,
      value: [
        new Integer({ name: names.version || TIME_STAMP_REQ_VERSION }),
        MessageImprint.schema(names.messageImprint || {
          names: {
            blockName: TIME_STAMP_REQ_MESSAGE_IMPRINT
          }
        }),
        new ObjectIdentifier({
          name: names.reqPolicy || TIME_STAMP_REQ_POLICY,
          optional: true
        }),
        new Integer({
          name: names.nonce || TIME_STAMP_REQ_NONCE,
          optional: true
        }),
        new Boolean2({
          name: names.certReq || TIME_STAMP_REQ_CERT_REQ,
          optional: true
        }),
        new Constructed({
          optional: true,
          idBlock: {
            tagClass: 3,
            tagNumber: 0
          },
          value: [new Repeated({
            name: names.extensions || TIME_STAMP_REQ_EXTENSIONS,
            value: Extension.schema()
          })]
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS$1);
    const asn1 = compareSchema(schema, schema, _TimeStampReq.schema());
    AsnError.assertSchema(asn1, this.className);
    this.version = asn1.result[TIME_STAMP_REQ_VERSION].valueBlock.valueDec;
    this.messageImprint = new MessageImprint({ schema: asn1.result[TIME_STAMP_REQ_MESSAGE_IMPRINT] });
    if (TIME_STAMP_REQ_POLICY in asn1.result)
      this.reqPolicy = asn1.result[TIME_STAMP_REQ_POLICY].valueBlock.toString();
    if (TIME_STAMP_REQ_NONCE in asn1.result)
      this.nonce = asn1.result[TIME_STAMP_REQ_NONCE];
    if (TIME_STAMP_REQ_CERT_REQ in asn1.result)
      this.certReq = asn1.result[TIME_STAMP_REQ_CERT_REQ].valueBlock.value;
    if (TIME_STAMP_REQ_EXTENSIONS in asn1.result)
      this.extensions = Array.from(asn1.result[TIME_STAMP_REQ_EXTENSIONS], (element) => new Extension({ schema: element }));
  }
  toSchema() {
    const outputArray = [];
    outputArray.push(new Integer({ value: this.version }));
    outputArray.push(this.messageImprint.toSchema());
    if (this.reqPolicy)
      outputArray.push(new ObjectIdentifier({ value: this.reqPolicy }));
    if (this.nonce)
      outputArray.push(this.nonce);
    if (CERT_REQ in this && _TimeStampReq.compareWithDefault(CERT_REQ, this.certReq) === false)
      outputArray.push(new Boolean2({ value: this.certReq }));
    if (this.extensions) {
      outputArray.push(new Constructed({
        idBlock: {
          tagClass: 3,
          tagNumber: 0
        },
        value: Array.from(this.extensions, (o) => o.toSchema())
      }));
    }
    return new Sequence({
      value: outputArray
    });
  }
  toJSON() {
    const res = {
      version: this.version,
      messageImprint: this.messageImprint.toJSON()
    };
    if (this.reqPolicy !== void 0)
      res.reqPolicy = this.reqPolicy;
    if (this.nonce !== void 0)
      res.nonce = this.nonce.toJSON();
    if (this.certReq !== void 0 && _TimeStampReq.compareWithDefault(CERT_REQ, this.certReq) === false)
      res.certReq = this.certReq;
    if (this.extensions) {
      res.extensions = Array.from(this.extensions, (o) => o.toJSON());
    }
    return res;
  }
};
TimeStampReq.CLASS_NAME = "TimeStampReq";
var STATUS = "status";
var TIME_STAMP_TOKEN = "timeStampToken";
var TIME_STAMP_RESP = "TimeStampResp";
var TIME_STAMP_RESP_STATUS = `${TIME_STAMP_RESP}.${STATUS}`;
var TIME_STAMP_RESP_TOKEN = `${TIME_STAMP_RESP}.${TIME_STAMP_TOKEN}`;
var CLEAR_PROPS = [
  TIME_STAMP_RESP_STATUS,
  TIME_STAMP_RESP_TOKEN
];
var TimeStampResp = class _TimeStampResp extends PkiObject {
  constructor(parameters = {}) {
    super();
    this.status = getParametersValue(parameters, STATUS, _TimeStampResp.defaultValues(STATUS));
    if (TIME_STAMP_TOKEN in parameters) {
      this.timeStampToken = getParametersValue(parameters, TIME_STAMP_TOKEN, _TimeStampResp.defaultValues(TIME_STAMP_TOKEN));
    }
    if (parameters.schema) {
      this.fromSchema(parameters.schema);
    }
  }
  static defaultValues(memberName) {
    switch (memberName) {
      case STATUS:
        return new PKIStatusInfo();
      case TIME_STAMP_TOKEN:
        return new ContentInfo();
      default:
        return super.defaultValues(memberName);
    }
  }
  static compareWithDefault(memberName, memberValue) {
    switch (memberName) {
      case STATUS:
        return PKIStatusInfo.compareWithDefault(STATUS, memberValue.status) && "statusStrings" in memberValue === false && "failInfo" in memberValue === false;
      case TIME_STAMP_TOKEN:
        return memberValue.contentType === EMPTY_STRING2 && memberValue.content instanceof Any;
      default:
        return super.defaultValues(memberName);
    }
  }
  static schema(parameters = {}) {
    const names = getParametersValue(parameters, "names", {});
    return new Sequence({
      name: names.blockName || TIME_STAMP_RESP,
      value: [
        PKIStatusInfo.schema(names.status || {
          names: {
            blockName: TIME_STAMP_RESP_STATUS
          }
        }),
        ContentInfo.schema(names.timeStampToken || {
          names: {
            blockName: TIME_STAMP_RESP_TOKEN,
            optional: true
          }
        })
      ]
    });
  }
  fromSchema(schema) {
    clearProps(schema, CLEAR_PROPS);
    const asn1 = compareSchema(schema, schema, _TimeStampResp.schema());
    AsnError.assertSchema(asn1, this.className);
    this.status = new PKIStatusInfo({ schema: asn1.result[TIME_STAMP_RESP_STATUS] });
    if (TIME_STAMP_RESP_TOKEN in asn1.result)
      this.timeStampToken = new ContentInfo({ schema: asn1.result[TIME_STAMP_RESP_TOKEN] });
  }
  toSchema() {
    const outputArray = [];
    outputArray.push(this.status.toSchema());
    if (this.timeStampToken) {
      outputArray.push(this.timeStampToken.toSchema());
    }
    return new Sequence({
      value: outputArray
    });
  }
  toJSON() {
    const res = {
      status: this.status.toJSON()
    };
    if (this.timeStampToken) {
      res.timeStampToken = this.timeStampToken.toJSON();
    }
    return res;
  }
  async sign(privateKey, hashAlgorithm, crypto2 = getCrypto(true)) {
    this.assertContentType();
    const signed = new SignedData({ schema: this.timeStampToken.content });
    return signed.sign(privateKey, 0, hashAlgorithm, void 0, crypto2);
  }
  async verify(verificationParameters = { signer: 0, trustedCerts: [], data: EMPTY_BUFFER2 }, crypto2 = getCrypto(true)) {
    this.assertContentType();
    const signed = new SignedData({ schema: this.timeStampToken.content });
    return signed.verify(verificationParameters, crypto2);
  }
  assertContentType() {
    if (!this.timeStampToken) {
      throw new Error("timeStampToken is absent in TSP response");
    }
    if (this.timeStampToken.contentType !== id_ContentType_SignedData) {
      throw new Error(`Wrong format of timeStampToken: ${this.timeStampToken.contentType}`);
    }
  }
};
TimeStampResp.CLASS_NAME = "TimeStampResp";
function initCryptoEngine() {
  if (typeof self !== "undefined") {
    if ("crypto" in self) {
      let engineName = "webcrypto";
      if ("webkitSubtle" in self.crypto) {
        engineName = "safari";
      }
      setEngine(engineName, new CryptoEngine({ name: engineName, crypto }));
    }
  } else if (typeof crypto !== "undefined" && "webcrypto" in crypto) {
    const name = "NodeJS ^15";
    const nodeCrypto = crypto.webcrypto;
    setEngine(name, new CryptoEngine({ name, crypto: nodeCrypto }));
  }
}
initCryptoEngine();

// node_modules/cose/dist/browser/runtime/browser/pkijs.js
setEngine("webcrypto", new CryptoEngine({
  name: "webcrypto",
  crypto,
  subtle: crypto.subtle
}));

// node_modules/cose/dist/browser/lib/buffer_utils.js
var encoder2 = new TextEncoder();
var decoder3 = new TextDecoder();
function areEqual(buf1, buf2) {
  if (buf1 === buf2) {
    return true;
  }
  if (buf1.byteLength !== buf2.byteLength) {
    return false;
  }
  for (let i = 0; i < buf1.byteLength; i++) {
    if (buf1[i] !== buf2[i]) {
      return false;
    }
  }
  return true;
}
var fromUTF8 = (input) => encoder2.encode(input);

// node_modules/cose/dist/browser/runtime/browser/base64.js
var encodeBase642 = (input) => {
  let unencoded = input;
  if (typeof unencoded === "string") {
    unencoded = encoder2.encode(unencoded);
  }
  const CHUNK_SIZE = 32768;
  const arr = [];
  for (let i = 0; i < unencoded.length; i += CHUNK_SIZE) {
    arr.push(String.fromCharCode.apply(null, unencoded.subarray(i, i + CHUNK_SIZE)));
  }
  return btoa(arr.join(""));
};
var encodeBase64URL = (input) => {
  return encodeBase642(input).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
};
var decodeBase642 = (encoded) => {
  const binary = atob(encoded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
};

// node_modules/cose/dist/browser/util/errors.js
var COSEError = class extends Error {
  static get code() {
    return "ERR_COSE_GENERIC";
  }
  constructor(message3) {
    var _a3;
    super(message3);
    this.code = "ERR_COSE_GENERIC";
    this.name = this.constructor.name;
    (_a3 = Error.captureStackTrace) === null || _a3 === void 0 ? void 0 : _a3.call(Error, this, this.constructor);
  }
};
var COSENotSupported = class extends COSEError {
  constructor() {
    super(...arguments);
    this.code = "ERR_COSE_NOT_SUPPORTED";
  }
  static get code() {
    return "ERR_COSE_NOT_SUPPORTED";
  }
};
var X509NoMatchingCertificate = class extends COSEError {
  constructor() {
    super(...arguments);
    this.code = "ERR_X509_NO_MATCHING_CERTIFICATE";
    this.message = "no applicable certificate found in the COSE headers";
  }
  static get code() {
    return "ERR_X509_NO_MATCHING_CERTIFICATE";
  }
};
var X509InvalidCertificateChain = class extends COSEError {
  constructor() {
    super(...arguments);
    this.code = "ERR_X509_INVALID_CERTIFICATE_CHAIN";
  }
  static get code() {
    return "ERR_X509_INVALID_CERTIFICATE_CHAIN";
  }
};

// node_modules/cose/dist/browser/util/cert.js
var pemToCert = (cert) => {
  const pem = /-----BEGIN (\w*)-----([^-]*)-----END (\w*)-----/g.exec(cert.toString());
  if (pem && pem.length > 0) {
    return pem[2].replace(/[\n|\r\n]/g, "");
  }
  return "";
};
var certToPEM = (cert) => {
  return `-----BEGIN CERTIFICATE-----
${encodeBase642(cert).trim()}
-----END CERTIFICATE-----`;
};

// node_modules/cose/dist/browser/cbor.js
var encoder3 = new Encoder({
  tagUint8Array: false,
  useRecords: false,
  mapsAsObjects: false,
  useTag259ForMaps: false
});
var addExtension3 = addExtension2;

// node_modules/cose/dist/browser/headers.js
var algs = /* @__PURE__ */ new Map([
  [-8, { name: "EdDSA" }],
  [-7, { name: "ES256", hash: "SHA-256" }],
  [-35, { name: "ES384", hash: "SHA-384" }],
  [-36, { name: "ES512", hash: "SHA-512" }],
  [-37, { name: "PS256", hash: "SHA-256" }],
  [-38, { name: "PS384", hash: "SHA-384" }],
  [-39, { name: "PS512", hash: "SHA-512" }],
  [-257, { name: "RS256", hash: "SHA-256" }],
  [-258, { name: "RS384", hash: "SHA-384" }],
  [-259, { name: "RS512", hash: "SHA-512" }]
]);
var macAlgs = /* @__PURE__ */ new Map([
  [5, { name: "HS256", hash: "SHA-256", length: 256 }]
]);
var macAlgsToValue = /* @__PURE__ */ new Map([
  ["HS256", 5]
]);
var algsToValue = /* @__PURE__ */ new Map([
  ["EdDSA", -8],
  ["ES256", -7],
  ["ES384", -35],
  ["ES512", -36],
  ["PS256", -37],
  ["PS384", -38],
  ["PS512", -39],
  ["RS256", -257],
  ["RS384", -258],
  ["RS512", -259]
]);
var headers = {
  partyUNonce: -22,
  static_key_id: -3,
  static_key: -2,
  ephemeral_key: -1,
  alg: 1,
  crit: 2,
  ctyp: 3,
  kid: 4,
  IV: 5,
  Partial_IV: 6,
  counter_signature: 7,
  x5bag: 32,
  x5chain: 33,
  x5t: 34,
  x5u: 35
};
var encodeProtectedHeaders = (protectedHeader) => {
  if (typeof protectedHeader === "undefined") {
    return new Uint8Array();
  }
  return encoder3.encode(new Map(Object.entries(protectedHeader || {}).map(([k, v]) => {
    if (k === "alg") {
      v = algsToValue.get(v);
    } else if (typeof v === "string") {
      v = fromUTF8(v);
    }
    return [headers[k], v];
  })));
};
var mapUnprotectedHeaders = (unprotectedHeader) => {
  return new Map(Object.entries(unprotectedHeader || {}).map(([k, v]) => {
    if (typeof v === "string") {
      v = fromUTF8(v);
    }
    return [headers[k], v];
  }));
};

// node_modules/cose/dist/browser/cose/WithHeaders.js
var __classPrivateFieldSet = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _WithHeaders_decodedProtectedHeaders;
var WithHeaders = class {
  constructor(protectedHeaders, unprotectedHeaders) {
    this.unprotectedHeaders = unprotectedHeaders;
    _WithHeaders_decodedProtectedHeaders.set(this, void 0);
    if (protectedHeaders instanceof Uint8Array) {
      this.encodedProtectedHeaders = protectedHeaders;
    } else {
      __classPrivateFieldSet(this, _WithHeaders_decodedProtectedHeaders, protectedHeaders, "f");
      this.encodedProtectedHeaders = encoder3.encode(protectedHeaders);
    }
  }
  get protectedHeaders() {
    if (!__classPrivateFieldGet(this, _WithHeaders_decodedProtectedHeaders, "f")) {
      if (!this.encodedProtectedHeaders || this.encodedProtectedHeaders.byteLength === 0) {
        __classPrivateFieldSet(this, _WithHeaders_decodedProtectedHeaders, /* @__PURE__ */ new Map(), "f");
      } else {
        __classPrivateFieldSet(this, _WithHeaders_decodedProtectedHeaders, encoder3.decode(this.encodedProtectedHeaders), "f");
      }
    }
    return __classPrivateFieldGet(this, _WithHeaders_decodedProtectedHeaders, "f");
  }
};
_WithHeaders_decodedProtectedHeaders = /* @__PURE__ */ new WeakMap();

// node_modules/cose/dist/browser/cose/SignatureBase.js
var SignatureBase = class extends WithHeaders {
  constructor(protectedHeader, unprotectedHeader, signature) {
    super(protectedHeader, unprotectedHeader);
    this.signature = signature;
  }
  get alg() {
    return this.protectedHeaders.get(headers.alg) || this.unprotectedHeaders.get(headers.alg);
  }
  get algName() {
    var _a3;
    return this.alg ? (_a3 = algs.get(this.alg)) === null || _a3 === void 0 ? void 0 : _a3.name : void 0;
  }
  get kid() {
    return this.protectedHeaders.get(headers.kid) || this.unprotectedHeaders.get(headers.kid);
  }
  get x5bag() {
    const x5bag = this.protectedHeaders.get(headers.x5bag) || this.unprotectedHeaders.get(headers.x5bag);
    if (!x5bag) {
      return;
    }
    return Array.isArray(x5bag) ? x5bag : [x5bag];
  }
  get x5chain() {
    const x5chain = this.protectedHeaders.get(headers.x5chain) || this.unprotectedHeaders.get(headers.x5chain);
    if (!x5chain) {
      return;
    }
    return Array.isArray(x5chain) ? x5chain : [x5chain];
  }
  async verifyX509Chain(caRoots) {
    const { x5chain } = this;
    if (!x5chain || x5chain.length === 0) {
      throw new X509NoMatchingCertificate();
    }
    const chainEngine = new index_es_exports.CertificateChainValidationEngine({
      certs: x5chain.map((c) => index_es_exports.Certificate.fromBER(c)),
      trustedCerts: caRoots.map((c) => index_es_exports.Certificate.fromBER(decodeBase642(pemToCert(c))))
    });
    const chain = await chainEngine.verify();
    if (!chain.result) {
      throw new X509InvalidCertificateChain(chain.resultMessage);
    }
    const x509Cert = certToPEM(x5chain[0]);
    const publicKey = await importX509(x509Cert, this.algName);
    return { publicKey, raw: x5chain[0] };
  }
};

// node_modules/cose/dist/browser/runtime/browser/subtle_dsa.js
function subtleDsa2(alg, algorithm) {
  const hash2 = `SHA-${alg.slice(-3)}`;
  switch (alg) {
    case "HS256":
    case "HS384":
    case "HS512":
      return { hash: hash2, name: "HMAC" };
    case "PS256":
    case "PS384":
    case "PS512":
      return { hash: hash2, name: "RSA-PSS", saltLength: alg.slice(-3) >> 3 };
    case "RS256":
    case "RS384":
    case "RS512":
      return { hash: hash2, name: "RSASSA-PKCS1-v1_5" };
    case "ES256":
    case "ES384":
    case "ES512":
      return { hash: hash2, name: "ECDSA", namedCurve: algorithm.namedCurve };
    case "EdDSA":
      return { name: algorithm.name };
    default:
      throw new COSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
  }
}

// node_modules/cose/dist/browser/runtime/browser/webcrypto.js
var webcrypto_default2 = crypto;
var isCryptoKey2 = (key) => key instanceof CryptoKey;

// node_modules/cose/dist/browser/runtime/browser/check_key_length.js
var check_key_length_default2 = (alg, key) => {
  if (alg.startsWith("RS") || alg.startsWith("PS")) {
    const { modulusLength } = key.algorithm;
    if (typeof modulusLength !== "number" || modulusLength < 2048) {
      throw new TypeError(`${alg} requires key modulusLength to be 2048 bits or larger`);
    }
  }
};

// node_modules/cose/dist/browser/lib/crypto_key.js
function unusable(name, prop = "algorithm.name") {
  return new TypeError(`CryptoKey does not support this operation, its ${prop} must be ${name}`);
}
function isAlgorithm(algorithm, name) {
  return algorithm.name === name;
}
function getHashLength(hash2) {
  return parseInt(hash2.name.slice(4), 10);
}
function getNamedCurve2(alg) {
  switch (alg) {
    case "ES256":
      return "P-256";
    case "ES384":
      return "P-384";
    case "ES512":
      return "P-521";
    default:
      throw new Error("unreachable");
  }
}
function checkUsage(key, usages) {
  if (usages.length && !usages.some((expected) => key.usages.includes(expected))) {
    let msg = "CryptoKey does not support this operation, its usages must include ";
    if (usages.length > 2) {
      const last = usages.pop();
      msg += `one of ${usages.join(", ")}, or ${last}.`;
    } else if (usages.length === 2) {
      msg += `one of ${usages[0]} or ${usages[1]}.`;
    } else {
      msg += `${usages[0]}.`;
    }
    throw new TypeError(msg);
  }
}
function checkSigCryptoKey2(key, alg, ...usages) {
  switch (alg) {
    case "HS256":
    case "HS384":
    case "HS512": {
      if (!isAlgorithm(key.algorithm, "HMAC"))
        throw unusable("HMAC");
      const expected = parseInt(alg.slice(2), 10);
      const actual = getHashLength(key.algorithm.hash);
      if (actual !== expected)
        throw unusable(`SHA-${expected}`, "algorithm.hash");
      break;
    }
    case "RS256":
    case "RS384":
    case "RS512": {
      if (!isAlgorithm(key.algorithm, "RSASSA-PKCS1-v1_5"))
        throw unusable("RSASSA-PKCS1-v1_5");
      const expected = parseInt(alg.slice(2), 10);
      const actual = getHashLength(key.algorithm.hash);
      if (actual !== expected)
        throw unusable(`SHA-${expected}`, "algorithm.hash");
      break;
    }
    case "PS256":
    case "PS384":
    case "PS512": {
      if (!isAlgorithm(key.algorithm, "RSA-PSS"))
        throw unusable("RSA-PSS");
      const expected = parseInt(alg.slice(2), 10);
      const actual = getHashLength(key.algorithm.hash);
      if (actual !== expected)
        throw unusable(`SHA-${expected}`, "algorithm.hash");
      break;
    }
    case "EdDSA": {
      if (key.algorithm.name !== "Ed25519" && key.algorithm.name !== "Ed448") {
        throw unusable("Ed25519 or Ed448");
      }
      break;
    }
    case "ES256":
    case "ES384":
    case "ES512": {
      if (!isAlgorithm(key.algorithm, "ECDSA"))
        throw unusable("ECDSA");
      const expected = getNamedCurve2(alg);
      const actual = key.algorithm.namedCurve;
      if (actual !== expected)
        throw unusable(expected, "algorithm.namedCurve");
      break;
    }
    default:
      throw new TypeError("CryptoKey does not support this operation");
  }
  checkUsage(key, usages);
}

// node_modules/cose/dist/browser/lib/invalid_key_input.js
function message2(msg, actual, ...types3) {
  if (types3.length > 2) {
    const last = types3.pop();
    msg += `one of type ${types3.join(", ")}, or ${last}.`;
  } else if (types3.length === 2) {
    msg += `one of type ${types3[0]} or ${types3[1]}.`;
  } else {
    msg += `of type ${types3[0]}.`;
  }
  if (actual == null) {
    msg += ` Received ${actual}`;
  } else if (typeof actual === "function" && actual.name) {
    msg += ` Received function ${actual.name}`;
  } else if (typeof actual === "object" && actual != null) {
    if (actual.constructor && actual.constructor.name) {
      msg += ` Received an instance of ${actual.constructor.name}`;
    }
  }
  return msg;
}
var invalid_key_input_default2 = (actual, ...types3) => {
  return message2("Key must be ", actual, ...types3);
};

// node_modules/cose/dist/browser/runtime/browser/is_key_like.js
var types2 = ["CryptoKey"];

// node_modules/cose/dist/browser/runtime/browser/get_sign_verify_key.js
function getCryptoKey2(alg, key, usage) {
  if (isCryptoKey2(key)) {
    checkSigCryptoKey2(key, alg, usage);
    return key;
  }
  if (key instanceof Uint8Array) {
    if (!alg.startsWith("HS")) {
      throw new TypeError(invalid_key_input_default2(key, ...types2));
    }
    return webcrypto_default2.subtle.importKey("raw", key, { hash: `SHA-${alg.slice(-3)}`, name: "HMAC" }, false, [usage]);
  }
  throw new TypeError(invalid_key_input_default2(key, ...types2, "Uint8Array"));
}

// node_modules/cose/dist/browser/runtime/browser/verify.js
var verify = async (alg, key, signature, data) => {
  const cryptoKey = await getCryptoKey2(alg, key, "verify");
  check_key_length_default2(alg, cryptoKey);
  const algorithm = subtleDsa2(alg, cryptoKey.algorithm);
  try {
    return await webcrypto_default2.subtle.verify(algorithm, cryptoKey, signature, data);
  } catch (_a3) {
    return false;
  }
};
var verify_default2 = verify;

// node_modules/cose/dist/browser/runtime/browser/sign.js
var sign = async (alg, key, data) => {
  const cryptoKey = await getCryptoKey2(alg, key, "sign");
  check_key_length_default2(alg, cryptoKey);
  const signature = await webcrypto_default2.subtle.sign(subtleDsa2(alg, cryptoKey.algorithm), cryptoKey, data);
  return new Uint8Array(signature);
};
var sign_default2 = sign;

// node_modules/cose/dist/browser/cose/Sign.js
var Sign = class _Sign extends WithHeaders {
  constructor(protectedHeader, unprotectedHeader, payload, signatures) {
    super(protectedHeader, unprotectedHeader);
    this.payload = payload;
    this.signatures = signatures;
  }
  getContentForEncoding() {
    return [
      this.encodedProtectedHeaders,
      this.unprotectedHeaders,
      this.payload,
      this.signatures.map((signature) => [
        signature.protectedHeaders,
        signature.unprotectedHeaders,
        signature.signature
      ])
    ];
  }
  encode() {
    return encoder3.encode(this);
  }
  async verify(keys) {
    const results = await Promise.all(this.signatures.map(async (signature, index) => {
      const keyToUse = Array.isArray(keys) ? keys[index] : keys;
      return signature.verify(keyToUse, this.encodedProtectedHeaders, this.payload);
    }));
    return results.every(Boolean);
  }
  async verifyX509(roots) {
    const results = await Promise.all(this.signatures.map(async (signature) => {
      const { publicKey } = await signature.verifyX509Chain(roots);
      return signature.verify(publicKey, this.encodedProtectedHeaders, this.payload);
    }));
    return results.every(Boolean);
  }
  static async sign(bodyProtectedHeader, unprotectedHeader, payload, signers) {
    const encodedProtectedHeaders = encodeProtectedHeaders(bodyProtectedHeader);
    const unprotectedHeadersMap = mapUnprotectedHeaders(unprotectedHeader);
    const signatures = await Promise.all(signers.map(async ({ key, protectedHeader, unprotectedHeader: unprotectedHeader2 }) => {
      return Signature2.sign(encodedProtectedHeaders, protectedHeader, unprotectedHeader2, payload, key);
    }));
    return new _Sign(encodedProtectedHeaders, unprotectedHeadersMap, payload, signatures);
  }
};
var Signature2 = class _Signature extends SignatureBase {
  constructor(protectedHeader, unprotectedHeaders, signature) {
    super(protectedHeader, unprotectedHeaders, signature);
    this.unprotectedHeaders = unprotectedHeaders;
    this.signature = signature;
  }
  static Signature(bodyProtectedHeaders, protectedHeaders, applicationHeaders, payload) {
    return encoder3.encode([
      "Signature",
      bodyProtectedHeaders || new Uint8Array(),
      protectedHeaders || new Uint8Array(),
      applicationHeaders || new Uint8Array(),
      payload
    ]);
  }
  async verify(key, bodyProtectedHeaders, payload) {
    if (typeof key === "function") {
      key = await key(this);
    }
    if (!key) {
      throw new Error("key not found");
    }
    const toBeSigned = _Signature.Signature(bodyProtectedHeaders, this.encodedProtectedHeaders, new Uint8Array(), payload);
    if (!this.algName) {
      throw new Error("unknown algorithm: " + this.alg);
    }
    return verify_default2(this.algName, key, this.signature, toBeSigned);
  }
  static async sign(bodyProtectedHeaders, protectedHeader, unprotectedHeader, payload, key) {
    const { alg } = protectedHeader;
    const encodedProtectedHeaders = encodeProtectedHeaders(protectedHeader);
    const unprotectedHeadersMapped = mapUnprotectedHeaders(unprotectedHeader);
    const toBeSigned = _Signature.Signature(bodyProtectedHeaders, encodedProtectedHeaders, new Uint8Array(), payload);
    if (!alg) {
      throw new Error("The alg header must be set.");
    }
    const signature = await sign_default2(alg, key, toBeSigned);
    return new _Signature(encodedProtectedHeaders, unprotectedHeadersMapped, signature);
  }
};
addExtension3({
  Class: Sign,
  tag: 98,
  encode(instance, encode3) {
    return encode3(instance.getContentForEncoding());
  },
  decode: (data) => {
    const signatures = data[3].map((signature) => new Signature2(signature[0], signature[1], signature[2]));
    return new Sign(data[0], data[1], data[2], signatures);
  }
});

// node_modules/cose/dist/browser/cose/Sign1.js
var Sign1 = class _Sign1 extends SignatureBase {
  constructor(protectedHeader, unprotectedHeader, payload, signature) {
    super(protectedHeader, unprotectedHeader, signature);
    this.payload = payload;
  }
  getContentForEncoding() {
    return [
      this.encodedProtectedHeaders,
      this.unprotectedHeaders,
      this.payload,
      this.signature
    ];
  }
  encode() {
    return encoder3.encode(this);
  }
  static Signature1(protectedHeader, applicationHeaders, payload) {
    return encoder3.encode([
      "Signature1",
      protectedHeader,
      applicationHeaders,
      payload
    ]);
  }
  async verify(key, externalAAD = new Uint8Array()) {
    if (typeof key === "function") {
      key = await key(this);
    }
    if (!key) {
      throw new Error("key not found");
    }
    const toBeSigned = _Sign1.Signature1(this.encodedProtectedHeaders || new Uint8Array(), externalAAD, this.payload);
    if (!this.algName) {
      throw new Error("unknown algorithm: " + this.alg);
    }
    return verify_default2(this.algName, key, this.signature, toBeSigned);
  }
  async verifyX509(roots) {
    const { publicKey } = await this.verifyX509Chain(roots);
    return this.verify(publicKey);
  }
  static async sign(protectedHeader, unprotectedHeader, payload, key) {
    const { alg } = protectedHeader;
    const encodedProtectedHeaders = encoder3.encode(new Map(Object.entries(protectedHeader).map(([k, v]) => {
      if (k === "alg") {
        v = algsToValue.get(v);
      } else if (typeof v === "string") {
        v = fromUTF8(v);
      }
      return [headers[k], v];
    })));
    const unprotectedHeadersMap = new Map(Object.entries(unprotectedHeader || {}).map(([k, v]) => {
      if (typeof v === "string") {
        v = fromUTF8(v);
      }
      return [headers[k], v];
    }));
    const toBeSigned = _Sign1.Signature1(encodedProtectedHeaders, new Uint8Array(), payload);
    if (!alg) {
      throw new Error("The alg header must be set.");
    }
    const signature = await sign_default2(alg, key, toBeSigned);
    return new _Sign1(encodedProtectedHeaders, unprotectedHeadersMap, payload, signature);
  }
};
addExtension3({
  Class: Sign1,
  tag: 18,
  encode(instance, encodeFn) {
    return encodeFn(instance.getContentForEncoding());
  },
  decode: (data) => {
    return new Sign1(data[0], data[1], data[2], data[3]);
  }
});

// node_modules/cose/dist/browser/cose/Mac0.js
var Mac0 = class _Mac0 extends WithHeaders {
  constructor(protectedHeader, unprotectedHeader, payload, tag) {
    super(protectedHeader, unprotectedHeader);
    this.payload = payload;
    this.tag = tag;
  }
  static createMAC0(protectedHeader, applicationHeaders, payload) {
    return encoder3.encode([
      "MAC0",
      protectedHeader,
      applicationHeaders,
      payload
    ]);
  }
  getContentForEncoding() {
    return [
      this.encodedProtectedHeaders,
      this.unprotectedHeaders,
      this.payload,
      this.tag
    ];
  }
  encode() {
    return encoder3.encode(this);
  }
  async verify(key, externalAAD = new Uint8Array()) {
    if (!key) {
      throw new Error("key not found");
    }
    const mac0Structure = _Mac0.createMAC0(this.encodedProtectedHeaders || new Uint8Array(), externalAAD, this.payload);
    if (!this.algName) {
      throw new Error("unknown algorithm: " + this.alg);
    }
    return verify_default2(this.algName, key, this.tag, mac0Structure);
  }
  get alg() {
    return this.protectedHeaders.get(headers.alg) || this.unprotectedHeaders.get(headers.alg);
  }
  get algName() {
    var _a3;
    return this.alg ? (_a3 = macAlgs.get(this.alg)) === null || _a3 === void 0 ? void 0 : _a3.name : void 0;
  }
  hasSupportedAlg() {
    return !!this.algName;
  }
  areEqual(mac0) {
    return areEqual(this.tag, mac0.tag);
  }
  static async create(protectedHeader, unprotectedHeader, payload, key) {
    const { alg } = protectedHeader;
    const encodedProtectedHeaders = encoder3.encode(new Map(Object.entries(protectedHeader).map(([k, v]) => {
      if (k === "alg") {
        v = macAlgsToValue.get(v);
      } else if (typeof v === "string") {
        v = fromUTF8(v);
      }
      return [headers[k], v];
    })));
    const unprotectedHeadersMap = new Map(Object.entries(unprotectedHeader || {}).map(([k, v]) => {
      if (typeof v === "string") {
        v = fromUTF8(v);
      }
      return [headers[k], v];
    }));
    const toBeSigned = _Mac0.createMAC0(encodedProtectedHeaders, new Uint8Array(), payload);
    if (!alg) {
      throw new Error("The alg header must be set.");
    }
    const tag = await sign_default2(alg, key, toBeSigned);
    return new _Mac0(encodedProtectedHeaders, unprotectedHeadersMap, payload, tag);
  }
};
addExtension3({
  Class: Mac0,
  tag: 17,
  encode(instance, encodeFn) {
    return encodeFn(instance.getContentForEncoding());
  },
  decode: (data) => {
    return new Mac0(data[0], data[1], data[2], data[3]);
  }
});

// node_modules/cose/dist/browser/key/kty.js
var KeyType;
(function(KeyType2) {
  KeyType2[KeyType2["OKP"] = 1] = "OKP";
  KeyType2[KeyType2["EC2"] = 2] = "EC2";
  KeyType2[KeyType2["Symmetric"] = 4] = "Symmetric";
  KeyType2[KeyType2["Reserved"] = 0] = "Reserved";
})(KeyType || (KeyType = {}));
var ValueToKeyType = /* @__PURE__ */ new Map([
  [1, "OKP"],
  [2, "EC"],
  [4, "Symmetric"],
  [0, "Reserved"]
]);

// node_modules/cose/dist/browser/key/labels.js
var Label;
(function(Label2) {
  Label2[Label2["kty"] = 1] = "kty";
  Label2[Label2["kid"] = 2] = "kid";
  Label2[Label2["alg"] = 3] = "alg";
  Label2[Label2["key_opts"] = 4] = "key_opts";
  Label2[Label2["base_iv"] = 5] = "base_iv";
  Label2[Label2["crv"] = -1] = "crv";
  Label2[Label2["x"] = -2] = "x";
  Label2[Label2["y"] = -3] = "y";
  Label2[Label2["d"] = -4] = "d";
})(Label || (Label = {}));

// node_modules/cose/dist/browser/key/algs.js
var table = [
  { name: "P-256", value: 1, keyType: "EC2", description: "NIST P-256 also known as secp256r1" },
  { name: "P-384", value: 2, keyType: "EC2", description: "NIST P-384 also known as secp384r1" },
  { name: "P-521", value: 3, keyType: "EC2", description: "NIST P-521 also known as secp521r1" },
  { name: "X25519", value: 4, keyType: "OKP", description: "X25519 for use w/ ECDH only" },
  { name: "X448", value: 5, keyType: "OKP", description: "X448 for use w/ ECDH only" },
  { name: "Ed25519", value: 6, keyType: "OKP", description: "Ed25519 for use w/ EdDSA only" },
  { name: "Ed448", value: 7, keyType: "OKP", description: "Ed448 for use w/ EdDSA only" }
];
var valueToKeyTypeMap = /* @__PURE__ */ new Map();
for (const entry of table) {
  valueToKeyTypeMap.set(entry.value, entry);
}
var Curves;
(function(Curves2) {
  Curves2[Curves2["P_256"] = 1] = "P_256";
  Curves2[Curves2["P_384"] = 2] = "P_384";
  Curves2[Curves2["P_521"] = 3] = "P_521";
  Curves2[Curves2["X25519"] = 4] = "X25519";
  Curves2[Curves2["X448"] = 5] = "X448";
  Curves2[Curves2["Ed25519"] = 6] = "Ed25519";
  Curves2[Curves2["Ed448"] = 7] = "Ed448";
})(Curves || (Curves = {}));
var ValuesToCurves = /* @__PURE__ */ new Map([
  [1, "P-256"],
  [2, "P-384"],
  [3, "P-521"],
  [4, "X25519"],
  [5, "X448"],
  [6, "Ed25519"],
  [7, "Ed448"]
]);

// node_modules/cose/dist/browser/key/index.js
var parameterParsers = /* @__PURE__ */ new Map([
  [Label.kty, (value) => ValueToKeyType.get(value)],
  [Label.crv, (value) => ValuesToCurves.get(value)],
  [Label.kid, (v) => v],
  [Label.x, encodeBase64URL],
  [Label.y, encodeBase64URL],
  [Label.d, encodeBase64URL]
]);

// src/lib/cose/index.ts
var createCoseSignature = async (protectedHeaders, unprotectedHeaders, payload, key) => {
  const sign1 = await Sign1.sign(protectedHeaders, unprotectedHeaders, payload, key);
  const tes = sign1.getContentForEncoding();
  return sign1.getContentForEncoding();
};

// src/lib/crypto/web/webcrypto.ts
var webcrypto_default3 = crypto;

// src/lib/crypto/web/web.ts
function getRandomBytes(len) {
  return webcrypto_default3.getRandomValues(new Uint8Array(len));
}
async function hash(data, algo) {
  return new Uint8Array(await webcrypto_default3.subtle.digest(algo, data));
}

// src/lib/MDOCBuilder.ts
var MDOCBuilder = class {
  defaultDocType = "org.iso.18013.5.1.mDL";
  defaultNamespace = "org.iso.18013.5.1";
  digestAlgo = "SHA-256";
  namespaces = /* @__PURE__ */ new Set();
  mapOfDigests = {};
  mapOfHashes = {};
  issuerCertificatePem;
  issuerPrivateKeyPem;
  devicePublicKey;
  constructor(issuerCertificatePem, issuerPrivateKeyPem, devicePublicKey) {
    this.issuerCertificatePem = issuerCertificatePem;
    this.issuerPrivateKeyPem = issuerPrivateKeyPem;
    this.devicePublicKey = devicePublicKey;
  }
  async addNameSpace(namespace, values) {
    if (namespace === this.defaultNamespace) {
      this.validateValues(values);
    }
    this.namespaces.add(namespace);
    this.mapOfDigests[namespace] = {};
    this.mapOfHashes[namespace] = /* @__PURE__ */ new Map();
    let digestCounter = 0;
    for (const [key, value] of Object.entries(values)) {
      const { itemBytes, hash: hash2 } = await this.processAttribute(key, value, digestCounter);
      this.mapOfDigests[namespace][digestCounter] = itemBytes;
      this.mapOfHashes[namespace].set(digestCounter, hash2);
      digestCounter++;
      if (key === "birth_date") {
        const ageInYears = this.getAgeInYears(value);
        {
          const over21 = ageInYears >= 21;
          const { itemBytes: itemBytes2, hash: hash3 } = await this.processAttribute("age_over_21", over21, digestCounter);
          this.mapOfDigests[namespace][digestCounter] = itemBytes2;
          this.mapOfHashes[namespace].set(digestCounter, hash3);
          digestCounter++;
        }
        {
          const { itemBytes: itemBytes2, hash: hash3 } = await this.processAttribute(
            `age_over_${Math.floor(ageInYears)}`,
            true,
            digestCounter
          );
          this.mapOfDigests[namespace][digestCounter] = itemBytes2;
          this.mapOfHashes[namespace].set(digestCounter, hash3);
          digestCounter++;
        }
      }
    }
  }
  async save() {
    const issuerAuth = await this.buildMSO();
    const nameSpaces = {};
    for (const ns of this.namespaces.values()) {
      nameSpaces[ns] = [];
      for (const [_, val] of Object.entries(this.mapOfDigests[ns])) {
        nameSpaces[ns].push(val);
      }
    }
    const mdl = {
      version: "1.0",
      documents: [
        {
          docType: this.defaultDocType,
          issuerSigned: {
            nameSpaces,
            issuerAuth
          }
        }
      ],
      status: 0
    };
    const mdlCbor = cborEncode(mdl);
    return mdlCbor;
  }
  /**  ---- Internal ----  */
  async processAttribute(key, value, digestID) {
    const salt = getRandomBytes(32);
    const encodedValue = maybeEncodeValue(key, value);
    const digest = {
      digestID,
      random: salt,
      elementIdentifier: key,
      elementValue: encodedValue
    };
    const itemBytes = DataItem.fromData(digest);
    const hash2 = await this.hashDigest(itemBytes);
    return { itemBytes, hash: hash2 };
  }
  async hashDigest(itemBytes) {
    const encoded = cborEncode(itemBytes);
    const sha256Hash = await hash(encoded, this.digestAlgo);
    return sha256Hash;
  }
  validateValues(values) {
  }
  formatDate(date) {
    return date.toISOString().split(".")[0] + "Z";
  }
  async buildMSO() {
    const issuerPrivateKey = await importPKCS8(this.issuerPrivateKeyPem, "");
    const devicePublicKeyJwk = await exportJWK(this.devicePublicKey);
    const issuerPublicKeyBuffer = fromPEM(this.issuerCertificatePem);
    const utcNow = /* @__PURE__ */ new Date();
    const expTime = /* @__PURE__ */ new Date();
    expTime.setFullYear(expTime.getFullYear() + 4);
    const signedDate = new StringDate(utcNow);
    const validFromDate = new StringDate(utcNow);
    const validUntilDate = new StringDate(expTime);
    const deviceKey = jwk2COSE_Key(devicePublicKeyJwk);
    const mso = {
      version: "1.0",
      digestAlgorithm: this.digestAlgo,
      valueDigests: this.mapOfHashes,
      deviceKeyInfo: {
        deviceKey
      },
      docType: this.defaultDocType,
      validityInfo: {
        signed: signedDate,
        validFrom: validFromDate,
        validUntil: validUntilDate
      }
    };
    const msoCbor = cborEncode(DataItem.fromData(mso));
    const protectedHeader = { alg: "ES256" };
    const unprotectedHeader = { kid: "11", x5chain: [issuerPublicKeyBuffer] };
    return createCoseSignature(protectedHeader, unprotectedHeader, msoCbor, issuerPrivateKey);
  }
  /**
   * This is not a proper way to calculate year diff, only used as quick demo.
   * Does not take into account time zones, leap years, and other weird date things
   */
  getAgeInYears(birth) {
    const birthDate = new Date(birth);
    const today = /* @__PURE__ */ new Date();
    const ONE_YEAR_MILLI = 1e3 * 60 * 60 * 24 * 365;
    const age = (today.getTime() - birthDate.getTime()) / ONE_YEAR_MILLI;
    return age;
  }
};

// src/lib/DeviceResponse.ts
var DOC_TYPE = "org.iso.18013.5.1.mDL";
var DeviceResponse = class _DeviceResponse {
  mdoc;
  pd;
  handover;
  useMac = true;
  devicePrivateKey;
  readerPublicKey;
  deviceResponseJson;
  deviceResponseCbor;
  static from(mdoc) {
    return new _DeviceResponse(mdoc);
  }
  constructor(mdoc) {
    this.mdoc = mdoc;
  }
  usingPresentationDefinition(pd) {
    this.pd = pd;
    return this;
  }
  usingHandover(handover) {
    this.handover = handover;
    return this;
  }
  authenticateWithMac(readerPublicKey, devicePrivateKey) {
    throw new Error("Not implemented");
    this.readerPublicKey = readerPublicKey;
    this.devicePrivateKey = devicePrivateKey;
    this.useMac = true;
    return this;
  }
  authenticateWithSignature(devicePrivateKey) {
    this.devicePrivateKey = devicePrivateKey;
    this.useMac = false;
    return this;
  }
  async generate() {
    if (!this.pd)
      throw new Error("Must provide a presentation definition with .usingPresentationDefinition()");
    if (!this.handover)
      throw new Error("Must provide handover data with .usingHandover()");
    const inputDescriptor = this.pd.input_descriptors.find((id) => id.id === DOC_TYPE);
    if (!inputDescriptor)
      throw new Error(
        `The presentation definition does not include an input descriptor for the default DocType "${DOC_TYPE}"`
      );
    if (this.pd.input_descriptors.length > 1) {
      console.warn(
        `Presentation definition includes input_descriptors for unsupported DocTypes. Only "${DOC_TYPE}" is supported`
      );
    }
    const { doc } = await this.handleInputDescriptor(inputDescriptor);
    this.deviceResponseJson = {
      version: "1.0",
      documents: [doc],
      status: 0
    };
    this.deviceResponseCbor = await cborEncode(this.deviceResponseJson);
    return this.deviceResponseCbor;
  }
  async handleInputDescriptor(id) {
    const mdocDocument = (this.mdoc.mdoc?.get("documents") || []).find((d) => d.get("docType") === id.id);
    if (!mdocDocument) {
      throw new Error(`The mdoc does not have a document with DocType "${id.id}"`);
    }
    const nameSpaces = await this.prepareNamespaces(id, mdocDocument);
    const doc = {
      docType: mdocDocument.get("docType"),
      issuerSigned: {
        nameSpaces,
        issuerAuth: mdocDocument.get("issuerSigned")?.get("issuerAuth")
      },
      deviceSigned: await this.getdeviceSigned(mdocDocument.get("docType"))
    };
    return { doc };
  }
  /**
   * empty for now, but if we wanted to later, this is where we can
   * add processing for device data
   */
  async getDeviceNameSpaceBytes() {
    return DataItem.fromData(/* @__PURE__ */ new Map());
  }
  async getdeviceSigned(docType) {
    const sessionTranscript = [
      null,
      // deviceEngagementBytes
      null,
      // eReaderKeyBytes,
      this.handover
    ];
    const deviceAuthentication = [
      "DeviceAuthentication",
      sessionTranscript,
      docType,
      await this.getDeviceNameSpaceBytes()
    ];
    const deviceAuthenticationBytes = cborEncode(DataItem.fromData(deviceAuthentication));
    const deviceSigned = {
      nameSpaces: await this.getDeviceNameSpaceBytes(),
      deviceAuth: this.useMac ? await this.getDeviceAuthMac(deviceAuthenticationBytes) : await this.getDeviceAuthSign(deviceAuthenticationBytes)
    };
    return deviceSigned;
  }
  async getDeviceAuthMac(data) {
    if (!this.devicePrivateKey)
      throw new Error("Missing devicePrivateKey");
    if (!this.readerPublicKey)
      throw new Error("Missing readerPublicKey");
    const ephemeralPrivateKey = "";
    const ephemeralPublicKey = "";
    return {
      deviceMac: "todo"
    };
  }
  async getDeviceAuthSign(cborData) {
    if (!this.devicePrivateKey)
      throw new Error("Missing devicePrivateKey");
    const protectedHeader = { alg: "ES256" };
    const unprotectedHeader = { kid: "11" };
    const signedCbor = await createCoseSignature(
      protectedHeader,
      unprotectedHeader,
      Buffer.from(cborData),
      this.devicePrivateKey
    );
    return {
      deviceSignature: signedCbor
    };
  }
  async prepareNamespaces(id, mdocDocument) {
    const requestedFields = id.constraints.fields;
    const nameSpaces = {};
    for await (const field of requestedFields) {
      const result = await this.prepareDigest(field.path, mdocDocument);
      if (!result) {
        console.log(`No matching field found for ${field.path}`);
        continue;
      }
      const { nameSpace, digest } = result;
      if (!nameSpaces[nameSpace])
        nameSpaces[nameSpace] = [];
      nameSpaces[nameSpace].push(digest);
    }
    return nameSpaces;
  }
  /**
   * path looks like this: "$['org.iso.18013.5.1']['family_name']"
   * the regex creates two groups with contents between "['" and "']"
   * the second entry in each group contains the result without the "'[" or "']"
   */
  async prepareDigest(paths, mdocDocument) {
    for (const path of paths) {
      const [[_1, nameSpace], [_2, elementIdentifier]] = [...path.matchAll(/\['(.*?)'\]/g)];
      if (!nameSpace)
        throw new Error(`Failed to parse namespace from path "${path}"`);
      if (!elementIdentifier)
        throw new Error(`Failed to parse elementIdentifier from path "${path}"`);
      const nsAttrs = mdocDocument.get("issuerSigned")?.get("nameSpaces")?.get(nameSpace) || [];
      const digest = nsAttrs.find((d) => d.data?.get("elementIdentifier") === elementIdentifier);
      if (elementIdentifier.startsWith("age_over_")) {
        return this.handleAgeOverNN(elementIdentifier, nameSpace, nsAttrs);
      }
      if (digest)
        return {
          nameSpace,
          digest
        };
    }
    return null;
  }
  handleAgeOverNN(request, nameSpace, attributes) {
    const ageOverList = attributes.map((a, i) => {
      const data = a.data;
      const key = data.get("elementIdentifier");
      const value = data.get("elementValue");
      return { key, value, index: i };
    }).filter((i) => i.key.startsWith("age_over_")).map((i) => ({
      nn: parseInt(i.key.replace("age_over_", "")),
      ...i
    })).sort((a, b) => a.nn - b.nn);
    const reqNN = parseInt(request.replace("age_over_", ""));
    let item;
    item = ageOverList.filter((i) => i.value === true && i.nn >= reqNN)?.[0];
    if (!item) {
      item = ageOverList.sort((a, b) => b.nn - a.nn).filter((i) => i.value === false && i.nn <= reqNN)?.[0];
    }
    if (!item) {
      return null;
    }
    return {
      nameSpace,
      digest: attributes[item.index]
    };
  }
};
export {
  DeviceResponse,
  MDOC,
  MDOCBuilder
};
/*! Bundled license information:

pvtsutils/build/index.js:
  (*!
   * MIT License
   * 
   * Copyright (c) 2017-2022 Peculiar Ventures, LLC
   * 
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   * 
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   * 
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   * 
   *)

pvutils/build/utils.es.js:
  (*!
   Copyright (c) Peculiar Ventures, LLC
  *)

asn1js/build/index.es.js:
  (*!
   * Copyright (c) 2014, GMO GlobalSign
   * Copyright (c) 2015-2022, Peculiar Ventures
   * All rights reserved.
   * 
   * Author 2014-2019, Yury Strozhevsky
   * 
   * Redistribution and use in source and binary forms, with or without modification,
   * are permitted provided that the following conditions are met:
   * 
   * * Redistributions of source code must retain the above copyright notice, this
   *   list of conditions and the following disclaimer.
   * 
   * * Redistributions in binary form must reproduce the above copyright notice, this
   *   list of conditions and the following disclaimer in the documentation and/or
   *   other materials provided with the distribution.
   * 
   * * Neither the name of the copyright holder nor the names of its
   *   contributors may be used to endorse or promote products derived from
   *   this software without specific prior written permission.
   * 
   * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
   * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
   * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
   * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
   * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
   * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
   * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
   * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
   * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
   * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
   * 
   *)

pkijs/build/index.es.js:
  (*!
   * Copyright (c) 2014, GlobalSign
   * Copyright (c) 2015-2019, Peculiar Ventures
   * All rights reserved.
   * 
   * Author 2014-2019, Yury Strozhevsky
   * 
   * Redistribution and use in source and binary forms, with or without modification,
   * are permitted provided that the following conditions are met:
   * 
   * * Redistributions of source code must retain the above copyright notice, this
   *   list of conditions and the following disclaimer.
   * 
   * * Redistributions in binary form must reproduce the above copyright notice, this
   *   list of conditions and the following disclaimer in the documentation and/or
   *   other materials provided with the distribution.
   * 
   * * Neither the name of the {organization} nor the names of its
   *   contributors may be used to endorse or promote products derived from
   *   this software without specific prior written permission.
   * 
   * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
   * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
   * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
   * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
   * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
   * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
   * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
   * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
   * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
   * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
   * 
   *)
*/
