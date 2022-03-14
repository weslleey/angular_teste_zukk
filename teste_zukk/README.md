<h1 align="center">Teste Zukk - Cadastro de Clientes</h1>

>*Teste Zukk - Cadastro de Clientes é uma plicação web,
que tem como objetivo realizar o cadastro, alteração e exclusão de clientes.<br>
Utilizando Angular e Typescript.

**Indice**<br>

[Inicialização](#Inicialização)<br>
[Escopo](#escopo)<br>
[Recursos de desenvolvimento](#recursos)<br>


*******
<div id='Inicialização'/>

## Start

1. *Vá até o local no seu computador onde está localizado a pasta do projeto,*
2. *Click com o botão direito abrir com o VSCODE,
3. *Segure as teclas Alt+J para abrir o terminal, percorra até a raiz do projeto.
4. *Npm install para instalar a dependencias*.
5. *ng serve para rodar como produção, após ter gerado o build.


<div id='escopo'/>

*******

<div id='recursos'/>

## Recursos de Desenvolvimento

*[Angular](https://angular.io/start) Angular is a development platform, built on TypeScript.<br>
[Typescript](https://www.typescriptlang.org/) Superset do Javascript responsavél pela tipagem<br>
[Npm](https://docs.npmjs.com/getting-started) or
[VSCODE](https://code.visualstudio.com/)*

*******

## Funcionamento do login

<p align="center">
  <img width="300" height="300" src="https://i.imgur.com/Ca8x4u8.png">
</p>

Ao realizar o login (inserindo os dados: "Admin" como login e "1234" como senha) Irá acessar a tela de clientes<br>

1. Irá registrar no backend o token do usuário Admin.
2. Caso a senha ou usuário estejam incorretos exibira um alerta na tela.



## Funcionamento da tela de clientes

<p align="center">
  <img width="1145" height="612" src="https://i.imgur.com/waFyOcG.png">
</p>

1. Terá 10 minutos apra realizar as ações antes do token expirar, ai deverá fazer login novamente.
2. Para pesquisar o usuário deve saber o ID do cliente.
3. Para excluir ou alterar, deve-se pesquisar o ID do cliente primeiro.
4. Para cadastrar todos os campos deve sesr preenchidos, salvo campo de pesquisa.
5. Todos os cadastros serão exibidos em uam tabela abaixo do forumlário.
6. O botão limpar, limpa somente os campos bloqueados.
7. Não foram realizadas validações dos campos de forma visual.


