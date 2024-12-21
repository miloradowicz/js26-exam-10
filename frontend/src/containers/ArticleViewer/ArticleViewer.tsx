import { Backdrop, CircularProgress, Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCurrentArticle, selectLoading } from '../../store/slices/articlesSlice';
import { selectLoading as selectCommentsLoading } from '../../store/slices/commentsSlice';
import { loadArticle } from '../../store/thunks/articlesThunk';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import img404 from '../../assets/images/404.svg';
import CommentList from '../../components/CommentList/CommentList';
import CommentForm from '../../components/CommentForm/CommentForm';
import { loadComments } from '../../store/thunks/commentsThunk';
import { baseURL } from '../../constants';

const ArticleViewer = () => {
  const dispatch = useAppDispatch();

  const param = useParams();
  const id = Number(param.id);

  const article = useAppSelector(selectCurrentArticle);
  const loading = useAppSelector(selectLoading);
  const commentsLoading = useAppSelector(selectCommentsLoading);

  useEffect(() => {
    dispatch(loadArticle(id));
    dispatch(loadComments(id));
  }, [dispatch, id]);

  return (
    <>
      <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={loading}>
        <CircularProgress color='inherit' />
      </Backdrop>
      {article && (
        <>
          <Box sx={{ p: 2 }}>
            <Box sx={{ width: '30%' }}>
              <img src={article.image_url ? new URL(article.image_url, new URL('images/', baseURL)).href : img404} alt={article.title} width='100%' />
            </Box>
            <Typography variant='h5'>{article.title}</Typography>
            <Typography>At {dayjs(article.publicized_at).format('DD.MM.YYYY HH:mm')}</Typography>
            <Typography>{article.content}</Typography>
          </Box>
          <Box sx={{ p: 2 }}>
            <Box sx={{ p: 2, borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
              <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 })}
                open={!loading && commentsLoading}
              >
                <CircularProgress color='inherit' />
              </Backdrop>
              <Typography variant='h6'>Comments</Typography>
              <Box sx={{ p: 2 }}>
                <CommentList />
              </Box>
            </Box>
            <Box sx={{ p: 2 }}>
              <Typography variant='h6'>Add comment</Typography>
              <Box sx={{ p: 2 }}>
                <CommentForm article_id={id} />
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default ArticleViewer;
