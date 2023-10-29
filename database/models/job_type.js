const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('job_type', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    job_type: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'job_type',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "job_type_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
