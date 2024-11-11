import type { Product } from '~/components/catalog/types/interfaces';

export const getAllProducts = () => {
    const { $axios } = useNuxtApp();

    return $axios.get<Product[]>('https://api.escuelajs.co/api/v1/products')
};
