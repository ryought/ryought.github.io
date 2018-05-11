---
title:  "ファイルの変更を検知して動作するスクリプトの書き方ベストプラクティス"
date:   2018-04-29 11:46:10 +0900
categories: markdown
math: false
---

ryought/md2pdf の作成に使用しました

# watchman
## facebook/watchman
各OSごとに違うファイル変更検知のAPIをまとめてくれる。

macosだったら`brew install watchman`

v4.8以上でないと動きません

## 有用なサブコマンド
通常の`watchman`だとサーバーを起動するモードになる。

今回は変更したら処理される(node.jsでいう`node-watch`)スクリプトが作りたいので、上のAPIは少し合わない。

`watchman-make`というコマンドがあって、これが便利
[doc](https://facebook.github.io/watchman/docs/watchman-make.html)

```
$ watchman-make -p 'target.c' --run hoge.sh
```

とかける。

これで作れる

# オプション引数パーサ

getoptを使う

今回は`-w`がついている時だけwatchモードで起動して、なければ普通に一度だけコンパイルするようにしたかった。

