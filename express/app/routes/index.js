const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise')

const dbConfig = {
  host: 'db',
  user: 'user',
  password: 'p@ssw0rd',
  database: 'blog_app_local',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

  /**
    * @swagger
    * /:
    *   get:
    *     summary: ブログタイトル一覧取得
    *     responses:
    *       200:
    *         description: A list of blog titles
    *         content:
    *           application/json:
    *             schema:
    *               type: array
    *               items:
    *                 type: object
    *                 properties:
    *                   id:
    *                     type: integer
    *                     description: ブログID
    *                   title:
    *                     type: string
    *                     description: ブログタイトル
    */
router.get('/', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows, fields] = await connection.execute('SELECT * FROM blog_title');

    res.set({ 'Access-Control-Allow-Origin': '*' });
    res.json(rows);

    await connection.end();
  } catch (error) {
    res.status(500).send('データベース接続エラー' + error);
  }
});

  /**
    * @swagger
    * /detail/{id}:
    *   get:
    *     summary: ブログ詳細取得
    *     parameters:
    *       - in: path
    *         name: id
    *         required: true
    *         schema:
    *           type: integer
    *         description: ブログID
    *     responses:
    *       200:
    *         description: ブログ詳細
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 id:
    *                   type: integer
    *                   description: ブログID
    *                 title:
    *                   type: string
    *                   description: ブログタイトル
    */
router.get('/detail/:id', async (req, res) => {
  try {
    const blogId = req.params.id;
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM blog_title WHERE id = ?', [blogId]);

    if (rows.length === 0) {
      throw new Error('指定されたIDのブログが見つかりません');
    }

    res.set({ 'Access-Control-Allow-Origin': '*' });
    res.json(rows[0]);

    await connection.end();
  } catch (error) {
    if (error.message === '指定されたIDのブログが見つかりません') {
      res.status(404).send(error.message);
    } else {
      res.status(500).send('データベース接続エラー' + error);
    }
  }
});

/**
* @swagger
* /create:
*   post:
*     summary: ブログ作成
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               title:
*                 type: string
*                 description: The title of the blog entry
*     responses:
*       200:
*         description: ブログを作成しました
*       500:
*         description: データベース接続エラー
*/
router.post('/create', async (req, res) => {
  try {
    const { title } = req.body;
    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute('INSERT INTO blog_title (title) VALUES (?)', [title || '記事タイトル無し']);
    res.set({ 'Access-Control-Allow-Origin': '*' });
    res.status(200).send('ブログを作成しました');
    await connection.end();
  } catch (error) {
    res.status(500).send('データベース接続エラー' + error);
  }
});

/**
* @swagger
* /update:
*   put:
*     summary: ブログ更新
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               id:
*                 type: integer
*                 description: The blog ID
*               title:
*                 type: string
*                 description: The title of the blog entry
*     responses:
*       200:
*         description: ブログを更新しました
*       500:
*         description: データベース接続エラー
*/
router.put('/update', async (req, res) => {
  try {
    const { id,title } = req.body;
    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute('UPDATE blog_title SET title = ? WHERE id = ?', [title, id]);
    res.set({ 'Access-Control-Allow-Origin': '*' });
    res.status(200).send('ブログを更新しました');
    await connection.end();
  } catch (error) {
    res.status(500).send('データベース接続エラー' + error);
  }
});

/**
* @swagger
* /delete/{id}:
*   delete:
*     summary: ブログ削除
*     parameters:
*       - in: path
*         name: id
*         required: true
*         schema:
*           type: integer
*         description: ブログID
*     responses:
*       200:
*         description: ブログを削除する
*       500:
*         description: データベース接続エラー
*/
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute('DELETE FROM blog_title WHERE id = ?', [id]);
    res.set({ 'Access-Control-Allow-Origin': '*' });
    res.status(200).send('ブログを削除しました');
    await connection.end();
  } catch (error) {
    if (res.status === 404) {
      console.log(result);
    } else {
      res.status(500).send('データベース接続エラー' + error);
    }
  }
});

module.exports = router;