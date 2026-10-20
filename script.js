const intro=document.getElementById('intro'),siteShell=document.getElementById('siteShell'),menuToggle=document.getElementById('menuToggle'),menuClose=document.getElementById('menuClose'),megaMenu=document.getElementById('megaMenu'),menuImage=document.getElementById('menuImage'),menuLinks=document.querySelectorAll('.menu-links a'),slides=[...document.querySelectorAll('.hero-slide')],progress=document.getElementById('sliderProgress'),pauseButton=document.getElementById('sliderPause');
let currentSlide=0,slideTimer=null,isPaused=false,slideDuration=7000,slideStartedAt=Date.now(),progressFrame=null;
function finishIntro(){if(intro.classList.contains('hide'))return;intro.classList.add('hide');siteShell.classList.add('ready');startSlider();}
window.addEventListener('load',()=>setTimeout(finishIntro,1550));setTimeout(finishIntro,2600);
function openMenu(){megaMenu.classList.add('open');megaMenu.setAttribute('aria-hidden','false');menuToggle.setAttribute('aria-expanded','true');document.body.classList.add('menu-open')}
function closeMenu(){megaMenu.classList.remove('open');megaMenu.setAttribute('aria-hidden','true');menuToggle.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open')}
menuToggle.addEventListener('click',()=>megaMenu.classList.contains('open')?closeMenu():openMenu());menuClose.addEventListener('click',closeMenu);
menuLinks.forEach(link=>{link.addEventListener('mouseenter',()=>{if(link.classList.contains('contact-link'))return;const src=link.dataset.image;if(src&&menuImage.src!==src){menuImage.style.opacity='.3';setTimeout(()=>{menuImage.src=src;menuImage.onload=()=>menuImage.style.opacity='1'},100)}});link.addEventListener('click',closeMenu)});document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();closeModal();closeOffer()}});
function stopSlider(){clearTimeout(slideTimer);cancelAnimationFrame(progressFrame)}
function updateProgress(){if(isPaused)return;const pct=Math.min(100,(Date.now()-slideStartedAt)/slideDuration*100);progress.style.width=pct+'%';if(pct<100)progressFrame=requestAnimationFrame(updateProgress)}
function startSlider(){stopSlider();if(isPaused)return;slideStartedAt=Date.now();slideTimer=setTimeout(()=>showSlide(currentSlide+1),slideDuration);progressFrame=requestAnimationFrame(updateProgress)}
function showSlide(i){slides[currentSlide].classList.remove('active');currentSlide=(i+slides.length)%slides.length;slides[currentSlide].classList.add('active');progress.style.width='0%';startSlider()}
document.getElementById('nextSlide').addEventListener('click',()=>showSlide(currentSlide+1));document.getElementById('prevSlide').addEventListener('click',()=>showSlide(currentSlide-1));pauseButton.addEventListener('click',()=>{isPaused=!isPaused;pauseButton.textContent=isPaused?'▶':'Ⅱ';if(isPaused)stopSlider();else startSlider()});
// Appointment modal
const modal=document.getElementById('appointmentModal');const offer=document.getElementById('memberOffer');
function openModal(){modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open')};function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');if(!offer.classList.contains('open'))document.body.classList.remove('modal-open')};function openOffer(){offer.classList.add('open');offer.setAttribute('aria-hidden','false');document.body.classList.add('modal-open')};function closeOffer(){offer.classList.remove('open');offer.setAttribute('aria-hidden','true');if(!modal.classList.contains('open'))document.body.classList.remove('modal-open')}
document.querySelectorAll('.js-appointment').forEach(btn=>btn.addEventListener('click',openModal));document.querySelectorAll('[data-close="appointmentModal"]').forEach(btn=>btn.addEventListener('click',closeModal));document.querySelector('.modal-backdrop').addEventListener('click',closeModal);document.getElementById('offerClose').addEventListener('click',closeOffer);document.querySelector('.offer-backdrop').addEventListener('click',closeOffer);
// First-visit membership invitation
if(!localStorage.getItem('gpg_offer_seen'))setTimeout(openOffer,2800);
document.getElementById('offerForm').addEventListener('submit',e=>{e.preventDefault();const msg=document.getElementById('offerMessage');msg.textContent='Thanks! Your complimentary first-visit request is ready. Connect a backend to receive it.';localStorage.setItem('gpg_offer_seen','1');setTimeout(closeOffer,1800)});
// Appointment validation
const appointmentForm=document.getElementById('appointmentForm');appointmentForm.addEventListener('submit',e=>{e.preventDefault();const msg=document.getElementById('appointmentMessage');const name=appointmentForm.elements.name.value.trim();const phone=appointmentForm.elements.phone.value.trim();const visit=appointmentForm.elements.visit.value;if(!name||!phone||!visit){msg.textContent='Please complete your name, phone and preferred visit.';return}if(!/^[+()\d\s-]{7,18}$/.test(phone)){msg.textContent='Please enter a valid phone number.';return}msg.textContent=`Thanks, ${name}. Your appointment request is validated. Connect a backend to receive it.`});
// Main contact form
const contactForm=document.getElementById('contactForm');contactForm.addEventListener('submit',e=>{e.preventDefault();const name=document.getElementById('fullName').value.trim(),phone=document.getElementById('phone').value.trim(),goal=document.getElementById('goal').value,msg=document.getElementById('formMessage');if(!name||!phone||!goal){msg.textContent='Please complete the required fields before submitting.';return}if(!/^[+()\d\s-]{7,18}$/.test(phone)){msg.textContent='Please enter a valid phone number.';return}msg.textContent=`Thanks, ${name}! Your enquiry is validated. Connect a backend to receive it.`});
// Testimonials: two cards desktop, one card mobile
const track=document.getElementById('testimonialTrack'),
dots=[...document.querySelectorAll('.testimonial-dots button')];
let testimonialIndex=0;
function moveTestimonials(i){
  testimonialIndex=i%2;
  track.style.transform=window.innerWidth<=620?`translateX(-${testimonialIndex*100}%)`:`translateX(-${testimonialIndex*calcPercent()}%)`;
  dots.forEach((d,n)=>d.classList.toggle('active',n===testimonialIndex)
)
}
function calcPercent(){
  return 50.9
}
dots.forEach(d=>d.addEventListener('click',()=>moveTestimonials(Number(d.dataset.index))));
setInterval(()=>moveTestimonials(testimonialIndex+1),5000);
window.addEventListener('resize',()=>moveTestimonials(testimonialIndex));
// Gold / Punjab / Gym — pinned scroll sequence (works with wheel, touch, keyboard, scrollbar).
// state: 0 empty → 1 GOLD → 2 +PUNJAB → 3 +GYM → 4 all bigger → 5 shrinks → 6 GYM leaves → 7 PUNJAB leaves → 8 GOLD leaves → page continues.
const brandSection=document.getElementById('brandStatement');
let brandTicking=false;
function brandUpdate(){
  brandTicking=false;
  if(!brandSection)return;
  const vh=window.innerHeight;
  const scrolled=-brandSection.getBoundingClientRect().top;
  const lead=vh*.2,unit=vh*.7;
  let state=0;
  if(scrolled>=lead)state=Math.min(6,1+Math.floor((scrolled-lead)/unit));
  if(brandSection.dataset.state!==String(state))brandSection.dataset.state=state;
}
function brandRequest(){if(!brandTicking){brandTicking=true;requestAnimationFrame(brandUpdate)}}
window.addEventListener('scroll',brandRequest,{passive:true});
window.addEventListener('resize',brandRequest);
brandUpdate();


// FAQ accordion with image swap
(function(){const items=[...document.querySelectorAll('.faq-item')],img=document.getElementById('faqImage');if(!img)return;
function swap(src){if(img.src===src)return;img.classList.add('swap');setTimeout(()=>{img.src=src;img.onload=()=>img.classList.remove('swap');setTimeout(()=>img.classList.remove('swap'),600)},300)}
items.forEach(it=>it.querySelector('.faq-q').addEventListener('click',()=>{const was=it.classList.contains('open');items.forEach(o=>{o.classList.remove('open');o.querySelector('.faq-q').setAttribute('aria-expanded','false')});if(!was){it.classList.add('open');it.querySelector('.faq-q').setAttribute('aria-expanded','true');swap(it.dataset.image)}}));})();

document.getElementById('newsForm')?.addEventListener('submit',e=>{e.preventDefault();document.getElementById('newsMsg').textContent='Thanks! You are on the list. Connect a backend to receive it.';e.target.reset()});
// Reveal animations
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.section-pad,.service-item,.testimonial,.dark-quote,.cta-section').forEach(el=>{el.classList.add('reveal');observer.observe(el)});

// Header: glass blur once scrolled
(function(){const h=document.getElementById('siteHeader');if(!h)return;const f=()=>h.classList.toggle('scrolled',window.scrollY>20);f();window.addEventListener('scroll',f,{passive:true})})();

// Services: hover/focus swaps the preview image
(function(){const items=[...document.querySelectorAll('.service-item')],imgs=[...document.querySelectorAll('.sp-frame img')],num=document.getElementById('spNum'),nm=document.getElementById('spName');if(!items.length||!imgs.length)return;
function set(i){items.forEach((el,k)=>el.classList.toggle('active',k===i));imgs.forEach((im,k)=>im.classList.toggle('on',k===i));num.textContent=String(i+1).padStart(2,'0');nm.textContent=items[i].querySelector('h3').textContent}
items.forEach((el,i)=>{el.addEventListener('mouseenter',()=>set(i));el.addEventListener('focus',()=>set(i))})})();

// Footer background video: play only while the footer is on screen
(function(){const v=document.querySelector('.ft-video');if(!v||matchMedia('(prefers-reduced-motion:reduce)').matches||innerWidth<=620)return;
new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){v.preload='auto';v.play().catch(()=>{})}else v.pause()}),{threshold:.05}).observe(document.querySelector('.footer'))})();
