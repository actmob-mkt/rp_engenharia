/* Universidade Corporativa: perguntas frequentes (uma aberta por vez) */
(function () {
  const { a } = RP;
  const qs = a('faq');
  qs.forEach(b => b.addEventListener('click', () => {
    const wasOpen = b.getAttribute('aria-expanded') === 'true';
    qs.forEach(o => {
      const on = o === b && !wasOpen;
      o.setAttribute('aria-expanded', on ? 'true' : 'false');
      document.getElementById(o.getAttribute('aria-controls')).hidden = !on;
      o.querySelector('[data-t="faq.sign"]').textContent = on ? '−' : '+';
    });
  }));
})();
