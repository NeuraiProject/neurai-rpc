import fs from "fs";

// The node's help output still carries Ravencoin's ports in its examples
// (HelpExampleRpc hardcodes 8766 in src/rpc/server.cpp; addnode examples use
// the 8767 P2P port). Normalize to Neurai's ports (RPC 19001, P2P 19000) so a
// docs.json re-synced from `neurai-cli help` never reintroduces them.
const raw = fs
  .readFileSync("./docs.json", "utf8")
  .replace(/127\.0\.0\.1:8766/g, "127.0.0.1:19001")
  .replace(/:8767/g, ":19000");
if (raw !== fs.readFileSync("./docs.json", "utf8")) {
  console.warn("WARN: legacy Ravencoin ports found in docs.json — normalized in output; fix docs.json too");
}

const docs = JSON.parse(raw);

const keys = Object.keys(docs).sort();

const methodsDefinition = [];
for (let key of keys) {
  if (!key) {
    continue;
  }
  methodsDefinition.push(key + ": string;");
}
console.log("Methods definition", methodsDefinition);

const theInterface = `
interface IMethods{
    ${methodsDefinition.join("\n")}
}
`;

fs.writeFileSync("./docs.ts", theInterface);

//Create docs.ts
{
  const result = [];
  result.push(`
export const methods:IMethods ={
`);

  for (let key of keys) {
    if (!key) {
      continue;
    }
    const doc = docs[key];

    if (key.startsWith("depin")) {
      // Keep the rewritten DePIN contract readable and generated without
      // CR-only blank lines or trailing spaces in emitted bundle comments.
      const lines = doc.replace(/\r\n/g, "\n").trimEnd().split("\n");
      result.push("\n\n/**\n" + lines.map(line => " *" + (line ? " " + line : "")).join("\n") + "\n */");
    } else {
      const previous = keys[keys.indexOf(key) - 1];
      const newline = previous?.startsWith("depin") ? "\n" : "\r\n";
      result.push(newline.repeat(6) + `/** ${doc}**/`);
    }
    result.push(`\n${key}:'${key}',`);
  }

  result.push("\n}");

  fs.appendFileSync("./docs.ts", result.join(""));
}

//Create neurai_method.md
{
  const result = [];
  result.push("# Neurai remote procedure calls/methods");
  result.push("\r\n[Home](README.md)");
  for (let key of keys) {
    if (!key) {
      continue;
    }
    const doc = docs[key];
    result.push("\n&nbsp;<br> &nbsp;<br/>");
    result.push("\n## " + key);
    result.push(`\n&nbsp;<br/>  ${doc}`);
  }
  fs.writeFileSync("./neurai_methods.md", result.join(""));
}

// Normalize generated text once so regeneration is reproducible across help
// strings containing either LF or CRLF, without trailing spaces in added rows.
for (const file of ["./docs.ts", "./neurai_methods.md"]) {
  const clean = fs.readFileSync(file,"utf8").replace(/\r\n/g,"\n").split("\n").map(line=>line.trimEnd()).join("\n");
  fs.writeFileSync(file,clean);
}
