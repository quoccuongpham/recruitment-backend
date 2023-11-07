const nodeMailer = require("nodemailer");
const config = require("../config");
require("dotenv").config();

exports.sendMail = (to, subject, htmlContent) => {
	const transport = nodeMailer.createTransport({
		host: config.mail.HOST,
		port: config.mail.PORT,
		secure: false,
		auth: {
			user: config.mail.USERNAME,
			pass: config.mail.PASSWORD,
		},
	});

	const options = {
		from: config.mail.FROM_ADDRESS,
		to: to,
		subject: subject,
		html: htmlContent,
	};
	return transport.sendMail(options);
};
