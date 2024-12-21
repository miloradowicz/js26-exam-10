import express from 'express';

import config from './config';
import mysqlDb from './mysqlDb';
import newsRouter from './routers/news';
import commentsRouter from './routers/comments';

const app = express();
const port = config.express.port;

app.use(express.json());
app.use(express.static(config.publicPath));

app.use('/news', newsRouter);
app.use('/comments', commentsRouter);

(async () => {
  await mysqlDb.init();

  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}/`);
  });
})();
