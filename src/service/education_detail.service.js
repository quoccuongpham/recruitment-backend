class EducationDetailService {
	constructor(education_detail_model) {
		this.EducationDetail = education_detail_model;
	}
	_extract_data(payload) {
		const education_detail_data = {
			user_account_id: payload.user_account_id,
			cetificate_degree_name: payload.cetificate_degree_name,
			major: payload.major,
			institute_university_name: payload.institute_university_name,
			starting_date: payload.starting_date,
			completion_date: payload.completion_date,
			cgpa: payload.cgpa,
		};

		Object.keys(education_detail_data).forEach(
			(key) =>
				education_detail_data[key] === undefined &&
				delete education_detail_data[key]
		);
		return education_detail_data;
	}
	async create(data) {
		try {
			return await this.EducationDetail.create(this._extract_data(data));
		} catch (error) {
			console.log(error);
			return null;
		}
	}
}

module.exports = EducationDetailService;
