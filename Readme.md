# The Pub Truck - prototipo do site

Primeira versao estatica da area do cliente para autoatendimento por QR Code.

## Como abrir

Com um servidor local:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Depois acesse:

```text
http://127.0.0.1:4173/
```

Tambem funciona abrindo o `index.html` direto no navegador.

## O que ja tem

- Entrada por numero de celular.
- Cardapio responsivo com categorias.
- Botao `+1` para receita padrao.
- Modal `Editar` para escolher pao, carne, combo com batata e observacoes.
- Carrinho flutuante com quantidade e total.
- Carrinho lateral com ajuste de quantidade e exclusao.
- Envio de pedido simulado com numero sequencial local.

## Proxima etapa

Depois dos ajustes visuais, a area administrativa pode ser conectada a um backend local no IP do roteador para cozinha/caixa receberem pedidos, confirmarem, colocarem pendencia ou marcarem como pronto.

## Creditos das imagens

Imagens de apoio baixadas do Unsplash:

- Diego Arenas de Rodrigo: burgers, batatas e cerveja.
- Janay Peters: food truck em evento noturno.
