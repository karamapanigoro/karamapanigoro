const contacts = [
  {nama:"Taxi", telepon:"+6282394804422", lokasi:"Bolmut - Gorontalo"},
  {nama:"Risky Nino", telepon:"+6289697217955", lokasi:"Gorontalo"},
  {nama:"Kka", telepon:"+6285398558490", lokasi:"Bintauna"},
  {nama:"Frico J. Massing", telepon:"+6285394319372", lokasi:"Manado - Bolmut"},
  {nama:"Refan", telepon:"+6285166826113", lokasi:"Gorontalo - Bolmut"},
  {nama:"F. Figo Topayu", telepon:"+6285656369652", lokasi:"Bolmut - Boroko"},
  {nama:"Taxi", telepon:"+6281245552316", lokasi:"Manado - Bolmut"},
  {nama:"Yusran Aswat", telepon:"+6285240540642", lokasi:"Gorontalo - RS.Ainun"},
  {nama:"Yusrin Aswat", telepon:"+6282347619123", lokasi:"Gorontalo - Poltekes"},
  {nama:"Yahya Pakaya", telepon:"+6281344666609", lokasi:"Gorontalo - Bolsel"},
];
const track=document.getElementById('track');
const dots=document.getElementById('dots');
contacts.forEach((c,i)=>{
  const s=document.createElement('div'); s.className='card-slide';
  s.innerHTML=`<div class="contact-card-wrap"><div class="contact-card" data-wa="${c.telepon}"><h3>${c.nama}</h3><p>📞 ${c.telepon}</p><p>📍 ${c.lokasi}</p><p style="margin-top:10px; font-size:10px; letter-spacing:1px; color:#FFD700;">WhatsApp</p></div></div>`;
  track.appendChild(s);
  const d=document.createElement('div'); d.className='dot'+(i===0?' active':''); dots.appendChild(d);
});
let idx=0;
function update(){ track.style.transform=`translateX(-${idx*100}%)`; document.querySelectorAll('.dot').forEach((e,i)=> e.classList.toggle('active', i===idx)); }
function next(){ idx=(idx+1)%contacts.length; update(); }
function prev(){ idx=(idx-1+contacts.length)%contacts.length; update(); }
track.addEventListener('click', e=>{ const card=e.target.closest('.contact-card'); if(card){ const num=card.dataset.wa.replace(/\D/g,''); window.open(`https://wa.me/${num}`,'_blank'); } });
let startX=0, delta=0, isDrag=false;
const vp=document.getElementById('viewport');
vp.addEventListener('touchstart', e=>{ startX=e.touches[0].clientX; isDrag=true; track.style.transition='none'; }, {passive:true});
vp.addEventListener('touchmove', e=>{ if(!isDrag) return; delta=e.touches[0].clientX-startX; track.style.transform=`translateX(calc(-${idx*100}% + ${delta}px))`; }, {passive:true});
vp.addEventListener('touchend', ()=>{ track.style.transition='transform 0.45s cubic-bezier(0.25,1,0.5,1)'; if(Math.abs(delta)>50){ if(delta<0) next(); else prev(); } else update(); isDrag=false; delta=0; });
vp.addEventListener('mousedown', e=>{ startX=e.clientX; isDrag=true; track.style.transition='none'; });
window.addEventListener('mousemove', e=>{ if(!isDrag) return; delta=e.clientX-startX; track.style.transform=`translateX(calc(-${idx*100}% + ${delta}px))`; });
window.addEventListener('mouseup', ()=>{ if(!isDrag) return; track.style.transition='transform 0.45s cubic-bezier(0.25,1,0.5,1)'; if(Math.abs(delta)>50){ if(delta<0) next(); else prev(); } else update(); isDrag=false; delta=0; });
const overlay=document.getElementById('popupOverlay');
document.getElementById('openPopup').onclick=()=>{ overlay.style.display='flex'; setTimeout(()=> overlay.classList.add('active'),10); };
document.getElementById('closePopup').onclick=()=>{ overlay.classList.remove('active'); setTimeout(()=> overlay.style.display='none',400); };
overlay.addEventListener('click', e=>{ if(e.target===overlay){ overlay.classList.remove('active'); setTimeout(()=> overlay.style.display='none',400); } });
const music=document.getElementById('bgMusic');
function tryPlay(){ music.volume=1; music.play().catch(()=>{}); }
document.addEventListener('DOMContentLoaded', tryPlay);
document.body.addEventListener('click', tryPlay, {once:true});
document.body.addEventListener('touchstart', tryPlay, {once:true});