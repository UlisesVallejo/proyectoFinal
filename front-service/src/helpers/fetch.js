


const fetchWithoutToken = ( endpoint, data, method = 'GET', type = 'auth' ) => {

    // localhost:4000/api/endpoint
    const baseUrl = (type === 'auth')? process.env.REACT_APP_API_AUTH : process.env.REACT_APP_API_EVENTS;
    const url = `${ baseUrl }/${ endpoint }`;
    
    switch (method) {
        case 'GET':
            return fetch(url);
    
        default:
            return fetch(url, {
                method,
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            });   
    }
}

const fetchWithToken = ( endpoint, data, method = 'GET', type = 'auth') => {

    const baseUrl = (type === 'auth')? process.env.REACT_APP_API_AUTH : process.env.REACT_APP_API_EVENTS;
    const url = `${ baseUrl }/${ endpoint }`;
    const token = localStorage.getItem('token') || '';

    switch (method) {
        case 'GET':
            return fetch(url, {
                method,
                headers: {
                    'x-token': token
                }
            });
    
        default:
            return fetch(url, {
                method,
                headers: {
                    'Content-type': 'application/json',
                    'x-token': token
                },
                body: JSON.stringify(data)
            });

    }

}

export {
    fetchWithoutToken,
    fetchWithToken
}