const baseUrl = 'http://127.0.0.1:4000/api'


export const publicFetch  = ({ endpoint, data, method = 'GET' }) =>{
    const url = `${baseUrl}/${endpoint}`
    console.log(url);
    console.log(data);
    if (method === 'GET') {
        return fetch( url )
    }
    else {
        return fetch( url, {
            method,
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify(data)
        })
    }
}

export const privateFetch  = ({ endpoint, data, method = 'GET' }) =>{
    const url = `${baseUrl}/${endpoint}`;
    const token = localStorage.getItem('token') || '';

    if (method === 'GET') {
        return fetch( url, {
            method,
            headers: {
                'x-token': token
            }
        } )
    }
    else {
        return fetch( url, {
            method,
            headers: {
                'Content-type':'application/json',
                'x-token': token
            },
            body: JSON.stringify(data)
        })
    }
}