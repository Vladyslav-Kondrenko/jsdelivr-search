export interface Package {
  name: string;
  author: string;
  description: string;
  version: string;
  keywords: Array<String>; 
  links: PackageLiks
}

type PackageLiks = {
  npm?: string;
  homepage?: string;
  repository?: string;
  bugs?: string;
};