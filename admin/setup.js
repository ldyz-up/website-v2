(async function(){
  'use strict';
  const CMS=window.DecapCmsApp;
  if(!CMS){document.getElementById('nc-root').textContent='后台资源加载失败，请重新启动预览。';return;}
  const response=await fetch('/admin/config.json');
  if(!response.ok)throw new Error('后台配置读取失败');
  CMS.init({config:await response.json()});
  CMS.registerPreviewStyle('/css/style.css');
  CMS.registerPreviewStyle('/css/bath-books.css');
  CMS.registerPreviewStyle('/admin/content-preview.css');
  CMS.registerPreviewTemplate('products', function(props){
    const h=window.React.createElement, data=props.entry.get('data').toJS(), image=props.getAsset(data.image), title=data.title||{}, desc=data.description||{};
    const routes={baby:'bath-books',office:'stationery-office-products',bags:'bags-pouches',custom:'custom-rf-welded-products'};
    return h('div',{className:'cms-entry-preview'},h('small',null,'产品内容预览 · 保存后可在网站查看完整效果'),h('img',{src:String(image||''),alt:title.zh||title.en||''}),h('h1',null,title.zh||title.en||'未填写产品名称'),title.zh&&title.en?h('h2',null,title.en):null,h('p',null,desc.zh||''),desc.en?h('p',null,desc.en):null,h('p',null,data.visible===false?'状态：隐藏，不在网页展示':'状态：显示'),h('p',null,'排序：'+(data.order||0)),h('a',{href:'/'+routes[data.category]+'.html',target:'_blank',rel:'noopener'},'保存后查看完整网页 ↗'));
  });
  for(const id of ['index','bath-books','stationery-office-products','bags-pouches','custom-rf-welded-products','company','pages'])CMS.registerPreviewTemplate(id,function(props){
    const h=window.React.createElement,data=props.entry.get('data').toJS(),copy=data.translations||{},zh=copy.zh||{},en=copy.en||{},pictures=(data.images||[]).slice(0,3);
    return h('div',{className:'cms-entry-preview'},h('small',null,'内容预览 · 保存后刷新网站，查看完整布局'),h('h1',null,zh.hero_title||zh.meta_title||zh.brand_name||'公司资料'),h('h2',null,en.hero_title||en.meta_title||en.brand_name||''),h('p',null,zh.hero_sub||zh.hero_desc||zh.meta_desc||''),h('p',null,en.hero_sub||en.hero_desc||en.meta_desc||''),...pictures.map((image,index)=>h('figure',{key:index},h('img',{src:String(props.getAsset(image.src)||''),alt:image.alt||''}),h('figcaption',null,image.label))));
  });
  // Decap's generic label must be explicit in this local-only review environment.
  const labels={'Publish':'保存到本地预览','发布':'保存到本地预览','發佈':'保存到本地预览','立即发布':'保存到本地预览','发布，然后新建内容':'保存后新增内容','发布，然后复制内容':'保存后复制内容','已发布':'已保存（本地预览）','Published':'已保存（本地预览）','查看发布':'查看网站预览'};
  const normalize=()=>{
    const walker=document.createTreeWalker(document.getElementById('nc-root'),NodeFilter.SHOW_TEXT);let node;while((node=walker.nextNode())){const value=labels[node.textContent.trim()];if(value)node.textContent=value;}
  };
  new MutationObserver(normalize).observe(document.getElementById('nc-root'),{subtree:true,childList:true,characterData:true});
})().catch(error=>{console.error(error);document.getElementById('nc-root').textContent='后台未能启动，请检查终端：'+error.message;});
