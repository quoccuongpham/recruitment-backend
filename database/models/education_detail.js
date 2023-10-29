const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('education_detail', {
    user_account_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'seeker_profile',
        key: 'user_account_id'
      }
    },
    cetificate_degree_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    major: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    institute_university_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    starting_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    completion_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    percentage: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cgpa: {
      type: DataTypes.DOUBLE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'education_detail',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "education_detail_pk",
        unique: true,
        fields: [
          { name: "user_account_id" },
          { name: "cetificate_degree_name" },
          { name: "major" },
        ]
      },
    ]
  });
};
