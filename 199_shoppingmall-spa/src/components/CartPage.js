import { getItem, setItem } from "../core/storage.js"
import { routeInvoke } from "../core/router.js"

export default function CartPage({
    $target
  }) {
    this.$element = document.createElement('div')
    this.$element.className = 'CartPage';

    this.state = {}
    this.setState = (nextState) => {
      this.state = nextState
      this.render()
    }
    

    this.getTotalPrice = () => {
      const { items } = this.state
      return items.reduce(
          (acc, item) => acc + ((item.price + item.optionPrice) * item.quantity), 0)
    }

    this.render = () => {
      $target.innerHTML = ''
      $target.appendChild(this.$element)

      const { items } = this.state
      if(!items) {
        return;
      }

      this.$element.innerHTML = `
        <h1>장바구니</h1>
        <div class="Cart">
          <ul>
            ${items.map(item => `
              <li class="Cart__item">
                <img src="${item.imageUrl}">
                <div class="Cart__itemDesription">
                  <div>${item.productName} ${item.optionName} ${(item.price + item.optionPrice)}원 ${item.quantity}개</div>
                  <div>${(item.price + item.optionPrice) * item.quantity}원</div>
                </div>
              </li>
            `).join('')}
          </ul>
          <div class="Cart__totalPrice">
            총 상품가격 ${this.getTotalPrice()}원
          </div>
          <button class="OrderButton">주문하기</button>
        </div>
      `
    }

    const load = () => {
      console.log('loaded')
      const cartItems = getItem('products_cart', [])
      if(!cartItems || cartItems.length == 0 ) {
        alert('장바구니가 비어있습니다.')
        routeInvoke(`/web/`)
        return;
      }

      this.setState({
        items: cartItems
      })
    }

    load()

    this.$element.addEventListener("click", (e) => {
      if (e.target.className != 'OrderButton') {
        return;
      }

      setItem('products_cart', [])
      alert('주문되었습니다.')
      routeInvoke(`/web/`)
    })
  }