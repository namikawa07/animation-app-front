import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import postApiService from '../lib/api/postApi'
import { fetchAllPosts } from './postsSlice'

// ------------------- createAsyncThunk -------------------
export const createPost = createAsyncThunk<{ post: any }, any>(
  'post/createPost',
  async (post) => {
    const response = await postApiService.create(post)
    return { post: response.data }
  }
)

// ------------------- createAsyncThunk -------------------

// --------------------- initialState ---------------------
const initialState: any = {
  post: {
    type: '',
    url: '',
    title: '',
    description: '',
    status: null,
    user: {},
    hash_tags: []
  },
  loading: false,
  error: {
    status: null,
    message: null,
  },
}
// --------------------- initialState ---------------------

// ------------------------ Slice -------------------------
const postSlice = createSlice({
  name: 'postState',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.loading = true
      state.error.status = false
      state.post = action.payload.post

      if (state.post.status === 'publish') toast.success('投稿しました！')
      if (state.post.status === 'draft') toast.success('下書きを保存しました！')

      fetchAllPosts()
    })
    builder.addCase(createPost.rejected, (state) => {
      // apiの通信がうまくいかなかった時のerror
      state.loading = true
      state.error.status = true

      console.log(`========================= Error create post`)
    })
    builder.addCase(createPost.pending, (state) => {
      state.loading = false
      state.error.status = null
      state.error.message = null
    })
  },
})
// ------------------------ Slice -------------------------

export default postSlice.reducer
