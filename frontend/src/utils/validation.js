//trimmer
const trimString_ = value => (typeof value === 'string' ? value.trim() : value);

/**
 * Allow non empty english string with numbers and non-word symbols.
 * Listed all symbols instead of using \W because not english letters (ex: cyrillic) considered as no-word symbols.
 * */
 export const checkNameString = value => {
  value = trimString_(value);
  const englishNumbersSymbols = /^[A-Za-z0-9_!\-?@#$£€%^&*()+=]*$/;
  return Boolean(value && value.length > 2 && value.length < 16 && englishNumbersSymbols.test(value));
};

/*
 * Password validation
 * 1st case
 * Contain at least 7 characters
 * contain at least 1 number
 * contain at least 1 lowercase character (a-z)
 * contain at least 1 uppercase character (A-Z)
 * contains only 0-9a-zA-Z
 * 
 * 2d case
 * To check a password between 7 to 40 characters which contain at least one numeric digit and a special character
 * 
 */
export const checkPassword = value => {
  if (typeof value === 'string') value = value.trim();
  //const regexp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*[!@#%&*?£]).{8,}$/;
  //const regexp = /^(?=.*[0-9])(?=.*[_!?\-@#$£€%^&*()+=])[a-zA-Z0-9_!?\-@#$£€%^&*()+=]{7,40}$/;
  //make it very simple
  const regexp = /^[A-Za-z0-9_!\-?@#$£€%^&*()+=]*$/;
  return Boolean(value && value.length > 5 && value.length < 41 && regexp.test(value));
};

//EMAIL
export const checkEmail = email => {
  if (!email || !email.length) return false;
  if (email.indexOf('@') < 0) return false;

  const [, domain] = email.split('@');
  if (!domain || !domain.length) return false;
  if (domain.indexOf('..') > -1) return false; // manual validation for '..', cause it fails to work in Regexp in Safari and FF

  // REGEXP TRANSCRIPTION
  // LOCAL PART:
  // ^(?!\.) => not start with dot
  // [\w\/\-+.!#$%&'*=?^`{|}~]+ => group of chars from list, any amount

  // DOMAIN PART:
  // @([\w-][.]?)+ => group of chars with hyphen and  zero or one dot, any amount
  // \.(?<!\.\.) => dot, but not two dots in a row
  // [A-Za-z0-9]{2,20} => group of chars (min 2, max 20) for root domain

  return /^(?!\.)[\w\/\-+.!#$%&'*=?^`{|}~]+@([\w-][.]?)+\.[A-Za-z0-9]{2,20}$/.test(email);
};
