import React from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {useStyles} from "../styles/base";
import SideBar from "../components/navigation/SideBar";
import {SWRConfig} from "swr";
import {swrConfigs} from "../intg/client";
import useUser from "../data/use-user";

export const BasePage = (
    {
        header = 'TrueBid',
        content = () => (<></>),
    }
        = {}) => {
    const classes = useStyles();
    const {loggedInUser, logout} = useUser();

    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);

    const childProps = {
        classes, drawerOpened: open,
        loggedInUser
    };

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <SWRConfig
                value={swrConfigs}
            >
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar className={classes.header}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" noWrap style={{width: '100%'}}>

                            {header(childProps)}

                            <span className={classes.userWelcomeMsg}>
                                Hi {loggedInUser?.name}
                            </span>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <SideBar open={open} handleDrawerClose={handleDrawerClose} onLogout={logout}/>
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader}/>
                    <Typography paragraph>
                        {content(childProps)}
                    </Typography>
                </main>
            </SWRConfig>
        </div>
    );
};

