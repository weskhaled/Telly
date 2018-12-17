<template>
  <section class="container-fluid">
    <a-row type="flex">
      <a-col :span="24">
        <!-- vimeo div element -->
        <div class="videoplayer">
          <Player :video="video"/>
          <!-- <video
            crossorigin 
            playsinline 
            controls
            poster="images/bg_1.jpg"/>
          <progress 
            id="progress-bar" 
            min="0" 
            max="100" 
            value="0">0% played</progress>
          <progress 
            id="progress-bar-buffer" 
            min="0" 
            max="100" 
            value="0">0% played</progress> -->
          <!-- <video
            id="player"
            ref="plyr"
            controls
            crossorigin
            playsinline
            poster="images/bg_1.jpg" >
            <source
              src="~assets/videos/test.mp4"
              type="video/mp4"
              size="576">
            </video> -->
          <!-- <div id="player" ref="plyr" data-plyr-provider="vimeo" data-plyr-embed-id="102401420" /> -->
        </div>
      </a-col>
    </a-row>
  </section>
</template>

<script>
import Player from '~/components/shared/Player.vue'
// import Plyr from 'plyr';
export default {
  // middleware: ['auth'],
  components: {
    Player
  },
  data() {
    return {
      drawervisible: false,
      player: null,
      user: {
        username: 'weskhaled@gmail.com',
        password: '15021989'
      },
      video: {
        url: 'videos/1/1.m3u8'
      }
    }
  },
  computed: {},
  mounted() {
    let self = this
    // console.log(self.$refs.plyr)
    this.$nextTick(function() {
      // self.player = new Plyr.setup('#player', {})[0]
      // if (self.player !== null) {
      //   self.player.on('ready', function(event) {
      //     event.detail.plyr.on('playing', function(event) {
      //       console.log('playing ...')
      //     })
      //   })
      // }
      // test 1
      // document.addEventListener('DOMContentLoaded', () => {
      // const source = 'videos/1/1.m3u8'
      // const video = document.querySelector('video')
      // // For more options see: https://github.com/sampotts/plyr/#options
      // // captions.update is required for captions to work with hls.js
      // self.player = new Plyr(video, {
      //   captions: {
      //     active: true,
      //     update: true,
      //     language: 'en'
      //   }
      // })
      // if (!Hls.isSupported()) {
      //   video.src = source
      // } else {
      //   // For more Hls.js options, see https://github.com/dailymotion/hls.js
      //   const hls = new Hls()
      //   hls.loadSource(source)
      //   hls.attachMedia(video)
      //   window.hls = hls
      //   // Handle changing captions
      //   self.player.on('languagechange', () => {
      //     // Caption support is still flaky. See: https://github.com/sampotts/plyr/issues/994
      //     setTimeout(() => (hls.subtitleTrack = self.player.currentTrack), 50)
      //   })
      //   self.player.on('seeked', () => {
      //     console.log('test seeked')
      //   })
      // }
      // Expose player so it can be used from the console
      // window.player = player
      // })
      // test 2
      // var hlsUrl = 'videos/1/1.m3u8'
      // var video = document.querySelector('video')
      // if (Hls.isSupported()) {
      //   var hls = new Hls({ autoStartLoad: false })
      //   hls.loadSource(hlsUrl)
      //   hls.attachMedia(video)
      // } else {
      //   var nativeHLS = video.canPlayType('application/vnd.apple.mpegurl')
      //   video.src = nativeHLS ? hlsUrl : fallbackUrl
      // }
      // video.addEventListener(
      //   'play',
      //   function() {
      //     hls.startLoad()
      //   },
      //   { once: true }
      // )
      // self.player = video
      // self.player.addEventListener(
      //   'timeupdate',
      //   event => {
      //     let progressBar = document.getElementById('progress-bar')
      //     let percentage = Math.floor(
      //       (100 / self.player.duration) * self.player.currentTime
      //     )
      //     progressBar.value = percentage
      //     progressBar.innerHTML = percentage + '% played'
      //   },
      //   false
      // )
      // self.player.addEventListener('progress', () => {
      //   var range = 0
      //   var bf = self.player.buffered
      //   var time = self.player.currentTime
      //   while (!(bf.start(range) <= time && time <= bf.end(range))) {
      //     range += 1
      //   }
      //   var loadStartPercentage = bf.start(range) / self.player.duration
      //   var loadEndPercentage = bf.end(range) / self.player.duration
      //   var loadPercentage = loadEndPercentage - loadStartPercentage
      //   console.log(loadEndPercentage)
      //   let progressBarbf = document.getElementById('progress-bar-buffer')
      //   progressBarbf.value = loadEndPercentage * 100
      //   progressBarbf.innerHTML = loadEndPercentage + '% played'
      // })
      // new Plyr(video, { displayDuration: 10, invertTime: false })
    })
    let EVENTSTOPNAV = [
      {
        name: 'event-prev',
        callback: () => {
          this.player.pause()
        },
        hide: true,
        disabled: false,
        icon_classes: 'anticon anticon-like'
      },
      {
        name: 'event-next',
        callback: () => {
          this.player.play()
        },
        hide: true,
        disabled: false,
        icon_classes: 'anticon anticon-dislike',
      }
    ]
    this.$root.$emit('rebindnavevents', EVENTSTOPNAV)
    // this.$auth.loginWith('laravel.passport').catch(e => {
    //   this.error = e + ''
    // })
    // this.passwordGrantLogin()
    console.log(process.env.LARAVEL_ENDPOINT)
  },
  beforeRouteLeave(to, from, next) {
    let self = this
    if (this.player !== null) {
      setTimeout(function() {
        self.player.destroy()
        self.player = null
        next()
      }, 10)
    } else {
      next()
    }
  },
  methods: {
    async customPasswordGrantLogin() {
      await this.$auth.loginWith('password_grant_custom', {
        data: this.user
      })
      this.$router.replace('/')
    },
    async passwordGrantLogin() {
      await this.$auth.loginWith('password_grant', {
        data: {
          grant_type: 'password',
          client_id: process.env.PASSPORT_CLIENT_ID,
          client_secret: process.env.PASSPORT_CLIENT_SECRET,
          scope: '*',
          username: this.user.username,
          password: this.user.password
        }
      })
      this.$router.replace('/')
    }
  }
}
</script>
