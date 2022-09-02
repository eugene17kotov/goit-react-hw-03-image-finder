import PropTypes from 'prop-types';
import { LoadMoreButton } from './Button.styled';

export const Button = ({ onFetchMore, disabled }) => {
  return (
    <LoadMoreButton onClick={onFetchMore} disabled={disabled} type="button">
      Load more
    </LoadMoreButton>
  );
};

Button.propTypes = {
  onFetchMore: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};
