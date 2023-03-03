import regexWildcard from "./regexWildcard.js";
import regexWildcard2 from "./regexWildcard2.js";
import regexStatic from "./regexStatic.js";
import indexOf from "./indexOf.js";
import indexOf2 from "./indexOf2.js";

import Benchmark from "benchmark";

const suite = new Benchmark.Suite();

suite
  .add("regexWildcard", regexWildcard)
  .add("regexWildcard2", regexWildcard2)
  .add("regexStatic", regexStatic)
  .add("indexOf", indexOf)
  .add("indexOf2", indexOf2)
  .on("cycle", function (event) {
    console.log(String(event.target));
  })
  .on("complete", function () {
    console.log("Fastest is " + this.filter("fastest").map("name"));
  })
  .run({ async: true });
