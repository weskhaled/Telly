const express = require('express')
const bodyParser = require('body-parser')

const fs = require('fs')
const ffmpeg = require('fluent-ffmpeg')
const nsg = require('node-sprite-generator')
const Jimp = require('jimp')
const rm = require('rimraf')
const os = require('os')

const startTime = +new Date()
const tmp = os.tmpdir() + '/api-thumbnails'
async function gthumbs(file) {
  return await new Promise((resolve, reject) => {
    try {
      ffmpeg(file)
        .screenshots({
          count: 1,
          folder: tmp,
          filename: 'screenshot%00i.png',
          size: '1600x?'
        })
        .on('progress', progress => {
          console.dir(`[ffmpeg] ${JSON.stringify(progress)}`)
        })
        .on('error', err => {
          console.dir('Cannot process video: ' + err.message)
          reject(err)
        })
        .on('end', function() {
          console.dir('[1/3] Screenshots generated!')
          nsg(
            {
              src: [tmp + '/*.png'],
              spritePath: tmp + '/sprite.png',
              stylesheetPath: tmp + '/sprite.css',
              layout: 'horizontal',
              compositor: 'jimp'
            },
            function(err) {
              console.dir('[2/3] Sprite generated!')
              if (err) reject(err)
              Jimp.read(tmp + '/sprite.png', function(err, lenna) {
                if (err) reject(err)
                lenna
                  .quality(parseInt(60))
                  .write(os.tmpdir() + '/apiv1thumbnails.jpg')
                // .write('/Users/Peaksource/Desktop/thumbnails.jpg')
                rm(tmp, function() {
                  console.dir('[3/3] Compressing complete!')
                  console.dir(
                    `✨  Done in ${(+new Date() - startTime) / 1000}s.`
                  )
                  ffmpeg(file)
                    .on('error', err => {
                      console.dir(`[ffmpeg] error: ${err.message}`)
                      reject(err)
                    })
                    .ffprobe(function(err, data) {
                      resolve({
                        metadata: data,
                        thumbath: os.tmpdir() + '/apiv1thumbnails.jpg'
                      })
                    })
                  // resolve(os.tmpdir() + '/apiv1thumbnails.jpg')
                })
              })
            }
          )
        })
    } catch (err) {
      reject(err)
    }
  })
}
async function getmeta(file) {
  return await new Promise((resolve, reject) => {
    try {
      ffmpeg(file)
        .on('error', err => {
          console.dir(`[ffmpeg] error: ${err.message}`)
          reject(err)
        })
        .ffprobe(function(err, data) {
          resolve({ metadata: data })
        })
    } catch (err) {
      reject(err)
    }
  })
}
// Create app
const app = express()

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// POST /login gets urlencoded bodies
app.post('/getthumb', jsonParser, function(req, res) {
  if (req.body.file) {
    if (fs.existsSync(req.body.file)) {
      gthumbs(req.body.file)
        .then(data => {
          // res.json({ token: req.body.username, data: meta })
          // res.json({ token: req.body.username, data: meta.filepath })
          // res.sendFile(data) // Set disposition and send it.

          // read binary data
          let base64 = fs.readFileSync(data.thumbath, 'base64')
          // convert binary data to base64 encoded string
          // let resp = new Buffer(bitmap).toString('base64')
          res.json({ metadata: data.metadata, imgbase64: base64 })
        })
        .catch(err => res.json({ error: 'true', msg: err }))
    } else {
      res.json({ error: 'true', msg: 'file not found' })
    }
  } else {
    res.json({ error: 'true', msg: 'file not send' })
  }
})
// POST /login gets urlencoded bodies
app.post('/getvideometa', jsonParser, function(req, res) {
  if (req.body.file) {
    if (fs.existsSync(req.body.file)) {
      getmeta(req.body.file)
        .then(meta => {
          res.json(meta)
          // res.json({ token: req.body.username, data: meta.filepath })
        })
        .catch(err => res.json({ error: 'true', msg: err }))
    } else res.json({ error: 'true', msg: 'file not found' })
  } else res.json({ error: 'true', msg: 'file not found' })
})

// POST /api/users gets JSON bodies
app.post('/test2', jsonParser, function(req, res) {
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
