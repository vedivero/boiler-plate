const express = require('express');
const app = express();
const port = 5000;
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const { User } = require('./models/User');
const { auth } = require('./middleware/auth');
const mongoose = require('mongoose');

// application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: true }));
// application/json
app.use(bodyparser.json());
app.use(cookieParser());

mongoose
   .connect(config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => console.log('MongoDB Connected'))
   .catch((err) => console.log(err));

app.get('/', (req, res) => res.send('Hello World'));
app.get('/hello', (req, res) => res.send('hello world'));

// 회원 가입
app.post('/users/register', async (req, res) => {
   const user = new User(req.body);
   try {
      await user.save();
      return res.status(200).json({ success: true });
   } catch (error) {
      return res.json({ success: false, error });
   }
});

app.post('/users/login', async (req, res) => {
   try {
      // 요청된 이메일을 데이터베이스에서 찾기
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
         return res.json({
            loginSuccess: false,
            message: '존재하지 않는 이메일입니다.',
         });
      }

      // 요청된 이메일을 찾았다면 비밀번호가 일치하는지 확인
      const isMatch = await user.comparePassword(req.body.password); // 콜백 대신 await로 처리
      if (!isMatch) {
         return res.json({
            loginSuccess: false,
            message: '비밀번호가 일치하지 않습니다.',
         });
      }

      // 비밀번호 일치 시, 토큰 생성
      const updatedUser = await user.generateToken();
      // 쿠키에 토큰 저장
      res.cookie('x_auth', updatedUser.token).status(200).json({
         loginSuccess: true,
         userId: updatedUser._id,
      });
   } catch (err) {
      return res.status(500).json({
         loginSuccess: false,
         error: '로그인 중 에러가 발생했습니다.',
      });
   }
});

//User Authentication Router
app.get('/users/auth', auth, (req, res) => {
   res.status(200).json({
      _id: req.user._id,
      isAdmin: req.user.role === 0 ? false : true,
      isAuth: true,
      email: req.user.email,
      name: req.user.name,
      lastname: req.user.lastname,
      role: req.user.role,
      image: req.user.image,
   });
});

// Logout Router
app.get('/users/logout', auth, async (req, res) => {
   try {
      await User.findOneAndUpdate({ _id: req.user._id }, { token: '' });

      return res.status(200).send({
         success: true,
      });
   } catch (err) {
      return res.json({ success: false, err });
   }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
