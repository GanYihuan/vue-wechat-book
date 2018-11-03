<template>
  <div class='me'>
    <div class='userInfo'>
      <img :src='userInfo.avatarUrl' alt='用户微信头像'>
      <p>{{userInfo.nickName}}</p>
    </div>
    <div class='phone' v-if='userInfo.city'>
      手机型号：
      <switch color='#EA5A49' :checked='phone' @change='getPhone'></switch>
      <span class='text-primary'>{{phone}}</span>
    </div>
    <div class='location' v-if='userInfo.city'>
      所在城市：
      <!-- [switch](https://developers.weixin.qq.com/miniprogram/dev/component/switch.html) -->
      <switch color='#EA5A49' :checked='location' @change='getGeo'></switch>
      <span class='text-primary'>{{location}}</span>
    </div>
    <button
      class='btn'
      v-if='userInfo.city'
      @click='scanBook'
    >
      扫码添加图书
    </button>
    <!-- <button
      class='btn'
      v-else
      open-type="getUserInfo"
      lang="zh_CN"
      @click='doLogin'
    >
      点击登录
    </button> -->
    <button
      v-else
      class='btn'
      open-type="getUserInfo"
      lang="zh_CN"
      @getuserinfo="doLogin"
    >
      点击登录
    </button>
  </div>
</template>

<script>
import qcloud from 'wafer2-client-sdk'
import config from '@/config'
import { showSuccess, post, showModal } from '@/util'
import { mapMutations } from 'vuex'

export default {
	data() {
		return {
			userInfo: {
				avatarUrl: '../../../static/img/unlogin.png',
				nickName: '未登录'
			},
			logged: false,
			phone: '',
			location: ''
		}
	},
	/* 跳转到该页面就自动执行, onShow 是微信 API 的生命周期 */
	onShow() {
		let userInfo = wx.getStorageSync('userInfo')
		if (userInfo) {
			this.userInfo = userInfo
		}
		/* [设置 title](https://developers.weixin.qq.com/miniprogram/dev/api/ui/navigation-bar/wx.setNavigationBarTitle.html) */
		wx.setNavigationBarTitle({
			title: '登录'
		})
	},
	methods: {
		...mapMutations({
			hasBooks: 'HAS_BOOKS'
		}),
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
		getPhone(e) {
			console.log('手机型号获取中')
			console.log(this.userInfo)
			if (e.target.value) {
				/* [getSystemInfoSync](https://developers.weixin.qq.com/miniprogram/dev/api/system/system-info/wx.getSystemInfoSync.html) */
				const phoneInfo = wx.getSystemInfoSync()
				// console.log(phoneInfo)
				this.phone = phoneInfo.model
			} else {
				/* 没选中 */
				this.phone = ''
			}
		},
		getGeo(e) {
			/* [百度地图 api 访问应用（AK）](http://lbsyun.baidu.com/apiconsole/key) */
			const ak = 'rsKejfyowllq0dD0IjLbqUaFHiqMlU4Y'
			/* [逆地理编码](http://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-geocoding-abroad) */
			let url = 'http://api.map.baidu.com/geocoder/v2/'
			if (e.target.value) {
				/* [getLocation](https://developers.weixin.qq.com/miniprogram/dev/api/location/wx.getLocation.html) */
				wx.getLocation({
					success: geo => {
						// console.log(geo)
						wx.request({
							url,
							data: {
								ak,
								location: `${geo.latitude},${geo.longitude}`,
								output: 'json'
							},
							success: res => {
								console.log(res)
								if (res.data.status === 0) {
									this.location =
										res.data.result.addressComponent.province +
										' ' +
										res.data.result.addressComponent.city
								} else {
									this.location = '未知地点'
								}
							}
						})
					}
				})
			} else {
				this.location = ''
			}
		},
		doLogin() {
			/* [qcloud 获取用户信息 wafer2-client-sdk](https://github.com/tencentyun/wafer-client-sdk/) */
			/* [getStorageSync 获取缓存数据](https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.getStorageSync.html) */
			let user = wx.getStorageSync('userInfo')
			if (!user) {
				if (user) {
					// 第二次登录
					// 或者本地已经有登录态
					// 可使用本函数更新登录态
					qcloud.loginWithCode({
						success: res => {
							// qcloud.request({
							// 	/* 想要使用 optionId 要请求 server/routes/index.js/用户信息接口 */
							// 	url: config.userUrl,
							// 	login: true,
							// 	success: userRes => {
							// 		console.log(userRes)
							// 		/* [setStorageSync 数据缓存](https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.setStorageSync.html) */
							// 		wx.setStorageSync('userInfo', userRes.data.data)
							// 		this.userInfo = userRes.data.data
							// 		showSuccess('登录成功')
							// 	}
							// })
							console.log(res)
							/* [setStorageSync 数据缓存](https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.setStorageSync.html) */
							wx.setStorageSync('userInfo', res)
							this.userInfo = res
							showSuccess('第二次登录成功')
							this.hasBooks(true)
						},
						fail: err => {
							console.log('第二次登录失败', err)
						}
					})
				} else {
					// 首次登录
					qcloud.setLoginUrl(config.loginUrl)
					qcloud.login({
						success: res => {
							// qcloud.request({
							// 	/* 想要使用 optionId 要请求 server/routes/index.js/用户信息接口 */
							// 	url: config.userUrl,
							// 	login: true,
							// 	success: userRes => {
							// 		console.log(userRes)
							// 		/* [setStorageSync 数据缓存](https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.setStorageSync.html) */
							// 		wx.setStorageSync('userInfo', userRes.data.data)
							// 		this.userInfo = userRes.data.data
							// 		showSuccess('登录成功')
							// 	}
							// })
							console.log(res)
							/* [setStorageSync 数据缓存](https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.setStorageSync.html) */
							wx.setStorageSync('userInfo', res)
							this.userInfo = res
							showSuccess('登录成功')
							this.hasBooks(true)
						},
						fail: err => {
							console.log('登录失败', err)
						}
					})
				}
			}
			// this.hasBooks(true)
		}
		// onGotUserInfo(e) {
		// 	let user = wx.getStorageSync('userInfo')
		// 	if (!user) {
		//     wx.setStorageSync('userInfo', e.mp.detail.userInfo)
		//     this.userInfo = e.mp.detail.userInfo
		//     showSuccess('获取用户信息成功')
		// 	}
		//   console.log(e.mp.detail.userInfo)
		//   this.hasBooks(true)
		// }
	}
}
</script>

<style lang='scss'>
.me {
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

	.phone {
		margin: 20rpx 0 0 0;
		padding: 10rpx 20rpx;
	}

	.location {
		margin: 20rpx 0 0 0;
		padding: 10rpx 20rpx;
	}

	.btn {
		border-radius: 100rpx;
	}
}
</style>
