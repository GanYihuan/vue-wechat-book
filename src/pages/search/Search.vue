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
    <div class="sub-container" v-if='hasBooks'>
      <image class="head-img" src="../../../static/img/quality.png" />
      <div class="books-container">
        <SingleBook v-for='book in books' :key='book.id' :book='book'></SingleBook>
      </div>
    </div>
    <div class='text-footer footer' v-else>
      请去登录界面扫码添加图书！
    </div>
  </div>
</template>

<script>
/* vuex grammer suger */
// import { mapGetters } from 'vuex'
import { mapState } from 'vuex'
import SingleBook from '@/components/SingleBook'

export default {
	components: {
		SingleBook
	},
	computed: {
		/* books: vuex/getters.js */
		// ...mapGetters(['books']),
    ...mapState(['books', 'hasBooks']),
		searchPanel() {
			return '/pages/searchPanel/main'
		}
	},
	onShow() {
		/* [设置 title](https://developers.weixin.qq.com/miniprogram/dev/api/ui/navigation-bar/wx.setNavigationBarTitle.html) */
		wx.setNavigationBarTitle({
			title: '搜索图书'
    })
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
		margin: 100rpx 0;
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
		}
	}

	.footer {
		position: absolute;
		bottom: 100rpx;
		color: #ea5a49;
	}
}
</style>
