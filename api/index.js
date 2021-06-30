const router = require("express").Router()

router.get("/test", (_, res) => {
	return res.send("It works on the server side <3")
})

router.get("/from-cmp", (_, res) => {
	return res.json({
		success: true,
		body: {
			message: "api from cmp",
		},
	})
})

module.exports = router
