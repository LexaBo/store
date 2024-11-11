<script setup lang="ts">
import Search from '~/components/catalog/search/Search.vue'
import ProductsGrid from '~/components/catalog/productList/ProductsGrid.vue'
import Massage from '~/components/common/Massage.vue'
import {getAllProducts} from '~/components/catalog/api'
import {useFetch} from '~/composables/useApi'
import type {Product} from '~/components/catalog/types/interfaces';
import { useCatalogStore } from '~/components/catalog/store'

const {data, error, isLoading, fetchData}:
    {
      data: Ref<Product[]>,
      error: Ref<string | null>,
      isLoading: Ref<boolean>,
      fetchData: () => Promise<void>
    } = useFetch(getAllProducts);

const catalogStore = useCatalogStore();
const pageSize = 9;
const currentPage = ref(1);
const resultArrayProduct = ref<Product[]>([]);
const currentArrayProduct = ref<Product[]>([]);
const totalProduct = ref<number>(0);
const isShowPaginate = computed(() => unref(totalProduct) > pageSize);
const paginateArray = (arr: Product[], perPage: number, currentPage: number) => {
  const startIndex = (currentPage - 1) * perPage;

  resultArrayProduct.value = arr.slice(startIndex, startIndex + perPage);
}

const onClickHandler = (page: number) => {
  catalogStore.setCurrenPagePagination(page);
  paginateArray(unref(currentArrayProduct), pageSize, page);
};

const updateCurrentProducts = (isSearch?: boolean) => {
  currentArrayProduct.value = unref(catalogStore.searchValue) ? unref(catalogStore.searchProduct) : unref(data);
  totalProduct.value = unref(currentArrayProduct).length;

  if (catalogStore.currenPagePagination
      && catalogStore.currenPagePagination <= Math.ceil(unref(currentArrayProduct).length / pageSize)
      && !isSearch
  ) {
    currentPage.value = catalogStore.currenPagePagination;
  } else {
    currentPage.value = 1;
    catalogStore.setCurrenPagePagination(1);
  }
  paginateArray(unref(currentArrayProduct), pageSize, currentPage.value);
}

watch(data,() => {
  catalogStore.setProducts(data);
  updateCurrentProducts();
})

watch(() => catalogStore.searchValue,() => {
  updateCurrentProducts(true);
})

fetchData();
</script>

<template>
  <section class="homepage">
    <Massage
        v-if="isLoading"
        class="homepage__massage"
    >
      Загрузка...
    </Massage>
    <Massage
        v-else-if="error"
        class="homepage__massage"
    >
      Произошла ошибка :(
    </Massage>
    <div
        v-else
        class="homepage__content"
    >
      <div class="homepage__top-panel">
        <Search />
      </div>
      <Massage
          v-if="!resultArrayProduct.length"
          class="homepage__massage"
      >
        Ничего не найдено
      </Massage>
      <ProductsGrid
          v-else
          :products="resultArrayProduct"
          class="homepage__grid"
      />
      <VueAwesomePaginate
          v-if="isShowPaginate"
          :total-items="totalProduct"
          :items-per-page="pageSize"
          v-model="currentPage"
          @click="onClickHandler"
          class="homepage__pagination"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.homepage {
  &,
  &__content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    width: 100%;
    padding: 3rem 2rem;
  }

  &__massage {
    margin-right: auto;
    margin-left: auto;
  }

  &__top-panel {
    display: flex;
    width: 100%;
    margin-bottom: 3.2rem;
  }

  &__grid {
    width: 100%;
    margin-bottom: 4.8rem;
  }

  &__pagination {
    margin-top: auto;
    margin-right: auto;
    margin-left: auto;
  }
}
</style>
