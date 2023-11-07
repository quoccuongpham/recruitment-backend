const db = require("../../database/models");
const initModels = require("../../database/models/init-models");
const CompanyService = require("../service/company.service");
const JobLocationService = require("../service/job_location.service");

const JobPostService = require("../service/job_post.service");
const JobPostActivityService = require("../service/job_post_activity.service");
const JobTypeService = require("../service/job_type.service");
const SeekerProfileService = require("../service/seeker_profile.service");
const UserAccountService = require("../service/user_account.service");
const EducationDetailService = require("../service/education_detail.service");
const ExperienceDetailService = require("../service/experience_detail.service");

exports.find_all_job = async (req, res, next) => {
	try {
		const job_post_service = new JobPostService(
			initModels(db.sequelize).job_post
		);

		const rs = await job_post_service.find_all();

		return res.json(rs);
	} catch (error) {
		console.log(error);
		return next("err");
	}
};

exports.get_detail_job = async (req, res, next) => {
	try {
		// models
		const models = initModels(db.sequelize);
		const job_post_service = new JobPostService(models.job_post);
		const company_service = new CompanyService(models.company);
		const job_post_activity_service = new JobPostActivityService(
			models.job_post_activity
		);
		const job_location_service = new JobLocationService(
			models.job_location
		);
		const job_type_service = new JobTypeService(models.job_type);

		const id_job = req.params.id;
		const job = await job_post_service.find_by_job_id(id_job);
		const company = await company_service.find_by_id(
			job?.dataValues.post_by_id
		);
		const is_applied = await job_post_activity_service.is_applied(
			id_job,
			req.user_info.id
		);
		const job_type = await job_type_service.get_name(
			job?.dataValues.job_type_id
		);
		const job_location = await job_location_service.find(
			job?.dataValues.id
		);
		return res.json({
			job: { ...job?.dataValues },
			company: { ...company?.dataValues },
			is_applied,
			job_type,
			job_location,
		});
	} catch (error) {
		console.log(error);
		return next("err");
	}
};

exports.get_jobs_apllied = async (req, res, next) => {
	try {
		const job_post_activity_service = new JobPostActivityService(
			initModels(db.sequelize).job_post_activity
		);
		const rs = await job_post_activity_service.get_job_applied_by_user(
			req.user_info.id
		);
		console.log(rs);
		return res.json(rs);
	} catch (error) {
		console.log(error);
		return next("err");
	}
};

exports.apply_job = async (req, res, next) => {
	try {
		const job_post_activity_service = new JobPostActivityService(
			initModels(db.sequelize).job_post_activity
		);

		const rs = await job_post_activity_service.create({
			job_post_id: req.body.id_job,
			user_account_id: req.user_info.id,
			apply_date: new Date(),
			is_accept: Boolean(false),
		});
		return res.json({
			success: true,
			message: "apply job successfully",
		});
	} catch (error) {
		console.log(error);
		return next("err");
	}
};

exports.get_profile = async (req, res, next) => {
	try {
		const models = initModels(db.sequelize);
		const seeker_profile_service = new SeekerProfileService(
			models.seeker_profile
		);
		const rs = await seeker_profile_service.find_all_by_id(
			req.user_info.id,
			models.user_account,
			models.education_detail,
			models.experience_detail
		);

		res.json({
			success: true,
			message: "get profile successfully",
			dataValues: rs.dataValues,
		});
	} catch (error) {
		console.log(error);
		return next("err");
	}
};

exports.update_profile_general = async (req, res, next) => {
	try {
		const seeker_profile_service = new SeekerProfileService(
			initModels(db.sequelize).seeker_profile
		);
		const user_account_service = new UserAccountService(
			initModels(db.sequelize).user_account
		);
		function _extract_data(payload) {
			return {
				first_name: payload.first_name,
				last_name: payload.last_name,
				email_contact: payload.email_contact,
				current_salary: payload.current_salary,
				gender: payload.gender,
			};
		}
		const data = _extract_data(req.body);
		await seeker_profile_service.create_or_update(req.user_info.id, data);
		await user_account_service.update(req.user_info.id, data);
		res.json({
			success: true,
		});
	} catch (error) {
		console.log(error);
		return next("err");
	}
};

exports.create_education = async (req, res, next) => {
	try {
		const education_detail_service = new EducationDetailService(
			initModels(db.sequelize).education_detail
		);

		function _extract_data(payload) {
			return {
				cetificate_degree_name: payload.cetificate_degree_name,
				major: payload.major,
				institute_university_name: payload.institute_university_name,
				starting_date: payload.starting_date,
				completion_date: payload.completion_date,
				cgpa: payload.cgpa,
			};
		}
		const data = _extract_data(req.body);

		await education_detail_service.create({
			user_account_id: req.user_info.id,
			...data,
		});
		return res.json({
			success: true,
		});
	} catch (error) {
		console.log(error);
		return next("err");
	}
};

exports.create_experience = async (req, res, next) => {
	try {
		const experience_detail_service = new ExperienceDetailService(
			initModels(db.sequelize).experience_detail
		);

		await experience_detail_service.create({
			user_account_id: req.user_info.id,
			...req.body,
		});
		return res.json({
			success: true,
		});
	} catch (error) {
		console.log(error);
		return next("err");
	}
};
