const fs = require("fs");
const config = {
	app: {
		port: process.env.PORT || 3000,
	},
	file_upload: {
		storage: {
			avatar: {
				destination: (req, file, cb) => {
					cb(null, "./public/upload/avatar");
				},
				filename: (req, file, cb) => {
					cb(null, Date.now() + "-" + file.originalname);
				},
			},
			job_file: {
				destination: (req, file, cb) => {
					const directoryPath = `./public/upload/job_post/${req.user_info.id}`;
					if (!fs.existsSync(directoryPath)) {
						// Nếu thư mục không tồn tại, tạo nó
						fs.mkdirSync(directoryPath, { recursive: true }); // Sử dụng recursive để tạo cả các thư mục con nếu cần
					}
					cb(null, `./public/upload/job_post/${req.user_info.id}`);
				},
				filename: (req, file, cb) => {
					cb(
						null,
						Date.now() + "-" + file.originalname.split(" ").join("")
					);
				},
			},
		},
	},
	mail: {
		MAILER: process.env.MAIL_MAILER,
		HOST: process.env.MAIL_HOST,
		PORT: process.env.MAIL_PORT,
		USERNAME: process.env.MAIL_USERNAME,
		PASSWORD: process.env.MAIL_PASSWORD,
		ENCRYTION: process.env.MAIL_ENCRYTION,
		FROM_ADDRESS: process.env.MAIL_FROM_ADDRESS,
		FROM_NAME: process.env.MAIL_FROM_NAME,
	},
};

module.exports = config;
