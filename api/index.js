const express = require('express')
const bodyParser = require('body-parser')

var fs = require('fs')
var ffmpeg = require('fluent-ffmpeg')
var nsg = require('node-sprite-generator')
var Jimp = require('jimp')
var rm = require('rimraf')
var os = require('os')

var startTime = +new Date()
var tmp = os.tmpdir() + '/dplayer-thumbnails'

async function gthumbs(file) {
  let res = new Object()
  let promise = new Promise((resolve, reject) => {
    // try {
    //   ffmpeg(file)
    //     .screenshots({
    //       count: 100,
    //       folder: tmp,
    //       filename: 'screenshot%00i.png',
    //       size: '160x?'
    //     })
    //     .on('progress', progress => {
    //       console.dir(`[ffmpeg] ${JSON.stringify(progress)}`)
    //     })
    //     .on('error', err => {
    //       console.dir(`[ffmpeg] error: ${err.message}`)
    //       reject(err)
    //     })
    //     .on('end', function() {
    //       console.dir('[1/3] Screenshots generated!')
    //       nsg(
    //         {
    //           src: [tmp + '/*.png'],
    //           spritePath: tmp + '/sprite.png',
    //           stylesheetPath: tmp + '/sprite.css',
    //           layout: 'horizontal',
    //           compositor: 'jimp'
    //         },
    //         function(err) {
    //           console.dir('[2/3] Sprite generated!')
    //           Jimp.read(tmp + '/sprite.png', function(err, lenna) {
    //             if (err) throw err
    //             lenna
    //               .quality(parseInt(60))
    //               .write('/Users/weskhaled/Desktop/thumbnails.jpg')
    //             rm(tmp, function() {
    //               console.dir('[3/3] Compressing complete!')
    //               console.dir(
    //                 `✨  Done in ${(+new Date() - startTime) / 1000}s.`
    //               )
    //               ffmpeg(file).ffprobe(function(err, data) {
    //                 res.metadata = data
    //                 res.filepath = '/Users/weskhaled/Desktop/thumbnails.jpg'
    //                 resolve(res)
    //               })
    //             })
    //           })
    //         }
    //       )
    //     })
    // } catch (err) {
    //   reject(err)
    // }
    try {
      ffmpeg(file)
        .on('error', err => {
          console.dir(`[ffmpeg] error: ${err.message}`)
          reject(err)
        })
        .ffprobe(function(err, data) {
          res.metadata = data
          resolve(res)
        })
    } catch (err) {
      reject(err)
    }
  })
  // wait for the promise to resolve
  let result = await promise
  // console.dir(result)
  return result
}
// Create app
const app = express()

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// POST /login gets urlencoded bodies
app.post('/test', jsonParser, async function(req, res) {
  if (req.body.file && fs.existsSync(req.body.file)) {
    gthumbs(req.body.file).then(meta => {
      res.json({ token: req.body.username, data: meta })
    })
  } else res.json({ error: 'true', msg: 'file not send' })
})

// POST /api/users gets JSON bodies
app.post('/test2', jsonParser, function(req, res) {
  // create user in req.body
  res.send('welcome, ' + req.body.username)
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err) // eslint-disable-line no-console
  res.status(401).send(err + '')
})

// -- export app --
module.exports = {
  path: '/api/tools',
  handler: app
}
