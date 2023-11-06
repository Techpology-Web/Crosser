import axios from 'axios';
import {getCookie} from "./CookieHandler.js"

const instance = axios.create({
  baseURL: 'http://localhost:8000', // Replace with your API base URL
  //baseURL: 'http://83.233.247.40:8000', // Replace with your API base URL
  headers: {
    'sessionKey': getCookie("sessionKey"),
    // Add any other default headers you need here
  },
});

export default instance;
