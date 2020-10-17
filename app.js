const express = require('express')
const favicon = require('serve-favicon')
const path = require('path')
const mongoose = require('mongoose')
const Log = require('./models/log')

// Express app
const app = express()

// Port number
const port = 3000

// Connect to MongoDB
const dbURI =
	'mongodb+srv://<username>:<password>@cluster0.u07gj.mongodb.net/<database>?retryWrites=true&w=majority'

mongoose
	.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('Connected to db')

		// Listen for requests
		app.listen(port, () => {
			console.log('Listening on port ' + port)
		})
	})
	.catch((err) => {
		console.log(err)
	})

// Register view engine
app.set('view engine', 'ejs')

// Static files
app.use(express.static(path.join(__dirname, 'public')))

// Middleware
app.use(express.urlencoded())

// Favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

// Create log test
app.get('/test-add-log', (req, res) => {
	const log = new Log({
		title: 'Test title 2',
		body: 'Test body 2',
	})

	log
		.save()
		.then((result) => {
			res.redirect('/logs')
		})
		.catch((err) => {
			console.log(err)
		})
})

app.get('/test-all-logs', (req, res) => {
	Log.find()
		.then((result) => {
			res.send(result)
		})
		.catch((err) => {
			console.log(err)
		})
})

// Routes
app.get('/', (req, res) => {
	res.redirect('/logs')
})

app.get('/about', (req, res) => {
	res.render('about', { title: 'About' })
})

app.get('/signin', (req, res) => {
	res.render('signin', { title: 'Sign in' })
})

// Log routes
app.get('/logs', (req, res) => {
	Log.find()
		.sort({ createdAt: -1 })
		.then((result) => {
			res.render('index', { title: 'All Logs', logs: result })
		})
		.catch((err) => {
			console.log(err)
		})
})

// Add log post request handler
app.post('/logs', (req, res) => {
	const log = new Log(req.body)

	log
		.save()
		.then((result) => {
			res.redirect('/logs')
		})
		.catch((err) => {
			console.log(err)
		})
})

app.get('/logs/add', (req, res) => {
	res.render('add', { title: 'Add log' })
})

// Redirects
app.get('/about-us', (req, res) => {
	res.redirect('/about')
})

app.get('/home', (req, res) => {
	res.redirect('/')
})

// 404
app.use((req, res) => {
	res.status(404).render('404', { title: 'Page not found' })
})
