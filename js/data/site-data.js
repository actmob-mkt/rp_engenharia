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
    { valor: 850, prefixo: "+", rotulo: "colaboradores em campo e escritório" }, // EXEMPLO - substituir
    { valor: 120, prefixo: "+", rotulo: "veículos próprios em operação" },        // EXEMPLO - substituir
    { valor: 300, prefixo: "+", rotulo: "clientes atendidos" },                   // EXEMPLO - substituir
    { valor: 11,  prefixo: "",  rotulo: "estados com operação ativa" },           // EXEMPLO - substituir
    { valor: 3,   prefixo: "",  rotulo: "certificações ISO" },                    // EXEMPLO - substituir
    { valor: 25,  prefixo: "+", rotulo: "NRs atendidas pelas equipes" }           // EXEMPLO - substituir
  ],

  /* ---------- LINHA DO TEMPO (anos fictícios) ---------- */
  linhaDoTempo: [
    { ano: 2008, titulo: "Início em Mogi das Cruzes", texto: "Projetos e instalações elétricas para a indústria da região.", foto: "assets/img-exemplo/eletrica.webp", circuito: "eletrica" },    // EXEMPLO - substituir
    { ano: 2011, titulo: "Manutenção mecânica", texto: "Entrada na montagem e manutenção de sistemas mecânicos.", foto: "assets/img-exemplo/mecanica.webp", circuito: "mecanica" },                   // EXEMPLO - substituir
    { ano: 2014, titulo: "Frente civil", texto: "Obras e intervenções civis em plantas em operação.", foto: "assets/img-exemplo/sobre.webp", circuito: "civil" },                                       // EXEMPLO - substituir
    { ano: 2016, titulo: "ISO 9001", texto: "Primeira certificação do sistema de gestão da qualidade.", foto: "assets/img-exemplo/estrutura-08.webp", circuito: "integracao" },                          // EXEMPLO - substituir
    { ano: 2018, titulo: "Instrumentação e automação", texto: "Controle, medição e calibração de processos.", foto: "assets/img-exemplo/instrumentacao.webp", circuito: "instrumentacao" },          // EXEMPLO - substituir
    { ano: 2020, titulo: "Centro-Oeste e Norte", texto: "Expansão das operações para novas regiões.", foto: "assets/img-exemplo/estrutura-04.webp", circuito: "integracao" },                           // EXEMPLO - substituir
    { ano: 2022, titulo: "ISO 45001", texto: "Certificação em saúde e segurança ocupacional.", foto: "assets/img-exemplo/hero-home.webp", circuito: "integracao" },                                     // EXEMPLO - substituir
    { ano: 2024, titulo: "ISO 14001", texto: "Certificação do sistema de gestão ambiental.", foto: "assets/img-exemplo/estrutura-07.webp", circuito: "integracao" },                                   // EXEMPLO - substituir
    { ano: 2025, titulo: "11 estados e Facilities", texto: "Presença em 11 estados e criação da frente de Facilities.", foto: "assets/img-exemplo/facilities.webp", circuito: "integracao" }            // EXEMPLO - substituir
  ],

  /* ---------- FILIAIS (cidades de exemplo, sem endereço) ----------
     lon/lat posicionam o ponto no mapa. */
  filiais: [
    { uf: "SP", cidade: "Mogi das Cruzes", tipo: "Matriz", lon: -46.188, lat: -23.523, segmentos: ["Saneamento", "Automotiva", "Alimentícia", "Educacional"] }, // EXEMPLO - substituir (segmentos)
    { uf: "GO", cidade: "Goiânia",         tipo: "Filial", lon: -49.254, lat: -16.687, segmentos: ["Energia", "Alimentícia"] },                    // EXEMPLO - substituir
    { uf: "PR", cidade: "Curitiba",        tipo: "Filial", lon: -49.273, lat: -25.428, segmentos: ["Automotiva", "Saneamento"] },                  // EXEMPLO - substituir
    { uf: "TO", cidade: "Palmas",          tipo: "Filial", lon: -48.334, lat: -10.184, segmentos: ["Energia", "Saneamento"] },                     // EXEMPLO - substituir
    { uf: "MG", cidade: "Belo Horizonte",  tipo: "Filial", lon: -43.938, lat: -19.921, segmentos: ["Energia", "Alimentícia"] },                    // EXEMPLO - substituir
    { uf: "MT", cidade: "Cuiabá",          tipo: "Filial", lon: -56.097, lat: -15.601, segmentos: ["Energia", "Alimentícia"] },                    // EXEMPLO - substituir
    { uf: "ES", cidade: "Vitória",         tipo: "Filial", lon: -40.313, lat: -20.316, segmentos: ["Petroquímica", "Energia"] },                   // EXEMPLO - substituir
    { uf: "RJ", cidade: "Rio de Janeiro",  tipo: "Filial", lon: -43.173, lat: -22.907, segmentos: ["Petroquímica", "Saneamento"] },                // EXEMPLO - substituir
    { uf: "DF", cidade: "Brasília",        tipo: "Filial", lon: -47.883, lat: -15.794, segmentos: ["Educacional", "Energia"] },                    // EXEMPLO - substituir
    { uf: "AM", cidade: "Manaus",          tipo: "Filial", lon: -60.022, lat: -3.119,  segmentos: ["Energia", "Automotiva"] },                     // EXEMPLO - substituir
    { uf: "PA", cidade: "Belém",           tipo: "Filial", lon: -48.504, lat: -1.456,  segmentos: ["Saneamento", "Energia"] }                      // EXEMPLO - substituir
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
    { pilar: "Ambiental",  valor: "92%",    rotulo: "dos resíduos de obra com destinação rastreada" }, // EXEMPLO - substituir
    { pilar: "Social",     valor: "18 mil", rotulo: "horas de treinamento por ano" },                  // EXEMPLO - substituir
    { pilar: "Social",     valor: "+40",    rotulo: "colaboradores PCD contratados" },                 // EXEMPLO - substituir
    { pilar: "Governança", valor: "100%",   rotulo: "das frentes com DDS e APR registrados" }          // EXEMPLO - substituir
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
