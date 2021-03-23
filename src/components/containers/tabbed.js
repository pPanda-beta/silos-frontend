import React, {useState} from "react";
import TabContext from "@material-ui/lab/TabContext";
import AppBar from "@material-ui/core/AppBar";
import TabList from "@material-ui/lab/TabList";
import Tab from "@material-ui/core/Tab";
import TabPanel from "@material-ui/lab/TabPanel";

export const TabbedItems = ({items, labelFunc, bodyFunc}) => {
    const [selectedTabIndex, setTabIndex] = useState(0);
    const handleTabChange = (ev, id) => setTabIndex(id);

    return (
        <TabContext value={selectedTabIndex}>
            <AppBar position="static">
                <TabList
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="on"
                >
                    {
                        items
                            .map(labelFunc)
                            .map((label, index) => (
                                <Tab label={label} value={index}/>))
                    }
                </TabList>
            </AppBar>
            {
                items
                    .map((t, index) =>
                        <TabPanel value={index}>
                            {bodyFunc(t)}
                        </TabPanel>)
            }
        </TabContext>
    )
};
