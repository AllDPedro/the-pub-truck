Abaixo está um prompt reescrito de forma profissional e detalhada para você enviar ao **Codex**, **Claude Code**, **Cursor AI** ou outra IA de programação. Organizei como uma especificação técnica, pois isso aumenta muito a qualidade do código gerado.

---

# PROJETO: Sistema de Autoatendimento para Hamburgueria The Pub Truck

## Objetivo

Desenvolver um sistema completo de autoatendimento para a hamburgueria **The Pub Truck**, onde o cliente faz todo o pedido pelo próprio celular através da leitura de um QR Code, sem necessidade de atendimento no caixa.

O sistema deverá possuir dois ambientes:

* Área do Cliente
* Área Administrativa (Cozinha/Caixa)

O objetivo é agilizar o atendimento, reduzir filas e permitir que os funcionários apenas preparem e entreguem os pedidos.

---

# Fluxo do Cliente

O cliente chega ao local.

Na mesa existe um QR Code.

Ao ler o QR Code ele será direcionado para o site.

Não será necessário criar senha.

O único cadastro solicitado será:

* Número de celular

Esse número ficará salvo para envio de notificações do pedido.

Após informar o telefone o cliente poderá navegar normalmente pelo cardápio.

---

# Layout

O site deve possuir um visual moderno semelhante aos aplicativos:

* iFood
* Outback
* Madero
* McDonald's

Tema:

* Escuro
* Preto
* Verde militar
* Dourado

Inspirado na identidade visual do Instagram da empresa:

[https://www.instagram.com/thepubtruck/](https://www.instagram.com/thepubtruck/)

O site deve ser totalmente responsivo para celular.

---

# Cardápio

Cada produto terá:

Imagem

Nome

Descrição

Preço

Botão:

+1

Editar

---

# Funcionamento do botão +1

Quando o usuário clicar apenas em **+1**, o sistema adiciona automaticamente:

Receita padrão

Pão Brioche

Hambúrguer padrão

Sem modificações

---

# Funcionamento do botão Editar

Ao clicar em **Editar**, abrir uma janela/modal permitindo personalizar o lanche.

## Escolha do pão

O cliente poderá escolher apenas um:

* Brioche
* Australiano
* Apimentado
* Vegano

---

## Carne

Caso o lanche permita:

Hambúrguer padrão

90g

ou

Hambúrguer Duplo

180g

Com acréscimo automático de valor.

---

## Combo

Abaixo da carne aparecer:

Adicionar Batata Rústica ao Combo

(+ R$14,00)

Caso marque essa opção:

Adicionar batata ao combo com preço promocional.

Caso não marque:

Não adicionar.

---

## Observações

Campo livre para texto.

Exemplos:

Sem tomate

Sem cebola

Sem alface

Molho separado

Ponto da carne

etc.

---

# Produtos

## Hambúrgueres

The Classic

90g

Permite:

* Brioche
* Australiano
* Apimentado

---

Smash

60g

Pão Brioche

---

The Veggie

Hambúrguer totalmente vegano.

Pão vegano.

Ingredientes veganos.

---

Outros hambúrgueres poderão ser adicionados futuramente.

O sistema deve permitir cadastro fácil de novos produtos.

---

# Aperitivos

Batata Rústica

Pequena

R$20

Grande

R$24

Chicken Wings

Espetinho de Carne

Espetinho de Frango

Outros itens futuramente.

---

# Bebidas

## Cervejas Artesanais

Título:

CERVEJAS ARTESANAIS

Itens:

IPA

300ml

Pilsen

300ml

---

## Long Neck

Corona

Heineken

---

## Sucos

Del Valle Uva

Del Valle Pêssego

Mate Limão

Mate Pêssego

---

## Água

Com gás

Sem gás

---

Todos os produtos simples terão apenas:

Botão +1

Sem necessidade de edição.

---

# Carrinho

Na lateral inferior deverá existir um botão flutuante mostrando:

Quantidade de itens

Valor total

Ao clicar abre o carrinho.

No carrinho será possível:

Editar item

Excluir item

Alterar quantidade

Ver observações

Adicionar observações

---

# Finalização

Ao clicar em:

Enviar Pedido

O sistema deverá:

Salvar o pedido

Gerar um número sequencial.

Exemplo:

Pedido 1

Pedido 2

Pedido 3

...

Todo dia, à meia-noite, essa numeração deverá reiniciar automaticamente.

---

# Pedido

Cada pedido conterá:

Número

Telefone

Data

Hora

Produtos

Quantidade

Preço

Observações

Valor Total

Status

---

# Status

Recebido

Em preparo

Pronto

Entregue

Cancelado

---

# Sistema da Cozinha

Criar uma tela semelhante ao painel do iFood.

Os pedidos aparecem automaticamente.

Exemplo:

Pedido #03

The Classic

* Batata

* IPA

Observação:

Sem tomate

Botões:

Aceitar Pedido

Em Preparo

Pedido Pronto

Entregue

---

# Sistema Administrativo

Criar login para funcionários.

Perfis:

Administrador

Caixa

Cozinha

O administrador poderá:

Cadastrar produtos

Editar preços

Cadastrar categorias

Adicionar fotos

Editar ingredientes

Criar promoções

Ver histórico de pedidos

Relatórios

---

# Integração WhatsApp

Após o cliente finalizar o pedido:

Enviar automaticamente uma mensagem para o WhatsApp do cliente contendo:

Número do pedido

Resumo completo

Valor

Data

Horário

Exemplo:

Pedido #03

The Classic

Pão Australiano

180g

Batata Combo

IPA

Total: R$89,90

Status:
Recebido.

Também enviar esse pedido para o WhatsApp da loja (opcional) ou apenas registrar no painel administrativo.

---

# Notificações

Quando a cozinha clicar em:

Pedido Pronto

O sistema deverá enviar automaticamente uma mensagem para o WhatsApp do cliente.

Exemplo:

🍔 Seu pedido #03 está pronto!

Retire no balcão.

Obrigado por escolher o The Pub Truck!

---

# Sistema de Chamado (Pager)

A hamburgueria utiliza pagers eletrônicos (labels) que ficam com o cliente.

O sistema deve ser preparado para futura integração com esses dispositivos.

Fluxo esperado:

Cliente recebe o pager.

Quando o pedido estiver pronto, o funcionário informa o número do pedido no painel administrativo.

O sistema deverá permitir, futuramente, enviar o comando ao pager correspondente para emitir som e vibração até que seja devolvido ao suporte.

Inicialmente, essa integração pode ficar apenas preparada na arquitetura do sistema (API ou módulo desacoplado).

---

# Tecnologias sugeridas

Frontend:

* Next.js 15
* React
* TypeScript
* Tailwind CSS
* Shadcn/UI

Backend:

* Node.js
* NestJS ou Express

Banco de dados:

* PostgreSQL

ORM:

* Prisma

Autenticação:

* Login simplificado por número de celular para clientes
* JWT para administradores

Tempo real:

* Socket.IO ou WebSockets para atualização instantânea dos pedidos

Mensageria:

* API oficial do WhatsApp Business (ou outra integração configurável)

Hospedagem:

* Vercel (Frontend)
* Railway ou VPS (Backend)
* PostgreSQL

---

# Requisitos de UX

* Interface extremamente rápida.
* Estilo semelhante ao iFood.
* Totalmente responsiva.
* Ícones modernos.
* Fotos grandes dos produtos.
* Carrinho fixo.
* Atualização em tempo real dos pedidos.
* Código limpo, organizado e documentado.
* Arquitetura escalável para inclusão de novos produtos, promoções e futuras integrações.

**Objetivo final:** criar um sistema profissional de autoatendimento que substitua o atendimento manual no The Pub Truck, oferecendo uma experiência semelhante aos grandes aplicativos de delivery, mas voltada para consumo no local, com painel de cozinha, administração, notificações via WhatsApp e estrutura preparada para integração com pagers eletrônicos.
