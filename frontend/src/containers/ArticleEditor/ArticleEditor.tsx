import { Typography, Box } from '@mui/material';
import ArticleForm from '../../components/ArticleForm/ArticleForm';

const ArticleCreator = () => {
  return (
    <>
      <Typography variant='h5'>New Article</Typography>
      <Box sx={{ px: 6, py: 2 }}>
        <ArticleForm />
      </Box>
    </>
  );
};

export default ArticleCreator;
