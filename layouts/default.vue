<template>
  <a-layout :class="collapsed ? 'collapsed' : ''">
    <a-layout-sider 
      v-model="collapsed"
      collapsible>
      <div class="logo ant-row-flex">
        <span class="logo-text text-light">Telly</span>
      </div>
      <a-menu
        :default-selected-keys="['1']"
        :default-open-keys="['sub1']"
        :inline-collapsed="collapsed"
        mode="vertical"
        theme="dark"
      >
        <a-menu-item key="1">
          <a-icon type="pie-chart" />
          <span>Option 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="desktop" />
          <span>Option 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="inbox" />
          <span>Option 3</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <span 
            slot="title">
            <a-icon type="mail" />
            <span>Navigation One</span>
          </span>
          <a-menu-item key="5">Option 5</a-menu-item>
          <a-menu-item key="6">Option 6</a-menu-item>
          <a-menu-item key="7">Option 7</a-menu-item>
          <a-menu-item key="8">Option 8</a-menu-item>
        </a-sub-menu>
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
        <a-row 
          type="flex" 
          justify="end">
          <a-col 
            :span="12"
            class="actions" >
            text
          </a-col>
          <a-col 
            :span="12"
            class="menu-wrap ant-row-flex ant-row-flex-end">
            <div class="menu">
              <a-menu
                :style="{ lineHeight: '70px' }"
                :default-selected-keys="['2']"
                theme="dark"
                mode="horizontal"
                class="ant-row-flex ant-row-flex-end">
                <a-menu-item 
                  key="2"
                  class="btnmenu">
                  <a-badge 
                    dot >
                    <a-icon type="search" />
                  </a-badge>
                </a-menu-item>
                <a-menu-item 
                  key="1" 
                  class="btnmenu">
                  <a-badge 
                    dot >
                    <a-icon type="notification" />
                  </a-badge>
                </a-menu-item>
                <a-sub-menu>
                  <div slot="title">
                    <div class="user">
                      <a-avatar 
                        :size="32" 
                        icon="user" />
                      <span class="username">
                        weslati khaled
                        <span class="userinfo">Manage Account</span>
                      </span>
                    </div>
                  </div>
                  <a-menu-item-group title="Item 1">
                    <a-menu-item key="setting:1">Option 1</a-menu-item>
                    <a-menu-item key="setting:2">Option 2</a-menu-item>
                  </a-menu-item-group>
                  <a-menu-item-group title="Item 2">
                    <a-menu-item key="setting:3">Option 3</a-menu-item>
                    <a-menu-item key="setting:4">Option 4</a-menu-item>
                  </a-menu-item-group>
                </a-sub-menu>
              </a-menu>
            </div>
          </a-col>
        </a-row>
      </a-layout-header>
      <a-layout-content>
        <nuxt/>
      </a-layout-content>
      <!-- <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer> -->
    </a-layout>
  </a-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  data() {
    return {
      collapsed: false
    }
  }
}
</script>
<style>
</style>
