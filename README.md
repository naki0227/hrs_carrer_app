# キャリアバイト｜HTMLモック

アルバイトで稼ぎながら、社員業務も経験できる「キャリアバイト」の**発表用コンセプトデモ**です。

## 動かし方

[`index.html`](./index.html) をダウンロードしてブラウザで開くだけです。ライブラリの導入・ビルド・サーバーは不要です。

- 学生画面：架空の求人検索、仕事の詳細、保存、応募のデモ
- 企業画面：週の現場業務と社員業務の配分を設定した募集案のプレビュー

※架空データのみ。応募内容は外部へ送信されません。HRソリューションズ公式サービスではありません。

## 大切な仕様

社員業務も有給、担当者・実務課題・振り返りのある募集を想定します。現場2日・社員業務1日は例で、企業に合わせて変更できます。

※ 検証用の単一HTMLのため継続運用CIは未整備です。本格MVPに移行する際はセキュリティ・アクセシビリティ・テスト・CIを設計します。

## Cloudflare Pages で公開する

このリポジトリはルートに `index.html` がある、ビルド不要の静的サイトです。

1. [Cloudflare Dashboard の Workers & Pages](https://dash.cloudflare.com/?to=/:account/workers-and-pages) で「Create application」→「Pages」→「Connect to Git」（または「Import an existing Git repository」）を選択します。
2. GitHubを認可し、リポジトリ `naki0227/hrs_carrer_app` を選択します。
3. 次の設定でデプロイします。

| 項目 | 設定 |
| --- | --- |
| Framework preset | None（なし） |
| Production branch | `main` |
| Build command | 空欄（求められれば `exit 0`） |
| Build output directory | `.`（リポジトリ直下） |
| Root directory | `/`（デフォルト） |
| Environment variables | 不要 |

成功するとCloudflareが `*.pages.dev` URLを発行します。以後、`main` へのPushで自動更新されます。

**注意：** GitHubとCloudflareのアカウント連携・初回プロジェクト作成は、Cloudflareにログインした利用者自身の操作が必要です。デモにはダミー求人しかなく、応募の外部送信も行いません。

- [Cloudflare公式：静的HTML](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/)
- [Cloudflare公式：GitHub連携](https://developers.cloudflare.com/pages/get-started/git-integration/)
