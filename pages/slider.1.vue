<template>
  <section class="container-fluid">
    <a-row type="flex">
      <a-col class="d-flex" :span="24">
        <h4 class="d-inline text-capitalize font-weight-bold text-light">Recommended to you</h4>
        <div class="d-inline ml-auto my-1" v-if="$auth.$state.loggedIn">
          <a-button 
            type="primary"
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
        <a-button key="reset" @click="form.resetFields()">Reset</a-button>
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
            >
            <a-select
              showSearch
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
            label='Tags'
          >
            <a-select
              mode="tags"
              v-decorator="[
                'tags', {
                rules: [{ required: false, message: 'Please select your favourite colors!', type: 'array' }],
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
            label='Public'
          >
            <a-switch v-decorator="['public', { valuePropName: 'checked' ,initialValue: true}]"/>
          </a-form-item>

          <a-form-item
            v-bind="formItemLayout"
            label='Rate'
          >
            <a-rate allowHalf v-decorator="['rate', {initialValue: 3.5}]"/>
          </a-form-item>

          <a-form-item
            v-bind="formItemLayout"
            label='Video'
          >
            <div class='dropbox'>
              <a-upload-dragger
                name='video'
                :multiple="false"
                :fileList="videoFile"
                :beforeUpload="beforeUploadvideo"
                v-decorator="[
                  'video', {
                  rules: [{ required: true, message: 'Please select your video!' }],
                }]"
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
            label='thumb'
          >
              <a-upload
                name="thumb"
                listType="picture-card"
                class="avatar-uploader"
                :showUploadList="false"
                :beforeUpload="beforeUploadthumb"
                @change="handleChangethumb"
                v-decorator="[
                  'thumb', {
                  rules: [{ required: true, message: 'Please select your thumb!' }],
                }]"
              >
                <img v-if="imageThumb" :src="imageThumb" alt="avatar" style="width: 100%;"/>
                <div v-else>
                    <a-icon :type="loadingThumb ? 'loading' : 'plus'" />
                    <div class="ant-upload-text">Upload</div>
                </div>
              </a-upload>
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
                  rules: [{ required: false, message: 'Please input your desc!', whitespace: true }]
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
function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
import moment from 'moment'
import SlideCard from '~/components/index/SlideCard.vue'
import Swiper from 'swiper'
// import axios from 'axios'
export default {
  components: {
    SlideCard
  },
  data() {
    return {
      swiper: null,
      visible: false,
      loading: false,
      loadingThumb: false,
      imageThumb: '',
      imageUrl: '',
      videoFile: [],
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
      let self = this;
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          // this.$form.video = this.$form.video.file;
          this.loading = true;
          let formData = new FormData();
          console.log()
          formData.append('title', values.title);
          formData.append('video', values.video.file);
          formData.append('year', moment(String(values.year)).format('MM/DD/YYYY'));
          formData.append('thumb', values.thumb.file.originFileObj);
          formData.append('description', values.description);
          console.log('formData: ', formData)
          console.log('values.thumb: ', values.thumb)
          console.log('values.video: ', values.video)
          console.log('Received values of form: ', values);
          // Make a request for a user with a given ID
          this.$axios.post('/api/v1/videos', formData)
            .then(function (response) {
              // handle success
              self.$message.success(response.data.message, 2.5)
              self.loading = false;
              // self.visible = false;
              // self.form.resetFields();
            })
            .catch(function (error) {
              // handle error
              console.log(error);
              self.$message.error(error, 2.5)
              self.loading = false;
            });
          // setTimeout(() => {
          //   this.loading = false;
          // }, 3000);
        } else {
          self.$message.error('Form not validate vields', 2.5)
        }
      });
    },
    handleCancel(e) {
      this.visible = false;
    },
    handleSubmit (e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
    handleChangethumb (info) {
      if (info.file.status === 'uploading') {
        this.loadingThumb = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageThumb = imageUrl
          this.loadingThumb = false
        })
      }
    },
    beforeUploadthumb (file) {
      const isJPG = file.type === 'image/jpeg'
      if (!isJPG) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 4
      if (!isLt2M) {
        this.$message.error('Image must smaller than 4MB!')
      }
      return isJPG && isLt2M
    },
    beforeUploadvideo(file) {
      this.videoFile = [file]
      return false;
    }
  }
}
</script>

<style lang="scss">
.avatar-uploader > .ant-upload {
  width: 100%!important;
  max-width: 100%!important;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
