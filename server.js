const app = require("./app");
const config = require("./src/config");
function start_server() {
	app.listen(config.app.port, () => {
		console.log(`server is running on port ${config.app.port}`);
	});
}

start_server();
