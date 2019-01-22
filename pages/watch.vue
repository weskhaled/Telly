<template>
  <section class="container-fluid">
    <a-row type="flex">
      <a-col :span="24">
        <div class="videoplayer">
          <Player :video="video">
            <template slot="modalcontent">
              test 2
            </template>
          </Player>
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
    this.$nextTick(function() {})
    let EVENTSTOPNAV = [
      {
        name: 'event-prev',
        callback: () => {
          this.player.pause()
        },
        hide: true,
        disabled: false,
        icon_classes: 'ti-angle-double-left'
      },
      {
        name: 'event-next',
        callback: () => {
          this.player.play()
        },
        hide: true,
        disabled: false,
        icon_classes: 'ti-angle-double-right',
      }
    ]
    this.$root.$emit('rebindnavevents', EVENTSTOPNAV)
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
  }
}
</script>
