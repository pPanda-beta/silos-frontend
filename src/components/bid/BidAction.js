import React, {useState} from "react";
import {QuadStateView} from "../QuadStateView";
import {addRating} from "../../data/use-user";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Rating from "@material-ui/lab/Rating";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import {createQuadState} from "../../data/quad_state";
import {acceptBid} from "../../data/use-listings";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";

export const DealRating = ({listing, bid, onFinish}) => {
    const [ratingValue, setTempRating] = useState();

    return (
        <QuadStateView
            sideEffectFn={addRating}
            initComponentFn={
                (_, trigger) =>
                    <Dialog open onClose={onFinish}>
                        <DialogTitle>Please rate the bidder</DialogTitle>
                        <DialogContent>
                            <Rating
                                name="hover-feedback"
                                precision={0.5}
                                size="large"
                                onChange={(_, rating) => trigger({
                                    userId: bid.user_id,
                                    domainId: listing.sku?.domain_id,
                                    rating
                                })}
                                onChangeActive={(_, rating) => setTempRating(rating)}
                            />
                            {ratingValue}
                        </DialogContent>
                    </Dialog>
            }
            inProgressComponentFn={
                (_, __, reset) =>
                    <Dialog open>
                        <DialogTitle>Saving rating</DialogTitle>
                        <DialogContent>
                            <CircularProgress color="inherit" style={{margin: '0 3rem'}}/>
                        </DialogContent>
                    </Dialog>

            }
            successComponentFn={
                ({data}) =>
                    <Snackbar open autoHideDuration={1000} onClose={onFinish}>
                        <Alert onClose={onFinish} severity="success">
                            Thanks for rating!
                        </Alert>
                    </Snackbar>
            }
            errorComponentFn={
                ({error}, _, reset) =>
                    <Snackbar open autoHideDuration={5000} onClose={reset}>
                        <Alert onClose={reset} severity="error">
                            Failed to rate! Please retry!
                            Error : {error?.toString()}
                        </Alert>
                    </Snackbar>
            }
        />
    );
}

export const BidConfirmation = ({listing, bid, onCancel}) => {
    const {trigger, reset, ...result} = createQuadState(acceptBid);

    if (result.isSuccess) {
        return (<DealRating listing={listing} bid={bid} onFinish={onCancel}/>);
    }


    const lowerCount = listing.bids.filter(b => b.bid_amount < bid.bid_amount).length;
    const higherCount = listing.bids.filter(b => b.bid_amount > bid.bid_amount).length;
    const dialogContentText = (
        <DialogContentText>
            There are other bidders with better prices.
            <br/>
            {higherCount} with higher prices.
            <br/>
            {lowerCount} with lower prices.
        </DialogContentText>
    );

    const decisionButtons = (
        <DialogActions>
            <Button onClick={onCancel} color="primary">
                I've changed my mind
            </Button>
            <Button onClick={() => trigger(listing, bid)} color="primary" autoFocus>
                Accept bid
            </Button>
        </DialogActions>
    );

    const progressBar = (
        <DialogActions>
            <CircularProgress color="inherit" style={{margin: '0 3rem'}}/>
        </DialogActions>
    );

    const errorMessage = (
        <Alert onClose={reset} severity="error">
            Failed to rate! Please retry!
            Error : {result?.error?.toString()}
        </Alert>
    );
    return (
        <Dialog open onClose={onCancel}>
            <DialogTitle>Accept Bid</DialogTitle>
            <DialogContent>
                {dialogContentText}
            </DialogContent>
            {result.isFailed && errorMessage}
            {result.isInProgress && progressBar}
            {result.isInitial && decisionButtons}
        </Dialog>

    );
}


export const BidChooser = ({listing, bid}) => {
    const [openDialog, setOpenDialog] = useState(false);
    if (openDialog) {
        return <BidConfirmation listing={listing}
                                bid={bid}
                                onCancel={() => setOpenDialog(false)}
        />
    }
    return (
        <CheckCircleRoundedIcon
            color="primary"
            fontSize="large"
            onClick={() => setOpenDialog(true)}
        />
    );
}

export const bidChooserFor = (listing) => ({bid}) => <BidChooser listing={listing} bid={bid}/>
