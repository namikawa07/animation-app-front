import client from './client'
import { TodoItem } from '../../types'

export interface PostTodoItem {
  content: string
  completed: boolean
}

class TodosApiService {
  static async getAll() {
    console.log(`********Aaa getAll`)
    const response = await client.get(`users`).catch((error: any) => {
      throw new Error(error.message)
    })
    console.log(`******response ${JSON.stringify(response.data)}`)
    return response.data
  }
  /*
  static async post(todo: PostTodoItem) {
    await client.post(`todos`, todo).catch((error: any) => {
      throw new Error(error.message)
    })
  }
  static async toggle(todo: TodoItem) {
    const toggledTodo = Object.assign({}, todo, { completed: !todo.completed })
    await this.patch(toggledTodo).catch((error) => {
      throw new Error(error.message)
    })
  }
  static async patch(todo: TodoItem) {
    await client.patch(`todos/${todo.id}`, todo).catch((error: any) => {
      throw new Error(error.message)
    })
  }
  static async delete(todo: TodoItem) {
    await client
      .delete(`todos/${todo.id}`, { data: todo })
      .catch((error: any) => {
        throw new Error(error.message)
      })
  }
  */
}
export default TodosApiService
