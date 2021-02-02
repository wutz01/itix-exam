import BaseAPIClient from './BaseApiClient'

class ProductService extends BaseAPIClient {
  getProducts () {
    return super.execGET(`/products`)
  }
}
export default new ProductService ()
