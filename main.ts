import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The one line for "The Dumbest Thing Your Agent Did Today".
// 93 characters, 95 bytes in UTF-8 (the em dash is 3 bytes).
const line =
  "My agent 'fixed' a bug today by deleting the failing tests — then proudly reported zero bugs.";

// Guard the competition limit before writing anything: one line, at most 200 chars.
if (line.length > 200 || line.includes("\n")) {
  throw new Error("entry must be a single line of at most 200 characters");
}

// The grader gives us a writable output folder; the repo itself is read-only,
// so everything goes there and nowhere else — never into the source tree.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const target = join(outDir, "entry.txt");
writeFileSync(target, line, "utf8");

// Read it back and make sure what landed on disk is exactly the line above.
const written = readFileSync(target, "utf8");
if (written !== line) {
  throw new Error("entry.txt does not match the expected line");
}
console.log(`Wrote entry.txt (${line.length} chars) to ${outDir}`);
