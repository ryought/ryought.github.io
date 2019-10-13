---
title:  "Jetson TX2上で動かすROSパッケージをAWS EC2上で高速並列コンパイルした話"
date:   2019-04-20 11:46:10 +0900
categories: ROS AWS jetson
math: false
---

Jetson TX2上はCPUの非力さのためにコンパイルが遅い
AWSのARMインスタンス上でROSのパッケージをコンパイルして送り込んで動かすパイプラインを作った時のメモ

# 背景

# AWSのARMインスタンスについて
https://aws.amazon.com/jp/blogs/news/new-ec2-instances-a1-powered-by-arm-based-aws-graviton-processors/

2018年11月ごろ、AWSのEC2にARMベースのA1インスタンスが追加されました。ARMベースのAWS Gravitonプロセッサという独自開発のものを使っているらしい。ARMの多CPUマシンが気軽に手に入る！

金はあるのでとことん早くしたかったため、16 CPUs / RAM 32GB の a1.4xlarge に課金。

上の記事にも書いてありますが、`uname`は`aarch64`で、Jetson Tx2と同じ

# セットアップ
ubuntu 16.04の素のイメージを利用。
普通にROS kineticをインストール

今回コンパイルしたかったパッケージはこちら：[github](www.google.com)

OUXT PolarisというチームでMaritime RobotX Challenge 2018に参加した時の船体の制御ソフトウェア群です。
このボートの計算資源はJetson TX2 3台で動いていました。
しかしパッケージの肥大化のため、Jetson上でのコンパイルに10分かかるという始末！大会当日の急な改修の度に10分かかっていてはしょうがないということで、この話が出た、というのが本当のきっかけです。


# コンパイル

`make -j 16`
catkin_wsを使っている場合は`catkin_make -j 16`で実行


