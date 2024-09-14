import { configureStore } from "@reduxjs/toolkit";
import { companyReducer } from "./reducers/companyReducer";
import { userReducer } from "./reducers/userReducer";
import { siteReducer } from "./reducers/siteReducer";
import { projectReducer } from "./reducers/projectReducer";
import { planReducer } from "./reducers/planReducer";
import { taskReducer } from "./reducers/taskReducer";
import { formReducer } from "./reducers/formReducer";

export const store = configureStore({
  reducer: {
    company: companyReducer,
    user: userReducer,
    sites: siteReducer,
    projects: projectReducer,
    plans: planReducer,
    tasks: taskReducer,
    forms: formReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
