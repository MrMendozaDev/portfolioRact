import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { initialState } from "./MutationTypes"
import { AppDispatch } from './Stores'
import api from "Services/Api"

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true
      state.error = null
    },
    setUsers: (state, action) => {
      state.users = action.payload
      state.loading = false
    },
    setError: (state, action) => {
      state.error = action.payload
      state.loading = false
    }
  }
})

export const fetchUsers = () => async (dispatch: AppDispatch) => {
  try {
    
    const { status, data } = await api.get('/api/users')
    if (status !== 200) throw new Error;
    dispatch(setUsers(data))
    return data
  } catch (err: any) {
    dispatch(setError(err.message))
  }
}

export const fetchMenusByUsers = () => async (dispatch: AppDispatch) => {
  try {
    
    const { status, data } = await api.get('/api/users')
    if (status !== 200) throw new Error;
    dispatch(setUsers(data))
    return data
  } catch (err: any) {
    dispatch(setError(err.message))
  }
}

export const { setLoading, setUsers, setError } = userSlice.actions
export default userSlice.reducer
