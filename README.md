# net-book

> 面试作品 - 图书管理

## 效果截图

* ![图书界面](http://pj2iyex52.bkt.clouddn.com/%E6%8E%A8%E8%8D%9001.png) \* ![图书界面](http://pj2iyex52.bkt.clouddn.com/%E6%8E%A8%E8%8D%9002.png)
* ![搜索界面](http://pj2iyex52.bkt.clouddn.com/%E6%90%9C%E7%B4%A201.png) \* ![搜索界面](http://pj2iyex52.bkt.clouddn.com/%E6%90%9C%E7%B4%A202.png)
* ![扫码界面](http://pj2iyex52.bkt.clouddn.com/%E6%89%AB%E7%A0%8101.png)

## 功能介绍

> 登录界面

* 点击**点击登录**按钮获得用户信息, 用户微信头像，手机型号，所在城市
* 扫描功能, 点击**扫描添加图书**能添加一本图书到图书界面

> 图书界面

* 查看扫描添加的图书的基本信息，可以下拉滚动, 点击图书能进入图书详情页
* 图书详情页可以点击**转发好友**在微信上转发

> 搜索界面

* 下拉滚动查看扫描添加的图书，点击**搜索书籍**能跳转到搜索历史界面
* 搜索框里面写入添加的图书名称能搜索出对应的书籍，并且能显示输入的内容到历史记录里面，点击对应历史记录内容能搜索对应图书
* 点击搜索出的图书能跳转到图书详情页

## 启动方式

* 管理 node 版本 `npm i nvm` `nvm install 10.0.0`
* 开启 MySQL `mysql.server start` `mysql -u root` `create database cAuth;`
* `cd server` `nvm use 10.0.0` `npm install` `node tools/initdb.js` `npm run dev`
* `cd net-book` `nvm use 10.0.0` `npm install` `npm run dev`

## static 目录

> 图书扫码用到的二维码

## 插件和使用的技术

> mpvue

```console
nvm use 10.0.0
npm i vue -g
vue init mpvue/mpvue-quickstart net-book
```

> Scss

```console
npm install sass-loader node-sass -D
```

> koa

```console
npm i koa -S
npm i koa-router -S
```

> mysql

```console
brew install mysql
npm install nodemon -g
mysql.server start
mysql -u root
mysql> create database cAuth;
```

> ESLint

* **package.json**

```json
"scripts": {
  "lint": "eslint --ext .js,.vue src"
}
```

```console
npm run lint
```

> 将 vuex 中的数据持久化到本地 [使用 vuex-persistedstate](https://github.com/robinvdvleuten/vuex-persistedstate)

```console
npm install vuex-persistedstate
```

> 用户中心登录界面

* 小程序客户端腾讯云增强 SDK, 会话服务 [获取用户信息 wafer2-client-sdk](https://github.com/tencentyun/wafer-client-sdk/)

```console
npm install wafer2-client-sdk -S
```

> 星星组件

* **components/Rate.vue** [星星组件 vue-tiny-rate](https://github.com/shengxinjing/vue-tiny-rate)

## 上线流程

* [Development Environment request Domain Name](https://qod21e5e.qcloud.la)
  **config.js**
* **server/config.js**
* 微信工具 -> 上传测试代码 -> 除'智能上传'全打钩,登录小程序管理后台 - 开发管理 - 开发版本 就可以找到刚提交上传的版本了
* [操作](https://console.cloud.tencent.com/lav2/dev)
* ganehank.xyz
* imoocinterview.xyz
* MyAdmin user [生产环境](https://console.qcloud.com/lav2/production) user: root pass: 一只
* mysql: `use cAuth;` `show create table books;` `show create table comments;`
* MyAdmin create database, copy mysql iTerm command
* localhost, iTerm: `nslookup localhost`

## 问题:

1. phpMyAdmin 服务器为 Localhost
2. 代码部署没有上传记录
3. 微信小程序无法运行
