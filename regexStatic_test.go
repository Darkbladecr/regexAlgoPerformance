package main

import (
	"testing"
)

func BenchmarkPrimeNumbers(b *testing.B) {
	r := createRegex(conceptNameList)
	for i := 0; i < b.N; i++ {
		populate(r, md)
	}
}
