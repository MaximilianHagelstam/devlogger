const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Schema
const LogSchema = new Schema(
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
module.exports = mongoose.model('Log', LogSchema)
