import axios from 'axios';

// json-server -w --host 192.168.2.105 db.json

const api = axios.create({
  baseURL: 'http://192.168.2.105:3000/',
});

export default api;
