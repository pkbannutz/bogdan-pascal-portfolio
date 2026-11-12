/* FPV page interactions: route scrubbing, optional synthetic cue and film viewer. */
(function(){
  'use strict';
  var modes={
    chase:{number:'01',title:'FOLLOW THE ACTION',short:'01 / FOLLOW',note:'Stay with the subject. The movement should make the viewer feel the speed, not just watch it.',image:'/assets/filmmaker/thorpepark/t.jpg',path:'M 90 400 C 250 370 390 330 540 250 S 770 170 910 145'},
    reveal:{number:'02',title:'CHANGE THE PERSPECTIVE',short:'02 / REVEAL',note:'A carefully timed change in height or direction can turn one frame into a completely new view.',image:'/assets/filmmaker/tui-romania/t.jpg',path:'M 120 445 C 140 440 200 400 265 350 S 435 140 535 170 S 785 160 905 90'},
    through:{number:'03',title:'CONNECT THE SPACES',short:'03 / FLY-THROUGH',note:'A route through a space works best when each turn reveals something purposeful about the place.',image:'/assets/filmmaker/geodome/t.jpg',path:'M 85 395 C 190 260 300 430 445 280 S 610 160 735 270 S 860 230 925 85'},
    aerial:{number:'04',title:'LET THE WORLD OPEN',short:'04 / WIDE',note:'A wide aerial movement can establish location, scale and geography without distracting from the scene.',image:'/assets/filmmaker/sky-above/t.jpg',path:'M 85 450 C 290 440 370 330 480 290 S 755 170 905 75'}
  };
  var buttons=[].slice.call(document.querySelectorAll('[data-flight]'));
  var path=document.getElementById('fp-route-line'),glow=document.getElementById('fp-route-glow');
  var drone=document.getElementById('fp-drone'),origin=document.getElementById('fp-origin'),end=document.getElementById('fp-destination');
  var stageImage=document.getElementById('fp-stage-image'),status=document.getElementById('fp-flight-status');
  var title=document.getElementById('fp-shot-title'),index=document.getElementById('fp-shot-index');
  var menuCount=document.querySelector('.fp-lab-menu-top .fp-label:last-child');
  var monitorLabel=document.getElementById('fp-monitor-label'),note=document.getElementById('fp-lab-note');
  var play=document.getElementById('fp-play'),seek=document.getElementById('fp-seek'),progress=document.getElementById('fp-progress');
  var sound=document.getElementById('fp-sound');
  if(!path||!glow||!drone||!seek||!play){return;}
  var selected='chase',amount=0,playing=false,raf=0,lastTime=0;
  var reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  var audioCtx=null,osc=null,oscGain=null,filter=null,soundEnabled=false;
  function setSoundVolume(){
    if(!audioCtx||!oscGain){return;}
    oscGain.gain.setTargetAtTime(soundEnabled&&playing?0.014:0,audioCtx.currentTime,0.06);
    if(osc){osc.frequency.setTargetAtTime(76+amount*0.07,audioCtx.currentTime,0.12);}
  }
  function initAudio(){
    var Audio=window.AudioContext||window.webkitAudioContext;
    if(!Audio){return false;}
    if(audioCtx){audioCtx.resume().catch(function(){});return true;}
    try{
      audioCtx=new Audio();
      osc=audioCtx.createOscillator();
      filter=audioCtx.createBiquadFilter();
      oscGain=audioCtx.createGain();
      osc.type='triangle';osc.frequency.value=84;
      filter.type='lowpass';filter.frequency.value=230;
      oscGain.gain.value=0;
      osc.connect(filter);filter.connect(oscGain);oscGain.connect(audioCtx.destination);
      osc.start();
      return true;
    }catch(e){audioCtx=null;return false;}
  }
  function moveTo(value){
    amount=Math.min(1000,Math.max(0,Number(value)||0));
    seek.value=String(Math.round(amount));
    seek.style.setProperty('--value',(amount/10)+'%');
    progress.textContent=String(Math.round(amount/10)).padStart(3,'0')+'%';
    var length=path.getTotalLength(),p=path.getPointAtLength(length*amount/1000);
    drone.setAttribute('transform','translate('+p.x+' '+p.y+')');
    setSoundVolume();
  }
  function stop(){
    playing=false;window.cancelAnimationFrame(raf);raf=0;lastTime=0;
    play.innerHTML='PLAY <span aria-hidden="true">▶</span>';
    play.setAttribute('aria-label','Play route animation');
    status.textContent='PAUSED';
    setSoundVolume();
  }
  function frame(now){
    if(!playing){return;}
    if(lastTime){moveTo((amount+(now-lastTime)*0.13)%1000);}
    lastTime=now;raf=window.requestAnimationFrame(frame);
  }
  function setMode(key){
    if(!Object.prototype.hasOwnProperty.call(modes,key)){return;}
    stop();selected=key;var m=modes[key];
    path.setAttribute('d',m.path);glow.setAttribute('d',m.path);
    var length=path.getTotalLength(),a=path.getPointAtLength(0),b=path.getPointAtLength(length);
    origin.setAttribute('cx',a.x);origin.setAttribute('cy',a.y);
    end.setAttribute('cx',b.x);end.setAttribute('cy',b.y);
    stageImage.src=m.image;
    title.textContent=m.title;index.textContent='ROUTE / '+m.number;
    monitorLabel.textContent=m.short;menuCount.textContent=m.number+' / 04';
    note.textContent=m.note;
    buttons.forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.flight===key));});
    moveTo(0);
  }
  buttons.forEach(function(b){b.addEventListener('click',function(){setMode(b.dataset.flight);});});
  play.addEventListener('click',function(){
    if(playing){stop();return;}
    if(reduced.matches){moveTo(amount>=1000?0:amount+100);status.textContent='STEP MODE';return;}
    playing=true;lastTime=0;play.innerHTML='PAUSE <span aria-hidden="true">Ⅱ</span>';
    play.setAttribute('aria-label','Pause route animation');status.textContent='IN MOTION';
    if(soundEnabled){initAudio();}setSoundVolume();raf=window.requestAnimationFrame(frame);
  });
  seek.addEventListener('input',function(){if(playing){stop();}moveTo(this.value);});
  sound.addEventListener('click',function(){
    if(!soundEnabled&&!initAudio()){
      sound.textContent='AUDIO UNAVAILABLE';sound.disabled=true;return;
    }
    soundEnabled=!soundEnabled;sound.setAttribute('aria-pressed',String(soundEnabled));
    sound.textContent=soundEnabled?'SOUND / ON':'SOUND / OFF';setSoundVolume();
  });
  document.addEventListener('visibilitychange',function(){if(document.hidden){stop();}});
  window.addEventListener('pagehide',function(){stop();if(audioCtx){audioCtx.close().catch(function(){});}});
  setMode('chase');
  var films={
    thorpe:{title:'THORPE PARK / THRILL RUNNERS',type:'iframe',src:'https://www.youtube-nocookie.com/embed/0lZ2EZRtzok',url:'/filmmaker/work/thorpepark/'},
    therme:{title:'THERME / BBC STORYWORKS',type:'iframe',src:'https://player.vimeo.com/video/1181302232?title=0&byline=0&portrait=0&dnt=1',url:'/filmmaker/work/therme/'},
    tui:{title:'TUI ROMANIA',type:'iframe',src:'https://player.vimeo.com/video/1211936322?title=0&byline=0&portrait=0&dnt=1',url:'/filmmaker/work/tui-romania/'},
    push:{title:'SPEEDO / PUSH. REPEAT',type:'video',src:'https://pub-3547ec32a0d34f27b0847acdf37e296f.r2.dev/speedo-push-repeat.mp4',url:'/filmmaker/work/push/'}
  };
  var dialog=document.getElementById('fp-dialog'),player=document.getElementById('fp-dialog-player');
  var close=document.getElementById('fp-dialog-close'),dialogTitle=document.getElementById('fp-dialog-title');
  var dialogLink=document.getElementById('fp-dialog-link'),previousFocus=null;
  function closeDialog(){
    if(dialog.open){dialog.close();}
    player.replaceChildren();
    if(previousFocus){previousFocus.focus();}
  }
  document.querySelectorAll('[data-film]').forEach(function(b){
    b.addEventListener('click',function(){
      var film=films[b.dataset.film];if(!film){return;}
      stop();previousFocus=b;player.replaceChildren();
      dialogTitle.textContent=film.title;dialogLink.href=film.url;
      var el=document.createElement(film.type==='video'?'video':'iframe');
      if(film.type==='video'){el.controls=true;el.playsInline=true;el.preload='metadata';}
      else{el.allow='autoplay; fullscreen; picture-in-picture';el.allowFullscreen=true;}
      el.src=film.src;el.title=film.title+' film';player.appendChild(el);
      if(typeof dialog.showModal==='function'){dialog.showModal();}
      else{window.location.href=film.url;}
    });
  });
  close.addEventListener('click',closeDialog);
  dialog.addEventListener('close',function(){player.replaceChildren();});
  dialog.addEventListener('click',function(e){if(e.target===dialog){closeDialog();}});
})();
