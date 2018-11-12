<template>
  <section class="container-fluid">
    <a-row type="flex">
      <a-col :span="24">
        <!-- Slider main container -->
        <div class="swiper-container">
          <!-- Additional required wrapper -->
          <div class="swiper-wrapper">
            <!-- Slides -->
            <div 
              v-for="(slider, index) in sliders" 
              :key="index" 
              class="swiper-slide">
              <SlideCard :slide="slider"/>
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
      </a-col>
    </a-row>
  </section>
</template>

<script>
import SlideCard from '~/components/index/SlideCard.vue'
import Swiper from 'swiper'
export default {
  components: {
    SlideCard
  },
  data() {
    return {
      swiper: null,
      sliders: [
        {
          name: 'slider 1',
          cat: 'Cat name',
          year: '2009',
          time: '1:09:00'
        },
        {
          name: 'slider 2',
          cat: 'Cat name',
          year: '2009',
          time: '1:09:00'
        },
        {
          name: 'slider 3',
          cat: 'Cat name',
          year: '2009',
          time: '1:09:00'
        },
        {
          name: 'slider 4',
          cat: 'Cat name',
          year: '2009',
          time: '1:09:00'
        },
        {
          name: 'slider 4',
          cat: 'Cat name',
          year: '2009',
          time: '1:09:00'
        },
        {
          name: 'slider 4',
          cat: 'Cat name',
          year: '2009',
          time: '1:09:00'
        },
        {
          name: 'slider 4',
          cat: 'Cat name',
          year: '2009',
          time: '1:09:00'
        },
        {
          name: 'slider 4',
          cat: 'Cat name',
          year: '2009',
          time: '1:09:00'
        }
      ]
    }
  },
  computed: {},
  mounted() {
    let self = this
    this.$nextTick(function() {
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
        // pagination: {
        //   el: '.swiper-pagination',
        //   type: 'bullets',
        //   clickable: true
        // },
        freeMode: true
      })
      this.swiper.init()
    })
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
</style>
