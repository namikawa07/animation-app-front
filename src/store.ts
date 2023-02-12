import { configureStore } from '@reduxjs/toolkit'
import {
  useSelector as rawUseSelector,
  TypedUseSelectorHook,
} from 'react-redux'

import todosReducer from './slices/todosSlice'
import profileReducer from './slices/profileSlice'

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    profileState: profileReducer
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector
