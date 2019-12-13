'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
    return queryInterface.addConstraint('cursos', ['area_id'], {
      type: 'foreign key',
      name: 'curso_id_area_fk',
      references: {
      table: 'areas',
      field: 'id'
      },
      onDelete: 'restrict',
      onUpdate: 'restrict'
      })
   
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    
    return queryInterface.removeConstraint(
      'cursos',
      'curso_id_area_fk'
    );
    
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
