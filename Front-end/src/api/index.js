import axios from "axios"


const ambientesUrl = {
    "dev": process.env.REACT_APP_API_URL_DEV,
    "prod": process.env.REACT_APP_API_URL_PROD
}



const apiClient = axios.create({
    baseURL: ambientesUrl[process.env.REACT_APP_AMBIENTE],  
})

export default apiClient;   