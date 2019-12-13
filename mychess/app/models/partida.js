'use strict';
module.exports = (sequelize, DataTypes) => {
  const partida = sequelize.define('partida', {
    user_id_1: DataTypes.INTEGER,
    user_id_2: DataTypes.INTEGER,
    winner: DataTypes.INTEGER,
    fen: DataTypes.STRING
  }, {
    underscored: true,
  });
  partida.associate = function(models) {
    partida.belongsTo(models.usuario, {as:'user1',foreignKey: 'user_id_1' });
    partida.belongsTo(models.usuario, {as:'user2',foreignKey: 'user_id_2' });
    // partida.belongsTo(models.usuario, {as:'winner',foreignKey: 'winner' });
    // partida.hasMany(models.mensagem);
  };
  return partida;
};