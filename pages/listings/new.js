import React from 'react';
import {BasePage} from "../../src/components/BasePage";

export default () => (
    <BasePage
        header={({classes, drawerOpened}) => 'Create New Listing'}
        content={({classes, drawerOpened}) => (<h1>Enter params</h1>)}
    />
)
