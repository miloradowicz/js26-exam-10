import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '../../api';
import { Article, ArticleMutation, ArticleGist, ErrorResponse } from '../../types';
import { RootState } from '../../app/store';
import { clearCurrent } from '../slices/articlesSlice';

export const loadGists = createAsyncThunk('articles/loadGists', async () => {
  const { data, status } = await api.get<ArticleGist[] | ErrorResponse>('news');

  if (status !== 200) {
    throw new Error((data as ErrorResponse).error);
  }

  return data as ArticleGist[];
});

export const loadArticle = createAsyncThunk<Article, number, { state: RootState }>('articles/loadArticle', async (id, thunkAPI) => {
  thunkAPI.dispatch(clearCurrent());

  const { data, status } = await api.get<Article | ErrorResponse>(`news/${id}`);

  if (status !== 200) {
    throw new Error((data as ErrorResponse).error);
  }

  return data as Article;
});

export const sendArticle = createAsyncThunk('articles/sendArticle', async (mutation: ArticleMutation) => {
  if (!mutation.title || !mutation.content) {
    throw new Error('Title and content must be provided.');
  }

  const body = new FormData();
  body.append('title', mutation.title);
  body.append('content', mutation.content);

  if (mutation.image) {
    body.append('image', mutation.image);
  }

  const { data, status } = await api.post<Article | ErrorResponse>('news', body);

  if (status !== 200) {
    throw new Error((data as ErrorResponse).error);
  }

  return data as Article;
});

export const deleteArticle = createAsyncThunk('articles/deleteArticle', async (id: number) => {
  const { data, status } = await api.delete<null | ErrorResponse>(`news/${id}`);

  if (status !== 200) {
    throw new Error((data as ErrorResponse).error);
  }
});
