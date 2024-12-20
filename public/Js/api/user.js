import { ApiService } from './apiService.js'

const fetchGetUser = async () => {
    const apiBase = ApiService.getApiBase() + 'user'
    return await fetch(apiBase, {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('accessToken'),
        }}
    )
}


//TODO: [Complete] Complete this function to get user information from "/api/user"
const getUser = async (id) => {
    if(!id) {
        let userPromise = await fetchGetUser()
        userPromise.then((response) => {
            if(response.status === 401) {
                console.log('[FlowDebug](user.js) - getUser(): Get user failed')
                console.error('Error:', response)
                window.location.href = '/login'
            }


            return response.json()
        })
    }
}