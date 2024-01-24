import { useDispatch } from 'react-redux'
import { AppDispatch } from 'app/reducers/store'

export const useAppDispatch: () => AppDispatch = useDispatch

// export const useAppDispatch = useDispatch<AppDispatch>
