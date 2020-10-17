const Log = require('../models/log')

// All logs in an array
const log_index = (req, res) => {
	Log.find()
		.sort({ createdAt: -1 })
		.then((result) => {
			res.render('logs/index', { title: 'All Logs', logs: result })
		})
		.catch((err) => {
			console.log(err)
		})
}

// Gets add log form
const log_add_get = (req, res) => {
	res.render('logs/add', { title: 'Add log' })
}

// Posts logs to /logs
const log_add_post = (req, res) => {
	const log = new Log(req.body)

	log
		.save()
		.then((result) => {
			res.redirect('/logs')
		})
		.catch((err) => {
			console.log(err)
		})
}

module.exports = {
	log_index,
	log_add_get,
	log_add_post,
}
