function* giveMeMoney() {
	console.log('before 500')
	yield 500 // stop 1  start 1

	console.log('before 400')
	yield 400 // stop 2

	console.log('before 300')
	yield 300 // stop 3

	console.log('before 200')
	yield 200

	console.log('before 100')
	return 100
}

const generator = giveMeMoney()

let result = generator.next()
console.log(result.value)

result = generator.next()
console.log(result.value)
result = generator.next()
console.log(result.value)
result = generator.next()
console.log(result.value)
result = generator.next()
console.log(result)
result = generator.next()
console.log(result)
