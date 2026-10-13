(function(){
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const intro=$('#intro'),shell=$('#siteShell'),hero=$('#abHero'),header=$('#siteHeader');
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;

/* intro */
function finishIntro(){if(intro.classList.contains('hide'))return;intro.classList.add('hide');shell.classList.add('ready');setTimeout(()=>hero&&hero.classList.add('in'),250)}
addEventListener('load',()=>setTimeout(finishIntro,1100));setTimeout(finishIntro,2200);

/* header glass */
const onHead=()=>header.classList.toggle('scrolled',scrollY>20);onHead();addEventListener('scroll',onHead,{passive:true});

/* menu */
const mega=$('#megaMenu'),toggle=$('#menuToggle'),close=$('#menuClose'),mimg=$('#menuImage');
const openMenu=()=>{mega.classList.add('open');mega.setAttribute('aria-hidden','false');toggle.setAttribute('aria-expanded','true');document.body.classList.add('menu-open')};
const closeMenu=()=>{mega.classList.remove('open');mega.setAttribute('aria-hidden','true');toggle.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open')};
toggle.addEventListener('click',()=>mega.classList.contains('open')?closeMenu():openMenu());close.addEventListener('click',closeMenu);
$$('.menu-links a').forEach(a=>{a.addEventListener('mouseenter',()=>{const s=a.dataset.image;if(!s||a.classList.contains('contact-link')||mimg.src===s)return;mimg.style.opacity='.3';setTimeout(()=>{mimg.src=s;mimg.onload=()=>mimg.style.opacity='1'},100)});a.addEventListener('click',closeMenu)});

/* appointment modal */
const modal=$('#appointmentModal');
const openModal=()=>{modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open')};
const closeModal=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open')};
$$('.js-appointment').forEach(b=>b.addEventListener('click',openModal));
$$('[data-close="appointmentModal"]').forEach(b=>b.addEventListener('click',closeModal));$('.modal-backdrop').addEventListener('click',closeModal);
addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();closeModal()}});
const af=$('#appointmentForm');af.addEventListener('submit',e=>{e.preventDefault();const m=$('#appointmentMessage'),n=af.elements.name.value.trim(),p=af.elements.phone.value.trim(),v=af.elements.visit.value;if(!n||!p||!v){m.textContent='Please complete your name, phone and preferred visit.';return}if(!/^[+()\d\s-]{7,18}$/.test(p)){m.textContent='Please enter a valid phone number.';return}m.textContent=`Thanks, ${n}. Your appointment request is validated. Connect a backend to receive it.`});
const nf=$('#newsForm');nf&&nf.addEventListener('submit',e=>{e.preventDefault();$('#newsMsg').textContent='Thanks! You are on the list. Connect a backend to receive it.';nf.reset()});

/* reveal */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.14,rootMargin:'0px 0px -6% 0px'});
$$('.ab-reveal').forEach(el=>io.observe(el));

/* counters */
const cio=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;cio.unobserve(e.target);const el=e.target,end=+el.dataset.count;if(reduce){el.textContent=end;return}const t0=performance.now(),dur=1600;(function tick(t){const p=Math.min(1,(t-t0)/dur),k=1-Math.pow(1-p,4);el.textContent=Math.round(end*k);if(p<1)requestAnimationFrame(tick)})(t0)}),{threshold:.6});
$$('[data-count]').forEach(el=>cio.observe(el));

/* parallax + journey progress */
const par=$$('[data-speed]'),steps=$('#abSteps'),stepEls=$$('.ab-step');let tick=false;
function frame(){tick=false;const vh=innerHeight;
 if(!reduce)par.forEach(el=>{const r=(el.parentElement||el).getBoundingClientRect();if(r.bottom<-200||r.top>vh+200)return;const c=(r.top+r.height/2-vh/2),s=parseFloat(el.dataset.speed);el.style.transform=`translate3d(0,${(-c*s).toFixed(1)}px,0)`});
 if(steps){const r=steps.getBoundingClientRect(),p=Math.max(0,Math.min(1,(vh*.78-r.top)/(r.height+vh*.1)));steps.style.setProperty('--p',p.toFixed(3));stepEls.forEach((s,i)=>s.classList.toggle('on',p>=(i+.35)/stepEls.length))}
}
const req=()=>{if(!tick){tick=true;requestAnimationFrame(frame)}};addEventListener('scroll',req,{passive:true});addEventListener('resize',req);frame();

/* gallery accordion */
const acc=$('#abAcc');if(acc){const figs=$$('figure',acc);const act=f=>figs.forEach(x=>x.classList.toggle('on',x===f));figs.forEach(f=>{f.addEventListener('mouseenter',()=>matchMedia('(hover:hover)').matches&&act(f));f.addEventListener('click',()=>act(f));f.addEventListener('focus',()=>act(f))})}

/* background videos: play only when visible */
const vids=$$('video');
const vio=new IntersectionObserver(es=>es.forEach(e=>{const v=e.target;if(e.isIntersecting&&!v.dataset.paused){v.preload='auto';v.play().catch(()=>{})}else v.pause()}),{threshold:.05});
if(!reduce&&innerWidth>620)vids.forEach(v=>vio.observe(v));
const vb=$('#abVctl'),av=$('#abVideo');if(vb&&av){vb.addEventListener('click',()=>{if(av.paused){delete av.dataset.paused;av.play().catch(()=>{});vb.innerHTML='<span id="abVctlIcon">Ⅱ</span> PAUSE VIDEO'}else{av.dataset.paused='1';av.pause();vb.innerHTML='<span id="abVctlIcon">▶</span> PLAY VIDEO'}})}
})();
