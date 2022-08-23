import Nodes from "./components/Nodes.js"
import Breadcrumb from "./components/Breadcrumb.js"
import ImageViewer from './components/ImageViewer.js'
import { request } from './core/api.js'

export default function App({
    $target,
    intialState = {
        nodes: [],
        depths: []
    }
}) {
    //initialize
    this.state = {
        depths : [
            { 
                id: '',
                name: "root",
                type: 'DIRECTORY',
                filePath: null,
                parent: null 
            }
        ],
        nodes: intialState.nodes
    }

    this.setState = (nextState) => {
        this.state = nextState
        const { nodes, depths } = this.state

        breadcrumb.setState({
            depths
        })

        nodeCompoments.setState({
            nodes
        })
    }

    const fetchRequest = async (url, node = null) => {
        const items = await request(url);
        
        var currentDepths = [...this.state.depths,node]
        if(node) {
            currentDepths.push(node)
        }

        this.setState({ 
            nodes: items,
            depths: currentDepths
        })
        
        return items
    }

    this.onClick = (newNode) => {
        console.log("node clicked")
        if (!newNode) {
            return
        }

        console.log(newNode)
        if (newNode.type === "DIRECTORY") {
            fetchRequest(`/${newNode.id}`, newNode)
        }
        else if (newNode.type === "FILE") {
            imageViewer.setState({
                node: newNode
            })
        }
    }

    this.onBackClick = () => {
        console.log("node backed")
    }

    const breadcrumb = new Breadcrumb({
        $target,
        initialState: {},
        onClick : this.onClick
    });

    const nodeCompoments = new Nodes({
        $target,
        initialState: {},
        onClick : this.onClick
    });
    
    const imageViewer = new ImageViewer({
        $target
    });

    //Init
    fetchRequest('');
}