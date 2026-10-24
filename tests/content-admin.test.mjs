import {test} from 'node:test';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {cp,mkdir,mkdtemp,readFile,rm} from 'node:fs/promises';
import {once} from 'node:events';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {parseHTML} from 'linkedom';
import {readContent} from '../scripts/content-store.mjs';

const source=fileURLToPath(new URL('../',import.meta.url));
const origin='http://127.0.0.1:8279',proxy='http://127.0.0.1:8089/api/v1';
function boot(root){
  const child=spawn(process.execPath,[path.join(source,'scripts/preview.mjs')],{cwd:root,env:{...process.env,LDYZ_PREVIEW_ROOT:root,LDYZ_PREVIEW_PORT:'8279',LDYZ_PROXY_PORT:'8089'},stdio:['ignore','pipe','pipe']});
  const ready=new Promise((resolve,reject)=>{let output='';const timer=setTimeout(()=>reject(new Error('预览测试启动超时：'+output)),15000);child.stdout.on('data',chunk=>{output+=chunk.toString();if(output.includes('中文后台')){clearTimeout(timer);resolve(child);}});child.stderr.on('data',chunk=>{output+=chunk.toString();});child.once('exit',code=>{clearTimeout(timer);if(code)reject(new Error(output));});});
  return {child,ready};
}
async function stop(child){if(child.exitCode!==null)return;const ended=once(child,'exit');child.kill('SIGTERM');await ended;}
async function rpc(action,params){const response=await fetch(proxy,{method:'POST',headers:{'Content-Type':'application/json',Origin:origin},body:JSON.stringify({action,params:{branch:'feat/content-admin-preview',...params}})});const body=await response.json();assert.equal(response.status,200,JSON.stringify(body));return body;}
async function save(file,data){await rpc('persistEntry',{branch:'feat/content-admin-preview',entry:{slug:path.basename(file,'.json'),path:file,raw:JSON.stringify(data,null,2)+'\n'},assets:[],options:{collectionName:'products',commitMessage:'integration test local save',useWorkflow:false,status:'published'}});}
async function servedState(){const response=await fetch(origin+'/content/managed-data.js');assert.equal(response.status,200);const sandbox={window:{}};vm.runInNewContext(await response.text(),sandbox);return JSON.parse(JSON.stringify(sandbox.window.LDYZ_CONTENT));}
async function rendered(state,html='<html lang="en"><body><div id="gallery"></div></body></html>'){
  const {document}=parseHTML(html);Object.defineProperty(document,'readyState',{value:'loading'});
  const context={window:{LDYZ_CONTENT:state},document,location:{pathname:'/bath-books.html',search:'',href:origin+'/bath-books.html'},localStorage:{getItem(){return 'en';}},setTimeout,clearTimeout};
  vm.runInNewContext(await readFile(path.join(source,'js/managed-content.js'),'utf8'),context);
  context.window.LDYZManaged.renderProducts(document.getElementById('gallery'),'baby','en');
  return {document,managed:context.window.LDYZManaged};
}

test('official Decap proxy saves, uploads, adds, hides, sorts and persists across restart',async()=>{
  await mkdir(path.join(source,'.cache'),{recursive:true});
  const root=await mkdtemp(path.join(source,'.cache/integration-'));
  let app;
  try{
    for(const name of ['content','admin','js','css'])await cp(path.join(source,name),path.join(root,name),{recursive:true});
    await mkdir(path.join(root,'images'));await cp(path.join(source,'images/logo.png'),path.join(root,'images/logo.png'));
    for(const name of ['index','bath-books','stationery-office-products','bags-pouches','custom-rf-welded-products'])await cp(path.join(source,name+'.html'),path.join(root,name+'.html'));
    app=boot(root);await app.ready;
    assert.equal((await rpc('info',{})).type,'local_fs');
    const home=JSON.parse(await readFile(path.join(root,'content/pages/index.json'),'utf8'));
    home.translations.en.hero_title='Saved heading <plain text>';
    home.images[0].src='/uploads/test-upload.png';
    const bytes=await readFile(path.join(source,'images/logo.png'));
    await rpc('persistMedia',{asset:{path:'uploads/test-upload.png',content:bytes.toString('base64'),encoding:'base64'},options:{commitMessage:'integration image upload'}});
    await save('content/pages/index.json',home);
    assert.deepEqual(Buffer.from(await (await fetch(origin+'/uploads/test-upload.png')).arrayBuffer()),bytes);
    const added={id:'integration-new',category:'baby',visible:true,order:-10,title:{en:'Added <img src=x onerror=alert(1)>',zh:'新增产品'},description:{en:'Description & details'},image:'/uploads/test-upload.png',gallery:[]};
    await save('content/products/integration-new.json',added);
    const existing=JSON.parse(await readFile(path.join(root,'content/products/bath-book-02.json'),'utf8'));existing.visible=false;await save('content/products/bath-book-02.json',existing);
    let state=await servedState();
    assert.equal(state.pages.index.translations.en.hero_title,home.translations.en.hero_title);
    assert.equal(state.pages.index.images[0].src,'/uploads/test-upload.png');
    const firstRender=await rendered(state);
    const cards=firstRender.document.querySelectorAll('[data-cms-product]');assert.equal(cards.length,16);assert.equal(cards[0].dataset.cmsProduct,added.id);
    assert.equal(cards[0].querySelectorAll('img').length,1);assert.equal(cards[0].querySelector('span').textContent,added.title.en);
    assert.ok(!firstRender.document.querySelector('[data-cms-product="bath-book-02"]'));
    const defaults={en:{hero_title:'before',categories:[{name:'old'}]},zh:{hero_title:'之前',categories:[{name:'原名'}]}};
    firstRender.managed.mergeTranslations(defaults);assert.equal(defaults.en.hero_title,home.translations.en.hero_title);
    added.order=999;await save('content/products/integration-new.json',added);
    let result=await rendered(await servedState());assert.equal(result.document.querySelectorAll('[data-cms-product]')[15].dataset.cmsProduct,added.id);
    await stop(app.child);app=boot(root);await app.ready;
    state=await servedState();assert.equal(state.products.find(p=>p.id===added.id).order,999);assert.equal(state.pages.index.translations.en.hero_title,home.translations.en.hero_title);
    assert.deepEqual(await readFile(path.join(root,'uploads/test-upload.png')),bytes);
    await rpc('deleteFile',{branch:'feat/content-admin-preview',path:'content/products/integration-new.json',options:{commitMessage:'integration product delete'}});
    assert.ok(!(await servedState()).products.some(p=>p.id===added.id));
    assert.equal((await fetch(origin+'/.git/config')).status,403);
    assert.equal((await fetch(origin+'/send_mail.php',{method:'POST',body:'blocked'})).status,405);
    const csp=(await fetch(origin+'/')).headers.get('content-security-policy');assert.ok(csp.includes("form-action 'none'"));assert.ok(!csp.includes('forms.ldyzgroup.com'));
    const real=await readContent(source);assert.ok(!real.products.some(p=>p.id==='integration-new'));
  }finally{if(app)await stop(app.child);await rm(root,{recursive:true,force:true});}
});
