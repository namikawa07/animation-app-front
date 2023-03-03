import client from './client'

export interface PostTodoItem {
  content: string
  completed: boolean
}

class TodosApiService {
  static async getAll() {
    const response = await client.get(`users`).catch((error: any) => {
      throw new Error(error.message)
    })
    return response.data
  }
}
export default TodosApiService
