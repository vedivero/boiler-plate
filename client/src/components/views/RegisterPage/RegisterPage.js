import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../_actions/user_action';

const RegisterPage = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [Email, setEamil] = useState('');
   const [Name, setName] = useState('');
   const [Password, setPassword] = useState('');
   const [ConfirmPassword, setConfirmPassword] = useState('');

   const onEamilHandler = (e) => {
      setEamil(e.target.value);
   };

   const onNameHandler = (e) => {
      setName(e.target.value);
   };

   const onPasswordHandler = (e) => {
      setPassword(e.target.value);
   };

   const onConfirmPasswordHandler = (e) => {
      setConfirmPassword(e.target.value);
   };

   const onSubmitHandler = (e) => {
      e.preventDefault();

      if (Password !== ConfirmPassword) {
         return alert('비밀버호가 일치하지 않습니다');
      }

      let body = {
         email: Email,
         name: Name,
         password: Password,
      };

      dispatch(registerUser(body))
         .then((response) => {
            console.log('서버 응답:', response.payload); // 응답 전체 확인

            if (response.payload.registerSuccess) {
               console.log('회원가입 성공');
               navigate('/login');
            } else {
               console.log('회원가입 실패:', response.payload); // 전체 응답 출력
               alert('Error: 회원가입 실패'); // 에러 표시
            }
         })
         .catch((error) => {
            if (error.name === 'AbortError') {
               console.log('요청이 취소되었습니다.');
            } else {
               console.error('회원가입 중 에러 발생:', error); // 에러를 상세히 출력
               alert(`회원가입 요청 실패: ${error.message}`); // 에러 메시지를 alert로 표시
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

            <label>Name</label>
            <input type='text' value={Name} onChange={onNameHandler} />

            <label>Password</label>
            <input
               type='password'
               value={Password}
               onChange={onPasswordHandler}
            />

            <label>Confirm Password</label>
            <input
               type='password'
               value={ConfirmPassword}
               onChange={onConfirmPasswordHandler}
            />

            <br />
            <button type='submit'>Register</button>
         </form>
      </div>
   );
};

export default RegisterPage;
