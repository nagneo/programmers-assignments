import { request } from "../core/api.js";
import ProductList from "./ProductList.js"

export default function ProductListPage({
    $target
}) {
    this.$element = document.createElement('div')
    this.$element.className = 'ProductListPage';
    this.$element.innerHTML = "<h1>상품목록</h1>"

    this.state = ''
    this.setState = (nextState) => {
        this.state = nextState
    }

    this.render = () => {
        $target.innerHTML = ''
        this.$element.innerHTML = "<h1>상품목록</h1>"
        $target.appendChild(this.$element)

        console.log('this rendered')
    }

    const fetchRequest = async () => {
        const products = await request('/products');
        console.log('fetchRequest' + products)
        this.setState(products)

        new ProductList({
            $target: this.$element,
            initialState: products
        })

    }

    fetchRequest();
}


{/* <div class="ProductListPage">
<h1>상품목록</h1>

</div> */}