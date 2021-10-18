a="hello";
b="";

if [ "$a" == "hello" ]; then
  echo "a";
  b="xx";
fi

echo $b;