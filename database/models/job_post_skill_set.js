const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('job_post_skill_set', {
    skill_set_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'skill_set',
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
    skill_level: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'job_post_skill_set',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "job_post_skill_set_pk",
        unique: true,
        fields: [
          { name: "skill_set_id" },
          { name: "job_post_id" },
        ]
      },
    ]
  });
};
