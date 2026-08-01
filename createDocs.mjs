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

    result.push(`\r\n\r\n\r\n\r\n\r\n\r\n/** ${doc}**/`);
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
    result.push("\r\n&nbsp;<br> &nbsp;<br/>");
    result.push("\r\n## " + key);
    result.push(`\r\n&nbsp;<br/>  ${doc} `);
  }
  fs.writeFileSync("./neurai_methods.md", result.join(""));
}
