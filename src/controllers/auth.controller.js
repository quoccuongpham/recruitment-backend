const argon = require("argon2");
const jwt = require("jsonwebtoken");
const db = require("../../database/models/index");
const initModels = require("../../database/models/init-models");
const ApiError = require("../api-error");
const UserAccountService = require("../service/user_account.service");
exports.login = async function (req, res, next) {
	try {
		const { email, password } = req.body;
		if (email && password) {
			const user_account_model = initModels(db.sequelize).user_account;
			const user_account = new UserAccountService(user_account_model);
			const user_info = await user_account.find_by_email(email);
			//* check user exist
			if (user_info) {
				//* check password
				const check_password = await argon.verify(
					user_info.dataValues.password,
					password
				);
				if (check_password) {
					const token = jwt.sign(
						{
							id: user_info.dataValues.id,
							user_type_id: user_info.dataValues.user_type_id,
						},
						process.env.SECRET_JWT,
						{ expiresIn: 86400000 }
					);
					res.cookie("token", token, {
						signed: true,
						maxAge: 1000 * 3600 * 24,
						httpOnly: false,
					});
					return res.json({
						success: true,
						message: "login successfully",
						user_type_id: user_info.dataValues.user_type_id,
					});
				} else {
					next(new ApiError(400, "Missing username or password"));
				}
			} else {
				next(new ApiError(400, "Missing username or password"));
			}
		} else {
			return next(new ApiError(400, "Missing username or password"));
		}
	} catch (error) {
		console.log(error);
		return next();
	}
};
exports.register = async function (req, res, next) {
	try {
		const user_account_model = initModels(db.sequelize).user_account;
		const user_account_service = new UserAccountService(user_account_model);
		const { user_type_id, email, password, contact_number } = req.body;
		if (user_type_id && email && password && contact_number) {
			const check_email = await user_account_service.find_by_email(email);
			if (check_email === null) {
				const hash_password = await argon.hash(password);
				console.log(hash_password);
				const create_account = await user_account_service.create({
					user_type_id,
					email,
					hash_password,
					contact_number,
					registration_date: new Date(),
				});
				if (create_account) {
					return res.json({
						success: true,
						message: "register successfully",
					});
				} else {
					next("err");
				}
			} else {
				return next(new ApiError(400, "Email already exist"));
			}
		} else {
			return next(new ApiError(400, "Missing data row"));
		}
	} catch (error) {
		console.log(error);
		return next();
	}
};
exports.logout = async function (req, res) {
	res.clearCookie("token");
	res.end();
};

exports.get_info = async function (req, res, next) {
	if (!req.signedCookies.token) {
		return next(ApiError(400, "Cookie rong"));
	} else {
		try {
			const user_account_model = initModels(db.sequelize).user_account;
			const user_account_service = new UserAccountService(
				user_account_model
			);

			const token = req.signedCookies.token;
			const { id } = jwt.verify(token, process.env.SECRET_JWT);

			const user_info = await user_account_service.find_by_id(id);

			return res.json({
				success: true,
				message: "thanh cong",
				dataValues: {
					email: user_info.dataValues.email,
					user_type_id: user_info.dataValues.user_type_id,
				},
			});
		} catch (error) {
			console.log(error);
			return next(ApiError(400, "Cookie khong con hieu luc"));
		}
	}
};
