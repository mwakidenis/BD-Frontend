import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cartSlice'
import { FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, persistReducer } from 'redux-persist'
import storage from './storage'




const persistOptions = {
  key: 'cart',
  storage,
}
 
const persistedCartReducer = persistReducer(persistOptions, cartReducer)


export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: persistedCartReducer
    },
    middleware: (getDefaultMiddlewares) => getDefaultMiddlewares({serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },})
  })
}





export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']