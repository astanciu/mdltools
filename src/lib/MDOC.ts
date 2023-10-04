import { MDLAttributes } from "./types/types";
import { CBORMap } from "./types/MDOC";
import { MDL_FIELDS } from "./config";
import { DataItem, cborDecode } from "./cbor";

const blocker = {};

export class MDOC {
  private defaultNamespace = "org.iso.18013.5.1";
  public readonly mdoc: CBORMap;
  public attributes: Record<string, any> = {};
  public attributesByNamespace: Record<string, Record<string, any>> = {};
  public rawCbor: string;

  static async from<T>(data: string | Buffer) {
    const buffer = Buffer.isBuffer(data) ? data : Buffer.from(data, "hex");
    const cborHex = Buffer.isBuffer(data) ? data.toString("hex") : data;
    const mdoc = new MDOC(MDOC.decode(buffer), cborHex, blocker);

    const proxy = new Proxy<MDOC>(mdoc, {
      get(target: MDOC, prop: string, receiver: any) {
        // if property already exists on mdoc, return it
        if (target.hasOwnProperty(prop)) {
          return target[prop];
        }

        if (target.attributes.hasOwnProperty(prop)) {
          return target.attributes[prop];
        }

        return undefined;
      },
    });

    return proxy as MDOC & MDLAttributes & T;
  }

  static decode(data: Buffer) {
    const mdoc: CBORMap = cborDecode(data);

    return mdoc;
  }

  constructor(mdoc: CBORMap, cbor: string, b) {
    if (b !== blocker) throw new Error("Cannot use constructor directly. Use MDOC.from()");
    this.mdoc = mdoc;
    this.buildAttributeMap();
    this.rawCbor = cbor;
  }

  // TODO: how do we handle multiple mdoc.documents, if each one has the default namespace?
  private buildAttributeMap() {
    // First, get teh default namespace ones
    const nsAttrs = this.mdoc
      ?.get("documents")?.[0]
      ?.get("issuerSigned")
      ?.get("nameSpaces")
      ?.get(this.defaultNamespace);
    if (!nsAttrs) throw new Error(`Document does not contain the core namespace "${this.defaultNamespace}"`);
    this.loadAttributes(this.defaultNamespace);

    // Then get any other namespaces.
    // This makes the map somewhat ordered
    const namespaces = this.mdoc?.get("documents")?.[0]?.get("issuerSigned")?.get("nameSpaces").keys();
    for (const ns of namespaces) {
      if (ns === this.defaultNamespace) continue;
      this.loadAttributes(ns);
    }
  }

  private loadAttributes(namespace) {
    this.attributesByNamespace[namespace] = {}
    const nsAttrs = this.mdoc?.get("documents")?.[0]?.get("issuerSigned")?.get("nameSpaces")?.get(namespace);
    if (namespace === this.defaultNamespace) {
      // load the default namespace attributes in order defined in MDL_FIELDS
      for (const field of MDL_FIELDS) {
        const attributeName = field.id;
        const attributeValue = this.getElementValue(attributeName, nsAttrs);
        if (attributeValue) {
          this.attributes[attributeName] = attributeValue;
          this.attributesByNamespace[namespace][attributeName] = attributeValue;
        }
      }

      // load any "age_over_NN" attributes
      for (let i = 1; i <= 150; i++) {
        const age = i < 10 ? `0${i}` : i;
        const attributeName = `age_over_${age}`;
        const attributeValue = this.getElementValue(attributeName, nsAttrs);
        if (attributeValue) {
          this.attributes[attributeName] = attributeValue;
          this.attributesByNamespace[namespace][attributeName] = attributeValue;
        }
      }
    } else {
      // otherwise, load the namespace as defined in the mdoc
      for (const item of nsAttrs) {
        const attributeName = item.data?.get("elementIdentifier");
        const attributeValue = this.parseValue(item.data?.get("elementValue"));
        if (attributeValue) {
          this.attributes[attributeName] = attributeValue;
          this.attributesByNamespace[namespace][attributeName] = attributeValue;
        }
      }
    }
  }

  private getElementValue(key: string, list: DataItem[]): any {
    const item = list.find((i) => i.data?.get("elementIdentifier") === key);
    const value = item?.data?.get("elementValue");
    return this.parseValue(value);
  }

  private parseValue(value: any) {
    if (Array.isArray(value)) {
      return value.map((item) => {
        return item instanceof Map ? Object.fromEntries(item) : item;
      });
    }
    return value instanceof Map ? Object.fromEntries(value) : value;
  }
}
