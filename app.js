const express = require('express')
const path = require('path')
const passport = require('passport')
const dotenv = require('dotenv')
const favicon = require('serve-favicon')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const log = require('./routes/log')
const auth = require('./routes/auth')
const index = require('./routes/index')
const Log = require('./models/log')
const connectDB = require('./config/db')

// Load config
dotenv.config({ path: './config/config.env' })

// Passport config
require('./config/passport')(passport)

// Express app
const app = express()

// Port number
const PORT = process.env.PORT

// Connect to MongoDB
connectDB()

// Register view engine
app.set('view engine', 'ejs')

// Sessions
app.use(
	session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: false,
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
	})
)

// Passport and express middleware
app.use(passport.initialize())
app.use(passport.session())
app.use(express.urlencoded())

// Favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

// Routes
app.use('/logs', log)
app.use('/auth', auth)
app.use('/', index)

// 404
app.use((req, res) => {
	res.status(404).render('404', { title: 'Page not found' })
})

// Listen for requests
app.listen(PORT, () => {
	console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
})
