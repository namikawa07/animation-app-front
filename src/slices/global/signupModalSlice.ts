import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { GlobalSignupModalType } from '../../types'

// ------------------- createAsyncThunk -------------------
export const openSignupModal = createAsyncThunk(
  'global/openSignupModal',
  () => {
    return { isOpen: true }
  }
)

export const closeSignupModal = createAsyncThunk(
  'global/closeSignupModal',
  () => {
    return { isOpen: false }
  }
)

// ------------------- createAsyncThunk -------------------

// --------------------- initialState ---------------------
const initialState: GlobalSignupModalType = {
  isOpen: false,
  loading: false,
  error: {
    status: null,
    message: null,
  },
}
// --------------------- initialState ---------------------

// ------------------------ Slice -------------------------
const globalSignupModalSlice = createSlice({
  name: 'globalSignupModal',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(openSignupModal.fulfilled, (state, action) => {
      state.loading = true
      state.error.status = false
      state.isOpen = action.payload.isOpen
    })
    builder.addCase(closeSignupModal.fulfilled, (state, action) => {
      state.loading = true
      state.error.status = false
      state.isOpen = action.payload.isOpen
    })
  },
})
// ------------------------ Slice -------------------------

export default globalSignupModalSlice.reducer
