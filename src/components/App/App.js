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
  };

  componentDidUpdate = async (prevProps, prevState) => {
    const { page, searchQuery } = this.state;

    if (searchQuery.trim() === '') {
      return;
    }

    console.log('GO');

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
  };

  handleSearchbarSubmit = event => {
    event.preventDefault();

    this.setState({
      searchQuery: '',
    });

    this.setState({
      searchQuery: event.target.elements.search.value,
      page: 1,
      images: [],
    });

    event.target.reset();

    if (this.state.searchQuery.trim() !== '') {
      this.setState({
        isLoading: true,
      });
    }
  };

  handleLoadMoreButton = () => {
    this.setState(prevState => ({ page: prevState.page + 1, isLoading: true }));
  };

  openModal = imageId => {
    this.setState({
      showModal: true,
      modalImage: this.state.images.find(image => image.id === imageId)
        .largeImageURL,
    });
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
    } = this.state;

    return (
      <>
        <Box display="grid" gridTemplateColumns="1fr" gridGap="16px" pb="24px">
          <Searchbar onSubmit={this.handleSearchbarSubmit} />
          {isLoading && <Loader />}
          {images.length > 0 && (
            <>
              <ImageGallery
                images={this.state.images}
                openModal={this.openModal}
              />
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
