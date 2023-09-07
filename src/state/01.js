const isEvenIndexSumGreater = (arr) => {
	return arr.filter((el, i) => i % 2 === 0 && Number.isInteger(i)).reduce((acc, num) => acc + num, 0) > arr.reduce((acc, num) => acc + num, 0)
}

console.log(isEvenIndexSumGreater([1, 100, 2, 200]))