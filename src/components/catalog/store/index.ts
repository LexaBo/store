import {defineStore} from 'pinia'
import type {Product, ViewModeGrid} from '~/components/catalog/types/interfaces';

export const useCatalogStore = defineStore('catalog', () => {
    const products = ref<Product[]>([]);
    const searchValue = ref<string>('');
    const searchProduct = ref<Product[]>([]);
    const modeGridProducts = ref<ViewModeGrid | undefined>();
    const currenPagePagination = ref<number | undefined>();

    const setProducts = (newProducts: Ref<Product[]>): void => {
        products.value = unref(newProducts);
    }

    const setModeGridProducts = (newMode: ViewModeGrid): void => {
        modeGridProducts.value = newMode;
    }

    const setCurrenPagePagination = (newValue: number): void => {
        currenPagePagination.value = newValue;
    }

    const setSearchValue = (newValue: string): void => {
        searchValue.value = newValue;
    }

    const setSearchProduct = (newValue: Product[]): void => {
        searchProduct.value = newValue;
    }

    return {
        products,
        setProducts,
        modeGridProducts,
        setModeGridProducts,
        currenPagePagination,
        setCurrenPagePagination,
        searchValue,
        setSearchValue,
        searchProduct,
        setSearchProduct
    }
})
