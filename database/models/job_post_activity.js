const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('job_post_activity', {
    user_account_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user_account',
        key: 'id'
      }
    },
    job_post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'job_post',
        key: 'id'
      }
    },
    apply_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    is_accept: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'job_post_activity',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "job_post_activity_pk",
        unique: true,
        fields: [
          { name: "user_account_id" },
          { name: "job_post_id" },
        ]
      },
    ]
  });
};
