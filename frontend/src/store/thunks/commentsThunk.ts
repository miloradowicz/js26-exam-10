import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '../../api';
import { Comment, CommentBody, ErrorResponse } from '../../types';

export const loadComments = createAsyncThunk('comments/loadComments', async (article_id: number) => {
  const { data, status } = await api.get<Comment[] | ErrorResponse>(`comments?news_id=${article_id}`);

  if (status !== 200) {
    throw new Error((data as ErrorResponse).error);
  }

  return data as Comment[];
});

export const sendComment = createAsyncThunk('comments/sendComment', async (body: CommentBody) => {
  if (!body.article_id || !body.content) {
    throw new Error('article_id and content must be provided.');
  }

  const { data, status } = await api.post<Comment | ErrorResponse>('comments', body);

  if (status !== 200) {
    throw new Error((data as ErrorResponse).error);
  }

  return data as Comment;
});

export const deleteComment = createAsyncThunk('comments/deleteComment', async (id: number) => {
  const { data, status } = await api.delete<null | ErrorResponse>(`comments/${id}`);

  if (status !== 200) {
    throw new Error((data as ErrorResponse).error);
  }
});
