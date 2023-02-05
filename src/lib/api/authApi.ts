import client from './client'
import { toast } from 'react-toastify'

class AuthApiService {
  static async authWithFirebase(auth: any) {
    const response = await client
      .post(`/firebase_authentications/auth_with_firebase`, auth)
      .catch((error) => {
        console.log(`******error ${error}`)
        toast.error(error.response.data.error_message)
        throw new Error(error.response.data)
      })
    return response
  }
}

export default AuthApiService
