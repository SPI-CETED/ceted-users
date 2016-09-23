"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    id : {
      type: DataTypes.INTEGER(6).UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    email: DataTypes.STRING,
    userName: {
      type: DataTypes.STRING,
      field: 'user_name'
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
