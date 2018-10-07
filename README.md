# net-book

> A Mpvue project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## node

```console
<!-- 管理 node 版本 -->
npm i nvm
nvm install 10.0.0
nvm use 10.0.0
```

## 用户中心界面

* 小程序客户端腾讯云增强 SDK, 会话服务 [获取用户信息 wafer2-client-sdk](https://github.com/tencentyun/wafer-client-sdk/)
* **App.vue** 获取用户信息后数据会储存到数据库里 cSessionInfo

```console
npm install wafer2-client-sdk -S
npm install sass-loader node-sass -D
```
