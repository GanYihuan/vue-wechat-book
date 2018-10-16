<template>
  <div class="tag" @click="clickMe">
    <p>{{keyword}}</p>
  </div>
</template>

<script>
export default {
	props: {
		keyword: {
			type: String,
			default: ''
		}
	},
	methods: {
		clickMe() {
			this.$emit('select')
		}
	}
}
</script>

<style lang='scss'>
.tag {
	flex-direction: row;
	justify-content: center;
	align-items: center;
	display: inline-flex;
	padding: 10rpx;
	margin: 10rpx;
	border: 1rpx #ea5a49 solid;
	border-radius: 20rpx;
	font-size: 28rpx;
	color: #ea5a49;
}
</style>
