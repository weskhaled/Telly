const fs = require('fs')
const ffmpeg = require('fluent-ffmpeg')
const nsg = require('node-sprite-generator')
const Jimp = require('jimp')
const rm = require('rimraf')
const os = require('os')

const startTime = +new Date()
const tmp = os.tmpdir() + '/api-thumbnails'

async function gthumbs(
  file,
  count = 100,
  token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijk4ZGRhOTU3ZTgwZWU3YTBiYTQwN2RlMGNjZjZkYWY1OGVhMWUzMGY2ODZlNjBhMThkOTZmNDA5ODE4NDVmODc2NDkyOGM0YjIyZmU1ZmE2In0.eyJhdWQiOiIyIiwianRpIjoiOThkZGE5NTdlODBlZTdhMGJhNDA3ZGUwY2NmNmRhZjU4ZWExZTMwZjY4NmU2MGExOGQ5NmY0MDk4MTg0NWY4NzY0OTI4YzRiMjJmZTVmYTYiLCJpYXQiOjE1NDg1OTQyMjUsIm5iZiI6MTU0ODU5NDIyNSwiZXhwIjoxNTgwMTMwMjI1LCJzdWIiOiIxIiwic2NvcGVzIjpbIioiXX0.CkMBHavaX6drHK2hntnxI9hzImesT_eK7pxa-ho2iejlTr7U06LRuMyD8nxlujuQtqdXQCd5cSeX0aTzmwRB1gpRDdAd7XUKtMPDbHuUjIPt4SIqDO09OO1hzLW6LJuOfphgW_QkIbtHw2m86BveJvO1-bF0mBe38iF_k7R2-mFjlCac4lv1GXz5hlvTni0NhOC3GaoQyZE_jgJ98ax6JpzLCMrlASC_dvC7LKIGFNZiOK9ks4TtEkOc0mQSeZStzBgxONb00LpPrm3N3_V1iR5qAjO2t1AJ1rD8rtdeq1JGGH_Bv20ZWWaRudnIZFs_A7CyXadcMgJ65HAW-M2P5OAQapaLJ7dw90q5OVrPpWzZZgb9seKasLt86vl7XY9UQ24jI7YEPGIKpqf3ut6rQ1VVyTqiJEFtYxoCRt4b3e9JRpk4IpRB5zLbeiRoP8kU_nDNV0W1wtpivRVyX392_ArzPqW5zop-yowvAOqgtMJK9hBfePi7WXCz2Mhyf8vPXFlhSijnDhmblBTfV44bkbU2yvzenbcWjNG885uVpaqDWcwzeqBU8dnzSkbec93PPMSUbCVGz_Y6vVJ6yD-JtnoxEUYLPTqJu7nwA2cvjECGPWCZz-mcEt6epeH7Jb2bxQgY6cDGSrI0CXDW0dj_a5aUKlzSUmWzyiOGGSFz3AM'
) {
  return await new Promise((resolve, reject) => {
    try {
      ffmpeg(file)
        // .inputOptions('-headers Authorization:' + token)
        // .addOptions('-headers', 'Authorization:Bearer ' + token)
        .addOptions(
          '-headers',
          'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijk4ZGRhOTU3ZTgwZWU3YTBiYTQwN2RlMGNjZjZkYWY1OGVhMWUzMGY2ODZlNjBhMThkOTZmNDA5ODE4NDVmODc2NDkyOGM0YjIyZmU1ZmE2In0.eyJhdWQiOiIyIiwianRpIjoiOThkZGE5NTdlODBlZTdhMGJhNDA3ZGUwY2NmNmRhZjU4ZWExZTMwZjY4NmU2MGExOGQ5NmY0MDk4MTg0NWY4NzY0OTI4YzRiMjJmZTVmYTYiLCJpYXQiOjE1NDg1OTQyMjUsIm5iZiI6MTU0ODU5NDIyNSwiZXhwIjoxNTgwMTMwMjI1LCJzdWIiOiIxIiwic2NvcGVzIjpbIioiXX0.CkMBHavaX6drHK2hntnxI9hzImesT_eK7pxa-ho2iejlTr7U06LRuMyD8nxlujuQtqdXQCd5cSeX0aTzmwRB1gpRDdAd7XUKtMPDbHuUjIPt4SIqDO09OO1hzLW6LJuOfphgW_QkIbtHw2m86BveJvO1-bF0mBe38iF_k7R2-mFjlCac4lv1GXz5hlvTni0NhOC3GaoQyZE_jgJ98ax6JpzLCMrlASC_dvC7LKIGFNZiOK9ks4TtEkOc0mQSeZStzBgxONb00LpPrm3N3_V1iR5qAjO2t1AJ1rD8rtdeq1JGGH_Bv20ZWWaRudnIZFs_A7CyXadcMgJ65HAW-M2P5OAQapaLJ7dw90q5OVrPpWzZZgb9seKasLt86vl7XY9UQ24jI7YEPGIKpqf3ut6rQ1VVyTqiJEFtYxoCRt4b3e9JRpk4IpRB5zLbeiRoP8kU_nDNV0W1wtpivRVyX392_ArzPqW5zop-yowvAOqgtMJK9hBfePi7WXCz2Mhyf8vPXFlhSijnDhmblBTfV44bkbU2yvzenbcWjNG885uVpaqDWcwzeqBU8dnzSkbec93PPMSUbCVGz_Y6vVJ6yD-JtnoxEUYLPTqJu7nwA2cvjECGPWCZz-mcEt6epeH7Jb2bxQgY6cDGSrI0CXDW0dj_a5aUKlzSUmWzyiOGGSFz3AM'
        )
        // .inputOptions('-headers Authorization: ' + token)
        .screenshots({
          count: count,
          folder: tmp,
          filename: 'screenshot%00i.png',
          size: '160x?'
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
                rm(tmp, function() {
                  console.dir('[3/3] Compressing complete!')
                  console.dir(
                    `✨  Done in ${(+new Date() - startTime) / 1000}s.`
                  )
                  resolve({
                    thumbath: os.tmpdir() + '/apiv1thumbnails.jpg'
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
  if (req.body.file) {
    gthumbs(req.body.file, req.body.count)
      .then(data => {
        res.sendFile(data.thumbath) // Set disposition and send it.
        // read binary data
        // let base64 = fs.readFileSync(data.thumbath, 'base64')
        // convert binary data to base64 encoded string
        // let resp = new Buffer(bitmap).toString('base64')
        // res.json({ imgbase64: base64 })
      })
      .catch(err => res.json({ error: 'true', msg: err }))
  } else {
    res.json({ error: 'true', msg: 'file not send' })
  }
}
