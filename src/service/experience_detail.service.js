class ExperienceDetailService {
	constructor(experience_detail_model) {
		this.ExperienceDetail = experience_detail_model;
	}
	_extract_data(payload) {
		const experience_detail_data = {
			user_account_id: payload.user_account_id,
			start_date: payload.start_date,
			end_date: payload.end_date,
			job_title: payload.job_title,
			company_name: payload.company_name,
			job_location_city: payload.job_location_city,
			job_location_country: payload.job_location_country,
			description: payload.description,
			is_current_job: payload.is_current_job,
			job_location_state: payload.job_location_state,
		};

		Object.keys(experience_detail_data).forEach(
			(key) =>
				experience_detail_data[key] === undefined &&
				delete experience_detail_data[key]
		);
		return experience_detail_data;
	}
	async create(data) {
		try {
			return await this.ExperienceDetail.create(this._extract_data(data));
		} catch (error) {
			console.log(error);
			return null;
		}
	}
}

module.exports = ExperienceDetailService;
