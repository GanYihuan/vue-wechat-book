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
        <Tag v-for="(keyword, index) in keywords" :key="index" :keyword="keyword"></Tag>
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
    <p class="empty-tip" v-if="noResult">没有搜索到书籍</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { get } from '@/util'
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
		// ...mapState(['books']),
		...mapGetters(['books'])
	},
	methods: {
		del() {
			this.val = ''
		},
		getHistory() {
			let keywords = wx.getStorageSync(this.key)
			console.log('getHistory keywords: ' + keywords)
			return keywords
		},
		onConfirm() {
			let query = this.val
			console.log('comfirm query: ' + this.val)
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
			console.log('confirm after keyword: ' + this.keywords)
			this.val = ''
			/* 查出所有图书, 带查询书名 query, 只显示 query 结果 */
			// this.getList(true, query)
			console.log('books: ' + this.books)
			// this.getBookTitle()
			// for (let i = 0; i < this.booksTitle.length; i++) {
			// 	let oneBook = this.booksTitle[i]
			// 	console.log('转成字符串的书名: ' + JSON.stringify(oneBook))
			// 	console.log('!!' + oneBook.indexOf(query))
			// 	if (oneBook.indexOf(query) === 0) {
			// 		this.searchBooks.push(oneBook)
			// 	} else {
			// 		console.log('最终结果: ')
			//   }
			//   console.log('最终结果: ' + this.searchBooks)
			// }

			/*
      搜索结果 query
      查找出 query 位于 books 的位置
      books 删除 (query 所在位置以外内容) || 获取 query 所在位置内容, 构建成新 new books, 传递给 SingleBook.vue
      */
			// 原始 books
			let res = this.books
			// 目标 books: [{},{},{}...]
			let searchBook = res.slice()
			console.log(searchBook)
			for (let i = 0; i < searchBook.length; i++) {
				let itemTitle = searchBook[i].title
				if (itemTitle.search(query) === 0) {
					console.log(i)
					this.searchResult.push(searchBook[i])
					console.log('searchResult: ' + this.searchResult)
					this.showResult = true
				}
			}
		},
		getBookTitle() {
			/*
      搜索结果 query
      查找出 query 位于 books 的位置
      books 删除 (query 所在位置以外内容) || 获取 query 所在位置内容, 构建成新 new books, 传递给 SingleBook.vue
      */
			// 原始 books
			let res = this.books
			// 目标 books: [{},{},{}...]
			let searchBook = res.slice()
			console.log(searchBook)
			// console.log('上面: ' + searchBook.length)
			// for (let i = 0; i < booksLength; i++) {
			// 	console.log('singleBook Title: ' + searchBook[i].title)
			// 	this.booksTitle = this.booksTitle.concat(searchBook[i].title)
			// 	let targetNum = searchBook.indexOf(searchBook[i].title)
			// 	console.log('targetNum: ' + targetNum)
			// }
			// console.log('booksTitle: ' + this.booksTitle)
		},
		async getList(init, query) {
			if (init) {
				this.page = 0
				this.more = true
			}
			/* [showNavigationBarLoading](https://developers.weixin.qq.com/miniprogram/dev/api/ui/navigation-bar/wx.showNavigationBarLoading.html) */
			wx.showNavigationBarLoading()
			const books = await get('/weapp/booklist', {
				page: this.page,
				singleTitle: query
			})
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
		top: 50%;
		width: 100%;
		text-align: center;
		color: #ea5149;
	}
}
</style>
