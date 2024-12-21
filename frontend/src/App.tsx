import { Route, Routes } from 'react-router-dom';
import Header from './components/UI/Header/Header';
import { Container } from '@mui/material';
import Gists from './containers/Gists/Gists';
import ArticleViewer from './containers/ArticleViewer/ArticleViewer';
import ArticleEditor from './containers/ArticleEditor/ArticleEditor';
import Page404 from './containers/Page404/Page404';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { selectLastError as selectArticlesLastError } from './store/slices/articlesSlice';
import { useAppSelector } from './app/hooks';
import { useEffect } from 'react';

function App() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const lastArticlesError = useAppSelector(selectArticlesLastError);

  useEffect(() => {
    closeSnackbar();
    if (lastArticlesError) {
      enqueueSnackbar(lastArticlesError.message, { variant: 'error' });
    }
  }, [lastArticlesError, enqueueSnackbar, closeSnackbar]);

  return (
    <SnackbarProvider autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} maxSnack={1}>
      <Header />
      <Container sx={{ py: 3, px: 2 }}>
        <Routes>
          <Route path='/' element={<Gists />} />
          <Route path='/articles/:id' element={<ArticleViewer />} />
          <Route path='/articles/new' element={<ArticleEditor />} />
          <Route path='*' element={<Page404 />} />
        </Routes>
      </Container>
    </SnackbarProvider>
  );
}

export default App;
