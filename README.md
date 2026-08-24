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
| Barra fixa do mobile e CTA do menu | Passam a apontar para a próxima imersão |
| Array vazio | Aparece o bloco "Novas imersões em breve" com lista de espera |
| `Event` do Schema.org | Gerado a partir do mesmo array (só imersões ativas) |
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
  link:'https://...',                // landing própria (tem prioridade), OU
  wa:true,                           // CTA vai pro WhatsApp com msg da imersão
  cta:'Quero saber mais'
}
```

Quando a landing de Caraíva / Esquenta / Réveillon existir, troque `wa:true`
por `link:'https://...'`.

Sem foto própria, use `foto:null` + `placa:'img/…'` — a faixa vira uma placa
verde com o selo postal do destino (é o caso da Costa Rica hoje).

---

## Estados testados

| Estado | Resultado |
|---|---|
| Futuro distante (24/08/2026) | 4 imersões · Aniversário = PRÓXIMA · "faltam 11 dias" |
| Semana do evento (05/09/2026) | Aniversário = PRÓXIMA · "acontecendo agora" |
| Uma imersão passou (20/09/2026) | Aniversário some · Caraíva vira PRÓXIMA · 3 Events no JSON-LD |
| Tudo encerrado (01/03/2027) | Bloco de lista de espera · barra e menu viram WhatsApp |

Também verificado: 390 / 768 / 1200 / 1600 px sem scroll horizontal ·
`prefers-reduced-motion` neutraliza todo o movimento · sem JS existe um
`<noscript>` com o calendário em texto e CTA de WhatsApp.

---

## Dados reais

- **WhatsApp** 55 51 99904-1589 — resolvido de `wa.link/62tfjd`, o link oficial
  publicado em jitshouse.com
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
- [ ] Landings de Caraíva / Esquenta / Réveillon → trocar `wa:true` por `link:`
- [ ] Ao publicar no domínio final, trocar as URLs `jitshouse.com` do `<head>`
      (canonical, og:url, og:image) e do JSON-LD

---

Site por Baruc Amare.
