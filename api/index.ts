import express from 'express';
import config from './config';
import mysqlDb from './mysqlDb';

const app = express();
const port = config.express.port;

app.use(express.json());
app.use(express.static(config.publicPath));

(async () => {
  await mysqlDb.init();

  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}/`);
  });
})();
