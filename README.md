# net-book

> 面试作品 - 图书管理

## static

> 图书扫码用到的二维码

## node

```console
<!-- 管理 node 版本 -->
npm i nvm
nvm install 10.0.0
nvm use 10.0.0
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
