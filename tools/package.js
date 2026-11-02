/**
 * 테마 폴더 → dist/{slug}.zip
 * 사용: node tools/package.js clients/{client}   (또는 templates/{template})
 *
 * tar -a 로 ZIP 생성: 경로 구분자가 `/` 여야 카페24(Linux) WP가 style.css를 찾는다.
 */
var fs = require("fs");
var os = require("os");
var path = require("path");
var childProcess = require("child_process");

var EXCLUDE = /^(dist|node_modules|_private|\.gitkeep|\.DS_Store|Thumbs\.db|.*\.local\.(php|json))$/;

var target = process.argv[2];
if (!target) {
  console.error("사용: npm run package -- clients/{client}");
  process.exit(1);
}

var root = path.resolve(__dirname, "..");
var srcDir = path.resolve(root, target);
var slug = path.basename(srcDir);

if (!fs.existsSync(path.join(srcDir, "style.css"))) {
  console.error("[package] style.css 없음 — 테마 폴더가 아님: " + srcDir);
  process.exit(1);
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  fs.readdirSync(src, { withFileTypes: true }).forEach(function (entry) {
    if (EXCLUDE.test(entry.name)) return;
    var from = path.join(src, entry.name);
    var to = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(from, to);
    else fs.copyFileSync(from, to);
  });
}

var distDir = path.join(root, "dist");
var zipPath = path.join(distDir, slug + ".zip");
fs.mkdirSync(distDir, { recursive: true });
if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);

var stageRoot = fs.mkdtempSync(path.join(os.tmpdir(), "kmong-pkg-"));
copyDir(srcDir, path.join(stageRoot, slug));

try {
  childProcess.execSync('tar -a -cf "' + zipPath + '" "' + slug + '"', { cwd: stageRoot, stdio: "inherit" });
} finally {
  fs.rmSync(stageRoot, { recursive: true, force: true });
}

console.log("[package] 완료 → dist/" + slug + ".zip");
console.log("[package] 카페24 WP: 외모 > 테마 > 새로 추가 > 테마 업로드");
