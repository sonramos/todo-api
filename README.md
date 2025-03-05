
# TODO-API

## 📌 Sobre o Projeto

TODO-API é uma API RESTful desenvolvida em Node.js para um sistema de gerenciamento de tarefas (To-Do List). Ela permite a criação e gerenciamento de usuários e tarefas, com autenticação e autorização.

## 🚀 Tecnologias Utilizadas

* Node.js
* Express
* TypeScript
* MongoDB
* Mongoose
* Docker
* ESLint
* Prettier

## ⚙️ Como Rodar o Projeto Localmente

### 1️⃣ Clonar o Repositório

```sh
git clone <URL_DO_REPOSITORIO>
cd TODO-API
```

### 2️⃣ Instalar Dependências

```sh
npm install
```

### 3️⃣ Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto e preencha com as seguintes variáveis:

```
NODE_ENV=development
PORT=3000
DB_URI=mongodb://localhost:27017/todo-db
DB_URI_TEST=mongodb://localhost:27017/todo-db-test
```

### 4️⃣ Iniciar o Servidor

```sh
npm run dev
```

A API rodará em: `http://localhost:PORT`

## 📌 Como Utilizar a API

### 🧑 Cadastro de Usuário

**Endpoint:** `POST /api/auth/register`

**Requisição:**

```json
{
  "email": "john@example.com",
  "name": "John Doe",
  "password": "Aa1@bcde"
}
```

**Resposta:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "authentication": {
    "password": "<HASH>",
    "salt": "<SALT>",
    "sessionToken": ""
  },
  "_id": "<ID>",
  "createdAt": "2025-03-05T02:33:47.981Z",
  "updatedAt": "2025-03-05T02:33:47.981Z",
  "__v": 0
}
```

### ✅ Criação de uma Task

**Endpoint:** `POST /api/tasks`

**Requisição:**

```json
{
  "title": "House work",
  "description": "Take the garbage out"
  "userId": "67c7b80bfa8e0681bb3d5d44"
}
```

**Resposta:**

```json
{
  "_id": "1234567890",
  "title": "House work",
  "description": "Take the garbage out"
  "status": "Pendente",
  "user": "67c7b80bfa8e0681bb3d5d44",
  "createdAt": "2025-03-05T02:35:00.000Z",
  "updatedAt": "2025-03-05T02:35:00.000Z"
}
```

## 🧪 Rodando os Testes

### 1️⃣ Configurar Variáveis de Ambiente para Testes

Edite o `.env` e altere:

```
NODE_ENV=test
```

### 2️⃣ Executar os Testes

```sh
npm run test
```

## 📁 Estrutura do Projeto

```
TODO-API/
│── src/
│   ├── _tests_/           # Testes
│   ├── controllers/       # Controladores da API
│   ├── models/            # Modelos do Mongoose
│   ├── routes/            # Definição das Rotas
│   ├── helpers/           # Funções auxiliares
│   ├── services/          # Serviços e regras de negócio
│   ├── validations/       # Validadores
│   ├── middlewares/       # Middlewares de autenticação e autorização
│   ├── db/                # Configuração do banco MongoDB
│   ├── index.ts           # Arquivo principal da API
│── tests/                 # Testes automatizados
│── .env                   # Variáveis de ambiente
│── tsconfig.json          # Configurações do Typescript
│── .prettierrc.json       # Configurações do Prettier
│── .jest.config.json      # Configurações do Jest
│── .eslint.config.mjs     # Configurações do ESlint
│── nodemon.json           # Configurações do Nodemon
│── package.json           # Dependências e scripts
```
