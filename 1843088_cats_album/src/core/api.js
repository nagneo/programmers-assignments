const API_URL_BASE = "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev";

export const request = async (url) => {
    try{
        const fullUrl = `${API_URL_BASE}${url}`;
        const response = await fetch(fullUrl);
        
        //DEBUG
        //console.log(`[request]: ${fullUrl},\tapi.js`)
        if(response.ok)
        {
            const json = response.json();
            return json
        }

        throw new Error(`Fail to get response: ${fullUrl}`)
    }
    catch(e) {
        alert(e.message)
    }
    
}