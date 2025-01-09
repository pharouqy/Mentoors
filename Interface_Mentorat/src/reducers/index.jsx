import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../reducers/authReducer";
import signupReducer from "../reducers/signupReducer";
import userReducers from "../reducers/userReducers";

// Combinaison des réducteurs
const rootReducer = combineReducers({
  auth: authReducer,
  signup: signupReducer,
  profil: userReducers,
});

// Configuration du store avec les réducteurs
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Désactiver la vérification des valeurs non sérialisables
    }),
});

export { store };
