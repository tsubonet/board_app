import axios from 'axios';

/**
 * 日付をフォーマットする
 * @param  {Date}   date     日付
 * @param  {String} [format] フォーマット
 * @return {String}          フォーマット済み日付
 */
const formatDate = (date, format = 'YYYY-MM-DD hh:mm:ss.SSS') => {
  format = format.replace(/YYYY/g, date.getFullYear());
  format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
  format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
  format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2));
  format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
  format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
  if (format.match(/S/g)) {
    const milliSeconds = ('00' + date.getMilliseconds()).slice(-3);
    const length = format.match(/S/g).length;
    for (let i = 0; i < length; i++) format = format.replace(/S/, milliSeconds.substring(i, i + 1));
  }
  return format;
}

const setUserId = () => {
  if (typeof localStorage.user_id !== 'undefined') return;
  const str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const len = 8;
  let result = "";
  for (let i = 0; i < len; i++) {
    result += str.charAt(Math.floor(Math.random() * str.length));
  }
  localStorage.user_id = result;
}


const sendPost = (url, data) => {
  return axios.post(url, data, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': document.getElementsByName('csrf-token').item(0).content,
    },
  }).then(response => response.data);
}

const sendGet = (url) => {
  return axios.get(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': document.getElementsByName('csrf-token').item(0).content,
    },
  }).then(response => response.data);
}

export { setUserId, formatDate, sendPost, sendGet };