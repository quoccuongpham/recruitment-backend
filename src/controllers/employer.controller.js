const db = require("../../database/models");
const initModels = require("../../database/models/init-models");
const ApiError = require("../api-error");
const mailer = require("../utils/mailer");
const mailTemplete = require("../utils/mailertemplete");
const CompanyService = require("../service/company.service");
const CompanyImageService = require("../service/company_image.service");
const JobPostService = require("../service/job_post.service");
const JobLocationService = require("../service/job_location.service");
const JobPostActivityService = require("../service/job_post_activity.service");
const multer = require("multer");
const config = require("../config");
const SeekerProfileService = require("../service/seeker_profile.service");
const JobPostSkillSetSetvice = require("../service/job_post_skill_set.service");

exports.test = async (req, res) => {
	try {
		const job_location_service = new JobLocationService(
			initModels(db.sequelize).job_location
		);

		const rs = await job_location_service.create(req.body);

		console.log(rs);

		return res.json("thanh cong");
	} catch (error) {
		console.log(error);
		return res.json("that bai");
	}
};
exports.get_profile = async (req, res, next) => {
	try {
		const { user_info } = req;
		if (user_info.user_type_id != 2) {
			return next(new ApiError(400, "Don't have permisstion"));
		}
		const {
			email,
			date_of_birth,
			gender,
			contact_number,
			user_image,
			registration_date,
		} = user_info;

		// service
		const models = initModels(db.sequelize);
		const company_service = new CompanyService(models.company);

		const rs = await company_service.get_info_and_image(
			user_info.id,
			models.company_image
		);

		if (rs) {
			const {
				dataValues: {
					id,
					user_account_id,
					company_name,
					profile_description,
					establishment_date,
					company_website_url,
					company_images,
					company_email,
				},
			} = rs;
			const data = {
				email,
				date_of_birth,
				gender,
				contact_number,
				user_image,
				registration_date,
				id,
				user_account_id,
				company_name,
				profile_description,
				establishment_date,
				company_website_url,
				company_images,
				company_email,
			};
			return res.json({
				success: true,
				dataValues: data,
			});
		}
		return res.json({
			success: true,
			dataValues: {},
		});
	} catch (error) {
		next("err");
	}
};

exports.create_or_update_profile = async (req, res, next) => {
	try {
		const user_info = req.user_info;
		if (user_info.user_type_id != 2) {
			return next(new ApiError(400, "Don't have permisstion"));
		}
		const data = req.body;

		const company_service = new CompanyService(
			initModels(db.sequelize).company
		);

		const rs = await company_service.create_or_update(user_info.id, data);

		if (rs) {
			return res.json({
				success: true,
				message: "Update thanh cong",
			});
		}
		return res.json({
			success: false,
		});
	} catch (error) {
		return next("err");
	}
};

// setup for upload file
exports.multer_file_job = function () {
	const storage_file_job = multer.diskStorage(
		config.file_upload.storage.job_file
	);

	const upload_file_job = multer({ storage: storage_file_job });

	return upload_file_job.single("file_description");
};
exports.post_job = async (req, res, next) => {
	try {
		const formData = req.body;

		const job_post_service = new JobPostService(
			initModels(db.sequelize).job_post
		);
		const job_location_service = new JobLocationService(
			initModels(db.sequelize).job_location
		);
		const job_location_create = await job_location_service.create(formData);

		formData.job_location_id = job_location_create.dataValues.id;
		formData.post_by_id = req.user_info.id;
		formData.is_active = "Y";
		const new_job = await job_post_service.create(formData);

		return res.json({
			success: true,
			message: "create job successfully",
			id: new_job?.dataValues.id,
		});
	} catch (error) {
		console.log(error);
		return next("err");
	}
};

exports.delete_job = async (req, res, next) => {
	try {
		const models = initModels(db.sequelize);
		const job_post_service = new JobPostService(models.job_post);
		const job_post_activity_service = new JobPostActivityService(
			models.job_post_activity
		);
		const job_post_skill_set_service = new JobPostSkillSetSetvice(
			models.job_post_skill_set
		);

		const id_job = req.body.id_job;
		const job = await job_post_service.find_by_job_id(id_job);
		if (job.dataValues.post_by_id != req.user_info.id) {
			return next(new ApiError(400, "Dont have permisstion"));
		}

		await job_post_skill_set_service.delete_by_job_id(id_job);
		await job_post_activity_service.delete_by_id(id_job);
		await job_post_service.delete_by_id(id_job);

		return res.json({
			success: true,
			message: "delete successfully",
		});
		// delete job skill set
	} catch (error) {
		console.log(error);
		return next("err");
	}
};

exports.upload_file_description = async (req, res, next) => {
	try {
		const path_file = `${process.env.HOST}/public/upload/job_post/${req.user_info.id}/${req.file.filename}`;
		const job_post_service = new JobPostService(
			initModels(db.sequelize).job_post
		);

		await job_post_service.update(req.params.id_job, {
			file_description: path_file,
		});
		return res.json({
			success: true,
			message: "upload file successfully",
		});
	} catch (error) {
		console.log(error);
		return next("err");
	}
};

exports.get_job = async (req, res, next) => {
	try {
		const job_post_service = new JobPostService(
			initModels(db.sequelize).job_post
		);
		const job_posted = await job_post_service.find_by_user_id(
			req.user_info.id
		);

		return res.json({
			success: true,
			dataValues: job_posted,
		});
	} catch (error) {
		console.log(error);
		return next("err");
	}
};

exports.get_apply = async (req, res, next) => {
	try {
		const job_post_id = req.params.id;
		const job_post_activity_service = new JobPostActivityService(
			initModels(db.sequelize).job_post_activity
		);

		const rs = await job_post_activity_service.find_by_id(
			job_post_id,
			initModels(db.sequelize).user_account
		);

		return res.json(rs);
	} catch (error) {
		console.log(error);
		return next("err");
	}
};

exports.accept_job = async (req, res, next) => {
	try {
		const job_post_id = req.params.id;
		const { user_account_id, is_accept, email, interviewMessage } =
			req.body;

		const job_post_activity_service = new JobPostActivityService(
			initModels(db.sequelize).job_post_activity
		);

		await job_post_activity_service.update(job_post_id, user_account_id, {
			is_accept,
		});
		mailer.sendMail(
			email,
			"Thông báo thời gian phỏng vấn",
			mailTemplete(interviewMessage)
		);
		return res.json({
			success: true,
			message: "accept successfully",
		});
	} catch (error) {
		console.log(error);
		return next("err");
	}
};

exports.get_seeker_profile = async (req, res, next) => {
	try {
		const models = initModels(db.sequelize);
		const seeker_profile_service = new SeekerProfileService(
			models.seeker_profile
		);

		const rs = await seeker_profile_service.find_all_by_id(
			req.params.id,
			models.user_account,
			models.education_detail,
			models.experience_detail
		);
		return res.json(rs);
	} catch (error) {}
};
