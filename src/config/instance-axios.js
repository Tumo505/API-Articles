import axios from 'axios';

export const baseURL = process.env.REACT_APP_API_URL

export const instanceAxios = axios.create({
    baseURL,
    timeout: 6000000
})