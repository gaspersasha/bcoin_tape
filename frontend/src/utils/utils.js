import { getUserLocale } from 'get-user-locale';

//All utils

// возвращает куки с указанным name,
// или undefined, если ничего не найдено
export const getCookie = (name) => {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

// ex
// function deleteCookie(name) {
//   setCookie(name, "", {
//     'max-age': -1
//   })
// }
export const setCookie =(name, value, options = {}) => {

  options = {
    path: '/',
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
};

export const getUserData = () => {
  return getCookie('userData');
};

function copyToClipboard(text) {
  if (window.clipboardData && window.clipboardData.setData) {
      // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
      return window.clipboardData.setData("Text", text);

  }
  else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
      var textarea = document.createElement("textarea");
      textarea.textContent = text;
      textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in Microsoft Edge.
      document.body.appendChild(textarea);
      textarea.select();
      try {
          return document.execCommand("copy");  // Security exception may be thrown by some browsers.
      }
      catch (ex) {
          console.warn("Copy to clipboard failed.", ex);
          return false;
      }
      finally {
          document.body.removeChild(textarea);
      }
  }
};

export const numberWith = (x, spread) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, spread);
};

// global lang param
export const getInitialLocale = (x, spread) => {
  let locale = 'en';
  const detected = getUserLocale();
  const available = {
    en: ['en', 'en-US', 'en-GB'],
    // ru: 'ru',
    // ru: 'ru',
    // ru: 'ru',
  };
  switch (detected) {
    case (available.en.includes(detected)):
    locale = 'en';
    break;
    default: break;
  };
  return locale;
};

// expected output: min - max
export const getRandomIntFrom = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const setRandomCallDelay = (CB) => {
  setTimeout(() => {
    CB();
  }, getRandomIntFrom(1, 3) * 1000);
};

export const sortArrByObjProperty = (a, b,) => {
  if (a.last_nom < b.last_nom){
    return -1;
  }
  if (a.last_nom > b.last_nom){
    return 1;
  }
  return 0;
};


export const getBetsToDensity = (betsArray, density = {}) => {
  betsArray.forEach(el => {
    if (!density[el.field]) {
      density[el.field] = {
        totalBets: el.bet,
        betsAmount: 1,
      };
    } else {
      density[el.field] = {
        totalBets: density[el.field].totalBets + el.bet,
        betsAmount: ++density[el.field].betsAmount,
      };
    }
  });
  return density;
};
