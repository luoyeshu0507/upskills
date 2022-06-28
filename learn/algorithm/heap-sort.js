function swap(arr, i1, i2) {
  if (i1 === i2) return;
  arr[i1] = arr[i1] ^ arr[i2];
  arr[i2] = arr[i1] ^ arr[i2];
  arr[i1] = arr[i1] ^ arr[i2];
}

function heapInsert(arr, index) {
  while (arr[index] > arr[index - 1 >> 1]) {
    swap(arr, index, index - 1 >> 1);
    index = index - 1 >> 1;
  }
}

function heapify(arr, index, heapSize) {
  let left = index * 2 + 1;
  while (left < heapSize) {
    let largestIndex = left + 1 < heapSize && arr[left + 1] > arr[left]? left + 1 : left;
    largestIndex = arr[index] > arr[largestIndex] ? index : largestIndex;
    if (largestIndex === index) return;
    swap(arr, index, largestIndex);
    index = largestIndex;
    left = largestIndex * 2 + 1;
  }
}

function heapSort(arr) {
  const len = arr.length;
  if (!len) return;
  for (let i = 0; i < len; i++) {
    heapInsert(arr, i);
  }

  let heapSize = len;
  swap(arr, 0, --heapSize);
  while (heapSize !== 0) {
    heapify(arr, 0, heapSize);
    swap(arr, 0, --heapSize);
  }
}

let arr = [0,5,7,2,8,9,0];
heapSort(arr);
console.log(arr);



