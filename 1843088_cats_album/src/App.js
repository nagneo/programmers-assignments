import Nodes from "./components/Nodes.js"
import Breadcrumb from "./components/Breadcrumb.js"
import ImageViewer from './components/ImageViewer.js'
import Loading from './components/Loading.js'
import { request } from './core/api.js'

export default function App({
    $target,
    initialState = {
        depths : [
            { 
                id: '',
                name: "root",
                type: 'DIRECTORY',
                filePath: null,
                parent: null 
            }
        ],
        nodes: []
    }
}) {
    //initialize
    this.state = initialState

    this.setState = (nextState) => {
        //DEBUG
        //console.log("[APP] set state")

        this.state = nextState
        const { nodes, depths } = this.state

        breadcrumb.setState({
            depths
        })

        nodeCompoments.setState({
            nodes
        })

        const isShow = false
        loading.setState({
            isShow
        })
    }

    const update = async (url, node = null) => {
        const isShow = true
        loading.setState({
            isShow
        })

        const items = await request(url);
        var currentDepths = [...this.state.depths]
        if(node) {
            const { depths = [] } = this.state

            var existIndex = depths.findIndex(n => n.id == node.id)
            if(existIndex > -1) {
                currentDepths = depths.slice(0, existIndex + 1)
            }
            else {
                currentDepths.push(node)
            }
        }
        
        this.setState({ 
            nodes: items,
            depths: currentDepths
        })
    }

    this.onClick = (newNode) => {

        //DEBUG
        //console.log("[APP] node clicked") 
        if (newNode) {

            //DEBUG
            //console.log(`[APP] ${newNode}`)

            if (newNode.type === "DIRECTORY") {
                update(`/${newNode.id}`, newNode)
            }
            else if (newNode.type === "FILE") {
                imageViewer.setState({
                    node: newNode
                })
            }
        }
        else {
            //root
            this.state = initialState
            update('');
        }
    }

    this.onBackClick = () => {
        const { depths = [] } = this.state
        if(!depths || depths.length > 1) {
            depths.pop(); // delete latest
        }
        
        const lastNode = depths[depths.length - 1]
        if (!lastNode) {
            return;
        }
        
        //DEBUG
        //console.log(`[APP] node backed: ${JSON.stringify(lastNode)}`)
        update(`${lastNode.id ? `/${lastNode.id}` : ''}`, null)
    }

    const breadcrumb = new Breadcrumb({
        $target,
        initialState: {},
        onClick : this.onClick
    });

    const nodeCompoments = new Nodes({
        $target,
        initialState: {},
        onClick : this.onClick,
        onBackClick : this.onBackClick
    });
    
    const imageViewer = new ImageViewer({
        $target
    });

    const loading = new Loading({
        $target
    });


    //Init
    update('');
}