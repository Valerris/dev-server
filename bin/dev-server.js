#!/usr/bin/env node

if (process.env.STUB_API && process.env.NODE_ENV === "development") {
	require("..")
} else {
	console.error("Set a STUB_API && NODE_ENV env vars")
}
