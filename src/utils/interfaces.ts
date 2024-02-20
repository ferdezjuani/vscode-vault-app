export interface Vault {
  id: string;
  name: string;
  extensions: string[];
  image?: string;
}

export interface VaultSchema {
  name: string;
  extensions: string;
}

export interface IExtensionResponse {
  results: IResults[];
}

export interface IResults {
  extensions: IExtension[];
}

export interface IExtension {
  publisher: IPublisher;
  extensionName: string;
  displayName: string;
  shortDescription: string;
  versions: IVersions[];
}

export interface IPublisher {
  publisherName: string;
  displayName: string;
  domain: string;
}

export interface IVersions {
  version: string;
  files: IFiles[];
}

export interface IFiles {
  assetType: string;
  source: string;
}
