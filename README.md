

# 📦 README — Frontend

👉 `sorveteria-frontend`

```markdown
# 🍦 Sistema de Sorveteria — Frontend

Frontend do sistema de sorveteria desenvolvido em **React**, consumindo uma **API REST em Spring Boot**.

A interface foi construída sem frameworks CSS, utilizando apenas **CSS puro**, com foco em organização, legibilidade e identidade visual. O layout foi pensado para sistemas administrativos com navegação simples e intuitiva.

---

## 📢 Tags / Stack

`React` `JavaScript` `ES6+` `Vite`  
`React Router DOM` `CSS puro` `Flexbox`  
`API REST` `Frontend Developer` `Git` `GitHub`

---

## 🧠 Competências Aplicadas

Neste frontend foram aplicados conhecimentos em:

- Criação de interfaces com **React**
- Estruturação de projeto com **Vite**
- Navegação entre telas com **React Router DOM**
- **Consumo de API REST** (fetch + async/await)
- Organização de código por páginas (components/pages)
- Comunicação com backend em Spring Boot
- Estilização com **CSS puro**
- Layout com **Flexbox**
- Tratamento de estados com **React Hooks**

---

## 🎯 Objetivo do Frontend

Fornecer uma interface simples, funcional e agradável para:

- Seleção do atendente para iniciar um pedido
- Escolha de tamanho e sabores de sorvete
- Montagem e visualização de pedidos
- Navegação entre telas
- Consulta de relatórios de vendas
- Integração com backend sem frameworks CSS externos

---

## 📂 Estrutura do Projeto

```
```
src
├─ api
│   └─ api.js                     # funções para chamar a API backend
├─ pages
│   ├─ SelecionarAtendente.jsx    # tela inicial
│   ├─ CriarPedido.jsx            # criação de pedido
│   ├─ CriarSorvete.jsx           # adicionar sorvete ao pedido
│   ├─ ListarPedidos.jsx          # listagem de pedidos
│   ├─ PedidoDetalhe.jsx          # detalhes de um pedido
│   └─ Relatorios.jsx             # relatórios de vendas
├─ App.jsx                        # rotas do frontend
├─ main.jsx                       # bootstrap do app
└─ style.css                      # estilos globais

```

---

## 🖼️ Design e Estilo

- Tema escuro (fundo escuro + textos claros)
- Cores quentes (laranja/amarelo) com combinação agradável
- Componentes padronizados com CSS puro
- Botões e cartões com bom contraste
- Layout simples e intuitivo com Flexbox
- Visual limpo para uso administrativo

---

## 🔗 Integração com Backend

O frontend consome a API backend, que deve estar em execução em:

```

[http://localhost:8080](http://localhost:8080)

````

Certifique-se de que o backend (sistema-sorveteria) esteja rodando antes de iniciar o frontend.

Endpoints consumidos incluem:

- `GET /atendentes`
- `POST /pedidos`
- `GET /pedidos`
- `GET /pedidos/{id}`
- `GET /sabores`
- `GET /tamanhos`
- `GET /relatorios/...`

---

## ▶️ Como Executar

1. **Clone o repositório:**
```bash
git clone https://github.com/Roggerrs/sorveteria-frontend
````

2. **Instale as dependências:**

```bash
npm install
```

3. **Inicie o projeto:**

```bash
npm run dev
```

4. **Abra no navegador:**

```
http://localhost:5173
```

---

## 📊 Telas Disponíveis

* **Selecionar Atendente**
  Escolha o atendente que fará o pedido.

* **Criar Pedido**
  Defina o tamanho e sabores e adicione sorvetes ao pedido.

* **Listar Pedidos**
  Visualize todos os pedidos registrados.

* **Detalhes do Pedido**
  Visualize informações completas de um pedido.

* **Relatórios de Vendas**
  Total faturado, por atendente, sabores e tamanhos mais vendidos.

---

## 🧠 Contexto do Projeto

Este frontend faz parte de um sistema completo de sorveteria, integrado com um backend em Spring Boot. O projeto foi desenvolvido com foco em:

* Praticar consumo de API REST em React
* Organização de código em **componentes e páginas**
* Aprendizado de rotas com React Router
* Estilização com CSS sem frameworks pesados

---

## 🔗 Projetos Relacionados

* Backend em Spring Boot:
  [https://github.com/Roggerrs/sistema-sorveteria](https://github.com/Roggerrs/sistema-sorveteria)

* Modelagem SQL do banco (histórico):
  [https://github.com/Roggerrs/Sistema-Sorveteria-SQL](https://github.com/Roggerrs/Sistema-Sorveteria-SQL)

````

---
