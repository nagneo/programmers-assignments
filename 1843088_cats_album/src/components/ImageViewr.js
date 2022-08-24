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
                <div class="Nav-Item" data-node-id="${node.id}">${node.name}</div>
            `).join('')}
        `
    }

    this.$element.addEventListener("click", (e) => {
        if ( e.target.className != 'Nav-Item') {
            return;
        }
        
        //DEBUG
        //console.log(`[Breadcrumb] control clicked`)
        var { nodeId } = e.target.dataset
        if (nodeId) {
            var { depths = [] } = this.state
            if (!depths) {
                return;
            }

            if (nodeId === depths[depths.length - 1].id) {
                return;
            }

            const selectedNode = depths.find(n => n.id === nodeId);
            if (!selectedNode) {
                return;
            }

            //DEBUG
            //console.log(`[Breadcrumb] nodeId: ${nodeId}, nodes: ${depths}`)
            this.onClick(selectedNode)
        }
        else {
            //root
            this.onClick(null)
        }
    })
  }