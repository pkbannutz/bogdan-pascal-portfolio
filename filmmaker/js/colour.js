
(() => {
  'use strict';
  const projects = [
    {id:'geodome',title:'GeoDomeX',subtitle:'Commercial',url:'/filmmaker/work/geodome/',folder:'geodome'},
    {id:'ffern',title:'Ffern',subtitle:'Spec commercial',url:'/filmmaker/work/ffern/',folder:'ffern'},
    {id:'tui-romania',title:'TUI Romania',subtitle:'Travel commercial',url:'/filmmaker/work/tui-romania/',folder:'tui-romania'},
    {id:'inanimate-girl',title:'Fauness',subtitle:'Music video',url:'/filmmaker/work/inanimate-girl/',folder:'inanimate-girl'},
    {id:'sky-above',title:'Sky Above',subtitle:'Short film',url:'/filmmaker/work/sky-above/',folder:'sky-above'},
    {id:'new-grounds',title:'New Grounds',subtitle:'Fashion film',url:'/filmmaker/work/new-grounds/',folder:'new-grounds'}
  ];
  const root = document.querySelector('.cg');
  if (!root) return;
  const frame = root.querySelector('#cg-main-frame');
  const sceneTitle = root.querySelector('#cg-scene-name');
  const sceneSubtitle = root.querySelector('#cg-scene-type');
  const link = root.querySelector('#cg-scene-link');
  const count = root.querySelector('#cg-frame-count');
  const shots = [...root.querySelectorAll('[data-cg-shot]')];
  const projectButtons = [...root.querySelectorAll('[data-cg-project]')];
  const workspace = root.querySelector('.cg-workspace');
  const archive = root.querySelector('.cg-archive');
  const modeButtons = [...root.querySelectorAll('[data-cg-mode]')];
  const viewer = root.querySelector('#cg-viewer');
  const zoomButton = root.querySelector('#cg-zoom');
  const dialog = document.querySelector('#cg-dialog');
  const dialogImage = document.querySelector('#cg-dialog-image');
  const dialogCaption = document.querySelector('#cg-dialog-caption');
  let currentProject = 0, currentShot = 0, token = 0;
  const shotPath = (project, number) => '/assets/filmmaker/' + project.folder + '/' + String(number + 1).padStart(2,'0') + '.jpg';

  function update(projectIndex, shotIndex) {
    const project = projects[projectIndex];
    if (!project) return;
    currentProject = projectIndex;
    currentShot = Math.max(0, Math.min(2, shotIndex));
    const path = shotPath(project,currentShot);
    const nextToken = ++token;
    frame.classList.add('cg-changing');
    const preload = new Image();
    preload.onload = () => {
      if (token !== nextToken) return;
      frame.src = path;
      frame.alt = project.title + ', selected film frame ' + (currentShot + 1);
      requestAnimationFrame(() => frame.classList.remove('cg-changing'));
    };
    preload.onerror = () => {
      if (token !== nextToken) return;
      frame.src = '/assets/filmmaker/' + project.folder + '/t.jpg';
      frame.alt = project.title + ', portfolio thumbnail';
      frame.classList.remove('cg-changing');
    };
    preload.src = path;
    sceneTitle.textContent = project.title;
    sceneSubtitle.textContent = project.subtitle + ' / Colour grade by Bogdan Pascal';
    link.href = project.url;
    link.setAttribute('aria-label', 'Open ' + project.title + ' in the filmmaker portfolio');
    count.textContent = String(currentProject + 1).padStart(2,'0') + ' / ' + String(projects.length).padStart(2,'0');
    projectButtons.forEach((button,index)=>{
      button.setAttribute('aria-pressed', String(index === currentProject));
    });
    shots.forEach((button,index)=>{
      const shot = shotPath(project,index);
      const img = button.querySelector('img');
      img.src = shot;
      img.alt = 'Frame ' + (index + 1);
      button.setAttribute('aria-label', 'View ' + project.title + ' frame ' + (index + 1));
      button.setAttribute('aria-pressed',String(index === currentShot));
    });
  }
  projectButtons.forEach((button,index)=>{
    button.addEventListener('click',()=>update(index,0));
  });
  shots.forEach((button,index)=>{
    button.addEventListener('click',()=>update(currentProject,index));
  });
  root.querySelectorAll('[data-cg-step]').forEach(button=>{
    button.addEventListener('click',()=>{
      const increment = Number(button.dataset.cgStep);
      const next = (currentProject + increment + projects.length) % projects.length;
      update(next,0);
    });
  });
  if (viewer) {
    viewer.addEventListener('keydown',event=>{
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        if (event.target.matches('input,textarea,select')) return;
        event.preventDefault();
        const direction = event.key === 'ArrowRight' ? 1 : -1;
        const next = currentShot + direction;
        if (next >= 0 && next < 3) update(currentProject,next);
        else update((currentProject + direction + projects.length) % projects.length, direction > 0 ? 0 : 2);
      }
    });
  }
  modeButtons.forEach(button=>{
    button.addEventListener('click',()=>{
      const mode = button.dataset.cgMode;
      const isArchive = mode === 'archive';
      workspace.classList.toggle('is-hidden',isArchive);
      archive.classList.toggle('is-visible',isArchive);
      archive.hidden = !isArchive;
      modeButtons.forEach(other=>other.setAttribute('aria-pressed',String(other === button)));
      if (!isArchive) viewer.focus({preventScroll:true});
    });
  });
  if (dialog && typeof dialog.showModal === 'function') {
    zoomButton.addEventListener('click',()=>{
      const project = projects[currentProject];
      dialogImage.src = frame.currentSrc || frame.src;
      dialogImage.alt = frame.alt;
      dialogCaption.textContent = project.title + ' / Frame ' + String(currentShot+1).padStart(2,'0') + ' / 03';
      dialog.showModal();
    });
    dialog.querySelector('[data-cg-close]').addEventListener('click',()=>dialog.close());
    dialog.addEventListener('click',event=>{ if (event.target === dialog) dialog.close(); });
  } else {
    zoomButton.hidden = true;
  }

  const filmPlayer = root.querySelector('#cg-film-player');
  const filmTitle = root.querySelector('#cg-film-title');
  const filmLink = root.querySelector('#cg-film-link');
  const filmButtons = [...root.querySelectorAll('[data-cg-film]')];
  const films = {
    ffern:{title:'Ffern / Discover Summer 23',poster:'/assets/filmmaker/ffern/t.jpg',url:'https://pub-3547ec32a0d34f27b0847acdf37e296f.r2.dev/ffern.mp4',page:'/filmmaker/work/ffern/'},
    geodome:{title:'GeoDomeX / Hers by Day, His by Night',poster:'/assets/filmmaker/geodome/t.jpg',url:'https://pub-3547ec32a0d34f27b0847acdf37e296f.r2.dev/geodome-main.mp4',page:'/filmmaker/work/geodome/'},
    fauness:{title:'Fauness / Inanimate Girl',poster:'/assets/filmmaker/inanimate-girl/t.jpg',url:'https://pub-3547ec32a0d34f27b0847acdf37e296f.r2.dev/fauness.mp4',page:'/filmmaker/work/inanimate-girl/'}
  };
  if (filmPlayer) {
    filmButtons.forEach(button => button.addEventListener('click',()=>{
      const film = films[button.dataset.cgFilm];
      if (!film) return;
      filmPlayer.pause();
      filmPlayer.poster = film.poster;
      filmPlayer.src = film.url;
      filmPlayer.load();
      filmTitle.textContent = film.title;
      filmLink.href = film.page;
      filmLink.setAttribute('aria-label','View ' + film.title + ' project details');
      filmButtons.forEach(other=>other.setAttribute('aria-pressed',String(other === button)));
    }));
  }
  // This site intentionally shows only genuine portfolio frames. A true
  // original/final comparison needs matching source and graded image assets.
  update(0,0);
})();
