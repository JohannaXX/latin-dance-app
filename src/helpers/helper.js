export const queryParams = () => {
    return window.location.search.replace("?", "").split('&').reduce((acc, el) => {
        const [k, v] = el.split('=')
    
        return { ...acc, [k]: v }
    }, {})
}

export const queryParamsGoogle = () => {
    console.log(window.location.search)
    return window.location.search.replace("?", "").split('&').reduce((acc, el) => {
        const [k, v] = el.split('=')
    
        return { ...acc, [k]: v }
    }, {})
}