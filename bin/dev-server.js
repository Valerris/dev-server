#!/usr/bin/env node

if (process.env.STUB_API) {
	require(".")
} else {
	console.warn("Set a STUB_API var")
}
