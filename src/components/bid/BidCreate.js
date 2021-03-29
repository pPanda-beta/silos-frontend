import React, {useCallback, useContext, useEffect, useState} from 'react';
import {GlobalContext} from "../BasePage";
import {useListings} from "../../data/use-listings";
import {ListingCard, ListingDetails, ListingHeader, ListingImage, ListingSelector} from "../listing/ListingView";
import TextField from "@material-ui/core/TextField";
import {QuadStateView} from "../QuadStateView";
import {createBid} from "../../data/use-bid";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";

export const BidFireButton = ({listing, bidPrice}) => {
    const {loggedInUser} = useContext(GlobalContext);

    return (<QuadStateView
        sideEffectFn={createBid}
        initComponentFn={
            (_, trigger) =>
                <Button variant="contained"
                        color="primary"
                        onClick={() => trigger({
                            bidPrice, listingId: listing.listing_id,
                            userId: loggedInUser?.user_id
                        })}
                >
                    Place New Bid
                </Button>
        }
        inProgressComponentFn={
            () =>
                <Button variant="contained"
                        color="primary"
                        disabled
                >
                    <pre>Creating new bid ...  </pre>
                    <CircularProgress/>
                </Button>
        }
        successComponentFn={
            ({data}, __, reset) =>
                <Snackbar open autoHideDuration={2000} onClose={reset}>
                    <Alert onClose={reset} severity="success">
                        Bid created successfully! ID: {Object.keys(data)?.[0]}
                    </Alert>
                </Snackbar>
        }
        errorComponentFn={
            ({error}, _, reset) =>
                <Snackbar open autoHideDuration={5000} onClose={reset}>
                    <Alert onClose={reset} severity="error">
                        Failed to create bid!
                        Error : {error?.toString()}
                    </Alert>
                </Snackbar>
        }
    />);
}

const CreateSingleBid = ({listing}) => {
    const [bidPrice, setBidPrice] = useState(listing.min_price);
    useEffect(() => setBidPrice(listing.min_price), [listing]);

    const updatePrice = useCallback(
        (p) => setBidPrice(
            Math.min(listing.max_price,
                Math.max(listing.min_price, p))),
        [listing]);

    return (
        <ListingCard
            classes={{}}
            header={
                <ListingHeader classes={{}} listing={listing}/>
            }
            image={
                <ListingImage classes={{}} listing={listing}/>
            }
            details={
                <ListingDetails classes={{}} listing={listing}/>
            }
            bids={''}
            footer={
                <Grid container
                      direction="row"
                      justify="space-around"
                      alignItems="stretch"
                >
                    <TextField variant="outlined"
                               label="Bid Price"
                               type="number"
                               value={bidPrice}
                               onChange={(ev) => {
                                   setBidPrice(parseFloat(ev.target.value))
                               }}
                               onBlur={(ev) => {
                                   updatePrice(parseFloat(ev.target.value))
                               }}
                    />

                    <BidFireButton listing={listing} bidPrice={bidPrice}/>
                </Grid>
            }
        />
    );
}

export const NewBid = () => {
    const {listings} = useListings();
    const [selectedListing, setSelectedListing] = useState(listings[0] || {});

    return (
        <>
            <ListingSelector listings={listings} onSelect={setSelectedListing}/>
            {selectedListing?.listing_id && <CreateSingleBid listing={selectedListing}/>}
        </>
    );
}
