<template>
  <section class="container-fluid">
    <a-row type="flex">
      <a-col :span="24"> 
        <!-- vimeo div element -->
        <div class="videoplayer">
          <video 
            id="player"
            controls 
            crossorigin 
            playsinline 
            poster="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg" >
            <!-- Video files -->
            <source 
              src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4" 
              type="video/mp4" 
              size="576">
            <source 
              src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4" 
              type="video/mp4" 
              size="720">
            <source 
              src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4" 
              type="video/mp4" 
              size="1080">
            <!-- Caption files -->
            <track 
              kind="captions" 
              label="English" 
              srclang="en" 
              src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt"
              default>
            <track 
              kind="captions" 
              label="Français" 
              srclang="fr" 
              src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt">
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
  data() {
    return {
      drawervisible: false,
      player: null,
      user: {
        username: 'weskhaled@gmail.com',
        password: '15021989'
      }
    }
  },
  computed: {},
  mounted() {
    let self = this
    // console.log(self.$refs.plyr);
    self.player = new Plyr.setup('#player')[0]
    console.log(self.player)
    self.player.on('ready', function(event) {
      event.detail.plyr.on('playing', function(event) {
        console.log('playing')
      })
    })
    // this.$auth.loginWith('laravel.passport')
    // .catch(e => {
    //   this.error = e + ''
    // });
    // this.passwordGrantLogin();
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
          client_id: process.env.PASSPORT_PASSWORD_GRANT_ID,
          client_secret: process.env.PASSPORT_PASSWORD_GRANT_SECRET,
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

<style lang="scss" scoped>
// .video-player-box {
//   min-height: 200px;
// }
</style>
