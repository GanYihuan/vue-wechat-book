<template>
  <div class='book'>
    <div v-if='hasBooks'>
      <TopSwiper :tops='tops'></TopSwiper>
      <Pic v-for='book in books' :key='book.id' :book='book'></Pic>
      <p class='text-footer' v-show='!more'>
        没有更多数据!
      </p>
    </div>
    <div class='text-footer' v-else>
      请去登录界面扫码添加图书！
    </div>
  </div>
</template>

<script>
/* vuex grammer suger */
import { mapMutations, mapGetters } from 'vuex'
import { get } from '@/util'
import Pic from '@/components/Pic'
import TopSwiper from '@/components/TopSwiper'

export default {
	components: {
		Pic,
		TopSwiper
	},
	data() {
		return {
			books: [],
			page: 0,
			more: true,
			tops: []
		}
	},
	computed: {
		...mapGetters(['hasBooks'])
	},
	mounted() {
		this.getList(true)
		this.getTop()
	},
	/* 跳转到该页面就自动执行, onShow 是微信 API 的生命周期 */
	onShow() {
		/* [设置 title](https://developers.weixin.qq.com/miniprogram/dev/api/ui/navigation-bar/wx.setNavigationBarTitle.html) */
		wx.setNavigationBarTitle({
			title: '收藏的图书'
		})
	},
	/* 微信生命周期 */
	/* app.json */
	/* [refresh](https://developers.weixin.qq.com/miniprogram/dev/framework/config.html#%E5%85%A8%E5%B1%80%E9%85%8D%E7%BD%AE) */
	onPullDownRefresh() {
		console.log('下拉')
		this.getList(true)
		this.getTop()
	},
	/* 微信生命周期 */
	onReachBottom() {
		if (!this.more) {
			/* 没有更多了 */
			return false
		}
		this.page = this.page + 1
		this.getList()
	},
	methods: {
		/* invoked vuex/mutations */
		...mapMutations({
			/* SET_BOOKS: vuex/mutation-type */
			setBooks: 'SET_BOOKS'
		}),
		async getList(init) {
			if (init) {
				this.page = 0
				this.more = true
			}
			/* [showNavigationBarLoading](https://developers.weixin.qq.com/miniprogram/dev/api/ui/navigation-bar/wx.showNavigationBarLoading.html) */
			wx.showNavigationBarLoading()
			const books = await get('/weapp/booklist', { page: this.page })
			if (books.list.length < 3 && this.page > 0) {
				this.more = false
				console.log('没有更多数据', this.more)
			}
			if (init) {
				this.books = books.list
				/* this.setSinger: ...mapMutations */
				/* Save data to vuex/state */
				this.setBooks(this.books)
				wx.stopPullDownRefresh()
			} else {
				/* 下拉刷新, 不能直接覆盖 books 而是累加 */
				this.books = this.books.concat(books.list)
				/* this.setSinger: ...mapMutations */
				/* Save data to vuex/state */
				this.setBooks(this.books)
			}
			wx.hideNavigationBarLoading()
		},
		/* 获取排行榜 */
		async getTop() {
			const tops = await get('/weapp/top')
			this.tops = tops.list
		}
	}
}
</script>

<style lang='scss'>
.text-footer {
  position: absolute;
  bottom: 100rpx;
  left: 0;
  right: 0;
}
</style>
