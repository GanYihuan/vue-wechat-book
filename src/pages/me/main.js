import Vue from 'vue'
import Me from './Me'

const app = new Vue(Me)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '评论列表',
    enablePullDownRefresh: true
  }
}
