process.on("unhandledRejection", (reason, promise) => {
	console.log(`[ Unhandled rejection at ]: ${reason.stack || reason}
	\n
	Terminating the process...`)

	process.exit(5)
})

process.on("uncaughtException", (reason, err) => {
	console.log(`[ Uncaught exception at ]: ${reason.stack || reason}
	\n
	Terminating the process...`)

	process.exit(5)
})
