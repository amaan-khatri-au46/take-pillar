import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import BaseService from './BaseService'


const ApiService = {
    fetchData<Response = unknown, Request = Record<string, unknown>>(
        param: AxiosRequestConfig<Request>
    ) {
        return new Promise<AxiosResponse<Response>>((resolve, reject) => {
            BaseService(param)
                .then((response: AxiosResponse<Response>) => {
                    resolve(response)
                })
                .catch((errors: AxiosError) => {
                    console.log(errors, 'From Outside')
                    reject(errors)
                })
        })
    },
}

export default ApiService
