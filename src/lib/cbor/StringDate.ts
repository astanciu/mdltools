import { addExtension } from "cbor-x";
import { cborDecode, cborEncode } from ".";

export class StringDate {
  date: Date;
  formattedDate: string;

  constructor(date: Date) {
    this.date = date;
    this.formattedDate = this.date.toISOString().split(".")[0] + "Z";
  }

  toBuffer() {
    return cborEncode(this.formattedDate);
  }
}

addExtension({
  Class: StringDate,
  tag: 0,
  encode: (instance: StringDate, encode) => encode(instance.formattedDate),
  decode: (stringDate: string): Object => new Date(stringDate),
});
