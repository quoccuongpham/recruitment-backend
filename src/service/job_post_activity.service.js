class JobPostActivityService {
	constructor(job_post_activity_model) {
		this.JobPostActivity = job_post_activity_model;
	}

	async find_by_id(id, user_account_model) {
		try {
			return await this.JobPostActivity.findAll({
				where: {
					job_post_id: id,
				},
				include: [
					{
						model: user_account_model,
						as: "user_account",
						attributes: [
							"id",
							"user_type_id",
							"email",
							"date_of_birth",
							"gender",
							"is_active",
							"contact_number",
							"user_image",
							"registration_date",
						],
					},
				],
			});
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	async get_job_applied_by_user(id) {
		try {
			return await this.JobPostActivity.findAll({
				where: {
					user_account_id: id,
				},
				include: "job_post",
			});
		} catch (error) {
			console.log(error);
			return null;
		}
	}
	async create(data) {
		try {
			return await this.JobPostActivity.create(data);
		} catch (error) {
			console.log(error);
			return null;
		}
	}
	async update(id_job, user_account_id, data) {
		try {
			return await this.JobPostActivity.update(data, {
				where: {
					job_post_id: id_job,
					user_account_id: user_account_id,
				},
			});
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	async delete_by_id(id) {
		try {
			return await this.JobPostActivity.destroy({
				where: {
					job_post_id: id,
				},
			});
		} catch (error) {
			console.log(error);
			return null;
		}
	}
	async is_accept(id_job, user_account_id) {
		try {
			return (
				await this.JobPostActivity.findOne({
					where: {
						job_post_id: id_job,
						user_account_id: user_account_id,
					},
				})
			).dataValues.is_accept;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	async is_applied(id_job, user_account_id) {
		try {
			const is_applied = await this.JobPostActivity.findOne({
				where: {
					job_post_id: id_job,
					user_account_id: user_account_id,
				},
			});

			return Boolean(is_applied);
		} catch (error) {
			console.log(error);
			return null;
		}
	}
}

module.exports = JobPostActivityService;
