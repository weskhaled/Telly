let express = require('express')
let router = express.Router()
const bodyParser = require('body-parser')
// create application/json parser
var jsonParser = bodyParser.json()

const ffmpegServices = require('../controllers/ffmpeg.controller.js')

router.post('/genartethumbs', jsonParser, ffmpegServices.doThumbs)

module.exports = router
