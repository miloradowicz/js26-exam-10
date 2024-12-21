import { Backdrop, Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import ArticleList from '../../components/ArticleList/ArticleList';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect } from 'react';
import { loadGists } from '../../store/thunks/articlesThunk';
import { selectLoading } from '../../store/slices/articlesSlice';

const Gists = () => {
  const dispatch = useAppDispatch();

  const loading = useAppSelector(selectLoading);

  useEffect(() => {
    dispatch(loadGists());
  }, [dispatch]);

  return (
    <>
      <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={loading}>
        <CircularProgress color='inherit' />
      </Backdrop>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Typography variant='h5'>Articles</Typography>
        <Button variant='contained' component={Link} to='/articles/new'>
          Add article
        </Button>
      </Stack>
      <Box sx={{ p: 2 }}>
        <ArticleList />
      </Box>
    </>
  );
};

export default Gists;
