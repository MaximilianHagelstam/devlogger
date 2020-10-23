const express = require('express')
const indexController = require('../controllers/indexController')

const router = express.Router()

router.get('/', indexController.index_home)
router.get('/about', indexController.index_about)
router.get('/profile', indexController.index_profile)

module.exports = router
