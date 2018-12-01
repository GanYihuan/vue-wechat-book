<template>
  <div class="me">
    <image class="bg" src="../../../static/img/my@bg.png"/>
    <!-- <image class="bg" src="http://pj2iyex52.bkt.clouddn.com/my@bg.png"/> -->
    <div class="userInfo">
      <div class="avatarContainer">
        <!-- <Open
          open-type="getUserInfo"
          @getuserinfo="onGetUserInfo"
        >
          <image class="avatar" :src="userInfo.avatarUrl" slot="img" />
        </Open> -->
        <image class="avatar" :src="userInfo.avatarUrl"/>
        <open-data type="userNickName"></open-data>
      </div>
      <div class="aboutContainer">
        <div class="time-container">
          <div class="date-container">
            <div class="date">{{date}}</div>
            <div class="line"></div>
          </div>
          <div class="yearMonth-container">
            <div class="year">{{year}}</div>
            <div class="month">{{month}}</div>
          </div>
        </div>
        <div class="like-container">
          <text class="book-num">{{likeBookCount}}</text>
          <text class="description">喜欢的书</text>
        </div>
      </div>
    </div>
    <!--
    <div class="phone">手机型号：
      <switch color="#EA5A49" :checked="phone" @change="getPhone"></switch>
      <span class="text-primary">{{phone}}</span>
    </div>
    <div class="location">所在城市：
      [switch](https://developers.weixin.qq.com/miniprogram/dev/component/switch.html)
      <switch color="#EA5A49" :checked="location" @change="getGeo"></switch>
      <span class="text-primary">{{location}}</span>
    </div>
    -->
    <button class="btn" @click="scanBook">扫码添加图书</button>
    <!-- <button class="btn" v-else open-type="getUserInfo" lang="zh_CN" @getuserinfo="login">点击登录</button> -->
  </div>
</template>

<script>
import qcloud from "wafer2-client-sdk";
import config from "@/config";
import { showToast, post, showModal } from "@/util";
import { mapMutations } from "vuex";
// import Open from "@/components/Open";

export default {
  // components: {
  //   Open
  // },
  data() {
    return {
      likeBookCount: 0,
      hasUserInfo: true,
      userInfo: {
        avatarUrl: "../../../static/img/unlogin.png",
        nickName: "扫码添加图书需要登录"
      },
      logged: false,
      phone: "",
      location: "",
      months: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月"
      ],
      year: Number,
      month: String,
      date: Number
    };
  },
  mounted() {
    let date = new Date();
    let iMonth = date.getMonth();
    let iDate = date.getDate();
    let iYear = date.getFullYear();
    this.month = this.months[iMonth];
    this.year = iYear;
    this.date = iDate;
  },
  /* 跳转到该页面就自动执行, onShow 是微信 API 的生命周期 */
  onShow() {
    wx.showShareMenu();
    /* [getStorageSync 获取缓存数据](https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.getStorageSync.html) */
    let userInfo = wx.getStorageSync("userInfo");
    if (userInfo) {
      this.userInfo = userInfo;
    }
    /* [设置 title](https://developers.weixin.qq.com/miniprogram/dev/api/ui/navigation-bar/wx.setNavigationBarTitle.html) */
    wx.setNavigationBarTitle({
      title: "登录"
    });
    this.hasGottenUserInfo();
  },
  methods: {
    hasGottenUserInfo() {
      /* 获取用户的当前设置 */
      wx.getSetting({
        success: data => {
          /* 如果用户已经授权 */
          if (data.authSetting["scope.userInfo"]) {
            wx.getUserInfo({
              success: data => {
                this.hasUserInfo = true;
                this.userInfo = data.userInfo;
              }
            });
          } else {
            this.hasUserInfo = false;
          }
        }
      });
    },
    onGetUserInfo(event) {
      let userInfo = event.detail.userInfo;
      if (userInfo) {
        this.hasUserInfo = true;
        this.userInfo = userInfo;
      }
    },
    ...mapMutations({
      hasBooks: "HAS_BOOKS"
    }),
    scanBook() {
      /* [scanCode](https://developers.weixin.qq.com/miniprogram/dev/api/device/scan/wx.scanCode.html) */
      wx.scanCode({
        success: res => {
          if (res.result) {
            this.addBook(res.result);
          }
        }
      });
    },
    /* isbn: 书的编号 */
    async addBook(isbn) {
      const res = await post("/weapp/addbook", {
        isbn,
        openid: this.userInfo.openId
      });
      showModal("添加成功", `${res.title}添加成功`);
    },
    getPhone(e) {
      if (e.target.value) {
        /* [getSystemInfoSync](https://developers.weixin.qq.com/miniprogram/dev/api/system/system-info/wx.getSystemInfoSync.html) */
        const phoneInfo = wx.getSystemInfoSync();
        this.phone = phoneInfo.model;
      } else {
        this.phone = "";
      }
    },
    getGeo(e) {
      /* [百度地图 api 访问应用（AK）](http://lbsyun.baidu.com/apiconsole/key) */
      const ak = "rsKejfyowllq0dD0IjLbqUaFHiqMlU4Y";
      /* [逆地理编码](http://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-geocoding-abroad) */
      let url = "http://api.map.baidu.com/geocoder/v2/";
      if (e.target.value) {
        /* [getLocation](https://developers.weixin.qq.com/miniprogram/dev/api/location/wx.getLocation.html) */
        wx.getLocation({
          success: geo => {
            wx.request({
              url,
              data: {
                ak,
                location: `${geo.latitude},${geo.longitude}`,
                output: "json"
              },
              success: res => {
                if (res.data.status === 0) {
                  this.location =
                    res.data.result.addressComponent.province +
                    " " +
                    res.data.result.addressComponent.city;
                } else {
                  this.location = "未知地点";
                }
              }
            });
          }
        });
      } else {
        this.location = "";
      }
    },
    loginSuccess(res) {
      showToast("登录成功", "success");
      /* [setStorageSync 数据缓存](https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.setStorageSync.html) */
      wx.setStorageSync("userInfo", res);
      this.userInfo = res;
      this.hasBooks(true);
    },
    login() {
      showToast("登录中", "loading");
      qcloud.setLoginUrl(config.loginUrl);
      const session = qcloud.Session.get();
      if (session) {
        qcloud.loginWithCode({
          success: res => {
            console.log("第二次登录成功", res);
            this.loginSuccess(res);
          },
          fail: err => {
            console.log("第二次登录失败", err);
          }
        });
      } else {
        qcloud.login({
          success: res => {
            console.log("登录成功", res);
            this.loginSuccess(res);
          },
          fail: err => {
            console.log("登录失败", err);
          }
        });
      }
    }
  }
};
</script>

<style lang='scss'>
.me {
  display: flex;
  flex-direction: column;
  align-items: center;
  .bg {
    width: 750rpx;
    height: 574rpx;
  }
  .userInfo {
    margin: 100rpx 0 0 0;
    text-align: center;
    position: absolute;
    top: 50rpx;
    .avatar {
      margin: 20rpx;
      border-radius: 50%;
      width: 150rpx;
      height: 150rpx;
    }
    .avatarContainer {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  .aboutContainer {
    margin: 20px 0 0 0;
    padding: 0 100rpx;
    width: 550rpx;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .time-container {
      display: inline-flex;
      flex-direction: row;
      height: 60rpx;
      .date-container {
        display: flex;
        flex-direction: row;
        /* No 08 | 基于底部对齐 */
        align-items: baseline;
        .date {
          margin: 0 14rpx 0 0;
          /* 取消字体上下间距 */
          line-height: 60rpx;
          font-size: 60rpx;
          /* 取消字体上下间距 */
          font-weight: 800;
        }
        .line {
          margin: 0 14rpx 0 0;
          border-left: 1rpx solid #000;
          height: 44rpx;
        }
      }
      .yearMonth-container {
        display: flex;
        flex-direction: column;
        margin: 5rpx 0 0 0;
        .month {
          line-height: 24rpx;
          font-size: 24rpx;
        }
        .year {
          font-size: 20rpx;
        }
      }
    }
    .like-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      .book-num {
        font-size: 36rpx;
        color: #000;
      }
      .description {
        font-size: 24rpx;
        color: #999;
      }
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
    position: absolute;
    bottom: 20rpx;
    margin-top: 20rpx;
    margin-bottom: 20rpx;
    padding-left: 30rpx;
    border-radius: 100rpx;
    // border-radius: 4rpx;
    width: 80%;
    height: 80rpx;
    line-height: 80rpx;
    font-size: 32rpx;
    color: white;
    background: #ea5a49;
  }
  .btn:active {
    background: #fa5a49;
  }
}
</style>
