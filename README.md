# RP Engenharia Industrial — site estático

HTML, CSS e JavaScript puros, sem framework e sem etapa de build. Basta publicar a pasta num servidor (Apache, Nginx, Netlify, Vercel, Hostinger etc.).

## Estrutura
- `index.html` — Home
- `quem-somos.html`, `segmentos.html`, `onde-estamos.html`, `esg.html`, `clientes.html`
- `solucoes-eletrica.html`, `solucoes-mecanica.html`, `solucoes-civil.html`, `solucoes-instrumentacao.html`, `solucoes-facilities.html`
- `blog.html` e um arquivo por post: `blog-<slug>.html`
- `trabalhe-conosco.html`, `orcamento.html`, `contato.html`
- `css/style.css` — estilos base + classes geradas a partir do layout (`.sNN`) e estados de hover (`.hNN`)
- `js/main.js` — menu mobile, aviso de cookies, utilitários
- `js/home.js`, `js/quem-somos.js`, `js/onde-estamos.js`, `js/blog-post.js`, `js/orcamento.js`, `js/contato.js`, `js/trabalhe-conosco.js`
- `js/data/site-data.js` — configuração e dados (endereços das filiais, endpoints de formulário)
- `assets/` — logo, fotos, logos de clientes e selos ISO

## Formulários
Sem endpoint configurado, os formulários rodam em **modo demonstração** (simulam o envio).
Para ativar o envio real, preencha em `js/data/site-data.js`:
- `config.endpointOrcamento` — usado por Orçamento e Contato (fornecedores)
- `config.endpointCurriculo` — usado por Trabalhe conosco (multipart, com arquivo)

Qualquer serviço que aceite `POST` com `FormData` funciona (Formspree, Getform, backend próprio).

## Ganchos de JavaScript
Elementos dinâmicos usam atributos:
- `data-if="nome"` — bloco mostrado/ocultado via `hidden`
- `data-t="nome"` — texto atualizado por script
- `data-a="nome"` — elemento com comportamento (clique, estilo dinâmico)

Não remova esses atributos ao editar o HTML.

## Pendências de conteúdo
Os textos marcados `// EXEMPLO` em `js/data/site-data.js` e os números/unidades exibidos nas páginas ainda são dados de exemplo.
Créditos e licenças das fotos: `assets/img-exemplo/CREDITOS.md`.
