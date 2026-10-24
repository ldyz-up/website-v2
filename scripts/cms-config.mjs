import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { languages, categories, pageIds } from './content-store.mjs';
const names={zh:'简体中文',en:'English 英文',zh_tw:'繁體中文',ja:'日本語',ko:'한국어',fr:'Français'};
const pages={index:'首页管理','bath-books':'洗澡书页面','stationery-office-products':'活页夹页面','bags-pouches':'袋包页面','custom-rf-welded-products':'定制产品页面'};
const image={label:'选择 / 上传图片',name:'src',widget:'image',choose_url:false,media_library:{config:{multiple:false}},allow_multiple:false};
function translations(keys,labels) {
  return {label:'页面文字（按语言填写）',name:'translations',widget:'object',fields:languages.map(lang=>({label:names[lang],name:lang,widget:'object',collapsed:!['zh','en'].includes(lang),fields:keys.map(key=>({label:labels[key]||key,name:key,widget:'text',required:false}))}))};
}
function images(){return {label:'页面图片',name:'images',widget:'list',allow_add:false,allow_delete:false,summary:'{{fields.label}}',fields:[{name:'id',widget:'hidden'},{name:'original',widget:'hidden'},{label:'图片位置',name:'label',widget:'string'},{...image},{label:'图片说明',name:'alt',widget:'string',required:false}]};}
function localized(name,label,widget='string',englishRequired=false){return {name,label,widget:'object',collapsed:false,fields:languages.map(lang=>({name:lang,label:names[lang],widget,required:lang==='en'&&englishRequired}))};}
export async function makeConfig(root,proxyPort=8081){
  const fields=JSON.parse(await readFile(path.join(root,'admin/fields.json'),'utf8'));
  const files=pageIds.map(id=>({name:id,label:pages[id],file:`content/pages/${id}.json`,fields:[translations(fields.pages[id].keys,fields.pages[id].labels),images()]}));
  return {
    load_config_file:false,locale:'zh_Hans',site_url:'http://127.0.0.1:8268',display_url:'http://127.0.0.1:8268',logo_url:'/images/logo.png',
    backend:{name:'git-gateway',branch:'feat/content-admin-preview'},local_backend:{url:`http://127.0.0.1:${proxyPort}/api/v1`},publish_mode:'simple',
    media_folder:'uploads',public_folder:'/uploads',
    collections:[
      {name:'pages',label:'首页与页面文字',format:'json',files},
      {name:'products',label:'产品管理',label_singular:'产品',folder:'content/products',format:'json',extension:'json',create:true,delete:true,slug:'{{id}}',identifier_field:'id',summary:'{{title.zh}} · {{title.en}}',sortable_fields:['order','category','id'],view_filters:Object.entries(categories).map(([value,label])=>({label,field:'category',pattern:value})),fields:[
        {name:'id',label:'产品编号',widget:'string',hint:'小写英文字母、数字和短横线，例如 bath-book-17。保存后建议保持编号不变。',pattern:['^[a-z0-9]+(?:-[a-z0-9]+)*$','请使用小写字母、数字和短横线']},
        {name:'category',label:'产品分类',widget:'select',options:Object.entries(categories).map(([value,label])=>({value,label})),default:'baby'},
        {name:'visible',label:'在网站上显示',widget:'boolean',default:true},
        {name:'order',label:'展示顺序',widget:'number',value_type:'int',default:100,hint:'数字越小越靠前。隐藏产品不会出现在网站中。'},
        localized('title','产品名称','string',true),localized('description','产品介绍','text'),
        {...image,name:'image',label:'产品主图'},
        {name:'thumbnail',widget:'hidden',required:false},{name:'thumbnail_for',widget:'hidden',required:false},
        {name:'gallery',label:'其他细节图片',widget:'list',required:false,field:{...image,name:'image'}},
      ]},
      {name:'company',label:'公司资料与二维码',format:'json',files:[{name:'company',label:'公司介绍 / 联系方式 / 二维码',file:'content/company.json',fields:[translations(fields.company.keys,fields.company.labels),images()]}]},
    ],
  };
}
