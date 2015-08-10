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

INSERT INTO equipeTecnico(codTecnico1, codTecnico2, especialidade)
VALUES(1, 2, 'Revisao');

INSERT INTO ordemServico(placaVeiculo, idEquipe, status, dataEmissao, dataPrevisao, valor)
VALUES('ABC-1234', 1, 'Pendente', '2015-08-11', '2015-08-20', 300);

INSERT INTO ordemServico(placaVeiculo, idEquipe, status, dataEmissao, dataPrevisao, valor)
VALUES('ABC-1235', 1, 'Concluida', '2015-08-11', '2015-08-20', 150);

INSERT INTO horarioCliente(data, hora, codGerente, idCliente, placaVeiculo) 
VALUES ('2015-07-27', '15:00', 5, 3, 'ABC-1234');

INSERT INTO horarioCliente(data, hora, codGerente, idCliente, placaVeiculo) 
VALUES ('2015-08-04', '09:00', 6, 4, 'ABC-1235');

INSERT INTO horarioCliente(data, hora, codGerente, idCliente, placaVeiculo) 
VALUES ('2015-08-06', '10:00', 6, 4, 'ABC-1235');

INSERT INTO horarioCliente(data, hora, codGerente, idCliente, placaVeiculo) 
VALUES ('2015-08-06', '10:00', 5, 3, 'ABC-1234');

INSERT INTO OSPeca(idOS, idPeca, quantidade)
VALUES(1, 4, 4);

INSERT INTO OSPeca(idOS, idPeca, quantidade)
VALUES(2, 1, 1);

INSERT INTO OSServico(idOS, idServico)
VALUES(1, 1);

INSERT INTO OSServico(idOS, idServico)
VALUES(2, 1);

INSERT INTO horarioOS(data, hora, codEquipe, idOs)
VALUES('2015-08-11', '15:00', 1, 1);

INSERT INTO horarioOS(data, hora, codEquipe, idOs)
VALUES('2015-08-11', '18:00', 1, 2);