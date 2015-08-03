INSERT INTO tipoServico(nome, preco) 
VALUES('Revisao 10 mil km', 149.99);

INSERT INTO tipoServico(nome, preco) 
VALUES('Revisao 20 mil km', 199.99);

INSERT INTO tipoServico(nome, preco) 
VALUES('Revisao 30 mil km', 249.99);

INSERT INTO peca(nome, marca, preco, quantidade) 
VALUES('Oleo','Max Oleo', 249.99, 35);

INSERT INTO peca(nome, marca, preco, quantidade) 
VALUES('Bomba de gasolina', 'Pump it up',249.99, 5);

INSERT INTO peca(nome, marca, preco, quantidade) 
VALUES('Correia dentada', 'They see me rolling', 249.99, 63);

-- INSERT INTO peca(codigoBarras, numeroSerial, idTipoPeca) 
-- VALUES ('123','456',);

-- INSERT INTO peca(codigoBarras, numeroSerial, idTipoPeca) 
-- VALUES ('456','123',);

-- INSERT INTO peca(codigoBarras, numeroSerial, idTipoPeca) 
-- VALUES ('789','543',);

INSERT INTO veiculo(placa, renavam, fabricante, modelo, ano, dono) 
VALUES('DVM-5464', '123', 'Chevrolet', 'Celta', 2007, 3);

INSERT INTO veiculo(placa, renavam, fabricante, modelo, ano, dono) 
VALUES('FHK-8423', '456', 'Honda', 'Fit', 2014, 4);

INSERT INTO equipe(especialidade)
VALUES('troca de oleo');

INSERT INTO equipeTecnico(idEquipe, codTecnico)
VALUES(1, 1);

INSERT INTO equipeTecnico(idEquipe, codTecnico)
VALUES(1, 2);

INSERT INTO ordemServico(placaVeiculo, idEquipe, status, dataEmissao, dataConclusao)
VALUES('DVM-5464', 1, 'Em andamento', '24/07/2015', '26/07/2015');

INSERT INTO ordemServico(placaVeiculo, idEquipe, status, dataEmissao, dataConclusao)
VALUES('FHK-8423', 1, 'Concluida', '22/07/2015', '23/07/2015');

INSERT INTO horario(data, hora, codTecnico) 
VALUES ('2015-07-27', '15:00', 5);

INSERT INTO horario(data, hora, codTecnico) 
VALUES ('2015-08-04', '09:00', 6);

INSERT INTO horario(data, hora, codTecnico) 
VALUES ('2015-07-27', '10:00', 6);

INSERT INTO horario(data, hora, codTecnico) 
VALUES ('2015-07-27', '10:00', 5);

INSERT INTO horario(data, hora, codTecnico, idOS)
VALUES();

INSERT INTO horario(data, hora, codTecnico, idOS)
VALUES();

INSERT INTO horarioCliente(data, hora, idCliente)
VALUES();

INSERT INTO OSPeca(idOS, idPeca)
VALUES();

INSERT INTO OSPeca(idOS, idPeca)
VALUES();

INSERT INTO OSPeca(idOS, idPeca)
VALUES();

INSERT INTO OSPeca(idOS, idPeca)
VALUES();

INSERT INTO OSServico(idOS, idServico)
VALUES();

INSERT INTO OSServico(idOS, idServico)
VALUES();

INSERT INTO OSServico(idOS, idServico)
VALUES();

INSERT INTO OSServico(idOS, idServico)
VALUES();