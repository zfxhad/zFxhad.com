const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const menu=$('#sideMenu'), backdrop=$('#menuBackdrop');
function setMenu(open){menu.classList.toggle('open',open);backdrop.classList.toggle('open',open);menu.setAttribute('aria-hidden',String(!open));$('#menuButton').setAttribute('aria-expanded',String(open));$('#menuButton2').setAttribute('aria-expanded',String(open));}
['#menuButton','#menuButton2'].forEach(id=>$(id).addEventListener('click',()=>setMenu(!menu.classList.contains('open'))));
$('#menuClose').addEventListener('click',()=>setMenu(false));backdrop.addEventListener('click',()=>setMenu(false));$$('.side-menu a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')}),{threshold:.12});$$('.reveal').forEach(el=>io.observe(el));
$('#year').textContent=new Date().getFullYear();
const dialog=$('#searchDialog'), trigger=$('#searchTrigger'), input=$('#searchInput'), results=$('#searchResults');
const data=[
 {name:'Rufus',ar:'روفوس',type:'Tool',typeAr:'أداة',target:'#tools'}, {name:'MSI Afterburner',ar:'MSI Afterburner',type:'Tool',typeAr:'أداة',target:'#tools'}, {name:'OCCT',ar:'OCCT',type:'Tool',typeAr:'أداة',target:'#tools'},
 {name:'Gaming PC',ar:'جهاز الألعاب',type:'Setup',typeAr:'الإعدادات',target:'#setup'}, {name:'Streaming PC',ar:'جهاز البث',type:'Setup',typeAr:'الإعدادات',target:'#setup'}, {name:'AI Home',ar:'AI Home',type:'Setup',typeAr:'الإعدادات',target:'#setup'}, {name:'3D Printing PC',ar:'جهاز الطابعة ثلاثية الأبعاد',type:'Setup',typeAr:'الإعدادات',target:'#setup'}, {name:'Project Z',ar:'Project Z',type:'Setup',typeAr:'الإعدادات',target:'#setup'},
 {name:'Live / Latest Video',ar:'البث / آخر فيديو',type:'Section',typeAr:'قسم',target:'#live'}];
let arabic=false;
function openSearch(){dialog.showModal();setTimeout(()=>input.focus(),30);render('')}
function render(q){q=q.trim().toLowerCase();const hits=data.filter(x=>!q||x.name.toLowerCase().includes(q)||(x.ar||'').toLowerCase().includes(q)||x.type.toLowerCase().includes(q)||(x.typeAr||'').includes(q));results.innerHTML=hits.map(x=>`<div class="result" data-target="${x.target}"><b>${arabic?x.ar:x.name}</b><br><small>${arabic?x.typeAr:x.type}</small></div>`).join('')||`<div class="result">${arabic?'لا توجد نتائج.':'No results.'}</div>`;$$('.result[data-target]').forEach(r=>r.onclick=()=>{dialog.close();document.querySelector(r.dataset.target).scrollIntoView({behavior:'smooth'})})}
trigger.addEventListener('click',openSearch);input.addEventListener('input',e=>render(e.target.value));document.addEventListener('keydown',e=>{const tag=(e.target?.tagName||'').toLowerCase();const typing=tag==='input'||tag==='textarea'||e.target?.isContentEditable;if(e.key==='/'&&!typing&&!e.ctrlKey&&!e.metaKey&&!e.altKey){e.preventDefault();if(!dialog.open)openSearch();}if(e.key==='Escape'&&menu.classList.contains('open'))setMenu(false)});
const translations={
 '.eyebrow':['Hey, I’m','مرحبًا، أنا'], '.tagline':['I break things. I tweak things.','أجرّب الأشياء. أعدّلها. وأحسّنها.'],
 '.live-copy h2':['Latest Video.','آخر فيديو.'], '.live-copy p':["When I’m live, this switches to the stream automatically.",'عندما أكون مباشرًا، يتحول هذا القسم إلى البث تلقائيًا.'], '.outline-btn':['Open YouTube ↗','افتح يوتيوب ↗'],
 '#tools .section-head>span':['TOOLS','الأدوات'], '#tools .section-head h2':['Things I use.','أشياء أستخدمها.'], '#setup .section-head>span':['SETUP','الأجهزة'], '#setup .section-head h2':['My setup.','أجهزتي.'], '.setup-subtitle':['My machines, doing questionable things.','أجهزتي، تسوي أشياء مشكوك فيها.'],
 '.connect-side .section-kicker':['CONNECT','تواصل'], '.connect-side h2':["Let’s connect.",'خلّنا نتواصل.'], '.coffee-card b':['Buy me a coffee','اشترِ لي قهوة'], '.coffee-card small':['Fuel my next bad idea.','موّل فكرتي السيئة القادمة.']
};
const toolPs=[['Create bootable USB drives quickly and easily.','لإنشاء وحدات USB قابلة للإقلاع بسرعة وسهولة.'],['GPU tuning, monitoring and fan control.','لضبط كرت الشاشة ومراقبته والتحكم بالمراوح.'],['Stress testing for CPU, GPU and power stability.','لاختبار ضغط المعالج وكرت الشاشة واستقرار الطاقة.']];
const menuText=[['Intro','الرئيسية'],['Live / Video','البث / الفيديو'],['Tools','الأدوات'],['Setup','الأجهزة'],['Connect','التواصل']];
const railText=[['INTRO','الرئيسية'],['LIVE','البث'],['TOOLS','الأدوات'],['SETUP','الأجهزة'],['CONNECT','التواصل']];
const railSections=[['intro','01'],['live','02'],['tools','03'],['setup','04'],['connect','05']];
function setLanguage(isAr){arabic=isAr;document.documentElement.dir=isAr?'rtl':'ltr';document.documentElement.lang=isAr?'ar':'en';$('#langToggle .ar').classList.toggle('active',isAr);$('#langToggle .en').classList.toggle('active',!isAr);Object.entries(translations).forEach(([sel,t])=>{const el=$(sel);if(el)el.textContent=t[isAr?1:0]});$$('.tool-card p').forEach((el,i)=>el.textContent=toolPs[i][isAr?1:0]);$$('.tool-card a').forEach(el=>el.textContent=isAr?'زيارة ←':'Visit →');$$('.side-menu nav>a>b').forEach((el,i)=>el.textContent=menuText[i][isAr?1:0]); const sm=$$('.tools-submenu b'); if(sm[0])sm[0].textContent=isAr?'أشياء أستخدمها':'Things I use'; if(sm[1])sm[1].textContent=isAr?'تويكات طورتها':'Tweaks I developed';const activeRailIndex=Math.max(0,railSections.findIndex(([id])=>document.getElementById(id)?.classList.contains('rail-active'))); $('.rail-label').textContent=railText[activeRailIndex][isAr?1:0];$('#searchTrigger > span:nth-of-type(2)').textContent=isAr?'بحث':'Search';input.placeholder=isAr?'ابحث في الأدوات والأجهزة والمشاريع…':'Search tools, setup, projects…';$('.status span:last-child').textContent=isAr?'غير مباشر':'OFFLINE';const vl=$('.video-label b'); if(vl)vl.textContent=isAr?'الأحدث من zfxhad':'Latest from zfxhad';render(input.value||'')}

const railObserver=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){document.querySelectorAll('main section,footer').forEach(s=>s.classList.remove('rail-active'));e.target.classList.add('rail-active');const idx=railSections.findIndex(([id])=>id===e.target.id);if(idx>=0){$('.rail-index').textContent=railSections[idx][1];$('.rail-label').textContent=railText[idx][arabic?1:0];}}})},{rootMargin:'-42% 0px -42% 0px',threshold:0});railSections.forEach(([id])=>{const el=document.getElementById(id);if(el)railObserver.observe(el)});
$('#langToggle').addEventListener('click',()=>setLanguage(!arabic));


// Latest YouTube video: fetched automatically from the channel RSS feed via a local/Vercel endpoint.
async function loadLatestYouTubeVideo(){
  const frame=document.getElementById('latestYouTubeFrame');
  if(!frame) return;
  try{
    const r=await fetch('/api/latest-youtube',{cache:'no-store'});
    if(!r.ok) throw new Error('latest video endpoint failed');
    const data=await r.json();
    if(!data.videoId) throw new Error('missing video id');
    const next=`https://www.youtube-nocookie.com/embed/${encodeURIComponent(data.videoId)}?rel=0&playsinline=1`;
    if(frame.src!==next) frame.src=next;
    frame.title=data.title||'Latest video from zfxhad';
    const label=document.querySelector('.video-label b');
    if(label && data.title) label.textContent=data.title;
  }catch(err){
    console.warn('Could not auto-load latest YouTube video; using fallback embed.',err);
  }
}
loadLatestYouTubeVideo();
