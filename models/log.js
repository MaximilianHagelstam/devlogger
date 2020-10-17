const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Schema
const logSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		body: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
)

// Model
const Log = mongoose.model('Log', logSchema)
module.exports = Log
