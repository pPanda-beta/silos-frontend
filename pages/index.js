import React from 'react';
import {BasePage} from "../src/components/BasePage";
import Search from '../src/components/search/Search';

export default () => (
    <BasePage
        header={({classes, drawerOpened}) => 'Home'}
        content={({classes, drawerOpened}) => (
              <Search />
        )}
    />
)
