module.exports = function (req, res, next) {
	console.log("params:::", req.params);
	console.log("body:::", req.body);
	next();
};
