# Desafio Full Stackv Amo Promo

## sobre o projeto
Aplicação de serviço Mock airline!
Para o Deploy eu utilizei o Railway e para para o desenvolvimento utilizei o Docker, criei um docker-compose para
orquestrar o Dockerfile do frontend e do backend, fiquem a vontade para startar o projeto via Docker entrando na pasta raiz e usando "docker-compose up --build"
ou pelo "npm start" na pasta frontend e "npm run dev" no backendcaso preferirem.

# [Link para acessar o projeto](https://possessive-distribution-production.up.railway.app/home)

Todas os endpoints da aplicação estão disponiveis na rota thunder-collection_AmoPromo.json.
essas são:
- "/login" para gerar um token de acesso as rotas. (Necessario body contendo email e password);
- "/travel/POA/AAX/2022-06-12" para gerar uma viagem apenas de ida. (Necessario Token);
- "/travel/POA/AAX/2022-06-12/2022-06-15" para gerar uma viagem de ida e volta. (Necessario Token);
- "/airports" pegar os aeroportos no nosso banco de dados. (Necessario Token);
- "/airports/:id/:currStatus" pegar alterar o status do aeroporto. (Necessario Token);

No geral adorei fazer o projeto, pude exercitar muito logica pois sai um pouco da caixa com esse tipo de problema que nunca tive contato antes.

## Pontos que eu melhoraria o meu código
A utilização da POO, creio que pequei um pouco na utilização do total total potencial desse paradigma, eu poderia ter utilizado melhor as eranças e o polimofirsmo criando assim classes menores e mais legiveis.

## Para rodar o projeto em sua máquina
- Clone o repositório com o comando "git clone git@github.com:brenooliveiranascimento/desafio-front.git"
- Navegue até o diretorio criado com o comando "cd desafio-front"
- Navegue até o diretorio frontend com o comando "cd frontend"
- Execute o comando "npm i" ou se preferir utilizar o yarn com "yarn"
- [EXECUÇÃO COM DOCKER] Volte para o diretorio onde possui o docker-compose com "cd .." e execute "docker-compose up"
- [EXECUÇÃO SEM DOCKER] Permaneça no diretorio frontend e execute "npm start"
- [EXECUÇÃO SEM DOCKER] Navegue até backend e execute "npm run dev"
- Por padrão o projeto estará rodando na porta 3000 então acesse a url "http://localhost:3000/" dentro do seu navegador

## [Link para acessar o projeto](https://possessive-distribution-production.up.railway.app/home)

<h2>Tecnologias Utilizadas<h2>
<img src="https://img.shields.io/badge/node.js%20-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white"/> 
<img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white"/>
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
<img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white"/>
<img src="https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/>
<img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge"/>
<img src="https://img.shields.io/badge/html5%20-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white"/>
<img src="https://img.shields.io/badge/css3%20-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white"/>
<img src="https://img.shields.io/badge/git%20-%23F05033.svg?&style=for-the-badge&logo=git&logoColor=white"/> 
  
