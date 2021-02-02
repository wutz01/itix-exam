<template lang="pug">
v-row
  v-col(cols="12" sm="2")
    v-sheet(rounded="lg" min-height="268")
      v-list(dense)
        v-subheader Category
        v-list-item-group(color="primary")
          v-list-item(v-for="(item, i) in categories", :key="i", @click="setFilter(item)")
            v-list-item-content
              v-list-item-title {{ item }}
  v-col(cols="12" sm="8")
    v-sheet(rounded="lg" min-height="268")
      v-card.mx-auto.my-12(max-width='374', v-for="product in products", :key="product.id")
        template(slot='progress')
          v-progress-linear(color='deep-purple' height='10' indeterminate='')
        v-img(height='250', :src="product.image")
        v-card-text
          v-row.mx-0(align='center')
            .grey--text.ml-4
              | $ {{ product.price }}
        v-divider.mx-4
        v-card-title {{ product.title }}
        v-card-text
          | {{ product.description }}
  v-col(cols="12" sm="2")
    v-sheet(rounded="lg" min-height="268")
      v-list(dense)
        v-subheader Sort
        v-list-item-group(color="primary")
          v-list-item(v-for="(item, i) in sortTypes", :key="i", @click="setSort(item.value)")
            v-list-item-content
              v-list-item-title {{ item.type }}
</template>

<script>
import { ProductService } from '@/api'
import { sortedUniq } from 'lodash/array'
import { map, filter } from 'lodash/collection'
import { clone } from 'lodash/lang'
export default {
  name: 'product-listing',
  data () {
    return {
      products: null,
      allProducts: null,
      categories: [],
      filterMode: null,
      sortMode: null,
      sortTypes: [
        { type: 'Price High to Low', value: 'high' },
        { type: 'Price Low to High', value: 'low' }
      ]
    }
  },
  computed: {
  },
  watch: {
    filterMode () {
      if (this.filterMode) {
        let products = filter(this.allProducts, { category: this.filterMode })
        this.products = products
      } else {
        this.products = clone(this.allProducts)
      }
      console.log(`products`, this.products, this.products.length)
    },
    sortMode () {
      if (this.filterMode) {
        let products = filter(this.allProducts, { category: this.filterMode })
        this.products = products
      } else {
        this.products = clone(this.allProducts)
      }
      console.log(`products`, this.products, this.products.length)
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
      if (this.sortMode === sort) {
        this.sortMode = null
      } else {
        this.sortMode = sort
      }
    },
    async loadProducts () {
      this.allProducts = await ProductService.getProducts()
      this.products = clone(this.allProducts)
      this.categories = sortedUniq(map(this.products, 'category'))
      console.log(`categories`, this.categories)
      console.log(`products`, this.products, this.products.length)
    }
  },
  mounted () {
    this.loadProducts()
  }
}
</script>

<style lang="css" scoped>
</style>
