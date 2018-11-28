<template>
  <section class="container-fluid">
    <a-row type="flex">
      <a-col :span="24">
        <!-- vimeo div element -->
        <div class="videoplayer">
          <video
            id="player"
            ref="plyr"
            controls
            crossorigin
            playsinline
            poster="~assets/images/city.jpg" >
            <!-- Video files -->
            <source
              src="~assets/videos/test.mp4"
              type="video/mp4"
              size="576">
          </video>
          <!-- <div id="player" ref="plyr" data-plyr-provider="vimeo" data-plyr-embed-id="102401420" /> -->
        </div>
      </a-col>
    </a-row>
  </section>
</template>

<script>
// import Logo from '~/components/Logo.vue'
// import Plyr from 'plyr';
export default {
  components: {
    // Logo
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
    // console.log(self.$refs.plyr)
    this.$nextTick(function() {
      self.player = new Plyr.setup('#player', {})[0]
      if (self.player !== null) {
        self.player.on('ready', function(event) {
          event.detail.plyr.on('playing', function(event) {
            console.log('playing ...')
          })
        })
      }
    })
    // this.$auth.loginWith('laravel.passport').catch(e => {
    //   this.error = e + ''
    // })
    // this.passwordGrantLogin()
    // console.log(process.env.LARAVEL_ENDPOINT)
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
    // async customPasswordGrantLogin() {
    //   await this.$auth.loginWith('password_grant_custom', {
    //     data: this.user
    //   })
    //   this.$router.replace('/')
    // },
    // async passwordGrantLogin() {
    //   await this.$auth.loginWith('password_grant', {
    //     data: {
    //       grant_type: 'password',
    //       client_id: process.env.PASSPORT_CLIENT_ID,
    //       client_secret: process.env.PASSPORT_CLIENT_SECRET,
    //       scope: '*',
    //       username: this.user.username,
    //       password: this.user.password
    //     }
    //   })
    //   this.$router.replace('/')
    // }
  }
}
</script>
