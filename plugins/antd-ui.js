import Vue from 'vue'
import Antd from 'ant-design-vue'
import Form from 'ant-design-vue/lib/form'
// import 'ant-design-vue/dist/antd.css'

export default () => {
  Vue.config.productionTip = false
  Vue.prototype.$form = Form
  Vue.use(Antd)
}
