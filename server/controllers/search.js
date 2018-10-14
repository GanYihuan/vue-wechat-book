const { mysql } = require('../qcloud')

module.exports = async ctx => {
  const { singleTitle } = ctx.request.query
  let title = singleTitle
  /* 查出所有 title */
  const mysqlSelect = await mysql('books')
    .select('books.*')
    .where('title', title)
  /* 返回 */
  ctx.state.data = {
    mysqlSelect
  }
}
