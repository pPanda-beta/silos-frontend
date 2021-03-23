import useSWR from "swr";

export const useListings = () => {
    const {data, error} = useSWR('/api/listing', {
        initialData: {}
    });

    return {
        listings: Object.values(data),
        error
    }
}
