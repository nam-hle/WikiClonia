const rReset = r => (r.lastIndex = 0);
const eat = (s, r) => {
  rReset(r);
  let res = r.exec(s);
  if (res === null) throw new Error(`Can not eat ${s} with ${r}`);
  let remain = s.slice(res[0].length);
  return [res[0], remain];
};
const tasteRegex = (s, r) => {
  if (s == "") return false;
  rReset(r);
  let res;
  return !((res = r.exec(s)) === null || res.index != 0);
};

const jump = (s, r = /\s+/) => (tasteRegex(s, r) ? eat(s, r)[1] : s);

const analyses = (
  s,
  R_START,
  R_END,
  R_DELIM,
  R_SEPERATOR,
  R_KEY,
  R_VALUE,
  R_SPACE = /\s+/
) => {
  [, s] = eat(s, R_START);
  [, s] = eat(s, R_SPACE);
  let key,
    value,
    result = {};
  while (!tasteRegex(s, R_END)) {
    s = jump(s);
    [key, s] = eat(s, R_KEY);
    s = jump(s);
    [, s] = eat(s, R_SEPERATOR);
    s = jump(s);
    [value, s] = eat(s, R_VALUE);
    s = jump(s);
    if (tasteRegex(s, R_DELIM)) [, s] = eat(s, R_DELIM);
    result[key] = value;
  }
  console.log(result);
};

analyses(
  `<gallery class="center" widths="400" heights="200">`,
  /<gallery/,
  />/,
  /\s+/,
  /=/,
  /\w+/,
  /"[^\"]*"/
);
