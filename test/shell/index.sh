#!bash
ls
a=1
echo ${a}
a=`ls | grep -o index`
echo ${a}

if [ -z a ];then
echo 'hello'
fi