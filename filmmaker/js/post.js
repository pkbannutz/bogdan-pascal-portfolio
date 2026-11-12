
(() => {
 'use strict';
 const root=document.querySelector('.post');
 if(!root)return;
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 if(root.classList.contains('ed')){
   const films=[
    {id:'geodome',title:'GeoDomeX',detail:'Brand film / Hers by Day, His by Night',type:'video',url:'https://pub-3547ec32a0d34f27b0847acdf37e296f.r2.dev/geodome-main.mp4',poster:'/assets/filmmaker/geodome/t.jpg',page:'/filmmaker/work/geodome/'},
    {id:'push',title:'Speedo: Push. Repeat',detail:'Movement / Online content',type:'video',url:'https://pub-3547ec32a0d34f27b0847acdf37e296f.r2.dev/speedo-push-repeat.mp4',poster:'/assets/filmmaker/push/t.jpg',page:'/filmmaker/work/push/'},
    {id:'miki',title:'Miki with Love',detail:'Brand film / Commercial',type:'video',url:'https://pub-3547ec32a0d34f27b0847acdf37e296f.r2.dev/miki-main.mp4',poster:'/assets/filmmaker/miki/t.jpg',page:'/filmmaker/work/miki/'},
    {id:'particle',title:'Particle',detail:'Product / For Men',type:'video',url:'https://pub-3547ec32a0d34f27b0847acdf37e296f.r2.dev/particle.mp4',poster:'/assets/filmmaker/particle/t.jpg',page:'/filmmaker/work/particle/'},
    {id:'dyla',title:"Dyla's Atelier",detail:"Documentary / A Designer's Story",type:'embed',url:'https://player.vimeo.com/video/1047813220?title=0&byline=0&portrait=0&dnt=1',poster:'/assets/filmmaker/dyla/t.jpg',page:'/filmmaker/work/dyla/'},
    {id:'rawpot',title:'RawPot Health',detail:'Social / Online content series',type:'video',url:'https://pub-3547ec32a0d34f27b0847acdf37e296f.r2.dev/rawpot-gold-landscape.mp4',poster:'/assets/filmmaker/rawpot/t.jpg',page:'/filmmaker/work/rawpot/'},
    {id:'ffern',title:'Ffern',detail:'Brand film / Discover Summer',type:'video',url:'https://pub-3547ec32a0d34f27b0847acdf37e296f.r2.dev/ffern.mp4',poster:'/assets/filmmaker/ffern/t.jpg',page:'/filmmaker/work/ffern/'},
    {id:'renais',title:'Renais',detail:'Product / Anniversary Bottle',type:'video',url:'https://pub-3547ec32a0d34f27b0847acdf37e296f.r2.dev/renais.mp4',poster:'/assets/filmmaker/renais/t.jpg',page:'/filmmaker/work/renais/'}
   ];
   const player=root.querySelector('#ed-player'),embed=root.querySelector('#ed-embed'),filmTitle=root.querySelector('#ed-film-title'),detail=root.querySelector('#ed-film-detail'),filmLink=root.querySelector('#ed-film-link'),now=root.querySelector('#ed-now');
   const playlist=[...root.querySelectorAll('[data-film]')];
   const cards=[...root.querySelectorAll('[data-card]')];
   function selectFilm(id,scroll){
     const film=films.find(f=>f.id===id);
     if(!film)return;
     player.pause();
     player.removeAttribute('src');
     player.querySelector('source').removeAttribute('src');
     player.load();
     embed.src='about:blank';
     if(film.type==='video'){
       embed.hidden=true;player.hidden=false;
       player.poster=film.poster;
       player.querySelector('source').src=film.url;
       player.load();
     }else{
       player.hidden=true;embed.hidden=false;embed.src=film.url;
     }
     filmTitle.textContent=film.title;detail.textContent=film.detail;filmLink.href=film.page;
     now.textContent=String(films.indexOf(film)+1).padStart(2,'0');
     playlist.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.film===id)));
     if(scroll)root.querySelector('#viewing').scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'start'});
   }
   playlist.forEach(button=>button.addEventListener('click',()=>selectFilm(button.dataset.film,false)));
   cards.forEach(card=>{
     card.addEventListener('click',()=>selectFilm(card.dataset.card,true));
     const preview=card.querySelector('video[data-preview]');
     if(!preview)return;
     card.addEventListener('pointerenter',event=>{
       if(event.pointerType!=='mouse'||reduced.matches)return;
       if(!preview.src)preview.src=preview.dataset.preview;
       preview.play().then(()=>card.classList.add('is-previewing')).catch(()=>{});
     });
     card.addEventListener('pointerleave',()=>{
       card.classList.remove('is-previewing');
       preview.pause();preview.currentTime=0;
     });
     card.addEventListener('focusout',()=>{card.classList.remove('is-previewing');preview.pause();});
   });
   const filters=[...root.querySelectorAll('[data-filter]')],result=root.querySelector('#ed-results');
   filters.forEach(button=>button.addEventListener('click',()=>{
     const chosen=button.dataset.filter;
     let visible=0;
     cards.forEach(card=>{
       card.hidden=chosen!=='all'&&card.dataset.filterCategory!==chosen;
       if(!card.hidden)visible++;
       const preview=card.querySelector('video');
       if(preview&&card.hidden){preview.pause();card.classList.remove('is-previewing');}
     });
     filters.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
     result.textContent='SHOWING '+String(visible).padStart(2,'0')+' FILM'+(visible===1?'':'S');
   }));
   const frame=root.querySelector('#ed-frame-image'),frameCount=root.querySelector('#ed-frame-count'),range=root.querySelector('#ed-frame-slider'),thumbs=[...root.querySelectorAll('[data-frame]')];
   let request=0;
   const setFrame=(index)=>{
     const selected=Math.max(0,Math.min(6,Number(index)));
     const src='/assets/filmmaker/geodome/'+String(selected+1).padStart(2,'0')+'.jpg';
     const token=++request,preload=new Image();
     preload.onload=()=>{if(token!==request)return;frame.src=src;frame.alt='GeoDomeX selected still '+(selected+1);};
     preload.src=src;
     frameCount.textContent=String(selected+1).padStart(2,'0')+' / 07';
     range.value=String(selected);
     thumbs.forEach((thumb,i)=>thumb.setAttribute('aria-pressed',String(i===selected)));
   };
   thumbs.forEach(thumb=>thumb.addEventListener('click',()=>setFrame(thumb.dataset.frame)));
   range.addEventListener('input',()=>setFrame(range.value));
 }
 if(root.querySelector('#dl-crop')){
   const buttons=[...root.querySelectorAll('[data-ratio]')],crop=root.querySelector('#dl-crop'),image=root.querySelector('#dl-crop-image'),label=root.querySelector('#dl-ratio-label'),corner=root.querySelector('#dl-crop-corner'),position=root.querySelector('#dl-position');
   const shapes={'16:9':['wide','WIDESCREEN'],'9:16':['vertical','VERTICAL'],'1:1':['square','SQUARE'],'4:5':['portrait','PORTRAIT']};
   buttons.forEach(b=>b.addEventListener('click',()=>{
     const ratio=b.dataset.ratio,shape=shapes[ratio];
     if(!shape)return;
     crop.dataset.shape=shape[0];label.textContent=ratio+' / '+shape[1];corner.textContent=ratio;
     image.alt='GeoDomeX film frame previewed in a '+ratio+' crop';
     buttons.forEach(other=>other.setAttribute('aria-pressed',String(b===other)));
   }));
   position.addEventListener('input',()=>{image.style.objectPosition=position.value+'% center';});
   const videos=[...root.querySelectorAll('.dl-real video')];
   videos.forEach(video=>video.addEventListener('play',()=>videos.forEach(other=>{if(other!==video)other.pause();})));
 }
})();
