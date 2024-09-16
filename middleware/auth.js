const { User } = require('../models/User');

// 인증을 처리하는 파일
let auth = async (req, res, next) => {
   try {
      // 클라이언트 쿠키에서 토큰 가져오기
      let token = req.cookies.x_auth;

      // 토큰을 복호화하고 유저를 찾기
      const user = await User.findByToken(token);
      if (!user) {
         return res.json({ isAuth: false, error: true });
      }

      req.token = token;
      req.user = user;
      next();
   } catch (err) {
      return res.status(400).json({ isAuth: false, error: true });
   }
};

module.exports = { auth };
