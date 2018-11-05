<template>
  <section class="container">
    <a-row type="flex">
      <a-col :span="24"> 
        <!-- vimeo div element -->
        <div class="videoplayer">
          <video controls crossorigin playsinline poster="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg" id="player">
            <!-- Video files -->
            <source src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4" type="video/mp4" size="576">
            <source src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4" type="video/mp4" size="720">
            <source src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4" type="video/mp4" size="1080">
            <!-- Caption files -->
            <track kind="captions" label="English" srclang="en" src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt"
                default>
            <track kind="captions" label="Français" srclang="fr" src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt">
          </video>
          <!-- <div id="player" ref="plyr" data-plyr-provider="vimeo" data-plyr-embed-id="102401420" /> -->
        </div>
      </a-col>
    </a-row>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
// import Plyr from 'plyr';
export default {
  components: {
    Logo
  },
  computed: {
    // player () { return this.$refs.player.player }
  },
  data() {
    return {
      drawervisible: false,
      player : null
    }
  },
  mounted() {
    let self = this;
    // console.log(self.$refs.plyr);
    self.player = window.plyr.setup('#player')[0];
    console.log(self.player);
    self.player.on('ready', function (event) {
        event.detail.plyr.on('playing', function (event) {
          console.log('playing');
        })
    });
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
// .video-player-box {
//   min-height: 200px;
// }
</style>
