
const express = require('express')
const bodyParser = require('body-parser')


// var ffmpeg = require('fluent-ffmpeg');
// var nsg = require('node-sprite-generator');
// var Jimp = require('jimp');
// var rm = require('rimraf');
// var program = require('commander');
// var os = require('os');

// var startTime = +new Date();
// var tmp = os.tmpdir() + '/dplayer-thumbnails'



// function gthumbs(file) {
// 	ffmpeg(file)
// 		.screenshots({
// 				count: 100,
// 				folder: tmp,
// 				filename: 'screenshot%00i.png',
// 				size: '160x?'
// 		})
// 		.on('end', function () {
// 				console.log('[1/3] Screenshots generated!');
// 				nsg({
// 						src: [
// 								tmp + '/*.png'
// 						],
// 						spritePath: tmp + '/sprite.png',
// 						stylesheetPath: tmp + '/sprite.css',
// 						layout: 'horizontal',
// 						compositor: 'jimp'
// 				}, function (err) {
// 						console.log('[2/3] Sprite generated!');
// 						Jimp.read(tmp + '/sprite.png', function (err, lenna) {
// 								if (err) throw err;
// 								lenna.quality(parseInt(program.quality))
// 										.write(program.output);
// 								rm(tmp, function () {
// 										console.log('[3/3] Compressing complete!');
// 										console.log(`✨  Done in ${(+new Date() - startTime) / 1000}s.`);
// 								});
// 						});
// 				});
// 		});
// }
// ffmpeg -ss 3 -i input.mp4 -vf "select=gt(scene\,0.4)" -frames:v 5 -vsync vfr -vf fps=fps=1/600 out%02d.jpg
// Create app
const app = express()

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// POST /login gets urlencoded bodies
app.post('/test', urlencodedParser, function (req, res) {
  res.send('welcome, ' + req.body.username)
})

// POST /api/users gets JSON bodies
app.post('/test2', jsonParser, function (req, res) {
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