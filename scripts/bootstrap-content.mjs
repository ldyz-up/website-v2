// One-time migration of the existing public pages; refuses to overwrite managed content.
import {readFile,writeFile,mkdir,access} from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {parseHTML} from 'linkedom';
import {languages,pageIds} from './content-store.mjs';
const root=fileURLToPath(new URL('../',import.meta.url));
try{await access(path.join(root,'content/company.json'));throw new Error('已有后台内容，禁止再次迁移覆盖。');}catch(error){if(error.code!=='ENOENT')throw error;}
await mkdir(path.join(root,'content/pages'),{recursive:true});await mkdir(path.join(root,'content/products'),{recursive:true});
const read=name=>readFile(path.join(root,name),'utf8');
function publicImages(value,key=''){if(typeof value==='string'&&['src','image','thumbnail','thumbnail_for','gallery'].includes(key)&&value&&!/^(\/|[a-z]+:)/i.test(value))return '/'+value;if(Array.isArray(value))return value.map(item=>publicImages(item,key));if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,publicImages(v,k)]));return value;}
const json=async(name,value)=>writeFile(path.join(root,name),JSON.stringify(name.startsWith('content/')?publicImages(value):value,null,2)+'\n');
const T=vm.runInNewContext(await read('js/translations.js')+'\nJSON.parse(JSON.stringify(TRANSLATIONS));');
function literal(source,token){let start=source.indexOf(token);if(start<0)throw new Error('无法定位 '+token);start=source.indexOf('{',start);let depth=0,quote='',escaped=false;for(let i=start;i<source.length;i++){const c=source[i];if(quote){if(escaped)escaped=false;else if(c==='\\')escaped=true;else if(c===quote)quote='';continue;}if(c==='"'||c==="'"||c==='`'){quote=c;continue;}if(c==='{')depth++;if(c==='}'&&!--depth)return vm.runInNewContext('('+source.slice(start,i+1)+')');}throw new Error('未闭合的内容对象');}
const bathSource=await read('bath-books.html'),bathCopy=literal(bathSource,'const copy ='),bsci=literal(bathSource,'const bsciCopy ='),visual=literal(bathSource,'const visualDisclosure ='),regulatory=literal(bathSource,'const regulatoryDisclosure =');
const officeSource=await read('js/stationery-i18n.js'),officeCopy=literal(officeSource,'const copy =');
const codes=['en','zh','zh_tw','ja','ko','fr'];
const normalize=s=>s.replace(/\s+/g,' ').trim();
const company={translations:Object.fromEntries(languages.map(lang=>[lang,{}])),images:[]};
const fields={pages:{},company:{keys:[],labels:{}}};
const friendly={hero_title:'首页大标题',hero_sub:'首页介绍',meta_title:'浏览器标题 / 搜索标题',meta_desc:'搜索结果简介',hero_cta1:'首页主按钮文字',hero_cta2:'首页第二按钮文字',brand_name:'公司全称',brand_short:'品牌简称',contact_email:'联系邮箱',contact_addr:'公司地址',contact_phone:'联系电话',visual_disclosure:'产品图片说明',regulatory_disclosure:'市场法规说明'};
function flatten(value,prefix='',out={}){Object.entries(value).forEach(([key,item])=>{const p=prefix?prefix+'__'+key:key;if(p.startsWith('factory_tiles')&&!p.endsWith('__label'))return;if(/^categories__\d+__products/.test(p)||p.endsWith('__img')||p.endsWith('__id'))return;if(typeof item==='string')out[p]=item;else if(item&&typeof item==='object')flatten(item,p,out);});return out;}
function companyKey(key){return /^(brand_|about_|contact_)/.test(key);}
function labelFor(key,value){return friendly[key]||((value||'').length<30&&value?value:key.replaceAll('__',' · '));}
let migratedProducts=0;
for(const id of pageIds){
  let source=await read(id+'.html');const {document}=parseHTML(source);
  const translations=Object.fromEntries(languages.map(lang=>[lang,{}]));
  if(id==='index')for(const lang of languages){for(const [key,value] of Object.entries(flatten(T[lang]||T.en))){(companyKey(key)?company.translations[lang]:translations[lang])[key]=value;}}
  else if(id==='bath-books')for(const lang of languages)translations[lang]={...bathCopy[lang],...bsci[lang],visual_disclosure:visual[lang],regulatory_disclosure:regulatory[lang]};
  const labels={};
  let textIndex=0;
  if(!['index','bath-books'].includes(id)){
    for(const el of document.querySelectorAll('h1,h2,h3,p,span,a')){
      if(el.children.length||!normalize(el.textContent)||el.closest('form,.configuration-summary,.binder-visual,.preview-spec,.binder-configurator'))continue;
      if(el.closest('.bath-gallery,.bath-lightbox,#langSwitch'))continue;
      const key='text-'+(++textIndex),value=normalize(el.textContent);el.setAttribute('data-cms-text',key);
      const translated=id==='stationery-office-products'?officeCopy[value]:null;
      for(const lang of languages)translations[lang][key]=translated?translated[codes.indexOf(lang)]:(lang==='en'?value:'');
      labels[key]=translations.zh[key]||value.slice(0,48);
    }
  }
  if(id==='bath-books'){
    document.getElementById('bathVisualDisclosure')?.setAttribute('data-cms-text','visual_disclosure');
    document.getElementById('regulatoryDisclosure')?.setAttribute('data-cms-text','regulatory_disclosure');
  }
  for(const lang of languages){if(id!=='index'&&id!=='bath-books'){
    const title=document.title,desc=document.querySelector('meta[name="description"]')?.content||'';
    translations[lang].meta_title=(officeCopy[title]||[])[codes.indexOf(lang)]||(lang==='en'?title:'');
    translations[lang].meta_desc=(officeCopy[desc]||[])[codes.indexOf(lang)]||(lang==='en'?desc:'');
  }}
  const images=[];let imageIndex=0;
  for(const img of document.querySelectorAll('img[src]')){
    if(img.closest('.bath-gallery,.bath-lightbox,.binder-visual'))continue;
    const original=img.getAttribute('src'),global=original==='images/logo.png'||/images\/qr-/.test(original);
    const imageId=global?path.basename(original).replace(/\.[^.]+$/,''):id+'-image-'+(++imageIndex);
    img.setAttribute('data-cms-image',imageId);
    const entry={id:imageId,original,src:original,label:original==='images/logo.png'?'网站 Logo':/qr-/.test(original)?'客服二维码 · '+path.basename(original):id==='index'?'首页图片 '+imageIndex:'页面图片 '+imageIndex,alt:img.getAttribute('alt')||''};
    if(global){if(!company.images.some(i=>i.id===imageId))company.images.push(entry);}else images.push(entry);
  }
  if(id==='index'){
    (T.en.factory_tiles||[]).forEach((photo,index)=>images.push({id:'factory-'+index,original:photo.img,src:photo.img,label:'工厂图片 '+(index+1)+' · '+(T.zh.factory_tiles[index]?.label||photo.label),alt:photo.label}));
    const paths={baby:'website-images/Codex输出图片/Bath Book and Waterproof Kids Products/category-hero-baby-kids-web.jpg',office:'website-images/Codex输出图片/办公及文具用品/活页本/floral-six-ring-binder-hero-web.jpg'};
    Object.entries(paths).forEach(([category,src])=>images.push({id:'category-'+category,original:src,src,label:category==='baby'?'首页洗澡书分类卡片':'首页活页夹分类卡片',alt:category==='baby'?'Bath Books':'Ring Binders'}));
  }
  if(id==='bath-books'){
    const dir='website-images/Codex输出图片/Bath Book and Waterproof Kids Products/Bath Book/';
    for(let n=1;n<=16;n++){const number=String(n).padStart(2,'0');await json('content/products/bath-book-'+number+'.json',{id:'bath-book-'+number,category:'baby',visible:true,order:n,title:Object.fromEntries(languages.map(lang=>[lang,bathCopy[lang].book+number])),description:Object.fromEntries(languages.map(lang=>[lang,''])),image:dir+'bath-book-'+number+'.png',thumbnail:dir+'bath-book-'+number+'-thumb.jpg',thumbnail_for:dir+'bath-book-'+number+'.png',gallery:[]});migratedProducts++;}
    document.getElementById('bathGallery').setAttribute('data-cms-products','baby');
  }
  if(id==='stationery-office-products'){
    let n=0;for(const card of document.querySelectorAll('.bath-gallery .bath-card')){n++;const title=normalize(card.querySelector('span')?.textContent||card.querySelector('img').alt);const translated=officeCopy[title];const image=card.getAttribute('data-image')||card.querySelector('img').getAttribute('src');await json('content/products/binder-'+n+'.json',{id:'binder-'+n,category:'office',visible:true,order:n,title:Object.fromEntries(languages.map(lang=>[lang,translated?translated[codes.indexOf(lang)]:(lang==='en'?title:'')])),description:Object.fromEntries(languages.map(lang=>[lang,''])),image,thumbnail:card.querySelector('img').getAttribute('src'),thumbnail_for:image,gallery:[]});migratedProducts++;}
    document.querySelector('.bath-gallery').setAttribute('data-cms-products','office');
  }
  if(id==='bags-pouches'||id==='custom-rf-welded-products'){
    const gallery=document.createElement('div');gallery.className='bath-gallery';gallery.setAttribute('data-cms-products',id==='bags-pouches'?'bags':'custom');gallery.hidden=true;document.querySelector('.gallery-content').appendChild(gallery);
  }
  const keyList=Object.keys(translations.en);
  for(const key of keyList)labels[key]=labels[key]||labelFor(key,translations.zh[key]);
  fields.pages[id]={keys:keyList,labels};
  await json('content/pages/'+id+'.json',{translations,images});
  // Only add content plumbing. Keep the existing scripts, widgets, routes and styles.
  document.head.insertAdjacentHTML('beforeend','\n<link rel="stylesheet" href="css/managed-content.css">\n<script src="content/managed-data.js"></script>\n<script src="js/managed-content.js"></script>\n');
  await writeFile(path.join(root,id+'.html'),document.toString());
}
fields.company.keys=Object.keys(company.translations.en);for(const key of fields.company.keys)fields.company.labels[key]=labelFor(key,company.translations.zh[key]);
await json('content/company.json',company);await json('admin/fields.json',fields);

let main=await read('js/main.js');
main=main.replace('  "use strict";','  "use strict";\n  if (window.LDYZManaged) window.LDYZManaged.mergeTranslations(TRANSLATIONS);');
await writeFile(path.join(root,'js/main.js'),main);
let bath=await read('bath-books.html');
bath=bath.replace('const t = Object.assign({}, copy[lang] || copy.en, bsciCopy[lang] || bsciCopy.en);','const t = Object.assign({}, copy[lang] || copy.en, bsciCopy[lang] || bsciCopy.en, window.LDYZManaged ? window.LDYZManaged.pageText("bath-books", lang) : {});');
bath=bath.replace(/(gallery\.innerHTML = bookNumbers\.map[^\n]+\n)/,'$1        if (window.LDYZManaged) window.LDYZManaged.renderProducts(gallery, "baby", lang);\n');
bath=bath.replace(/(galleryMore\.textContent = galleryLabels\[lang\][^\n]+\n)/,'$1        if (window.LDYZManaged) window.LDYZManaged.updateGalleryButton(galleryMore, lang, galleryExpanded);\n');
bath=bath.replace(/(galleryMore\.textContent = galleryLabels\[activeLanguage\][^\n]+\n)/,'$1        if (window.LDYZManaged) window.LDYZManaged.updateGalleryButton(galleryMore, activeLanguage, galleryExpanded);\n');
await writeFile(path.join(root,'bath-books.html'),bath);
console.log('已迁移5个页面、'+migratedProducts+'个产品；公司资料和6语言文案均已导入。');
