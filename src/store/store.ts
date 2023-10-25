import { configureStore } from '@reduxjs/toolkit'
import { userApi } from './api/userApi'
import authSlice from './features/authSlice';

const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,

        auth:authSlice
      },
      


      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware),
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;