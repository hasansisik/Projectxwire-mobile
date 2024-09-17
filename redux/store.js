import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { companyReducer } from "./reducers/companyReducer";
import { userReducer } from "./reducers/userReducer";
import { siteReducer } from "./reducers/siteReducer";
import { projectReducer } from "./reducers/projectReducer";
import { planReducer } from "./reducers/planReducer";
import { taskReducer } from "./reducers/taskReducer";
import { formReducer } from "./reducers/formReducer";

// Redux-Persist
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["user", "company", "sites", "projects", "plans", "tasks", "forms"],
};

const rootReducer = combineReducers({
  company: companyReducer,
  user: userReducer,
  sites: siteReducer,
  projects: projectReducer,
  plans: planReducer,
  tasks: taskReducer,
  forms: formReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
