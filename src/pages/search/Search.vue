<template>
  <div class="search">
    <div class="header">
      <a :href="searchPanel">
        <div class="box">
          <image class="header-img" src="../../../static/img/search.png" />
          <p>搜索书籍</p>
        </div>
      </a>
    </div>
    <div class="sub-container">
      <image class="head-img" src="../../../static/img/quality.png"/>
      <div class="books-container">
        <SingleBook v-for='book in books' :key='book.id' :book='book'></SingleBook>
      </div>
    </div>
    <p class='text-footer' v-if='!more'>
      没有更多数据!
    </p>
  </div>
</template>

<script>
import { get } from '@/util'
import SingleBook from '@/components/SingleBook'

export default {
	components: {
		SingleBook
	},
	data() {
		return {
			books: [],
			page: 0,
			more: true
		}
	},
	computed: {
		searchPanel() {
			return '/pages/searchPanel/main'
		}
	},
	mounted() {
		this.getList(true)
	},
	onShow() {
		/* [设置 title](https://developers.weixin.qq.com/miniprogram/dev/api/ui/navigation-bar/wx.setNavigationBarTitle.html) */
		wx.setNavigationBarTitle({
			title: '搜索图书'
		})
	},
	/* 微信生命周期 */
	/* app.json */
	/* [refresh](https://developers.weixin.qq.com/miniprogram/dev/framework/config.html#%E5%85%A8%E5%B1%80%E9%85%8D%E7%BD%AE) */
	onPullDownRefresh() {
		console.log('下拉')
		this.getList(true)
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

<style lang='scss'>
.search {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;

	.header {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		z-index: 99;
		position: fixed;
		top: 0;
		box-shadow: 0 0 6rpx 0 #e3e3e3;
		border-top: 2rpx solid #f5f5f5;
		border-bottom: 2rpx solid #f5f5f5;
		width: 100%;
		height: 100rpx;
		background-color: #fff;

		.box {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			border-radius: 100rpx;
			width: 700rpx;
			height: 68rpx;
			color: #999;
			background-color: #f5f5f5;

			image {
				margin-right: 20rpx;
				margin-bottom: -4rpx;
				width: 28rpx;
				height: 28rpx;
			}
		}
	}

	.sub-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 100rpx;
		background-color: #f5f5f5;

		.head-img {
			margin-top: 40rpx;
			width: 106rpx;
			height: 34rpx;
		}

		.books-container {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			flex-wrap: wrap;
			margin-top: 10rpx;
			padding: 0 90rpx;

			book-cmp {
				margin-bottom: 30rpx;
			}
		}
	}
}
</style>
