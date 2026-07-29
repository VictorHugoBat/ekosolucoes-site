# Eko Soluções — Landing Page

Landing page estática (HTML5 + CSS + JavaScript puro, **sem frameworks e sem
CDN**) criada para gerar contatos pelo WhatsApp para a Eko Soluções, empresa
de dedetização residencial em Goiânia - GO.

---

## 📁 Estrutura do projeto

```
/
├── index.html                     → página principal
├── politica-de-privacidade.html   → página de Política de Privacidade / LGPD
├── style.css                      → todo o CSS do site
├── script.js                      → todo o JavaScript do site
├── robots.txt                     → indexação para buscadores
├── sitemap.xml                    → mapa do site para SEO
├── manifest.json                  → metadados para instalação como app (PWA básico)
├── favicon.ico                    → ícone do site (multi-tamanho)
├── README.md                      → este arquivo
├── /images                        → imagens do site (favicons, ilustração da hero, OG image)
├── /icons                         → ícones SVG usados na interface
└── /assets                        → arquivos-fonte/brutos (logo em alta, fotos originais etc.)
```

O site funciona **100% abrindo o `index.html` diretamente no navegador**,
sem build, sem instalação de pacotes e sem servidor — basta abrir o arquivo.

---

## 📱 Como trocar o número do WhatsApp

Existe **um único lugar** no código onde o número aparece. Abra o arquivo
`script.js` e edite a primeira linha útil do arquivo:

```js
const WHATSAPP_NUMBER = "5562981833627";
```

Troque apenas os dígitos entre aspas, mantendo o formato:
`código do país (55) + DDD + número`, sem espaços, sem `+`, sem parênteses
ou traços. Exemplo para um número de São Paulo: `5511999998888`.

Todos os botões do site (cabeçalho, hero, CTA final, rodapé e o botão
flutuante de WhatsApp) usam essa mesma constante automaticamente — **não é
necessário editar o HTML**.

Se o telefone para chamadas de voz (botão "Ligar agora") for diferente do
WhatsApp, edite também esta linha, logo abaixo, no mesmo arquivo:

```js
const PHONE_NUMBER = WHATSAPP_NUMBER; // troque se o telefone for diferente
const PHONE_DISPLAY = "(62) 98183-3627"; // texto exibido no rodapé
```

---

## ✅ Itens que ainda precisam ser personalizados antes de publicar

O projeto já está pronto para ir ao ar, mas alguns pontos são **exemplos**
que devem ser substituídos por informações reais da empresa:

1. **Depoimentos** (seção "Depoimentos" do `index.html`) — são 4 depoimentos
   fictícios, claramente marcados no código com um comentário
   `ATENÇÃO — DEPOIMENTOS FICTÍCIOS`. Troque pelos depoimentos reais dos
   clientes (idealmente com autorização por escrito para uso do nome).
2. **Endereço, CNPJ e coordenadas** — no `index.html`, dentro da tag
   `<script type="application/ld+json">` (Schema.org / LocalBusiness) e no
   rodapé, atualize endereço completo, CNPJ e coordenadas de geolocalização
   reais da empresa.
3. **Redes sociais** — os links de Instagram e Facebook no rodapé estão como
   exemplo (`ekosolucoes`); atualize para os perfis reais.
4. **Mapa** — no rodapé, há um *placeholder* estático no lugar de um mapa
   real (para não depender de serviços externos e preservar a nota de
   performance). O código já traz, em comentário, o modelo de `<iframe>`
   do Google Maps para você colar quando tiver o link de incorporação real.
5. **Fotos reais** — a ilustração da hero (`images/hero-illustration.svg`) é
   um desenho vetorial criado especialmente para este projeto. Se quiser
   usar fotos reais da equipe/serviços, adicione-as em `/images` (formato
   `.webp` ou `.jpg` comprimido) e troque o `src` da tag `<img>` da hero.
6. **Política de Privacidade** — o texto em `politica-de-privacidade.html`
   é um modelo. Revise com um profissional jurídico antes de publicar.

---

## 🚀 Publicando no GitHub Pages

1. Crie um repositório novo no GitHub (ex.: `eko-solucoes-site`).
2. Envie todos os arquivos deste projeto para a raiz do repositório
   (mantendo a estrutura de pastas `/images`, `/icons`, `/assets`):
   ```bash
   git init
   git add .
   git commit -m "Primeira versão do site da Eko Soluções"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/eko-solucoes-site.git
   git push -u origin main
   ```
3. No GitHub, acesse **Settings → Pages**.
4. Em **Build and deployment**, selecione:
   - **Source:** `Deploy from a branch`
   - **Branch:** `main` / pasta `/ (root)`
5. Salve e aguarde alguns minutos. O GitHub fornecerá uma URL parecida com:
   `https://SEU-USUARIO.github.io/eko-solucoes-site/`

---

## 🌐 Configurando o domínio próprio com Cloudflare

Domínio de referência usado neste projeto: **ekosolucoes.com.br**

1. **No GitHub:**
   - Em **Settings → Pages → Custom domain**, digite `ekosolucoes.com.br`
     e salve. Isso cria automaticamente um arquivo `CNAME` na raiz do
     repositório com o domínio.
2. **Na Cloudflare (painel DNS do domínio):**
   - Crie um registro **CNAME** apontando o domínio raiz (ou o subdomínio
     `www`) para `SEU-USUARIO.github.io`.
   - Se for usar o domínio raiz (`ekosolucoes.com.br` sem `www`), crie
     registros do tipo **A** apontando para os IPs do GitHub Pages:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - Deixe o proxy da Cloudflare **ativado (nuvem laranja)** para
     aproveitar CDN, cache e certificado SSL automático da Cloudflare.
3. Em **SSL/TLS** na Cloudflare, defina o modo como **Full** (ou
   **Full (strict)**, se preferir validação mais rigorosa).
4. Volte em **Settings → Pages** no GitHub e marque a opção
   **Enforce HTTPS**, assim que o certificado for emitido.
5. Aguarde a propagação do DNS (pode levar de alguns minutos a algumas
   horas) e acesse `https://ekosolucoes.com.br` para confirmar.

---

## ⚡ Notas de performance (nota alta no Google PageSpeed)

Este projeto foi construído com boas práticas de performance desde o início:

- **Sem frameworks e sem CDN:** zero requisições externas de CSS/JS/fontes.
- **Fontes do sistema:** nenhuma fonte web é baixada; o site usa a pilha de
  fontes nativa do sistema operacional do visitante (`-apple-system, Segoe
  UI, Roboto...`), eliminando um dos maiores vilões de performance.
- **CSS e JS em arquivos únicos**, pequenos, sem código morto, carregados
  sem bloquear a renderização (`<script defer>`).
- **Imagens:**
  - A ilustração da hero é um **SVG vetorial leve** (poucos KB) em vez de
    uma foto pesada, e é carregada com `fetchpriority="high"` por impactar
    diretamente o LCP (Largest Contentful Paint).
  - Ícones de interface também são SVGs pequenos.
  - Todas as imagens fora da primeira dobra (redes sociais, ícones do
    rodapé) usam `loading="lazy"`.
  - Ao adicionar fotos reais, prefira o formato **WebP** e comprima antes
    de subir (ex.: com [squoosh.app](https://squoosh.app) ou `ImageMagick`).
- **Sem JavaScript pesado:** o `script.js` não tem dependências e usa
  `IntersectionObserver` (nativo do navegador) para animações leves.
- **Cache:** ao usar a Cloudflare com o proxy ativado, arquivos estáticos
  (CSS, JS, imagens) já se beneficiam de cache de borda automaticamente.

---

## ♿ Acessibilidade

- Contraste de cores testado para atender ao nível **AA**;
- Todas as imagens possuem atributo `alt` (vazio para itens puramente
  decorativos, descritivo para imagens informativas);
- Navegação 100% possível via teclado (`Tab`, `Enter`, `Esc` fecha o menu
  mobile);
- Foco visível customizado (`:focus-visible`) em links e botões;
- Menu do FAQ (accordion) e menu mobile usam atributos ARIA
  (`aria-expanded`, `aria-controls`, `aria-hidden`) corretamente;
- Existe um link "Pular para o conteúdo principal" no topo da página,
  visível ao navegar com `Tab`.

---

## 🛠️ Tecnologias utilizadas

- HTML5 semântico
- CSS moderno (variáveis CSS, Grid, Flexbox, `clamp()`, `:has()`)
- JavaScript puro (Vanilla JS, ES5/ES6 compatível com navegadores atuais)
- **Nenhuma** dependência externa, framework ou CDN

---

## 📄 Licença de uso

Este código foi desenvolvido especificamente para a Eko Soluções e pode ser
livremente adaptado, editado e hospedado pela empresa ou por quem a
represente.
