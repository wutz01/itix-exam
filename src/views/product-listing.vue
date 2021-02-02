<template lang="pug">
  div
    p hello asd dsad
</template>

<script>
import { ProductService } from '@/api'
export default {
  name: 'product-listing',
  data () {
    return {
      products: null
    }
  },
  methods: {
    async loadProducts () {
      console.log(`i got caleld`)
      this.products = await ProductService.getProducts()
    }
  },
  mounted () {
    this.loadProducts()
  }
}
</script>

<style lang="css" scoped>
</style>
