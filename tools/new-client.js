/**
 * 템플릿을 복사해 주문 작업본을 만든다.
 * 사용: node tools/new-client.js {template} {client}
 *
 * 텍스트 파일 안의 템플릿 slug(텍스트 도메인·함수 접두사 등)를 고객 slug로 바꾼다.
 * 하이픈 slug는 언더스코어 형태(my_tpl)도 같이 바꾼다.
 */
var fs = require("fs");
var path = require("path");

var template = process.argv[2];
var client = process.argv[3];
var SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

if (!template || !client || !SLUG.test(client)) {
  console.error("사용: npm run new-client -- {template} {client}   (client는 영문 소문자-하이픈)");
  process.exit(1);
}

var root = path.resolve(__dirname, "..");
var srcDir = path.join(root, "templates", template);
var destDir = path.join(root, "clients", client);

if (!fs.existsSync(srcDir)) {
  console.error("[new-client] 템플릿 없음: templates/" + template);
  process.exit(1);
}
if (fs.existsSync(destDir)) {
  console.error("[new-client] 이미 있음: clients/" + client);
  process.exit(1);
}

var TEXT_EXT = /\.(php|css|js|json|txt|md|html|svg|pot)$/i;
var pairs = [
  [template, client],
  [template.replace(/-/g, "_"), client.replace(/-/g, "_")],
];

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  fs.readdirSync(src, { withFileTypes: true }).forEach(function (entry) {
    if (entry.name === "dist" || entry.name === "node_modules") return;
    var from = path.join(src, entry.name);
    var to = path.join(dest, entry.name);
    if (entry.isDirectory()) return copyDir(from, to);
    if (!TEXT_EXT.test(entry.name)) return fs.copyFileSync(from, to);
    var text = fs.readFileSync(from, "utf8");
    pairs.forEach(function (p) {
      text = text.split(p[0]).join(p[1]);
    });
    fs.writeFileSync(to, text);
  });
}

copyDir(srcDir, destDir);
console.log("[new-client] clients/" + client + " 생성 (원본: templates/" + template + ")");
console.log("[new-client] 다음: style.css의 Theme Name 확인 → 고객 값 반영 → npm run dev -- clients/" + client);
