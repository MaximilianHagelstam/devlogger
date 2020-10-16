const express = require('express')
const favicon = require('serve-favicon')
const path = require('path')

// Express app
const app = express()

// Register view engine
app.set('view engine', 'ejs')

const port = 3000

// Listen for requests
app.listen(port, () => {
	console.log('Listening on port ' + port)
})

// Static files
app.use(express.static(path.join(__dirname, 'public')))

// Favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

// Routes
app.get('/', (req, res) => {
	// Posts
	const posts = [
		{
			title: 'Yoshi finds eggs',
			body: 'Lorem ipsum dolor sit amet consectetur',
		},
		{
			title: 'Mario finds stars',
			body: 'Lorem ipsum dolor sit amet consectetur',
		},
		{
			title: 'How to defeat bowser',
			body: 'Lorem ipsum dolor sit amet consectetur',
		},
	]

	res.render('index', { title: 'Home', posts })
})

app.get('/about', (req, res) => {
	res.render('about', { title: 'About' })
})

app.get('/compose', (req, res) => {
	res.render('compose', { title: 'Compose' })
})

app.get('/signin', (req, res) => {
	res.render('signin', { title: 'Sign in' })
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
