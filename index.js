const path = require("path")
const express = require("express")
const webpack = require("webpack")
const webpackDevMW = require("webpack-dev-middleware")
const webpackHotMW = require("webpack-hot-middleware")
const openBrowser = require("react-dev-utils/openBrowser")
const clearConsole = require("react-dev-utils/clearConsole")
const config = require("@valerris/webpack.config")
const { PATHS } = require("@valerris/webpack-config/config/utils")
const {
	getServerConfig,
	watchApi,
	connectApi,
	registerErrorHandlers,
} = require("../utils")

process.env.NODE_ENV = "development"

registerErrorHandlers()

const { api: apiPath } = getServerConfig()

const app = express()
const compiler = webpack(config)

app.use(
	webpackDevMW(compiler, {
		publicPath: config.output.publicPath,
		stats: "minimal",
	})
)

app.use(
	webpackHotMW(compiler, {
		log: console.log,
		path: "/__webpack_hmr",
		heartbeat: 10 * 1000,
	})
)

app.use(express.json({ extended: true }))

// App api handlers watcher
const resolvedApiPath = path.resolve(process.cwd(), apiPath)

watchApi(resolvedApiPath)

app.use((...args) => {
	return connectApi(resolvedApiPath).apply(app, args)
})

app.get("/", (_, res, next) => {
	console.log("index")

	const filename = path.resolve(PATHS.absoluteIndex)

	compiler.outputFileSystem.readFile(filename, (err, result) => {
		if (err) {
			return next(err)
		}

		res.set("content-type", "text/html")
		res.send(result)
		res.end()
	})
})

app.use("*", (_, res) =>
	res.status(404).json({
		success: true,
		body: {
			message: "Not found.",
		},
	})
)

app.listen(3000, () => {
	const startUrl = "http://localhost:3000"

	openBrowser(startUrl)

	clearConsole()

	console.log(`> 💣 Starting server on ${startUrl} ...`)
})
