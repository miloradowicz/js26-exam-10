import { createSlice } from '@reduxjs/toolkit';
import { deleteComment, loadComments, sendComment } from '../thunks/commentsThunk';
import { RootState } from '../../app/store';
import { Comment } from '../../types';

interface State {
  currentComments: Comment[];
  loading: boolean;
  sending: boolean;
  deleting: number[];
  lastError?: {
    message: string;
  };
}

const initialState: State = {
  currentComments: [],
  loading: false,
  sending: false,
  deleting: [],
};

const slice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearCurrent: (state) => {
      state.currentComments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadComments.pending, (state) => {
        state.lastError = undefined;
        state.loading = true;
      })
      .addCase(loadComments.fulfilled, (state, { payload }) => {
        state.currentComments = payload;
        state.loading = false;
      })
      .addCase(loadComments.rejected, (state, { error }) => {
        if (error.message !== undefined) {
          state.lastError = { message: error.message };
        }
        state.loading = false;
      })
      .addCase(sendComment.pending, (state) => {
        state.lastError = undefined;
        state.sending = true;
      })
      .addCase(sendComment.fulfilled, (state) => {
        state.sending = false;
      })
      .addCase(sendComment.rejected, (state, { error }) => {
        if (error.message !== undefined) {
          state.lastError = { message: error.message };
        }
        state.sending = false;
      })
      .addCase(deleteComment.pending, (state, { meta: { arg } }) => {
        state.lastError = undefined;

        if (!state.deleting.includes(arg)) {
          state.deleting.push(arg);
        }
      })
      .addCase(deleteComment.fulfilled, (state, { meta: { arg } }) => {
        const i = state.deleting.findIndex((x) => x === arg);

        if (i >= 0) {
          state.deleting.splice(i);
        }
      })
      .addCase(deleteComment.rejected, (state, { error, meta: { arg } }) => {
        if (error.message !== undefined) {
          state.lastError = { message: error.message };
        }

        const i = state.deleting.findIndex((x) => x === arg);

        if (i >= 0) {
          state.deleting.splice(i);
        }
      });
  },
});

export const commentsReducer = slice.reducer;

export const { clearCurrent } = slice.actions;

export const selectCurrentComments = (state: RootState) => state.commentsReducer.currentComments;
export const selectLoading = (state: RootState) => state.commentsReducer.loading;
export const selectSending = (state: RootState) => state.commentsReducer.sending;
export const selectDeleting = (state: RootState) => state.commentsReducer.deleting;
export const selectLastError = (state: RootState) => state.commentsReducer.lastError;
