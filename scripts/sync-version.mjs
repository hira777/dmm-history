import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const packageJsonPath = path.join(rootDir, 'package.json');
const manifestJsonPath = path.join(rootDir, 'chrome', 'manifest.json');

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const manifestJson = JSON.parse(fs.readFileSync(manifestJsonPath, 'utf8'));

if (manifestJson.version === packageJson.version) {
  console.log(`Manifest version is already ${packageJson.version}`);
  process.exit(0);
}

manifestJson.version = packageJson.version;

fs.writeFileSync(
  manifestJsonPath,
  `${JSON.stringify(manifestJson, null, 2)}\n`
);

console.log(`Synced manifest version to ${packageJson.version}`);
