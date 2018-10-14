<template>
  <div class="tag">
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
  }
}
</script>

<style lang='scss'>
.tag {
	flex-direction: row;
	justify-content: center;
	align-items: center;
	display: inline-flex;
	padding: 4rpx 12rpx;
	border-radius: 2px;
	font-size: 28rpx;
	color: #666;
	background-color: #f5f5f5;
}
</style>
