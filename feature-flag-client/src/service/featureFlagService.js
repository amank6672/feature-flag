import createHttpRequest from "../utils/httpRequest"

export const getFeatureFlagList = () => {
    return new Promise((resolve) => {
        createHttpRequest.get('get-feature-flags')
            .then(res => {
                resolve(res.data.data)
            })
    })

}

export const updateFeatureFlag = (params) => {
    return new Promise((resolve) => {
        createHttpRequest.post('update-feature-flag', params)
            .then(res => {
                resolve(res.data.data)
            })
    })
}

export const getFeatureFlag = (id) => {
    return new Promise((resolve) => {
        createHttpRequest.get(`get-feature-flag/${id}`)
            .then(res => {
                resolve(res.data.data)
            })
    })
}

export const addFeatureFlag = (params) => {
    return new Promise((resolve) => {
        createHttpRequest.post('add-feature-flag', params)
            .then(res => {
                resolve(res.data.data)
            })
    })

}

export const convertToSnakeCase = (str) => {
    return str && str.match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        .map(s => s.toLowerCase())
        .join('_');
}