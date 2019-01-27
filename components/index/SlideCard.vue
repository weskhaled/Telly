<template>
  <a-card
    class="cardslider m-2 p-2"
    hoverable
  >
    <template slot="cover">
      <div class="cover-wrp d-flex justify-content-center align-items-center">
          <img  
            :alt="slide.title"
            :src="'http://telly.test/api/getvideothumb/'+slide.thumb"
            @click="$router.replace('/videos/'+slide.id)"
          >
      </div>
    </template>
    <div class="sliderinfo">
      <div class="title">
        <h5>{{ slide.title }}</h5>
      </div>
      <div class="plushover">
        <div class="info">
          <span class="cat">cat and time</span>
        </div>
        <div class="infoplus">
          <h6>
            <span class="badge">{{ slide.year }}</span>
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
      admin: this.$auth.$state.loggedIn
    }
  },
  computed: {},
  mounted() {
    // console.log(this.slide)
  },
  methods: {}
}
</script>

<style lang="scss">
.cover-wrp {
  min-width: 100%;
  min-height: 100%;
  border-radius: 2px 2px 0 0;
}
</style>
