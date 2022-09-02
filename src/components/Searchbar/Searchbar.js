import PropTypes from 'prop-types';
import {
  SearchBar,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';
import { FcSearch } from 'react-icons/fc';

export const Searchbar = ({ onSubmit }) => {
  return (
    <SearchBar>
      <SearchForm onSubmit={onSubmit}>
        <SearchFormButton type="submit">
          <FcSearch size={32} />
        </SearchFormButton>

        <SearchFormInput
          type="text"
          name="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchBar>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
