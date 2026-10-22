/** Detect duplicate JSON property names, including equal values and escaped names.
 * Syntax and numeric decoding are delegated to the JSON parser afterwards.
 */
export function assertNoDuplicateJsonKeys(text: string): void {
  const stack: Array<{ keys?: Set<string>; expectKey?: boolean; close: string }> = [];
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '"') {
      const start = i++;
      while (i < text.length && text[i] !== '"') {
        if (text[i] === '\\') i++;
        i++;
      }
      if (i >= text.length) throw new SyntaxError('Unterminated JSON string');
      const top = stack[stack.length - 1];
      if (top?.keys && top.expectKey) {
        const key = JSON.parse(text.slice(start, i + 1));
        if (top.keys.has(key)) throw new SyntaxError('Duplicate JSON key');
        top.keys.add(key);
        top.expectKey = false;
      }
    } else if (ch === '{' || ch === '[') {
      if (stack.length >= 128) throw new SyntaxError('JSON nesting limit exceeded');
      stack.push(ch === '{' ? { keys: new Set(), expectKey: true, close: '}' } : { close: ']' });
    } else if (ch === '}' || ch === ']') {
      if (stack.pop()?.close !== ch) throw new SyntaxError('Invalid JSON nesting');
    } else if (ch === ',' && stack[stack.length - 1]?.keys) stack[stack.length - 1].expectKey = true;
  }
}
