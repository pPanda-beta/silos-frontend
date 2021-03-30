import React, {useCallback, useContext, useEffect, useState} from 'react';
import {GlobalContext} from "../BasePage";
import {useListings} from "../../data/use-listings";
import {ListingSelector} from "../listing/ListingView";
import TextField from "@material-ui/core/TextField";
import {QuadStateView} from "../QuadStateView";
import {createBid} from "../../data/use-bid";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";
import GavelIcon from '@material-ui/icons/Gavel';

export const BidFireButton = ({listing, bidPrice}) => {
    const {loggedInUser} = useContext(GlobalContext);

    return (<QuadStateView
        sideEffectFn={createBid}
        initComponentFn={
            (_, trigger) =>
                <Button onClick={() => trigger({
                    bidPrice, listingId: listing.listing_id,
                    userId: loggedInUser?.user_id
                })}
                ><GavelIcon/>
                </Button>
        }
        inProgressComponentFn={
            () =>
                <Button variant="contained"
                        color="primary"
                        disabled
                >
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

export const CreateSingleBid = ({listing}) => {
    const [bidPrice, setBidPrice] = useState(listing.min_price);
    useEffect(() => setBidPrice(listing.min_price), [listing]);

    const updatePrice = useCallback(
        (p) => setBidPrice(
            Math.min(listing.max_price,
                Math.max(listing.min_price, p))),
        [listing]);

    return (
        <Grid container
              direction="row"
              justify="flex-start"
              alignItems="stretch"
              wrap="nowrap"
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

    );
}

export const NewBid = () => {
    const {listings} = useListings();

    return (

        <ListingSelector listings={listings.map(t => ({...t, self: t}))}
                         onSelect={() => {
                         }} extraColumns={[
            {
                name: 'self', label: "Bid", options: {
                    customBodyRender: (listing) => {
                        return <CreateSingleBid listing={listing}/>
                    }
                }
            },
        ]}/>

    );
}
