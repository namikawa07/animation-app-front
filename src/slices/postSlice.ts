import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  ProfileStateType,
  FirebaseAuthPasswordWithEmailType,
  ProfileType,
} from '../types'
import { toast } from 'react-toastify'
import postApiService from '../lib/api/postApi'

// ------------------- createAsyncThunk -------------------
export const createPost = createAsyncThunk<{ post: any }, any>(
  'post/createPost',
  async (post) => {
    console.log(`*****ここまできました！ ${post}`)
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
    thumbnail_url: '',
    description: '',
    status: null,
    user: {},
  },
  loading: false,
  error: {
    status: false,
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
      state.post = action.payload.post

      toast.success('投稿しました！')
    })
    builder.addCase(createPost.rejected, (state) => {
      // apiの通信がうまくいかなかった時のerror
      state.loading = true
      state.error.status = true

      console.log(`========================= Error create post`)
    })
  },
})
// ------------------------ Slice -------------------------

export default postSlice.reducer
