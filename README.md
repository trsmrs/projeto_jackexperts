# Project_JackExperts_

## Descrição

Este projeto é uma aplicação web composta por um frontend em React e um backend em Node.js. O frontend utiliza Material-UI para a interface do usuário, e o backend fornece uma API RESTful para gerenciamento de tarefas.

## Requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- **Node.js** (v14 ou superior)
- **npm** ou **yarn**
- **Git**

## Configuração do Backend e FrontEnd

### 1. Clonar o Repositório do Backend

Primeiro, clone o repositório do projeto para sua máquina local:

```bash
   git clone git@github.com:trsmrs/projeto_jackexperts.git
```
Agora vá até a pasta do backend pelo terminal e execute o comando npm install.

Crie um arquivo .env na raiz do projeto e coloque as váriaveis de ambiente
```bash
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=nome_do_banco
JWT_SECRET=sua_chave_secreta
```
Após a instalação das dependências execute o comando nodemon src/server.js


## FrontEnd

## Descrição 
Esta aplicação consiste em um gerênciador de tarefas com criação de usuários e login por autenticação.

## Configuração do FrontEnd
Crie um arquivo .env na raiz do projeto e coloque as váriaveis de ambiente
```bash
   REACT_APP_API_URL=http://localhost:5000/api
```
baixe as dependências com o comando npm install, e execute o comando npm run start para rodar o projeto..


##Considerações


