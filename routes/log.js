const express = require('express')
const logController = require('../controllers/logController')

// Express router
const router = express.Router()

// Routes
router.get('/', logController.log_index)
router.post('/', logController.log_add_post)
router.get('/add', logController.log_add_get)

module.exports = router
