import fs from "fs";

const docs = JSON.parse(fs.readFileSync("./docs.json"));

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
