import { Box, Stack, TextField, Typography } from '@mui/material';
import FileInput from '../../components/UI/FileInput/FileInput';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { selectSending } from '../../store/slices/articlesSlice';
import { loadGists, sendArticle } from '../../store/thunks/articlesThunk';
import { CloudUpload } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface Data {
  title: string;
  content: string;
  image: File | null;
}

const ArticleForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const sending = useAppSelector(selectSending);

  const [data, setData] = useState<Data>({
    title: '',
    content: '',
    image: null,
  });

  const [titleError, setTitleError] = useState<string>();
  const [contentError, setContentError] = useState<string>();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.name === 'title') {
      setTitleError(undefined);
    }

    if (e.target.name === 'content') {
      setContentError(undefined);
    }

    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const handleFileInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setData((data) => ({ ...data, [e.target.name]: file }));
    }
  };

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();

    let exiting = false;

    if (!data.title) {
      setTitleError('Title must be filled out.');

      exiting = true;
    }

    if (!data.content) {
      setContentError('Content must be filled out.');

      exiting = true;
    }

    if (exiting) {
      return;
    }

    await dispatch(
      sendArticle({
        title: data.title,
        content: data.content,
        image: data.image ? data.image : null,
      })
    );

    setData((data) => ({ ...data, message: '', author: '' }));

    await dispatch(loadGists());

    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap={2}>
        <TextField fullWidth label='Title' name='title' required value={data.title} onChange={handleChange} error={!!titleError} helperText={titleError} />
        <TextField
          fullWidth
          label='Content'
          name='content'
          required
          multiline
          rows={6}
          value={data.content}
          onChange={handleChange}
          error={!!contentError}
          helperText={contentError}
        />
        <FileInput fullWidth label='Image' name='image' buttonText='Upload' buttonProps={{ startIcon: <CloudUpload /> }} onChange={handleFileInputChange} />
        <LoadingButton type='submit' loading={sending}>
          Send
        </LoadingButton>
      </Stack>
    </form>
  );
};

export default ArticleForm;
