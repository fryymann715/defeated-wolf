const express = require('express')
const router = express.Router()
const doStuff = require('../database/main')



router.get('/', doStuff.handle )

router.get( '/custom_pizza', doStuff.handlePizza )

module.exports = router
