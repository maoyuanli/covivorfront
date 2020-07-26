const dev = {
    URL_PREFIX: 'http://localhost:3000/api/'
}

const prod = {
    URL_PREFIX: 'https://covivorback.herokuapp.com/api/'
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod;
