import useSWR from "swr";
import {jsonFetcher} from "../intg/client";
import {useContext} from "react";
import {GlobalContext} from "../components/BasePage";


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
        created_time: new Date().getTime(),
        expiration_time: t.exprDateTime.getTime(),
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


function useListingFor(apiPath) {
    const {data, error} = useSWR(apiPath, {
        initialData: {}
    });

    return {
        listings: Object.values(data),
        error
    }
}

export const useListings = () => {
    return useListingFor('/api/listing');
}

export const useMyListings = () => {
    const {loggedInUser} = useContext(GlobalContext);
    return useListingFor(`/api/listing?creator_id=${loggedInUser?.user_id}`);
}


export const useListingsIVeBid = () => {
    const {loggedInUser} = useContext(GlobalContext);
    return useListingFor(`/api/listing?bidder_id=${loggedInUser?.user_id}`);
}

