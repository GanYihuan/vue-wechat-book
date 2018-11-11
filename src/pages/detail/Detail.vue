<template>
  <div>
    <BookInfo :info='info'></BookInfo>
    <button class='btn' open-type='share'>转发给好友</button>
  </div>
</template>

<script>
import { get } from '@/util'
import BookInfo from '@/components/BookInfo'
export default {
	components: {
		BookInfo
	},
	data() {
		return {
			comments: [],
			userInfo: {},
			comment: '',
			bookid: '',
			info: {}
		}
	},
	mounted() {
		/* this.$root.$mp.query: 获取页面的组件 */
		/* [this.$root.$mp.query.id](http://mpvue.com/mpvue/#_18) */
		this.bookid = this.$root.$mp.query.id
		this.getDetail()
		/* [getStorageSync](https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.getStorageSync.html) */
		const userInfo = wx.getStorageSync('userInfo')
		if (userInfo) {
			this.userInfo = userInfo
		}
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
.comment {
	margin: 10px 0 0 0;
	.textarea {
		padding: 10rpx;
		width: 730rpx;
		height: 200rpx;
		background: #eee;
	}
}
</style>
