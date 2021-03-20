import React from 'react';
import {BasePage} from "../src/components/BasePage";

export default () => (
    <BasePage
        header={({classes, drawerOpened}) => 'TrueBid'}
        content={({classes, drawerOpened}) => (<h1>Welcome</h1>)}
    />
)
