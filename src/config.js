/* 配置项, 因为上线要换成 `上线环境部署` */
/* 开发环境部署 */
const host = 'http://localhost:5757'
/* 上线环境部署 */
// const host = 'http://qod21e5e.qcloud.la'
/* 生产环境 */
// const host = 'https://906012892.imoocinterview.xyz'
const config = {
  host,
  loginUrl: `${host}/weapp/login`,
  userUrl: `${host}/weapp/user`
}

export default config
