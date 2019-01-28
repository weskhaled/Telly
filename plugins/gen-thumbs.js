// var ffmpeg = require('/usr/local/lib/node_modules/dplayer-thumbnails/node_modules/fluent-ffmpeg')
// var nsg = require('/usr/local/lib/node_modules/dplayer-thumbnails/node_modules/node-sprite-generator')
// var Jimp = require('/usr/local/lib/node_modules/dplayer-thumbnails/node_modules/jimp')
// var rm = require('/usr/local/lib/node_modules/dplayer-thumbnails/node_modules/rimraf')
// var os = require('os')
// import { ffmpeg } from 'fluent-ffmpeg'
// import { nsg } from 'node-sprite-generator'
// import { Jimp } from 'jimp'
// import { rm } from 'rimraf'
// import { os } from 'os'

// var startTime = +new Date()
// // var tmp = os.tmpdir() + '/dplayer-thumbnails'
// var tmp = '../static'

// export function genThumbs(
//   file = '/Users/weskhaled/Documents/test1.mov',
//   quality = 60,
//   output = '/Users/weskhaled/Desktop'
// ) {
//   ffmpeg(file)
//     .screenshots({
//       count: 100,
//       folder: tmp,
//       filename: 'screenshot%00i.png',
//       size: '160x?'
//     })
//     .on('end', function() {
//       console.log('[1/3] Screenshots generated!')
//       nsg(
//         {
//           src: [tmp + '/*.png'],
//           spritePath: tmp + '/sprite.png',
//           stylesheetPath: tmp + '/sprite.css',
//           layout: 'horizontal',
//           compositor: 'jimp'
//         },
//         function() {
//           console.log('[2/3] Sprite generated!')
//           Jimp.read(tmp + '/sprite.png', function(err, lenna) {
//             if (err) throw err
//             lenna.quality(parseInt(quality)).write(output)
//             rm(tmp, function() {
//               console.log('[3/3] Compressing complete!')
//               console.log(`✨  Done in ${(+new Date() - startTime) / 1000}s.`)
//             })
//           })
//         }
//       )
//     })
// }
var ffmpeg = require('fluent-ffmpeg')
// var command = ffmpeg();

export function genThumbs(
  file = '/Users/weskhaled/Documents/test1.mov',
  quality = 60,
  output = '/Users/weskhaled/Desktop'
) {
  var command = ffmpeg('/Users/weskhaled/Documents/test1.mov').ffprobe(function(
    err,
    data
  ) {
    console.log('file2 metadata:')
    console.dir(data)
  })
  // console.log(command)
}
