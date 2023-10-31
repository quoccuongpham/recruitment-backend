class CompanyService {
	constructor(company_model) {
		this.Company = company_model;
	}

	_extract_data(payload) {
		const company_data = {
			company_name: payload.company_name,
			profile_description: payload.profile_description,
			establishment_date: payload.establishment_date,
			company_website_url: payload.company_website_url,
			company_email: payload.company_email,
		};

		Object.keys(company_data).forEach(
			(key) => company_data[key] === undefined && delete company_data[key]
		);
		if (company_data["establishment_date"]) {
			company_data["establishment_date"] = new Date(
				company_data["establishment_date"]
			);
		}
		return company_data;
	}
	async find_by_id(id) {
		try {
			return await this.Company.findByPk(id);
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	async get_info_and_image(id, company_image_model) {
		try {
			return await this.Company.findOne({
				where: {
					id: id,
				},
				include: [
					{
						model: company_image_model,
						as: "company_images",
						attributes: [["company_image", "url"]],
					},
				],
			});
		} catch (error) {
			return null;
		}
	}

	async create_or_update(id, data) {
		try {
			const company_data = this._extract_data(data);
			if (await this.find_by_id(id)) {
				// update
				return await this.Company.update(company_data, {
					where: {
						id: id,
					},
				});
			} else {
				// create
				return await this.Company.create({
					id: id,
					...company_data,
				});
			}
		} catch (error) {
			console.log(error);
			return null;
		}
	}
}
module.exports = CompanyService;
