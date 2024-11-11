<script setup lang="ts">
import type {Product, ViewModeGrid} from '~/components/catalog/types/interfaces';
import {handleImageLoadError} from '~/utils/errorImage';
import { useCatalogStore } from '@/components/catalog/store'

const props = defineProps<{
  products: Ref<Array<Product>>
}>()
const catalogStore = useCatalogStore();
const viewModeOption = ref<ViewModeGrid>('tile');
const viewMode =  computed(() => {
  if (catalogStore.modeGridProducts) {
    viewModeOption.value = catalogStore.modeGridProducts;

    return catalogStore.modeGridProducts
  } else {
    return unref(viewModeOption);
  }
});

watch(viewModeOption, () => {
  catalogStore.setModeGridProducts(unref(viewModeOption));
})
</script>

<template>
  <div class="products-grid">
    <select class="products-grid__view-mode" v-model="viewModeOption">
      <option value="tile">Плитка</option>
      <option value="list">Список</option>
    </select>
    <div
        class="products-grid__items"
        :class="`products-grid__items--${viewMode}`"
    >
      <NuxtLink
          v-for="product in products"
          :key="product.id"
          :to="{ name: 'product-id', params: { id: product.id }}"
          class="products-grid__item"
      >
        <div class="products-grid__img-container">
          <img
              :src="product.images[0]"
              :alt="product.title"
              :title="product.title"
              class="products-grid__img"
              @error="handleImageLoadError"
          >
        </div>
        <div class="products-grid__text-container">
          <p class="products-grid__title">
            {{ product.title }}
          </p>
          <p class="products-grid__description">
            {{ product.description }}
          </p>
          <p class="products-grid__price">
            Цена {{ product.price }}
          </p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.products-grid {
  $self: &;

  &__view-mode {
    margin-bottom: 2.4rem;
  }

  &__items {
    display: grid;
    align-items: start;
    grid-auto-rows: max-content;

    &--tile {
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 4.2rem;
    }

    &--list {
      grid-template-columns: 1fr;
      grid-gap: 2.4rem;
    }
  }

  &__item {
    cursor: pointer;

    #{$self}__items--tile & {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    #{$self}__items--list & {
      display: grid;
      grid-template-columns: 15rem minmax(0, 1fr);
      gap: 2.4rem;
    }
  }

  &__img-container {
    position: relative;
    width: 100%;
    height: 15rem;

    #{$self}__items--tile & {
      margin-bottom: .8rem;
    }
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__text-container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    #{$self}__items--tile & {
      justify-content: space-between;
    }
  }

  &__title,
  &__description {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 2;
    margin-bottom: .8rem;
  }

  &__title,
  &__price {
    color: var(--primary-color);
  }

  &__title {
    font-size: 1.3rem;
    line-height: 1.5rem;
    font-weight: 700;
  }

  &__description {
    font-size: 1.2rem;
    line-height: 1.4rem;
    color: var(--primary-gray);
  }

  &__price {
    font-size: 1.2rem;
    line-height: 1.6rem;
    font-weight: 700;
  }
}
</style>
