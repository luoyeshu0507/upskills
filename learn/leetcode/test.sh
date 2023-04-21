#!/bin/bash

current_time=$(date +%s)

# Loop through all running processes
for pid in 84166; do
    # Get start time of process in seconds
    start_time=$(stat -c %Y /proc/$pid)

    # Calculate time difference in seconds
    time_diff=$((current_time - start_time))

    # Check if process has been running for more than an hour (3600 seconds)
    if [[ $time_diff -gt 3600 ]]; then
        # Kill the process
        echo "Killing process $pid $time_diff"
        # kill $pid
    fi
done