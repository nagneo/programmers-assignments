const API_URL_BASE = "https://uikt6pohhh.execute-api.ap-northeast-2.amazonaws.com/dev";

export const request = async (url) => {
    try{
        const fullUrl = `${API_URL_BASE}${url}`;
        const responce = await fetch(fullUrl);
        if(responce.ok)
        {
            const json = responce.json();
            return json
        }

        throw new Error(`Fail to get responce: ${fullUrl}`)
    }
    catch(e) {
        alert(e.message)
    }
    
}