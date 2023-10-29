const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_type', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_type_name: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'user_type',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "user_type_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
