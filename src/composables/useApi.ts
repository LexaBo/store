export const useFetch = (api: () => Promise<any>) => {
    const data= ref<any>([]);
    const error = ref<string | null>(null);
    const isLoading= ref<boolean>(false);

    const fetchData = async (): Promise<void> => {
        isLoading.value = true;
        try {
            const response = await api();
            data.value = response.data;
        } catch (err) {
            if (err instanceof Error) {
                error.value = err.message;
            }

            console.log(error.value);
        } finally {
            isLoading.value = false;
        }
    };

    return { data, error, isLoading, fetchData };
};
