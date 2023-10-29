const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_account', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user_type',
        key: 'id'
      }
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    gender: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "M"
    },
    is_active: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "Y"
    },
    contact_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_image: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    registration_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'user_account',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "user_account_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
