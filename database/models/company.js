const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('company', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user_account',
        key: 'id'
      }
    },
    company_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    profile_description: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    establishment_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    company_website_url: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    company_email: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'company',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "company_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
