const ApiError = require("../api-error");
const multer = require("multer");
const UserAccountService = require("../service/user_account.service");
const initModels = require("../../database/models/init-models");
const db = require("../../database/models/index");
const config = require("../config");

exports.multer_avatar = function () {
	const storage_avatar = multer.diskStorage(
		config.file_upload.storage.avatar
	);

	const upload_avatar = multer({ storage: storage_avatar });

	return upload_avatar.single("avatar");
};
exports.upload_avatar = async (req, res, next) => {
	try {
		const user_info = req.user_info;
		const pathAvatar =
			`${process.env.HOST}/public/upload/avatar/` + req.file.filename;

		const user_account_service = new UserAccountService(
			initModels(db.sequelize).user_account
		);
		await user_account_service.update(user_info.id, {
			user_image: pathAvatar,
		});
		res.json({
			message: "upload file thành công",
		});
	} catch (error) {
		console.log(error);
		return next("err");
	}
};
