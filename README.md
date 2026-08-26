# Jitshouse Lifestyle — site institucional

A casa digital da marca: manifesto, pilares, o que a Jitshouse faz, calendário
de imersões, a casa na Praia do Rosa, o fundador e a loja — mais uma página
completa por imersão. HTML/CSS/JS puro, sem frameworks e sem build.

## Arquivos

| Arquivo | O que é |
|---|---|
| `index.html` | A home. Self-contained (CSS e JS inline) |
| `caraiva.html` | Jitshouse On The Road — Caraíva · 25–27 set 2026 |
| `esquenta.html` | Esquenta Réveillon Costa Rica · 10–12 out 2026 |
| `reveillon.html` | Costa Rica New Year Experience · 28/12 a 02/01 |
| `assets/imersao.css` | Design system compartilhado pelas 3 páginas de imersão |
| `assets/imersao.js` | Movimento, nav e barra fixa das páginas de imersão |

O **Aniversário** não tem página aqui de propósito: a landing de venda dele já
existe em
[jitshouse-aniversario.vercel.app](https://jitshouse-aniversario.vercel.app/) e
é mais profunda que uma página de detalhe. Duplicar o mesmo evento em duas URLs
dividiria o SEO e confundiria quem chega. O calendário aponta pra lá.

> ⚠️ Os tokens de cor e a tipografia estão **duplicados** entre `index.html`
> (inline) e `assets/imersao.css`. Foi decisão consciente: a home já estava no
> ar e funcionando, e refatorá-la pra puxar CSS externo traria risco de
> regressão sem ganho pro usuário. **Ao mexer na paleta, mexa nos dois.**

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
| Imersão **com** `checkout` | Botão **"Garantir minha vaga"** vende direto (mesma aba) |
| Imersão **sem** `checkout` | Botão **"Quero saber mais"** cai no WhatsApp |
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
  checkout: LOJA + '/wwk9630-jitshouse-caraiva'   // null = cai no WhatsApp
}
```

**Publicar uma imersão nova na loja = colar a URL do produto em `checkout`.**
Nada mais muda: o botão troca de "Quero saber mais" para "Garantir minha vaga",
a micro-copy de pagamento entra, o `offers` do Schema.org é gerado e a barra
fixa do mobile passa a apontar pro checkout.

**`preco` é obrigatório quando há `checkout`** — ver a seção abaixo.

Sem foto própria, use `foto:null` + `placa:'img/…'` — a faixa vira uma placa
verde com o selo postal do destino (é o caso da Costa Rica hoje).

### O site exibe preço — e ele tem de bater com o checkout

Regra da casa, revisada em 26/08/2026: **se a imersão tem `checkout`, o valor
aparece.** Ele já é público a um clique de distância; escondê-lo só produz
fricção e desconfiança. A política anterior ("preço só no checkout") foi
revertida.

Como funciona:

- Cada imersão com `checkout` carrega `preco`, `precoDetalhe` e `incluso`.
  O calendário renderiza os três a partir do array — nada é escrito à mão.
- `precoDe` é opcional e só existe onde a loja de fato marca um valor
  anterior riscado.
- O `offers` do Schema.org leva `price` e `priceCurrency` derivados do mesmo
  campo `preco`. Página, JSON-LD e Google mostram o mesmo número.
- O guarda-corpo inverteu: o console reclama quando existe `checkout` **sem**
  `preco`, e quando existe `preco` sem `checkout`.

**A fonte do valor é o checkout, não o jitshouse.com.** O site oficial é
mantido por outra agência e pode ficar defasado — hoje ele mesmo anuncia um
valor diferente do que a loja cobra no Aniversário (ver abaixo). Antes de
mudar qualquer preço aqui, abra o link do produto e confira.

**Os 6 "posts" do site antigo foram descartados**: são lorem-ipsum do tema
(títulos genéricos em inglês, os 6 com texto idêntico de 1963 caracteres).

### ⚠ Divergência aberta no Aniversário

A página `jitshouse.com/aniversario-jitshouse/` anuncia **Ticket Silver
R$ 540,00**; o checkout da loja cobra **R$ 490,00**. O botão "Comprar" de lá
aponta para esse mesmo produto — ou seja, a página oficial mostra 540 e cobra
490. Reconferido em 26/08/2026: os dois seguem no ar, divergentes.

**Este site exibe R$ 490**, o valor efetivamente cobrado. Anunciar 540 e cobrar
490 é o único erro de preço que não tem conserto: o cliente descobre na hora do
pagamento.

Quando o Rodrigo decidir o valor certo: **corrigir a loja primeiro**, depois o
campo `preco` do array aqui e o bloco de preço da landing do Aniversário.

---

## Checkouts na loja InfinitePay

Titular **Rodrigo de Mello Klippel**. As quatro imersões já têm produto
publicado — conferidos na vitrine da loja em 24/08/2026.

> Estes são os valores **exibidos no site** (campo `preco` do array). Conferidos
> um a um na loja em 26/08/2026. Se algum mudar lá, muda aqui.

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

> **[VALIDAR]** A micro-copy sob o botão diz "Valores e pagamento seguro na loja
> oficial · InfinitePay". As formas de pagamento aceitas não foram confirmadas (a
> InfinitePay só as mostra depois do "Comprar agora"). Confirmado Pix/cartão/
> parcelamento, trocar a constante `SELO_PAGAMENTO` por
> `'Valores e pagamento seguro via InfinitePay — Pix, cartão e parcelamento'`.

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
- [ ] Grade hora a hora de Caraíva — a página oficial lista as atividades sem
      horários fechados por dia, diferente das outras três
- [ ] Confirmar se o "APENAS 10 VAGAS" do card do Esquenta vale para o Esquenta
      ou para o Réveillon (não publiquei: escassez desatualizada engana)
- [ ] Alinhar o preço do Aniversário entre o site antigo (R$ 540) e a loja (R$ 490)
- [ ] Confirmar formas de pagamento e liberar a micro-copy completa
- [ ] Ao publicar no domínio final, trocar as URLs `jitshouse.com` do `<head>`
      (canonical, og:url, og:image) e do JSON-LD

---

Site por Baruc Amare.
