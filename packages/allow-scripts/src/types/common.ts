import type { JsonObject, PackageJson } from 'type-fest';

declare global {
  export interface PkgLavamoatConfig {
    ['allowBins']?: JsonObject;
    ['allowConfig']?: JsonObject;
    ['allowScripts']?: JsonObject;
    ['allowedPatterns']?: JsonObject;
    ['disallowedPatterns']?: JsonObject;
    ['excessPolicies']?: JsonObject;
    ['missingPolicies']?: JsonObject;
  }

  export type LavamoatPackageJson = PackageJson & { lavamoat: PkgLavamoatConfig };

  export interface PkgInfo {
    canonicalName: string;
    path: string;
    scripts: {};
  }

  /**
   * Configuration for a type of scripts policies
   */
  export interface ScriptsConfig {
    allowConfig: JsonObject;
    packagesWithScripts: Map<string, [PkgInfo]>;
    allowedPatterns: string[];
    disallowedPatterns: string[];
    missingPolicies: string[];
    excessPolicies: string[];
  }

  /**
   * Individual bin link info
   */
  export interface BinInfo {
     canonicalName: string;
     isDirect: boolean;
     bin: string;
     path: string;
     link: string;
     fullLinkPath: string;
  }

  export type BinCandidates = Map<string, BinInfo[]>;

  /**
   * Configuration for a type of bins policies
   * */
  export interface BinsConfig {
     allowConfig: Record<string, any>;
     binCandidates: BinCandidates;
     allowedBins: BinInfo[];
     firewalledBins: BinInfo[];
     excessPolicies: string[];
     somePoliciesAreMissing: boolean;
  }

  // setup.js
  interface AreBinsBlockedOpts {
    /** Turn off memoization, make a fresh lookup */
    noMemoization?: boolean;
  }
   interface GetOptionsForBinOpts {
    rootDir: string;
    name: string;
  }

  interface PkgConfs {
    packageJson: LavamoatPackageJson;
    configs: {
      lifecycle: ScriptsConfig;
      bin: BinsConfig;
    }
    somePoliciesAreMissing: boolean;
    canonicalNamesByPath: Map<string,string>;
  }

  interface SetDefaultConfigurationOpts {
    rootDir: string;
  }

  interface WriteRcFileContentOpts {
    file: string;
    entry: string;
  }

  interface SavePackageConfigurationsOpts {
    rootDir: string;
    conf: PkgConfs;
  }

  // runAllowedPackages.js
  interface RunAllowedPackagesOpts {
    rootDir: string;
  }

  interface RunScriptOpts {
    event: string;
    path: string;
  }

  // report.js
  interface PrintPackagesListOpts {
    rootDir: string;
  }

  interface PrintMissingPoliciesIfAnyOpts {
    missingPolicies: string[];
    packagesWithScripts: Map<string, unknown[]>;
  }
}
