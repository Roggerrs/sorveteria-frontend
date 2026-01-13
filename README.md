
---

# 🍦 Sistema de Sorveteria — Frontend

Frontend do sistema de sorveteria desenvolvido em **React**, consumindo uma **API REST em Spring Boot**.

A interface foi construída com **React + Material UI (MUI)**, utilizando **componentes responsivos** e **tema escuro**, com foco em **usabilidade mobile-first**, organização visual e regras de negócio claras.

O sistema simula o fluxo real de uma sorveteria: seleção de atendente, montagem de pedidos com múltiplos sorvetes, cálculo automático de valores e geração de relatórios.

---

## 📢 Stack / Tecnologias

`React` `JavaScript (ES6+)` `Vite`
`Material UI (MUI)` `Responsive Design`
`React Router DOM`
`API REST` `Git` `GitHub`

---

## 🧠 Competências Aplicadas

Neste projeto foram aplicados conhecimentos em:

* Criação de interfaces modernas com **React**
* Organização de projeto com **Vite**
* Navegação entre telas com **React Router DOM**
* **Consumo de API REST** (fetch + async/await)
* Gerenciamento de estado com **React Hooks**
* Componentização (pages / components)
* **Cálculo de regras de negócio no frontend**
* Integração completa com backend em **Spring Boot**
* UI responsiva com **Material UI**
* Layout **mobile-first**
* Boas práticas de organização e legibilidade de código

---

## 🎯 Objetivo do Frontend

Fornecer uma interface funcional e intuitiva para:

* Selecionar o atendente responsável pelo pedido
* Criar pedidos com **múltiplos sorvetes**
* Escolher **tamanho e sabores**
* Calcular automaticamente valores parciais e total
* Remover sorvetes antes de finalizar o pedido
* Listar pedidos realizados
* Visualizar detalhes de cada pedido
* Exibir relatórios de vendas

---

## 📱 Responsividade (IMPORTANTE)

✔ Interface **totalmente responsiva**
✔ Desenvolvida com foco em **mobile-first**
✔ Funciona corretamente em:

* Celulares
* Tablets
* Desktop

Componentes se adaptam automaticamente ao tamanho da tela.

---

## 📂 Estrutura do Projeto

```
src
├─ api
│  └─ api.js                  # Comunicação com backend
├─ components
│  ├─ TamanhoItem.jsx         # Componente de seleção de tamanho
│  └─ SaborItem.jsx           # Componente de seleção de sabor
├─ pages
│  ├─ SelecionarAtendente.jsx # Tela inicial
│  ├─ CriarPedido.jsx         # Criação e montagem do pedido
│  ├─ ListarPedidos.jsx       # Listagem de pedidos
│  ├─ PedidoDetalhe.jsx       # Detalhes do pedido
│  └─ Relatorios.jsx          # Relatórios de vendas
├─ App.jsx                    # Rotas
├─ main.jsx                   # Bootstrap do app
└─ index.css                  # Estilos globais
```

---

## 🖼️ Design e UI

* Tema escuro
* Paleta em tons de laranja (identidade visual)
* Componentes do **Material UI**
* Botões grandes e acessíveis
* Cartões claros e legíveis
* Interface pensada para uso rápido em ambiente real

---

## 🔗 Integração com Backend

O frontend consome a API backend em execução em:

```
http://localhost:8080
```

Principais endpoints utilizados:

* `GET /atendentes`
* `GET /tamanhos`
* `GET /sabores`
* `POST /pedidos`
* `GET /pedidos`
* `GET /pedidos/{id}`
* `GET /relatorios`

---

## ▶️ Como Executar o Projeto

1️⃣ Clone o repositório:

```bash
git clone https://github.com/Roggerrs/sorveteria-frontend
```

2️⃣ Instale as dependências:

```bash
npm install
```

3️⃣ Inicie o projeto:

```bash
npm run dev
```

4️⃣ Acesse no navegador:

```
http://localhost:5173
```

⚠ Certifique-se de que o backend esteja rodando antes.

---

## 📊 Telas Disponíveis

* **Selecionar Atendente**
* **Criar Pedido**

  * Seleção de tamanho
  * Seleção de sabores
  * Adição e remoção de sorvetes
  * Cálculo automático do total
* **Listar Pedidos**
* **Detalhes do Pedido**
* **Relatórios**

  * Total faturado
  * Total por atendente
  * Sabores mais vendidos
  * Tamanhos mais vendidos

---

## 📸 Demonstração do Sistema

### Seleção de Atendente
![Selecionar Atendente](docs/images/front_imagem1.png)

### Criar Pedido
![Criar Pedido](docs/images/front_imagem2.png)

### Lista de Pedidos
![Pedidos](docs/images/front_imagem3.png)

### Relatórios
![Relatórios](docs/images/front_imagem6.png)

### Pedido
![Relatórios](docs/images/front_imagem4.png)

### Pedido detalhado
![Relatórios](docs/images/front_imagem5.png)


---



## 🧠 Contexto do Projeto

Este projeto foi desenvolvido com fins educacionais e práticos, simulando um sistema real de vendas.

O foco principal foi:

* Integração frontend + backend
* Regras de negócio no frontend
* Componentização
* UI responsiva
* Organização de código

---

## 🔗 Projetos Relacionados

* Backend (Spring Boot):
  [https://github.com/Roggerrs/sistema-sorveteria](https://github.com/Roggerrs/sistema-sorveteria)

* Modelagem SQL:
  [https://github.com/Roggerrs/Sistema-Sorveteria-SQL](https://github.com/Roggerrs/Sistema-Sorveteria-SQL)

---

## ✅ Status do Projeto

✔ Funcional
✔ Responsivo
✔ Completo
✔ Pronto para portfólio

---
