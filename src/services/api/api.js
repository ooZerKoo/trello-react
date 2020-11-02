const api = {
    getapi(path, id = null) {
        const base = api.getBaseUrl()
        switch (path) {
            default:
            case 'user':
                return `${base}user/`
            case 'panel':
                return base + 'panel' + ( id ? `/${id}` : '')
            case 'list':
                return base + 'list' + ( id ? `/${id}` : '')
        }
    },
    getBaseUrl() {
        return 'http://localhost:4000/'
    }
}

module.exports = api