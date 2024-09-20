import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '../_actions/user_action';

const Auth = (SpecificComponent, option, adminRoute = null) => {
   const AuthenticationCheck = (props) => {
      const dispatch = useDispatch();
      const navigate = useNavigate();

      useEffect(() => {
         // 서버에 인증 요청을 보내는 로직
         dispatch(auth()).then((response) => {
            console.log(response);

            // 로그인하지 않은 유저가 로그인 필요한 페이지로 접근할 때
            if (!response.payload.isAuth) {
               if (option) {
                  navigate('/login');
               }
            } else {
               // 로그인한 유저가 접근할 수 없는 페이지로 접근할 때
               if (option === false) {
                  navigate('/');
               }
            }
         });
      }, [dispatch, navigate]);

      return <SpecificComponent {...props} />;
   };

   return <AuthenticationCheck />;
};

export default Auth;
