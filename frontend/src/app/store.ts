import { articlesReducer } from '../store/slices/articlesSlice';
import { commentsReducer } from '../store/slices/commentsSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: { articlesReducer, commentsReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
