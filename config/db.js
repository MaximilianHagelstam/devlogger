const mongoose = require('mongoose')

/* const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: true,
		})

		console.log(`MongoDB connected: ${conn.connection.host}`)
	} catch (err) {
		console.error(err)
		process.exit(1)
	}
} */

const dbURI =
	'mongodb+srv://maximilian-hagelstam:rSDWUV6VnMn7zP@cluster0.u07gj.mongodb.net/devlogger-db?retryWrites=true&w=majority'

const connectDB = () => {
	mongoose
		.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: true,
		})
		.then(() => {
			// console.log(`MongoDB connected: ${conn.connection.host}`)
			console.log('connected to db')
		})
		.catch((err) => {
			console.error(err)
			process.exit(1)
		})
}

module.exports = connectDB
