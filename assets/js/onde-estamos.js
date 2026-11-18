/* Onde estamos: seleção de unidade no mapa e na lista */
(function () {
  const { a, t, $, show } = RP;
  const D = window.RP_DATA;
  if (!D) return;
  const UFS = [['AC','Acre'],['AL','Alagoas'],['AM','Amazonas'],['AP','Amapá'],['BA','Bahia'],['CE','Ceará'],['ES','Espírito Santo'],['GO','Goiás'],['MA','Maranhão'],['MG','Minas Gerais'],['MS','Mato Grosso do Sul'],['MT','Mato Grosso'],['PA','Pará'],['PB','Paraíba'],['PE','Pernambuco'],['PI','Piauí'],['PR','Paraná'],['RJ','Rio de Janeiro'],['RN','Rio Grande do Norte'],['RO','Rondônia'],['RR','Roraima'],['RS','Rio Grande do Sul'],['SC','Santa Catarina'],['SE','Sergipe'],['SP','São Paulo'],['TO','Tocantins'],['DF','Distrito Federal']];
  const NOME = Object.fromEntries(UFS);
  const byUf = {}; D.filiais.forEach(f => { byUf[f.uf] = f; });
  const paths = a('s.pick'), btns = a('f.pick');
  const segLi = $('[data-t="g"]'), segUl = segLi && segLi.closest('ul'), segTpl = segUl && segUl.firstElementChild.cloneNode(true);
  let cur = 'SP';
  function render() {
    paths.forEach((p, i) => {
      const uf = UFS[i][0], on = !!byUf[uf], sel = uf === cur;
      p.setAttribute('fill', sel ? '#FF7A1A' : on ? '#1A2A6E' : 'rgba(255,255,255,.04)');
      p.setAttribute('stroke', sel ? '#FFFFFF' : on ? '#5B6BB0' : 'rgba(255,255,255,.18)');
      p.setAttribute('stroke-width', sel ? 1.6 : 0.8);
      if (on) p.setAttribute('aria-pressed', sel ? 'true' : 'false');
    });
    btns.forEach((b, i) => {
      const x = D.filiais[i]; if (!x) return;
      const s = x.uf === cur, m = x.tipo === 'Matriz';
      b.setAttribute('aria-pressed', s ? 'true' : 'false');
      b.style.background = s ? '#FF7A1A' : m ? '#0B1B5C' : '#060B26';
      b.style.color = s ? '#0A1033' : '#FFFFFF';
      a('f.ufc', b).forEach(el => { el.style.color = s ? '#0A1033' : '#FFB27A'; });
    });
    const f = byUf[cur], ilustr = f.fotoIlustrativa !== false;
    t('sel.tipoUp', f.tipo.toUpperCase()); t('sel.uf', f.uf); t('sel.estado', NOME[f.uf]);
    t('sel.nome', (f.tipo === 'Matriz' ? 'Matriz ' : 'RP ') + f.cidade);
    t('sel.endereco', (f.endereco && f.endereco.length) ? f.endereco.join('\n') : 'Endereço sob consulta.\nFale com a central comercial.');
    t('sel.horario', f.horario || 'Segunda a sexta, das 8h às 18h');
    a('sel.tel').forEach(el => { el.textContent = f.telefone || D.contato.telefone; el.setAttribute('href', 'tel:' + (f.telefoneLink || D.contato.telefoneLink)); });
    a('sel.foto').forEach(el => { el.setAttribute('src', f.foto || 'assets/img-exemplo/estrutura-04.webp'); el.setAttribute('alt', (ilustr ? 'Foto ilustrativa da unidade de ' : 'Fachada da unidade de ') + f.cidade); });
    show($('[data-if="sel.ilustr"]'), ilustr);
    a('sel.orc').forEach(el => el.setAttribute('href', 'orcamento.html?uf=' + f.uf));
    if (segUl) segUl.replaceChildren(...f.segmentos.map(g => { const li = segTpl.cloneNode(true); li.querySelector('[data-t="g"]').textContent = g; return li; }));
  }
  const pick = uf => { if (byUf[uf]) { cur = uf; render(); } };
  paths.forEach((p, i) => {
    const uf = UFS[i][0]; if (!byUf[uf]) return;
    p.addEventListener('click', () => pick(uf));
    p.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(uf); } });
  });
  btns.forEach((b, i) => b.addEventListener('click', () => pick(D.filiais[i].uf)));
  render();
})();
