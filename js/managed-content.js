(function(){
  'use strict';
  var state=window.LDYZ_CONTENT;
  if(!state)return;
  var page=(location.pathname.split('/').pop()||'index.html').replace(/\.html$/,'');
  var langCodes={'zh-CN':'zh','zh-TW':'zh_tw','en':'en','ja':'ja','ko':'ko','fr':'fr'};
  function language(){
    var fromHtml=langCodes[document.documentElement.lang];
    if(fromHtml)return fromHtml;
    try{return new URLSearchParams(location.search).get('lang')||localStorage.getItem('longde_site_lang')||'en';}catch(e){return 'en';}
  }
  function localized(value,lang){return value && (value[lang]||value.en||value.zh)||'';}
  function pageText(id,lang){var p=state.pages[id]||{},c=p.translations||{},base=Object.assign({},c.en||{});Object.keys(c[lang]||{}).forEach(function(key){if(lang==='en'||c[lang][key]!=='')base[key]=c[lang][key];});return base;}
  function escape(value){return String(value==null?'':value).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function safeImage(value){return typeof value==='string' && !/^[a-z]+:/i.test(value) && !/[\\\u0000-\u001f"'<>`]/.test(value) && !value.split('/').includes('..') && /\.(png|jpe?g|webp|gif|avif|svg)$/i.test(value);}
  function products(category){return state.products.filter(function(p){return p.category===category&&p.visible!==false;}).slice().sort(function(a,b){return Number(a.order||0)-Number(b.order||0)||a.id.localeCompare(b.id);});}
  function mergeTranslations(defaults){
    Object.keys(defaults).forEach(function(lang){
      var p=(state.pages.index||{}).translations||{}, company=state.company.translations||{};
      var values=Object.assign({},p[lang]||{},company[lang]||{});
      Object.keys(values).forEach(function(key){var parts=key.split('__'),target=defaults[lang];for(var i=0;i<parts.length-1;i++){if(['__proto__','constructor','prototype'].includes(parts[i]))return;if(target[parts[i]]==null)return;target=target[parts[i]];}if(!['__proto__','constructor','prototype'].includes(parts[parts.length-1]))target[parts[parts.length-1]]=values[key];});
      var photos=(state.pages.index.images||[]).filter(function(i){return i.id.indexOf('factory-')===0;});
      if(defaults[lang].factory_tiles)defaults[lang].factory_tiles.forEach(function(photo,index){var edit=photos.find(function(i){return i.id==='factory-'+index;});if(edit&&safeImage(edit.src))photo.img=edit.src;});
    });
  }
  function allImages(){return ((state.pages[page]||{}).images||[]).concat(state.company.images||[]);}
  function mapImage(original){var entry=allImages().find(function(item){return item.original===original;});return entry&&safeImage(entry.src)?entry.src:original;}
  function applyImages(){
    var entries=allImages();
    document.querySelectorAll('img[data-cms-image]').forEach(function(img){var item=entries.find(function(i){return i.id===img.dataset.cmsImage;});if(item&&safeImage(item.src)){img.src=item.src;if(item.alt)img.alt=item.alt;}});
    // Generated homepage category images have no static HTML marker.
    document.querySelectorAll('#categoryGrid img').forEach(function(img){var card=img.closest('[data-cat]'),entry=entries.find(function(i){return card&&i.id==='category-'+card.dataset.cat;});if(entry&&safeImage(entry.src))img.src=entry.src;});
  }
  function renderProducts(container,category,lang){
    if(!container)return;
    var items=products(category);lang=lang||language();
    container.innerHTML=items.map(function(p){var title=localized(p.title,lang),desc=localized(p.description,lang),thumb=p.thumbnail_for===p.image&&safeImage(p.thumbnail)?p.thumbnail:p.image;return '<button class="bath-card cms-product-card" type="button" data-cms-product="'+escape(p.id)+'" data-image="'+escape(p.image)+'" aria-label="'+escape(title)+'"><img src="'+escape(thumb)+'" alt="'+escape(title)+'" loading="lazy"><span>'+escape(title)+'</span>'+(desc?'<small class="cms-product-description">'+escape(desc)+'</small>':'')+'</button>';}).join('');
    if(!items.length)container.innerHTML='<p class="cms-empty">'+(lang==='zh'?'暂无展示产品。':'No products to display.')+'</p>';
    container.dataset.cmsCategory=category;
    if(category!=='baby')container.classList.add('is-expanded');
    if(category==='bags'||category==='custom')container.hidden=!items.length;
  }
  function updateGalleryButton(button,lang,expanded){
    if(!button)return;var count=products('baby').length;
    var labels={zh:['查看全部 '+count+' 款产品','收起产品'],zh_tw:['查看全部 '+count+' 款產品','收起產品'],en:['View all '+count+' products','Show fewer products'],ja:['全'+count+'点を見る','表示を減らす'],ko:['전체 '+count+'개 제품 보기','간략히 보기'],fr:['Voir les '+count+' produits','Réduire la galerie']};
    button.textContent=(labels[lang]||labels.en)[expanded?1:0];button.hidden=count<=6;
  }
  function applyStatic(){
    var lang=language(),copy=pageText(page,lang);
    document.querySelectorAll('[data-cms-text]').forEach(function(el){var text=copy[el.dataset.cmsText];if(text!==undefined)el.textContent=text;});
    var company=Object.assign({},state.company.translations.en||{},state.company.translations[lang]||{});
    if(company.brand_short)document.querySelectorAll('.brand-name').forEach(function(el){el.textContent=company.brand_short;});
    if(company.contact_email&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(company.contact_email))document.querySelectorAll('a[href^="mailto:"]').forEach(function(el){el.setAttribute('href','mailto:'+company.contact_email);});
    if(copy.meta_title)document.title=copy.meta_title;
    var description=document.querySelector('meta[name="description"]');if(description&&copy.meta_desc)description.content=copy.meta_desc;
    [['og:title','meta_title'],['twitter:title','meta_title'],['og:description','meta_desc'],['twitter:description','meta_desc']].forEach(function(pair){var meta=document.querySelector('meta[property="'+pair[0]+'"],meta[name="'+pair[0]+'"]');if(meta&&copy[pair[1]])meta.content=copy[pair[1]];});
    applyImages();
    document.querySelectorAll('[data-cms-products]').forEach(function(el){renderProducts(el,el.dataset.cmsProducts,lang);});
  }
  window.LDYZManaged={mergeTranslations:mergeTranslations,pageText:pageText,mapImage:mapImage,renderProducts:renderProducts,products:products,updateGalleryButton:updateGalleryButton,applyImages:applyImages};
  function ready(){
    applyStatic();
    var header=document.createElement('aside');header.className='cms-preview-banner';header.innerHTML='<strong>后台预览分支</strong><span>内容仅在本地预览，不发布正式网站</span><a href="/admin/" target="_blank" rel="noopener">管理内容 ↗</a>';document.body.prepend(header);document.body.classList.add('cms-preview-mode');
    var hint=document.createElement('div');hint.className='cms-preview-toast';hint.setAttribute('role','status');hint.hidden=true;document.body.appendChild(hint);
    // Capture submits before any existing inquiry listener. No preview inquiry leaves this machine.
    document.addEventListener('submit',function(event){event.preventDefault();event.stopImmediatePropagation();hint.textContent='这是预览环境，表单没有发送邮件。';hint.hidden=false;setTimeout(function(){hint.hidden=true;},5000);},true);
    var originalFetch=window.fetch.bind(window);
    window.fetch=function(input,options){var address=typeof input==='string'?input:input.url;var url=new URL(address,location.href);if(url.origin!==location.origin||options&&options.method&&options.method.toUpperCase()!=='GET')return Promise.reject(new Error('预览环境已禁用外部请求与邮件发送'));return originalFetch(input,options);};
    document.addEventListener('click',function(event){
      var button=event.target.closest('[data-cms-product]');if(!button)return;event.preventDefault();event.stopImmediatePropagation();
      var product=state.products.find(function(p){return p.id===button.dataset.cmsProduct;});if(!product)return;
      var images=[product.image].concat(product.gallery||[]).filter(safeImage),index=0;
      var overlay=document.createElement('div');overlay.className='bath-lightbox cms-product-lightbox';overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.setAttribute('aria-label',localized(product.title,language()));
      overlay.innerHTML='<button type="button" class="bath-lightbox-close" aria-label="Close / 关闭">×</button><button type="button" class="cms-gallery-prev" aria-label="Previous / 上一张">←</button><img alt="'+escape(localized(product.title,language()))+'"><button type="button" class="cms-gallery-next" aria-label="Next / 下一张">→</button><span class="cms-gallery-count"></span>';
      function show(){overlay.querySelector('img').src=images[index];overlay.querySelector('.cms-gallery-count').textContent=(index+1)+' / '+images.length;overlay.querySelector('.cms-gallery-prev').hidden=images.length<2;overlay.querySelector('.cms-gallery-next').hidden=images.length<2;}
      var previousFocus=document.activeElement;
      var previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';
      function close(){document.removeEventListener('keydown',keydown);overlay.remove();document.body.style.overflow=previousOverflow;previousFocus.focus();}
      function keydown(e){if(e.key==='Escape')close();if(e.key==='ArrowRight'){index=(index+1)%images.length;show();}if(e.key==='ArrowLeft'){index=(index+images.length-1)%images.length;show();}if(e.key==='Tab'){var focus=Array.from(overlay.querySelectorAll('button:not([hidden])'));var position=focus.indexOf(document.activeElement);e.preventDefault();focus[(position+(e.shiftKey?-1:1)+focus.length)%focus.length].focus();}}
      overlay.addEventListener('click',function(e){if(e.target===overlay||e.target.closest('.bath-lightbox-close'))close();else if(e.target.closest('.cms-gallery-next')){index=(index+1)%images.length;show();}else if(e.target.closest('.cms-gallery-prev')){index=(index+images.length-1)%images.length;show();}});
      document.addEventListener('keydown',keydown);document.body.appendChild(overlay);show();overlay.querySelector('button').focus();
    },true);
    // Reapply image selections after the existing language switch rerenders homepage cards.
    document.addEventListener('click',function(event){if(event.target.closest('[data-lang]'))setTimeout(applyStatic,0);});
    document.addEventListener('change',function(event){if(event.target.matches('#mobileLangSelect'))setTimeout(applyStatic,0);});
    window.addEventListener('stationery:language',applyStatic);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready);else ready();
}());
