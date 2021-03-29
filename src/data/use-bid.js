import {jsonFetcher} from "../intg/client";

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
