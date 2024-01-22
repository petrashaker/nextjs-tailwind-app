import { configureStore } from "@reduxjs/toolkit";
import RegistrationFormReducer from "../lib/features/registration/registrationFormSlice"

export const makeStore = () => {
  return configureStore({
    reducer: {
      registrationForm: RegistrationFormReducer
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']