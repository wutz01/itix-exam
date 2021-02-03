<template lang="pug">
//- v-sheet(rounded="lg" min-height="268")
v-row
  v-col(cols="3", v-for="product in products", :key="product.id")
    v-hover(v-slot="{ hover }")
      v-card.clickable.pt-5.mb-5(@click="checkProduct(product.id)")
        .black--text.px-2.pb-1.font-weight-bold(style="height: 50px;") {{ product.title | truncate(30) }}
        .black--text.px-2.pb-2.caption {{ product.category }}
        v-img(height='250', :src="product.image")
          v-expand-transition
            div.d-flex.transition-fast-in-fast-out.white-hover.darken-2.v-card--reveal.black--text(v-if="hover", style="height: 100%;")
              p.pa-2.text-30 {{ product.description | truncate(150) }}
        p.price {{ product.price }} €
        v-divider.mx-4
        v-card-actions
          v-btn(depressed, block, color="primary") Add to Cart
      //- v-card-title {{ product.title }}
      //- v-card-text
        | {{ product.description }}
</template>

<script>
export default {
  name: 'product-listing',
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  methods: {
    checkProduct (productId) {
      this.$router.push({ name: 'view-product', params: { id: productId } })
    }
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
