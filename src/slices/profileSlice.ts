import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  ProfileStateType,
  FirebaseAuthPasswordWithEmailType,
  ProfileType,
} from '../types'
import { toast } from 'react-toastify'
import AuthApiService from '../lib/api/authApi'
import ProfileApiService from '../lib/api/profileApi'

// ------------------- createAsyncThunk -------------------
export const signUpUser = createAsyncThunk<
  { myProfile: ProfileType },
  FirebaseAuthPasswordWithEmailType
>('profile/signUpUser', async (firebaseAuthParams) => {
  const response = await AuthApiService.authWithFirebase(firebaseAuthParams)
  return { myProfile: response.data }
})

export const SignInUser = createAsyncThunk<
  { myProfile: ProfileType },
  FirebaseAuthPasswordWithEmailType
>('profile/SignInUser', async (firebaseAuthParams) => {
  const response = await AuthApiService.authWithFirebase(firebaseAuthParams)
  return { myProfile: response.data }
})

export const fetchMyProfile = createAsyncThunk<{ myProfile: ProfileType }>(
  'profile/fetchMyProfile',
  async () => {
    const response = await ProfileApiService.fetch()
    return { myProfile: response.data }
  }
)
// ------------------- createAsyncThunk -------------------

// --------------------- initialState ---------------------
const initialState: ProfileStateType = {
  profile: {
    uuid: '',
    status: '',
    name: '',
    self_introduction: '',
    thumbnail_url: '',
    email: '',
  },
  loading: false,
  error: {
    status: false,
    message: null,
  },
}
// --------------------- initialState ---------------------

// ------------------------ Slice -------------------------
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      state.loading = true
      state.profile = action.payload.myProfile

      console.log(
        `========================= Success firebase Auth SignUp By Email`
      )
      toast.success('新規登録しました！')
    })
    builder.addCase(signUpUser.rejected, (state) => {
      // apiの通信がうまくいかなかった時のerror
      state.loading = true
      state.error.status = true

      console.log(
        `========================= Error firebase Auth SignUp By Email`
      )
    })

    builder.addCase(SignInUser.fulfilled, (state, action) => {
      state.loading = true
      state.profile = action.payload.myProfile

      console.log(
        `========================= Success firebase Auth SignIn By Email`
      )
      toast.success('ログインしました！')
    })
    builder.addCase(SignInUser.rejected, (state) => {
      // apiの通信がうまくいかなかった時のerror
      state.loading = true
      state.error.status = true

      console.log(
        `========================= Error firebase Auth SignIn By Email`
      )
    })

    builder.addCase(fetchMyProfile.fulfilled, (state, action) => {
      state.loading = true
      state.profile = action.payload.myProfile

      console.log(`========================= Success fetchMyProfile`)
    })
    builder.addCase(fetchMyProfile.rejected, (state) => {
      // apiの通信がうまくいかなかった時のerror
      state.loading = true
      state.error.status = true

      console.log(`========================= Error fetchMyProfile`)
    })
  },
})
// ------------------------ Slice -------------------------

export default profileSlice.reducer
