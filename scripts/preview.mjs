import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { readFile, mkdir } from 'node:fs/promises';
import { readContent, dataScript } from './content-store.mjs';
import { makeConfig } from './cms-config.mjs';
import { build } from 'esbuild';

const require = createRequire(import.meta.url);
const root = process.env.LDYZ_PREVIEW_ROOT ? path.resolve(process.env.LDYZ_PREVIEW_ROOT) : fileURLToPath(new URL('../', import.meta.url));
const cmsRoot = path.dirname(require.resolve('decap-cms-app/package.json'));
const cmsRequire = createRequire(path.join(cmsRoot, 'package.json'));
const cli = require(require.resolve('@decap/cli/dev', {paths:[path.dirname(require.resolve('decap-server/package.json'))]}));
const port = Number(process.env.LDYZ_PREVIEW_PORT || 8268);
const proxyPort = Number(process.env.LDYZ_PROXY_PORT || 8081);
const origin = `http://127.0.0.1:${port}`;
await mkdir(path.join(root, '.cache'), {recursive:true});
await mkdir(path.join(root, 'uploads'), {recursive:true});
await build({stdin:{contents:`import React from ${JSON.stringify(cmsRequire.resolve('react'))}; import * as ReactDOM from ${JSON.stringify(cmsRequire.resolve('react-dom'))}; window.React=React;window.ReactDOM=ReactDOM;`,resolveDir:root},bundle:true,platform:'browser',format:'iife',minify:true,outfile:path.join(root,'.cache/react-globals.js'),define:{'process.env.NODE_ENV':'"production"'}});

// Official Decap local file-system proxy. It cannot edit the main checkout or contact GitHub.
const proxy = await cli.runDevServer({port:proxyPort,host:'127.0.0.1',origin,dir:root,mode:'fs',logLevel:'warn'});
const mime = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.gif':'image/gif','.avif':'image/avif','.wasm':'application/wasm','.ico':'image/x-icon'};
const server = http.createServer(async (req,res) => {
  res.setHeader('Cache-Control','no-store');
  res.setHeader('X-Content-Type-Options','nosniff');
  res.setHeader('Referrer-Policy','same-origin');
  res.setHeader('Content-Security-Policy',`connect-src 'self' http://127.0.0.1:${proxyPort}; form-action 'none'; frame-ancestors 'self'`);
  if (req.headers.host !== `127.0.0.1:${port}` && req.headers.host !== `localhost:${port}`) {res.writeHead(403).end('不允许的访问地址');return;}
  if (!['GET','HEAD'].includes(req.method)) {res.writeHead(405).end('预览不发送邮件');return;}
  try {
    const rawPath = new URL(req.url,origin).pathname;
    let name = decodeURIComponent(rawPath);
    if (name === '/') name='/index.html';
    if (name === '/admin' || name === '/admin/') name='/admin/index.html';
    if (name.split('/').some(part=>part.startsWith('.') || part === '..') || name.includes('\\')) {res.writeHead(403).end('禁止访问');return;}
    let body, filename;
    if (name === '/content/managed-data.js') {body=dataScript(await readContent(root));filename=name;}
    else if (name === '/admin/config.json') {body=JSON.stringify(await makeConfig(root,proxyPort));filename=name;}
    else if (name === '/vendor/react-globals.js') filename=path.join(root,'.cache/react-globals.js');
    else if (/^\/vendor\/decap\/[a-zA-Z0-9_.-]+\.(js|wasm)$/.test(name)) filename=path.join(cmsRoot,'dist',path.basename(name));
    else {
      if (!/^\/(?:index\.html|bath-books\.html|stationery-office-products\.html|bags-pouches\.html|custom-rf-welded-products\.html|(?:admin|js|css|images|website-images|uploads)\/)/.test(name)) {res.writeHead(404).end('未找到预览页面');return;}
      filename=path.join(root,name.slice(1));
      if (!mime[path.extname(filename).toLowerCase()]) {res.writeHead(403).end('文件类型不开放');return;}
    }
    if (body === undefined) body=await readFile(filename);
    res.setHeader('Content-Type',mime[path.extname(filename).toLowerCase()] || 'application/octet-stream');
    res.writeHead(200).end(req.method === 'HEAD' ? undefined : body);
  } catch(error) {
    const code=error.code === 'ENOENT' ? 404 : 500;
    res.writeHead(code,{'Content-Type':'text/plain; charset=utf-8'}).end(code===404?'未找到文件':'预览内容读取失败，请检查后台资料。');
    if(code===500)console.error(error.message);
  }
});
server.on('error',error=>{console.error(error.message);proxy.close();process.exitCode=1;});
server.listen(port,'127.0.0.1',()=>console.log(`官网预览 ${origin}/\n中文后台 ${origin}/admin/\n本地代理 127.0.0.1:${proxyPort}；预览不发送真实邮件。`));
for (const signal of ['SIGINT','SIGTERM']) process.on(signal,()=>{server.closeAllConnections();proxy.closeAllConnections?.();server.close();proxy.close();});
