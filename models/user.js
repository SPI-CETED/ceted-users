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
    cpf: {
      type: DataTypes.STRING(14),
      allowNull: false,
      unique: true
    },
    registry: {
      type: DataTypes.INTEGER(12),
      allowNull:  true
    },
    birthDay: DataTypes.DATE,
    profile: {
      type:   DataTypes.ENUM,
      values: ['STUDENT', 'TEATCHER', 'COMUNITY']
    },
    type: {
      type:   DataTypes.ENUM,
      values: ['SCHOLARSHIP', 'VOLUNTARY', 'SALARIED']
    },
    lastVisitDate: DataTypes.DATE,
    password: DataTypes.STRING,
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
        updatedAt: 'created_on',
        createdAt: 'updated_on',
        tableName: 'user',
        classMethods: {
            associate: function(models) {
                models.User.hasOne(models.User, { as: 'createdBy', foreignKey: 'created_By'})
                models.User.belongsToMany(models.Hability, { through: 'HabilityUser', foreignKey: 'idHability' });
            }
        },
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
