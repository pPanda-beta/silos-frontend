import React from 'react';
import {BasePage} from "../src/components/BasePage";
import Typography from "@material-ui/core/Typography";

export default () => (
    <BasePage
        header={({classes, drawerOpened}) => 'Home'}
        content={({classes, drawerOpened}) => (
            <Typography paragraph>
              <span><b>Welcome, Guest</b></span>
            </Typography>
        )}
    />
)
