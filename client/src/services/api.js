import axios from 'axios'
import store from 'store'

const instance = axios.create({
  baseURL: '/api',
  timeout: 5000,
});

instance.interceptors.response.use(function (response) {
  // Success
  return response.data;
}, function (error) {
  // Error
  return Promise.reject(error.response.data.error);
});



export default () => {
  const token = store.get('accessToken');
  if (token) {
    instance.defaults.headers.common['Authorization'] = `${token.id}`;
  }

  return instance
}
