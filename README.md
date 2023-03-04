# Testing different text replacement strategies

We are looking at ~3000 key phrases to replace within explanation texts.

## Javascript

Using [Benchmark.js](https://github.com/bestiejs/benchmark.js)

```text
regexWildcard x 97.62 ops/sec ±0.52% (77 runs sampled)
regexWildcard2 x 108 ops/sec ±0.46% (80 runs sampled)
regexStatic x 2,451 ops/sec ±0.44% (99 runs sampled)
indexOf x 544 ops/sec ±0.25% (97 runs sampled)
indexOf2 x 634 ops/sec ±0.37% (95 runs sampled)
Fastest is regexStatic
```

```text
  execution: local
     script: regexWildcard.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
           * default: 1 looping VUs for 10s (gracefulStop: 30s)


     data_received........: 0 B   0 B/s
     data_sent............: 0 B   0 B/s
     iteration_duration...: avg=988.93µs min=953.04µs med=976.37µs max=4.68ms p(90)=1.02ms p(95)=1.04ms
     iterations...........: 10088 1008.654048/s
     vus..................: 1     min=1         max=1
     vus_max..............: 1     min=1         max=1


running (10.0s), 0/1 VUs, 10088 complete and 0 interrupted iterations
```

```text
  execution: local
     script: regexWildcard2.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
           * default: 1 looping VUs for 10s (gracefulStop: 30s)


     data_received........: 0 B  0 B/s
     data_sent............: 0 B  0 B/s
     iteration_duration...: avg=1ms min=954µs med=993.41µs max=4.67ms p(90)=1.04ms p(95)=1.06ms
     iterations...........: 9883 988.211555/s
     vus..................: 1    min=1        max=1
     vus_max..............: 1    min=1        max=1


running (10.0s), 0/1 VUs, 9883 complete and 0 interrupted iterations
```

```text
  execution: local
     script: regexStatic.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
           * default: 1 looping VUs for 10s (gracefulStop: 30s)


     data_received........: 0 B   0 B/s
     data_sent............: 0 B   0 B/s
     iteration_duration...: avg=993.9µs min=961.33µs med=979.45µs max=4.62ms p(90)=1.02ms p(95)=1.05ms
     iterations...........: 10037 1003.550772/s
     vus..................: 1     min=1         max=1
     vus_max..............: 1     min=1         max=1


running (10.0s), 0/1 VUs, 10037 complete and 0 interrupted iterations
```

```text
  execution: local
     script: indexOf.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
           * default: 1 looping VUs for 10s (gracefulStop: 30s)


     data_received........: 0 B 0 B/s
     data_sent............: 0 B 0 B/s
     iteration_duration...: avg=36ms min=33.88ms med=35.37ms max=71.74ms p(90)=38.06ms p(95)=38.78ms
     iterations...........: 278 27.76605/s
     vus..................: 1   min=1      max=1
     vus_max..............: 1   min=1      max=1


running (10.0s), 0/1 VUs, 278 complete and 0 interrupted iterations
```

```text
  execution: local
     script: indexOf2.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 40s max duration (incl. graceful stop):
           * default: 1 looping VUs for 10s (gracefulStop: 30s)


     data_received........: 0 B  0 B/s
     data_sent............: 0 B  0 B/s
     iteration_duration...: avg=3.03ms min=2.97ms med=3ms max=5.31ms p(90)=3.09ms p(95)=3.13ms
     iterations...........: 3291 329.088383/s
     vus..................: 1    min=1        max=1
     vus_max..............: 1    min=1        max=1


running (10.0s), 0/1 VUs, 3291 complete and 0 interrupted iterations
```

## Golang

Rewriting the fastest script from javascript into golang gives a lot of potential benefits by using concurrency.

A simple writeup of the function into Go leads to ~x1.8 improvement

```text
goos: darwin
goarch: arm64
pkg: github.com/darkbladecr/regexAlgoPerformance
BenchmarkPrimeNumbers-10    	   18650	    639738 ns/op
PASS
ok  	github.com/darkbladecr/regexAlgoPerformance	18.766s
```

However, if we rewrite the line matching lookup we are looking at almost a ~x5 improvement:

```text
goos: darwin
goarch: arm64
pkg: github.com/darkbladecr/regexAlgoPerformance
BenchmarkPrimeNumbers-10    	   52947	    226123 ns/op
PASS
ok  	github.com/darkbladecr/regexAlgoPerformance	14.417s
```
