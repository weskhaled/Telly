// // Include swiper JS only
// import Swiper from 'swiper/dist/js/swiper.esm.bundle';
// if (process.browser) {
//   require('swiper')
// }
import Vue from 'vue'
import Swiper from 'swiper/dist/js/swiper.esm.bundle'

export default () => {
  Vue.use(Swiper)
}
