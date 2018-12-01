import * as types from './mutation-types'

const mutations = {
  [types.SET_BOOKS](state, books) {
    /* books: array */
    state.books = books
  },
  [types.HAS_BOOKS](state, flag) {
    /* flag: boolean */
    state.hasBooks = flag
  },
  [types.LIKE](state, like) {
    state.like = like
  }
}

export default mutations
