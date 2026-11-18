/* =====================================================================
   RP ENGENHARIA INDUSTRIAL — DADOS DO SITE
   Arquivo único de dados. Tudo marcado "// EXEMPLO - substituir" é
   provisório e deve ser trocado pelos dados reais antes da publicação.
   As páginas leem window.RP_DATA; nenhum número de exemplo fica no HTML.
   ===================================================================== */
window.RP_DATA = {

  /* ---------- CONFIGURAÇÃO DOS FORMULÁRIOS (não é exemplo) ----------
     endpoint vazio ("") = modo demonstração: o envio é simulado.
     Para conectar:
       • Formspree:  crie um form em formspree.io e cole a URL
                     ("https://formspree.io/f/SEU_ID"). Aceita multipart (anexo).
       • Getform / Basin / FormSubmit: mesma lógica — URL do form.
       • Backend próprio: um POST multipart/form-data que envia e-mail
         (ex.: PHP mail(), Node + Nodemailer, AWS SES) e devolve HTTP 200.
     Os formulários enviam FormData com POST; qualquer resposta 2xx = sucesso. */
  config: {
    endpointOrcamento: "",   // ex.: "https://formspree.io/f/xxxxxxx"
    endpointCurriculo: "",   // ex.: "https://formspree.io/f/yyyyyyy"
    politicaPrivacidade: "https://www.rpengenhariaindustrial.com.br/pol%C3%ADtica-de-privacidade",
    politicaGestaoPDF: "https://www.rpengenhariaindustrial.com.br/_files/ugd/a1d6b9_4486c477119e4fc8aed306303526cbd9.pdf"
  },

  /* ---------- CONTATO (dados reais) ---------- */
  contato: {
    endereco: "R. João de Pina, 220 - Jardim Pte. Grande, Mogi das Cruzes - SP, 08770-480",
    email: "comercial@rpengenhariaindustrial.com.br",
    telefone: "(11) 4791-9300",
    telefoneLink: "+551147919300",
    instagram: "https://www.instagram.com/rpengenhariaindustrial/",
    facebook: "https://www.facebook.com/profile.php?id=61570614443501",
    linkedin: "https://www.linkedin.com/company/rp-engenharia-ltda/posts/?feedView=all"
  },

  /* ---------- NÚMEROS DE AUTORIDADE ---------- */
  numeros: [
    { valor: 1600,   prefixo: "~", sufixo: "",    rotulo: "profissionais, do campo ao escritório" },
    { valor: 10,     prefixo: "",  sufixo: "",    rotulo: "estados com contratos ativos" },
    { valor: 99,     prefixo: "",  sufixo: "",    rotulo: "contratos e obras com execução ou encerramento comprovados" },
    { valor: 750,    prefixo: "",  sufixo: " kV", rotulo: "classe máxima de tensão em escopos executados" },
    { valor: 100000, prefixo: "",  sufixo: "+",   rotulo: "ordens de serviço de manutenção predial executadas" },
    { valor: 30,     prefixo: "",  sufixo: "+",   rotulo: "clientes com experiência documentada" }
  ],

  /* ---------- ESCALA COMPROVADA (documento Marca Forte) ---------- */
  escala: [
    { valor: "99",       rotulo: "contratos e obras com execução ou encerramento comprovados" },
    { valor: "750 kV",   rotulo: "classe máxima de tensão dos ativos em escopos executados" },
    { valor: "129",      rotulo: "estações de saneamento abrangidas em um único contrato" },
    { valor: "100.000+", rotulo: "ordens de serviço de manutenção predial executadas" },
    { valor: "65.000+",  rotulo: "intervenções de manutenção eletromecânica executadas" },
    { valor: "120 km+",  rotulo: "de cabos de força e controle lançados" },
    { valor: "71,8 t+",  rotulo: "de estruturas metálicas e pórticos executados" },
    { valor: "30+",      rotulo: "clientes com experiência documentada" }
  ],

  /* ---------- LINHA DO TEMPO (documento Marca Forte) ---------- */
  linhaDoTempo: [
    { ano: "2007", periodo: "2007–2013", titulo: "Origem e alta tensão", texto: "Nasce em Mogi das Cruzes, na manutenção industrial e na elétrica. Logo vêm redes e iluminação pública, saneamento e os primeiros trabalhos em alta tensão, de 345 kV a 500 kV.", foto: "assets/img-exemplo/eletrica.webp", circuito: "eletrica" },
    { ano: "2013", periodo: "2013–2016", titulo: "Manutenção com escala", texto: "Contratos continuados e rotinas preventivas, corretivas e emergenciais em elevatórias, ETAs, ETEs e poços.", foto: "assets/img-exemplo/mecanica.webp", circuito: "mecanica" },
    { ano: "2016", periodo: "2016–2019", titulo: "Transmissão e subestações", texto: "Civil, fundações, montagem eletromecânica, proteção e controle no mesmo empreendimento. Trabalhos até 750 kV.", foto: "assets/img-exemplo/civil.webp", circuito: "civil" },
    { ano: "2017", periodo: "2017–2021", titulo: "Facilities", texto: "Edifícios administrativos, culturais, de saúde e educação: elétrica, hidráulica, climatização, incêndio e service desk.", foto: "assets/img-exemplo/facilities.webp", circuito: "integracao" },
    { ano: "2020", periodo: "2020–2025", titulo: "Convergência", texto: "Projeto, fornecimento, montagem, automação, testes e comissionamento conectados numa só lógica de entrega, com ganho de escala em nível nacional.", foto: "assets/img-exemplo/instrumentacao.webp", circuito: "instrumentacao" },
    { ano: "2026", periodo: "2026", titulo: "Modernização", texto: "Seis frentes sob a mesma gestão, cerca de 1.600 profissionais em 10 estados e uma marca modernizada para os 20 anos, em 2027.", foto: "assets/img-exemplo/estrutura-04.webp", circuito: "integracao" }
  ],

  /* ---------- FILIAIS ----------
     Um item por unidade; um estado pode ter mais de uma (ex.: SP tem Mogi e Santos).
     lon/lat posicionam o ponto no mapa.
     endereco: linhas do endereço ([] = ainda não informado; a página mostra "Endereço sob consulta").
     telefone/horario: por enquanto a central comercial e um horário de EXEMPLO — trocar pelos da unidade.
     foto: fachada da unidade; fotoIlustrativa: true mostra o selo "FOTO ILUSTRATIVA". */
  filiais: [
    { uf: "SP", cidade: "Mogi das Cruzes", tipo: "Matriz", lon: -46.188, lat: -23.523, segmentos: ["Saneamento", "Automotiva", "Alimentícia", "Educacional"], endereco: ["R. João de Pina, 220 - Jardim Pte. Grande", "Mogi das Cruzes - SP, 08770-480"], telefone: "(11) 4791-9300", telefoneLink: "+551147919300", horario: "Segunda a sexta, das 8h às 18h", foto: "assets/img-exemplo/sobre-2.webp", fotoIlustrativa: false }, // EXEMPLO - substituir (segmentos)
    { uf: "SP", cidade: "Santos",          tipo: "Filial", lon: -46.333, lat: -23.961, segmentos: ["Petroquímica", "Saneamento"], endereco: ["Av. Conselheiro Nébias, 444, sala 907", "Encruzilhada, Santos - SP, 11045-000"], telefone: "(11) 4791-9300", telefoneLink: "+551147919300", horario: "Segunda a sexta, das 8h às 18h", foto: "assets/img-sedes/santos.webp", fotoIlustrativa: false },  // EXEMPLO - substituir (segmentos, telefone, horário)
    { uf: "GO", cidade: "Goiânia",         tipo: "Filial", lon: -49.254, lat: -16.687, segmentos: ["Energia", "Alimentícia"], endereco: [], telefone: "(11) 4791-9300", telefoneLink: "+551147919300", horario: "Segunda a sexta, das 8h às 18h", foto: "assets/img-exemplo/sobre-2.webp", fotoIlustrativa: true },                    // EXEMPLO - substituir
    { uf: "PR", cidade: "Curitiba",        tipo: "Filial", lon: -49.273, lat: -25.428, segmentos: ["Automotiva", "Saneamento"], endereco: [], telefone: "(11) 4791-9300", telefoneLink: "+551147919300", horario: "Segunda a sexta, das 8h às 18h", foto: "assets/img-exemplo/estrutura-10.webp", fotoIlustrativa: true },                  // EXEMPLO - substituir
    { uf: "TO", cidade: "Palmas",          tipo: "Filial", lon: -48.334, lat: -10.184, segmentos: ["Energia", "Saneamento"], endereco: [], telefone: "(11) 4791-9300", telefoneLink: "+551147919300", horario: "Segunda a sexta, das 8h às 18h", foto: "assets/img-exemplo/estrutura-04.webp", fotoIlustrativa: true },                     // EXEMPLO - substituir
    { uf: "MG", cidade: "Belo Horizonte",  tipo: "Filial", lon: -43.938, lat: -19.921, segmentos: ["Energia", "Alimentícia"], endereco: ["Rua Rio Grande do Norte, 1435, sala 708", "Funcionários, Belo Horizonte - MG, 30130-138"], telefone: "(11) 4791-9300", telefoneLink: "+551147919300", horario: "Segunda a sexta, das 8h às 18h", foto: "assets/img-exemplo/estrutura-10.webp", fotoIlustrativa: true },                    // EXEMPLO - substituir
    { uf: "MT", cidade: "Cuiabá",          tipo: "Filial", lon: -56.097, lat: -15.601, segmentos: ["Energia", "Alimentícia"], endereco: [], telefone: "(11) 4791-9300", telefoneLink: "+551147919300", horario: "Segunda a sexta, das 8h às 18h", foto: "assets/img-exemplo/estrutura-10.webp", fotoIlustrativa: true },                    // EXEMPLO - substituir
    { uf: "ES", cidade: "Vitória",         tipo: "Filial", lon: -40.313, lat: -20.316, segmentos: ["Petroquímica", "Energia"], endereco: [], telefone: "(11) 4791-9300", telefoneLink: "+551147919300", horario: "Segunda a sexta, das 8h às 18h", foto: "assets/img-exemplo/estrutura-04.webp", fotoIlustrativa: true },                   // EXEMPLO - substituir
    { uf: "RJ", cidade: "Rio de Janeiro",  tipo: "Filial", lon: -43.173, lat: -22.907, segmentos: ["Petroquímica", "Saneamento"], endereco: [], telefone: "(11) 4791-9300", telefoneLink: "+551147919300", horario: "Segunda a sexta, das 8h às 18h", foto: "assets/img-exemplo/sobre-2.webp", fotoIlustrativa: true },                // EXEMPLO - substituir
    { uf: "DF", cidade: "Brasília",        tipo: "Filial", lon: -47.883, lat: -15.794, segmentos: ["Educacional", "Energia"], endereco: ["SGAS 915, Conjunto B, Bloco D, Sala 103 (parte), CH 121715", "Edifício Office Center, SGAS 915, Lote 71", "Asa Sul, Brasília - DF, 70390-150"], telefone: "(11) 4791-9300", telefoneLink: "+551147919300", horario: "Segunda a sexta, das 8h às 18h", foto: "assets/img-sedes/brasilia.webp", fotoIlustrativa: false },                    // EXEMPLO - substituir
    { uf: "PE", cidade: "Recife",          tipo: "Filial", lon: -34.877, lat: -8.047,  segmentos: ["Energia", "Saneamento"], endereco: ["Av. República do Líbano, 251, Sala 2205, Torre A", "Empresarial RioMar Trade Center, Pina", "Recife - PE, 51110-160 · Caixa Postal 120832"], telefone: "(11) 4791-9300", telefoneLink: "+551147919300", horario: "Segunda a sexta, das 8h às 18h", foto: "assets/img-sedes/recife.webp", fotoIlustrativa: false },  // EXEMPLO - substituir (segmentos, telefone, horário)
    { uf: "AM", cidade: "Manaus",          tipo: "Filial", lon: -60.022, lat: -3.119,  segmentos: ["Energia", "Automotiva"], endereco: [], telefone: "(11) 4791-9300", telefoneLink: "+551147919300", horario: "Segunda a sexta, das 8h às 18h", foto: "assets/img-exemplo/estrutura-04.webp", fotoIlustrativa: true },                     // EXEMPLO - substituir
    { uf: "PA", cidade: "Belém",           tipo: "Filial", lon: -48.504, lat: -1.456,  segmentos: ["Saneamento", "Energia"], endereco: [], telefone: "(11) 4791-9300", telefoneLink: "+551147919300", horario: "Segunda a sexta, das 8h às 18h", foto: "assets/img-exemplo/sobre-2.webp", fotoIlustrativa: true }                      // EXEMPLO - substituir
  ],

  /* ---------- TRABALHE CONOSCO ---------- */
  depoimentos: [
    { nome: "Carlos M.", cargo: "Eletricista de manutenção · 6 anos de RP", texto: "Entrei como ajudante. Fiz NR-10 e SEP pela empresa e hoje lidero uma equipe em subestação.", foto: "assets/img-exemplo/estrutura-07.webp" }, // EXEMPLO - substituir
    { nome: "Juliana R.", cargo: "Técnica de segurança · 4 anos de RP", texto: "Aqui o DDS não é formalidade. Se a condição não é segura, a frente para — e ninguém questiona.", foto: "assets/img-exemplo/estrutura-09.webp" },   // EXEMPLO - substituir
    { nome: "Anderson T.", cargo: "Instrumentista · 3 anos de RP", texto: "Já trabalhei em ETE no Pará e em fábrica no Paraná. Cada obra ensina algo que a anterior não ensinou.", foto: "assets/img-exemplo/estrutura-08.webp" } // EXEMPLO - substituir
  ],
  beneficios: [
    { titulo: "Plano de saúde", texto: "Para o colaborador, extensivo a dependentes." },                 // EXEMPLO - substituir
    { titulo: "Vale-alimentação", texto: "Crédito mensal em cartão." },                                   // EXEMPLO - substituir
    { titulo: "Treinamentos e NRs custeados", texto: "NR-10, NR-35, NR-33, SEP e capacitações técnicas." }, // EXEMPLO - substituir
    { titulo: "Plano de carreira", texto: "Trilhas de ajudante a encarregado e de técnico a supervisor." }, // EXEMPLO - substituir
    { titulo: "Seguro de vida", texto: "Cobertura para todos os colaboradores." }                         // EXEMPLO - substituir
  ],

  /* ---------- ESG — INDICADORES ---------- */
  indicadoresESG: [
    { pilar: "Social",     valor: "~1.600", rotulo: "profissionais com integração, análise de risco e treinamento antes do campo" },
    { pilar: "Social",     valor: "550+",   rotulo: "pessoas mobilizadas em um único contrato, com RH e folha internos" },
    { pilar: "Governança", valor: "99",     rotulo: "contratos e obras com execução ou encerramento comprovados" },
    { pilar: "Ambiental",  valor: "129",    rotulo: "estações de saneamento abrangidas em um único contrato" }
  ],

  /* ---------- BLOG ---------- */
  posts: [
    { slug: "termografia-em-paineis", autor: "Equipe de Engenharia Elétrica", leitura: "6 min", titulo: "Termografia em painéis: o que o laudo precisa mostrar", categoria: "Elétrica", data: "08 out 2026", resumo: "Como ler pontos quentes, classificar severidade e priorizar intervenções.", foto: "assets/img-exemplo/instrumentacao.webp" }, // EXEMPLO - substituir
    { slug: "obra-civil-em-planta-operando", autor: "Equipe de Engenharia Civil", leitura: "5 min", titulo: "Obra civil em planta operando: 5 cuidados de planejamento", categoria: "Civil", data: "22 set 2026", resumo: "Isolamento de área, janelas de parada e interface com a operação.", foto: "assets/img-exemplo/civil.webp" },                   // EXEMPLO - substituir
    { slug: "treinamento-nr-35", autor: "Segurança do Trabalho RP", leitura: "3 min", titulo: "Treinamento NR-35 com equipes de campo", categoria: "Segurança", data: "05 set 2026", resumo: "Registro da turma de trabalho em altura realizada na matriz.", foto: "assets/img-exemplo/conecte.webp" }                            // EXEMPLO - substituir
  ],

  /* ---------- CORPO DOS POSTS (por slug) ----------
     Blocos: { t: "p" | "h2" | "ul" | "citacao" | "img", texto, itens, src, legenda } */
  postsCorpo: {
    "termografia-em-paineis": [ // EXEMPLO - substituir
      { t: "p", texto: "A termografia é a forma mais rápida de encontrar uma conexão frouxa antes que ela vire um desligamento. Mas o laudo só tem valor se responder a três perguntas: onde está o ponto quente, quão grave ele é e o que fazer primeiro." },
      { t: "h2", texto: "1. Condição de carga no momento da inspeção" },
      { t: "p", texto: "Um painel a 20% de carga esconde defeitos. O laudo precisa registrar a corrente medida em cada circuito inspecionado, para que a temperatura seja interpretada no contexto certo." },
      { t: "h2", texto: "2. Delta de temperatura, não só a máxima" },
      { t: "p", texto: "A comparação entre fases do mesmo circuito diz mais do que o valor absoluto. Diferenças acima de 10 °C entre fases com carga equilibrada já pedem intervenção programada." },
      { t: "citacao", texto: "O ponto quente é o sintoma. O laudo precisa apontar a causa provável: aperto, oxidação, subdimensionamento ou desequilíbrio." },
      { t: "h2", texto: "3. Classificação de severidade e prazo" },
      { t: "ul", itens: ["Crítico: intervenção imediata, com risco de falha", "Sério: corrigir na próxima janela de parada", "Atenção: acompanhar na próxima inspeção"] },
      { t: "img", src: "assets/img-exemplo/instrumentacao.webp", legenda: "Inspeção em painel de comando com a planta em operação." },
      { t: "p", texto: "Com essa estrutura, a manutenção consegue transformar o laudo em ordem de serviço sem retrabalho de interpretação." }
    ],
    "obra-civil-em-planta-operando": [ // EXEMPLO - substituir
      { t: "p", texto: "Reformar uma base de equipamento ou um piso industrial com a produção rodando exige mais planejamento do que a própria obra. Estes são os cinco pontos que revisamos antes de mobilizar." },
      { t: "ul", itens: ["Isolamento físico e sinalização da área de intervenção", "Janelas de parada combinadas com a operação", "Rotas de acesso de materiais fora do fluxo produtivo", "Controle de poeira, ruído e vibração", "Interface com elétrica e mecânica antes da concretagem"] },
      { t: "p", texto: "Quando as quatro disciplinas estão no mesmo contrato, essas interfaces são resolvidas no planejamento, e não no canteiro." }
    ],
    "treinamento-nr-35": [ // EXEMPLO - substituir
      { t: "p", texto: "Mais uma turma de colaboradores concluiu o treinamento de trabalho em altura na matriz, em Mogi das Cruzes. A capacitação combinou teoria, análise de risco e prática com equipamentos de proteção." },
      { t: "img", src: "assets/img-exemplo/estrutura-07.webp", legenda: "Turma com certificados ao final do treinamento." },
      { t: "p", texto: "Treinamentos como este são custeados pela RP e fazem parte da integração de toda nova equipe de campo." }
    ]
  },

  /* ---------- CRÉDITOS DAS IMAGENS ----------
     Todas em /assets/img-exemplo. Origem: site atual da RP (rpengenhariaindustrial.com.br).
     "estrutura-*", "sobre-2", "pcd", "rp-kids", "conecte": fotos próprias da RP (galeria Estrutura RP).
     "eletrica", "mecanica", "civil", "instrumentacao", "facilities", "hero-home", "sobre", "blog":
     imagens de banco usadas no site atual (nomes de arquivo indicam Envato/Unsplash) — confirmar
     licença ou substituir por fotos próprias de obra. */
  creditos: {
    "hero-home.webp": "Site atual RP · banco de imagens — confirmar licença",
    "eletrica.webp": "Site atual RP · banco (Envato Elements) — confirmar licença",
    "mecanica.webp": "Site atual RP · banco (Envato Elements) — confirmar licença",
    "civil.webp": "Site atual RP · banco (Envato Elements) — confirmar licença",
    "instrumentacao.webp": "Site atual RP · banco (Envato Elements) — confirmar licença",
    "facilities.webp": "Site atual RP · banco (Envato Elements) — confirmar licença",
    "sobre.webp": "Site atual RP · banco de imagens — confirmar licença",
    "blog.webp": "Site atual RP · Unsplash (Jacek Dylag) — licença Unsplash",
    "estrutura-01..10.webp": "Foto própria RP · galeria Estrutura RP",
    "sobre-2.webp": "Foto própria RP · sede Mogi das Cruzes",
    "pcd.webp": "Peça própria RP · campanha Vagas PCD",
    "rp-kids.webp": "Foto própria RP",
    "conecte.webp": "Peça própria RP · treinamentos"
  }
};
