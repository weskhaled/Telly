<template>
  <a-card
    class="cardslider m-2 px-2"
    hoverable
  >
    <img      
      slot="cover"
      alt="example"
      src="~assets/images/film-cover.jpg"
    >
    <div class="sliderinfo">
      <div>
        {{ slide.name }}
      </div>
    </div>
    <template 
      v-if="admin"
      slot="actions" 
      class="ant-card-actions">
      <a-icon type="setting" />
      <a-icon type="edit" />
      <a-icon type="ellipsis" />
    </template>
  </a-card>
</template>


<script>
export default {
  props: {
    slide: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      admin: false
    }
  },
  computed: {},
  mounted() {
    console.log(this.slide)
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
</style>
