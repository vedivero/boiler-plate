import { AUTH_USER, LOGIN_USER, REGISTER_USER } from '../_actions/types';

// 함수에 이름을 지정
const userReducer = (state = {}, action) => {
   switch (action.type) {
      case LOGIN_USER:
         return { ...state, loginSuccess: action.payload };
      case REGISTER_USER:
         return { ...state, registerSuccess: action.payload };
      case AUTH_USER:
         return { ...state, userData: action.payload };
      default:
         return state;
   }
};

export default userReducer;
