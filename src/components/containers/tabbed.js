import React, {Fragment, useState} from "react";
import TabContext from "@material-ui/lab/TabContext";
import AppBar from "@material-ui/core/AppBar";
import TabList from "@material-ui/lab/TabList";
import Tab from "@material-ui/core/Tab";
import TabPanel from "@material-ui/lab/TabPanel";
import {makeStyles} from "@material-ui/styles";

const useVerticalTabStyles = makeStyles((theme) => ({
    root: {
        display: 'inline-flex',
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        height: '100%',
        width: '100%',
        border: `0.2rem solid ${theme.palette.primary.light}`,
    },
    tabs: {
        "min-width": '7rem',
        borderRight: `0.5rem solid ${theme.palette.divider}`,
    },
    tabPanel: {
        padding: '0.5rem',
    },
}));

const TabOptions = ({labelFunc, items, ...props}) => (
    <TabList {...props}>
        {
            items
                .map(labelFunc)
                .map((label, index) => (
                    <Tab label={label} value={index}/>))
        }
    </TabList>
)


const TabPanels = ({bodyFunc, items, classes}) => (
    <Fragment>
        {
            items
                .map((t, index) =>
                    <TabPanel value={index} className={classes?.tabPanel ?? ""} id={`tbp${index}`}>
                        {bodyFunc(t)}
                    </TabPanel>)
        }

    </Fragment>
);


export const VerticalTabbedItems = ({items, labelFunc, bodyFunc}) => {
    const [selectedTabIndex, setTabIndex] = useState(0);
    const classes = useVerticalTabStyles();
    return (
        <TabContext value={selectedTabIndex}>
            <div className={classes.root}>
                <TabOptions
                    onChange={(ev, id) => setTabIndex(id)}
                    variant="scrollable"
                    scrollButtons="on"
                    orientation="vertical"
                    className={classes.tabs}
                    items={items}
                    labelFunc={labelFunc}
                />
                <TabPanels items={items} bodyFunc={bodyFunc} classes={classes}/>
            </div>
        </TabContext>
    )
};


export const TabbedItems = ({items, labelFunc, bodyFunc}) => {
    const [selectedTabIndex, setTabIndex] = useState(0);
    return (
        <TabContext value={selectedTabIndex}>
            <AppBar position="static">
                <TabOptions
                    onChange={(ev, id) => setTabIndex(id)}
                    variant="scrollable"
                    scrollButtons="on"
                    items={items}
                    labelFunc={labelFunc}
                />
            </AppBar>
            <TabPanels items={items} bodyFunc={bodyFunc}/>
        </TabContext>
    )
};
