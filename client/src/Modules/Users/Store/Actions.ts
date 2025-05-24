import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { initialState } from "./MutationTypes"
import { AppDispatch } from './Stores'
import api from '@/Services/Api'
// import api from '../../../Services/Api'


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
    
    console.log('apiLibrary: ', api);
    const res = await api.get('/api/users')
    dispatch(setUsers(res.data))
    return res.data
  } catch (err: any) {
    dispatch(setError(err.message))
  }
}

export const { setLoading, setUsers, setError } = userSlice.actions
export default userSlice.reducer
