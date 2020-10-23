// Redirects to /logs
const index_home = (req, res) => {
	res.redirect('/logs')
}

// Renders EJS page
const index_about = (req, res) => {
	res.render('about', { title: 'About' })
}

// View profile only if our are signed in
const index_profile = (req, res) => {
	try {
		res.render('profile', {
			title: 'Profile',
			displayName: req.user.displayName,
			image: req.user.image,
		})
	} catch (err) {
		console.log(err)
		res.status(404).render('404', { title: 'Page not found' })
	}
}

module.exports = {
	index_home,
	index_about,
	index_profile,
}
