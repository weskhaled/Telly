<template>
  <a-layout :class="collapsed ? 'collapsed' : ''">
    <a-layout-sider
      :width="260"
      v-model="collapsed">
      <div class="logo ant-row-flex">
        <span class="logo-text text-light">
          {{ collapsed ? 'T' : 'Tellyming' }}
        </span>
      </div>
      <a-menu
        mode="vertical"
        theme="dark"
      >
        <a-menu-item 
          key="1">
          <nuxt-link 
            to="/"
            tag="div">
            <a-icon type="home" />
            <span>Discover</span>
          </nuxt-link>
        </a-menu-item>
        <a-menu-item 
          key="2">
          <nuxt-link 
            to="/slider"
            tag="div">
            <a-icon type="desktop" />
            <span>TV & Movies</span>
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="3">
          <nuxt-link 
            to="/watchlater"
            tag="div">
            <tv-icon class="anticon"/>
            <span>Watch Later</span>
          </nuxt-link>
        </a-menu-item>
        <a-sub-menu key="sub2">
          <span slot="title"><a-icon type="appstore" /><span>Navigation Two</span></span>
          <a-menu-item key="9">Option 9</a-menu-item>
          <a-menu-item key="10">Option 10</a-menu-item>
          <a-sub-menu 
            key="sub3" 
            title="Submenu">
            <a-menu-item key="11">Option 11</a-menu-item>
            <a-menu-item key="12">Option 12</a-menu-item>
          </a-sub-menu>
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
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon" />
          </button>
          <div 
            id="navbarSupportedContent"
            class="collapse navbar-collapse" >
            <div class="actions navbar-nav mr-auto" >
              <div class="mr-2">
                <a-button 
                  size="default"
                  type="default"
                  @click="()=> {collapsed = !collapsed;$root.$emit('togglingmenu',collapsed)}">
                  <a-icon
                    :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                    class="trigger"
                  />
                </a-button>
              </div>
              <a-button-group
                v-if="eventstopnav.length > 0"
                class="btnnavig">
                <a-button 
                  :disabled="eventstopnav.length > 0 ? eventstopnav.find( ev => {return ev.name === 'event-prev'} ).disabled : true"
                  type="primary"
                  @click="$emit('event-prev')">
                  <i :class="eventstopnav.find( ev => {return ev.name === 'event-prev'} ).icon_classes"/>
                </a-button>
                <a-button 
                  :disabled="eventstopnav.length > 0 ? eventstopnav.find( ev => {return ev.name === 'event-next'} ).disabled : true"
                  type="primary"
                  @click="$emit('event-next')">
                  <i :class="eventstopnav.find( ev => {return ev.name === 'event-next'} ).icon_classes"/>
                </a-button>
              </a-button-group>
            </div>
            <div class="menu my-2 my-lg-0">
              <a-menu
                :style="{ lineHeight: '70px' }"
                theme="dark"
                mode="horizontal"
                class="ant-row-flex ant-row-flex-end">
                <a-menu-item 
                  key="2"
                  class="btnmenu"
                  @click="logout()">
                  <a-badge>
                    <a-icon type="search" />
                    <!-- <i class="pg-search"/> -->
                  </a-badge>
                </a-menu-item>
                <a-menu-item 
                  key="1"
                  class="btnmenu"
                  @click="drawervisible = true;">
                  <a-badge 
                    dot >
                    <a-icon type="notification" />
                  </a-badge>
                </a-menu-item>
                <a-sub-menu>
                  <div slot="title">
                    <div class="user">
                      <a-avatar 
                        :size="46" 
                        src="https://weskhaled.herokuapp.com/assets/img/photos/developer/avatar-sm.jpg" />
                      <span class="user">
                        <span class="username">weslati khaled</span>
                        <span class="userinfo">Manage Account</span>
                      </span>
                    </div>
                  </div>
                  <a-menu-item-group title="Item 1">
                    <a-menu-item 
                      key="setting:1">
                      Logout
                    </a-menu-item>
                    <a-menu-item key="setting:2">Option 2</a-menu-item>
                  </a-menu-item-group>
                  <a-menu-item-group title="Item 2">
                    <a-menu-item key="setting:3">Option 3</a-menu-item>
                    <a-menu-item key="setting:4">Option 4</a-menu-item>
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
      </a-layout-footer> -->
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
      <a-button 
        type="primary" 
        @click="logout()">
        logout
      </a-button>
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
      // console.log(
      //   this.eventstopnav.find(ev => {
      //     return ev.name == 'event-next'
      //   }).disabled
      // )
    })
  },
  methods: {
    async logout() {
      console.log(this.$auth)
      this.$auth.logout().then(() => {
        console.log('testttttt logout : ')
        this.$router.replace('/login')
      })
      // return await this.$auth.logout()
      console.log(this.$auth)
    }
  }
}
</script>
<style>
</style>
