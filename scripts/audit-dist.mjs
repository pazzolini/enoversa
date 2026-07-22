import { readFile, readdir } from "node:fs/promises";
import { extname, relative, resolve, sep } from "node:path";

const root = resolve(import.meta.dirname, "..");
const outputRoot = resolve(root, "dist");

const rootFiles = [
  /^\.htaccess$/,
  /^404\.html$/,
  /^favicon\.png$/,
  /^index\.html$/,
  /^og-image\.png$/,
  /^robots\.txt$/,
  /^rss\.xml$/,
  /^sitemap-index\.xml$/,
  /^sitemap-\d+\.xml$/,
];

const routeRoots = new Set([
  "about",
  "addresses",
  "essays",
  "methodology",
  "portraits",
  "selections",
]);

const assetExtensions = new Set([".css", ".js", ".woff2"]);
const imageExtensions = new Set([".avif", ".jpeg", ".jpg", ".png", ".svg", ".webp"]);
const sensitivePatterns = [
  { label: "a local filesystem path", pattern: /\/Users\/|Web Development/ },
  { label: "a deployment secret name", pattern: /FTP_(?:SERVER|USERNAME|PASSWORD)/ },
  { label: "a private key", pattern: /-----BEGIN (?:RSA |OPENSSH |EC )?PRIVATE KEY-----/ },
];
const inspectableExtensions = new Set([".css", ".html", ".js", ".txt", ".xml"]);

const files = [];
const failures = [];

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolutePath = resolve(directory, entry.name);
    const relativePath = relative(outputRoot, absolutePath).split(sep).join("/");

    if (entry.isSymbolicLink()) {
      failures.push(`${relativePath}: symbolic links are not allowed`);
      continue;
    }

    if (entry.isDirectory()) {
      await walk(absolutePath);
      continue;
    }

    if (!entry.isFile()) {
      failures.push(`${relativePath}: unsupported filesystem entry`);
      continue;
    }

    files.push({ absolutePath, relativePath });
  }
}

function hasAllowedLocation(relativePath) {
  const segments = relativePath.split("/");

  if (segments.length === 1) {
    return rootFiles.some((pattern) => pattern.test(relativePath));
  }

  const [topLevel] = segments;
  const extension = extname(relativePath).toLowerCase();

  if (topLevel === "_astro") return assetExtensions.has(extension);
  if (topLevel === "images") return imageExtensions.has(extension);
  if (routeRoots.has(topLevel)) return segments.at(-1) === "index.html";

  return false;
}

try {
  await walk(outputRoot);
} catch (error) {
  console.error(`Production surface audit could not read dist/: ${error.message}`);
  process.exit(1);
}

for (const file of files) {
  if (!hasAllowedLocation(file.relativePath)) {
    failures.push(`${file.relativePath}: file is outside the approved production surface`);
    continue;
  }

  if (!inspectableExtensions.has(extname(file.relativePath).toLowerCase())) continue;

  const contents = await readFile(file.absolutePath, "utf8");
  for (const sensitive of sensitivePatterns) {
    if (sensitive.pattern.test(contents)) {
      failures.push(`${file.relativePath}: contains ${sensitive.label}`);
    }
  }
}

if (failures.length > 0) {
  console.error("Production surface audit failed:\n");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Production surface audit passed: ${files.length} approved files in dist/.`);
