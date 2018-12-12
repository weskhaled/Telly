<template>
  <a-card
    class="cardslider m-2 p-2"
    hoverable
  >
    <img      
      slot="cover"
      alt="example"
      src="~assets/images/film-cover.jpg"
    >
    <div class="sliderinfo">
      <div class="title">
        <h5>{{ slide.name }}</h5>
      </div>
      <div class="plushover">
        <div class="info">
          <span class="cat">{{ slide.cat }} - {{ slide.time }} - {{ slide.year }}</span>
        </div>
        <div class="infoplus">
          <h6>
            <span class="badge">+18</span>
            <span class="badge badge-primary">New</span>
          </h6>
        </div>
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
    // console.log(this.slide)
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
</style>
