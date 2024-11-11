import {AxiosInstance} from "axios/index";

declare module '#app' {
    interface NuxtApp {
        $axios: AxiosInstance;
    }
}
