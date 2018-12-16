<template>
  <div class="video_player_wpr d-flex align-items-center" id="player">
    <video
      crossorigin 
      playsinline 
      poster="images/bg_1.jpg"/>
    <div class="player-controller-wrp px-3 py-2">
      <div class="player-controller">
          <div class="ply-progress">
              <a-slider 
              :min="videowrp.min" 
              :max="videowrp.max" 
              :value="videowrp.value"
              :tipFormatter="null"
              @change="onChange" 
              @afterChange="onAfterChange"/>
            <span 
              :data-buffered="videowrp.buffered" 
              :style="[{'width': videowrp.buffered + '%'}]"
              class="buffered"/>
          </div>
          <div class="ply-controles d-flex">
            <div class="mr-auto d-flex">
                <a-button-group
                  class="d-flex justify-content-start">
                  <a-button 
                    ghost
                    class="d-flex justify-content-center align-items-center mr-1"
                    @click="">
                    <i :class="'ti-control-backward'"/>
                  </a-button>
                  <a-button 
                    ghost
                    class="d-flex justify-content-center align-items-center mr-1"
                    @click="toggleplay()">
                    <i :class="videowrp.state == 'pause' ? 'ti-control-play' : 'ti-control-pause'"/>
                  </a-button>
                  <a-button 
                    ghost
                    class="d-flex justify-content-center align-items-center mr-1"
                    @click="">
                    <i :class="'ti-control-forward'"/>
                  </a-button>
                </a-button-group>
                <div class="ply-volume d-flex justify-content-start align-items-center">
                  <a-button 
                    ghost
                    class="d-flex justify-content-center align-items-center mr-1 btn-volume"
                    @click="togglemuted()">
                    <i v-if="videowrp.volume == 0" class="fa fa-volume-off"/>
                    <i v-else-if="60 >= videowrp.volume > 0" class="fa fa-volume-down"/>
                    <i v-else-if="videowrp.volume > 60" class="fa fa-volume-up"/>
                  </a-button>
                  <a-slider class="m-0" @change="onChangeVolume" v-model="videowrp.volume" :tipFormatter="() => {return `${videowrp.volume}%`;}" />
                </div>
            </div>
            <div class="d-flex ml-auto">
              <div class="duration d-flex justify-content-center align-items-center">
                <span>{{videowrp.currentTime}} </span> / <span> {{videowrp.duration}}</span>
              </div>
              <a-button 
                ghost 
                class="d-flex justify-content-center align-items-center"
                @click="togglefullscreen()">
                <i :class="videowrp.fullscreen ? 'ti-close' : 'ti-layout-media-center-alt'"/>
              </a-button>
            </div>
          </div>
      </div>
    </div> 
    <div class="mask w-100 h-100">
      <div class="d-flex justify-content-center align-items-center flex-column w-100 h-100">
          <a-button 
            ghost
            shape="circle"
            size="large"
            class="d-flex justify-content-center align-items-center m-2"
            @click="toggleplay()">
            <i :class="videowrp.state == 'pause' ? 'ml-1 fa fa-play' : 'ti-control-pause'"/>
          </a-button>
          <div class="d-flex bd-highlight w-100 justify-content-center p-2">
              <a-button 
                ghost
                shape="circle"
                size="large"
                class="d-flex justify-content-center align-items-center m-2"
                @click="toggleplay()">
                <i :class="videowrp.state == 'pause' ? 'ml-1 fa fa-play' : 'ti-control-pause'"/>
              </a-button>
          </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    video: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      player: false,
      videowrp: {
        value: 0,
        min: 0,
        max: 100,
        buffered: 0,
        state: 'pause',
        fullscreen: false,
        volume: 30,
        muted: false,
        volumevisible: false,
        duration: '00:00:00',
        currentTime: '00:00:00'
      }
    }
  },
  computed: {},
  mounted() {
    let self = this
    this.$nextTick(function() {
      var hlsUrl = 'videos/1/1.m3u8'
      var video = document.querySelector('video')
      if (Hls.isSupported()) {
        var hls = new Hls({ autoStartLoad: false })
        hls.loadSource(hlsUrl)
        hls.attachMedia(video)
      } else {
        var nativeHLS = video.canPlayType('application/vnd.apple.mpegurl')
        video.src = nativeHLS ? hlsUrl : fallbackUrl
      }
      hls.startLoad()
      video.addEventListener(
        'loadedmetadata',
        function() {
          console.log('loaded')
          console.log('moment duration : ' + moment.utc(self.player.duration * 1000).format('HH:mm:ss'))
          self.videowrp.duration = moment.utc(self.player.duration * 1000).format('HH:mm:ss')
        },
        { once: false }
      )
      self.player = video
      // console.log('moment duration : ' + moment.utc(self.player.duration * 1000).format('HH:mm:ss'))
      // self.videowrp.max = (self.player.currentTime / self.player.duration) * 100
      self.player.addEventListener(
        'timeupdate',
        event => {
          self.videowrp.currentTime = moment.utc(self.player.currentTime * 1000).format('HH:mm:ss')
          let percentage = Math.floor(
            (100 / self.player.duration) * self.player.currentTime
          )
          // progressBar.value = percentage
          self.videowrp.value =
            (self.player.currentTime / self.player.duration) * 100
        },
        false
      )
      self.player.addEventListener('progress', () => {
        var range = 0
        var bf = self.player.buffered
        var time = self.player.currentTime
        while (!(bf.start(range) <= time && time <= bf.end(range))) {
          range += 1
        }
        var loadStartPercentage = bf.start(range) / self.player.duration
        var loadEndPercentage = bf.end(range) / self.player.duration
        var loadPercentage = loadEndPercentage - loadStartPercentage

        // let progressBarbf = document.getElementById('progress-bar-buffer')
        // progressBarbf.value = loadEndPercentage * 100
        self.videowrp.buffered = loadEndPercentage * 100
      })
    })
  },
  methods: {
    onChange(value) {
      this.videowrp.value = value
      this.player.currentTime = (value * this.player.duration) / 100
    },
    onAfterChange(value) {
      console.log('afterChange: ', value)
    },
    toggleplay() {
      let playState = this.player.paused ? 'play' : 'pause'
      this.player[playState](); // Call play or paused method 
      this.videowrp.state = playState
    },
    togglefullscreen() {
      let self = this;
      var elem = document.getElementById("player")
      this.videowrp.fullscreen ? exitfullscreen(elem) : fullscreen(elem)

      function fullscreen(elem) {
        let fullscreen = elem.webkitRequestFullscreen || elem.mozRequestFullScreen || elem.msRequestFullscreen
        fullscreen.call(elem)
        self.videowrp.fullscreen = true
      }
      function exitfullscreen(elem) {
        self.videowrp.fullscreen = false
        if(document.exitFullscreen) {
          document.exitFullscreen();
        } else if(document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if(document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      }
    },
    onChangeVolume(value) {
      this.player.muted = false
      this.player.volume = value/100
    },
    togglemuted() {
      this.player.muted = !this.player.muted
      this.player.muted ? this.videowrp.volume = 0 : this.videowrp.volume = 30
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
