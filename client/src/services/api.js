import axios from 'axios'


const instance = axios.create({
  baseURL: '/api',
  timeout: 5000
});


instance.interceptors.response.use(function (response) {
    // Success
    return response.data;
  }, function (error) {
    // Error
    return Promise.reject(error.response.data.error);
  });

export default () => instance
