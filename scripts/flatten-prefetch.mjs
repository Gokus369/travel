// Runs after every build. Next 16.4 exports prefetch data for nested pages in folders, such as
// __next.packages/__PAGE__.txt, but the browser asks for __next.packages.__PAGE__.txt, so each
// link would 404 on a static host. This moves the files to the names the browser requests.
import fs from "node:fs";
import path from "node:path";

const out = path.join(import.meta.dirname, "../out");
let moved = 0;

function flatten(folder, target, prefix) {
  for (const entry of fs.readdirSync(folder, { withFileTypes: true })) {
    const name = `${prefix}.${entry.name}`;
    if (entry.isDirectory()) flatten(path.join(folder, entry.name), target, name);
    else {
      fs.renameSync(path.join(folder, entry.name), path.join(target, name));
      moved++;
    }
  }
  fs.rmdirSync(folder);
}

function visit(folder) {
  for (const entry of fs.readdirSync(folder, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const child = path.join(folder, entry.name);
    if (entry.name.startsWith("__next.")) flatten(child, folder, entry.name);
    else visit(child);
  }
}

visit(out);
console.log(`${moved} prefetch files moved`);
