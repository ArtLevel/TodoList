// 1. Функция sum принимает параметром целые положительные
// числа (неопределённое кол-во) и возвращает их сумму (rest).
export const sum = (...nums: number[]): number => nums.reduce((acc, num) => acc + num, 0)

// 2. Функция getTriangleType принимает три параметра:
// длины сторон треугольника.
// Функция должна возвращать:
//  - "10", если треугольник равносторонний,
//  - "01", если треугольник равнобедренный,
//  - "11", если треугольник обычный,
//  - "00", если такого треугольника не существует

export const getTriangleType = (a: number, b: number, c: number): string => a + b < c || a + c < b || b + c < a ? '00' : a === b && a === c ? '10' : a === b || a === c || b === c ? '01' : '11'

// export function getTriangleType(a: number, b: number, c: number): string {
// 	if (a + b < c || a + c < b || b + c < a) return '00'
// 	if (a === b && a === c && b === c) return '10'
// 	if (a === b || a === c || b === c) return '01'
// 	return '11'
// }

// 3. Функция getSum принимает параметром целое число и возвращает
// сумму цифр этого числа

export const getSum = (number: number): number => String(number).split('').reduce((acc, str) => acc + Number(str), 0)

// 4. Функция isEvenIndexSumGreater принимает  параметром массив чисел.
// Если сумма чисел с чётными ИНДЕКСАМИ!!! (0 как чётный индекс) больше
// суммы чисел с нечётными ИНДЕКСАМИ!!!, то функция возвращает true.
// В противном случае - false.

// export const isEvenIndexSumGreater = (arr: number[]): boolean => {
// 	let evenIndexSum = 0
// 	let oddIndexSum = 0
//
// 	arr.forEach((el, i) => i % 2 === 0 ? evenIndexSum += el : oddIndexSum += el)
//
// 	return evenIndexSum > oddIndexSum
// }

export const isEvenIndexSumGreater = (arr: number[]): boolean => arr.filter((el, i) => i % 2 === 0).reduce((acc, num) => acc + num, 0) > arr.filter((el, i) => i % 2 !== 0).reduce((acc, num) => acc + num, 0)

// 5. Функция getSquarePositiveIntegers принимает параметром массив чисел и возвращает новый массив.
// Новый массив состоит из квадратов целых положительных чисел, котрые являются элементами исходгого массива.
// Исходный массив не мутирует.

export const getSquarePositiveIntegers = (array: number[]): number[] => array.filter(el => Number.isInteger(el) && el > 0).map(el => Math.pow(el, 2))

// 6. Функция принимает параметром целое не отрицательное число N и возвращает сумму всех чисел от 0 до N включительно
// Попробуйте реализовать функцию без использования перебирающих методов.

export const sumFirstNumbers = (N: number): number => {
	let result = 0
	for (let i = 0; i <= N; i++) result += i
	return result
}

// ...и "лапку" вверх!!!!

// Д.З.:
// 7. Функция-банкомат принимает параметром целое натуральное число (сумму).
// Возвращает массив с наименьшим количеством купюр, которыми можно выдать эту
// сумму. Доступны банкноты следующих номиналов:
// const banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1].
// Считаем, что количество банкнот каждого номинала не ограничено

export const getBanknoteList = (amountOfMoney: number): number[] => {
	const banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1]
	const result = []
	let i = 0

	while (i < banknotes.length) {
		const countBanknote = Math.floor(amountOfMoney / banknotes[i])

		if (countBanknote >= 1 && amountOfMoney) {
			result.push(banknotes[i])
			amountOfMoney -= banknotes[i]
			i = 0
		} else {
			i++
		}
	}

	return result
}
