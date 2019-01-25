<template>
  <section class="container-fluid">
    <a-row type="flex">
      <a-col class="d-flex" :span="24">
        <h4 class="d-inline text-capitalize font-weight-bold text-light">Recommended to you</h4>
        <div class="d-inline ml-auto" v-if="$auth.$state.loggedIn">
          <a-button 
            type="primary" 
            size="small"
            @click="visible = true"
            > Add new </a-button>
        </div>
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
    <a-row type="flex">
      <a-col class="d-flex" :span="24">
        <h4 class="d-inline text-capitalize font-weight-bold text-light">News Movies</h4>
      </a-col>
    </a-row>
    <a-modal
      title="Basic Modal"
      v-model="visible"
      :maskClosable="true"
      onOk="handleOk">
      <template slot="footer">
        <a-button key="back" @click="handleCancel">Return</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">
          Submit
        </a-button>
      </template>
      <div class="modalcontent">

        <a-form id='components-form-demo-validate-other' @submit="handleSubmit" :form="form">
          <a-form-item
            v-bind="formItemLayout"
          >
            <span slot="label">
              Title&nbsp;
              <a-tooltip title='What do you want others to call you?'>
                <a-icon type='question-circle-o' />
              </a-tooltip>
            </span>
            <a-input
              v-decorator="[
                'title',
                {
                  rules: [{ required: true, message: 'Please input your Title!', whitespace: true }]
                }
              ]"
            />
          </a-form-item>
          <a-form-item
            v-bind="formItemLayout"
            label='Select'
            hasFeedback
          >
            <a-select
              v-decorator="[
                'year',
                {rules: [{ required: true, message: 'Please select the year!' }]}
              ]"
              placeholder='Please select a country'
            >
              <a-select-option v-for="year in years" :key="year" :value="year">{{ year }}</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item
            v-bind="formItemLayout"
            label='Select[multiple]'
          >
            <a-select
              mode="tags"
              v-decorator="[
                'tags', {
                rules: [{ required: true, message: 'Please select your favourite colors!', type: 'array' }],
              }]"
              placeholder='Please select favourite colors'
            >
              <a-select-option value='red'>Red</a-select-option>
              <a-select-option value='green'>Green</a-select-option>
              <a-select-option value='blue'>Blue</a-select-option>
              <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">{{(i + 9).toString(36) + i}}</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item
            v-bind="formItemLayout"
            label='MonthPicker'
          >
            <a-monthPicker/>
          </a-form-item>

          <a-form-item
            v-bind="formItemLayout"
            label='Switch'
          >
            <a-switch v-decorator="['switch', { valuePropName: 'checked' ,initialValue: true}]"/>
          </a-form-item>

          <a-form-item
            v-bind="formItemLayout"
            label='Rate'
          >
            <a-rate allowHalf v-decorator="['rate', {initialValue: 3.5}]"/>
          </a-form-item>

          <a-form-item
            v-bind="formItemLayout"
            label='Dragger'
          >
            <div class='dropbox'>
              <a-upload-dragger
                name='files'
                action='/upload.do'
              >
                <p class='ant-upload-drag-icon'>
                  <a-icon type='inbox' />
                </p>
                <p class='ant-upload-text'>Click or drag file to this area to upload</p>
                <p class='ant-upload-hint'>Support for a single or bulk upload.</p>
              </a-upload-dragger>
            </div>
          </a-form-item>

          <a-form-item
            v-bind="formItemLayout"
          >
            <span slot="label">
              Nickname&nbsp;
              <a-tooltip title='What do you want others to call you?'>
                <a-icon type='question-circle-o' />
              </a-tooltip>
            </span>
            <a-textarea
              v-decorator="[
                'description',
                {
                  rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }]
                }
              ]"
            />
          </a-form-item>
        </a-form>

      </div>
    </a-modal>
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
      visible: false,
      loading: false,
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
      },
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
  // beforeCreate () {
  //   this.form = this.$form.createForm(this);
  // },
  computed: {
    years () {
      const year = new Date().getFullYear()
      return Array.from({length: year - 1900}, (value, index) => 1901 + index)
    }
  },
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
          icon_classes: 'ti-angle-double-left'
        },
        {
          name: 'event-next',
          callback: () => {
            this.swiper.slideNext()
          },
          hide: false,
          disabled: this.swiper.isEnd,
          icon_classes: 'ti-angle-double-right'
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
            icon_classes: 'ti-angle-double-left'
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
            icon_classes: 'ti-angle-double-right'
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
  methods: {
    handleOk(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
          }, 3000);
        }
      });
    },
    handleCancel(e) {
      this.visible = false;
    },
    handleSubmit  (e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
  }
}
</script>

<style lang="scss" scoped>
</style>
