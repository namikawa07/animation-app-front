import axios, { AxiosInstance } from 'axios'
import { auth } from '../../firebase'

const client: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  responseType: 'json',
})

client.interceptors.request.use(async (request) => {
  const credential = await getCredential()
  let idToken = null
  if (credential) idToken = await getIdToken(credential)
  if (idToken) request.headers.Authorization = `Bearer ${idToken}`

  return request
})

const getCredential = () => {
  return new Promise((resolve) => {
    auth.onAuthStateChanged((user) => {
      return resolve(user)
    })
  })
}

const getIdToken = (credential: any) => {
  return new Promise((resolve) => {
    return resolve(credential.getIdToken())
  })
}

export default client
