const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('job_location', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    street_address: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    state: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    country: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    zip: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'job_location',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "job_location_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
