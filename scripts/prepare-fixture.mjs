import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { basename, dirname, join } from 'node:path';
import prettier from 'prettier';

const sourcePath = 'dev/fixtures/raw/fanza-list-page.html';
const outputPath = 'dev/fixtures/fanza-list-page.html';
const fixtureRootPath = dirname(outputPath);
const cssOutputDirectoryPath = join(fixtureRootPath, 'assets/css');

const trackingImageHosts = [
  'ad.doubleclick.net',
  'analytics.twitter.com',
  'dmp.dsp.bance.jp',
  'sync.shinobi.jp',
  't.co',
];

const removeTag = (html, tagName) =>
  html.replace(new RegExp(`<${tagName}\\b[^>]*>.*?</${tagName}>`, 'gis'), '');

const removeTrackingImages = (html) => {
  return trackingImageHosts.reduce((currentHtml, host) => {
    const escapedHost = host.replaceAll('.', '\\.');
    return currentHtml.replace(
      new RegExp(`<img\\b[^>]*src=["'][^"']*${escapedHost}[^"']*["'][^>]*>`, 'gi'),
      '',
    );
  }, html);
};

const removeEmptyHiddenBlocks = (html) => {
  let currentHtml = html;
  let previousHtml;

  do {
    previousHtml = currentHtml;
    currentHtml = currentHtml.replace(
      /<div\b[^>]*style=["'][^"']*(?:display:\s*none|visibility:\s*hidden)[^"']*["'][^>]*>\s*<\/div>/gi,
      '',
    );
  } while (currentHtml !== previousHtml);

  return currentHtml;
};

const getStylesheetUrls = (html) => {
  const stylesheetUrls = new Set();
  const linkPattern = /<link\b[^>]*>/gi;
  const hrefPattern = /\shref=(["'])(.*?)\1/i;
  const stylesheetPattern = /\srel=(["'])stylesheet\1/i;

  for (const [linkTag] of html.matchAll(linkPattern)) {
    if (!stylesheetPattern.test(linkTag)) {
      continue;
    }

    const href = hrefPattern.exec(linkTag)?.[2];

    if (href?.startsWith('http://') || href?.startsWith('https://')) {
      stylesheetUrls.add(href);
    }
  }

  return [...stylesheetUrls];
};

const toCssFileName = (stylesheetUrl) => {
  const url = new URL(stylesheetUrl);
  const hostName = url.hostname.replaceAll('.', '-');
  const fileName = basename(url.pathname) || 'style.css';

  return `${hostName}-${fileName}`;
};

const downloadStylesheets = async (stylesheetUrls) => {
  const stylesheetMap = new Map();

  await mkdir(cssOutputDirectoryPath, { recursive: true });

  for (const stylesheetUrl of stylesheetUrls) {
    const fileName = toCssFileName(stylesheetUrl);
    const outputCssPath = join(cssOutputDirectoryPath, fileName);
    const response = await fetch(stylesheetUrl);

    if (!response.ok) {
      throw new Error(
        `Failed to download CSS: ${stylesheetUrl} (${response.status})`,
      );
    }

    await writeFile(outputCssPath, await response.text());
    stylesheetMap.set(stylesheetUrl, `./assets/css/${fileName}`);
  }

  return stylesheetMap;
};

const replaceStylesheetUrls = (html, stylesheetMap) => {
  let replacedHtml = html;

  for (const [stylesheetUrl, localPath] of stylesheetMap) {
    replacedHtml = replacedHtml.replaceAll(stylesheetUrl, localPath);
  }

  return replacedHtml;
};

const cleanHtml = (html) => {
  let cleanedHtml = html;

  cleanedHtml = cleanedHtml.replace(
    /<div\s+id=["']tracking_area["'][\s\S]*?<\/div>/i,
    '',
  );
  cleanedHtml = removeTag(cleanedHtml, 'script');
  cleanedHtml = removeTag(cleanedHtml, 'iframe');
  cleanedHtml = removeTag(cleanedHtml, 'noscript');
  cleanedHtml = cleanedHtml.replace(
    /<link\b(?=[^>]*\brel=["']preload["'])(?=[^>]*\bas=["']script["'])[^>]*>/gi,
    '',
  );
  cleanedHtml = cleanedHtml.replace(/\sdata-tracking-[\w-]+=(["']).*?\1/gi, '');
  cleanedHtml = removeTrackingImages(cleanedHtml);
  cleanedHtml = removeEmptyHiddenBlocks(cleanedHtml);

  return cleanedHtml;
};

const sourceHtml = await readFile(sourcePath, 'utf8');
const stylesheetMap = await downloadStylesheets(getStylesheetUrls(sourceHtml));
const cleanedHtml = replaceStylesheetUrls(cleanHtml(sourceHtml), stylesheetMap);
const formattedHtml = await prettier.format(cleanedHtml, {
  parser: 'html',
});

await mkdir(fixtureRootPath, { recursive: true });
await writeFile(outputPath, formattedHtml);

console.log(`Prepared fixture: ${outputPath}`);
