import cbor from "cbor";
import { MDLAttributes } from "./types/types";
import { IssuerSignedItem, MDLDoc } from "./types/MDOC";
import { MDL_FIELDS } from "./config";
import { cborDecode } from "./utils";

const blocker = {};

export class MDOC {
  private defaultNamespace = "org.iso.18013.5.1";
  public readonly mdoc: MDLDoc;
  public attributes: Record<string, any> = {};

  static async from<T>(data: string | Buffer) {
    const buffer = Buffer.isBuffer(data) ? data : Buffer.from(data, "hex");
    const mdoc = new MDOC(await MDOC.decode(buffer), blocker);

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

  static async decode(data: Buffer) {
    const mdoc: MDLDoc = await cborDecode(data)

    return mdoc;
  }

  constructor(mdoc: MDLDoc, b) {
    if (b !== blocker) throw new Error("Cannot use constructor directly. Use MDOC.from()");
    this.mdoc = mdoc;
    this.buildAttributeMap();
  }

  // TODO: how do we handle multiple mdoc.documents, if each one has the default namespace?
  private buildAttributeMap() {
    // First, get teh default namespace ones
    const nsAttrs = this.mdoc?.documents?.[0]?.issuerSigned?.nameSpaces[this.defaultNamespace];
    if (!nsAttrs) throw new Error(`Document does not contain the core namespace "${this.defaultNamespace}"`);
    this.loadAttributes(this.defaultNamespace);

    // Then get any other namespaces.
    // This makes the map somewhat ordered
    const namespaces = Object.keys(this.mdoc?.documents?.[0]?.issuerSigned?.nameSpaces);
    for (const ns of namespaces) {
      if (ns === this.defaultNamespace) continue;
      this.loadAttributes(ns);
    }
  }

  private loadAttributes(namespace) {
    const nsAttrs = this.mdoc.documents[0].issuerSigned.nameSpaces[namespace];
    if (namespace === this.defaultNamespace) {
      // load the default namespace attributes in order defined in MDL_FIELDS
      for (const field of MDL_FIELDS) {
        const attributeName = field.id;
        const attributeValue = this.getElementValue(attributeName, nsAttrs);
        if (attributeValue) {
          this.attributes[attributeName] = attributeValue;
        }
      }
    } else {
      // otherwise, load the namespace as defined in the mdoc
      for (const item of nsAttrs) {
        const attributeName = item.elementIdentifier;
        const attributeValue = item.elementValue;
        if (attributeValue) {
          this.attributes[attributeName] = attributeValue;
        }
      }
    }
  }

  private getElementValue(key: string, list: IssuerSignedItem[]): any {
    const item = list.find((i) => i.elementIdentifier === key);
    return item?.elementValue;
  }
}
