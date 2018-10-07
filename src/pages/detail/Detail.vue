<template>
  <div>
    <BookInfo :info='info'></BookInfo>
    <CommentList :comments="comments"></CommentList>
    <div class="comment" v-if="showAdd">
      <!-- [textarea](https://developers.weixin.qq.com/miniprogram/dev/component/textarea.html) -->
      <textarea
        class='textarea'
        v-model='comment'
        placeholder='请输入图书短评'
        :maxlength='100'
			>
      </textarea>
      <button class="btn" @click='addComment'>
        评论
      </button>
    </div>
    <!-- [button](https://developers.weixin.qq.com/miniprogram/dev/component/button.html) -->
    <button class="btn" open-type='share'>转发给好友</button>
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
			userinfo: {},
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
		const userinfo = wx.getStorageSync('userinfo')
		// console.log('userinfo', userinfo)
		if (userinfo) {
			this.userinfo = userinfo
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
