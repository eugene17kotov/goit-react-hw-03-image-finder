import { Component } from 'react';
import { Box } from 'utils/Box';
import { Button } from 'components/Button/Button';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Modal } from 'components/Modal/Modal';
import { Loader } from 'components/Loader/Loader';
import { getFetchImages } from 'services/api';

export class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    page: 1,
    totalPages: 1,
    showModal: false,
    isLoading: false,
    modalImage: null,
    error: null,
  };

  componentDidUpdate = async (prevProps, prevState) => {
    try {
      const { page, searchQuery } = this.state;

      if (searchQuery.trim() === '') {
        return;
      }

      if (
        prevState.searchQuery.trim() !== searchQuery.trim() ||
        prevState.page !== page
      ) {
        const fetchImages = await getFetchImages(searchQuery, page);

        const requiredPropertiesImages = fetchImages.hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            webformatURL,
            largeImageURL,
            tags,
          })
        );

        this.setState(prevState => ({
          images: [...prevState.images, ...requiredPropertiesImages],
          isLoading: false,
          totalPages: Math.ceil(fetchImages.total / 12),
        }));
      }
    } catch (error) {
      this.setState({ error });
    }
  };

  handleSearchbarSubmit = event => {
    event.preventDefault();
    const inputValue = event.target.elements.search.value.trim();
    const { searchQuery } = this.state;

    if (inputValue === '') {
      this.setState({ searchQuery: '', page: 1, images: [] });
      return;
    }

    if (inputValue === searchQuery) {
      return;
    }

    this.setState({
      isLoading: true,
      searchQuery: inputValue,
      page: 1,
      images: [],
    });

    event.target.reset();
  };

  handleLoadMoreButton = () => {
    this.setState(prevState => ({ page: prevState.page + 1, isLoading: true }));
  };

  openModal = imageId => {
    const largeImage = this.state.images.find(
      image => image.id === imageId
    ).largeImageURL;

    this.setState({ isLoading: true });

    setTimeout(() => {
      this.setState({
        showModal: true,
        modalImage: largeImage,
        isLoading: false,
      });
    }, 300);
  };

  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    const {
      images,
      searchQuery,
      totalPages,
      page,
      showModal,
      isLoading,
      modalImage,
      error,
    } = this.state;

    return (
      <>
        <Box display="grid" gridTemplateColumns="1fr" gridGap="16px" pb="24px">
          <Searchbar onSubmit={this.handleSearchbarSubmit} />
          {error && <p>Seems like something went wrong :( {error.message}</p>}
          {isLoading && <Loader />}
          {images.length > 0 && (
            <>
              <ImageGallery images={images} openModal={this.openModal} />
              <Box display="flex" justifyContent="center">
                <Button
                  onFetchMore={this.handleLoadMoreButton}
                  disabled={totalPages === page}
                />
              </Box>
            </>
          )}
        </Box>
        {showModal && (
          <Modal onClose={this.closeModal}>
            <img src={modalImage} alt={searchQuery} />
          </Modal>
        )}
      </>
    );
  }
}
