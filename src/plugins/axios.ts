import axios from 'axios'
import type {AxiosInstance} from 'axios'
export default defineNuxtPlugin((NuxtApp) :void => {
    const instance: AxiosInstance = axios.create({
        baseURL: 'http://localhost:3000',
    })

    NuxtApp.provide('axios', instance);
})
