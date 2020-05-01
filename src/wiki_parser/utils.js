const taste = (s, t, i) => s[i] == t[0] && s.substr(i, t.length) == t;

const capitalizeFirst = string =>
  string.charAt(0).toUpperCase() + string.slice(1);

const capitalize = string =>
  string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

const trimQuote = str =>
  str && '"' == str[0] && '"' == str[str.length - 1]
    ? str.slice(1, str.length - 1)
    : str;

const clean = obj => {
  let res = {};
  for (const key in obj) {
    let value = obj[key];
    if (
      !value ||
      (Array.isArray(value) && value?.length === 0) ||
      Object.keys(value).length === 0
    )
      continue;
    res[key] = value;
  }
  return res;
};

export { taste, capitalizeFirst, capitalize, trimQuote, clean };
