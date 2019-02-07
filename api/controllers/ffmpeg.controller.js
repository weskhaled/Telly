const fs = require('fs')
const ffmpeg = require('fluent-ffmpeg')
const nsg = require('node-sprite-generator')
const Jimp = require('jimp')
const rm = require('rimraf')
const os = require('os')

const startTime = +new Date()
const tmp = os.tmpdir() + '/api-thumbnails'

async function gthumbs(file, count = 100) {
  return await new Promise((resolve, reject) => {
    try {
      ffmpeg(file)
        .screenshots({
          count: count,
          folder: tmp,
          filename: 'screenshot%00i.png',
          size: '160x?'
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
exports.doThumbs = (req, res, next) => {
  // res.end(JSON.stringify({ re: req.body }))
  // res.status(200).json({ re: req.body.file })
  // res.end(JSON.stringify({ re: req.body.file }))
  // return
  if (req.body.file && req.body.count) {
    gthumbs(req.body.file, req.body.count)
      .then(data => {
        // res.sendFile(data) // Set disposition and send it.
        // read binary data
        let base64 = fs.readFileSync(data.thumbath, 'base64')
        // convert binary data to base64 encoded string
        // let resp = new Buffer(bitmap).toString('base64')
        res.json({ metadata: data.metadata, imgbase64: base64 })
      })
      .catch(err => res.json({ error: 'true', msg: err }))
  } else {
    res.json({ error: 'true', msg: 'file not send' })
  }
}
