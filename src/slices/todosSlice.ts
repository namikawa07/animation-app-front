import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import TodosApiService, { PostTodoItem } from '../lib/api/todosApi'

export const fetchAllTodos = createAsyncThunk<{ todos: any }>(
  'todos/fetchAllTodos',
  async () => {
    const data = await TodosApiService.getAll()
    return { todos: data }
  }
)

const initialState: any = {
  todoItems: [],
  loading: false,
  error: {
    status: false,
    message: null,
  },
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  // extraReducerで非同期処理のステータスに対するハンドリングを行っている
  extraReducers: (builder) => {
    builder.addCase(fetchAllTodos.fulfilled, (state, action) => {
      state.todoItems = action.payload.todos
      state.loading = true
    })
  },
})

export default todosSlice.reducer
