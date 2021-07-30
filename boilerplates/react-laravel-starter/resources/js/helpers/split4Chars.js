export const split4Chars = (str) => {
  return typeof str === 'string' ? (str.match(/.{1,4}/g) || []).join(' ') : '';
};

console.log(split4Chars('6520384365'));
