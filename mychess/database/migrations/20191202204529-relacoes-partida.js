'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
    return queryInterface
			.addConstraint('partidas', ['user_id_1'], {
				type: 'foreign key',
				name: 'partida_user_1_ck',
				references: {
					table: 'usuarios',
					field: 'id'
				},
				onDelete: 'restrict',
				onUpdate: 'restrict'
			})
			.then(() =>
				queryInterface.addConstraint('partidas', ['user_id_2'], {
					type: 'foreign key',
					name: 'partida_user_2_ck',
					references: {
						table: 'usuarios',
						field: 'id'
					},
					onDelete: 'restrict',
					onUpdate: 'restrict'
				})
			)
			.then(() =>
				queryInterface.addConstraint('partidas', ['winner'], {
					type: 'foreign key',
					name: 'partida_winner_ck',
					references: {
						table: 'usuarios',
						field: 'id'
					},
					onDelete: 'restrict',
					onUpdate: 'restrict'
				})
			)
			.catch(err => {
				console.log(err)
				throw err
			})

  },

  down: (queryInterface, Sequelize) => {
    
    return queryInterface
			.removeConstraint('partidas', 'partida_user_1_ck')
			.then(() => queryInterface.removeConstraint('partidas', 'partida_user_2_ck'))
			.then(() => queryInterface.removeConstraint('partidas', 'partida_winner_ck'))
			.catch(err => {
				console.log(err)
        throw err
      })
	
  }
};
