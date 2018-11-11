<template>
  <a :href="detailUrl">
    <div class="book-card">
      <div class="thumb" @click.stop="preview">
				<!-- [mode](https://developers.weixin.qq.com/miniprogram/dev/component/image.html) -->
        <img class="img" :src="book.image" mode="aspectFit"/>
      </div>
      <div class="detail">
        <div class="row text-primary">
          {{book.title}}
        </div>
        <div class="row">
          {{book.author}}
        </div>
        <div class="row">
          {{book.publisher}}
        </div>
        <div class="row text-primary">
          {{book.rate}} <Rate :value='book.rate'></Rate>
        </div>
      </div>
    </div>
  </a>
</template>

<script>
import Rate from '@/components/Rate'
export default {
	components: {
		Rate
	},
	props: ['book'],
	computed: {
		detailUrl() {
			return '/pages/detail/main?id=' + this.book.id
		}
	},
	methods: {
		preview() {
			/* [previewImage](https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.previewImage.html) */
			wx.previewImage({
				current: this.book.image,
				urls: [this.book.image]
			})
		}
	}
}
</script>

<style lang='scss' scoped>
.book-card {
	display: flex;
	margin: 10rpx 0;
	padding: 10rpx;
	font-size: 28rpx;
	overflow: hidden;
	.thumb {
		flex: 0 0 200rpx;
		width: 200rpx;
		height: 200rpx;
		.img {
			max-width: 100%;
			max-height: 100%;
		}
	}
	.detail {
		flex: 1;
		.row {
			margin: 0 0 10rpx 0;
			line-height: 40rpx;
			/* 超出显示...(two) */
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
		}
	}
}
</style>
