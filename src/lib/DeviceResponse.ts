import * as jose from "jose";
import cose from "cose-js";
import { MDOC } from "./MDOC";
import { IssuerSignedItem } from "./types/MDOC";
import { InputDescriptor, PresentationDefinition } from "./types/PresentationDefinition";
import { MDOCDocument } from "./types/MDOC";
import { cborDecode, cborEncode, cborTagged, maybeEncodeValue } from "./utils";
import { DeviceResponseType, DeviceSignature, DeviceSigned, DeviceSigned_Build } from "./types/DeviceResponse";
import { read } from "fs";
import { Tagged } from "cbor";

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

  public usingHandover(handover: string[]) {
    this.handover = handover;
    return this;
  }

  public authenticateWithMac(readerPublicKey: jose.KeyLike, devicePrivateKey: jose.KeyLike) {
    throw new Error("Not implemented");
    this.readerPublicKey = readerPublicKey;
    this.devicePrivateKey = devicePrivateKey;
    this.useMac = true;
    return this;
  }

  public authenticateWithSignature(devicePrivateKey: jose.KeyLike) {
    this.devicePrivateKey = devicePrivateKey;
    this.useMac = false;
    return this;
  }

  public async generate() {
    if (!this.pd) throw new Error("Must provide a presentation definition with .usingPresentationDefinition()");
    if (!this.handover) throw new Error("Must provide handover data with .usingHandover()");

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

  private async getdeviceSigned(docType: string): Promise<DeviceSigned_Build> {
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
    const devicenameSpaceBytes = await this.getDeviceNameSpaceBytes();
    // const { value: deviceAuthenticationBytes } = await cborTagged(24, await cborEncode(deviceAuthentication));
    // const deviceAuthenticationBytes = await this.calculateDeviceAutenticationBytes(
    //   sessionTranscript,
    //   docType,
    //   deviceNSBytes
    // );

    const bytes = cborEncode(["DeviceAuthentication", sessionTranscript, docType, devicenameSpaceBytes])
    const deviceAuthenticationBytes = new Tagged(24, bytes).value

    const debug = deviceAuthenticationBytes.toString("hex");
    console.log('gen dab: ', debug)
    const deviceSigned: DeviceSigned_Build = {
      nameSpaces: await this.getDeviceNameSpaceBytes(),
      deviceAuth: this.useMac
        ? await this.getDeviceAuthMac(deviceAuthenticationBytes)
        : await this.getDeviceAuthSign(deviceAuthenticationBytes),
    };

    // @ts-ignore
    return deviceSigned;
  }

  private calculateDeviceAutenticationBytes(
    sessionTranscript: any[],
    docType: string,
    nameSpaces: Tagged
  ): Buffer {
    return cborEncode(new Tagged(24, cborEncode(["DeviceAuthentication", sessionTranscript, docType, nameSpaces])));
  }
  private async getDeviceAuthMac(data: Buffer) {
    if (!this.devicePrivateKey) throw new Error("Missing devicePrivateKey");
    if (!this.readerPublicKey) throw new Error("Missing readerPublicKey");
    // WIP here...

    const ephemeralPrivateKey = ""; // derived from this.devicePrivateKey
    const ephemeralPublicKey = ""; // derived from this.readerPublicKey

    return {
      deviceMac: "todo",
    };
  }

  private async getDeviceAuthSign(cborData: Buffer): Promise<DeviceSignature> {
    if (!this.devicePrivateKey) throw new Error("Missing devicePrivateKey");

    const jwk = await jose.exportJWK(this.devicePrivateKey);

    const headers: cose.Headers = {
      p: { alg: "ES256" },
      u: { kid: "11" }, // ?? what should this be?
    };

    const signer: cose.sign.Signer = {
      key: {
        d: Buffer.from(jwk.d, "base64url"),
      },
    };

    const signedCbor = await cose.sign.create(headers, cborData, signer);
    // signedCbor is a cbor of an object with shape {err, tag, value}. We only want the value
    // so we need to decode it and extract it
    const decoded = await cborDecode(signedCbor);

    return {
      deviceSignature: decoded.value,
    };
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
  private async prepareDigest(
    paths: string[],
    mdocDocument: MDOCDocument
  ): Promise<{ nameSpace: string; digest: Tagged } | null> {
    for (const path of paths) {
      const [[_1, nameSpace], [_2, elementIdentifier]] = [...path.matchAll(/\['(.*?)'\]/g)];
      if (!nameSpace) throw new Error(`Failed to parse namespace from path "${path}"`);
      if (!elementIdentifier) throw new Error(`Failed to parse elementIdentifier from path "${path}"`);

      const digest = (mdocDocument.issuerSigned?.nameSpaces?.[nameSpace] || []).find(
        (d) => d.elementIdentifier === elementIdentifier
      );

      if (digest) {
        const digestWithEncodedValue = {
          ...digest,
          elementValue: maybeEncodeValue(digest.elementIdentifier, digest.elementValue),
        };

        const encodedDigest = cborTagged(24, await cborEncode(digestWithEncodedValue));

        return {
          nameSpace,
          // encode the value if necessary
          digest: encodedDigest,
        };
      }
    }

    return null;
  }
}
