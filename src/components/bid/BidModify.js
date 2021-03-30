import React, {useContext} from "react";
import {GlobalContext} from "../BasePage";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import {useListingsIVeBid} from "../../data/use-listings";
import {TabbedItems} from "../containers/tabbed";
import {Listing} from "../listing/ListingView";
import Grid from "@material-ui/core/Grid";
import {CreateOrUpdateBid} from "./BidCreate";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    priceUpdater: {
        padding: "0 1rem"
    }
}));

export const MyBidIdentifier = ({bid}) => {
    const {loggedInUser} = useContext(GlobalContext);
    if (bid.user_id !== loggedInUser?.user_id) {
        return (<></>);
    }

    return (<EmojiPeopleIcon/>);
}

export const MyBids = () => {
    const {listings} = useListingsIVeBid();
    const classes = useStyles();

    return (
        <TabbedItems
            items={listings}
            labelFunc={(l) => `${l.sku?.name || l.sku_id}`}
            bodyFunc={
                (l) =>
                    <Listing listing={l} bidActionComp={MyBidIdentifier}>
                        <Grid container
                              direction="row"
                              justify="center"
                              alignItems="stretch"
                              wrap="nowrap"
                              className={classes.priceUpdater}
                        >
                            Update bid:
                            <CreateOrUpdateBid listing={l}/>
                        </Grid>
                    </Listing>
            }
        />
    );
}
