import React from 'react';
import {BasePage} from "../../src/components/BasePage";
import {Listings} from "../../src/components/listing/ListingView";


const ListingPage = () => (
    <BasePage
        header={({classes, drawerOpened}) => 'Listings'}
        content={({classes, drawerOpened}) => (<Listings/>)}
    />
);

export default ListingPage;
