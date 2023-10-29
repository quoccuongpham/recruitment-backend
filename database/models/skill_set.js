const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('skill_set', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    skill_set_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'skill_set',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "skill_set_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
