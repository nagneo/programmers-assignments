
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
        //DEBUG
        //console.log("[Nodes] Clicked")
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
            //DEBUG
            //console.log(`[Nodes] nodeId: ${nodeId}, nodes: ${nodes}`)
            this.onClick(selectedNode)
        }
        else {
            this.onBackClick()
        }
    })
  }