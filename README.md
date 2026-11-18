# RP Engenharia — site exportado

Gerado a partir das páginas do canvas de design (mesmo conteúdo e comportamento).

## Estrutura
- `*.html` — páginas (index.html é a Home; certificados.html é nova)
- `assets/components/` — Header e Footer, carregados por todas as páginas
- `assets/js/dc-runtime.js` — runtime que monta as páginas (abas, filtros, mapa, contadores, formulários)
- `assets/js/vendor/` — React e Babel locais (não depende de CDN)
- `assets/data/` — dados do site (números, unidades, soluções, mapa)
- `assets/css/base.css`, imagens em `assets/img-*`, `assets/clientes`, logos

## Como publicar
Suba a pasta inteira em qualquer hospedagem estática (Apache, Nginx, Netlify, GitHub Pages etc.).
As páginas precisam ser abertas por http(s); abrindo o arquivo direto do computador (file://) o Header e o Footer não carregam.
Para testar localmente: `python3 -m http.server` dentro da pasta e abra http://localhost:8000.

