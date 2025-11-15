export interface FileItem {
  name: string;
  type: string;
  fileType: string;
  icon: string;
  path: string;
  dateModified: string;
  size: string;
}

export interface FolderConfig {
  scanPath: string;
  icon: string;
  defaultDateModified: string;
  defaultSize: string;
}

export interface CustomFileConfig {
  name: string;
  type: string;
  fileType: string;
  icon: string;
  path: string;
  dateModified: string;
  size: string;
}

export interface ExtensionInfo {
  fileType: string;
  icon: string;
  type: string;
}

export interface AllFolders {
  [key: string]: FileItem[];
}