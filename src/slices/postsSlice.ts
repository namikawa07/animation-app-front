import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import postApiService from '../lib/api/postApi'

// ------------------- createAsyncThunk -------------------
export const fetchAllPosts = createAsyncThunk<any>(
  'post/fetchAllPosts',
  async () => {
    const response = await postApiService.fetchAll()
    console.log(response.data)
    return { posts: response.data }
  }
)
// ------------------- createAsyncThunk -------------------

// --------------------- initialState ---------------------
const initialState: any = {
  posts: [],
  loading: false,
  error: {
    status: null,
    message: null,
  },
}
// --------------------- initialState ---------------------

// ------------------------ Slice -------------------------
const postsSlice = createSlice({
  name: 'postsState',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
      state.loading = true
      state.error.status = false
      state.posts = action.payload.posts
    })
    builder.addCase(fetchAllPosts.rejected, (state) => {
      // apiの通信がうまくいかなかった時のerror
      state.loading = true
      state.error.status = true

      console.log(`========================= Error create post`)
    })
    builder.addCase(fetchAllPosts.pending, (state) => {
      state.loading = false
      state.error.status = null
      state.error.message = null
    })
  },
})
// ------------------------ Slice -------------------------

export default postsSlice.reducer
