package main

import (
	"testing"
)

func BenchmarkPrimeNumbers(b *testing.B) {
	for i := 0; i < b.N; i++ {
		populate()
	}
}
