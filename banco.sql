CREATE TABLE usuario(
 id SERIAL PRIMARY KEY,
 email VARCHAR(255),
 senha VARCHAR(255)	
);

CREATE TABLE produto(
 id SERIAL PRIMARY KEY,
 nome_produto VARCHAR(255),
 especificacoes VARCHAR(255),
 tamanho VARCHAR(255),
 peso VARCHAR(255),
 quantidade int,
 minimo_estoque INT
);

CREATE TABLE emprestimo(
 id SERIAL PRIMARY KEY,
 data_emprestimo TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 id_usuario INT REFERENCES usuario(id) ON DELETE CASCADE,
 id_produto INT REFERENCES produto(id) ON DELETE CASCADE
);