//localStorage는 그대로 다루었다간 에러를 만날 여러가지 케이스가 있기 때문에
//안전을 위해 여러가지 처리를 해둔 함수 형태로 감싸서 쓰는 것이 좋습니다. 
export const storage = localStorage


export const setItem = (key, value) => {
    try{
       storage.setItem(key, JSON.stringify(value))
    }
    catch (e) {
        console.log(e.message)
    }
} 

export const getItem = (key, defaultValue) => {
    try{
        const value = storage.getItem(key)

        return value ? JSON.parse(value) : defaultValue
    }
    catch (e) {
        return defaultValue
    }
}

export const removeItem = (key) => {
    try {
        storage.removeItem(key)
    }
    catch (e) {
        console.log(e.message)
    }
}