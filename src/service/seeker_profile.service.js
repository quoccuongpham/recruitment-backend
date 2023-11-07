class SeekerProfileService {
	constructor(seeker_profile_model) {
		this.SeekerProfile = seeker_profile_model;
	}
	_extract_data(payload) {
		const seeker_profile_data = {
			first_name: payload.first_name,
			last_name: payload.last_name,
			email_contact: payload.email_contact,
			current_salary: payload.current_salary,
			file_cv: payload.file_cv,
			currency: payload.currency,
			is_annually_monthly: payload.is_annually_monthly,
		};

		Object.keys(seeker_profile_data).forEach(
			(key) =>
				seeker_profile_data[key] === undefined &&
				delete seeker_profile_data[key]
		);
		return seeker_profile_data;
	}
	async create_or_update(id, data) {
		try {
			const is_exist = await this.SeekerProfile.findOne({
				where: {
					user_account_id: id,
				},
			});
			if (is_exist) {
				return await this.SeekerProfile.update(
					this._extract_data(data),
					{
						where: {
							user_account_id: id,
						},
					}
				);
			} else {
				return await this.SeekerProfile.create({
					user_account_id: id,
					...this._extract_data(data),
				});
			}
		} catch (error) {
			return null;
		}
	}
	async find_all_by_id(
		id,
		user_account_model,
		education_detail_model,
		experience_detail_model
	) {
		try {
			return await this.SeekerProfile.findOne({
				where: {
					user_account_id: id,
				},
				include: [
					{
						model: education_detail_model,
						as: "education_details",
					},
					{
						model: experience_detail_model,
						as: "experience_details",
					},
					{
						model: user_account_model,
						as: "user_account",
						attributes: [
							"email",
							"date_of_birth",
							"gender",
							"contact_number",
							"user_image",
						],
					},
				],
			});
		} catch (error) {
			console.log(error);
			return null;
		}
	}
}

module.exports = SeekerProfileService;
