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
}

module.exports = JobPostActivityService;
