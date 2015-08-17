CREATE 	TABLE usuario(
	codigoCadastro	SERIAL 			PRIMARY KEY,
	email 			VARCHAR(100)	NOT NULL UNIQUE,
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
	idPeca 			SERIAL 		PRIMARY KEY,
	nome 			VARCHAR(40)		NOT NULL,
	marca 			VARCHAR(40) 	NOT NULL,
	preco 			MONEY 			NOT NULL,
	quantidade 		INTEGER 		NOT NULL,
	descricao 		TEXT
);


CREATE TABLE veiculo(
	placa 			VARCHAR(10) PRIMARY KEY,
	renavam 		VARCHAR(20),
	fabricante 		VARCHAR(40),
	modelo 			VARCHAR(40),
	ano 			INTEGER,
	dono			INTEGER REFERENCES usuario(codigoCadastro) NOT NULL
);

CREATE TABLE horarioCliente(
	data 			DATE,
	hora 			TIME,
	codGerente 		INTEGER REFERENCES usuario(codigoCadastro),
	idCliente 		INTEGER REFERENCES usuario(codigoCadastro),
	placaVeiculo 	VARCHAR(10) REFERENCES veiculo(placa) ON DELETE CASCADE,
	PRIMARY KEY (data, hora, idCliente, codGerente, placaVeiculo)
);

CREATE TABLE equipeTecnico(
	idEquipe		 SERIAL PRIMARY KEY,
	codTecnico1		 INTEGER REFERENCES usuario(codigoCadastro) NOT NULL,
	codTecnico2		 INTEGER REFERENCES usuario(codigoCadastro) NOT NULL,
	especialidade 	 VARCHAR(40)
);

CREATE TABLE ordemServico(
	id 				 SERIAL PRIMARY KEY,
	placaVeiculo 	 VARCHAR(10) REFERENCES veiculo(placa) 	NOT NULL,
	idEquipe 		 INTEGER REFERENCES equipeTecnico(idEquipe) NOT NULL,
	status 			 VARCHAR(40) NOT NULL,
	dataPrevisao 	 DATE NOT NULL,
	dataEmissao		 DATE NOT NULL,
	dataConclusao	 DATE,
	valor			 MONEY,
	descricao		 TEXT
);

CREATE TABLE horarioOS(
	data 		 DATE,
	hora 		 TIME,
	codEquipe 	 INTEGER REFERENCES equipeTecnico(idEquipe),
	idOS 		 INTEGER REFERENCES ordemServico(id) NOT NULL,
	PRIMARY KEY (data, hora, codEquipe)
);


CREATE TABLE OSPeca(
	idOS 		 INTEGER REFERENCES ordemServico(id),
	idPeca 		 INTEGER REFERENCES peca(idPeca),
	quantidade 	 INTEGER NOT NULL,
	PRIMARY KEY (idOS, idPeca)
);

CREATE TABLE OSServico(
	idOS 		 INTEGER REFERENCES ordemServico(id),
	idServico	 INTEGER REFERENCES tipoServico(id),
	PRIMARY KEY  (idOS, idServico)
);
