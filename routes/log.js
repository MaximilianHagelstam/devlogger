const express = require('express')
const logController = require('../controllers/logController')

const router = express.Router()

router.get('/', logController.log_index)
router.post('/', logController.log_add_post)
router.get('/add', logController.log_add_get)

module.exports = router
