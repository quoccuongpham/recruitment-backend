const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('seeker_skill_set', {
    user_account_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'seeker_profile',
        key: 'user_account_id'
      },
      unique: "seeker_skill_set_user_account_id_key"
    },
    skill_set_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'skill_set',
        key: 'id'
      }
    },
    skill_level: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'seeker_skill_set',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "seeker_skill_set_pk",
        unique: true,
        fields: [
          { name: "user_account_id" },
          { name: "skill_set_id" },
        ]
      },
      {
        name: "seeker_skill_set_user_account_id_key",
        unique: true,
        fields: [
          { name: "user_account_id" },
        ]
      },
    ]
  });
};
