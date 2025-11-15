// scripts/generateFileIndex.ts
import fs from 'fs';
import path from 'path';
import type {
  FileItem,
  FolderConfig,
  CustomFileConfig,
  ExtensionInfo,
  AllFolders,
} from '../types/fileList';

const OUTPUT_FILE = path.join(process.cwd(), 'data/fileIndex.ts');

// Configuration for folder metadata
const folderConfig: Record<string, FolderConfig> = {
  desktop: {
    scanPath: 'pages/explorer/desktop',
    icon: 'desktop',
    defaultDateModified: '04/14/2025 04:02',
    defaultSize: '2kt',
  },
  projects: {
    scanPath: 'pages/explorer/projects',
    icon: 'folder',
    defaultDateModified: '04/14/2025 04:02',
    defaultSize: '2kt',
  },
  tools: {
    scanPath: 'pages/explorer/tools',
    icon: 'folder',
    defaultDateModified: '04/14/2025 04:02',
    defaultSize: '2kt',
  },
  links: {
    scanPath: 'pages/explorer/links',
    icon: 'folder',
    defaultDateModified: '04/14/2025 04:02',
    defaultSize: '2kt',
  },
  pictures: {
    scanPath: 'pages/explorer/pictures',
    icon: 'pictures',
    defaultDateModified: '04/14/2025 04:02',
    defaultSize: '2kt',
  },
  videos: {
    scanPath: 'pages/explorer/videos',
    icon: 'videos',
    defaultDateModified: '04/14/2025 04:02',
    defaultSize: '2kt',
  },
};

// Map file names to their custom properties
const customFileMap: Record<string, CustomFileConfig> = {
  'about.tsx': {
    name: 'About me.txt',
    type: 'txt',
    fileType: 'Text Document',
    icon: '/icons/notes/notes.png',
    path: '/notepad/about',
    dateModified: '04/14/2025 04:02',
    size: '2kt',
  },
  'about.js': {
    name: 'About me.txt',
    type: 'txt',
    fileType: 'Text Document',
    icon: '/icons/notes/notes.png',
    path: '/notepad/about',
    dateModified: '04/14/2025 04:02',
    size: '2kt',
  },
  'resume.tsx': {
    name: 'Resume.pdf',
    type: 'pdf',
    fileType: 'PDF',
    icon: '/icons/pdf/pdf.png',
    path: '/resume/resume',
    dateModified: '11/11/2025 04:02',
    size: '2kt',
  },
  'resume.js': {
    name: 'Resume.pdf',
    type: 'pdf',
    fileType: 'PDF',
    icon: '/icons/pdf/pdf.png',
    path: '/resume/resume',
    dateModified: '11/11/2025 04:02',
    size: '2kt',
  },
};

// Map extensions to file types
const extensionMap: Record<string, ExtensionInfo> = {
  '.txt': {
    fileType: 'Text Document',
    icon: '/icons/notes/notes.png',
    type: 'txt',
  },
  '.pdf': {
    fileType: 'PDF',
    icon: '/icons/pdf/pdf.png',
    type: 'pdf',
  },
  '.png': {
    fileType: 'PNG Image',
    icon: '/icons/pictures/pictures.png',
    type: 'image',
  },
  '.jpg': {
    fileType: 'JPEG Image',
    icon: '/icons/pictures/pictures.png',
    type: 'image',
  },
  '.jpeg': {
    fileType: 'JPEG Image',
    icon: '/icons/pictures/pictures.png',
    type: 'image',
  },
  '.gif': {
    fileType: 'GIF Image',
    icon: '/icons/pictures/pictures.png',
    type: 'image',
  },
  '.webp': {
    fileType: 'WebP Image',
    icon: '/icons/pictures/pictures.png',
    type: 'image',
  },
  '.mp4': {
    fileType: 'MP4 Video',
    icon: '/icons/videos/videos.png',
    type: 'video',
  },
  '.mov': {
    fileType: 'MOV Video',
    icon: '/icons/videos/videos.png',
    type: 'video',
  },
  '.avi': {
    fileType: 'AVI Video',
    icon: '/icons/videos/videos.png',
    type: 'video',
  },
};

/**
 * Check if a path is a folder by looking for corresponding directory
 */
function isFolder(fileName: string, parentFolder: string): boolean {
  const extensions = ['.tsx', '.ts', '.jsx', '.js'];
  let baseName = fileName;

  // Remove known extensions
  for (const ext of extensions) {
    if (fileName.endsWith(ext)) {
      baseName = fileName.slice(0, -ext.length);
      break;
    }
  }

  const potentialFolderPath = path.join(
    process.cwd(),
    'pages/explorer',
    baseName
  );

  return (
    fs.existsSync(potentialFolderPath) &&
    fs.statSync(potentialFolderPath).isDirectory()
  );
}

/**
 * Get file information from a filename
 */
function getFileInfo(fileName: string, parentFolder: string): FileItem | null {
  // Check for custom mapping first
  if (customFileMap[fileName]) {
    return customFileMap[fileName];
  }

  const extensions = ['.tsx', '.ts', '.jsx', '.js'];
  let baseName = fileName;
  let fileExt = '';

  // Remove known extensions
  for (const ext of extensions) {
    if (fileName.endsWith(ext)) {
      baseName = fileName.slice(0, -ext.length);
      fileExt = ext;
      break;
    }
  }

  // Check if it's a folder
  if (isFolder(fileName, parentFolder)) {
    const folderName = baseName.toLowerCase();
    const config = folderConfig[folderName];

    if (!config) {
      console.warn(`⚠️  No configuration found for folder: ${folderName}`);
      return null;
    }

    return {
      name: baseName.charAt(0).toUpperCase() + baseName.slice(1),
      type: 'folder',
      fileType: 'Folder',
      icon: `/icons/${config.icon}/${config.icon}.png`,
      path: `/explorer/${baseName}`,
      dateModified: config.defaultDateModified,
      size: config.defaultSize,
    };
  }

  // Default file handling by extension
  const detectedExt = path.extname(baseName);
  const fileInfo = extensionMap[detectedExt] || {
    fileType: 'File',
    icon: '/icons/file/file.png',
    type: 'file',
  };

  return {
    name: baseName,
    type: fileInfo.type,
    fileType: fileInfo.fileType,
    icon: fileInfo.icon,
    path: `/${parentFolder}/${baseName}`,
    dateModified: '04/14/2025 04:02',
    size: '2kt',
  };
}

/**
 * Scan a folder and return its contents
 */
function scanFolder(folderKey: string): FileItem[] {
  const config = folderConfig[folderKey];
  if (!config) {
    console.warn(`⚠️  No configuration found for folder: ${folderKey}`);
    return [];
  }

  // Special handling for desktop folder - include subdirectories and custom files
  if (folderKey === 'desktop') {
    const explorerPath = path.join(process.cwd(), 'pages/explorer');
    const items: FileItem[] = [];

    // Add subdirectories from pages/explorer
    if (fs.existsSync(explorerPath)) {
      try {
        const dirItems = fs.readdirSync(explorerPath, { withFileTypes: true });
        for (const item of dirItems) {
          if (
            item.isDirectory() &&
            !item.name.startsWith('_') &&
            !item.name.startsWith('.') &&
            item.name.toLowerCase() !== 'desktop'
          ) {
            const folderName = item.name.toLowerCase();
            const subFolderConfig = folderConfig[folderName];

            if (subFolderConfig) {
              items.push({
                name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
                type: 'folder',
                fileType: 'Folder',
                icon: `/icons/${subFolderConfig.icon}/${subFolderConfig.icon}.png`,
                path: `/explorer/${item.name}`,
                dateModified: subFolderConfig.defaultDateModified,
                size: subFolderConfig.defaultSize,
              });
            }
          }
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`❌ Error scanning explorer directory:`, errorMessage);
      }
    }

    // Add custom files (About me.txt and Resume.pdf)
    const customFiles = ['about.tsx', 'resume.tsx'];
    for (const fileName of customFiles) {
      if (customFileMap[fileName]) {
        items.push(customFileMap[fileName]);
      }
    }

    return items.sort((a, b) => {
      // Folders first, then alphabetically
      if (a.type === 'folder' && b.type !== 'folder') return -1;
      if (a.type !== 'folder' && b.type === 'folder') return 1;
      return a.name.localeCompare(b.name);
    });
  }

  // For other folders, scan the configured path
  const folderPath = path.join(process.cwd(), config.scanPath);

  if (!fs.existsSync(folderPath)) {
    console.warn(`⚠️  Folder does not exist: ${folderPath}`);
    return [];
  }

  try {
    const files = fs.readdirSync(folderPath);

    return files
      .filter((file) => {
        // Ignore special Next.js files and hidden files
        const validExtensions = ['.tsx', '.ts', '.jsx', '.js'];
        const hasValidExtension = validExtensions.some((ext) =>
          file.endsWith(ext)
        );

        return (
          !file.startsWith('_') &&
          !file.startsWith('.') &&
          file !== 'index.tsx' &&
          file !== 'index.ts' &&
          file !== 'index.jsx' &&
          file !== 'index.js' &&
          hasValidExtension
        );
      })
      .map((file) => getFileInfo(file, folderKey))
      .filter((item): item is FileItem => item !== null)
      .sort((a, b) => {
        // Folders first, then alphabetically
        if (a.type === 'folder' && b.type !== 'folder') return -1;
        if (a.type !== 'folder' && b.type === 'folder') return 1;
        return a.name.localeCompare(b.name);
      });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`❌ Error scanning folder ${folderKey}:`, errorMessage);
    return [];
  }
}

/**
 * Generate the complete file index
 */
function generateFileIndex(): void {
  console.log('🔄 Generating file index...\n');

  const allFolders: AllFolders = {};

  // Scan each configured folder
  Object.keys(folderConfig).forEach((folderKey) => {
    console.log(`📁 Scanning ${folderKey}...`);
    const files = scanFolder(folderKey);
    allFolders[folderKey] = files;
    console.log(`   ✅ Found ${files.length} item(s)\n`);
  });

  // Generate the output file
  const output = `// Auto-generated file index
// Last generated: ${new Date().toISOString()}
// Run 'npm run generate-index' to regenerate

import type { FileItem, AllFolders } from '../components/utils/types/fileList';

${Object.entries(allFolders)
  .map(([key, files]) => {
    return `export const ${key}Files: FileItem[] = ${JSON.stringify(
      files,
      null,
      2
    )};`;
  })
  .join('\n\n')}

// Export all for convenience
export const allFolders: AllFolders = {
${Object.keys(allFolders)
  .map((key) => `  ${key}: ${key}Files,`)
  .join('\n')}
};
`;

  // Ensure data directory exists
  const dataDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Write the file
  fs.writeFileSync(OUTPUT_FILE, output, 'utf8');
  console.log(`✅ File index generated successfully!`);
  console.log(`📝 Output: ${OUTPUT_FILE}\n`);

  // Print summary
  console.log('📊 Summary:');
  Object.entries(allFolders).forEach(([key, files]) => {
    console.log(`   ${key}: ${files.length} items`);
  });
}

// Run the generation
try {
  generateFileIndex();
} catch (error) {
  const errorMessage = error instanceof Error ? error.message : String(error);
  console.error('❌ Failed to generate file index:', errorMessage);
  process.exit(1);
}