<template>
  <div class="video_player_wpr d-flex align-items-center" id="player" :style="videowrp.mouse.hiden ? {'cursor' : 'none'} : {}">
    <video
      class="" 
      webkit-playsinline="" 
      playsinline="" 
      poster="images/bg_1.jpg" 
      preload="none" 
      src=""/> 
    <div class="player-controller-wrp px-3 py-2">
      <div class="player-controller">
          <div class="ply-progress clearfix"
            ref="progressbar"
            @mouseover="mouseOverProgress"
            @mouseleave="mouseleaveProgress">
            <a-slider 
            :disabled="videowrp.loading"
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
            <span  
              :style="[videowrp.loading ? {'opacity': '1'} : {}]"
              class="onload progress-bar-striped progress-bar-animated"/>
            <span class="w-100 tooltipprogress">
              <span class="tooltip-content" :class="videowrp.tooltip ? 'hover' : ''" :style="[{'left' : videowrp.tooltippos}]">
                <span class="tooltip-text">
                  <span class="tooltip-inner">
                    <img src="images/bg_1.jpg" class="img-responsive" style="width: 100%; height: 100%;">
                  </span>
                </span>
              </span>
            </span>  
          </div>
          <div class="ply-controles d-flex">
            <div class="mr-auto d-flex">
                <a-button-group
                  class="d-flex justify-content-start">
                  <a-button 
                    ghost
                    class="px-1 d-flex justify-content-center align-items-center mr-1">
                    <i :class="'ti-control-backward'"/>
                  </a-button>
                  <a-button 
                    ghost
                    :disabled="videowrp.loading"
                    class="px-2 d-flex justify-content-center align-items-center mr-1"
                    @click="toggleplay()">
                    <i :class="videowrp.state == 'pause' ? 'ti-control-play' : 'ti-control-pause'"/>
                  </a-button>
                  <a-button 
                    ghost
                    class="px-1 d-flex justify-content-center align-items-center mr-1">
                    <i :class="'ti-control-forward'"/>
                  </a-button>
                </a-button-group>
                <div class="ply-volume d-flex justify-content-start align-items-center">
                  <a-button 
                    ghost
                    class="d-flex justify-content-center align-items-center mr-1 btn-volume px-1"
                    @click="togglemuted()">
                    <i v-if="videowrp.volume == 0" class="fa fa-volume-off"/>
                    <i v-else-if="60 >= videowrp.volume > 0" class="fa fa-volume-down"/>
                    <i v-else-if="videowrp.volume > 60" class="fa fa-volume-up"/>
                  </a-button>
                  <a-slider class="m-0 mr-3" @change="onChangeVolume" v-model="videowrp.volume" :tipFormatter="() => {return `${videowrp.volume}%`;}" />
                </div>
            </div>
            <div class="d-flex ml-auto">
              <div class="duration d-flex justify-content-center align-items-center">
                <span>{{videowrp.currentTime}} </span> / <span> {{videowrp.duration}}</span>
              </div>
              <a-button 
                ghost 
                class="px-2 mr-1 d-flex justify-content-center align-items-center"
                @click="() => {videowrp.extras = !videowrp.extras}">
                <i :class="videowrp.extras ? 'ti-close' : 'ti-more'"/>
              </a-button>
              <a-button 
                ghost 
                class="px-2 mr-1 d-flex justify-content-center align-items-center"
                @click="togglepipscreen()">
                <i :class="videowrp.pip ? 'ti-close' : 'ti-layers'"/>
              </a-button>
              <a-button 
                ghost 
                class="px-2 mr-2 d-flex justify-content-center align-items-center"
                @click="togglefullscreen()">
                <i :class="videowrp.fullscreen ? 'ti-close' : 'ti-layout-media-center-alt'"/>
              </a-button>
            </div>
          </div>
      </div>
    </div> 
    <div 
      class="mask w-100 h-100" 
      ref="mask"
      @mousemove="mouseMoveMask"
      @mouseover="mouseOverMask"
      @mouseleave="mouseleaveMask">
      <div 
        class="d-flex align-items-center flex-column justify-content-end pb-5 w-100 h-100"
        :style="[videowrp.state == 'pause' ? {'visibility' : 'visible', 'opacity' : '0.95'} : {}]">
          <div class="w-100 align-items-center py-3 d-flex justify-content-center">
            <a-button 
              ghost
              shape="circle"
              size="large"
              class="d-flex justify-content-center align-items-center m-2"
              :disabled="videowrp.loading"
              @click="toggleplay()">
              <i :class="videowrp.state == 'pause' ? 'ml-1 fa fa-play' : 'ti-control-pause'"/>
            </a-button>
          </div>
          <div :class="{'d-flex' : videowrp.state == 'pause', 'hided' : videowrp.slider.hided }" class="slider-wrp bd-highlight w-100 justify-content-center p-3 position-relative">
            <div class="toggleslider d-flex align-items-end flex-column" :style="[videowrp.slider.hided ? {'bottom': '15px', 'top': 'auto'} : {}]">
              <button 
                ghost
                class="text-light action action--close m-1"
                @click="videowrp.slider.hided = !videowrp.slider.hided">
                <svg :style="[videowrp.slider.hided ? {'transform': 'rotate(180deg)'} : {}]" class="icon icon--close"><use :xlink:href="videowrp.slider.hided ? '#icon-caret' : '#icon-caret'"></use></svg>
              </button>
            </div>
            <!-- Slider main container -->
            <div class="swiper-container">
              <!-- Additional required wrapper -->
              <div class="swiper-wrapper">
                <!-- Slides -->
                <div v-for="index in 14"
                  :key="index"
                  class="swiper-slide">
                  <a-card hoverable class="">
                    <img
                      alt="example"
                      class="img-fluid"
                      src="images/bg_1.jpg"
                      slot="cover"
                    />
                    <template class="ant-card-actions" slot="actions">
                      <a-icon type="setting" />
                      <a-icon type="edit" />
                      <a-icon type="ellipsis" />
                    </template>
                    <a-card-meta
                      title="Card title"
                      description="This is the description">
                      <a-avatar slot="avatar" src="images/bg_1.jpg" />
                    </a-card-meta>
                  </a-card>
                </div>
              </div>
              <!-- If we need pagination 
              <div class="swiper-pagination"/>  -->

              <!-- If we need navigation buttons -->
              <nav class="">
                <a 
                  class="prev text-right" 
                  href="javascript:void(0)">
                  <span class="icon-wrap"><i class="icon fa fa-angle-left"/></span>
                </a>
                <a 
                  class="next text-left" 
                  href="javascript:void(0)">
                  <span class="icon-wrap"><i class="icon fa fa-angle-right"/></span>
                </a>
              </nav>
            </div>
          </div>
      </div>
    </div>
    <div class="extras w-100 p-0" :class="videowrp.extras ? 'open' : ''">
      <div class="extras-header d-flex px-1 py-2">
        <h3 class="text-center title d-flex m-0">test</h3>
        <a-button 
          ghost 
          class="p-1 ml-auto d-flex justify-content-center align-items-center"
          @click="videowrp.extras = false">
          <i class="ti-close"/>
        </a-button>
      </div>
      <h1 class="text-center">test</h1>
    </div>
  </div>
</template>


<script>
import Swiper from 'swiper'
export default {
  name: 'Player',
  props: {
    video: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      player: false,
      swiper: null,
      videowrp: {
        loading: true,
        value: 0,
        min: 0,
        max: 100,
        buffered: 0,
        state: 'pause',
        fullscreen: false,
        pip: false,
        volume: 30,
        muted: false,
        volumevisible: false,
        duration: 0,
        currentTime: 0,
        extras: false,
        tooltip: false,
        tooltippos: '0%',
        scrolled: false,
        mousehidden: false,
        slider: {
          hided: true
        },
        mouse: {
          timer: false,
          fadeInBuffer: false,
          hiden: false,
          x: 0,
          y: 0
        }
      }
    }
  },
  computed: {},
  mounted() {
    let self = this
    this.$nextTick(function() {
      // var hlsUrl = 'https://content.jwplatform.com/manifests/vM7nH0Kl.m3u8'
      var hlsUrl = 'videos/1/1.m3u8'
      let video = document.querySelector('video')
      // let video = self.$refs.videoref
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
          self.videowrp.duration = moment.utc(self.player.duration * 1000).format('HH') > 0 ? moment.utc(self.player.duration * 1000).format('HH:mm:ss') : moment.utc(self.player.duration * 1000).format('mm:ss')
        },
        { once: false }
      )
      self.player = video
      self.player.addEventListener(
        'timeupdate',
        event => {
          self.videowrp.currentTime = moment.utc(self.player.currentTime * 1000).format('HH') > 0 ? moment.utc(self.player.currentTime * 1000).format('HH:mm:ss') : moment.utc(self.player.currentTime * 1000).format('mm:ss')
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
        var bf = video.buffered
        var time = video.currentTime
        if (bf.length > 0) {
          self.videowrp.loading = false
          while (!(bf.start(range) <= time && time <= bf.end(range))) {
            range += 1
          }
          var loadStartPercentage = bf.start(range) / self.player.duration
          var loadEndPercentage = bf.end(range) / self.player.duration
          var loadPercentage = loadEndPercentage - loadStartPercentage

          // let progressBarbf = document.getElementById('progress-bar-buffer')
          // progressBarbf.value = loadEndPercentage * 100
          self.videowrp.buffered = Number(loadEndPercentage * 100).toFixed(2)
        } else {
          self.videowrp.loading = true
        }
      })

      // swiper
      this.swiper = new Swiper('.swiper-container', {
        // Optional parameters
        init: false,
        loop: false,
        slidesPerView: 5,
        grabCursor: true,
        navigation: {
          nextEl: '.next',
          prevEl: '.prev'
        },
        grabCursor: true,
        spaceBetween: 10,
        breakpointsInverse: true,
        freeMode: true,
        mousewheel: {
          invert: true,
          forceToAxis: true
        }
      })
      this.swiper.init()
      this.$root.$on('togglingmenu', data => {
        if (self.swiper !== null) {
          setTimeout(function() {
            self.swiper.update()
          }, 200)
        }
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
    },
    togglepipscreen() {
      let self = this;
      if (document.pictureInPictureEnabled) {
        if (document.pictureInPictureElement) {
            document.exitPictureInPicture().catch(console.error)
            this.videowrp.pip = false
        } else {
            this.player.requestPictureInPicture().catch(console.error)
            this.videowrp.pip = true
        }
        this.player.addEventListener('enterpictureinpicture', () => {
          self.videowrp.pip = true
        })
        this.player.addEventListener('leavepictureinpicture', () => {
          self.videowrp.pip = false
        })
      }
    },
    mouseOverProgress(event) {
      let self = this
      this.videowrp.tooltip = true
      const root = document.documentElement;
      this.$refs.progressbar.addEventListener('mousemove', evt => {
          if (evt.target.className != 'ant-slider-handle' && evt.target.className != 'ant-slider-handle ant-slider-handle-click-focused') {
            let x = evt.layerX / this.$refs.progressbar.clientWidth
            // root.style.setProperty('--mouse-x-progress', x * 100 +'%')
            self.videowrp.tooltippos = Number(x * 100).toFixed(2) + '%'
          }
          else {
            this.videowrp.tooltip = false
          }
      })
    },
    mouseleaveProgress(event) {
      this.videowrp.tooltip = false
      event.target.removeEventListener('mousemove', evt => {
        console.log('removeevent')
      });
    },
    handleScroll() {
      console.log('this.videowrp.scrolled')
    },
    mouseMoveMask(evt) {
      let self = this
      if(self.videowrp.state == 'play') {
        if (!self.videowrp.mouse.hiden) {
          if (self.videowrp.mouse.timer) {
            console.log("clearTimer")
            clearTimeout(self.videowrp.mouse.timer)
            self.videowrp.mouse.timer = 0
          }
        } else {
              self.videowrp.mouse.hiden = false
              self.videowrp.mouse.fadeInBuffer = false;
        }
        self.videowrp.mouse.timer = setTimeout(function() {
          console.log("fadeout")
          self.videowrp.mouse.hiden = true
          self.videowrp.mouse.fadeInBuffer = true
        }, 3000)
      } else {
        self.videowrp.mouse.hiden = false
      } 
    },
    delayCheck() {
      let self = this
    },
    mouseOverMask(event) {
      this.videowrp.mouse.hiden = false
      // let self = this
      // if(!self.videowrp.mouse.hiden) {
      //   self.videowrp.mouse.delay = setTimeout(function() {
      //       self.videowrp.mouse.hiden = true
      //       console.log('over and hide mouse')
      //   }, 1000)
      // } else {
      //   self.videowrp.mouse.hiden = false
      // }
    },
    mouseleaveMask(event) {}
  },
  beforeMount () {
    let self = this
    // var timer;
    // var fadeInBuffer = false;
    $(document).mousemove(function() {})
    // self.videowrp.mouse.hiden = false
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>

<style lang="scss" scoped>
</style>
