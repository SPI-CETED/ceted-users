"use strict";

module.exports = function(sequelize, DataTypes) {
  var Technology = sequelize.define("Technology", {
    id : {
      type: DataTypes.INTEGER(6).UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    description: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    idUser: {
      type: DataTypes.INTEGER(6),
      allowNull: false,
      unique: true
    },
    idProject: {
      type: DataTypes.INTEGER(6),
      allowNull: false,
      unique: true
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }
, {    updatedAt: 'created_on',
       createdAt: 'updated_on',
       tableName: 'technology',
       
       classMethods: {
          associate: function(models) {
              models.Technology.belongsToMany(models.User,  {through: 'UserTechnology'})
          }
        },
            
    });

  return Technology;
};
