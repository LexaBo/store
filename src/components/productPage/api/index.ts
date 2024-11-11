import type {Product} from '~/components/catalog/types/interfaces';

export const getCurrentProduct = (id: string | string[]) => {
    return () => {
        const {$axios} = useNuxtApp();

        return  $axios.get<Product>(`https://api.escuelajs.co/api/v1/products/${id}`)
    };
};
