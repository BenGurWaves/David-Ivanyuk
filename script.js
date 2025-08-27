// small loader to build project grid and show overlay with iframe video
async function loadProjects(){
  try{
    const res = await fetch('projects.json');
    const projects = await res.json();
    const container = document.getElementById('projects');
    container.innerHTML = projects.map(p => `
      <article class="card" data-id="${p.id}" data-video="${p.video}">
        <img loading="lazy" src="${p.thumb}" alt="${p.title}">
        <div class="overlay-play">▶</div>
        <div class="meta"><div class="title">${p.title}</div></div>
      </article>
    `).join('');
    document.querySelectorAll('.card').forEach(card=>{
      card.addEventListener('click', ()=> openOverlay(card.dataset.video, card.dataset.id));
    });
  }catch(e){
    console.error('Could not load projects.json', e);
  }
}

function openOverlay(videoUrl, id){
  const overlay = document.getElementById('overlay');
  const content = document.getElementById('overlay-content');
  // use an iframe for Vimeo/YouTube links; for local mp4 replace with <video> tag
  content.innerHTML = `<div style="position:relative;padding-top:56.25%"><iframe src="${videoUrl}" frameborder="0" allow="autoplay; fullscreen" allowfullscreen style="position:absolute;inset:0;width:100%;height:100%"></iframe></div><div style="margin-top:12px;color:#ccc"></div>`;
  overlay.hidden = false;
  document.getElementById('overlay-close').focus();
}

document.getElementById('overlay-close').addEventListener('click', ()=> {
  document.getElementById('overlay').hidden = true;
  document.getElementById('overlay-content').innerHTML = '';
});

loadProjects();
