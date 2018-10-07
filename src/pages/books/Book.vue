<template>
  <div>
    <Pic v-for='book in books' :key='book.id' :book='book'></Pic>
    <p class='text-footer' v-if='!more'>
      没有更多数据
    </p>
  </div>
</template>

<script>
import { get } from '@/util'
import Pic from '@/components/Pic'

export default {
	components: {
		Pic
	},
	data() {
		return {
      books: [],
      page: 0,
			more: true,
			tops: []
		}
	},
	mounted() {
		this.getList(true)
  },
  /* 微信生命周期 */
  /* app.json */
	/* [refresh](https://developers.weixin.qq.com/miniprogram/dev/framework/config.html#%E5%85%A8%E5%B1%80%E9%85%8D%E7%BD%AE) */
	onPullDownRefresh() {
		console.log('下拉')
		this.getList(true)
		// this.getTop()
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
        wx.stopPullDownRefresh()
      } else {
				/* 下拉刷新, 不能直接覆盖 books 而是累加 */
				this.books = this.books.concat(books.list)
			}
      wx.hideNavigationBarLoading()
		}
	}
}
</script>
