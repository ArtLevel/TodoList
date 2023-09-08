const getBanknoteList = (amountOfMoney) => {
	const banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1]
	const result = []
	let i = 0

	while (i < banknotes.length) {
		const countBanknote = Math.floor(amountOfMoney / banknotes[i])

		if (countBanknote >= 1 && amountOfMoney) {
			result.push(banknotes[i])
			amountOfMoney -= banknotes[i]
			i = 0
		} else i++
	}

	return result
}

console.log(getBanknoteList(1000000000000))
