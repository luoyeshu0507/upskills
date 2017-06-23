
#!bin/sh
for file in ./*.html
do
  if test -f $file
  then
      echo $file 是文件
      ls
  fi
done
