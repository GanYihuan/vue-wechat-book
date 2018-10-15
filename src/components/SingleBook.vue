<template>
  <a :href="detailUrl">
    <div class="container">
      <img class="img" :src="book.image" mode="aspectFit">
      <div class="description">
        <div class="title">{{book.title}}</div>
        <div class="author">{{book.author}}</div>
        <div class="foot">
          {{book.rate}}分
          <Rate :value="book.rate"></Rate>
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
	}
}
</script>

<style lang='scss'>
.container {
	display: flex;
	flex-direction: column;
	/* 使其不为 static */
	position: relative;
	margin-top: 30rpx;
	width: 240rpx;
	height: 360rpx;
	box-shadow: 4rpx 4rpx 6rpx #e3e3e3;

	.img {
		border-radius: 4rpx;
		width: 100%;
		height: 100%;
	}

	.description {
		display: flex;
		flex-direction: column;
		/* 覆盖 位置重叠 */
		/* 参照元素为 relative 的元素, 不参考 static */
		position: absolute;
		bottom: 0;
		padding: 5rpx 10rpx 8rpx 15rpx;
		border-bottom-right-radius: 4rpx;
		border-bottom-left-radius: 4rpx;
		/* height: 100rpx; */
		/* 真正宽度要加上 panding border */
		/* 240rpx - 10prx - 15rpx = 215rpx, 不取奇数, 216rpx */
		/* width: 100%; */
		width: 216rpx;
		font-size: 24rpx;
		background-color: #fff;

		.title {
      margin-top: 10rpx;
      /* two ... */
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}

		.author {
			margin: 0 0 10rpx 0;
			font-size: 20rpx;
      color: #999;
      /* two ... */
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}

		.foot {
			display: flex;
			flex-direction: row;
			justify-content: flex-end;
			font-size: 20rpx;
			color: #ea5149;
		}
	}
}
</style>
