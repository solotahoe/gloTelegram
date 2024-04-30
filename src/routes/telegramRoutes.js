const {Router} = require('express')
const router = Router()
const {getTelegramLogin, getTelegramOtp, getSomething, createChannel, resendCode} = require('../controller/telegramController')


router.post("/", getTelegramLogin)
router.post("/verify", getTelegramOtp)
router.post("/test", getSomething)
router.post("/create-group", createChannel)
router.post("/resend-otp", resendCode)

module.exports = router;