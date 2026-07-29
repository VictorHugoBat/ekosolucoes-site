# Pasta `icons/`

Ícones em SVG usados no site, criados internamente (sem dependência de
bibliotecas externas como Font Awesome ou similares). Cada arquivo é um SVG
independente, leve e sem scripts.

## Como os ícones são usados

- No `index.html`, os ícones são referenciados via `<img src="icons/nome.svg" ...>`,
  sempre com `alt=""` (decorativos) e `loading="lazy"` quando estão fora da
  primeira dobra da página.
- A maioria usa `stroke="#2E7D32"` (verde da marca) fixo. Ícones que precisam
  se adaptar à cor do fundo (ex.: rodapé escuro) usam `stroke="currentColor"`
  e recebem cor via filtro CSS (`filter`) no `style.css`.

## Lista de ícones disponíveis

| Arquivo | Uso |
|---|---|
| `shield-check.svg` | Segurança / empresa regularizada |
| `clock-fast.svg` | Atendimento rápido |
| `user-check.svg` | Técnicos treinados |
| `leaf.svg` | Produtos seguros |
| `certificate.svg` | Garantia |
| `building.svg` | Empresa regularizada |
| `coin.svg` | Orçamento gratuito |
| `house.svg` | Dedetização residencial |
| `termite.svg` | Descupinização |
| `rat.svg` | Desratização |
| `ant.svg` | Controle de formigas |
| `cockroach.svg` | Controle de baratas |
| `scorpion.svg` | Controle de escorpiões |
| `whatsapp.svg` | Botões e links de WhatsApp |
| `phone.svg` | Botões e links de telefone |
| `mail.svg` | E-mail no rodapé |
| `map-pin.svg` | Localização / mapa |
| `instagram.svg` / `facebook.svg` | Redes sociais no rodapé |
| `chevron-down.svg` | Indicador de scroll e seta do FAQ |
| `arrow-up.svg` | Botão "voltar ao topo" |
| `menu.svg` / `close.svg` | Ícone do menu mobile |
| `quote.svg` | Aspas decorativas nos depoimentos |
| `star.svg` | Estrela (disponível para avaliações, não usada por padrão) |

Para adicionar um novo ícone, siga o mesmo padrão: `viewBox="0 0 24 24"`,
traços (`stroke`) com `stroke-width="2"` e `stroke-linecap="round"`, para
manter a mesma linguagem visual dos demais ícones do site.
