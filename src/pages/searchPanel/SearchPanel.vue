<template>
  <div class="searchPanel">
    <div class="header">
      <div class="search-container">
        <image class="icon" src="../../../static/img/search.png" />
        <input class="bar" placeholder="书籍名称" v-model="val" @confirm="confirm"/>
        <image class="cancel-img" src="../../../static/img/cancel.png" @click="del" />
      </div>
    </div>
    <div>
      <div class="history">
        <div class="title">
          <div class="chunk"></div>
          <p>历史搜索</p>
        </div>
        <div class="tags">
          <Tag v-for="(keyword, index) in keywords" :key="index" :keyword="keyword"></Tag>
        </div>
      </div>
      <div class="history hot-search">
        <div class="title">
          <div class="chunk"></div>
          <div>热门搜索</div>
        </div>
        <div class="tags">
          <Tag></Tag>
        </div>
      </div>
    </div>
    <div class="books-container">
    </div>
    <p class="empty-tip">没有搜索到书籍</p>
  </div>
</template>

<script>
import Tag from '@/components/Tag'

export default {
	components: {
		Tag
	},
	data() {
		return {
			val: '',
			historyKeys: [],
      key: 'q',
      max: 3,
      keywords: []
		}
	},
	attached: function() {
		this.setData({
			historyKeys: this.getHistory()
		})
	},
	methods: {
		del() {
			this.val = ''
		},
		getHistory() {
			var keywords = wx.getStorageSync(this.key)
			return keywords
		},
		confirm() {
			// console.log(this.val)
			let query = this.val
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
      console.log('keyword3: ' + this.keywords)
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

	.hot-search {
		margin-top: 70rpx;
	}

	.books-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		flex-wrap: wrap;
		margin-top: 100rpx;
		padding: 0 90rpx 0 90rpx;
		width: 570rpx;

		book-cmp {
			margin-bottom: 25rpx;
		}
	}

	.empty-tip {
		display: inline-block;
		position: absolute;
		top: 50%;
		width: 100%;
		text-align: center;
	}
}

.loading {
	margin: 50rpx 0 50rpx 0;
}

.loading-center {
	position: absolute;
	top: 50%;
	left: 50%;
}

.in-bar {
	color: #999;
}

.tags tag-cmp {
	margin-right: 20rpx;
	margin-bottom: 20rpx;
}

.test {
	background-color: #000;
}
</style>
