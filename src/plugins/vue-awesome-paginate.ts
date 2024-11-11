import VueAwesomePaginate from "vue-awesome-paginate";
import "~/assets/style/pagination.scss"
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VueAwesomePaginate);
});
