<template>
  <section class="container-fluid">
    <a-row type="flex">
      <a-col :span="24">
        <h4 class="text-capitalize font-weight-bold text-light">Recommended to you</h4>
      </a-col>
    </a-row>
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
          name: 'Children Of The Corn',
          cat: 'Thriller',
          year: '2009',
          time: '1:09:00'
        },
        {
          name: 'Children Of The Corn',
          cat: 'Thriller',
          year: '2009',
          time: '1:09:00'
        },
        {
          name: 'Children Of The Corn',
          cat: 'Thriller',
          year: '2009',
          time: '1:09:00'
        },
        {
          name: 'Children Of The Corn',
          cat: 'Thriller',
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
        slidesPerView: 6,
        grabCursor: true,
        navigation: {
          nextEl: '.next',
          prevEl: '.prev'
        },
        grabCursor: true,
        spaceBetween: 0,
        breakpointsInverse: true,
        // Responsive breakpoints
        breakpoints: {
          // when window width is >= 320px
          320: {
            slidesPerView: 2,
            spaceBetween: 0
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 2,
            spaceBetween: 0
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 4,
            spaceBetween: 0
          },
          // when window width is >= 1280px
          1200: {
            slidesPerView: 6,
            spaceBetween: 0
          },
          // when window width is >= 1280px
          1800: {
            slidesPerView: 8,
            spaceBetween: 0
          }
        },
        freeMode: true,
        mousewheel: {
          invert: true,
          forceToAxis: true
        }
      })
      this.swiper.init()
      this.$root.$on('togglingmenu', data => {
        console.log(data)
        if (self.swiper !== null) {
          setTimeout(function() {
            self.swiper.update()
          }, 200)
        }
      })
      let EVENTSTOPNAV = [
        {
          name: 'event-prev',
          callback: () => {
            this.swiper.slidePrev()
          },
          hide: true,
          disabled: this.swiper.isBeginning,
          icon_classes: 'anticon anticon-left'
        },
        {
          name: 'event-next',
          callback: () => {
            this.swiper.slideNext()
          },
          hide: false,
          disabled: this.swiper.isEnd,
          icon_classes: 'anticon anticon-right'
        }
      ]
      this.$root.$emit('rebindnavevents', EVENTSTOPNAV)
      this.swiper.on('slideChange', function() {
        let EVENTSTOPNAV = [
          {
            name: 'event-prev',
            callback: () => {
              this.isBeginning
                ? self.$message.info('This is a the first one')
                : this.slidePrev()
            },
            hide: true,
            disabled: this.isBeginning,
            icon_classes: 'anticon anticon-left'
            // disabled: false
          },
          {
            name: 'event-next',
            callback: () => {
              this.isEnd
                ? self.$message.info('This is a the last one')
                : this.slideNext()
            },
            hide: false,
            // disabled: this.isEnd
            disabled: false,
            icon_classes: 'anticon anticon-right'
          }
        ]
        self.$root.$emit('rebindnavevents', EVENTSTOPNAV)
      })
    })
  },
  beforeRouteLeave(to, from, next) {
    if (this.swiper !== null) {
      this.swiper.destroy()
      this.swiper = null
      next()
    } else {
      next()
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
</style>
