const router = require("express").Router();
const {
	multer_avatar,
	upload_avatar,
} = require("../controllers/general.controller");
const check_cookie = require("../middlewares/check_cookie");
router.route("/").get(check_cookie, (req, res) => {
	res.json("test");
});
router.route("/avatar").post(check_cookie, multer_avatar(), upload_avatar);

module.exports = router;
