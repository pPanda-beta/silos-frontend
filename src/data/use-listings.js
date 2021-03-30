import useSWR from "swr";
import {jsonFetcher} from "../intg/client";


export const createListing = (t) => jsonFetcher('/api/listing', {
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
        sku: t.sku,
    })
});


export const acceptBid = (listing, bid) => jsonFetcher(`/api/listing/${listing.listing_id}`, {
    method: "PUT",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        state: 'close',
        accepted_bid: bid
    })
});


export const useListings = () => {
    const {data, error} = useSWR('/api/listing', {
        initialData: {}
    });

    return {
        listings: Object.values(data),
        error
    }
}
