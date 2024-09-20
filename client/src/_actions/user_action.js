import axios from 'axios';
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from './types';

export const loginUser = (dataToSubmit) => {
   const request = axios
      .post('/api/users/login', dataToSubmit) // dataToSubmit을 body로 사용
      .then((response) => response.data);

   return {
      type: LOGIN_USER,
      payload: request,
   };
};

export const registerUser = (dataToSubmit) => {
   const request = axios
      .post('/api/users/register', dataToSubmit) // dataToSubmit을 body로 사용
      .then((response) => response.data);

   return {
      type: REGISTER_USER,
      payload: request,
   };
};
export const auth = () => {
   const request = axios
      .get('/api/users/register') // get method, body필요 없음
      .then((response) => response.data);

   return {
      type: AUTH_USER,
      payload: request,
   };
};
