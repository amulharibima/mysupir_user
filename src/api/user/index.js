import Post from '../Post';
import Put from '../Put';

const register = (data) => Post('auth/register', data);
const verifyOtpRegist = (data) => Post('auth/register/verify', data);
// const login = (data) => Post('auth/login', data);
const login = (data) => Post('devlogin', data);
const verifyOtpLogin = (data) => Post('auth/login/verify', data);
const resendOtpLogin = (data) => Post('auth/login/resend', data);

const updateProfile = (data) => Put('user/update', data);
const updatePhoto = (data) => Post('user/update/foto', data);

const User = {
  register,
  verifyOtpRegist,
  login,
  verifyOtpLogin,
  resendOtpLogin,
  updateProfile,
  updatePhoto,
};

export default User;
