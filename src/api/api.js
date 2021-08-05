import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jordan.ashton.fashion/api/goods/30/comments',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const requests = {
  getComments: () => {
    return api.get().then((response) => {
      return response;
    });
  },
  sendComment: (comment) => {
    return api
      .post('https://jordan.ashton.fashion/api/goods/30/comments', comment)
      .then((response) => {
        return response;
      });
  },
  setCurrentPage: (page) => {
    return api
      .get(`https://jordan.ashton.fashion/api/goods/30/comments?page=${page}`)
      .then((response) => {
        return response;
      });
  },
};
