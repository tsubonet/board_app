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


const formatPostString = (data) => {
  if(typeof data !== 'string') {
    return data;
  }
  let formatted_data = data
    .replace(/[&'`"<>]/g, function(match) {
      return {
        '&': '&amp;',
        "'": '&#x27;',
        '`': '&#x60;',
        '"': '&quot;',
        '<': '&lt;',
        '>': '&gt;',
      }[match]
    })
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">' + "$1" + '</a>');
  return formatted_data;
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

const modalWindow = {
  styles: {
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.75)',
      bottom: '0',
      height: '100%',
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      width: '100%',
      zIndex: '1',
    },
    contentWrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'fixed',
      left: '0',
      right: '0',
      top: '0',
      bottom: '0',
      width: '90%',
      margin: 'auto',
      zIndex: '3',
    },
    content: {
      width: '100%',
      maxWidth: '1140px',
      padding: '15px 30px',
      background: '#fff',
      zIndex: '2',
    },
  },
};

const smoothScroll = {
  timer: null,

  stop: function () {
    clearTimeout(this.timer);
  },

  scrollTo: function (id, callback) {
    const settings = {
      duration: 1000,
      easing: {
        outQuint: function (x, t, b, c, d) {
          return c*((t=t/d-1)*t*t*t*t + 1) + b;
        }
      }
    };
    let percentage;
    let startTime;
    let node = document.getElementById(id);
    let nodeTop = node.offsetTop;
    let nodeHeight = node.offsetHeight;
    let body = document.body;
    let html = document.documentElement;
    let height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    let windowHeight = window.innerHeight
    let offset = window.pageYOffset;
    let delta = nodeTop - offset;
    let bottomScrollableY = height - windowHeight;
    //let targetY = (bottomScrollableY < delta) ?
    //  bottomScrollableY - (height - nodeTop - nodeHeight + offset):
    //  delta;
    let targetY = delta;

    startTime = Date.now();
    percentage = 0;

    if (this.timer) {
      clearInterval(this.timer);
    }

    function step() {
      let yScroll;
      let elapsed = Date.now() - startTime;

      if (elapsed > settings.duration) {
        clearTimeout(this.timer);
      }

      percentage = elapsed / settings.duration;

      if (percentage > 1) {
        clearTimeout(this.timer);

        if (callback) {
          callback();
        }
      } else {
        yScroll = settings.easing.outQuint(0, elapsed, offset, targetY, settings.duration);
        window.scrollTo(0, yScroll);
        this.timer = setTimeout(step, 10);
      }
    }
    this.timer = setTimeout(step, 10);
  }
};


export { setUserId, formatDate, formatPostString, smoothScroll, modalWindow, sendPost, sendGet };
