<template>
  <section class="container-fluid">
    <a-row type="flex">
      <a-col :span="24"> 
        <ul>
          <li 
            v-for="(todo,index) in todos" 
            :key="index">
            <input 
              :checked="todo.done" 
              type="checkbox" 
              @change="toggle(todo)">
            <span :class="{ done: todo.done }">{{ todo.text }}</span>
          </li>
          <li>
            <input 
              placeholder="Qu'est-ce qui doit être fait ?" 
              style="color:black;"
              @keyup.enter="addTodo">
          </li>
        </ul>
      </a-col>
    </a-row>
    <a-row>
      <a-col span="24">
        <div>
          <a-upload
            listType="picture"
            :fileList="filethumb"
          >
            <a-button>
              <a-icon type="upload" /> upload
            </a-button>
          </a-upload>
        </div>
        <img v-if="imageThumb" :src="imageThumb" alt="avatar" style="width: 100%;"/>
      </a-col>
    </a-row>
  </section>
</template>

<script>
function _imageEncode (arrayBuffer) {
    let u8 = new Uint8Array(arrayBuffer)
    let b64encoded = btoa([].reduce.call(new Uint8Array(arrayBuffer),function(p,c){return p+String.fromCharCode(c)},''))
    let mimetype="image/jpeg"
    return "data:"+mimetype+";base64,"+b64encoded
}
function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
import { mapMutations } from 'vuex'
export default {
  components: {
    // Logo
  },
  data() {
    return {
      filethumb: [],
      imageThumb: ''
    }
  },
  computed: {
    todos() {
      return this.$store.state.todos.list
    }
  },
  mounted() {
    let self = this
    // this.$axios.post('http://127.0.0.1:3000/api/tools/getthumb',{username: 'test', file: '/Users/weskhaled/Downloads/10sv.mp4'})
    this.$axios.post('http://127.0.0.1:3000/api/tools/getthumb',{username: 'test', file: 'D:/VikingsS05E20/vikings_s05e20.mkv'},{ responseType: 'arraybuffer' })
    .then((res)=>{
      if (res.data.data) {
        console.log(res.data.data)
        let tt = moment.utc(res.data.data.metadata.format.duration * 1000).format('HH') > 0 ? moment.utc(res.data.data.metadata.format.duration * 1000).format('HH:mm:ss') : moment.utc(res.data.data.metadata.format.duration * 1000).format('mm:ss')
        console.log(tt)
      }
      else
        // this.imageThumb=_imageEncode(res.data)
        // this.imageThumb=_imageEncode(new Buffer(res.data, 'binary').toString('base64'))
        this.imageThumb= `data:${res.headers['content-type']};base64,${Buffer.from(String.fromCharCode(...new Uint8Array(res.data)), 'binary').toString('base64')}`
        this.filethumb.push({
          uid: '2',
          name: 'yyy.png',
          status: 'done',
          url: this.imageThumb,
        })
    })

  },
  methods: {
    addTodo(e) {
      this.$store.commit('todos/add', e.target.value)
      e.target.value = ''
    },
    ...mapMutations({
      toggle: 'todos/toggle'
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
