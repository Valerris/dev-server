const path = require("path")
const { cosmiconfigSync } = require("cosmiconfig")

module.exports = function getServerConfig() {
	const moduleName = "server"

	const explorer = cosmiconfigSync(moduleName)

	let res = explorer.search()

	if (!res) {
		const loadPath = `${
			path.relative(
				process.cwd(),
				path.resolve(`${__dirname}`, "../../..")
			) || process.cwd()
		}/.serverrc.js`

		res = explorer.load(loadPath)
	}

	return res.config
}
