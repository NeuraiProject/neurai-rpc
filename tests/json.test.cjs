const { assertNoDuplicateJsonKeys } = require('../dist/index.cjs');
test('rejects all duplicate keys, including escaped names and equal values', () => {
  for (const text of ['{"a":1,"a":1}', '{"a":1,"a":2}', '{"a":1,"\\u0061":1}', '{"x":[{"a":1,"a":1}]}'])
    expect(() => assertNoDuplicateJsonKeys(text)).toThrow(SyntaxError);
  for (const text of ['{"a":1,"b":{"a":1}}', '[{"a":1},{"a":1}]']) expect(() => assertNoDuplicateJsonKeys(text)).not.toThrow();
  expect(() => assertNoDuplicateJsonKeys('['.repeat(129) + '0' + ']'.repeat(129))).toThrow(/nesting/);
});
