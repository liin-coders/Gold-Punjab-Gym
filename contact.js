(function(){
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
/* open-now + today highlight in gym's time zone (Asia/Kolkata), 06:00-22:00 daily */
try{
 const f=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Kolkata',hour:'numeric',minute:'numeric',hour12:false,weekday:'short'}).formatToParts(new Date());
 const h=+f.find(p=>p.type==='hour').value%24,wd=f.find(p=>p.type==='weekday').value;
 const open=h>=6&&h<22,el=$('#ctOpen');
 if(el){el.classList.toggle('on',open);$('span',el).textContent=open?'OPEN NOW · CLOSES 10 PM':'CLOSED NOW · OPENS 6 AM'}
 const days=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];const i=days.indexOf(wd);const li=$$('#ctHours li')[i];li&&li.classList.add('today');
}catch(e){}
/* form: validate, then offer WhatsApp hand-off */
const form=$('#ctForm');
if(form)form.addEventListener('submit',e=>{
 e.preventDefault();const m=$('#ctMsg'),d=Object.fromEntries(new FormData(form));m.className='ct-msg';
 const name=(d.name||'').trim(),phone=(d.phone||'').trim();
 if(!name||!phone){m.classList.add('err');m.textContent='Please add your name and phone number.';return}
 if(!/^[+()\d\s-]{7,18}$/.test(phone)){m.classList.add('err');m.textContent='Please enter a valid phone number.';return}
 const txt=encodeURIComponent(`Hi Gold Punjab Gym, I'm ${name}. Interested in: ${d.goal||'a visit'}. Preferred time: ${d.time||'any'}. ${(d.message||'').trim()} Phone: ${phone}`);
 m.innerHTML=`Thanks, ${name.replace(/[<>&]/g,'')}. Your details are ready — <a href="https://wa.me/919876543210?text=${txt}" target="_blank" rel="noopener">send on WhatsApp ↗</a> for the fastest reply. Connect a backend to also receive this form by email.`;
});
})();
