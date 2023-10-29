const router = require("express").Router();
const auth = require("../controllers/auth.controller");
const log = require("../middlewares/log");

//* AUTH
router.post("/login", log, auth.login);
router.post("/register", log, auth.register);
router.get("/logout", log, auth.logout);

//* Get info user
router.get("/", auth.get_info);
module.exports = router;
