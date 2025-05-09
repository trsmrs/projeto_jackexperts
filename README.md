# Project_JackExperts_

## Descrição

Este projeto é uma aplicação web composta por um frontend em React e um backend em Node.js. O frontend utiliza Material-UI para a interface do usuário, e o backend fornece uma API RESTful para gerenciamento de tarefas.

## Requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- **Node.js** (v14 ou superior)
- **npm** ou **yarn**
- **Git**

## Configuração do Backend e FrontEnd

### 1. Clonar o Repositório do Projeto

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


## Considerações
O back end usei bibliotecas para criptografia de senha, e um middleware de autenticação do JWT como exigido na descrição do desafio.
O Front end eu decidi usar a estilização pelo MaterialUI, mas também usei um pouco de module.css para algumas coisas mais especificas.
Fiz um sistema de escolher entre tema dark ou light.
A autenticação do token fica salvo por 7 dias depois expira, fazendo o usuário logado ser redirecionado para a página de login e ter que logar novamente.
Também contém um sistema de rotas protegidas, onde só pode acessar a aplicação se o usuário estiver mesmo logado.

# Imagens da Aplicação

### Tela de login com thema Light
![](https://github.com/trsmrs/projeto_jackexperts/blob/main/imgs/login_thema_light.png)


### Tela de login com thema Dark
![](https://github.com/trsmrs/projeto_jackexperts/blob/main/imgs/login_thema_dark.png)


### Tela de Registro
![](https://github.com/trsmrs/projeto_jackexperts/blob/main/imgs/registro.png)


### Tela de Tarefas
![](https://github.com/trsmrs/projeto_jackexperts/blob/main/imgs/tasks.png)


### Tela de edição de Tarefas
![](https://github.com/trsmrs/projeto_jackexperts/blob/main/imgs/edit_task.png)


### Tela de excluir Tarefas
![](https://github.com/trsmrs/projeto_jackexperts/blob/main/imgs/delet_task.png)



