const app = require("./app");
const config = require("./src/config");
const db = require("./database/models/index");
async function start_server() {
	try {
		await db.sequelize.authenticate();
		console.log("Connection has been established successfully.");
		app.listen(config.app.port, () => {
			console.log(`server is running on port ${config.app.port}`);
		});
	} catch (error) {
		console.log("Cannot connect to the database", error);
		process.exit();
	}
}

start_server();
