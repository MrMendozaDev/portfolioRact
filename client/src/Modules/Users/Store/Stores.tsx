import { configureStore } from '@reduxjs/toolkit'
import Users from './Actions'

export const store = configureStore({
  reducer: {
    user: Users
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch