const i = Object.prototype.toString, o = (t) => i.call(t), p = (t) => o(t).slice(8, -1), y = Array.isArray, b = (t) => o(t) === "[object Map]", u = (t) => o(t) === "[object Set]", j = (t) => o(t) === "[object Date]", g = (t) => o(t) === "[object RegExp]", n = (t) => typeof t == "function", S = (t) => typeof t == "string", a = (t) => typeof t == "symbol", r = (t) => t !== null && typeof t == "object", f = (t) => o(t) === "[object Promise]" || (r(t) || n(t)) && n(t.then) && n(t.catch);
function T(t) {
  let e = 0;
  const c = (s) => {
    e = s, t.innerHTML = `count is ${e}`;
  };
  t.addEventListener("click", () => c(++e)), c(0);
}
export {
  y as isArray,
  j as isDate,
  n as isFunction,
  b as isMap,
  r as isObject,
  f as isPromise,
  g as isRegExp,
  u as isSet,
  S as isString,
  a as isSymbol,
  i as objectToString,
  T as setupCounter,
  p as toRawType,
  o as toTypeString
};
