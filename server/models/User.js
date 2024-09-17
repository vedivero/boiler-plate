const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
   name: {
      type: String,
      maxlength: 50,
   },
   email: {
      type: String,
      trim: true,
      unique: 1,
   },
   password: {
      type: String,
      minlength: 5,
      maxlength: 200,
   },
   role: {
      type: Number,
      default: 0, // 1: manager
   },
   image: String,
   token: {
      type: String,
   },
   tokenExp: {
      type: Number,
   },
});

// 회원정보 저장
userSchema.pre('save', async function (next) {
   let user = this;

   if (user.isModified('password')) {
      try {
         const salt = await bcrypt.genSalt(saltRounds); // 비동기적으로 salt 생성
         user.password = await bcrypt.hash(user.password, salt); // 비동기적으로 비밀번호 해시 생성
         next(); // 비밀번호 암호화가 완료되면 다음 미들웨어로 이동
      } catch (err) {
         next(err); // 에러 발생 시 에러 전달
      }
   } else {
      next(); // 비밀번호가 변경되지 않았으면 다음 미들웨어로 이동
   }
});

// 암호화된 DB의 PASSWORD와 사용자가 입력한 PASSWORD를 암호화해서 비교
userSchema.methods.comparePassword = async function (plainPassword) {
   try {
      return await bcrypt.compare(plainPassword, this.password);
   } catch (err) {
      throw new Error('비밀번호 비교 중 오류가 발생했습니다.');
   }
};

// 로그인 성공한 user의 토큰 생성
userSchema.methods.generateToken = async function () {
   let user = this;
   let token = jwt.sign(user._id.toHexString(), 'secretToken');
   user.token = token;

   try {
      await user.save(); // save() 메서드를 await으로 비동기 처리
      return user; // 저장된 user를 반환
   } catch (err) {
      throw err; // 에러 발생 시 에러를 던짐
   }
};

// 토큰으로 사용자 찾기
userSchema.statics.findByToken = async function (token) {
   const user = this;

   try {
      const decoded = jwt.verify(token, 'secretToken'); // 토큰을 디코딩
      return await user.findOne({ _id: decoded, token: token }); // 사용자 찾기
   } catch (err) {
      throw err; // 에러 발생 시 에러를 던짐
   }
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
