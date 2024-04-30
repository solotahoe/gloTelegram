const {Router} = require('express')
const router = Router()
const {getUser} = require('../controller/telegramController')


router.get("/", getUser)

module.exports = router;