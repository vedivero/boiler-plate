import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../../_actions/user_action';

const LoginPage = () => {
   const dispatch = useDispatch();
   const [Email, setEamil] = useState('');
   const [Password, setPassword] = useState('');
   const navigate = useNavigate();

   const onEamilHandler = (e) => {
      setEamil(e.target.value);
   };

   const onPasswordHandler = (e) => {
      setPassword(e.target.value);
   };

   const onSubmitHandler = (e) => {
      console.log('로그인 시도');
      console.log(e);
      e.preventDefault();

      let body = {
         email: Email,
         password: Password,
      };

      dispatch(loginUser(body))
         .then((response) => {
            if (response.payload.loginSuccess) {
               console.log('로그인 성공');
               navigate('/');
            } else {
               alert('Error');
            }
         })
         .catch((error) => {
            if (error.name === 'AbortError') {
               console.log('요청이 취소되었습니다.');
            } else {
               console.error('로그인 중 에러 발생:', error);
               alert('로그인 요청 실패');
            }
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
            <input type='email' value={Email} onChange={onEamilHandler} />
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

export default LoginPage;
