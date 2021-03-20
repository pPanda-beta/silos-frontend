import React from 'react';
import {BasePage} from "../../src/components/BasePage";

export default () => (
    <BasePage
        header={({classes, drawerOpened}) => 'Bids'}
        content={({classes, drawerOpened}) => (<h1>All bids by me</h1>)}
    />
)
