class UserAccountService {
	constructor(user_account_model) {
		this.UserAccount = user_account_model;
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
}
module.exports = UserAccountService;
