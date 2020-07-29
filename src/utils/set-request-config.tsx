export const setRequestConfig = (withToken = true) => {
    if (withToken) {
        return {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }
    }
    return {
        headers: {
            'Content-Type': 'application/json'
        }
    }
};
