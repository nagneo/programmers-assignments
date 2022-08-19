const CUSTOM_ROUTE_EVENT = "ROUTE_INVOKE_EVENT"

export const init = (onRoute) => {
    window.addEventListener(CUSTOM_ROUTE_EVENT, () => {
        onRoute()
    })
}

export const routeInvoke = (url, params) => {
    history.pushState(null, null, url)
    window.dispatchEvent(new CustomEvent(CUSTOM_ROUTE_EVENT, params));
}