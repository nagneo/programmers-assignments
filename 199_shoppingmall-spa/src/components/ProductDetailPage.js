import ProductDetail from "./ProductDetail.js"
import { request } from "../core/api.js"

export default function ProductDetailPage({
    $target,
    productId
}) {
    this.$element = document.createElement('div')
    this.$element.className = 'ProductDetailPage';

    this.state = {
        productId,
        product: null
    }

    this.setState = (nextState) => {
        this.state = nextState
        this.render();
    }

    this.render = () => {
        $target.innerHTML = ''
        this.$element.innerHTML = "<h1>상품 정보</h1>"
        $target.appendChild(this.$element)
        if (!this.state.product) {
            return;
        }
        
        new ProductDetail({
            $target: this.$element,
            initialState: {
                product: this.state.product,
                selectedOptions: []
            }
        })
    }

    const fetchRequest = async () => {
        const { productId } = this.state
        const product = await request(`/products/${productId}`);
        this.setState({
            ...this.state,
            product
        })
    }

    console.log('fetchedRequest')
    fetchRequest()
}