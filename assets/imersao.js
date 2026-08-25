/* ══════════════════════════════════════════════════════════════════
   JITSHOUSE — comportamento das páginas de imersão
   Compartilhado por caraiva.html, esquenta.html e reveillon.html.
   ══════════════════════════════════════════════════════════════════ */
(function(){
  'use strict';

  /* ── movimento: mesma gramática da home ──────────────────────────── */
  var SEL = '.an,.an-e,.an-d,.moldura,.carimbo';
  var alvos = document.querySelectorAll(SEL);

  function acender(el){
    var d = parseInt(el.getAttribute('data-d') || '0', 10);
    setTimeout(function(){ el.classList.add('ok'); }, d * 130);
  }

  var reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if(reduz || !('IntersectionObserver' in window)){
    Array.prototype.forEach.call(alvos, function(el){ el.classList.add('ok'); });
  }else{
    var io = new IntersectionObserver(function(ents){
      ents.forEach(function(en){
        if(en.isIntersecting){ acender(en.target); io.unobserve(en.target); }
      });
    }, { threshold:0.05, rootMargin:'0px 0px 15% 0px' });
    Array.prototype.forEach.call(alvos, function(el){ io.observe(el); });
  }

  /* rede de segurança: se o observer falhar, tudo aparece em 3s */
  setTimeout(function(){
    Array.prototype.forEach.call(document.querySelectorAll(SEL), function(el){
      el.classList.add('ok');
    });
  }, 3000);

  /* o hero entra sozinho, sem esperar scroll */
  requestAnimationFrame(function(){
    Array.prototype.forEach.call(document.querySelectorAll('.ihero .an,.ihero .carimbo'), acender);
  });

  /* ── nav + barra fixa ────────────────────────────────────────────── */
  var nav   = document.querySelector('.nav');
  var hero  = document.querySelector('.ihero');
  var barra = document.getElementById('barra');
  if(barra) document.body.classList.add('tem-barra');

  function passo(){
    var y = window.scrollY || document.documentElement.scrollTop;
    if(nav) nav.classList.toggle('rolou', y > 8);
    if(barra && hero) barra.classList.toggle('ver', y > hero.offsetHeight * 0.6);
  }
  passo();
  window.addEventListener('scroll', passo, { passive:true });

  /* ── ano automático no rodapé ────────────────────────────────────── */
  var ano = document.getElementById('ano');
  if(ano) ano.textContent = new Date().getFullYear();
})();
