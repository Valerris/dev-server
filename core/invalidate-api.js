const glob = require("glob/sync")

module.exports = function invalidateApi(apiPath) {
	glob(`${apiPath}/**/*`, { absolute: true })
		.filter((path) => {
			try {
				return require.resolve(path)
			} catch (_) {
				return false
			}
		})
		.forEach((path) => {
			delete require.cache[require.resolve(path)]
		})
}
