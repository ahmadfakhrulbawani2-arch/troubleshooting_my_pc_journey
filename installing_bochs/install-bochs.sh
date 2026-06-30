#!/bin/bash
set -euo pipefail

# Install dependencies
sudo apt-get install -y \
    nasm \
    build-essential \
    bcc \
    bin86 \
    make \
    libgtk2.0-dev \
    bison \
    g++ \
    libsdl2-dev # you can ignore this, optional

# go to your bochs dirpath
# $1 is absolute path for bochs tar gzip file dir
# $2 is the bochs tar gzip file name

cd $1
tar vxzf $2 # your bochs gzipped file
cd bochs* # your unzip bochs
./configure --enable-debugger --with-sdl --enable-disasm
make
sudo make  install