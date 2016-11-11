"use strict";

module.exports = function (sequilize, DataTypes) {
    var Hability = sequilize.define("Hability", {
        id: {
            type: DataTypes.INTEGER(6).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        description : {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        deleted : DataTypes.BOOLEAN,
    }, {
        updatedAt: 'created_on',
        createdAt: 'updated_on',
        tableName: 'hability',
        classMethods: {
            associate: function(models) {
                models.Hability.belongsToMany(models.User, { through: 'HabilityUser', foreignKey: 'idUser' });
            }
        },
    });

    return Hability;
};