const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const ApiError = require("./src/api-error");
require("dotenv").config();
// const db = require("../database/models/index");

const auth = require("./src/routes/auth.route");
const employer = require("./src/routes/employer.route");
// const employee = require("./routes/employee");

const app = express();
app.use(morgan("dev"));
app.use(cookieParser(process.env.SECRET_COOKIE));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
	cors({ origin: true, credentials: true, exposedHeaders: ["set-cookie"] })
);
// public
app.use("/public/upload/avatar", express.static("./public/upload/avatar"));
// app.use("/public/images/mail", express.static("./public/images/mail"));
// routes
app.use("/auth", auth);
app.use("/employer", employer);
// app.use("/employee", employee);

app.get("/", async (req, res, next) => {
	res.status(200).json({
		success: true,
		mess: "wellcome",
	});
});
// handle 404 error
app.use((req, res, next) => {
	return res.json(new ApiError(404, "Resource not found"));
});

// error api
app.use((err, req, res, next) => {
	return res.status(err.statusCode || 500).json({
		message: err.message || "Internal Server Error",
	});
});
module.exports = app;
