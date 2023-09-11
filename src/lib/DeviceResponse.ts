import { MDOC } from "./MDOC";
import { IssuerSignedItem } from "./types/MDOC";
import { InputDescriptor, PresentationDefinition } from "./types/PresentationDefinition";
import { MDOCDocument } from "./types/MDOC";
import { cborEncode, cborTagged, maybeEncodeValue } from "./utils";
import { DeviceSigned } from "./types/DeviceResponse";
import { OID4VPHandover } from "./types/types";

const DOC_TYPE = "org.iso.18013.5.1.mDL";

export class DeviceResponse {
  public static async generate(mdoc: MDOC, pd: PresentationDefinition) {
    const inputDescriptor = pd.input_descriptors.find((id) => id.id === DOC_TYPE);

    if (!inputDescriptor)
      throw new Error(
        `The presentation definition does not include an input descriptor for the default DocType "${DOC_TYPE}"`
      );

    if (pd.input_descriptors.length > 1) {
      console.warn(
        `Presentation definition includes input_descriptors for unsupported DocTypes. Only "${DOC_TYPE}" is supported`
      );
    }

    const { doc } = await DeviceResponse.handleInputDescriptor(inputDescriptor, mdoc);

    const deviceResponseJson = {
      version: "1.0",
      documents: [doc],
      status: 0,
    };

    return cborEncode(deviceResponseJson);
  }

  private static async handleInputDescriptor(id: InputDescriptor, mdoc: MDOC) {
    const mdocDocument: MDOCDocument = mdoc.mdoc.documents.find((d) => d.docType === id.id);
    if (!mdocDocument) {
      // TODO; probl need to create a DocumentError here, but let's just throw for now
      throw new Error(`The mdoc does not have a document with DocType "${id.id}"`);
    }

    const nameSpaces = await DeviceResponse.prepareNamespaces(id, mdocDocument);

    const doc: any = {
      docType: mdocDocument.docType,
      issuerSigned: {
        nameSpaces,
        issuerAuth: mdocDocument.issuerSigned.issuerAuth,
      },
      deviceSigned: await DeviceResponse.getdeviceSigned(mdocDocument.docType),
    };

    return { doc };
  }

  /**
   * empty for now, but if we wanted to later, this is where we can
   * add processing for device data
   */
  private static async getDeviceNameSpaceBytes() {
    return cborTagged(24, await cborEncode({}));
  }

  private static async getdeviceSigned(docType: string): Promise<DeviceSigned> {
    const handover: OID4VPHandover = [
      "123",
      "Cq1anPb8vZU5j5C0d7hcsbuJLBpIawUJIDQRi2Ebwb4",
      "http://localhost:4000/api/presentation_request/dc8999df-d6ea-4c84-9985-37a8b81a82ec/callback",
      "bbb595304ff0c1b1ce54a65dabfceb05",
    ];
    const sessionTranscript = [
      null, // deviceEngagementBytes
      null, // eReaderKeyBytes,
      handover,
    ];

    const deviceAuthentication = [
      "DeviceAuthentication",
      sessionTranscript,
      docType,
      await DeviceResponse.getDeviceNameSpaceBytes(),
    ];

    const devAuthBytes = await cborEncode(deviceAuthentication);

    const deviceSigned = {
      nameSpaces: await DeviceResponse.getDeviceNameSpaceBytes(),
      deviceAuth: await DeviceResponse.getDeviceMacAuth(devAuthBytes),
    };

    // @ts-ignore
    return deviceSigned;
  }

  private static async getDeviceMacAuth(data: Buffer) {
    // WIP here...
    return {
      deviceMac: 'todo'
    }
  }

  private static async prepareNamespaces(id: InputDescriptor, mdocDocument: MDOCDocument) {
    const requestedFields = id.constraints.fields;
    const nameSpaces = {};
    for await (const field of requestedFields) {
      const result = await DeviceResponse.prepareDigest(field.path, mdocDocument);
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
  private static prepareDigest(
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
