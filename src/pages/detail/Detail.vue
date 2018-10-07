<template>
  <div>
    detail
  </div>
</template>

<script>
import { get } from '@/util'

export default {
	data() {
		return {
			bookid: ''
		}
	},
	mounted() {
		/* this.$root.$mp.query: 获取页面的组件 */
		/* [this.$root.$mp.query.id](http://mpvue.com/mpvue/#_18) */
		this.bookid = this.$root.$mp.query.id
		console.log(this.bookid)
		this.getDetail()
	},
	methods: {
		async getDetail() {
      const info = await get('/weapp/bookdetail', { id: this.bookid })
			/* [设置 title](https://developers.weixin.qq.com/miniprogram/dev/api/ui/navigation-bar/wx.setNavigationBarTitle.html) */
			wx.setNavigationBarTitle({
				title: info.title
			})
			this.info = info
    }
	}
}
</script>

<style lang='scss'>
</style>
