const express = require('express')
const favicon = require('serve-favicon')
const path = require('path')
const mongoose = require('mongoose')
const Log = require('./models/log')
const logRoutes = require('./routes/logRoutes')
const passport = require('passport')
const cookieSession = require('cookie-session')
const { isNullOrUndefined } = require('util')
require('./passport-setup')

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

app.use(
	cookieSession({
		name: 'devlogger-session',
		keys: ['key1', 'key2'],
	})
)

const isLoggedIn = (req, res, next) => {
	if (req.user) {
		next()
	} else {
		res.sendStatus(401)
	}
}

// Middleware
app.use(express.urlencoded())
app.use(passport.initialize())
app.use(passport.session())

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

// Log route
app.use('/logs', logRoutes)

// Redirects
app.get('/about-us', (req, res) => {
	res.redirect('/about')
})

app.get('/home', (req, res) => {
	res.redirect('/logs')
})

// Oauth 2.0 routes
app.get(
	'/google',
	passport.authenticate('google', { scope: ['profile', 'email'] })
)

app.get(
	'/google/callback',
	passport.authenticate('google', { failureRedirect: '/failed' }),
	(req, res) => {
		// Successful authentication, redirect home.
		res.redirect('/good')
	}
)

app.get('/failed', (req, res) => {
	res.send('You failed to login!')
})

app.get('/good', isLoggedIn, (req, res) => {
	res.send('Welcome mr ' + req.user.displayName + '!')
})

app.get('/logout', (req, res) => {
	req.session = null
	req.logout()
	res.redirect('/')
})

// 404
app.use((req, res) => {
	res.status(404).render('404', { title: 'Page not found' })
})
