import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const getFetchImages = async (query, page = 1) => {
  const response = await axios({
    params: {
      key: '28299766-d83cf6cfdb58eecdb0caa94e4',
      image_type: 'photo',
      orientation: 'horizontal',
      page,
      per_page: 12,
      q: query,
    },
  });

  return response.data;
};
