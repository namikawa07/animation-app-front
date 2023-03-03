import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import postApiService from '../lib/api/postApi'
import { fetchAllPosts } from './postsSlice'
import { PostInitialStateType } from '../../src/types'

// ------------------- createAsyncThunk -------------------
export const createPost = createAsyncThunk<{ post: any }, any>(
  'post/createPost',
  async (post) => {
    const response = await postApiService.create(post)
    return { post: response.data }
  }
)

export const fetch = createAsyncThunk<{ post: any }, any>(
  'post/fetch',
  async (postUuid: string) => {
    const response = await postApiService.fetch(postUuid)
    return { post: response.data }
  }
)

// ------------------- createAsyncThunk -------------------

// --------------------- initialState ---------------------
const initialState: PostInitialStateType = {
  post: {
    id: 0,
    uuid: null,
    title: null,
    contents_type: null,
    description: null,
    status: null,
    user: null,
    video: null,
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

    builder.addCase(fetch.fulfilled, (state, action) => {
      console.log(action.payload.post)
      state.loading = true
      state.error.status = false
      state.post = action.payload.post

    })
    builder.addCase(fetch.rejected, (state) => {
      // apiの通信がうまくいかなかった時のerror
      state.loading = true
      state.error.status = true

      console.log(`========================= Error create post`)
    })
    builder.addCase(fetch.pending, (state) => {
      state.loading = false
      state.error.status = null
      state.error.message = null
    })
  },
})
// ------------------------ Slice -------------------------

export default postSlice.reducer
