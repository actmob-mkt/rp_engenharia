/* Solicite orçamento: formulário em 5 etapas */
(function () {
  const { $, $$, a, t } = RP;
  const form = a('submit')[0]; if (!form) return;
  const TITLES = ['Qual é o assunto?', 'Seus dados de contato', 'Dados da empresa', 'Solução de interesse', 'Mensagem'];
  const SOL = ['eletrica', 'mecanica', 'civil', 'instrumentacao', 'facilities', 'orientacao'];
  const maskCnpj = s => { const d = s.replace(/\D/g, '').slice(0, 14); return d.replace(/^(\d{2})(\d)/, '$1.$2').replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3').replace(/\.(\d{3})(\d)/, '.$1/$2').replace(/(\d{4})(\d)/, '$1-$2'); };
  const cnpjOk = s => {
    const c = s.replace(/\D/g, ''); if (c.length !== 14 || /^(\d)\1+$/.test(c)) return false;
    const calc = n => { let sum = 0, p = n - 7; for (let i = 0; i < n; i++) { sum += +c[i] * p--; if (p < 2) p = 9; } const r = sum % 11; return r < 2 ? 0 : 11 - r; };
    return calc(12) === +c[12] && calc(13) === +c[13];
  };
  const panels = [1, 2, 3, 4, 5].map(n => $('[data-if="st' + n + '"]'));
  const stepLis = a('s.cur');
  const assuntoLabels = a('a.border'), assuntoInputs = $$('input[name="assunto"]', form);
  const solLabels = a('o.border'), solInputs = solLabels.map(l => l.querySelector('input'));
  const f2Err = $$('[data-t="f.err"]', panels[1]), f3Err = $$('[data-t="f.err"]', panels[2]);
  const inp = id => $('#' + id);
  const tel = inp('o-tel'), cnpj = inp('o-cnpj'), uf = inp('o-uf'), msg = inp('o-msg');
  const lgpd = panels[4].querySelector('input[type=checkbox]');
  const backWrap = $('[data-if="canBack"]'), backBtn = a('back')[0], subBtn = a('isLoading')[0];
  let step = 0, status = 'idle';

  // pré-preenchimento por ?uf=SP e ?s=eletrica
  const q = new URLSearchParams(location.search);
  if (q.get('uf')) uf.value = q.get('uf').toUpperCase();
  if (q.get('s')) { const i = SOL.indexOf(q.get('s')); if (i >= 0) solInputs[i].checked = true; }

  tel.addEventListener('input', () => { tel.value = RP.maskTel(tel.value); });
  cnpj.addEventListener('input', () => { cnpj.value = maskCnpj(cnpj.value); });

  const mark = (el, m, errEl) => { if (el) { el.setAttribute('aria-invalid', m ? 'true' : 'false'); el.style.borderColor = m ? '#B3261E' : '#8C93B3'; } if (errEl) errEl.textContent = m || ''; };
  const clearOnInput = (el, errEl) => el.addEventListener('input', () => mark(el, '', errEl));
  [['o-nome', 0], ['o-email', 1], ['o-tel', 2], ['o-cargo', 3]].forEach(([id, i]) => clearOnInput(inp(id), f2Err[i]));
  [['o-emp', 0], ['o-cnpj', 1], ['o-cid', 2]].forEach(([id, i]) => clearOnInput(inp(id), f3Err[i]));
  uf.addEventListener('change', () => mark(uf, '', $('[data-t="err.uf"]')));
  msg.addEventListener('input', () => mark(msg, '', $('[data-t="err.msg"]')));
  lgpd.addEventListener('change', () => { t('err.lgpd', ''); lgpd.setAttribute('aria-invalid', 'false'); });

  function paintChoices(assuntoErr) {
    assuntoLabels.forEach((l, i) => { const c = assuntoInputs[i].checked; l.style.borderColor = c ? '#0B1B5C' : assuntoErr ? '#B3261E' : '#C9CCD8'; l.style.background = c ? '#EEF0F5' : '#FFFFFF'; });
    solLabels.forEach((l, i) => { const c = solInputs[i].checked; l.style.borderColor = c ? '#0B1B5C' : '#C9CCD8'; l.style.background = c ? '#0B1B5C' : '#FFFFFF'; l.style.color = c ? '#FFFFFF' : '#0A1033'; });
  }
  assuntoInputs.forEach(r => r.addEventListener('change', () => paintChoices(false)));
  solInputs.forEach(c => c.addEventListener('change', () => { paintChoices(false); t('err.sol', ''); }));

  function render() {
    panels.forEach((p, i) => { p.hidden = i !== step; });
    stepLis.forEach((li, i) => {
      if (i === step) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current');
      const d = li.querySelector('[data-a~="s.fill"]'), line = li.querySelector('[data-a~="s.line"]'), lab = li.querySelector('[data-a~="s.fg"]');
      d.style.background = i < step ? '#0B1B5C' : i === step ? '#FF7A1A' : '#FFFFFF';
      d.style.borderColor = i <= step ? (i === step ? '#FF7A1A' : '#0B1B5C') : '#8C93B3';
      line.style.background = i < step ? '#0B1B5C' : '#DADCE3';
      lab.style.color = i <= step ? '#0A1033' : '#4A5275';
    });
    t('stepTitle', (step + 1) + '/5 · ' + TITLES[step]);
    backWrap.hidden = step === 0;
    t('nextLabel', step < 4 ? 'Continuar →' : status === 'loading' ? 'Enviando…' : 'Enviar solicitação');
    $('[data-if="isLoading"]', form).hidden = status !== 'loading';
    subBtn.disabled = status === 'loading'; subBtn.style.opacity = status === 'loading' ? 0.7 : 1;
    $('[data-if="isError"]').hidden = status !== 'error';
    paintChoices(false);
  }

  function validate() {
    let ok = true;
    const chk = (el, m, errEl) => { mark(el, m, errEl); if (m) ok = false; };
    if (step === 0) { const sel = assuntoInputs.some(r => r.checked); if (!sel) { ok = false; paintChoices(true); } }
    if (step === 1) {
      chk(inp('o-nome'), inp('o-nome').value.trim().length < 3 ? 'Informe seu nome.' : '', f2Err[0]);
      chk(inp('o-email'), RP.emailOk(inp('o-email').value) ? '' : 'Informe um e-mail válido.', f2Err[1]);
      chk(tel, tel.value.replace(/\D/g, '').length < 10 ? 'Informe telefone com DDD.' : '', f2Err[2]);
    }
    if (step === 2) {
      chk(inp('o-emp'), inp('o-emp').value.trim() ? '' : 'Informe a empresa.', f3Err[0]);
      chk(cnpj, cnpjOk(cnpj.value) ? '' : 'CNPJ inválido. Confira os 14 dígitos.', f3Err[1]);
      chk(inp('o-cid'), inp('o-cid').value.trim() ? '' : 'Informe a cidade.', f3Err[2]);
      chk(uf, uf.value ? '' : 'Selecione o estado.', $('[data-t="err.uf"]'));
    }
    if (step === 3 && !solInputs.some(c => c.checked)) { t('err.sol', 'Marque ao menos uma opção.'); ok = false; }
    if (step === 4) {
      chk(msg, msg.value.trim().length < 10 ? 'Descreva a demanda em poucas linhas.' : '', $('[data-t="err.msg"]'));
      if (!lgpd.checked) { t('err.lgpd', 'É necessário autorizar o uso dos dados.'); lgpd.setAttribute('aria-invalid', 'true'); ok = false; }
    }
    return ok;
  }
  const focusTitle = () => setTimeout(() => { const h = a('titleRef')[0]; h && h.focus(); }, 30);

  backBtn.addEventListener('click', () => { step--; render(); focusTitle(); });
  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (status === 'loading') return;
    if (!validate()) { setTimeout(() => { const el = form.querySelector('[aria-invalid="true"]'); el && el.focus(); }, 30); return; }
    if (step < 4) { step++; render(); focusTitle(); return; }
    status = 'loading'; render();
    const assunto = (assuntoInputs.find(r => r.checked) || {}).closest ? assuntoInputs.find(r => r.checked).closest('label').querySelector('[data-t="a.t"]').textContent : '';
    const sols = solInputs.map((c, i) => c.checked ? solLabels[i].textContent.trim() : null).filter(Boolean);
    const v = {
      assunto, nome: inp('o-nome').value, email: inp('o-email').value, tel: tel.value, cargo: inp('o-cargo').value,
      empresa: inp('o-emp').value, cnpj: cnpj.value, cidade: inp('o-cid').value, uf: uf.value, sol: sols.join(', '), msg: msg.value, lgpd: lgpd.checked
    };
    const fd = new FormData();
    fd.append('_assunto', 'Orçamento — ' + v.assunto + ' — ' + v.empresa);
    Object.keys(v).forEach(k => fd.append(k, v[k]));
    try {
      await RP.send(window.RP_DATA && RP_DATA.config.endpointOrcamento, fd, 1100);
      status = 'done';
      t('firstName', v.nome.split(' ')[0]); t('solSummary', v.sol || 'engenharia');
      $('[data-if="notDone"]').hidden = true; $('[data-if="isDone"]').hidden = false;
      setTimeout(() => { const ok = a('okRef')[0]; ok && ok.focus(); }, 30);
    } catch (x) { status = 'error'; render(); }
  });
  render();
})();
