const { response, request } = require('express')
const express = require ('express')
const app = express()
// Id Aleatorio
const uuid = require('uuid')
//Recebe requisições json
app.use(express.json())


let funcionarios = [{ id: uuid.v4(),
    Nome: 'Gabriel Souza',
    Funcao: 'Programador',
    Departamento: 'Tecnologia',
    Email: 'gabrielgsouza95@gmail.com',
    Telefone: '24 992098957'
}]

//Checar se o ID é verdadeiro
const checkID = (request, response, next) =>{
    const { id } = request.params
    const idFuncionario = funcionarios.find( funcionario => funcionario.id === id)
    if (!idFuncionario){
        return response
            .status(400)
            .json({ ERROR: 'O ID fornecido está incorreto. Por verifique a informação'})
    }
    return next()
}

const checkData = (request, response, next) => {
    const {Nome, Funcao, Departamento, Email, Telefone} = request.body
    if (!Nome || !Funcao || !Departamento || !Email || !Telefone){
        return response
            .status(400)
            .json({ error: 'Alguma(s) da(s) informações necessárias não foram fornecidas corretamente'})
    }
    return next()
}


//Listar Funcionários
app.get('/funcionarios', (request, response) => {
    return response
        .status(200)
        .json(funcionarios)
})

//Adicionar Funcionários
app.post('/funcionarios', checkData, (request, response) => {
    const {Nome, Funcao, Depertamento, Email, Telefone} = request.body
    const incluirFuncionario = {
        id: uuid.v4(),
        Nome, 
        Funcao,
        Depertamento,
        Email,
        Telefone
    }
    
    funcionarios = [...funcionarios, incluirFuncionario]
    return response
        .status(200)
        .json(incluirFuncionario)
})

//Listar funcionário pelo ID
app.get('/funcionarios/:id', checkID, (request, response) => {
    const { id } = request.params
    const idFuncionario = funcionarios.filter(indice => indice.id === id)
    return response 
        .status(200)
        .json(idFuncionario)
})

//Deletar o funcionário pelo ID
app.delete('/funcionarios/:id', checkID, (request, response) => {
    const { id } = request.params
    let excluirFuncionario = funcionarios.findIndex(indice => indice.id === id)
    funcionarios.splice(excluirFuncionario, 1)
    return response 
        .status(200)
        .json({error:'Dados do funcionário excluido com sucesso !'})
})


//Alterar dados do funcionário pelo ID
app.put('/funcionarios/:id', checkData, checkID, (request, response) => {
    const { Nome, Funcao, Departamento, Email, Telefone } = request.body
    const { id } = request.params
    let alterarFuncionario = funcionarios.findIndex(funcionario => funcionario.id === id)
    const dadosFuncionario = {
        id, 
        Nome,
        Funcao,
        Departamento,
        Email,
        Telefone
    }
    funcionarios.splice(alterarFuncionario, 1, dadosFuncionario)
    return response
        .status(200)
        .json(dadosFuncionario)
})




//Porta 3333 de comunicação

app.listen(3333, () => {
    console.log('Servidor Rodando!')
})