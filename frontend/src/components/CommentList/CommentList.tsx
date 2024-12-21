import { Stack } from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import CommentListItem from './CommentListItem/CommentListItem';
import { selectCurrentComments } from '../../store/slices/commentsSlice';

const CommentList = () => {
  const comments = useAppSelector(selectCurrentComments);

  return (
    <Stack gap={1}>
      {comments.map((x) => (
        <CommentListItem key={x.id} id={x.id} article_id={x.article_id} author={x.author} content={x.content} />
      ))}
    </Stack>
  );
};

export default CommentList;
