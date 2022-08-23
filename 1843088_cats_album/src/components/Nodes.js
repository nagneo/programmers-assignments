
export default function Nodes ({
  $target,
  initialState = {},
  onClick,
  onBackClick
}) {
  this.$element = document.createElement('div')
  this.$element.className = "Nodes"

  this.onClick = onClick
  this.onBackClick = onBackClick

  this.state = initialState
  this.setState = (nextState) => {
      this.state = nextState;
      this.render();
  }
  
  this.render = () => {
      $target.appendChild(this.$element)
      var { nodes = [] } = this.state
      if (!nodes) {
          return;
      }
      
      const hasParent = nodes.some(node => node.parent != null);
      this.$element.innerHTML = `
          ${ hasParent ? `
          <div class="Node">
              <img src="./assets/prev.png">
          </div>
          `: ''}
          ${nodes.map(node => `
              <div class="Node" data-node-id="${node.id}">
                  <img src=${node.type === 'DIRECTORY' ? "./assets/directory.png" : "./assets/file.png"}>
                  <div>${node.name}</div>
              </div>
              `).join('')}
          `
  }

  this.$element.addEventListener('click', (e) => {
      console.log("Clicked")
      const $div = e.target.closest('div')
      if ( $div.className != 'Node') {
          return;
      }

      var { nodeId } = $div.dataset
      if (nodeId) {
          var { nodes = [] } = this.state
          const selectedNode = nodes.find(n => n.id === nodeId);
          if (!selectedNode) {
              return;
          }
          
          console.log(`nodeId: ${nodeId}, nodes: ${nodes}`)
          this.onClick(selectedNode)
      }
      else {
          this.onBackClick()
      }
  })
}

{/* <div class="Nodes">
  <div class="Node">
      <img src="./assets/prev.png">
  </div>
  <div class="Node">
      <img src="./assets/directory.png">
      <div>2021/04</div>
  </div>
  <div class="Node">
      <img src="./assets/file.png">
      <div>하품하는 사진</div>
  </div>
</div> */}


// ${nodes.map(node => `
// <div class="Node" data-node-id="${node.id}">
//     <img src="${node.type === 'DIRECTORY' ? "./assets/directory.png" : "./assets/file.png"}>
//     <div>${node.name}</div>
// </div>
// `).join('')}