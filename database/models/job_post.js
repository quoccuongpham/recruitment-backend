const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('job_post', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    post_by_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user_account',
        key: 'id'
      }
    },
    job_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'job_type',
        key: 'id'
      }
    },
    created_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_DATE')
    },
    job_description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    job_location_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'job_location',
        key: 'id'
      }
    },
    is_active: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    job_title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date_expire: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    date_receiving_application: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    salary: {
      type: DataTypes.REAL,
      allowNull: true
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'category',
        key: 'id'
      }
    },
    file_description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'job_post',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "job_post_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
