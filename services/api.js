import axios from 'axios';

// json-server -w --host 172.20.10.2 db.json

const api = axios.create({
  baseURL: 'http://172.20.10.2:3000/',
});

export default api;
