import { routeInvoke } from "../core/router.js"
import { getItem, setItem } from "../core/storage.js"

export default function SelectedOptions ({
    $target,
    initialState = {}
  }) {
    this.$element = document.createElement('div')
    $target.appendChild(this.$element)
    
    this.state = initialState
    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    }
  
    this.getTotalPrice = () => {
        const { product, selectedOptions } = this.state
        const { price: productPrice } = product
  
        return selectedOptions.reduce(
            (acc, option) => acc + ((productPrice + option.optionPrice) * option.quantity), 0)
        
    }
  
    this.render = () => {
        const { product, selectedOptions } = this.state
        if (!product || !selectedOptions) {
            return;
        }
  
        this.$element.innerHTML = `
            <h3>선택된 상품</h3>
            <ul>
                ${selectedOptions.map(selection => `
                    <li>
                        ${product.name} ${selection.optionName} ${parseInt(product.price) + parseInt(selection.optionPrice)}원
                        <input type="number" data-option-id="${selection.optionId}" value="${selection.quantity}" min="1" max="${selection.optionStock}">
                    </li>
                `)}
            </ul>
            <div class="ProductDetail__totalPrice">${this.getTotalPrice()}원</div>
            <button class="OrderButton">주문하기</button>
        `
    }
  
    this.render()

    this.$element.addEventListener("click", (e) => {
        if (e.target.tagName != "BUTTON") {
            return;
        }
        
        const { product, selectedOptions } = this.state
        console.log('click' + JSON.stringify(this.state))
        const preCart = getItem('products_cart', [])
        setItem('products_cart', preCart.concat(selectedOptions.map(option => ({
            imageUrl: product.imageUrl,
            productName: product.name,
            optionName: option.optionName,
            optionId: option.optionId,
            price: product.price,
            optionPrice: option.optionPrice,
            quantity: option.quantity
        }))))

        routeInvoke(`/web/cart`)
    })

    this.$element.addEventListener("change", e => {

        if (e.target.tagName === 'INPUT') {
            try{
                const nextQuantity = parseInt(e.target.value)
                //input의 값이 숫자인 경우에만 처리하기
                if (typeof nextQuantity === 'number') {

                    const nextSelectedOption = [...this.state.selectedOptions]
                    const optionId = e.target.dataset.optionId
                    console.log(`optionId: ${optionId}`)
                    console.log(`next selectedOption: ${JSON.stringify(nextSelectedOption)}`)
                    
                    var optionIndex = nextSelectedOption.findIndex(so => so.optionId === parseInt(optionId))
                    console.log(`optionIndex: ${JSON.stringify(optionIndex)}`)
                    if (optionIndex >= 0) {
                        nextSelectedOption[optionIndex].quantity = nextQuantity
                        
                        this.setState({
                            product: this.state.product,
                            selectedOptions: nextSelectedOption
                        })
                    }
                }
            }
            catch (e) {
                console.log(e)
            }
        }

    })
  }