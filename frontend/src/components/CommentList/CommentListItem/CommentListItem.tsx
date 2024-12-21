import { Card, CardActions, CardContent, Typography } from '@mui/material';
import { FC, memo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { LoadingButton } from '@mui/lab';
import { selectDeleting } from '../../../store/slices/commentsSlice';
import { deleteComment, loadComments } from '../../../store/thunks/commentsThunk';

interface Props {
  id: number;
  article_id: number;
  author: string | null;
  content: string;
}

const CommentListItem: FC<Props> = ({ id, article_id, author, content }) => {
  const dispatch = useAppDispatch();

  const deleting = useAppSelector(selectDeleting);

  const handleDelete = async () => {
    await dispatch(deleteComment(id));
    await dispatch(loadComments(article_id));
  };

  return (
    <Card variant='outlined' sx={{ display: 'flex', flexDirection: 'column' }}>
      <CardContent>
        <Typography gutterBottom component='div'>
          <strong>{author ?? 'Anonymous'}</strong> wrote: {content}
        </Typography>
      </CardContent>
      <CardActions sx={{ alignSelf: 'flex-end' }}>
        <LoadingButton loading={deleting.includes(id)} onClick={handleDelete}>
          Delete
        </LoadingButton>
      </CardActions>
    </Card>
  );
};

export default memo(CommentListItem);
