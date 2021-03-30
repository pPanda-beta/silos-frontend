import React from 'react';
import {BasePage} from "../../src/components/BasePage";
import {MyBids} from "../../src/components/bid/BidModify";

const BidsPage = () => (
    <BasePage
        header={({classes, drawerOpened}) => 'Bids'}
        content={({classes, drawerOpened}) => (<MyBids/>)}
    />
);

export default BidsPage;
