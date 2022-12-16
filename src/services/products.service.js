import axios from 'axios'

class ProductService {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/products`
        })


        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    getProducts() {
        return this.api.get('/getAllProducts')
    }

    getOneProduct(product_id) {
        return this.api.get(`/getOneProduct/${product_id}`)
    }

    saveProduct(productData) {
        return this.api.post('/saveProduct', productData)
    }

    editProduct(product_id, productData) {
        return this.api.put(`/editProduct/${product_id}`, productData)
    }

    deleteProduct(product_id) {
        return this.api.delete(`/deleteProduct/${product_id}`)
    }

    getUserProducts() {
        return this.api.get('/getUserProducts')
    }

    likeProduct(product_id) {
        return this.api.post(`/likeProduct/${product_id}`)
    }

    unlikeProduct(product_id) {
        return this.api.post(`/unlikeProduct/${product_id}`)
    }

    getLikedProduct() {
        return this.api.get('/getLikedProduct')
    }

    getUserFavs() {
        return this.api.get('/getUserFavs')
    }
}

const productsService = new ProductService()

export default productsService