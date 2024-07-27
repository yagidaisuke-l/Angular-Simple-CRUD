const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const express = require('express');
const cors = require('cors'); // 追加
const app = express();


const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog API',
      version: '1.0.0',
    },
  },
  apis: ['./app/routes/*.js'], // ドキュメント化したいAPIのファイルパスを指定
};
const specs = swaggerJsdoc(options);

app.use(cors());
app.use(express.json());

const server = app.listen(8000, function () {
  console.log('🚀 アプリが起動しました。ポート:' + server.address().port);
});



// ルーティングファイルを読み込む
const routes = require('./app/routes/index');

// ルーティングを設定
app.use('/', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

