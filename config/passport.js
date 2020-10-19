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
			clientID:
				'149810761718-elqa75ebc5vml55e186nu81j2j5slur9.apps.googleusercontent.com',
			clientSecret: 'iaLT81oAzVKJiBF8lRRc-7vv',
			callbackURL: 'http://localhost:3000/google/callback',
		},
		(accessToken, refreshToken, profile, done) => {
			// Use profile info to check if the user is registerd in db
			return done(null, profile)
		}
	)
)
