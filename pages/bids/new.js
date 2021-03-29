import React from "react";
import {BasePage} from "../../src/components/BasePage";
import {NewBid} from "../../src/components/bid/BidCreate";

const NewBidPage = () => (
    <BasePage
        header={({classes, drawerOpened}) => 'Create New Bid'}
        content={({classes, drawerOpened}) => (<NewBid/>)}
    />
);

export default NewBidPage
