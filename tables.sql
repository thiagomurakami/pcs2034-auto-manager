CREATE 	TABLE usuario(
	codigoCadastro	SERIAL 			PRIMARY KEY,
	email 			VARCHAR(100)	NOT NULL,
	senha 			VARCHAR(40)		NOT NULL,
	nome			VARCHAR(40) 	NOT NULL,
	sobrenome		VARCHAR(40) 	NOT NULL,
	CPF 			VARCHAR(40)		NOT NULL,
	estado			VARCHAR(40) 	NOT NULL,
	cidade			VARCHAR(40) 	NOT NULL,
	cep				VARCHAR(40)		NOT NULL,
	rua				VARCHAR(100)	NOT NULL,
	numeroRua		INTEGER			NOT NULL,
	complemento		VARCHAR(40)				,
	telefone		VARCHAR(40) 	NOT NULL,
	bairro			VARCHAR(40) 	NOT NULL,
	tipo 			VARCHAR(40) 	NOT NULL,
	especialidade 	VARCHAR(40)
);

CREATE TABLE tipoServico(
	id 				SERIAL 		PRIMARY KEY , 
	nome 			VARCHAR(40) NOT NULL, 
	preco 			MONEY 		NOT NULL
);

CREATE TABLE peca(
	idPeca 				SERIAL 		PRIMARY KEY,
	nome 			VARCHAR(40) NOT NULL,
	marca 			VARCHAR(40) NOT NULL,
	preco 			MONEY 		NOT NULL,
	quantidade 		INTEGER 	NOT NULL,
	descricao 		TEXT
);

-- CREATE TABLE peca(
-- 	codigoBarras 	VARCHAR(40) PRIMARY KEY,
-- 	numeroSerial 	VARCHAR(40) NOT NULL,
-- 	idTipoPeca 		INTEGER 	REFERENCES tipoPeca(id)
-- );

CREATE TABLE veiculo(
	placa 			VARCHAR(10) PRIMARY KEY,
	renavam 		VARCHAR(20),
	fabricante 		VARCHAR(40),
	modelo 			VARCHAR(40),
	ano 			INTEGER,
	dono			INTEGER REFERENCES usuario(codigoCadastro) NOT NULL
);


CREATE TABLE equipe(
	id 				SERIAL 		PRIMARY KEY,
	especialidade	VARCHAR(40) NOT NULL
);

CREATE TABLE equipeTecnico(
	idEquipe		INTEGER REFERENCES equipe(id) NOT NULL,
	codTecnico 		INTEGER REFERENCES usuario(codigoCadastro) NOT NULL,
	PRIMARY KEY		(idEquipe, codTecnico)
);

CREATE TABLE ordemServico(
	id 				SERIAL PRIMARY KEY,
	placaVeiculo 	VARCHAR(10) REFERENCES veiculo(placa) 	NOT NULL,
	idEquipe 		INTEGER REFERENCES equipe(id) NOT NULL,
	status 			VARCHAR(40) NOT NULL,
	dataEmissao		DATE NOT NULL,
	dataConclusao	DATE NOT NULL,
	valor			MONEY,
	descricao		TEXT
);

CREATE TABLE horario(
	data 		DATE,
	hora 		TIME,
	codTecnico 	INTEGER REFERENCES usuario(codigoCadastro) NOT NULL,
	idOS 		INTEGER REFERENCES ordemServico(id),
	PRIMARY KEY(data, hora)
);

CREATE TABLE horarioCliente(
	data 		DATE,
	hora 		TIME,
	FOREIGN KEY (data, hora) REFERENCES horario(data, hora),
	idCliente 	INTEGER REFERENCES usuario(codigoCadastro),
	PRIMARY KEY (data, hora, idCliente)
);

CREATE TABLE OSPeca(
	idOS 		INTEGER REFERENCES ordemServico(id),
	idPeca 		INTEGER REFERENCES peca(idPeca),
	PRIMARY KEY (idOS, idPeca)
);

CREATE TABLE OSServico(
	idOS 		INTEGER REFERENCES ordemServico(id),
	idServico	INTEGER REFERENCES tipoServico(id),
	PRIMARY KEY (idOS, idServico)
);

-- INSERT INTO tipoServico(nome, preco) values('Revisao Anual', 500.50);