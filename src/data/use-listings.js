import useSWR from "swr";
import {jsonFetcher} from "../intg/client";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const createListing = async (t) => {
    await sleep(2000);

    return await jsonFetcher('/api/listing', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            creator_id: t.userId,
            sku_id: t.skuId,
            min_price: t.minPrice,
            max_price: t.maxPrice,
            created_time: new Date(),
            expiration_time: t.exprDateTime,
        })
    });
}


export const useListings = () => {
    const {data, error} = useSWR('/api/listing', {
        initialData: {}
    });

    return {
        listings: Object.values(data),
        error
    }
}
