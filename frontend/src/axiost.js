import axios from 'axios';
import {getCookie} from "./CookieHandler.js"

const instance = axios.create({
  baseURL: 'http://192.168.1.119:8000', // Replace with your API base URL
  //baseURL: 'http://213.21.99.94:8000', // Replace with your API base URL
  headers: {
    'sessionKey': getCookie("sessionKey"),
    // Add any other default headers you need here
  },
});

export default instance;
