import axios from 'axios';

export const baseURL = 'https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=N9iXMdys9hZPzMig1ES3drCfPm5wrfK4'
// process.env.REACT_APP_API_URL

export const instanceAxios = axios.create({
    baseURL,
    timeout: 6000000
})