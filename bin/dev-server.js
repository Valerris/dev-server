#!/usr/bin/env node

const program = require("commander")
const pkg = require("../package")

program
	.version(pkg.version)
	.usage("vlrrs-dev-server [options]")
	.option(
		"-m, --mode [mode]",
		"server mode",
		/^(development|production)$/,
		"development"
	)
	.option("-p, --port [port]", "server port", 3000)
	.on("--help", () => {
		console.log(`
			\n
			vlrrs-dev-server -m development -p 3000
			\n
		`)
	})
	.parse(process.argv)

const options = program.opts()

process.env.STUB_API = true
process.env.NODE_ENV = options.mode
process.env.PORT = options.port

if (process.env.STUB_API && process.env.NODE_ENV === "development") {
	require("..")
} else {
	console.error("Set a STUB_API && NODE_ENV env vars")
}
