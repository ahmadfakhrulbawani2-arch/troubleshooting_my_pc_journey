# Installing Bochs

I want to share quick step by step to install bochs on Linux Ubuntu that I did couple of months ago. I spent almost 2 hours to figuring out the bochs installation problem so you don't have to waste your time like me.

## ℹ️ Intro

Bochs is just virtual machine to run and test the OS. Usually it's used for small and simple OS architecture. Before I begin

```txt
if you find this solution doesn't work, read README.md in this repo root
```

## ⚙️ Step By Step

Prerequisites:
You may want to install all dependencies in this [section](https://github.com/arsitektur-jaringan-komputer/Modul-Sisop/blob/master/Modul4/README-EN.md#tools-installation)

and aslo this:

```bash
sudo apt-get install -y libgtk2.0-dev
sudo apt-get install -y bison
sudo apt-get install -y build-essential # GNU gcc, make, g++
sudo apt-get install -y g++ # sometimes it doesn't include in build-essential
```

Now after you download the Bochs-v-...tar.gz, here's the step by step to install it

1. Unzip the tar gzip

```bash
tar vxzf bochs-.tar.gz # your bochs gzipped file
```

2. Go to bochs unzipped folder and config them

```bash
cd bochs- # your unzip bochs
./configure --enable-debugger --with-sdl --enable-disasm
make
sudo make  install
```

Or you can try my shell script [here](./install-bochs.sh).

It need 2 args, your dir containing gzip bochs and the name of the gzip bochs filename

At this point, two things can happened. It's either success and no error found in your terminal or error happened. If error happened like I did, below is my solution

## Error Handling

Remember to always `sudo apt update` before installing something.

1. **Sdl X11 not found**

![x11-not-found](https://img2018.cnblogs.com/blog/1497264/201910/1497264-20191011144414699-2041382797.png)

**solution:**

1.1. Install SDL

```bash
sudo apt-get install libx11-dev
```

1.2. Reset and try install again with SDL

```bash
cd .. # to parent dir of your bochs dir
rm -rf bochs- # your bochs dir
tar tar vxzf bochs-.tar.gz # your bochs gzipped file
cd bochs- # your unzip bochs
./configure --enable-debugger --with-sdl --enable-disasm
make
sudo make  install
```

2. **LD returned 1 exit status**

![sdl-issue](https://img2018.cnblogs.com/blog/1497264/201910/1497264-20191011145945573-1268728499.png)

**Solution:**

2.1 Repeat the number 1 error

2.2 In config do this instead

```bash
./configure --enable-debugger --enable-disasm --enable-readline LIBS='-lX11'
```

3. **SDL library still not found?**

Unfortunately though, this is the last resort which is hard coding the bochs file.

**Solution:**

3.1. Open your bochs dir in text editor. I highly recommend you to use built-in error detection text editor like VsCode

3.2. Notice how many error you have right? Now search the X11 or SDL keyword using search tool in your text editor

3.3. After you found the error file, open it and notice the error in header file, you need to try one of this combination:

```c
#include <X11/X11.h>
#include <SDL/SDL.h>
// just try querying your GNU library by trying spesific dirname like that
// You know where that library located by holding CTRL/CMD + click to the header name
```

3.4. Remember to change every error files.

3.5. If you find this solution make your problem worse, just restart and try other solution in Google.

More error handling in references section

## References

The source of my solution is from the link below
[Praktikum-Modul-4-Sisop](https://github.com/arsitektur-jaringan-komputer/Modul-Sisop/tree/master/Modul4)

I forgot
[Ubuntu-Bochs-Problem](https://www.cnblogs.com/lqerio/p/11654617.html)
