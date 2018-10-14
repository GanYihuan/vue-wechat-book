import * as types from './mutation-types'

const mutations = {
  [types.SET_BOOKS](state, books) {
    /* books: array */
    state.books = books
  }
}

export default mutations
