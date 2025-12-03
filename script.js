document.addEventListener('DOMContentLoaded', function(){
  // год
  document.getElementById('year').textContent = new Date().getFullYear();

  // лайтбокс
  const imgs = Array.from(document.querySelectorAll('.gallery-item img'));
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbCaption = document.getElementById('lbCaption');
  const lbClose = document.getElementById('lbClose');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');
  let idx = -1;

  function openLB(i){
    const el = imgs[i];
    const full = el.dataset.full || el.src;
    lbImg.src = full;
    lbImg.alt = el.alt || '';
    lbCaption.textContent = el.nextElementSibling ? el.nextElementSibling.textContent : '';
    lb.setAttribute('aria-hidden','false');
    idx = i;
  }
  function closeLB(){
    lb.setAttribute('aria-hidden','true');
    lbImg.src = '';
    idx = -1;
  }
  function showPrev(){ if(idx <= 0) idx = imgs.length - 1; else idx--; openLB(idx); }
  function showNext(){ if(idx >= imgs.length - 1) idx = 0; else idx++; openLB(idx); }

  imgs.forEach((img,i)=>{
    img.addEventListener('click', ()=> openLB(i));
    img.tabIndex = 0;
    img.addEventListener('keydown', e => { if(e.key === 'Enter' || e.key === ' ') openLB(i); });
  });

  lbClose.addEventListener('click', closeLB);
  lbPrev.addEventListener('click', showPrev);
  lbNext.addEventListener('click', showNext);
  lb.addEventListener('click', e => { if(e.target === lb) closeLB(); });
  document.addEventListener('keydown', e => {
    if(lb.getAttribute('aria-hidden') === 'false'){
      if(e.key === 'Escape') closeLB();
      if(e.key === 'ArrowLeft') showPrev();
      if(e.key === 'ArrowRight') showNext();
    }
  });

  // Форма - локальная демонстрация. Можно подключить fetch к backend.
  document.getElementById('contactForm').addEventListener('submit', function(e){
    e.preventDefault();
    const name = document.getElementById('cfName').value.trim();
    const contact = document.getElementById('cfContact').value.trim();
    const message = document.getElementById('cfMessage').value.trim();
    if(!name  !contact  !message){ alert('Пожалуйста, заполните все поля.'); return; }

    // Демо: предложим отправить в Telegram через ссылку (пользователь вручную)
    const tg = 'https://t.me/orlova_cabinet_idea';
    alert('Спасибо, ' + name + '! Вы можете написать мне в Telegram, чтобы быстро договориться. Сейчас открою чат.');
    window.open(tg,'_blank');
    this.reset();
  });
});
