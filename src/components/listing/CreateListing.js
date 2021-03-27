import {makeStyles} from "@material-ui/core";
import {QuadStateView} from "../QuadStateView";
import {createListing} from "../../data/use-listings";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import React, {useContext, useState} from "react";
import {GlobalContext} from "../BasePage";
import Typography from "@material-ui/core/Typography";
import Image from "next/image";
import TextField from "@material-ui/core/TextField";
import {KeyboardDateTimePicker} from "@material-ui/pickers";
import {useSkus} from "../../data/use-sku";
import {VerticalTabbedItems} from "../containers/tabbed";

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        margin: theme.spacing(2),
        width: '90%',
    },
    submitButton: {
        margin: theme.spacing(2),
    }
}));

const Submit = ({classes, listingReq}) => (
    <QuadStateView
        sideEffectFn={createListing}
        initComponentFn={
            (_, trigger) =>
                <Button variant="contained"
                        color="primary"
                        className={classes.submitButton}
                        onClick={() => trigger(listingReq)}
                >
                    Create Listing
                </Button>
        }
        inProgressComponentFn={
            () =>
                <Button variant="contained"
                        color="primary"
                        className={classes.submitButton}
                        disabled
                >
                    <pre>Creating  </pre>
                    <CircularProgress/>
                </Button>
        }
        successComponentFn={
            ({data}, __, reset) =>
                <Snackbar open autoHideDuration={2000} onClose={reset}>
                    <Alert onClose={reset} severity="success">
                        Created listing! Id: {Object.keys(data)?.[0]}
                    </Alert>
                </Snackbar>
        }
        errorComponentFn={
            ({error}, _, reset) =>
                <Snackbar open autoHideDuration={5000} onClose={reset}>
                    <Alert onClose={reset} severity="error">
                        Failed to create listing!
                        Error : {error?.toString()}
                    </Alert>
                </Snackbar>
        }
    />
)

const ListingCreateForm = ({sku, type = null}) => {
    const classes = useStyles();
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [exprDateTime, setExprDateTime] = useState(new Date());
    const {loggedInUser} = useContext(GlobalContext);


    return (
        <div className={classes.container}>
            <div style={{display: 'block'}}>
                <Typography variant="h5">
                    {sku.name}
                </Typography>
                <Image src={`/static/images/${sku.sku_id}.jpeg`}
                       width="100%"
                       height="100%"
                />

            </div>
            <div>
                <TextField variant="outlined"
                           label="Min Price"
                           type="number"
                           className={classes.textField}
                           onChange={(ev) => setMinPrice(ev.target.value)}
                />
                <TextField variant="outlined"
                           label="Max Price"
                           type="number"
                           className={classes.textField}
                           onChange={(ev) => setMaxPrice(ev.target.value)}

                />
                <KeyboardDateTimePicker
                    variant="inline"
                    ampm={false}
                    label="Expiration Time"
                    value={exprDateTime}
                    onChange={setExprDateTime}
                    disablePast
                    format="dd/MM/yy HH:mm"
                    className={classes.textField}
                />
                <Submit classes={classes} listingReq={{
                    skuId: sku.sku_id, userId: loggedInUser?.user_id,
                    minPrice, maxPrice, exprDateTime
                }}/>
            </div>
        </div>
    );
}

export const CreateListing = ({type}) => {
    const {skus, error} = useSkus();
    return (
        <VerticalTabbedItems
            items={skus}
            labelFunc={(t) => t.name}
            bodyFunc={(t) => <ListingCreateForm sku={t} type={type}/>}
        />
    );
};
