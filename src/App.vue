<script>
export default {
	async created() {
		console.log('小程序启动了!')
	}
}
</script>

<style>
.text-footer {
	margin-bottom: 5px;
	text-align: center;
	font-size: 12px;
}
.text-primary {
	color: #ea5149;
}
.page-title {
	padding-left: 20px;
	line-height: 40px;
	font-size: 14px;
	background: #eee;
}
.right {
	float: right;
}
.btn {
  margin-top: 10px;
	margin-bottom: 10px;
	padding-left: 15px;
	border-radius: 2px;
	width: 100%;
	height: 40px;
	line-height: 40px;
	font-size: 16px;
	color: white;
	background: #ea5a49;
}
.btn:active {
	background: #fa5a49;
}
</style>
