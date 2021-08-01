#!/usr/bin/env node

const commander = require("commander")
const { version = "1.0.0" } = require("../package")

commander
	.version(version)
	.description("@valerris custom webpack dev server.")
	.usage("vlrrs-dev-server [options]")
	.option(
		"-m, --mode [mode]",
		"mode",
		/^(development|production)$/,
		"development"
	)
	.option("-p, --port [port]", "server port", 3000)
	.on("--help", () => {
		console.log(`
			\n
			Example:
			\n
			\tvlrrs-dev-server -m development -p 3000
			\n
		`)
	})
	.parse(process.argv)

const options = commander.opts()

process.env.STUB_API = true
process.env.NODE_ENV = options.mode
process.env.PORT = options.port

if (process.env.STUB_API && process.env.NODE_ENV === "development") {
	require("..")
} else {
	throw new Error("Error starting @valerris dev server...")
}
