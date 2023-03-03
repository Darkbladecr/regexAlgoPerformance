import regexWildcard from "./regexWildcard.js";
import regexWildcard2 from "./regexWildcard2.js";
import regexStatic from "./regexStatic.js";
import indexOf from "./indexOf.js";
import indexOf2 from "./indexOf2.js";

const res = new Set([
  regexWildcard(),
  regexWildcard2(),
  regexStatic(),
  indexOf(),
  indexOf2(),
]);

res.forEach((x) => console.log(x));
console.log(res.size === 1);
