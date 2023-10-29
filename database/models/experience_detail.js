const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('experience_detail', {
    user_account_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'seeker_profile',
        key: 'user_account_id'
      }
    },
    is_current_job: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      primaryKey: true
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      primaryKey: true
    },
    job_title: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    company_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    job_location_city: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    job_location_state: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    job_location_country: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(4000),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'experience_detail',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "experience_detail_pk",
        unique: true,
        fields: [
          { name: "user_account_id" },
          { name: "start_date" },
          { name: "end_date" },
        ]
      },
    ]
  });
};
