import axios from 'axios'

// import { auth } from '../../firebase'

const client = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  responseType: 'json',
})

// client.interceptors.request.use(async (request) => {
// const idToken = await auth.currentUser?.getIdToken()
// if (idToken) request.headers.Authorization = `Bearer ${idToken}`

// console.log(`*******request.headers ${JSON.stringify(request.headers)}`)
// return request
// })

export default client
