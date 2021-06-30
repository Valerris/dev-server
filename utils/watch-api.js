const chokidar = require("chokidar")
const invalidateApi = require("./invalidate-api")

module.exports = function watchApi(apiPath) {
	if (
		process.env.STUB_API &&
		process.env.NODE_ENV === "development"
	) {
		const watcher = chokidar.watch(apiPath, {
			ignored: /node_modules/,
		})

		watcher.on("ready", () => {
			watcher.on("all", () => {
				console.log("> 🔥 Updating due to API changes...")

				invalidateApi(apiPath)

				console.log("> ✔️ Server API reloaded.")
			})
		})
	}
}
