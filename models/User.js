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
userSchema.pre('save', function (next) {
   let user = this;
   if (user.isModified('password')) {
      bcrypt.genSalt(saltRounds, (err, salt) => {
         if (err) return next(err);

         bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
         });
      });
   } else {
      next();
   }
});

// 암호화된 DB의 PASSWORD와 사용자가 입력한 PASSWORD를 암호화해서 비교
userSchema.methods.comparePassword = function (plainPassword, callback) {
   bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
      if (err) return callback(err); // 잘못된 부분 수정
      callback(null, isMatch);
   });
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

const User = mongoose.model('User', userSchema);

module.exports = { User };
