const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

window.addEventListener('load', () => {
  setTimeout(() => $('#preloader')?.classList.add('hide'), 650);
});
$('#year').textContent = new Date().getFullYear();

// Mobile navigation
const nav = $('#nav'), menuToggle = $('#menuToggle');
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
});
$$('.nav-link').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open'); menuToggle.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

// Scroll progress and header state
const header = $('.site-header'), progress = $('#progressBar');
function onScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${max > 0 ? scrollY / max * 100 : 0}%`;
  header.classList.toggle('scrolled', scrollY > 30);
}
addEventListener('scroll', onScroll, {passive:true}); onScroll();

// Typing role
const roles = ['MCA Student','Python Developer','Django Developer','Full-Stack Developer','Software Developer'];
const roleEl = $('#typedRole');
let roleIndex=0, charIndex=0, deleting=false;
function typeRole(){
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { roleEl.textContent = roles[0]; return; }
  const current=roles[roleIndex];
  roleEl.textContent=current.slice(0,charIndex);
  if(!deleting && charIndex<current.length){charIndex++;setTimeout(typeRole,85);}
  else if(!deleting){deleting=true;setTimeout(typeRole,1250);}
  else if(charIndex>0){charIndex--;setTimeout(typeRole,38);}
  else{deleting=false;roleIndex=(roleIndex+1)%roles.length;setTimeout(typeRole,250);}
}
setTimeout(typeRole,900);

// Scroll reveals; GSAP enhancement where available, IntersectionObserver fallback
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduced && window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray('.reveal').forEach(el => {
    gsap.fromTo(el,{autoAlpha:0,y:28},{autoAlpha:1,y:0,duration:.75,ease:'power2.out',
      scrollTrigger:{trigger:el,start:'top 88%',once:true},
      onComplete:()=>el.classList.add('visible')});
  });
} else {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}
  }),{threshold:.12});
  $$('.reveal').forEach(el => reduced ? el.classList.add('visible') : observer.observe(el));
}

// Active section indicator
const sections = $$('main section[id]');
const sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if(entry.isIntersecting){
    $$('.nav-link').forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${entry.target.id}`));
  }
}),{rootMargin:'-35% 0px -55% 0px'});
sections.forEach(s=>sectionObserver.observe(s));

// Public GitHub repositories: graceful fallback if API is unavailable.
async function loadRepositories(){
  const status=$('#repoStatus'), grid=$('#repoGrid');
  try{
    const response=await fetch('https://api.github.com/users/sneha0320/repos?sort=updated&per_page=6');
    if(!response.ok) throw new Error(`GitHub returned ${response.status}`);
    const repos=await response.json();
    if(!Array.isArray(repos) || repos.length===0){status.textContent='No public repositories were returned. Visit the GitHub profile to explore.';return;}
    status.textContent='LATEST PUBLIC REPOSITORIES · LIVE FROM GITHUB';
    grid.innerHTML=repos.map(repo=>`
      <article class="repo-card">
        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer"><h4>${escapeHTML(repo.name)}</h4></a>
        <p>${escapeHTML(repo.description || 'Public repository — open GitHub to view details.')}</p>
        <div class="repo-meta"><span>${escapeHTML(repo.language || 'Language not specified')}</span><span>★ ${Number(repo.stargazers_count)||0}</span></div>
      </article>`).join('');
  }catch(error){
    status.textContent='Live repository data is temporarily unavailable. You can browse the public GitHub profile directly.';
  }
}
function escapeHTML(value){
  return String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
}
loadRepositories();

// Contact form validates and prepares an email in the visitor's mail app.
// It does not claim to send anything from the website.
$('#contactForm').addEventListener('submit', event=>{
  event.preventDefault();
  const form=event.currentTarget, note=$('#formNote');
  if(!form.reportValidity()) return;
  const data=new FormData(form);
  const subject=encodeURIComponent(`[Portfolio enquiry] ${data.get('subject')}`);
  const body=encodeURIComponent(`Hello Sneha,\n\n${data.get('message')}\n\nRegards,\n${data.get('name')}\n${data.get('email')}`);
  note.textContent='Opening your email application with the message prepared…';
  window.location.href=`mailto:snehamane991@gmail.com?subject=${subject}&body=${body}`;
});
