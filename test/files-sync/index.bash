#!/bin/bash
cur="./cur"
new="./next"

list=`ls $cur`;

for value in ${list[*]}
do
  echo "cp $new/$value to $cur/$value"
  cp $new/$value $cur/$value
done