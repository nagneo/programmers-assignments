import ProductListPage from "./components/ProductListPage.js"
import ProductDetailPage from "./components/ProductDetailPage.js"
import CartPage from './components/CartPage.js'
import { init } from './core/router.js'

export default function App({
    $target
}) {
    this.route = () => {
        
        const { pathname } = location
        console.log(`routes: ${pathname}`)
        if (pathname === '/web/') {
            new ProductListPage({$target}).render();
        }
        else if (pathname.indexOf('/web/products') === 0)
        {
            const [,,,productId] = pathname.split('/')
            new ProductDetailPage({$target, productId}).render();
        }
        else if (pathname === '/web/cart') {
            console.log('routed in cart')
            new CartPage({$target}).render();
        }
    }

    init(this.route)

    this.route()

    window.addEventListener('popstate', this.route)
}