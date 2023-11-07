const router = require("express").Router();

const employer = require("../controllers/employer.controller");
const check_cookie = require("../middlewares/check_cookie");
const log = require("../middlewares/log");
router
	.route("/profile")
	.get(check_cookie, employer.get_profile) //* get profile
	.post(check_cookie, log, employer.create_or_update_profile); //* create profile for company

router
	.route("/job")
	.get(check_cookie, employer.get_job) //* get job
	.post(check_cookie, log, employer.post_job) //* create job
	.delete(check_cookie, employer.delete_job); //* delete job

router
	.route("/job/file_description/:id_job")
	.post(
		check_cookie,
		log,
		employer.multer_file_job(),
		employer.upload_file_description
	); //* upload file description

router
	.route("/job-apply/:id")
	.get(check_cookie, employer.get_apply) //* get job apply
	.post(check_cookie, log, employer.accept_job); //* accept job

router
	.route("/seeker-profile/:id")
	.get(check_cookie, employer.get_seeker_profile); //* get info seeker

module.exports = router;
