const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_log', {
    user_acount_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user_account',
        key: 'id'
      }
    },
    last_login_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    last_job_apply_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    save_job: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user_log',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "user_log_pk",
        unique: true,
        fields: [
          { name: "user_acount_id" },
        ]
      },
    ]
  });
};
