/* RP Engenharia — scripts compartilhados (cabeçalho, cookies e utilitários) */
(function () {
  const RP = window.RP = {
    $: (s, r) => (r || document).querySelector(s),
    $$: (s, r) => Array.from((r || document).querySelectorAll(s)),
    // elementos marcados com data-a="nome" (podem ter vários nomes separados por espaço)
    a: (n, r) => RP.$$('[data-a~="' + n + '"]', r),
    t: (n, v, r) => RP.$$('[data-t="' + n + '"]', r).forEach(e => { e.textContent = v; }),
    show: (el, on) => { if (el) el.hidden = !on; },
    reduce: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    emailOk: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v),
    maskTel: s => { const d = s.replace(/\D/g, '').slice(0, 11); if (d.length <= 2) return d ? '(' + d : ''; if (d.length <= 6) return '(' + d.slice(0, 2) + ') ' + d.slice(2); if (d.length <= 10) return '(' + d.slice(0, 2) + ') ' + d.slice(2, 6) + '-' + d.slice(6); return '(' + d.slice(0, 2) + ') ' + d.slice(2, 7) + '-' + d.slice(7); },
    // envio de formulário: POST real se houver endpoint em js/data/site-data.js, senão modo demonstração
    async send(endpoint, fd, demoMs) {
      if (endpoint) {
        const r = await fetch(endpoint, { method: 'POST', body: fd, headers: { Accept: 'application/json' } });
        if (!r.ok) throw new Error('HTTP ' + r.status);
      } else await new Promise(res => setTimeout(res, demoMs || 1000));
    },
    // marca campo com erro: borda, aria-invalid e mensagem no <span data-t="err.x">
    fieldErr(input, msg, errName) {
      if (input) { input.setAttribute('aria-invalid', msg ? 'true' : 'false'); input.style.borderColor = msg ? '#B3261E' : '#8C93B3'; }
      if (errName) RP.t(errName, msg || '');
    }
  };

  // cabeçalho: menu mobile
  const btn = RP.a('toggle')[0], menu = RP.$('[data-if="showMobile"]');
  if (btn && menu) btn.addEventListener('click', () => {
    const open = menu.hidden;
    menu.hidden = !open;
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    RP.t('menuLabel', open ? 'Fechar' : 'Menu');
  });

  // aviso de cookies
  const ck = RP.$('[data-if="showCookies"]');
  if (ck) {
    let saved = null; try { saved = localStorage.getItem('rp-cookies'); } catch (e) {}
    ck.hidden = !!saved;
    const save = v => { try { localStorage.setItem('rp-cookies', v); } catch (e) {} ck.hidden = true; };
    RP.a('acceptAll').forEach(b => b.addEventListener('click', () => save('todos')));
    RP.a('acceptEssential').forEach(b => b.addEventListener('click', () => save('essenciais')));
    RP.a('reopen').forEach(b => b.addEventListener('click', () => { ck.hidden = false; }));
  }
})();
