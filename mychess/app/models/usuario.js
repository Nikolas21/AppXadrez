'use strict';
module.exports = (sequelize, DataTypes) => {
  const usuario = sequelize.define('usuario', {
    
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: 'Email inválido'
        }
      },
      unique: {
        args: true,
        msg: 'O email ja existe'
      }
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Você deve digitar uma senha'
        }
      }
    },
    curso_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Você deve selecionar um curso'
        }
      }
    }
  }, {
    underscored: true,
  });
  usuario.associate = function(models) {
    usuario.belongsTo(models.curso);
    usuario.hasMany(models.partida,{foreignKey: 'user_id_1'});
    usuario.hasMany(models.partida,{foreignKey: 'user_id_2'});
    // usuario.hasMany(models.partida,{foreignKey: 'winner'});
  };
  return usuario;
};