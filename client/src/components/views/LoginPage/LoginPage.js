import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../../_actions/user_action';
import Auth from '../../../hoc/auth';

const LoginPage = () => {
   const dispatch = useDispatch();
   const [Email, setEmail] = useState(''); // 수정: setEamil -> setEmail
   const [Password, setPassword] = useState('');
   const navigate = useNavigate();

   const onEmailHandler = (e) => {
      setEmail(e.target.value);
   };

   const onPasswordHandler = (e) => {
      setPassword(e.target.value);
   };

   const onSubmitHandler = (e) => {
      e.preventDefault();

      let body = {
         email: Email,
         password: Password,
      };

      dispatch(loginUser(body))
         .then((response) => {
            if (response.payload.loginSuccess) {
               navigate('/');
            } else {
               alert('Error');
            }
         })
         .catch((error) => {
            console.error('로그인 중 에러 발생:', error);
            alert('로그인 요청 실패');
         });
   };

   return (
      <div
         style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100vh',
         }}
      >
         <form
            style={{ display: 'flex', flexDirection: 'column' }}
            onSubmit={onSubmitHandler}
         >
            <label>Email</label>
            <input type='email' value={Email} onChange={onEmailHandler} />
            <label>Password</label>
            <input
               type='password'
               value={Password}
               onChange={onPasswordHandler}
            />
            <br />
            <button type='submit'>Login</button>
         </form>
      </div>
   );
};

export default Auth(LoginPage, false);
