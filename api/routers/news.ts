import express from 'express';
import mysqlDb from '../mysqlDb';
import { Article, ArticleBody } from '../types';
import { ResultSetHeader } from 'mysql2/promise';
import { imageUpload } from '../multer';

const router = express.Router();

router.get('/', async (req, res) => {
  const connection = mysqlDb.getConnection();
  const [result] = await connection.query('SELECT id, title, image_url, publicized_at FROM articles');
  const data = result as Article[];

  res.send(data);
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(404).send({ error: 'Invalid id.' });
    return;
  }

  const connection = mysqlDb.getConnection();
  const [result] = await connection.query('SELECT * FROM articles WHERE id = ?', [id]);
  const data = result as Article[];

  if (data.length === 0) {
    res.status(404).send({ error: 'Article not found.' });
  } else {
    res.send(data[0]);
  }
});

router.post('/', imageUpload.single('image'), async (req, res) => {
  if (!req.body.title || !req.body.content) {
    res.status(400).send({ error: 'Title or content missing.' });
    return;
  }

  const body: ArticleBody = {
    title: req.body.title,
    content: req.body.content,
    image_url: req.file ? req.file.filename : null,
  };

  const connection = mysqlDb.getConnection();
  let [result] = await connection.query('INSERT INTO articles (title, content, image_url) VALUES (?, ?, ?)', [body.title, body.content, body.image_url]);
  [result] = await connection.query('SELECT * FROM articles WHERE id = ?', [(result as ResultSetHeader).insertId]);
  const data = result as Article[];

  if (data.length === 0) {
    res.status(400).send({ error: 'Could not create article.' });
  } else {
    res.send(data[0]);
  }
});

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(404).send({ error: 'Invalid id.' });
    return;
  }

  const connection = mysqlDb.getConnection();
  void (await connection.query('DELETE FROM articles WHERE id = ?', [id]));

  res.send(null);
});

export default router;
