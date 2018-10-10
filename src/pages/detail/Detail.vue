<template>
  <div>
    <BookInfo :info='info'></BookInfo>
    <div class='comment' v-if='showAdd'>
      <!-- [textarea](https://developers.weixin.qq.com/miniprogram/dev/component/textarea.html) -->
      <textarea
        class='textarea'
        v-model='comment'
        placeholder='请输入图书短评'
        :maxlength='100'
			>
      </textarea>
    </div>
    <div class='text-footer' v-else>
      未登录或者已经评论过啦
    </div>
    <!-- [button](https://developers.weixin.qq.com/miniprogram/dev/component/button.html) -->
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
	computed: {
		/* 是否显示添加的表单 */
		showAdd() {
			/* 没登录 */
			if (!this.userInfo.openId) {
				return false
			}
			/* 评论页面里查到有自己的 openid */
			if (this.comments.filter(v => v.openid === this.userInfo.openId).length) {
				return false
			}
			return true
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
	margin-top: 10px;
	.textarea {
		padding: 10rpx;
		width: 730rpx;
		height: 200rpx;
		background: #eee;
	}
}
</style>
