var DataTypes = require("sequelize").DataTypes;
var _SequelizeMeta = require("./SequelizeMeta");
var _category = require("./category");
var _company = require("./company");
var _company_image = require("./company_image");
var _education_detail = require("./education_detail");
var _experience_detail = require("./experience_detail");
var _job_location = require("./job_location");
var _job_post = require("./job_post");
var _job_post_activity = require("./job_post_activity");
var _job_post_skill_set = require("./job_post_skill_set");
var _job_type = require("./job_type");
var _seeker_profile = require("./seeker_profile");
var _seeker_skill_set = require("./seeker_skill_set");
var _skill_set = require("./skill_set");
var _user_account = require("./user_account");
var _user_log = require("./user_log");
var _user_type = require("./user_type");

function initModels(sequelize) {
  var SequelizeMeta = _SequelizeMeta(sequelize, DataTypes);
  var category = _category(sequelize, DataTypes);
  var company = _company(sequelize, DataTypes);
  var company_image = _company_image(sequelize, DataTypes);
  var education_detail = _education_detail(sequelize, DataTypes);
  var experience_detail = _experience_detail(sequelize, DataTypes);
  var job_location = _job_location(sequelize, DataTypes);
  var job_post = _job_post(sequelize, DataTypes);
  var job_post_activity = _job_post_activity(sequelize, DataTypes);
  var job_post_skill_set = _job_post_skill_set(sequelize, DataTypes);
  var job_type = _job_type(sequelize, DataTypes);
  var seeker_profile = _seeker_profile(sequelize, DataTypes);
  var seeker_skill_set = _seeker_skill_set(sequelize, DataTypes);
  var skill_set = _skill_set(sequelize, DataTypes);
  var user_account = _user_account(sequelize, DataTypes);
  var user_log = _user_log(sequelize, DataTypes);
  var user_type = _user_type(sequelize, DataTypes);

  job_post.belongsToMany(skill_set, { as: 'skill_set_id_skill_sets', through: job_post_skill_set, foreignKey: "job_post_id", otherKey: "skill_set_id" });
  job_post.belongsToMany(user_account, { as: 'user_account_id_user_accounts', through: job_post_activity, foreignKey: "job_post_id", otherKey: "user_account_id" });
  seeker_profile.belongsToMany(skill_set, { as: 'skill_set_id_skill_set_seeker_skill_sets', through: seeker_skill_set, foreignKey: "user_account_id", otherKey: "skill_set_id" });
  skill_set.belongsToMany(job_post, { as: 'job_post_id_job_post_job_post_skill_sets', through: job_post_skill_set, foreignKey: "skill_set_id", otherKey: "job_post_id" });
  skill_set.belongsToMany(seeker_profile, { as: 'user_account_id_seeker_profiles', through: seeker_skill_set, foreignKey: "skill_set_id", otherKey: "user_account_id" });
  user_account.belongsToMany(job_post, { as: 'job_post_id_job_posts', through: job_post_activity, foreignKey: "user_account_id", otherKey: "job_post_id" });
  job_post.belongsTo(category, { as: "category", foreignKey: "category_id"});
  category.hasMany(job_post, { as: "job_posts", foreignKey: "category_id"});
  company_image.belongsTo(company, { as: "company", foreignKey: "company_id"});
  company.hasMany(company_image, { as: "company_images", foreignKey: "company_id"});
  job_post.belongsTo(job_location, { as: "job_location", foreignKey: "job_location_id"});
  job_location.hasMany(job_post, { as: "job_posts", foreignKey: "job_location_id"});
  job_post_activity.belongsTo(job_post, { as: "job_post", foreignKey: "job_post_id"});
  job_post.hasMany(job_post_activity, { as: "job_post_activities", foreignKey: "job_post_id"});
  job_post_skill_set.belongsTo(job_post, { as: "job_post", foreignKey: "job_post_id"});
  job_post.hasMany(job_post_skill_set, { as: "job_post_skill_sets", foreignKey: "job_post_id"});
  job_post.belongsTo(job_type, { as: "job_type", foreignKey: "job_type_id"});
  job_type.hasMany(job_post, { as: "job_posts", foreignKey: "job_type_id"});
  education_detail.belongsTo(seeker_profile, { as: "user_account", foreignKey: "user_account_id"});
  seeker_profile.hasMany(education_detail, { as: "education_details", foreignKey: "user_account_id"});
  experience_detail.belongsTo(seeker_profile, { as: "user_account", foreignKey: "user_account_id"});
  seeker_profile.hasMany(experience_detail, { as: "experience_details", foreignKey: "user_account_id"});
  seeker_skill_set.belongsTo(seeker_profile, { as: "user_account", foreignKey: "user_account_id"});
  seeker_profile.hasOne(seeker_skill_set, { as: "seeker_skill_set", foreignKey: "user_account_id"});
  job_post_skill_set.belongsTo(skill_set, { as: "skill_set", foreignKey: "skill_set_id"});
  skill_set.hasMany(job_post_skill_set, { as: "job_post_skill_sets", foreignKey: "skill_set_id"});
  seeker_skill_set.belongsTo(skill_set, { as: "skill_set", foreignKey: "skill_set_id"});
  skill_set.hasMany(seeker_skill_set, { as: "seeker_skill_sets", foreignKey: "skill_set_id"});
  company.belongsTo(user_account, { as: "id_user_account", foreignKey: "id"});
  user_account.hasOne(company, { as: "company", foreignKey: "id"});
  job_post.belongsTo(user_account, { as: "post_by", foreignKey: "post_by_id"});
  user_account.hasMany(job_post, { as: "job_posts", foreignKey: "post_by_id"});
  job_post_activity.belongsTo(user_account, { as: "user_account", foreignKey: "user_account_id"});
  user_account.hasMany(job_post_activity, { as: "job_post_activities", foreignKey: "user_account_id"});
  seeker_profile.belongsTo(user_account, { as: "user_account", foreignKey: "user_account_id"});
  user_account.hasOne(seeker_profile, { as: "seeker_profile", foreignKey: "user_account_id"});
  user_log.belongsTo(user_account, { as: "user_acount", foreignKey: "user_acount_id"});
  user_account.hasOne(user_log, { as: "user_log", foreignKey: "user_acount_id"});
  user_account.belongsTo(user_type, { as: "user_type", foreignKey: "user_type_id"});
  user_type.hasMany(user_account, { as: "user_accounts", foreignKey: "user_type_id"});

  return {
    SequelizeMeta,
    category,
    company,
    company_image,
    education_detail,
    experience_detail,
    job_location,
    job_post,
    job_post_activity,
    job_post_skill_set,
    job_type,
    seeker_profile,
    seeker_skill_set,
    skill_set,
    user_account,
    user_log,
    user_type,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
