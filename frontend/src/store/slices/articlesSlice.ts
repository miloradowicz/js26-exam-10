import { createSlice } from '@reduxjs/toolkit';
import { loadArticle, loadGists, sendArticle } from '../thunks/articlesThunk';
import { RootState } from '../../app/store';
import { Article, ArticleGist } from '../../types';

interface State {
  gists: ArticleGist[];
  currentArticle?: Article;
  loading: boolean;
  sending: boolean;
  lastError?: {
    message: string;
  };
}

const initialState: State = {
  gists: [],
  loading: false,
  sending: false,
};

const slice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadGists.pending, (state) => {
        state.lastError = undefined;
        state.loading = true;
      })
      .addCase(loadGists.fulfilled, (state, { payload }) => {
        state.gists = payload;
        state.loading = false;
      })
      .addCase(loadGists.rejected, (state, { error }) => {
        if (error.message !== undefined) {
          state.lastError = { message: error.message };
        }
        state.loading = false;
      })
      .addCase(loadArticle.pending, (state) => {
        state.lastError = undefined;
        state.loading = true;
      })
      .addCase(loadArticle.fulfilled, (state, { payload }) => {
        state.currentArticle = payload;
        state.loading = false;
      })
      .addCase(loadArticle.rejected, (state, { error }) => {
        if (error.message !== undefined) {
          state.lastError = { message: error.message };
        }
        state.loading = false;
      })
      .addCase(sendArticle.pending, (state) => {
        state.lastError = undefined;
        state.sending = true;
      })
      .addCase(sendArticle.fulfilled, (state) => {
        state.sending = false;
      })
      .addCase(sendArticle.rejected, (state, { error }) => {
        if (error.message !== undefined) {
          state.lastError = { message: error.message };
        }
        state.sending = false;
      });
  },
});

export const articlesReducer = slice.reducer;

export const selectGists = (state: RootState) => state.articlesReducer.gists;
export const selectCurrentArticle = (state: RootState) => state.articlesReducer.currentArticle;
export const selectLoading = (state: RootState) => state.articlesReducer.loading;
export const selectSending = (state: RootState) => state.articlesReducer.sending;
export const selectLastError = (state: RootState) => state.articlesReducer.lastError;
