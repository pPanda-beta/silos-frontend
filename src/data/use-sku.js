import useSWR from "swr";

export const useSkus = () => {
    const {data, error} = useSWR('/api/sku', {
        initialData: []
    });

    return {
        skus: Object.values(data),
        error,
        loading: !data && !error
    }
}
