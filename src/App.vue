<script>
export default {
	async created() {
		console.log('小程序启动了!')
	}
}
</script>

<style>
.text-footer {
	margin-bottom: 10rpx;
	text-align: center;
	font-size: 24rpx;
}
.text-primary {
	color: #ea5149;
}
.page-title {
	padding-left: 40rpx;
	line-height: 80rpx;
	font-size: 28rpx;
	background: #eee;
}
.right {
	float: right;
}
.btn {
	margin-top: 20rpx;
	margin-bottom: 20rpx;
	padding-left: 30rpx;
	border-radius: 4rpx;
	width: 100%;
	height: 80rpx;
	line-height: 80rpx;
	font-size: 32rpx;
	color: white;
	background: #ea5a49;
}
.btn:active {
	background: #fa5a49;
}
</style>
