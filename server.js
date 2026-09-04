import Fastify from 'fastify'
import { Pool } from 'pg'
import cors from '@fastify/cors'

const sql = new Pool({
    user: "postgres",
    password: "senai",
    host: "localhost",
    port: 5432,
    database: "revisao_saep"
})

const server = Fastify()

server.register(cors, {
    origin: '*',
    methods: ['GET', 'PUT', 'POST','DELETE']
})

server.get('/usuarios', async (request, reply)=>{
    const resultado = await sql.query('SELECT * FROM usuario')
        return resultado.rows
})

server.post('/usuarios', async ()=>{
    const { email, senha} = request.body;
    
    if(!email || !senha ){
        return reply.status(400).send({
            error: "email e senha devem ser preenchidos"
        })
    }

    await sql.query(`INSERT INTO usuario(nome, email) VALUES ($1, $2)`,
        [email, senha]
    )
    return reply.status(201).send({
        mensagem:"usuario criado com sucesso"
    })
})

server.get('/produtos', async ( )=>{
    const resultado = await sql.query('SELECT * FROM produto')
        return resultado.rows
})

server.post('/produtos', async ()=>{
    const {nome_produto, especificacoes, tamanho, peso, quantidade, minimo_estoque} = request.body;

    if(!nome_produto  || !especificacoes || !tamanho || !peso || !quantidade || !minimo_estoque){
        return reply.status(401).send({
            error:' todos os campos devem estar preenchidos: nome_produto, especificacoes, tamanho, peso, quantidade, minimo_estoque'
        })
    }
    await sql.query('INSERT INTO produto(nome_produto, especificacoes, tamanho, peso, quantidade, minimo_estoque) VALUES($1, $2, $3, $4, $5, $6)'
        [nome_produto, especificacoes, tamanho, peso, quantidade, minimo_estoque]
    )
        return reply.status(200).send({
            mensagem:'Produto cadastrado com sucesso'
        })

})

server.get('/emprestimos', async ()=>{
    const resultado = await sql.query('SELECT * FROM produto')
        return resultado.rows
})

server.post('/emprestimos', async ()=>{
    const {id_usuario, id_produto} = request.body;

    if(!id_usuario || !id_produto){
        return reply.status(401).send({
            error:' todos os campos devem estar preenchidos: id_usuario, id_produto'
        })
    }

    await sql.query('INSERT INTO emprestimo(id_usuario, id_produto) VALUES($1, $2)'
        [id_usuario, id_produto]
    )
    return reply.status(200).send({
        mensagem:'Emprestimo cadastrado com sucesso'
    })

})



server.listen({
    port: 3000
})