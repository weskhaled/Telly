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
      drawervisible: false
    }
  },
  computed: {
    todos() {
      return this.$store.state.todos.list
    }
  },
  mounted() {},
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
