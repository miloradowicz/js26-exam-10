import { articlesReducer } from '../store/slices/articlesSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: { articlesReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
