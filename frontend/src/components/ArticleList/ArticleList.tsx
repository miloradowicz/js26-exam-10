import { Stack } from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { selectGists } from '../../store/slices/articlesSlice';
import ArticleListItem from './ArticleListItem/ArticleListItem';

const ArticleList = () => {
  const gists = useAppSelector(selectGists);

  return (
    <Stack gap={1}>
      {gists.map((x) => (
        <ArticleListItem id={x.id} title={x.title} image_url={x.image_url} publicized_at={x.publicized_at} />
      ))}
    </Stack>
  );
};

export default ArticleList;
