const express = require('express')
const path = require('path')
const passport = require('passport')
const dotenv = require('dotenv')
const cookieSession = require('cookie-session')
const favicon = require('serve-favicon')

const logRoutes = require('./routes/logRoutes')
const Log = require('./models/log')
const connectDB = require('./config/db')

// Load config
dotenv.config({ path: './config/config.env' })

// Passport config
require('./config/passport')

// Express app
const app = express()

// Port number
const PORT = process.env.PORT

// Connect to MongoDB
connectDB()

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

app.get('/profile', (req, res) => {
	// View profile only if our are signed in
	try {
		res.render('profile', {
			title: 'Profile',
			displayName: req.user.displayName,
		})
	} catch (err) {
		res.status(404).render('404', { title: 'Page not found' })
	}
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
	passport.authenticate('google', { failureRedirect: '/google' }),
	(req, res) => {
		// Successful authentication, redirect home.
		res.redirect('/profile')
	}
)

app.get('/logout', (req, res) => {
	req.session = null
	req.logout()
	res.redirect('/')
})

// 404
app.use((req, res) => {
	res.status(404).render('404', { title: 'Page not found' })
})

// Listen for requests
app.listen(PORT, () => {
	console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
})
