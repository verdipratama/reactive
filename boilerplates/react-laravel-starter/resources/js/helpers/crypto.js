import crypto from 'crypto';

const cryptoSecretKey = process.env.SECRET_PASSWORD || 'HaCkM3hMotHaF@cK3r';

let encrypt = (password) => {
  return crypto
    .createHmac('sha256', cryptoSecretKey)
    .update(password)
    .digest('hex');
};

export default encrypt;
