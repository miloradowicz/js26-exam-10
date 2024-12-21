import { Box, Button, Card, CardActions, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import { FC, memo } from 'react';
import { baseURL } from '../../../constants';
import { Link as RouterLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { deleteArticle, loadGists } from '../../../store/thunks/articlesThunk';
import { LoadingButton } from '@mui/lab';
import { selectDeleting } from '../../../store/slices/articlesSlice';
import img404 from '../../../assets/images/404.svg';

interface Props {
  id: number;
  title: string;
  image_url: string | null;
  publicized_at: string;
}

const ArticleListItem: FC<Props> = ({ id, title, image_url, publicized_at }) => {
  const dispatch = useAppDispatch();

  const deleting = useAppSelector(selectDeleting);

  const handleDelete = async () => {
    await dispatch(deleteArticle(id));
    await dispatch(loadGists());
  };

  return (
    <Card variant='outlined' sx={{ display: 'flex' }}>
      <CardMedia
        sx={{ minHeight: 150, maxHeight: '100%', minWidth: 250, backgroundSize: 'contain' }}
        image={image_url ? new URL(image_url, new URL('images/', baseURL)).href : img404}
      />
      <Stack flex={1}>
        <CardContent>
          <Typography gutterBottom variant='h6' component='div'>
            {title}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>{publicized_at}</Typography>
          <CardActions>
            <Button component={RouterLink} to={`articles/${id}`}>
              Read full article
            </Button>
            <LoadingButton loading={deleting.includes(id)} onClick={handleDelete}>
              Delete
            </LoadingButton>
          </CardActions>
        </Box>
      </Stack>
    </Card>
  );
};

export default memo(ArticleListItem, (prev, next) => prev.id === next.id);
