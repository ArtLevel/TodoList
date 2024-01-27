import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { BaseResponseType } from 'common/types'

type Params = {
	addItem: (title: string) => any
}

export const useAddItemForm = ({ addItem }: Params) => {
	let [title, setTitle] = useState('')
	let [error, setError] = useState<string | null>(null)

	const addItemHandler = () => {
		if (title.trim() !== '') {
			addItem(title)
				.then((res: any) => {
					setTitle('')
				})
				.catch((err: BaseResponseType) => {
					if (err?.resultCode) {
						setError(err.messages[0])
					}
				})
		} else {
			setError('Title is required')
		}
	}

	const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}

	const keyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (error !== null) {
			setError(null)
		}
		if (e.charCode === 13) {
			addItemHandler()
		}
	}

	return {
		error,
		title,
		changeHandler,
		keyPressHandler,
		addItemHandler
	}
}
