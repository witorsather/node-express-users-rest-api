# API Node.js com Express - CRUD de Usuários

Este é um projeto de uma API Node.js com Express que realiza operações CRUD (Create, Read, Update, Delete) de usuários.

## Imagens do Insomnia

Aqui estão imagens do Insomnia demonstrando as operações CRUD da API:

1. **Criar Usuário (POST)**

   ![Create User](/readme_images/insomnia-create.png)

2. **Atualizar Usuário (PUT)**

   ![Update User](/readme_images/insomnia-update.png)

3. **Listar Usuários (GET)**

   ![List Users](/readme_images/insomnia-list.png)

4. **Listar Usuários (GET) com Query Param**

   ![List Users](/readme_images/insomnia-list-query-param.png)

5. **Excluir Usuário (DELETE)**

   ![Delete User](/readme_images/insomnia-delete.png)

## Como Executar

Para executar este projeto, siga os passos abaixo:

1. Clone o repositório:
git clone https://github.com/seu-usuario/nome-do-repo.git

2. Instale as dependências:
cd nome-do-repo
yarn install

3. Inicie o servidor:
yarn dev

Agora você pode acessar a API localmente em `http://localhost:3333`.

## Rotas da API

- `POST /users`: Cria um novo usuário.
- `GET /users`: Lista todos os usuários.
- `GET /users/:id`: Obtém um usuário por ID.
- `PUT /users/:id`: Atualiza um usuário por ID.
- `DELETE /users/:id`: Exclui um usuário por ID.

## Testes no Insomnia

Você pode testar as rotas da API utilizando o Insomnia. O arquivo de configuração do Insomnia para esses testes está disponível no diretório `insomnia_test`. Você pode importar esse arquivo no Insomnia para começar a testar a API imediatamente. O arquivo é chamado `node-express-users-rest-api_Insomnia.json`.