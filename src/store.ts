import { configureStore } from '@reduxjs/toolkit'
import {
  useSelector as rawUseSelector,
  TypedUseSelectorHook,
} from 'react-redux'

import todosReducer from './slices/todosSlice'
import profileReducer from './slices/profileSlice'
import postReducer from './slices/postSlice'
import postsReducer from './slices/postsSlice'
import globalSignupModalReducer from './slices/global/signupModalSlice'

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    profileState: profileReducer,
    postState: postReducer,
    postsState: postsReducer,
    globalSignupModalState: globalSignupModalReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector
