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
    </a-row>
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
    </a-raw>
  </section>
</template>

<script>
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
    this.$axios.post('http://127.0.0.1:3000/api/tools/test',{username: 'test', file: '/Users/weskhaled/Downloads/10sv.mp4'})
    // this.$axios.post('http://127.0.0.1:3000/api/tools/test',{username: 'test', file: '/Users/Peaksource/Downloads/image.jpeg'})
    .then((res)=>{
      if (res.data.data) {
        console.log(res.data.data)
        let tt = moment.utc(res.data.data.metadata.format.duration * 1000).format('HH') > 0 ? moment.utc(res.data.data.metadata.format.duration * 1000).format('HH:mm:ss') : moment.utc(res.data.data.metadata.format.duration * 1000).format('mm:ss')
        console.log(tt)
        this.filethumb.push(
          // new File('file://'+res.data.data.filepath,{type: 'image/jpeg'})
          // {
          //   uid: '-1',
          //   name: 'xxx.png',
          //   status: 'done',
          //   url: 'file://'+res.data.data.filepath,
          //   thumbUrl: new File('file://'+res.data.data.filepath),
          // }
        )
      }
      else
        console.log(res)
        let file = new File([res.data], "test.jpg", {type: 'image/jpeg'});
        console.log(file)
        getBase64(file, (imageUrl) => {
          self.imageThumb = imageUrl
          self.filethumb.push(
          {
              uid: '2',
              name: 'yyy.png',
              status: 'done',
          })
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
