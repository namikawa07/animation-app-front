import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { TodoState, TodoItem } from '../types'
import TodosApiService, { PostTodoItem } from '../lib/api/todosApi'
import { RootState } from '../types'

export const fetchAllTodos = createAsyncThunk<{ todos: TodoItem[] }>(
  'todos/fetchAllTodos',
  async () => {
    const data = await TodosApiService.getAll()
    return { todos: data }
  }
)

/*
export const postTodo = createAsyncThunk<
  { id: number; content: string },
  string,
  {
    state: RootState
  }
>('todos/postTodo', async (content, thunkAPI) => {
  const { todos } = thunkAPI.getState()
  const todo: PostTodoItem = {
    content: content,
    completed: false,
  }
  await TodosApiService.post(todo)
  return {
    id: todos.todoItems.length + 1,
    content: todo.content,
  }
})
*/
/*
export const patchTodo = createAsyncThunk<{ id: number }, TodoItem>(
  // type(第1引数)
  'todos/patchTodo',
  // payloadCreator(第2引数)
  async (todo) => {
    console.log(`*****patch`)
    const data = await TodosApiService.toggle(todo)
    // TodosApiServiceを実行して完了したら下のbuilder.addCase(patchTodo.fulfilled, (state, action)にid: todo.isを渡す
    return {
      id: todo.id,
      response: data,
    }
  }
  // Options(第3引数、任意)
)
*/

const initialState: TodoState = {
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
    // pending: 非同期実行中、または実行待ち
    // fulfilled: 実行が正常完了（エラーなし）
    // rejected: 実行で異常発生
    builder.addCase(fetchAllTodos.fulfilled, (state, action) => {
      state.todoItems = action.payload.todos
      state.loading = true
    })
    /*
    builder.addCase(postTodo.fulfilled, (state, action) => {
      state.todoItems = [
        ...state.todoItems,
        {
          id: action.payload.id,
          content: action.payload.content,
          completed: false,
        },
      ]
    })
    */
    // builder.addCase(アクション：createAsyncThunkで定義したメソッド.createAsyncThunkのステータス, reducerの処理);
    /*
    builder.addCase(patchTodo.fulfilled, (state, action) => {
      const id = action.payload.id
      const todoItems = state.todoItems.map((todo: any, index: any) => {
        if (index === id - 1) {
          return Object.assign({}, todo, { completed: !todo.completed })
        } else {
          return todo
        }
      })
      state.todoItems = todoItems
    })
    */
    /*
    builder.addCase(patchTodo.rejected, (state) => {
      state.loading = true
      state.error.status = true
      state.error.message = 'can not fetched data from todo api(unofficial)'
      console.log(`================= api error`)
    })
    */
  },
})

export default todosSlice.reducer
