class JobPostService {
	constructor(job_post_model) {
		this.JobPost = job_post_model;
	}

	_extract_data(payload) {
		const user_account_data = {
			post_by_id: payload.post_by_id,
			job_type_id: payload.job_type_id,
			created_date: payload.created_date,
			job_description: payload.job_description,
			job_location_id: payload.job_location_id,
			is_active: payload.is_active,
			job_title: payload.job_title,
			date_expire: payload.date_expire,
			date_receiving_application: payload.date_receiving_application,
			salary: payload.salary,
			category_id: payload.category_id,
			file_description: payload.file_description,
		};

		Object.keys(user_account_data).forEach(
			(key) =>
				user_account_data[key] === undefined &&
				delete user_account_data[key]
		);

		if (user_account_data["date_receiving_application"]) {
			user_account_data["date_receiving_application"] = new Date(
				user_account_data["date_receiving_application"]
			);
		}
		if (user_account_data["date_expire"]) {
			user_account_data["date_expire"] = new Date(
				user_account_data["date_expire"]
			);
		}
		return user_account_data;
	}

	async create(data) {
		try {
			return await this.JobPost.create(this._extract_data(data));
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	async update(id, data) {
		try {
			return await this.JobPost.update(this._extract_data(data), {
				where: { id: id },
			});
		} catch (error) {
			return null;
		}
	}

	async find_by_user_id(id) {
		try {
			return await this.JobPost.findAll({
				where: {
					post_by_id: id,
				},
			});
		} catch (error) {
			return null;
		}
	}
}

module.exports = JobPostService;
