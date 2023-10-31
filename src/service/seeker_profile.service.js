class SeekerProfileService {
	constructor(seeker_profile_model) {
		this.SeekerProfile = seeker_profile_model;
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
