import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import {red} from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {TabbedItems} from "../containers/tabbed";
import {useListings} from "../../data/use-listings";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import {asSkuImage, dateTimeFormatter, skuImageUrl, toDataset} from "../../data/common";
import {DataGrid} from "@material-ui/data-grid";
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        margin: '2rem 1rem'
    },
    actions: {
        width: '7.5rem',
        float: 'left'
    },
    media: {
        height: '.1rem',
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },


    bidItem: {
        backgroundColor: "lightgrey",
    },
    bidPrice: {
        width: '7.5rem',
        float: 'right'
    }
}));


export const ListingHeader = ({listing, classes}) => (
    <CardHeader
        avatar={
            <Avatar aria-label="recipe">
                R
            </Avatar>
        }
        action={
            <IconButton aria-label="settings">
                <MoreVertIcon/>
            </IconButton>
        }
        title={listing.sku_id}
        subheader={new Date(listing.created_time).toDateString()}
    />
);

export const ListingDetails = ({listing, classes}) => (
    <CardContent>
        <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="stretch"
        >
            <span>Min Price : {listing.min_price}</span>
            <span>Max Price : {listing.max_price}</span>
        </Grid>
    </CardContent>

);

export const ListingFooter = ({listing, classes}) => (

    <CardActions disableSpacing className={classes.actions}>
        <IconButton aria-label="add to favorites">
            <FavoriteIcon/>
        </IconButton>
        <IconButton aria-label="share">
            <ShareIcon/>
        </IconButton>
    </CardActions>

);

export const ListingImage = ({listing, classes}) => (
    <CardMedia
        className={classes.media}
        image={skuImageUrl(listing.sku_id)}
    />
);

export const ListingCard = ({header, image, details, bids, footer, classes}) => (
    <Card className={classes.root}>
        {header}
        {image}
        {details}
        {bids}
        {footer}
    </Card>
);

export const Bid = ({classes, bid, bidActionComp = () => ''}) => (
    <>
        <ListItem className={classes.bidItem} color="secondary">
            <ListItemText id={bid.bid_id}
                          primary={`By ${bid.user_id}`}
            />
            <ListItemSecondaryAction>
                <Chip
                    className={classes.bidPrice}
                    label={` ${bid.bid_amount}`}
                    color="secondary"
                />
                {bidActionComp({classes, bid})}
            </ListItemSecondaryAction>
        </ListItem>
        <Divider/>
    </>
);

export const Bids = ({classes, bids, ...props}) => (
    <List dense>
        {bids.map(bid => (
            <Bid classes={classes} bid={bid} {...props} />)
        )}
    </List>
);

export const Listing = ({listing}) => {
    const classes = useStyles();

    return (
        <ListingCard
            classes={classes}
            header={
                <ListingHeader classes={classes} listing={listing}/>
            }
            image={
                <ListingImage classes={classes} listing={listing}/>
            }
            details={
                <ListingDetails classes={classes} listing={listing}/>
            }
            bids={
                <Bids classes={classes} bids={listing.bids ?? []}/>
            }
            footer={
                <ListingFooter classes={classes} listing={listing}/>
            }
        />
    );
}

export const ListingSelector = ({listings, onSelect}) => {
    const openListings = listings.filter(t => t.state === "open");
    const {rows, columns} = toDataset(openListings, [
        ['sku_id', {headerName: "SKU ID", flex: 5}],
        ['', {headerName: "Image", flex: 3, renderCell: asSkuImage({width: '50rem'})}],
        ['max_price', {headerName: "Max Price", flex: 7}],
        ['min_price', {headerName: "Min Price", flex: 7}],
        ['created_time', {headerName: "Created On", flex: 10, valueFormatter: dateTimeFormatter}],
        ['expiration_time', {headerName: "Expires By", flex: 10, valueFormatter: dateTimeFormatter}],
    ]);
    return (
        <div style={{height: '20rem', width: '100%', 'min-width': '40rem'}}>
            <DataGrid rows={rows} columns={columns}
                      density='compact'
                      disableColumnResize={false}
                      disableMultipleColumnsSorting={false}
                      disableMultipleColumnsFiltering={false}
                      onRowSelected={({data}) => onSelect(data)}
            />
        </div>
    );

}


export const Listings = () => {
    const {listings} = useListings();

    return (
        <TabbedItems
            items={listings}
            labelFunc={(l) => `${l.sku_id}`}
            bodyFunc={(l) => <Listing listing={l}/>}
        />
    );
}
