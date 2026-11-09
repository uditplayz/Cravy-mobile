// Fails CI / pre-commit if any unicode emoji is found in tracked source or docs.
// Rule 1 in CLAUDE.md: zero emojis anywhere in the codebase.
const { execSync } = require("node:child_process");
const { readFileSync } = require("node:fs");

const EMOJI =
  /[\u{1F000}-\u{1F2FF}\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{1F900}-\u{1F9FF}]/u;

const files = execSync("git ls-files", { encoding: "utf8" })
  .split("\n")
  .filter((f) => /\.(ts|tsx|js|json|md|css|sql|toml)$/.test(f));

let failures = 0;
for (const file of files) {
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    if (EMOJI.test(line)) {
      failures += 1;
      console.error(`${file}:${i + 1}: emoji found`);
    }
  });
}

if (failures > 0) {
  console.error(`\n${failures} emoji occurrence(s). See CLAUDE.md rule 1.`);
  process.exit(1);
}
console.log("No emojis found.");
