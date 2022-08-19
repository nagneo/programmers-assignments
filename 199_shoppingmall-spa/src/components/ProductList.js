import { routeInvoke } from "../core/router.js"

export default function ProductList({
    $target,
    initialState
}) {
    this.$element = document.createElement('ul')
    this.state = initialState

    this.setState = (nextState) => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        $target.appendChild(this.$element);
        if(!this.state) {
            return;
        }

        this.$element.innerHTML = `
            ${this.state.map(product => `
                <li class="Product" data-product-id="${product.id}">
                    <img src="${product.imageUrl}">
                    <div class="Product__info">
                    <div>${product.name}</div>
                    <div>${product.price}~</div>
                    </div>
                </li>
            `).join('')}
        `
    }

    this.render()

    this.$element.addEventListener('click', (e) => {
        const $li = e.target.closest('li')
        const { productId } = $li.dataset

        if (productId) {
            routeInvoke(`/web/products/${productId}`)
        }
    })
}