export const getLocalStorage = (key) => {
    const data = localStorage.getItem(key)
    return data ? Array.isArray(data) ? JSON.parse(data) : data : null
}

export const removeLocalStorage = (key) => localStorage.removeItem(key)

export const setLocalStorage = (key, value) => {
    if (value) {
        if (Array.isArray(value)) {
            localStorage.setItem(key, JSON.stringify(value))
        } else {
            localStorage.setItem(key, value)
        }
    }
}