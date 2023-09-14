const express = require('express'); //importa o módulo express dentro da constante express

const app = express(); // O express será executado na constante app, app será um objeto de servidor que será usado para fazer várias coisas como, por exemplo ligar o servidor.

// use é utilizado para adicionar algum tipo de função na qual 
// todas as rotas deverão passar por ela
// Neste caso a função é express.json()
// Ela deve vir antes das rotas, logo depois de definir a variável app
// to falando que toda rota precisa passar por essa função use, ou seja, será json o formato que irei trabalhar nesse projeto
app.use(express.json());

const users = []; // não estamos usando banco de dados, toda vez que o servidor reinicia nossa constante é reiniciada também

//criar dados de teste no meu banco array
const userTeste1 = {id: "fe95f11a-ff7e-44cd-96c6-3bf58f737ba2", name: "Maria Pereira", age: "45"}
users.push(userTeste1);

const userTeste2 = {id: "72115b8c-8a46-4272-99e9-cdc4cc4d9069", name: "Fernando Pessoa", age: "22"}
users.push(userTeste2);

const userTeste3 = {id: "68115b8c-8a46-4272-99e9-cdc4cc4d9069", name: "Maria Silva", age: "85"}
users.push(userTeste3);

// rota 1 / teste hello world
// neste caso '/' que é a mesma coisa que localhost:3333
// O segundo parâmetro é uma função que recebe dois parâmetros:
// request -> requisição
// response -> devolve uma resposta para o front-end (todo retorno de uma rota precisa utilizar o response)
// método json -> permite retornar os dados seguindo uma estrutura de JSON
app.get('/', (request, response) => { // O primeiro parâmetro que o método get recebe é o endereço, 
    return response.json({message: 'Hello World'});
})

// rota 2 /users com get retorna a lista de usuarios
app.get('/users', (request, response) => {
    
    const { name } = request.query; // o parâmetro name será passado no endereço da rota e request.query vai pegar o valor passado nele

    // operador ternário js condição ? valor_se_verdadeiro : valor_se_falso;
    //se name for verdadeiro, não for uma string vazia ou nula, a primeira parte é executada, se não a segunda parte
    const results = name ? users.filter(user => user.name.includes(name)) : users;

    return response.json(results); //retorna os usuários filtrados por nome ou todos os usuarios
})

// rota 2 /users com post
// O trecho de código const { name, age } = request.body; é uma forma de desestruturar um objeto JavaScript, especificamente o objeto request.body, para extrair as propriedades name e age desse objeto e atribuí-las a variáveis com o mesmo nome.
// Vamos utilizar aqui o Request Body, 
// pois o cliente enviará estas informações por meio de um formulário, por exemplo.
// resumo, recebo um request http post com um request.body com um formulário com 2 informações name e age, crio um objeto com esses atributos mais id uuid, coloco esse objeto no meu banco que é o array e retorno ele via json para o cliente quiser exibir ou não, só confiar que foi feito
app.post('/users', (request, response) => {
    const { name, age } = request.body; // request.body é um objeto representado pelos dados no corpo da solicitação post http que o cliente enviou

    // Criamos uma const user que será um objeto contendo as propriedades:
    // id (que terá seu valor gerado automaticamente)
    // name -> nome do usuário
    // age -> idade do usuário
    const user = {id: uuid(), name, age }

    // Insere este objeto no array users
    // o array users é o meu banco
    users.push(user);

    return response.json(user); // Retorna o usuário recém criado
})

// rota 3 put users com route param parametro de rota :id para atualizar um usuario do banco com os dados enviados pelo cliente 
app.put('/users/:id', (request, response) => {
    // route params (pega o id passado como parâmetro)
    const {id} = request.params;

    // utiliza o request body para receber os dados atualizados do cliente
    const { name, age } = request.body;

    // percorre o array de usuários (meu banco) e procura a posição(índice) de um usuário que contenha o id igual ao id recebido como parâmetro da rota
    const userIndex = users.findIndex(user => user.id === id);

    //se não encontrar o índice, o retorno de userIndex será -1 (menor que 0) neste caso, retorna uma mensagem de erro
    if(userIndex < 0) {
        // Configura o status para 400, que é um código genérico para erros que podem ocorrer no backend.
        // Se isso não for feito, será retornado automaticamente o status 200, que significa que a requisição foi bem sucedida.
        return response.status(400).json({error: 'Usuário não encontrado'});
    }

    // Se econtrar o índice
    // Pega os dados do usuário atualizado de dentro do body
    const user = {
        id,
        name,
        age
    };

    //substitui o valor armazenado na posição userIndex pelo valor do objeto user
    //atualiza o usuario enviado pelo cliente no meu array de usuários (meu banco)
    users[userIndex] = user;

    // retorna o usuário atualizado
    return response.json(user);
})

// rota 4 delete deletar com route param parametro de rota
app.delete('/users/:id', (request, response) => {
    
    const { id } = request.params; // route params (pega o id passado como parâmetro) pelo cliente na url, assim como feito na rota PUT

    const userIndex = users.findIndex(user => user.id == id); // percorre o array de usuários e procura a posição(índice) de um usuário que contenha  o id igual ao id recebido como parâmetro da rota

    if(userIndex < 0) {
        // Configura o status para 400, que é um código genérico para erros que podem ocorrer no backend.
        // Se isso não for feito, será retornado status 200, que 
        // significa que a requisição foi bem sucedida.
        return response.status(400).json({error: 'Usuário não encontrado'});
    }

    // splice é um método para retirar alguma informação de dentro de um array.
    // Ele recebe como parâmetro o índice que se deseja remover e quantas posições 
    // serão removidas a partir deste índice. 
    // No caso, será removida apenas a informação contida no índice userIndex (1)
    users.splice(userIndex, 1);

    // Retorna apenas uma resposta em branco, pois está fazendo uma remoção.
    // Por ser uma resposta vazia, é recomendado enviá-la com o código de status 204
    return response.status(204).send();
})

app.listen(3333); // liga o servidor, ouve a porta 3333

// Importa a função uuid que vai criar um id único universal
const {uuid} = require('uuidv4');





