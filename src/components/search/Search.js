import {Container} from '@material-ui/core';
import SearchForm from './SearchForm';
import ProfileBrowser from '../profiles/ProfileBrowser';

const Search = () => (
    <Container>
      <SearchForm/>
      <ProfileBrowser/>
    </Container>
);

export default Search;

