import axios from 'axios'

const apiKey = '00N2M1CqlXX5gdGfmblaZ5SNuffBYsBg-lxa38K5_g0'

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
        case 'task':
            return base + 'task' + (id ? `/${id}` : '')
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
        return token.data
    } catch (error) {
        console.error(error)
    }
}

export const apiGetUser = async (token) => {
    try {
        const url = apiGetapi('user')
        const user = await axios.get(url + 'token/' + token)
        return user.data
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
        return token.data
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
                break
        }
        return check.data
    } catch (error) {
        console.error(error)
    }
}


// PANELS
export const apiGetPanelList = async (token) => {
    try {
        const url = apiGetapi('panel')
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
        const list = await axios.get(url)
        return list.data
    } catch (error) {
        console.error(error)
    }

}

export const apiAddPanel = async (token, data) => {
    try {
        const url = apiGetapi('panel')
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
        const panel = await axios.post(url, {
            ...data
        })
        return panel.data
    } catch (error) {
        console.error(error)
    }
}

export const apiUpdatePanel = async (token, id, data) => {
    try {
        const url = apiGetapi('panel', id)
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
        const panel = await axios.put(url, {
            ...data
        })
        return panel.data
    } catch (error) {
        console.error(error)
    }
}

export const apiDeletePanel = async (token, id) => {
    const url = apiGetapi('panel', id)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    const panel = await axios.delete(url)
    return panel.data
}

// LISTS
export const apiGetListList = async (token, id) => {
    const url = apiGetapi('list', id)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    const list = await axios.get(url)
    return list.data
}

export const apiAddList = async (token, id, data) => {
    const url = apiGetapi('list', id)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    const list = await axios.post(url, {
        ...data
    })
    return list.data
}

export const apiUpdateList = async (token, id, data) => {
    const url = apiGetapi('list', id)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    const list = await axios.put(url, {
        ...data
    })
    return list.data
}

export const apiUpdateListPosition = async (token, id, position) => {
    const url = apiGetapi('list')
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    const list = await axios.put(url + '/position/' + id, {
        position: position
    })
    return list.data
}

export const apiDeleteList = async (token, id) => {
    const url = apiGetapi('list', id)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    const list = await axios.delete(url)
    return list.data
}

// TASKS
export const apiGetTaskList = async (token, id) => {
    const url = apiGetapi('task', id)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    const task = await axios.get(url)
    return task.data
}

export const apiAddTask = async (token, id, data) => {
    const url = apiGetapi('task', id)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    const task = await axios.post(url, {
        ...data
    })
    return task.data
}

export const apiUpdateTaskPosition = async (token, id, position) => {
    const url = apiGetapi('task')
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    const list = await axios.put(url + '/position/' + id, {
        position: position
    })
    return list.data
}

export const apiDeleteTask = async (token, id) => {
    const url = apiGetapi('task', id)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    const task = await axios.delete(url)
    return task.data
}

export const apiUpdateTaskStatus = async (token, id) => {
    const url = apiGetapi('task')
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
    const list = await axios.put(url + '/status/' + id)
    return list.data
}

// PHOTOS
export const apiSearchPhoto = async (search) => {
    const url = `https://api.unsplash.com/search/photos?client_id=${apiKey}&query=${search}&orientation=landscape`
    const photos = await axios.get(url)
    return photos.data.results
}