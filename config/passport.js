const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy

// Session functions
passport.serializeUser((user, done) => {
	done(null, user)
})

passport.deserializeUser((user, done) => {
	done(null, user)
})

// Google auth
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: 'http://localhost:3000/google/callback',
		},
		(accessToken, refreshToken, profile, done) => {
			// Use profile info to check if the user is registerd in db
			return done(null, profile)
		}
	)
)
