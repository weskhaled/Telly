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
            :beforeUpload="beforeUpload"
            @change="handleChange"
            id="filevideo"
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
import { mapMutations } from 'vuex'
export default {
  components: {
    // Logo
  },
  data() {
    return {
      filethumb: [],
      imageThumb: '',
      filepath: ''
    }
  },
  computed: {
    todos() {
      return this.$store.state.todos.list
    }
  },
  mounted() {
    let self = this
    // this.$axios.post('http://127.0.0.1:3000/api/tools/getthumb',{username: 'test', file: '/Users/weskhaled/Downloads/test.mp4'})
    // // this.$axios.post('http://127.0.0.1:3000/api/tools/getthumb',{username: 'test', file: 'D:/VikingsS05E20/vikings_s05e20.mkv'},{ responseType: 'arraybuffer' })
    // .then((res)=>{
    //     console.log(res.data)
    //     let tt = moment.utc(res.data.metadata.format.duration * 1000).format('HH') > 0 ? moment.utc(res.data.metadata.format.duration * 1000).format('HH:mm:ss') : moment.utc(res.data.metadata.format.duration * 1000).format('mm:ss')
    //     console.log(tt)
    //     this.imageThumb=`data:image/jpeg;base64,${res.data.imgbase64}`
    //     this.filethumb.push({
    //       uid: '2',
    //       name: 'yyy.png',
    //       status: 'done',
    //       url: this.imageThumb,
    //     })
    // })
  },
  methods: {
    addTodo(e) {
      this.$store.commit('todos/add', e.target.value)
      e.target.value = ''
    },
    ...mapMutations({
      toggle: 'todos/toggle'
    }),
    beforeUpload (file) {
      console.log('before upload',file)
      const isJPG = file.type === 'video/mp4'
      if (!isJPG) {
        this.$message.error('You can only upload mp4 file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 800
      if (!isLt2M) {
        this.$message.error('Image must smaller than 800MB!')
      }
      return isJPG && isLt2M
    },
    handleChange (info) {
      console.log(info.file.originFileObj)
      // if (info.file.status === 'uploading') {
      //   return
      // }
      // if (info.file.status === 'done') {
      //   // Get this url from response in real world.
      //   getBase64(info.file.originFileObj, (imageUrl) => {
      //     this.imageUrl = imageUrl
      //     this.loading = false
      //   })
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
