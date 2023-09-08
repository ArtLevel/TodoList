import {
	getBanknoteList,
	getSquarePositiveIntegers,
	getSum,
	getTriangleType,
	isEvenIndexSumGreater,
	sum,
	sumFirstNumbers
} from './lesson_8'

test('sum', () => {
	expect(sum(3, 5, 7, 6, 4, 9)).toBe(34)
	expect(sum(1, 1, 1, 6)).toBe(9)
})

test('get Triangle Type', () => {
	expect(getTriangleType(1, 1, 1)).toBe('10')
	expect(getTriangleType(2, 3, 3)).toBe('01')
	expect(getTriangleType(3, 3, 2)).toBe('01')
	expect(getTriangleType(4, 5, 3)).toBe('11')
	expect(getTriangleType(10, 2, 2)).toBe('00')
})

test('get Sum ', () => {
	expect(getSum(1000)).toBe(1)
	expect(getSum(0)).toBe(0)
	expect(getSum(1234)).toBe(10)
	expect(getSum(9999)).toBe(36)
})
//
test('is Even Sum Greater', () => {
	expect(isEvenIndexSumGreater([1, 100, 2, 200])).toBe(false)
	expect(isEvenIndexSumGreater([100, 1, 200, 2])).toBe(true)
	expect(isEvenIndexSumGreater([100, 1, 200, 2, 300, 4])).toBe(true)
	expect(isEvenIndexSumGreater([100, 1, 200, 2, 4])).toBe(true)
})
//
test('get Square Only Of Positive Integers', () => {
	const array = [4, 5.6, -9.8, 3.14, 10, 6, 8.34, -2]
	const len = array.length
	const result = getSquarePositiveIntegers(array)

	expect(result === array).toBe(false)
	expect(array.length).toBe(len)
	expect(result.length).toBe(3)
	expect(result[0]).toBe(16)
	expect(result[1]).toBe(100)
	expect(result[2]).toBe(36)
})
//
test('sum of first N numbers', () => {
	expect(sumFirstNumbers(0)).toBe(0)
	expect(sumFirstNumbers(4)).toBe(10)
	expect(sumFirstNumbers(10)).toBe(55)
})
//
test('get banknote list', () => {
	// надо бы проверять длинну резалтов и их сумму
	const result2500 = getBanknoteList(2500)
	const result23 = getBanknoteList(23)
	const result12 = getBanknoteList(12)

	expect(result2500[0]).toBe(1000)
	expect(result2500[1]).toBe(1000)
	expect(result2500[2]).toBe(500)
	expect(result23[0]).toBe(20)
	expect(result23[1]).toBe(2)
	expect(result23[2]).toBe(1)

	expect(result12[0]).toBe(10)
	expect(result12[1]).toBe(2)
})