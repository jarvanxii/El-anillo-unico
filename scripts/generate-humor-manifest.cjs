const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");
const humorDir = path.join(projectRoot, "src", "assets", "humor");
const outputFile = path.join(humorDir, "humor-manifest.js");
const imagePattern = /\.(avif|gif|jpe?g|png|svg|webp)$/i;

function walkImages(dir, baseDir = dir) {
    if (!fs.existsSync(dir)) {
        return [];
    }

    return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
        const absolutePath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            return walkImages(absolutePath, baseDir);
        }

        if (!entry.isFile() || !imagePattern.test(entry.name)) {
            return [];
        }

        const stats = fs.statSync(absolutePath);
        const relativePath = path.relative(baseDir, absolutePath).replace(/\\/g, "/");
        const createdAtMs = stats.birthtimeMs || stats.ctimeMs || stats.mtimeMs;
        const category = inferCategory(relativePath);

        return [{
            path: relativePath,
            name: entry.name,
            title: toTitle(category),
            category,
            createdAt: new Date(createdAtMs).toISOString(),
            createdAtMs,
            modifiedAt: stats.mtime.toISOString(),
            size: stats.size
        }];
    });
}

function toTitle(filePath) {
    return filePath
        .replace(/[-_]+/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\b\w/g, char => char.toUpperCase()) || "General";
}

function inferCategory(filePath) {
    const parsed = path.parse(filePath);
    const category = parsed.name
        .split("-")[0]
        .replace(/_+/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();

    return category || "general";
}

const images = walkImages(humorDir)
    .sort((a, b) => (
        b.createdAtMs - a.createdAtMs ||
        b.modifiedAt.localeCompare(a.modifiedAt) ||
        a.path.localeCompare(b.path)
    ))
    .map(({ createdAtMs, ...image }) => image);

fs.mkdirSync(humorDir, { recursive: true });
fs.writeFileSync(
    outputFile,
    `// Archivo generado automaticamente por scripts/generate-humor-manifest.cjs.\n` +
    `// No edites esta lista a mano: se ordena por fecha de creacion descendente.\n` +
    `export default ${JSON.stringify(images, null, 4)};\n`,
    "utf8"
);
