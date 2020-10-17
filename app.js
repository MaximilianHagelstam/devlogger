const express = require('express')
const favicon = require('serve-favicon')
const path = require('path')
const mongoose = require('mongoose')
const Log = require('./models/log')
const logRoutes = require('./routes/logRoutes')

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
app.use('/logs', logRoutes)

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
