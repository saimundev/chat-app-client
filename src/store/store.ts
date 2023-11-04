
import { configureStore } from '@reduxjs/toolkit'
import { userApi } from './api/userApi'
import authSlice from './features/authSlice';
import { usersApi } from './api/usersApi';

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,

    auth: authSlice
  },



  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([userApi.middleware, usersApi.middleware]),
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;