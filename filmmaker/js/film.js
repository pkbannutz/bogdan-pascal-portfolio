(function(){
var pad=function(n){return String(n).padStart(2,'0')};

/* home hero: crossfading stills and a running timecode */
var hero=document.getElementById('hero');
if(hero){
  var bgs=JSON.parse(hero.getAttribute('data-bgs')),names=JSON.parse(hero.getAttribute('data-names')),els=[];
  bgs.forEach(function(u,i){var d=document.createElement('div');d.className='bg'+(i?'':' on');d.style.backgroundImage='url('+u+')';hero.insertBefore(d,hero.firstChild);els.unshift(d)});
  var k=0,cur=document.getElementById('cur');
  setInterval(function(){els[k].classList.remove('on');k=(k+1)%els.length;els[k].classList.add('on');if(cur)cur.textContent=names[k]},4200);
  var f=0,tc=document.getElementById('tc');
  setInterval(function(){f++;var s=Math.floor(f/24);if(tc)tc.textContent='00:'+pad(Math.floor(s/60)%60)+':'+pad(s%60)+':'+pad(f%24)},42);
}

/* work grid: fade in, tap to open on touch screens */
var cards=[].slice.call(document.querySelectorAll('.grid .card'));
if(cards.length&&'IntersectionObserver' in window){
  var io=new IntersectionObserver(function(es){es.forEach(function(e){
    if(e.isIntersecting){var c=e.target;c.classList.add('in');io.unobserve(c);setTimeout(function(){c.style.setProperty('--d','0s')},2400)}
  })},{threshold:.2});
  cards.forEach(function(c){io.observe(c)});
}else{cards.forEach(function(c){c.classList.add('in')})}
var touch=window.matchMedia('(hover:none)').matches;
if(touch){cards.forEach(function(c){c.addEventListener('click',function(e){if(!c.classList.contains('tap')){e.preventDefault();cards.forEach(function(o){o.classList.remove('tap')});c.classList.add('tap')}})})}

/* touch screens: the card nearest the middle of the screen reveals itself, no cursor needed */
if(touch&&cards.length){
  var ticking=false,pick=function(){
    ticking=false;var mid=window.innerHeight/2,best=null,bd=1e9;
    cards.forEach(function(c){var r=c.getBoundingClientRect();if(r.bottom<0||r.top>window.innerHeight)return;var dd=Math.abs((r.top+r.bottom)/2-mid);if(dd<bd){bd=dd;best=c}});
    cards.forEach(function(c){c.classList.toggle('auto',c===best)});
  };
  window.addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(pick)}},{passive:true});
  setInterval(pick,2500);setTimeout(pick,1200);
}

/* stills lightbox */
var links=[].slice.call(document.querySelectorAll('[data-lb]'));
if(links.length){
  var lb=document.createElement('div');lb.id='lb';
  lb.innerHTML='<button class="x" aria-label="Close">CLOSE</button><button class="p" aria-label="Previous">PREV</button><button class="n" aria-label="Next">NEXT</button><img alt=""><span class="c mono"></span>';
  document.body.appendChild(lb);
  var img=lb.querySelector('img'),cnt=lb.querySelector('.c'),i=0;
  function show(n){i=(n+links.length)%links.length;img.src=links[i].getAttribute('href');cnt.textContent=pad(i+1)+' / '+pad(links.length)}
  function close(){lb.classList.remove('on');img.src=''}
  links.forEach(function(a,n){a.addEventListener('click',function(e){e.preventDefault();show(n);lb.classList.add('on')})});
  lb.querySelector('.x').onclick=close;lb.querySelector('.p').onclick=function(){show(i-1)};lb.querySelector('.n').onclick=function(){show(i+1)};
  lb.addEventListener('click',function(e){if(e.target===lb)close()});
  document.addEventListener('keydown',function(e){if(!lb.classList.contains('on'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(i-1);if(e.key==='ArrowRight')show(i+1)});
}
})();
