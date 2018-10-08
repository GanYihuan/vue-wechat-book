<template>
  <div class='container'>
    <div class='userInfo'>
      <img :src='userInfo.avatarUrl' alt='用户微信头像'>
      <p>{{userInfo.nickName}}</p>
    </div>
    <button
      class='btn'
      v-if='userInfo.openId'
      @click='scanBook'
    >
      扫码添加图书
    </button>
		<button
      class='btn'
      v-else
      @click='login'
      open-type="getUserInfo"
      lang="zh_CN"
    >
      点击登录
    </button>
  </div>
</template>

<script>
import qcloud from 'wafer2-client-sdk'
// import { showSuccess, post, showModal } from '@/util'
import config from '@/config'
import { post, showModal } from '@/util'

export default {
	data() {
		return {
			userInfo: {
				avatarUrl: '../../../static/img/unlogin.png',
				nickName: '未登录'
			},
			logged: false
		}
	},
	/* 跳转到该页面就自动执行, onShow 是微信 API 的生命周期 */
	onShow() {
		let userInfo = wx.getStorageSync('userInfo')
		if (userInfo) {
			this.userInfo = userInfo
		}
	},
	methods: {
		scanBook() {
			/* [scanCode](https://developers.weixin.qq.com/miniprogram/dev/api/device/scan/wx.scanCode.html) */
			wx.scanCode({
				success: res => {
					if (res.result) {
						this.addBook(res.result)
					}
				}
			})
		},
		/* isbn: 书的编号 */
		async addBook(isbn) {
			console.log(isbn)
			/* 传递给 server */
			const res = await post('/weapp/addbook', {
				isbn,
				openid: this.userInfo.openId
			})
			showModal('添加成功', `${res.title}添加成功`)
		},
		login() {
			let user = wx.getStorageSync('userInfo')
			if (!user) {
				const session = qcloud.Session.get()
				if (session) {
					qcloud.loginWithCode({
						success: res => {
              this.userInfo = res
              wx.setStorageSync('userInfo', res)
							console.log('第二次登录登录成功', res)
						},
						fail: err => {
							console.error('第二次登录登录错误', err)
						}
					})
				} else {
					// 首次登录
					qcloud.setLoginUrl(config.loginUrl)
					qcloud.login({
						success: res => {
							this.userInfo = res
              wx.setStorageSync('userInfo', res)
              console.log('登录成功', res)
						},
						fail: err => {
							console.error('登录错误', err)
						}
					})
				}
			}
		}
	}
}
</script>

<style lang='scss'>
.container {
	padding: 0 30rpx;
	.userInfo {
		margin-top: 100rpx;
		text-align: center;
		img {
			margin: 20rpx;
			border-radius: 50%;
			width: 150rpx;
			height: 150rpx;
		}
	}
}
</style>
