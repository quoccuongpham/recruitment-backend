const log = require("../middlewares/log");

class UserAccountService {
	constructor(user_account_model) {
		this.UserAccount = user_account_model;
	}
	_extract_data(payload) {
		const user_account_data = {
			user_type_id: payload.user_type_id,
			email: payload.email,
			date_of_birth: payload.date_of_birth,
			gender: payload.gender,
			contact_number: payload.contact_number,
			user_image: payload.user_image,
		};

		Object.keys(user_account_data).forEach(
			(key) =>
				user_account_data[key] === undefined &&
				delete user_account_data[key]
		);
		return user_account_data;
	}
	async find_by_id(id) {
		try {
			return await this.UserAccount.findOne({
				where: {
					id: id,
				},
			});
		} catch (error) {
			console.log(error);
			return null;
		}
	}
	async find_by_email(email) {
		try {
			return await this.UserAccount.findOne({
				where: {
					email: email,
				},
			});
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	async create(data) {
		try {
			const rs = await this.UserAccount.create({
				user_type_id: data.user_type_id,
				email: data.email,
				password: data.hash_password,
				contact_number: data.contact_number,
				registration_date: data.registration_date,
			});
			return rs;
		} catch (error) {
			console.log(error);
			return null;
		}
	}
	async update(id, data) {
		try {
			const data_update = this._extract_data(data);

			return await this.UserAccount.update(data_update, {
				where: {
					id: id,
				},
			});
		} catch (error) {
			console.log(error);
			return null;
		}
	}
}
module.exports = UserAccountService;
