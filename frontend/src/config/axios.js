const baseUrl = "localhost:8080/api";
import axios from 'axios';

const axios = axios.create({
    baseURL: 'http://localhost:8080/api/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });
  
module.exports = axios;