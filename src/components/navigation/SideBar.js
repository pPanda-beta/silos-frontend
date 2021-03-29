import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import {useStyles} from "../../styles/base";
import {useTheme} from "@material-ui/core/styles";
import Link from "../../Link";
import {PlusOneSharp} from "@material-ui/icons";

export default ({open, handleDrawerClose, onLogout}) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                </IconButton>
            </div>
            <Divider/>
            <List>
                {/*<ListItem button component={Link} href="/listings/new?type=buy">*/}
                {/*    <ListItemText primary="Buy"/>*/}
                {/*    <ListItemIcon><MonetizationOnIcon/> <ArrowRightAltIcon/> <WbSunnyIcon/></ListItemIcon>*/}
                {/*</ListItem>*/}

                <ListItem button component={Link}
                          href="/listings/new?type=sell">
                    <ListItemText primary="Create Listing"/>
                    <ListItemIcon><WbSunnyIcon/> <ArrowRightAltIcon/>
                        <MonetizationOnIcon/></ListItemIcon>
                </ListItem>

                <ListItem button component={Link} href="/listings">
                    <ListItemText primary="My Listings"/>
                    <ListItemIcon><MonetizationOnIcon/></ListItemIcon>
                </ListItem>

                <ListItem button component={Link} href="/bids/new">
                    <ListItemText primary="Buy"/>
                    <ListItemIcon><MonetizationOnIcon/><PlusOneSharp/></ListItemIcon>
                </ListItem>

                <ListItem button component={Link} href="/bids">
                    <ListItemText primary="My Bids"/>
                    <ListItemIcon><WbSunnyIcon/></ListItemIcon>
                </ListItem>

            </List>
            <Divider/>
            <List>

                <ListItem button onClick={onLogout}>
                    <ListItemIcon><InboxIcon/></ListItemIcon>
                    <ListItemText primary="Logout"/>
                </ListItem>
            </List>
        </Drawer>
    );
}