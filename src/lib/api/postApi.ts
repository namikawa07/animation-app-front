import client from './client'
import { toast } from 'react-toastify'

class postApiService {
  static async fetchAll() {
    const response = await client.get(`posts`).catch((error) => {
      toast.error(error.response.data.error_message)
      throw new Error(error.response.data)
    })
    return response
  }
  static async create(post: any) {
    const response = await client.post(`posts`, post).catch((error) => {
      toast.error(error.response.data.error_message)
      throw new Error(error.response.data)
    })
    return response
  }
}

export default postApiService
