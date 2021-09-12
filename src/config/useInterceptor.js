import { instanceAxios } from './instance-axios';

export const useInterceptor = () => {
    instanceAxios.interceptors.response.use(
        function (response) {
            // Any status code that lie within the range of 2xx cause this function to trigger
            return response
        },
        function (error) {
            if (error.response.status) {
                console.log(error.response.status)
            }
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            return Promise.reject(error)
        }
    )
}