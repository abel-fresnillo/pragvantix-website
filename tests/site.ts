import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'node-html-parser';

// Parse a page from the built site (seam 1).
export function builtPage(file: string) {
  return parse(readFileSync(join(process.cwd(), 'dist', file), 'utf8'));
}
