const express = require('express')
const router = express.Router();

const mailer_controller = require('../controller/mailer')

router.post('/mailer', mailer_controller.handleMail)

module.exports = router