/*eslint no-console: ["error", { allow: ["warn", "error"] }] */

const fs = require('fs');
// コマンドライン上で、対話形式の入力を提供するパッケージ
const inquirer = require('inquirer');
// 依存関係のもつれを解決するべく制定されたバージョニングの標準仕様（Semantic versioning）
const semver = require('semver');
const pkg = require('./package.json');
const manifest = require('./chrome/manifest.json');

const curVersion = manifest.version;

(async () => {
  // inquirer.prompt(questions) -> promise
  const { newVersion } = await inquirer.prompt([
    {
      // https://www.npmjs.com/package/inquirer#input---type-input
      type: 'input',
      name: 'newVersion',
      message: `Please provide a version (current: ${curVersion}):`
    }
  ]);

  // newVersionが解釈可能な文字列かどうかチェック
  if (!semver.valid(newVersion)) {
    console.error(`Invalid version: ${newVersion}`);
    process.exit(1);
  }

  // v1 < v2
  if (semver.lt(newVersion, curVersion)) {
    console.error(
      `New version (${newVersion}) cannot be lower than current version (${curVersion}).`
    );
    process.exit(1);
  }

  const { yes } = await inquirer.prompt([
    {
      name: 'yes',
      message: `Release ${newVersion}?`,
      // https://www.npmjs.com/package/inquirer#confirm---type-confirm
      type: 'confirm'
    }
  ]);

  if (yes) {
    pkg.version = newVersion;
    manifest.version = newVersion;
    fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2));
    fs.writeFileSync(
      './chrome/manifest.json',
      JSON.stringify(manifest, null, 2)
    );
  } else {
    process.exit(1);
  }
})();
