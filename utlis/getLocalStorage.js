export const getLocalStorage = (key) => {
    if (typeof window !== 'undefined') {
        const data = localStorage.getItem(key)
        return data ? Array.isArray(data) ? JSON.parse(data) : data : null
    }
}

export const removeLocalStorage = (key) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(key)
    }
}

export const setLocalStorage = (key, value) => {
    if (typeof window !== 'undefined') {

        if (value) {
            if (Array.isArray(value)) {
                localStorage.setItem(key, JSON.stringify(value))
            } else {
                localStorage.setItem(key, value)
            }
        }
    }
}