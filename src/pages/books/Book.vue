<template>
  <div>
    <Pic v-for='book in books' :key='book.id' :book='book'></Pic>
  </div>
</template>

<script>
import { get } from '@/util'
import Pic from '@/components/Pic'

export default {
	components: {
		Pic
	},
	data() {
		return {
			books: []
		}
	},
	mounted() {
		this.getList(true)
	},
	methods: {
		async getList(init) {
			const books = await get('/weapp/booklist')
			if (init) {
				this.books = books.list
			}
		}
	}
}
</script>
