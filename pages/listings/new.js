import React from 'react';
import {BasePage} from "../../src/components/BasePage";
import {CreateListing} from "../../src/components/listing/CreateListing";
import {useRouter} from "next/router";

const CreateListingPage = () => (
    <BasePage
        header={({classes, drawerOpened}) => 'Create New Listing'}
        content={({classes, drawerOpened}) => (
            <CreateListing type={useRouter()?.query?.["type"]}/>
        )}
    />
);

export default CreateListingPage
