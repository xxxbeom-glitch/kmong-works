/**
 * WordPress Playground로 테마를 로컬에서 띄운다 (PHP·Docker 불필요).
 * 사용: node tools/dev.js templates/{template}   → http://127.0.0.1:9400
 */
var fs = require("fs");
var path = require("path");
var childProcess = require("child_process");

var target = process.argv[2];
if (!target) {
  console.error("사용: npm run dev -- templates/{template}");
  process.exit(1);
}

var themeDir = path.resolve(__dirname, "..", target);
var slug = path.basename(themeDir);

if (!fs.existsSync(path.join(themeDir, "style.css"))) {
  console.error("[dev] style.css 없음 — 테마 폴더가 아님: " + themeDir);
  process.exit(1);
}

// 마운트 후 해당 테마를 바로 활성화하는 blueprint
var blueprint = {
  landingPage: "/",
  login: true,
  steps: [{ step: "activateTheme", themeFolderName: slug }],
};
var blueprintPath = path.join(require("os").tmpdir(), "kmong-dev-" + slug + ".json");
fs.writeFileSync(blueprintPath, JSON.stringify(blueprint));

var args = [
  "-y",
  "@wp-playground/cli@latest",
  "server",
  "--mount=" + themeDir + ":/wordpress/wp-content/themes/" + slug,
  "--blueprint=" + blueprintPath,
];

console.log("[dev] " + slug + " → http://127.0.0.1:9400 (Ctrl+C로 종료)");
childProcess.spawn("npx", args, { stdio: "inherit", shell: true }).on("exit", function (code) {
  process.exit(code || 0);
});
