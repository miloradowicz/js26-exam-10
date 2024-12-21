import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ChangeEventHandler, FC, FormEventHandler, useState } from 'react';
import { selectSending } from '../../store/slices/commentsSlice';
import { loadComments, sendComment } from '../../store/thunks/commentsThunk';

interface Data {
  author: string;
  content: string;
}

interface Props {
  article_id: number;
}

const CommentForm: FC<Props> = ({ article_id }) => {
  const dispatch = useAppDispatch();

  const sending = useAppSelector(selectSending);

  const [data, setData] = useState<Data>({
    author: '',
    content: '',
  });

  const [contentError, setContentError] = useState<string>();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.name === 'content') {
      setContentError(undefined);
    }

    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    if (!data.content) {
      setContentError('Content must be filled out.');
      return;
    }

    await dispatch(
      sendComment({
        article_id: article_id,
        author: data.author ? data.author : null,
        content: data.content,
      })
    );

    setData((data) => ({ ...data, author: '', content: '' }));

    await dispatch(loadComments(article_id));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap={2}>
        <TextField fullWidth label='Author' name='author' value={data.author} onChange={handleChange} />
        <TextField
          fullWidth
          label='Content'
          name='content'
          required
          multiline
          rows={2}
          value={data.content}
          onChange={handleChange}
          error={!!contentError}
          helperText={contentError}
        />
        <LoadingButton type='submit' loading={sending}>
          Send
        </LoadingButton>
      </Stack>
    </form>
  );
};

export default CommentForm;
