import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-353ef.firebaseio.com/'
})

export default instance;