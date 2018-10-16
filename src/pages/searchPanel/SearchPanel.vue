<template>
  <div class="searchPanel">
    <div class="header">
      <div class="search-container">
        <image class="icon" src="../../../static/img/search.png" />
        <input class="bar" placeholder="书籍名称" v-model="val" @confirm="onConfirm" />
        <image class="cancel-img" src="../../../static/img/cancel.png" @click="del" />
      </div>
    </div>
    <div class="history">
      <div class="title">
        <div class="chunk"></div>
        <p>历史搜索</p>
      </div>
      <div class="tags">
        <Tag v-for="(keyword, index) in keywords" :key="index" :keyword="keyword" @select="onConfirm(keyword)"></Tag>
      </div>
    </div>
    <div class="books-container" v-if="showResult">
      <div class="title">
        <div class="chunk"></div>
        <p>搜索结果</p>
      </div>
      <div class="searchResult">
        <SingleBook v-for='book in searchResult' :key='book.id' :book='book'></SingleBook>
      </div>
    </div>
    <div class="empty-tip" v-if="noResult">没有搜索到书籍</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Tag from '@/components/Tag'
import SingleBook from '@/components/SingleBook'

export default {
	components: {
		Tag,
		SingleBook
	},
	data() {
		return {
			val: '',
			key: 'q',
			max: 10,
			keywords: [],
			noResult: false,
			showResult: false,
			searchResult: [],
			searchBooks: [],
			page: 0,
			more: true,
			booksTitle: []
		}
	},
	onShow() {
		this.keywords = this.getHistory()
		/* [设置 title](https://developers.weixin.qq.com/miniprogram/dev/api/ui/navigation-bar/wx.setNavigationBarTitle.html) */
		wx.setNavigationBarTitle({
			title: '搜索图书'
		})
	},
	computed: {
		...mapGetters(['books'])
	},
	methods: {
		del() {
			this.val = ''
		},
		getHistory() {
			let keywords = wx.getStorageSync(this.key)
			// console.log('getHistory keywords: ' + keywords)
			return keywords
		},
		onConfirm(tagName) {
			this.noResult = true
			let query = this.val || tagName
			console.log('搜索的值: ' + query)
			let keywords = this.getHistory()
			if (keywords) {
				let index = keywords.indexOf(query)
				if (index === -1) {
					let length = keywords.length
					if (length >= this.max) {
						keywords.pop(query)
					}
					keywords.unshift(query)
				}
				wx.setStorageSync(this.key, keywords)
			} else {
				keywords = [query]
				wx.setStorageSync(this.key, keywords)
			}
			this.keywords = keywords
			// console.log('confirm after keyword: ' + this.keywords)
			// console.log('books: ' + this.books)
			let res = this.books
			// 目标 books: [{},{},{}...]
			let searchBook = res.slice()
			// console.log(searchBook)
			for (let i = 0; i < searchBook.length; i++) {
				let itemTitle = searchBook[i].title
				if (itemTitle.search(query) === 0) {
					if (!this.searchResult.includes(searchBook[i])) {
						this.searchResult.push(searchBook[i])
						this.noResult = false
					}
					if (this.searchResult.includes(searchBook[i])) {
						this.noResult = false
					}
					// console.log('searchResult: ' + this.searchResult)
					this.showResult = true
				}
			}
			this.val = ''
		}
	}
}
</script>

<style lang='scss'>
.searchPanel {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;

	.header {
		display: flex;
		flex-direction: row;
		align-items: center;
		z-index: 99;
		position: fixed;
		border-top: 2rpx solid #f5f5f5;
		border-bottom: 2rpx solid #f5f5f5;
		width: 100%;
		height: 100rpx;
		background-color: #fff;

		.search-container {
			display: inline-flex;
			flex-direction: row;
			align-items: center;
			margin: 0 20rpx;
			border-radius: 100rpx;
			width: 100%;
			background-color: #f5f5f5;

			.icon {
				margin-left: 24rpx;
				margin-right: 16rpx;
				width: 28rpx;
				height: 28rpx;
			}

			.bar {
				display: inline-block;
				border-top-right-radius: 30rpx;
				border-bottom-right-radius: 30rpx;
				width: 100%;
				height: 68rpx;
				font-size: 14px;
			}

			.cancel-img {
				position: absolute;
				right: 40rpx;
				width: 28rpx;
				height: 28rpx;
			}
		}
	}

	.history {
		display: flex;
		flex-direction: column;
		margin: 160rpx 0 20rpx 0;
		width: 690rpx;
		font-size: 28rpx;

		.title {
			display: flex;
			flex-direction: row;
			align-items: center;
			line-height: 30rpx;

			.chunk {
				display: inline-block;
				margin-right: 20rpx;
				width: 10rpx;
				height: 30rpx;
				background-color: #000;
			}
		}

		.tags {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			margin-top: 24rpx;
			padding-left: 30rpx;
			width: 630rpx;
		}
	}

	.books-container {
		display: flex;
		flex-direction: column;
		margin: 50rpx 0 20rpx 0;
		width: 690rpx;
		font-size: 28rpx;

		.title {
			display: flex;
			flex-direction: row;
			align-items: center;
			line-height: 30rpx;

			.chunk {
				display: inline-block;
				margin-right: 20rpx;
				width: 10rpx;
				height: 30rpx;
				background-color: #000;
			}
		}

		.searchResult {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			flex-wrap: wrap;
			margin: 50rpx 0;
			padding: 0 90rpx 0 90rpx;
			width: 570rpx;
		}
	}

	.empty-tip {
		display: inline-block;
		position: absolute;
		bottom: 20rpx;
		width: 100%;
		text-align: center;
		font-size: 24rpx;
		color: #ea5149;
	}
}
</style>
