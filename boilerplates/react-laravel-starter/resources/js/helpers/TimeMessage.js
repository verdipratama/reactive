// Import dependency
const moment = require('moment');

const TimeMessage = (nama) => {
  const jam = moment();
  const jamSekarang = jam.hour();

  if (jamSekarang >= 12 && jamSekarang <= 17) {
    return `Selamat Sore, ${nama}!`;
  } else if (jamSekarang >= 18) {
    return `Selamat Malam, ${nama}!`;
  }
  return `Selamat Pagi, ${nama}!`;
};

console.log(TimeMessage('Jhon'));
