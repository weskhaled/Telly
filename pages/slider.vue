<template>
  <section class="container-fluid">
    <a-row type="flex">
      <a-col :span="24">
        <!-- Slider main container -->
        <div class="swiper-container">
          <!-- Additional required wrapper -->
          <div class="swiper-wrapper">
            <!-- Slides -->
            <div class="swiper-slide">Slide 1</div>
            <div class="swiper-slide">Slide 2</div>
            <div class="swiper-slide">Slide 3</div>
          </div>
          <!-- If we need pagination -->
          <div class="swiper-pagination" />
          <!-- If we need navigation buttons -->
          <div class="swiper-button-prev" />
          <div class="swiper-button-next" />
          <!-- If we need scrollbar -->
          <div class="swiper-scrollbar" />
        </div>
      </a-col>
    </a-row>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
import Swiper from 'swiper'
export default {
  components: {
    Logo
  },
  data() {
    return {
      drawervisible: false,
      swiper: null
    }
  },
  computed: {},
  mounted() {
    let self = this
    this.$nextTick(function() {
      this.swiper = new Swiper('.swiper-container', {
        // Optional parameters
        init: false,
        loop: true
      })
      this.swiper.init()
    })
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
</style>
