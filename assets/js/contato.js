/* Contato: cadastro de fornecedor */
(function () {
  const { $, $$, a, t } = RP;
  const form = a('submit')[0]; if (!form) return;
  const F = [['f-emp', 'empresa'], ['f-cnpj', 'cnpj'], ['f-cat', 'categoria'], ['f-mail', 'email'], ['f-tel', 'tel']];
  const errs = $$('[data-t="f.err"]', form), lgpd = form.querySelector('input[type=checkbox]');
  const setErr = (i, msg) => { const inp = $('#' + F[i][0]); inp.setAttribute('aria-invalid', msg ? 'true' : 'false'); inp.style.borderColor = msg ? '#B3261E' : '#8C93B3'; errs[i].textContent = msg || ''; };
  F.forEach(([id], i) => $('#' + id).addEventListener('input', () => setErr(i, '')));
  lgpd.addEventListener('change', () => t('lgpdErr', ''));
  let busy = false;
  form.addEventListener('submit', async e => {
    e.preventDefault(); if (busy) return;
    let bad = false;
    F.forEach(([id, k], i) => {
      const v = $('#' + id).value.trim();
      let m = v ? '' : 'Campo obrigatório.';
      if (!m && k === 'email' && !RP.emailOk(v)) m = 'E-mail inválido.';
      setErr(i, m); if (m) bad = true;
    });
    t('lgpdErr', lgpd.checked ? '' : 'Autorize o uso dos dados.');
    if (bad || !lgpd.checked) return;
    busy = true; t('btn', 'Enviando…');
    const fd = new FormData(); fd.append('_assunto', 'Cadastro de fornecedor');
    F.forEach(([id, k]) => fd.append(k, $('#' + id).value));
    try {
      await RP.send(window.RP_DATA && RP_DATA.config.endpointOrcamento, fd, 900);
      $('[data-if="notDone"]').hidden = true; $('[data-if="done"]').hidden = false;
    } catch (x) { t('lgpdErr', 'Falha no envio. Tente novamente.'); }
    busy = false; t('btn', 'Cadastrar empresa');
  });
})();
