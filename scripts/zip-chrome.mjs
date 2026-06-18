import { mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const rootDir = process.cwd();
const sourceDir = path.join(rootDir, 'chrome');
const outputPath = path.join(rootDir, 'dist', 'chrome.zip');

const crcTable = new Uint32Array(256);

for (let i = 0; i < crcTable.length; i += 1) {
  let value = i;

  for (let bit = 0; bit < 8; bit += 1) {
    value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
  }

  crcTable[i] = value >>> 0;
}

const getCrc32 = (buffer) => {
  let crc = 0xffffffff;

  for (const byte of buffer) {
    crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  }

  return (crc ^ 0xffffffff) >>> 0;
};

const toZipPath = (filePath) => filePath.split(path.sep).join('/');

const shouldIncludeFile = (relativePath) => {
  const zipPath = toZipPath(relativePath);

  if (zipPath === 'chrome/webpack.config.js') {
    return false;
  }

  return !zipPath.startsWith('chrome/src/');
};

const collectFiles = async (dir, files = []) => {
  const entries = await readdir(dir);

  for (const entry of entries) {
    const absolutePath = path.join(dir, entry);
    const entryStat = await stat(absolutePath);

    if (entryStat.isDirectory()) {
      await collectFiles(absolutePath, files);
      continue;
    }

    const relativePath = path.relative(rootDir, absolutePath);

    if (shouldIncludeFile(relativePath)) {
      files.push({
        absolutePath,
        zipPath: toZipPath(relativePath),
        modifiedAt: entryStat.mtime,
      });
    }
  }

  return files;
};

const getDosDateTime = (date) => {
  const year = Math.max(date.getFullYear(), 1980);
  const dosTime =
    (date.getHours() << 11) |
    (date.getMinutes() << 5) |
    Math.floor(date.getSeconds() / 2);
  const dosDate =
    ((year - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate();

  return { dosDate, dosTime };
};

const createLocalFileHeader = (entry) => {
  const fileName = Buffer.from(entry.zipPath);
  const header = Buffer.alloc(30);

  header.writeUInt32LE(0x04034b50, 0);
  header.writeUInt16LE(20, 4);
  header.writeUInt16LE(0, 6);
  header.writeUInt16LE(0, 8);
  header.writeUInt16LE(entry.dosTime, 10);
  header.writeUInt16LE(entry.dosDate, 12);
  header.writeUInt32LE(entry.crc32, 14);
  header.writeUInt32LE(entry.size, 18);
  header.writeUInt32LE(entry.size, 22);
  header.writeUInt16LE(fileName.length, 26);
  header.writeUInt16LE(0, 28);

  return Buffer.concat([header, fileName]);
};

const createCentralDirectoryHeader = (entry) => {
  const fileName = Buffer.from(entry.zipPath);
  const header = Buffer.alloc(46);

  header.writeUInt32LE(0x02014b50, 0);
  header.writeUInt16LE(20, 4);
  header.writeUInt16LE(20, 6);
  header.writeUInt16LE(0, 8);
  header.writeUInt16LE(0, 10);
  header.writeUInt16LE(entry.dosTime, 12);
  header.writeUInt16LE(entry.dosDate, 14);
  header.writeUInt32LE(entry.crc32, 16);
  header.writeUInt32LE(entry.size, 20);
  header.writeUInt32LE(entry.size, 24);
  header.writeUInt16LE(fileName.length, 28);
  header.writeUInt16LE(0, 30);
  header.writeUInt16LE(0, 32);
  header.writeUInt16LE(0, 34);
  header.writeUInt16LE(0, 36);
  header.writeUInt32LE(0, 38);
  header.writeUInt32LE(entry.offset, 42);

  return Buffer.concat([header, fileName]);
};

const createEndOfCentralDirectory = (entryCount, centralDirectorySize, centralDirectoryOffset) => {
  const header = Buffer.alloc(22);

  header.writeUInt32LE(0x06054b50, 0);
  header.writeUInt16LE(0, 4);
  header.writeUInt16LE(0, 6);
  header.writeUInt16LE(entryCount, 8);
  header.writeUInt16LE(entryCount, 10);
  header.writeUInt32LE(centralDirectorySize, 12);
  header.writeUInt32LE(centralDirectoryOffset, 16);
  header.writeUInt16LE(0, 20);

  return header;
};

const files = await collectFiles(sourceDir);
const localParts = [];
const centralDirectoryParts = [];
const entries = [];
let offset = 0;

for (const file of files) {
  const data = await readFile(file.absolutePath);
  const { dosDate, dosTime } = getDosDateTime(file.modifiedAt);
  const entry = {
    ...file,
    crc32: getCrc32(data),
    data,
    dosDate,
    dosTime,
    offset,
    size: data.length,
  };
  const localFileHeader = createLocalFileHeader(entry);

  localParts.push(localFileHeader, data);
  offset += localFileHeader.length + data.length;
  entries.push(entry);
}

const centralDirectoryOffset = offset;

for (const entry of entries) {
  const centralDirectoryHeader = createCentralDirectoryHeader(entry);
  centralDirectoryParts.push(centralDirectoryHeader);
  offset += centralDirectoryHeader.length;
}

const centralDirectory = Buffer.concat(centralDirectoryParts);
const endOfCentralDirectory = createEndOfCentralDirectory(
  entries.length,
  centralDirectory.length,
  centralDirectoryOffset,
);

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, Buffer.concat([...localParts, centralDirectory, endOfCentralDirectory]));

console.log(`Created ${path.relative(rootDir, outputPath)} (${entries.length} files)`);
