<template lang="pug">
v-row
  v-col(cols="12" sm="2")
    v-sheet(rounded="lg" min-height="268")
      v-list(dense)
        v-subheader Category
        v-list-item-group(color="primary")
          v-list-item(v-for="(item, i) in categories", :key="i", @click="setFilter(item)")
            v-list-item-content
              v-list-item-title {{ item | capitalize }}
  v-col(cols="12" sm="8")
    //- v-sheet(rounded="lg" min-height="268")
    v-row
      v-col(cols="3", v-for="product in products", :key="product.id")
        v-hover(v-slot="{ hover }")
          v-card.clickable.pt-5.mb-5
            .black--text.px-2.pb-1.font-weight-bold(style="height: 50px;") {{ product.title | truncate(50) }}
            .black--text.px-2.pb-2.caption {{ product.category }}
            v-img(height='250', :src="product.image")
              v-expand-transition
                div.d-flex.transition-fast-in-fast-out.white-hover.darken-2.v-card--reveal.black--text(v-if="hover", style="height: 100%;")
                  p.pa-2.text-30 {{ product.description | truncate(150) }}
            p.price $ {{ product.price }}
            v-divider.mx-4
            v-card-actions
              v-btn(depressed, block, color="primary") Add to Cart
          //- v-card-title {{ product.title }}
          //- v-card-text
            | {{ product.description }}
  v-col(cols="12" sm="2")
    v-sheet(rounded="lg" min-height="268")
      v-list(dense)
        v-subheader Sort
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
      products: null,
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
      if (this.sortMode) {
        let products = orderBy(this.products, [this.sortMode.type], [this.sortMode.value])
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
      this.sortMode = sort
    },
    async loadProducts () {
      this.allProducts = await ProductService.getProducts()
      this.products = clone(this.allProducts)
      this.categories = sortedUniq(map(this.products, 'category'))
      this.sortMode = this.sortTypes[2]
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
.clickable {
  cursor: pointer;
}

.price {
  position: absolute;
  right: 20px;
  bottom: 50px;
  background: #95AC42;
  color: white;
  padding: 2px 6px;
  border-radius: 8px;
}

.white-hover {
  background: #ffffffa1;
}
</style>
