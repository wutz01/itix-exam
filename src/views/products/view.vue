<template lang="pug">
  v-sheet(rounded="lg" min-height="268")
    template(v-if="!product")
      v-progress-linear(indeterminate, color="green")
    template(v-else)
      div.pa-3
        div.close-area
          v-btn(icon, @click="$router.push({ name: 'products' })")
            v-icon mdi-close
        h2 {{ product.title }}
        .caption {{ product.description }}
      v-row.mt-5
        v-col.hasBorder(cols="6", sm="6")
          div.pa-5
            p.border-bottom-hr.caption.mb-0 UNIT PRICE
            h3 {{ product.price }} € / pc
          div.mb-0.pb-0.pa-5.text-right.primary--text
            h1 {{ product.price }} €
          div.mt-0.pt-0.pa-5.primary--text.d-flex
            input.qty.ml-auto(type="text", v-model="qty")
            div.mr-5.d-flex.flex-column.border
              v-icon.qty-btn.plus.success--text(@click="qty++") mdi-plus
              v-icon.qty-btn.minus.error--text(@click="qty--") mdi-minus
            v-btn(color="primary") Add to Cart

        v-col(cols="6", sm="6")
          div
            v-img.mx-auto(:src="product.image", width='300')
</template>

<script>
import { find } from 'lodash/collection'
import { ProductService } from '@/api'
export default {
  name: 'product',
  data () {
    return {
      product: null,
      qty: 0
    }
  },
  watch: {
    qty () {
      if (this.qty < 0) this.qty = 0
    }
  },
  methods: {
    async getProduct () {
      let products = await ProductService.getProducts()
      this.product = find(products, { id: parseInt(this.$route.params.id) })
    }
  },
  mounted () {
    this.getProduct()
  }
}
</script>

<style lang="css" scoped>
.close-area {
  width: 100%;
  text-align: right;
}
.qty {
  width: 50px;
  border: 1px solid #95AC42;
  height: 36px;
  text-align: center
}
.qty-btn {
  font-size: 16px;
  border: 1px solid #95AC42;
  border-left: 0;
  cursor: pointer;
}
.plus {
  border-bottom: 0;
}
.hasBorder {
  border-right: 1px solid #e5e5e5;
}
.border-bottom-hr {
  border-bottom: 1px solid #e5e5e5;
}
</style>
