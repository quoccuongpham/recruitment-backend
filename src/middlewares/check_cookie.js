const jwt = require("jsonwebtoken");
const db = require("../../database/models/index");
const innitModels = require("../../database/models/init-models");
const UserAccountService = require("../service/user_account.service");
const ApiError = require("../api-error");
module.exports = async function check_cookie(req, res, next) {
	try {
		const user_account_service = new UserAccountService(
			innitModels(db.sequelize).user_account
		);

		const token = req.signedCookies.token;
		const { id } = jwt.verify(token, process.env.SECRET_JWT);
		const user_info = await user_account_service.find_by_id(id);
		if (!user_info) {
			return next(ApiError(400, "invalid user"));
		}
		req.user_info = user_info.dataValues;
		next();
	} catch (error) {
		return next("err");
	}
};
