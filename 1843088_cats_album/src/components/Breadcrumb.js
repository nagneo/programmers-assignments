export default function Breadcrumb ({
  $target,
  initialState = {},
  onClick
}) {
  this.$element = document.createElement('nav')
  this.$element.className = "Breadcrumb"
  this.onClick = onClick

  $target.appendChild(this.$element)
  this.state = initialState
  this.setState = (nextState) => {
      this.state = nextState;
      this.render();
  }

  this.render = () => {
      const { depths } = this.state
      if (!depths || depths.length === 0) {
          return;
      }
      
      this.$element.innerHTML = `
          ${depths.map(node => `
              <div>${node.name}</div>
          `).join('')}
      `
  }
}