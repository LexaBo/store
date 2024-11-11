<script setup lang="ts">
import type {Product, ProductCategory} from "~/components/catalog/types/interfaces";
import {handleImageLoadError} from '~/utils/errorImage';
import {getCurrentProduct} from '~/components/productPage/api';
import {useFetch} from "~/composables/useApi";
import Massage from "~/components/common/Massage.vue";
import { useCatalogStore } from '@/components/catalog/store'

const route = useRoute();
const id:string | string[] = route.params.id;
const {data, error, isLoading, fetchData}:
    {
      data: Ref<Product>,
      error: Ref<string | null>,
      isLoading: Ref<boolean>,
      fetchData: () => Promise<void>
    } = useFetch(getCurrentProduct(id));

const catalogStore = useCatalogStore();
const currentData = ref<Product | {}>({});
const currentDataImg = ref<string[]>([]);
const currentDataCategory = ref<ProductCategory | {}>({});
const setCurrentDataProduct = (currentDataProduct: Product): void => {
  currentData.value = currentDataProduct;
  currentDataImg.value = currentDataProduct.images;
  currentDataCategory.value = currentDataProduct.category;
};

const getCurrentDataProduct = ():void => {
  if (!catalogStore.products.length) {
    fetchData();
  } else {
    setCurrentDataProduct(unref(catalogStore.products.find((el) => el.id === Number(id))) as Product);
  }
}

getCurrentDataProduct();

watch(data,() => {
  setCurrentDataProduct(unref(data));
})
</script>

<template>
  <section class="product-page">
    <Massage v-if="isLoading">
      Загрузка...
    </Massage>
    <Massage v-else-if="error || !currentData">
      Произошла ошибка :(
    </Massage>
    <div
        v-else
        class="product-page__container"
    >
      <div class="product-page__img-container">
        <img
            class="product-page__img"
            :src="currentDataImg[0]"
            :alt="currentData.title"
            @error="handleImageLoadError"
        >
      </div>
      <div class="product-page__text-container">
        <h1 class="product-page__title">{{ currentData.title }}</h1>
        <p class="product-page__description">{{ currentData.description }}</p>
        <p class="product-page__category"><b>Категория:</b> {{currentDataCategory.name}}</p>
        <p class="product-page__price"><b>Цена:</b> {{ currentData.price }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.product-page {
  display: flex;
  justify-content: center;
  padding: 2rem;

  &__container {
    display: grid;
    grid-template-columns: 47rem 1fr;
    grid-gap: 4rem;
  }

  &__img-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 47rem;
  }

  &__img {
    max-width: 100%;
    max-height: 100%;
  }

  &__text-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  &__title,
  &__description,
  &__category {
    margin-bottom: 1.6rem;
  }

  &__category,
  &__price {
    font-size: 1.6rem;
    line-height: 1.8rem;
  }

  &__title {
    font-size: 2.2rem;
    line-height: 2.4rem;
  }

  &__description {
    font-size: 1.8rem;
    line-height: 2rem;
  }
}

</style>
