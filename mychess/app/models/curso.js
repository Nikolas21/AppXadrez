'use strict';
module.exports = (sequelize, DataTypes) => {
  const curso = sequelize.define('curso', {
    sigla: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 6],
          msg: 'A sigla deve ter entre 3 e 6 caracteres'
        }
      }
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5, 50],
          msg: 'O nome deve ter entre 5 e 50 caracteres'
        }
      }
    },
    descricao: DataTypes.TEXT,
    area_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Você deve selecionar uma área'
        }
      }
    }
  }, {
    underscored: true,
  });
  curso.associate = function(models) {
    curso.belongsTo(models.area,{
      foreignKey: 'area_id'
    });
    curso.hasMany(models.usuario);
  };
  return curso;
};
