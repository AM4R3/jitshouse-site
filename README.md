# Jitshouse Lifestyle — site institucional

A casa digital da marca: manifesto, calendário de imersões, a casa na Praia do
Rosa, o fundador e a loja. Arquivo único (`index.html`), HTML/CSS/JS puro, sem
frameworks e sem build.

**Não confundir** com as landings de venda de cada imersão — por exemplo
[jitshouse-aniversario.vercel.app](https://jitshouse-aniversario.vercel.app/),
que é a página de venda do Aniversário. Este site é a marca; ele aponta para
aquelas.

---

## ★ Como atualizar o calendário

Tudo vive no array `IMERSOES`, no `<script>` no fim do `index.html`.
**Adicionar uma imersão = colar um objeto no array.** O resto da página se vira
sozinho:

| Comportamento | O que acontece |
|---|---|
| Imersão com `fim` no passado | Some do calendário sozinha |
| Próxima imersão futura | Ganha o selo **PRÓXIMA** e a linha "faltam X dias" |
| Imersão **com** `checkout` | Botão **"Garantir minha vaga"** vende direto (mesma aba) + preço |
| Imersão **sem** `checkout` | Botão **"Quero saber mais"** cai no WhatsApp, sem preço |
| Barra fixa do mobile | Herda o destino da próxima imersão: checkout ou WhatsApp |
| CTA do menu | Rola até a oferta da próxima imersão (`#im-…`) |
| Array vazio | Aparece o bloco "Novas imersões em breve" com lista de espera |
| `Event` do Schema.org | Gerado do mesmo array; ganha `offers` quando há checkout |
| `©` do rodapé | Ano automático |

A contagem de dias usa o fuso `America/Sao_Paulo`.

### Campos de cada imersão

```js
{
  id:'caraiva',                      // vira a âncora #im-caraiva
  nome:'Jitshouse On The Road — Caraíva',
  inicio:'2026-09-25', fim:'2026-09-27',   // fim passou → some
  datas:'25 a 27 set 2026',          // como aparece na tela
  local:'Caraíva — Bahia',
  selo:{ l1:'CARAÍVA', l2:'BAHIA', icone:'palmeira' },  // onda|palmeira|sol|triangulo
  copy:'...',                        // 2 linhas, transcritas do card oficial
  tag:'Treine. Explore. Evolua.',    // opcional (parceria/assinatura)
  foto:'img/dest-caraiva',           // sem extensão: usa .webp e .jpg
  alt:'...',
  link:'https://...',                // landing da imersão → link secundário

  // ── venda ───────────────────────────────────────────────────────
  checkout: LOJA + '/wwk9630-jitshouse-caraiva',  // null = cai no WhatsApp
  preco:'R$ 1.790',                  // só aparece se houver checkout
  precoDe:'R$ 2.090',                // opcional, riscado
  off:'-15%'                         // opcional, selo de desconto
}
```

**Publicar uma imersão nova na loja = colar a URL do produto em `checkout`.**
Nada mais muda: o botão troca de "Quero saber mais" para "Garantir minha vaga",
o preço aparece, a micro-copy de pagamento entra, o `offers` do Schema.org é
gerado e a barra fixa do mobile passa a apontar pro checkout.

Sem foto própria, use `foto:null` + `placa:'img/…'` — a faixa vira uma placa
verde com o selo postal do destino (é o caso da Costa Rica hoje).

### Regras de preço (aplicadas em código, não na confiança)

- **Preço nunca aparece sem checkout.** Mesmo que `preco` esteja preenchido,
  ele só renderiza se houver `checkout` — é o checkout que torna o valor público.
- **Checkout ativo nunca esconde o preço.** Se você preencher `checkout` e
  esquecer `preco`, o console avisa no carregamento.
- O valor exibido tem que ser **idêntico ao da loja**. Os atuais foram
  conferidos um a um em `loja.infinitepay.io/jitshouse_lifestyle`.

---

## Estados testados

| Estado | Resultado |
|---|---|
| Futuro distante (24/08/2026) | 4 imersões · Aniversário = PRÓXIMA · "faltam 11 dias" |
| Semana do evento (05/09/2026) | Aniversário = PRÓXIMA · "acontecendo agora" |
| Uma imersão passou (20/09/2026) | Aniversário some · Caraíva vira PRÓXIMA · 3 Events no JSON-LD |
| Tudo encerrado (01/03/2027) | Bloco de lista de espera · barra e menu viram WhatsApp |
| Imersão **sem** checkout | Botão vira "Quero saber mais" → WhatsApp · preço some · sem `offers` |
| Próxima **sem** checkout | Barra fixa do mobile vai pro WhatsApp (`target=_blank`) |

Também verificado: 390 / 768 / 1200 / 1600 px sem scroll horizontal ·
`prefers-reduced-motion` neutraliza todo o movimento · sem JS existe um
`<noscript>` com o calendário em texto e CTA de WhatsApp.

---

## Checkouts na loja InfinitePay

Titular **Rodrigo de Mello Klippel**. As quatro imersões já têm produto
publicado — conferidos na vitrine da loja em 24/08/2026:

| Imersão | Produto na loja | Preço |
|---|---|---|
| Aniversário Jitshouse | `yne5701-ticket-silver-aniversario-jitshouse` | R$ 490 (de R$ 590, -17%) |
| On The Road Caraíva | `wwk9630-jitshouse-caraiva` | R$ 1.790 |
| Esquenta Costa Rica | `hlm5888-praia-do-rosa-preview-costa-rica` | R$ 2.190 (de R$ 2.590, -15%) |
| Réveillon Costa Rica | `ooe9249-jitshouse-costa-rica` | R$ 8.990 (de R$ 9.699,90, -7%) |

Cada produto foi aberto e conferido — título, preço e descrição batem com a
imersão correspondente:

- **Caraíva** — "Data 25,26 e 27 de setembro · Pousada Kamaiura · Dojo Caraiva"
- **Esquenta** — o produto se chama "Praia do Rosa Preview Costa Rica", e a
  descrição diz **"10 a 12 de outubro"**: é este Esquenta
- **Réveillon** — "Réveillon: Jitshouse x Satya Yoga · 28 de Dezembro a 02 de
  Janeiro · Santa Teresa, Costa Rica"

> **[VALIDAR]** A micro-copy sob o botão diz "Pagamento seguro na loja oficial ·
> InfinitePay". As formas de pagamento aceitas não foram confirmadas (a
> InfinitePay só as mostra depois do "Comprar agora"). Confirmado Pix/cartão/
> parcelamento, trocar a constante `SELO_PAGAMENTO` por
> `'Pagamento seguro via InfinitePay — Pix, cartão e parcelamento'`.

---

## Dados reais

- **WhatsApp** 55 51 99904-1589 — resolvido de `wa.link/62tfjd`, o link oficial
  publicado em jitshouse.com. Segue como canal de dúvidas em todas as faixas
- **Loja** https://loja.infinitepay.io/jitshouse_lifestyle
- **E-mail** jitshousepraiadorosa@gmail.com
- **Instagram** @jitshouselifestyle · @rodrigoklippelbjj · @jitshousepraiadorosa
- **Copys das imersões** transcritas dos cards oficiais publicados em
  jitshouse.com (`/wp-json/wp/v2/media`) — incluindo Caraíva
  ("Treine. Explore. Evolua.", 25–27 set), Esquenta ("o esquenta oficial para o
  Réveillon na Costa Rica", 10–12 out) e Réveillon (Luiza Lisboa, Déia Ribeiro e
  Rodrigo Klippel · Satya on the Road · 28/12/2026 a 02/01/2027)
- **Fotos** reais dos ativos oficiais: Praia do Rosa, Caraíva (aérea), casa,
  tatame, mesa, quartos, retrato do Rodrigo

### Paleta — amostrada dos ativos oficiais

O verde real da marca é bem mais profundo que a estimativa inicial:

| Token | Hex | Origem |
|---|---|---|
| `--floresta` | `#04211E` | teal-noite do card oficial |
| `--verde-rosa` | `#004030` | verde da rosa do brasão |
| `--ouro` | `#C5B178` | aro do brasão |
| `--ouro-dia` | `#935C0E` | o ouro da marca rebaixado para uso sobre papel |
| `--papel` | `#F0E8D6` | papel de pôster |

Contraste conferido: tinta/papel 13.0 · floresta/papel 13.9 · verde-rosa/papel
9.7 · ouro-dia/papel 4.6 · ouro/floresta 8.0 · areia/floresta 12.4 — todos AA.
O ouro original (`#C5B178`) **não** passa sobre papel (1.6:1); por isso existe o
`--ouro-dia`.

---

## Pendente

- [ ] Bio completa do Rodrigo — faixa, linhagem, anos de tatame (seção "O fundador")
- [ ] Depoimentos reais autorizados → array `DEPOIMENTOS` (hoje vazio; o bloco só
      aparece quando houver conteúdo real — nada de prova social fabricada)
- [ ] Foto própria da Costa Rica (hoje a placa usa a textura do material oficial)
- [ ] Landings de Caraíva / Esquenta / Réveillon → preencher `link:` (o checkout
      já está ligado; a landing entra como link secundário "Ver a imersão")
- [ ] Confirmar formas de pagamento e liberar a micro-copy completa
- [ ] Ao publicar no domínio final, trocar as URLs `jitshouse.com` do `<head>`
      (canonical, og:url, og:image) e do JSON-LD

---

Site por Baruc Amare.
