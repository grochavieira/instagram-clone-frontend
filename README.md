<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/grochavieira/instagram-clone-frontend?color=%2304D361&style=flat">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/grochavieira/instagram-clone-frontend?style=flat">
  
  <a href="https://github.com/grochavieira/instagram-clone-frontend/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/grochavieira/instagram-clone-frontend?style=flat">
  </a>
    
   <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen?style=flat">

</p>
<h1 align="center">
    <img src="./.github/logo_frontend.png" />
</h1>

<h4 align="center"> 
	🚧  Aplicação Finalizada! 🚧
</h4>

## 🏁 Tópicos

<p>
 👉<a href="#-sobre-o-projeto" style="text-decoration: none; "> Sobre</a> <br/>
👉<a href="#-funcionalidades" style="text-decoration: none; "> Funcionalidades</a> <br/>
👉<a href="#-layout" style="text-decoration: none"> Layout</a> <br/>
👉<a href="#-como-executar-o-projeto" style="text-decoration: none"> Como executar</a> <br/>
👉<a href="#-tecnologias" style="text-decoration: none"> Tecnologias</a> <br/>
👉<a href="#-autor" style="text-decoration: none"> Autor</a> <br/>
👉<a href="#user-content--licença" style="text-decoration: none"> Licença</a>

</p>

## 💻 Sobre o projeto

Um clone do site do Instagram, na qual você pode logar/registrar, criar novos posts(imagens/videos), seguir outros usuários, ver os posts dos usuários que você segue, comentar e curtir as postagens e receber notificações relacionadas ás suas postagens e quem te segue.

O site pode ser acessado no link abaixo:

<a align="center" href="https://grochavieira-instagram-clone-frontend.vercel.app/">
    <img alt="clone do instagram" src="https://img.shields.io/static/v1?label=site&message=clone-instagram&color=F75F50&style=flat&logo=vercel">
</a>

---

<a name="-funcionalidades"></a>

## ⚙️ Funcionalidades

- [x] Usuário pode se registrar criando uma conta com seu nome, email, nome de usuário, senha e foto de perfil;
- [x] Usuário pode se logar utilizando suas credenciais;
- [x] Usuário pode criar um post e armazenar as imagens no cloudinary;
- [x] Usuário pode seguir outros usuários;
- [x] Usuário pode ver o post de outros usuários (pessoas que o usuário segue);
- [x] Usuário tem um perfil que mostra todas as suas postagens;
- [x] Usuário pode visualizar o perfil de outros usuários;
- [x] Usuário pode ver um feed global de imagens (de acordo com os usuários que ele segue);
- [x] Usuário tem uma página de notificações (sempre que alguém comenta/curte um post seu ou passa a te seguir);
- [x] O feed é atualizado sempre que um novo post é adicionado/deletado (Web Sockets);
- [x] O post é sempre atualizado em tempo real quando alguém curte/comenta (Web Sockets);
- [x] Página de perfil dos usuários é atualizada em tempo real p/ seguidores/seguindo (Web Sockets);
- [x] As notificações (coração) no header do site é atualizado em tempo real (Web Sockets);
- [x] Layout único e responsivo para mobile.

---

## 🎨 Layout

Demonstração do projeto no meu linkedin:

<a align="center" href="https://www.linkedin.com/feed/update/urn:li:activity:6784468288920543232/">
    <img alt="clone do instagram demonstração" src="https://img.shields.io/static/v1?label=post&message=clone-instagram&color=0072B1&style=flat&logo=linkedin">
</a>

---

## 🚀 Como executar o projeto

💡O Frontend precisa que o Backend esteja sendo executado para funcionar, que pode ser acessado **[AQUI](https://github.com/grochavieira/instagram-clone-backend)**.

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), [Yarn](https://classic.yarnpkg.com/en/docs/install).d
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### Váriaveis de Ambiente

> Veja o arquivo [.env.sample](https://github.com/grochavieira/instagram-clone-frontend/blob/master/web/.env.sample)

#### 🧭 Rodando a aplicação web (Frontend)

```bash

# Clone este repositório
$ git clone https://github.com/grochavieira/instagram-clone-frontend.git

# Acesse a pasta do projeto no seu terminal/cmd
$ cd instagram-clone-frontend

# Vá para a pasta da aplicação Front End
$ cd web

# Instale as dependências
$ yarn install

# Execute a aplicação em modo de desenvolvimento
$ yarn start

# A aplicação será aberta na porta:3000 - acesse http://localhost:3000

```

---

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

#### **Website** ([React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/))

- **[react router dom](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom)**
- **[react icons](https://react-icons.github.io/react-icons/)**
- **[axios](https://github.com/axios/axios)**
- **[scss](https://sass-lang.com/)**
- **[react-lottie](https://airbnb.io/lottie/)**
- **[react-loading](https://www.npmjs.com/package/react-loading)**
- **[react-dropzone](https://github.com/react-dropzone/react-dropzone)**
- **[react-timeago](https://www.npmjs.com/package/react-timeago)**
- **[react-toastify](https://www.npmjs.com/package/react-toastify)**
- **[react-video-js-player](https://www.npmjs.com/package/react-video-js-player)**
- **[socket.io-client](https://www.npmjs.com/package/socket.io-client)**

> Veja o arquivo [package.json](https://github.com/grochavieira/instagram-clone-frontend/blob/master/web/package.json)

#### **Utilitários**

- Editor: **[Visual Studio Code](https://code.visualstudio.com/)**
- Teste de API: **[Insomnia](https://insomnia.rest/)**
- Ícones: **[Feather Icons](https://feathericons.com/)**
- Fontes: **[Grand Hotel](https://fonts.google.com/specimen/GrandHotel)**

---

<a name="-autor"></a>

## 🦸‍♂️ **Autor**

<p>
 <img src="https://avatars.githubusercontent.com/u/48029638?s=460&u=40540691957b5aabf04e2e1d4cddf8d3633cb1be&v=4" width="150px;" alt="grochavieira"/>
 <br />
 <sub><strong>🌟 Guilherme Rocha Vieira 🌟</strong></sub>
</p>

<p align="center">

[![Linkedin Badge](https://img.shields.io/badge/-linkedin-blue?style=flat&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/grochavieira/)](https://www.linkedin.com/in/grochavieira/)

</p>

---

## 📝 Licença

Este projeto esta sobe a licença [MIT](./LICENSE).

Feito com :satisfied: por Guilherme Rocha Vieira 👋🏽 [Entre em contato!](https://www.linkedin.com/in/grochavieira/)

---
