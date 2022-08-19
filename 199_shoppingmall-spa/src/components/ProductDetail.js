import SelectedOptions from "./SelectedOptions.js"

export default function ProductDetail ({
    $target,
    initialState = {}
}) {
    this.$element = document.createElement('div')
    this.$element.className = 'ProductDetail';
    $target.appendChild(this.$element);
    let selectedCompoments = null

    this.state = initialState;

    this.setState = nextState => {
        this.state = nextState
        this.render()
        if(selectedCompoments) {
          selectedCompoments.setState(this.state)
        }
    }

    this.render = () => {
        if(!this.state) {
            return;
        }

        const { product } = this.state
        this.$element.innerHTML = `
            <img src="${product.imageUrl}">
            <div class="ProductDetail__info">
              <h2>${product.name}</h2>
              <div class="ProductDetail__price">${product.price}~</div>
              <select>
                <option>선택하세요.</option>
                ${product.productOptions.map(option => `
                  <option value="${option.id}" ${option.stock === 0 ? 'disabled' : ''}>${option.stock === 0 ? '(품절)' : ''} ${product.name} ${option.name} ${option.price > 0 ? `(+${option.price})` : '' }
                  </option>
                `).join('')}
              </select>
              <div class="ProductDetail__selectedOptions"></div>
            </div>
            
        `
        selectedCompoments = new SelectedOptions({
          $target: this.$element.querySelector('.ProductDetail__selectedOptions'),
          initialState: {
            product: this.state.product,
            selectedOptions: this.state.selectedOptions
          }
        })
    }

    this.render();

    this.$element.addEventListener('change', (e) => {
      if(e.target.tagName != 'SELECT') {
        return;
      }

      const currentSelectedId = parseInt(e.target.value)
      const { product, selectedOptions = [] } = this.state
      // 옵션 객체 찾기
      const option = product.productOptions.find(option => parseInt(option.id) === currentSelectedId)
      const selectedOption = selectedOptions.find(option => option.optionId === currentSelectedId)
      if(option && !selectedOption) {
        const nextSelectedOptions = [
          ...selectedOptions,
          {
            productId: product.id,
            optionId: option.id,
            optionName: option.name,
            optionPrice: option.price,
            optionStock: option.stock,
            quantity: 1
          }
        ]
        this.setState( {
          product: product,
          selectedOptions: nextSelectedOptions
        })
      }
    })
}