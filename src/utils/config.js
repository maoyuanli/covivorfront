
export const configProvider = () => {
    if(process.env.NODE_ENV === 'production'){
        return {
            URL_PREFIX: 'https://covivorback.herokuapp.com/api/',
            GOOGLE_MAP_API_KEY:process.env.GOOGLE_MAP_API_KEY
        }
    }else {
        const devKey = require('./dev-keys')
        return {
            URL_PREFIX: 'http://localhost:3000/api/',
            GOOGLE_MAP_API_KEY: devKey.GOOGLE_MAP_API_KEY
        }
    }
}

export const config = configProvider();
