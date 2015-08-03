var pg = require('pg')
var u = require('underscore')
var connectionString = process.env.DATABASE_URL || 'postgres://@localhost:5432/test'
//var client = new pg.Client(connectionString)
// select * from horario where codtecnico in (select codigoCadastro from usuario where tipo='gerente');
var horariosDisponiveis = function(date, callback){
	var horarioFuncionamento = u.range(9, 19)
	var stringQueryHorarios = "SELECT * FROM horario WHERE data='"+date+"' and codtecnico in ("
	var stringQueryUsers = "SELECT codigoCadastro FROM usuario WHERE tipo='gerente'"
	pg.connect(connectionString, function(err, client, done){
			client.query(stringQueryUsers, function(err, gerentes){
				stringQueryHorarios += stringQueryUsers + ')'
				client.query(stringQueryHorarios, function(err, horariosOcupados){
					var idTecnicosArray = gerentes.rows.map(function(gerente){
						return gerente.codigocadastro
					})
					var horariosDisponiveis = horarioFuncionamento.map(function(horario){
						if(horario < 10) horario = "0"+horario
						return {
							hora: horario+':00',
							tecnicosDisponiveis: idTecnicosArray
						}
					})
					horariosDisponiveis.forEach(function(horarioDisponivel){
						horariosOcupados.rows.forEach(function(horarioOcupado){
							if(parseInt(horarioDisponivel.hora) == parseInt(horarioOcupado.hora)){
								horarioDisponivel.tecnicosDisponiveis = u.without(horarioDisponivel.tecnicosDisponiveis, 
									horarioOcupado.codtecnico)
							}
						})
					})
					horariosDisponiveis = u.filter(horariosDisponiveis, function(horarioDisponivel){
						return !u.isEmpty(horarioDisponivel.tecnicosDisponiveis)
					})
					if(!err){
						callback(null, horariosDisponiveis)	
					}
					else callback(err)
						done()
					
				})
				done()
			})
		})
}

module.exports = horariosDisponiveis