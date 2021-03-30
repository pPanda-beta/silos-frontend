import {jsonFetcher} from "../intg/client";
import {useEffect, useState} from "react";
import {getUsers} from "./use-user";

export const createBid = (t) => jsonFetcher('/api/bid', {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        listing_id: t.listingId,
        user_id: t.userId,
        bid_amount: t.bidPrice,
        timestamp: new Date(),
    })
})


export const useBidsWithRatings = (bids, domainId) => {
    const bidderIds = bids.map(b => b.user_id);
    const [bidders, setBidders] = useState([]);

    useEffect(async () => {
        const bidders = await getUsers(bidderIds);
        setBidders(bidders);
    }, bidderIds);

    return bids.map(b => ({
        ...b,
        rating: bidders.flatMap(u => u.ratings)
            .filter(ur => ur.user_id === b.user_id
                && ur.domain_id === domainId)
            .map(ur => ur.rating)
            .reduce((avgSoFar, t, i) => ((avgSoFar * i + t) / (i + 1)), 0)
    }));
}