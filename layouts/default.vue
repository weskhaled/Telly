<template>
  <a-layout :class="collapsed ? 'collapsed' : ''">
    <svg class="d-none">
      <symbol id="icon-arrow" viewBox="0 0 24 24">
        <title>arrow</title>
        <polygon points="6.3,12.8 20.9,12.8 20.9,11.2 6.3,11.2 10.2,7.2 9,6 3.1,12 9,18 10.2,16.8 "></polygon>
      </symbol>
      <symbol id="icon-drop" viewBox="0 0 24 24">
        <title>drop</title>
        <path
          d="M12,21c-3.6,0-6.6-3-6.6-6.6C5.4,11,10.8,4,11.4,3.2C11.6,3.1,11.8,3,12,3s0.4,0.1,0.6,0.3c0.6,0.8,6.1,7.8,6.1,11.2C18.6,18.1,15.6,21,12,21zM12,4.8c-1.8,2.4-5.2,7.4-5.2,9.6c0,2.9,2.3,5.2,5.2,5.2s5.2-2.3,5.2-5.2C17.2,12.2,13.8,7.3,12,4.8z"
        ></path>
        <path
          d="M12,18.2c-0.4,0-0.7-0.3-0.7-0.7s0.3-0.7,0.7-0.7c1.3,0,2.4-1.1,2.4-2.4c0-0.4,0.3-0.7,0.7-0.7c0.4,0,0.7,0.3,0.7,0.7C15.8,16.5,14.1,18.2,12,18.2z"
        ></path>
      </symbol>
      <symbol id="icon-menu" viewBox="0 0 119 25">
        <title>menu</title>
        <path
          d="M36,8 L36,0 L100,0 L100,8 L36,8 Z M0,8 L0,0 L24,0 L24,8 L0,8 Z M0,28 L0,20 L71,20 L71,28 L0,28 Z"
        ></path>
      </symbol>
      <symbol id="icon-close" viewBox="0 0 24 24">
        <title>close</title>
        <path
          d="M24 1.485L22.515 0 12 10.515 1.485 0 0 1.485 10.515 12 0 22.515 1.485 24 12 13.484 22.515 24 24 22.515 13.484 12z"
        ></path>
      </symbol>
      <symbol id="icon-caret" viewBox="0 0 24 13">
        <title>caret</title>
        <path
          d="M23.646.328a.842.842 0 0 0-1.19 0l-10.459 10.48L1.517.328a.842.842 0 0 0-1.189 1.19L11.382 12.57c.164.164.369.246.595.246.205 0 .43-.082.594-.246L23.625 1.518a.824.824 0 0 0 .02-1.19z"
        ></path>
      </symbol>
    </svg>
    <a-layout-sider :width="260" v-model="collapsed">
      <div class="logo ant-row-flex">
        <span class="logo-text text-light">{{ collapsed ? 'T' : 'Tellyming' }}</span>
      </div>
      <a-menu
        mode="inline"
        theme="dark">
        <a-menu-item key="/" @click="$router.replace('/')">
          <a-icon type="pie-chart" />
          <span>Index</span>
        </a-menu-item>
        <a-menu-item key="/slider" @click="$router.replace('/slider')">
          <a-icon type="desktop" />
          <span>Slider</span>
        </a-menu-item>
        <a-menu-item key="/watchlater" @click="$router.replace('/watchlater')">
          <a-icon type="inbox" />
          <span>Watchlater</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <span slot="title"><a-icon type="mail" /><span>Navigation One</span></span>
          <a-menu-item key="5" @click="$router.replace('/slider')">Slider</a-menu-item>
          <a-menu-item key="6">Option 6</a-menu-item>
          <a-menu-item key="7">Option 7</a-menu-item>
          <a-menu-item key="8">Option 8</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header>
        <nav class="navbar navbar-expand-sm navbar-dark">
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"/>
          </button>
          <div id="navbarSupportedContent" class="collapse navbar-collapse">
            <div class="actions navbar-nav mr-auto">
              <div class="mr-2">
                <a-button
                  size="default"
                  type="default"
                  @click="()=> {collapsed = !collapsed;$root.$emit('togglingmenu',collapsed)}"
                >
                  <i :class="collapsed ? 'ti-shift-right' : 'ti-shift-left'"/>
                </a-button>
              </div>
              <a-button-group v-if="eventstopnav.length > 0" class="btnnavig">
                <a-button
                  :disabled="eventstopnav.length > 0 ? eventstopnav.find( ev => {return ev.name === 'event-prev'} ).disabled : true"
                  type="primary"
                  @click="$emit('event-prev')"
                >
                  <i
                    :class="eventstopnav.find( ev => {return ev.name === 'event-prev'} ).icon_classes"
                  />
                </a-button>
                <a-button
                  :disabled="eventstopnav.length > 0 ? eventstopnav.find( ev => {return ev.name === 'event-next'} ).disabled : true"
                  type="primary"
                  @click="$emit('event-next')"
                >
                  <i
                    :class="eventstopnav.find( ev => {return ev.name === 'event-next'} ).icon_classes"
                  />
                </a-button>
              </a-button-group>
            </div>
            <div class="menu my-2 my-lg-0">
              <a-menu
                :style="{ lineHeight: '70px' }"
                theme="dark"
                mode="horizontal"
                class="ant-row-flex ant-row-flex-end"
              >
                <a-menu-item key="2" class="btnmenu">
                  <a-badge>
                    <a-icon type="search"/>
                    <!-- <i class="pg-search"/> -->
                  </a-badge>
                </a-menu-item>
                <a-menu-item key="1" class="btnmenu" @click="drawervisible = true;">
                  <a-badge dot>
                    <a-icon type="notification"/>
                  </a-badge>
                </a-menu-item>
                <a-sub-menu>
                  <div slot="title">
                    <div class="user">
                      <a-avatar
                        :size="46"
                        src="https://weskhaled.herokuapp.com/assets/img/photos/developer/avatar-sm.jpg"
                      />
                      <span class="user">
                        <span class="username">weslati khaled</span>
                        <span class="userinfo">Manage Account</span>
                      </span>
                    </div>
                  </div>
                  <a-menu-item-group title="Account">
                    <a-menu-item key="setting:1" @click="logout">Logout</a-menu-item>
                  </a-menu-item-group>
                  <a-menu-item-group title="Profile">
                    <a-menu-item key="setting:3">setting</a-menu-item>
                  </a-menu-item-group>
                </a-sub-menu>
              </a-menu>
            </div>
          </div>
        </nav>
      </a-layout-header>
      <a-layout-content>
        <nuxt/>
      </a-layout-content>
      <!-- <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>-->
    </a-layout>
    <a-drawer
      :visible="drawervisible"
      :closable="true"
      width="35vw"
      title="Basic Drawer"
      placement="right"
      @close="drawervisible = false;"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>{{ $auth.token }}</p>
      <a-button type="primary" @click="logout()">logout</a-button>
    </a-drawer>
  </a-layout>
</template>

<script>
import { TvIcon } from 'vue-feather-icons'
export default {
  components: {
    TvIcon
  },
  data() {
    return {
      collapsed: false,
      drawervisible: false,
      eventstopnav: []
    }
  },
  created() {
    for (let e of this.eventstopnav) {
      this.$on(e.name, e.callback) // Add event listeners
    }
    this.$root.$on('rebindnavevents', data => {
      this.eventstopnav = data
      for (let e of this.eventstopnav) {
        this.$off() // Add event listeners
      }
      for (let e of data) {
        this.$on(e.name, e.callback) // Add event listeners
      }
    })
  },
  methods: {
    linked({ item, key, keyPath }) {
      this.$router.replace(key)
    },
    async logout() {
      // console.log(this.$auth)
      return this.$auth.logout().then(() => {
        this.$nextTick(function() {
          this.$router.replace('/login')
        })
      })
      // return await this.$auth.logout()
      // console.log(this.$auth)
    }
  }
}
</script>
<style>
</style>
