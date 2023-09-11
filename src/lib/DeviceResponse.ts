import * as jose from "jose";
import { MDOC } from "./MDOC";
import { IssuerSignedItem } from "./types/MDOC";
import { InputDescriptor, PresentationDefinition } from "./types/PresentationDefinition";
import { MDOCDocument } from "./types/MDOC";
import { cborEncode, cborTagged, maybeEncodeValue } from "./utils";
import { DeviceResponseType, DeviceSigned } from "./types/DeviceResponse";

const DOC_TYPE = "org.iso.18013.5.1.mDL";

export class DeviceResponse {
  private mdoc: MDOC = null;
  private pd: PresentationDefinition = null;
  private handover: string[];
  private useMac = true;
  private devicePrivateKey: jose.KeyLike;
  private readerPublicKey: jose.KeyLike;
  public deviceResponseJson: DeviceResponseType;
  public deviceResponseCbor: Buffer;

  public static from(mdoc: MDOC) {
    return new DeviceResponse(mdoc);
  }

  constructor(mdoc: MDOC) {
    this.mdoc = mdoc;
  }

  public usingPresentationDefinition(pd: PresentationDefinition) {
    this.pd = pd;
    return this;
  }

  public usingDevicePriceKey(privateKey: jose.KeyLike) {
    this.devicePrivateKey = privateKey;
    return this;
  }

  public usingReaderPublicKey(publicKey: jose.KeyLike) {
    this.readerPublicKey = publicKey;
    return this;
  }

  public usingHandover(handover: string[]) {
    this.handover = handover;
    return this;
  }

  public MAC() {
    this.useMac = true;
    return this;
  }

  public Sign() {
    // return this;
    throw new Error("Not implemented");
  }

  public async generate() {
    if (!this.pd) throw new Error("Must provide a presentation definition with .usingPresentationDefinition()");
    if (!this.handover) throw new Error("Must provide handover data with .usingHandover()");
    if (!this.devicePrivateKey) throw new Error("Must provide devicePrivateKey data with .usingDevicePrivateKey()");
    if (!this.readerPublicKey) throw new Error("Must provide readerPublicKey data with .usingreaderPublicKey()");

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
      status: 0,
    };

    this.deviceResponseCbor = await cborEncode(this.deviceResponseJson);

    return this.deviceResponseCbor;
  }

  private async handleInputDescriptor(id: InputDescriptor) {
    const mdocDocument: MDOCDocument = this.mdoc.mdoc.documents.find((d) => d.docType === id.id);
    if (!mdocDocument) {
      // TODO; probl need to create a DocumentError here, but let's just throw for now
      throw new Error(`The mdoc does not have a document with DocType "${id.id}"`);
    }

    const nameSpaces = await this.prepareNamespaces(id, mdocDocument);

    const doc: any = {
      docType: mdocDocument.docType,
      issuerSigned: {
        nameSpaces,
        issuerAuth: mdocDocument.issuerSigned.issuerAuth,
      },
      deviceSigned: await this.getdeviceSigned(mdocDocument.docType),
    };

    return { doc };
  }

  /**
   * empty for now, but if we wanted to later, this is where we can
   * add processing for device data
   */
  private async getDeviceNameSpaceBytes() {
    return cborTagged(24, await cborEncode({}));
  }

  private async getdeviceSigned(docType: string): Promise<DeviceSigned> {
    const sessionTranscript = [
      null, // deviceEngagementBytes
      null, // eReaderKeyBytes,
      this.handover,
    ];

    const deviceAuthentication = [
      "DeviceAuthentication",
      sessionTranscript,
      docType,
      await this.getDeviceNameSpaceBytes(),
    ];

    const { value: deviceAuthenticationBytes } = await cborTagged(24, await cborEncode(deviceAuthentication));

    const deviceSigned = {
      nameSpaces: await this.getDeviceNameSpaceBytes(),
      // @ts-ignore
      deviceAuth: this.useMac ? await this.getDeviceAuthMac(deviceAuthenticationBytes) : await this.getDeviceAuthSign(),
    };

    // @ts-ignore
    return deviceSigned;
  }

  private async getDeviceAuthMac(data: Buffer) {
    // WIP here...
    
    const ephemeralPrivateKey = ""; // derived from this.devicePrivateKey
    const ephemeralPublicKey = ""; // derived from this.readerPublicKey
    
    return {
      deviceMac: "todo",
    };
  }

  private async getDeviceAuthSign() {
    throw new Error("getDeviceAuthSign() not implemented");
  }

  private async prepareNamespaces(id: InputDescriptor, mdocDocument: MDOCDocument) {
    const requestedFields = id.constraints.fields;
    const nameSpaces = {};
    for await (const field of requestedFields) {
      const result = await this.prepareDigest(field.path, mdocDocument);
      if (!result) {
        // TODO: Do we add an entry to DocumentErrors if not found?
        console.log(`No matching field found for ${field.path}`);
        continue;
      }

      const { nameSpace, digest } = result;
      if (!nameSpaces[nameSpace]) nameSpaces[nameSpace] = [];
      nameSpaces[nameSpace].push(digest);
    }

    return nameSpaces;
  }

  /**
   * path looks like this: "$['org.iso.18013.5.1']['family_name']"
   * the regex creates two groups with contents between "['" and "']"
   * the second entry in each group contains the result without the "'[" or "']"
   */
  private prepareDigest(
    paths: string[],
    mdocDocument: MDOCDocument
  ): { nameSpace: string; digest: IssuerSignedItem } | null {
    for (const path of paths) {
      const [[_1, nameSpace], [_2, elementIdentifier]] = [...path.matchAll(/\['(.*?)'\]/g)];
      if (!nameSpace) throw new Error(`Failed to parse namespace from path "${path}"`);
      if (!elementIdentifier) throw new Error(`Failed to parse elementIdentifier from path "${path}"`);

      const digest = (mdocDocument.issuerSigned?.nameSpaces?.[nameSpace] || []).find(
        (d) => d.elementIdentifier === elementIdentifier
      );

      if (digest) {
        return {
          nameSpace,
          // encode the value if necessary
          digest: { ...digest, elementValue: maybeEncodeValue(digest.elementIdentifier, digest.elementValue) },
        };
      }
    }

    return null;
  }
}
