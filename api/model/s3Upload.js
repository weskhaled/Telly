var express = require('express')
var router = express.Router()
var fs = require('fs')
var path = require('path')
var bodyParser = require('body-parser')
var aws = require('aws-sdk')
var multer = require('multer')
var ffmpeg = require('fluent-ffmpeg')
var multerS3 = require('multer-s3')
aws.config.update({
  accessKeyId: 'AKIAJNAUFHT6BYVEVOAA',
  secretAccessKey: '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',
  region: 'eu-west-1'
})
var s3 = new aws.S3()
var bucket = 'weskhaled-test'

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucket,
    key: function(req, file, cb) {
      cb(null, file.originalname)
    },
    acl: 'public-read'
  })
})

router.post('/upload', upload.single('file'), function(req, res, next) {
  var fileInfo = path.parse(req.file.originalname)

  //   if (fileInfo.ext === '.gif') {
  var videoPath = '/uploads/' + fileInfo.name + '.mp4'
  uploadFile(videoPath, fileInfo.name + '.mp4')

  // ffmpeg(req.file.location)
  //   .output(videoPath)
  //   .on('end', function() {
  //     console.log('[ffmpeg] processing done')
  //   })
  //   .run()
  //   }

  res.end()
})

//----------------------------------------------------
function uploadFile(source, target) {
  fs.readFile(source, 'base64', function(err, data) {
    if (!err) {
      var params = {
        Bucket: bucket,
        Key: target,
        Body: data,
        ContentType: 'video/mp4'
      }

      s3.putObject(params, function(err, data) {
        if (!err) {
          console.dir('[s3] file uploaded:')
          console.dir(data)
          fs.unlink(source) // optionally delete the file
        } else {
          console.dir(err)
        }
      }).on('httpUploadProgress', function(progress) {
        console.dir(progress.loaded + ' of ' + progress.total + ' bytes')
      })
    }
  })
}

module.exports = router
