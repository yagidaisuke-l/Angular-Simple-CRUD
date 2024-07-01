# Angularアプリのサンプル

## クローン後の初期設定

リポジトリをクローンした後、以下の手順に従って環境を設定してください。

### 1. リポジトリのクローン

まず、以下のコマンドを使用してリポジトリをクローンします。

```bash
git clone https://github.com/yagidaisuke-l/Angular-Simple-CRUD.git
cd Angular-Simple-CRUD
```

### 2. 依存関係のインストール

プロジェクトが依存するパッケージをインストールします。

```bash
・Angular
docker-compose exec node bash
cd angular-simple-crud
npm install

```

### 3. 環境設定ファイルの設定

環境に応じた設定ファイルを作成または編集します。

```bash

```

エディタで `.env` ファイルを開き、必要な設定を行ってください。

### 4. データベースのセットアップ

データベースをセットアップし、初期データをロードします。

```bash

```

### 5. 開発サーバーの起動

開発サーバーを起動して、アプリケーションが正しく動作することを確認します。

```bash
docker-compose exec node bash
cd angular-simple-crud
ng serve --host 0.0.0.0
```
