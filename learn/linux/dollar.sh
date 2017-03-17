#!/bin/bash

echo "Current script is: $0."
echo "Parameters length is: $#."
test $# -lt 2 && echo "The length of your parameters is smaller than 2."
echo "Your whole parameters is: $@."
echo "This first parameters is: $1."
echo "This second parameters is: $2."
echo "This third parameters is: $3."
echo "This fourth parameters is: $4."
