const check_cookie = require("../middlewares/check_cookie");
const employee = require("../controllers/employee.controller");
const log = require("../middlewares/log");
const router = require("express").Router();

router.route("/testroute").get((req, res) => {
	res.json("thanh cong");
});

/**
 * get all job
 */
router.route("/jobs").get(check_cookie, employee.find_all_job);

/**
 * get detail job
 */
router.route("/job-detail/:id").get(check_cookie, employee.get_detail_job);

/**
 * get job applied
 * apply job
 */

router
	.route("/apply")
	.get(check_cookie, log, employee.get_jobs_apllied)
	.post(check_cookie, employee.apply_job);

// get profile
router.route("/profile").get(check_cookie, employee.get_profile);

router.patch("/profile/general", check_cookie, employee.update_profile_general);
router.patch(
	"/profile/education",
	check_cookie,
	employee.update_profile_general
);
router.patch(
	"/profile/experience",
	check_cookie,
	employee.update_profile_general
);

router.post("/profile/education", check_cookie, employee.create_education);
router.post(
	"/profile/experience",
	check_cookie,
	log,
	employee.create_experience
);

module.exports = router;
