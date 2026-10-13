(function(){
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
/* reveal grid tiles */
const gio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');gio.unobserve(e.target)}}),{threshold:.08});
$$('.gi,.gl-frame').forEach((el,i)=>{el.style.setProperty('--d',(i%4)*.08+'s');gio.observe(el)});
/* filters */
const items=$$('.gi'),btns=$$('.gl-filters button');
btns.forEach(b=>b.addEventListener('click',()=>{
 btns.forEach(x=>x.classList.toggle('on',x===b));const f=b.dataset.f;
 items.forEach((el,i)=>{const show=f==='all'||el.dataset.cat.split(' ').includes(f);el.classList.remove('pop');
  el.classList.toggle('gone',!show);if(show){el.classList.add('visible');void el.offsetWidth;el.style.animationDelay=(i%6)*.05+'s';el.classList.add('pop')}});
}));
/* lightbox */
const lb=$('#lb'),lbi=$('#lbImg'),lbt=$('#lbTitle'),lbc=$('#lbCount');let cur=[],idx=0;
const vis=()=>items.filter(e=>!e.classList.contains('gone'));
function show(){const el=cur[idx],im=$('img',el);lbi.style.animation='none';void lbi.offsetWidth;lbi.style.animation='';lbi.src=im.currentSrc||im.src;lbi.alt=im.alt;lbt.textContent=$('strong',el).textContent;lbc.innerHTML='<b>'+String(idx+1).padStart(2,'0')+'</b> / '+String(cur.length).padStart(2,'0')}
function open(el){cur=vis();idx=cur.indexOf(el);show();lb.classList.add('open');document.body.classList.add('lb-open')}
function close(){lb.classList.remove('open');document.body.classList.remove('lb-open')}
const step=d=>{idx=(idx+d+cur.length)%cur.length;show()};
items.forEach(el=>{el.addEventListener('click',()=>open(el));el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open(el)}})});
$('.x',lb).onclick=close;$('.p',lb).onclick=()=>step(-1);$('.n',lb).onclick=()=>step(1);
lb.addEventListener('click',e=>{if(e.target===lb)close()});
addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;if(e.key==='Escape')close();if(e.key==='ArrowRight')step(1);if(e.key==='ArrowLeft')step(-1)});
})();
