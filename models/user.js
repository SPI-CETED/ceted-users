"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    id : {
      type: DataTypes.INTEGER(6).UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(70),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    login: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true
    },
    cpf: {
      type: DataTypes.STRING(14),
      allowNull: false,
      unique: true
    },
    birthDay: DataTypes.DATE,
    profile: {
      type:   DataTypes.ENUM,
      values: ['STUDENT', 'TEATCHER', 'COMINITY']
    },
    type: {
      type:   DataTypes.ENUM,
      values: ['SCHOLARSHIP', 'VOLUNTARY', 'SALARIED']
    },
    password: DataTypes.STRING
  }, {
        updatedAt: 'created_on',
        createdAt: 'updated_on',
        tableName: 'user',

        instanceMethods: {
          toJSON: function () {
            var values = this.get();

            delete values.password;
            return values;
          }
        }
  });

  return User;
};
