# net-book

> 面试作品 - 图书管理

## 效果截图

* ![推荐界面](static/推荐01.png)
* ![推荐界面]("static/推荐02.png")
* ![推荐界面]("static/推荐03.png")
* ![搜索界面]("static/搜索01.png")
* ![搜索界面]("static/搜索02.png")
* ![登录界面]("static/登录01.png")
* ![登录界面]("static/登录02.png")

## 启动方式

* 开启 MySQL `mysql.server start`
* `cd server` `nvm use 10.0.0` `npm run dev`
* `cd net-book` `npm run dev`

## appid

* wxabcaad13aeed9229

## static

> 图书扫码用到的二维码

## node

```console
<!-- 管理 node 版本 -->
npm i nvm
nvm install 10.0.0
nvm use 10.0.0
```

> 将 vuex 中的数据持久化到本地 [使用 vuex-persistedstate](https://github.com/robinvdvleuten/vuex-persistedstate)

```console
npm install vuex-persistedstate
```

## 用户中心登录界面

* 小程序客户端腾讯云增强 SDK, 会话服务 [获取用户信息 wafer2-client-sdk](https://github.com/tencentyun/wafer-client-sdk/)
* **App.vue** 获取用户信息后数据会储存到数据库里 cSessionInfo

```console
npm install wafer2-client-sdk -S
npm install sass-loader node-sass -D
```

## 添加图书到后端 mysql

* **pages/me/Me.vue** 添加图书到后端
* **server/route/index.js**
* **server/controllers/addbook.js**

## 图书

* 图书列表 **pages/books/Book.vue**
* 星星组件 **components/Rate.vue** [vue-tiny-rate](https://github.com/shengxinjing/vue-tiny-rate)

## 下拉刷新，加载

* **pages/books/Book.vue**

## 图书访问次数统计

* **pages/detail/Detail.vue**
* **server/controllers/bookDetail.js**

## 轮播图

* **server/controllers/top.js** 获取部分图书数据, 按照浏览数量来排序
* **components/TopSwiper.vue**

## 图书详情页

* **components/BookInfo.vue**

## 评论

## 上线

* [Development Environment request Domain Name](https://qod21e5e.qcloud.la)
  **config.js**
* **server/config.js**
* 微信工具 -> 上传测试代码 -> 除'智能上传'全打钩,登录小程序管理后台 - 开发管理 - 开发版本 就可以找到刚提交上传的版本了
* [操作](https://console.cloud.tencent.com/lav2/dev)
* ganehank.xyz
* imoocinterview.xyz
* MyAdmin user [生产环境](https://console.qcloud.com/lav2/production) user: root pass: Wedj8ysb
* mysql: `use cAuth;` `show create table books;` `show create table comments;`
* MyAdmin create database, copy mysql iTerm command
* localhost, iTerm: `nslookup localhost`
