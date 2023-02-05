import client from './client'

class ProfileApiService {
  static async fetch() {
    const response = await client.get(`/profiles/user`).catch((error) => {
      throw new Error(error.response.data)
    })
    return response
  }
}

export default ProfileApiService
