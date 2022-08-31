# <h1 align="center"> 🧾🏬 Store Manager 🛍️🛒 </h1>

![image](https://user-images.githubusercontent.com/98190806/187788909-53554fc1-248c-4af3-afba-eaa4d954049a.png)

## Descrição:

<p text-align="justify">O projeto Store Manager, desenvolvido no módulo de Back-end da Trybe, é uma API RESTful que simula um sistema de gerenciamento de vendas no formato dropshipping, onde é possível criar, ler, deletar e atualizar (CRUD) produtos e vendas. A API foi desenvolvida com a arquitetura de software MSC (Model-Service-Controller), através de TDD (Test Driven Development).</p>

## Processo e ferramentas de desenvolvimento:

<div align="left">
<img src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/mocha/mocha-plain.svg" height="45" alt="Mocha_logo"  />
<img src="https://opencollective-production.s3-us-west-1.amazonaws.com/76dc6780-9bb2-11e8-927c-71f29759abab.png" height="40" alt="Chai logo"  />
<img src="https://sinonjs.org/assets/images/logo.png" height="45" alt="Sinon_logo"  />

Para TDD (Desenvolvimento Orientado a Testes), o teste de cada camada da arquitetura MSC foi desenvolvidos utilizando **Mocha**, **Chai** e **Sinon**. A cada funcionalidade CRUD implementada, foram seguidos os seguintes passos de desenvolvimento:

- Primeiro o **Model** , que é responsável pela manipulação dos dados e ligação com o banco de dados. Foram escritos os testes da camada Model, os testes falharam, a camada foi Model foi implementada, então os testes passaram;

- Segunda camada foi **Service**, responsável pela aplicação das regras de negócio e a ligação entre o Model e o Controller. O Service foi testado e todos os testes falharam; a camada foi construída e então os testes passaram;

- Onde era cabível, foram incluídos **Middlewares** de validação para os dados da requisição. Os Middlewares passaram pelo mesmo processo, foi testado e todos os testes falharam; então foi implementado e os testes passaram;

- Por último foi implementada a camada **Controller**, que é responsável pelo contato direto com o Cliente. Os testes foram escritos, falharam; o Controller foi construído e os testes passados.

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" height="50" alt="Docker_logo"  />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" height="45" alt="NodeJs_logo"  />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" height="45" alt="Express_logo"  />
<img src="https://seeklogo.com/images/P/postman-logo-F43375A2EB-seeklogo.com.png" height="45" alt="Postman_logo"  />
<img src="https://seeklogo.com/images/S/swagger-logo-A49F73BAF4-seeklogo.com.png" height="45" alt="Swagger_logo"  />

O projeto foi executado em um ambiente isolado, utilizando **Docker**; a execução de códigos JavaScript fora do browser foi feita com **Node.js**; as requisições com diferentes verbos HTTP e diferentes endpoints foram estruturadas com o **Express**. A verificação das solicitações HTTP e leitura de suas respostas foi feita utilizando **Postman**; enquanto a construção da documentação da API foi feita com o **Swagger**.
</div>

## Consultando a documentação por meio do **Postman**:

Clique e escolha entre **Fork collection** ou **View collection**

[![Run in Postman](https://run.pstmn.io/button.svg)](https://god.gw.postman.com/run-collection/22527230-b2a8b769-ea7f-4781-aea9-3bdb07dccf5b?action=collection%2Ffork&collection-url=entityId%3D22527230-b2a8b769-ea7f-4781-aea9-3bdb07dccf5b%26entityType%3Dcollection%26workspaceId%3D96ac246a-1dbc-4ade-b163-f9434c83ec74)

## Rodando o projeto na sua máquina:

1. Escolha um diretório e clone o repositório utilizando **git clone**:
```
  git clone git@github.com:AirelRibeiro/store-manager.git
```

2. Acesse o diretório do projeto **store-manager** e instale as dependências:
```
  cd store-manager
  npm install
```

3. Então rode **npm start** para iniciar a aplicação:
```
  npm start
```

4. Por fim, acesse o projeto via navegador, usando a seguinte url:
```
  http://localhost:3000
```

5. Para acessar a documentação da API, vá para o endpoint **/docs**:
```
  http://localhost:3000/docs
```
