<template lang="pug">
v-row
  v-col(cols="12" sm="2")
    v-list(dense)
      //- v-subheader Category
      v-list-item-group(color="primary")
        v-list-item(v-for="(item, i) in categories", :key="i", @click="setFilter(item)")
          v-list-item-content
            v-list-item-title {{ item | capitalize }}
  v-col(cols="12" sm="8")
    template(v-if="$route.name === 'view-product'")
      router-view
    template(v-else)
      listing(:products="products")
  v-col(cols="12" sm="2")
    v-list(dense)
      //- v-subheader Sort
      v-list-item-group(color="primary", v-model="sortIndex")
        v-list-item(v-for="(item, i) in sortTypes", :key="i", @click="setSort(item)")
          v-list-item-content
            v-list-item-title {{ item.mode }}
</template>

<script>
import { ProductService } from '@/api'
import { sortedUniq } from 'lodash/array'
import { map, filter, orderBy } from 'lodash/collection'
import { clone } from 'lodash/lang'
export default {
  name: 'product-listing',
  data () {
    return {
      products: [],
      allProducts: null,
      categories: [],
      filterMode: null,
      sortMode: null,
      sortIndex: 2,
      sortTypes: [
        { mode: 'Price High to Low', value: 'desc', type: 'price' },
        { mode: 'Price Low to High', value: 'asc', type: 'price' },
        { mode: 'Sort Alphabetical ASC', value: 'asc', type: 'title' },
        { mode: 'Sort Alphabetical DESC', value: 'desc', type: 'title' }
      ]
    }
  },
  components: {
    listing: () => import('@/views/products/listing'),
  },
  watch: {
    filterMode () {
      if (this.filterMode) {
        let products = filter(this.allProducts, { category: this.filterMode })
        this.products = products
      } else {
        this.products = clone(this.allProducts) // using this method, it is faster if our data is small; however if we have big data
        // this.loadProducts() // calling the api again is much better
      }
    },
    sortMode () {
      let products = orderBy(this.products, [this.sortMode.type], [this.sortMode.value])
      this.products = products
    }
  },
  methods: {
    setFilter (filter) {
      if (this.filterMode === filter) {
        this.filterMode = null
      } else {
        this.filterMode = filter
      }
    },
    setSort (sort) {
      this.sortMode = sort
    },
    async loadProducts () {
      this.allProducts = await ProductService.getProducts()
      this.products = clone(this.allProducts)
      this.categories = sortedUniq(map(this.products, 'category'))
      this.sortMode = this.sortTypes[2]
    }
  },
  mounted () {
    this.loadProducts()
  }
}
</script>

<style lang="css" scoped>

</style>
