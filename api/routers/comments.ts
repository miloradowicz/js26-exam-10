import express from 'express';
import { ResultSetHeader } from 'mysql2/promise';

import { Comment, CommentBody } from '../types';
import mysqlDb from '../mysqlDb';

const router = express.Router();

router.get('/', async (req, res) => {
  const connection = mysqlDb.getConnection();
  let data: Comment[];

  if (req.query.news_id !== undefined) {
    const id = Number(req.query.news_id);

    if (Number.isNaN(id)) {
      res.status(404).send({ error: 'Invalid news_id.' });
      return;
    }

    const [result] = await connection.query('SELECT * FROM comments WHERE article_id = ?', [id]);
    data = result as Comment[];
  } else {
    const [result] = await connection.query('SELECT * FROM comments');
    data = result as Comment[];
  }

  res.send(data);
});

router.post('/', async (req, res) => {
  if (!req.body.article_id || !req.body.content) {
    res.status(400).send({ error: 'article_id or content missing.' });
    return;
  }

  const body: CommentBody = {
    article_id: req.body.article_id,
    author: req.body.author ?? null,
    content: req.body.content,
  };

  try {
    const connection = mysqlDb.getConnection();
    let [result] = await connection.query('INSERT INTO comments (article_id, author, content) VALUES (?, ?, ?)', [body.article_id, body.author, body.content]);
    [result] = await connection.query('SELECT * FROM comments WHERE id = ?', [(result as ResultSetHeader).insertId]);
    const data = result as Comment[];

    if (data.length === 0) {
      res.status(400).send({ error: 'Could not create comment.' });
    } else {
      res.send(data[0]);
    }
  } catch (e) {
    console.error(e);
    res.status(400).send({ error: 'Invalid article_id.' });
  }
});

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(404).send({ error: 'Invalid id.' });
    return;
  }

  const connection = mysqlDb.getConnection();
  void (await connection.query('DELETE FROM comments WHERE id = ?', [id]));

  res.send(null);
});

export default router;
