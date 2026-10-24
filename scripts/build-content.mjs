import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { readContent, dataScript } from './content-store.mjs';
const root = fileURLToPath(new URL('../', import.meta.url));
await writeFile(new URL('../content/managed-data.js', import.meta.url), dataScript(await readContent(root)));
console.log('网页内容文件已生成。');
