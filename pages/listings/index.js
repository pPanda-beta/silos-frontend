import React from 'react';
import {BasePage} from "../../src/components/BasePage";

export default () => (
    <BasePage
        header={({classes, drawerOpened}) => 'Listings'}
        content={({classes, drawerOpened}) => (<h1>All listings by me</h1>)}
    />
)
