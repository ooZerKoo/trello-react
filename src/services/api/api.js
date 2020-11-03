import axios from 'axios'

export const apiGetapi = (path, id = null) => {
    const base = apiGetBaseUrl()
    switch (path) {
        default:
        case 'user':
            return `${base}user/`
        case 'panel':
            return base + 'panel' + (id ? `/${id}` : '')
        case 'list':
            return base + 'list' + (id ? `/${id}` : '')
    }
}

export const apiGetBaseUrl = () => {
    return 'http://localhost:4000/'
}

export const apiGetToken = async (username, password) => {
    try {
        const url = apiGetapi('user')
        const token = await axios.post(url + 'login', {
            username: username,
            password: password
        })
        return token
    } catch (error) {
        console.error(error)
    }
}

export const apiSetRegister = async (username, email, password) => {
    try {
        const url = apiGetapi('user')
        const token = await axios.post(url + 'getpassword', {
                password: password
            })
            .then(p => axios.post(url + 'add', {
                username: username,
                email: email,
                password: p.data
            }))
        return token
    } catch (error) {
        console.error(error)
    }
}

export const apiCheck = async (type, data) => {
    try {
        var check = false
        const url = apiGetapi('user')
        switch (type) {
            default:
                check = false
                break
            case 'username':
                check = await axios.post(url + 'checkusername', {
                    username: data
                })
                break
            case 'email':
                check = await axios.post(url + 'checkemail', {
                    email: data
                })
                break;
        }
        return check.data
    } catch (error) {
        console.error(error)
    }
}

export const apiGetPanelList = async (token) => {
    try {
        const url = apiGetapi('panel')
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        const list = await axios.get(url)
        return list
    } catch (error) {
        console.error(error)
    }

}