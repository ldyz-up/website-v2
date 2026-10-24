import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

export const pageIds = ['index', 'bath-books', 'stationery-office-products', 'bags-pouches', 'custom-rf-welded-products'];
export const languages = ['zh', 'en', 'zh_tw', 'ja', 'ko', 'fr'];
export const categories = {baby:'洗澡书', office:'活页夹与文具', bags:'袋包产品', custom:'定制产品'};
export async function readContent(root) {
  const json = async file => JSON.parse(await readFile(path.join(root, 'content', file), 'utf8'));
  const pages = Object.fromEntries(await Promise.all(pageIds.map(async id => [id, await json(`pages/${id}.json`)])));
  const company = await json('company.json');
  const products = await Promise.all((await readdir(path.join(root, 'content/products')))
    .filter(name => /^[a-z0-9][a-z0-9-]*\.json$/.test(name)).map(name => json(`products/${name}`)));
  for (const product of products) {
    if (!product.id || !categories[product.category] || !product.title || !safeImage(product.image)) throw new Error('产品资料不完整或图片路径无效：' + product.id);
  }
  products.sort((a,b) => Number(a.order ?? 0) - Number(b.order ?? 0) || a.id.localeCompare(b.id));
  return { pages, company, products };
}
export function safeImage(src) {
  if (typeof src !== 'string' || !src.trim()) return false;
  const value = src.replace(/^\//, '');
  return !/[\u0000-\u001f\\"'<>`]/.test(value) && !value.split('/').includes('..') && !/^[a-z]+:/i.test(value) && /\.(png|jpe?g|webp|gif|avif|svg)$/i.test(value);
}
export function dataScript(state) {
  return 'window.LDYZ_CONTENT = ' + JSON.stringify(state).replace(/</g, '\\u003c') + ';\n';
}
