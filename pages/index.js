import React from 'react';
import {BasePage} from "../src/components/BasePage";
import Typography from "@material-ui/core/Typography";

export default () => (
    <BasePage
        header={({classes, drawerOpened}) => 'TrueBid'}
        content={({classes, drawerOpened, loggedInUser}) => (
            <Typography paragraph>
              <span><b>Welcome, {loggedInUser?.name}</b></span>
            </Typography>
        )}
    />
)
