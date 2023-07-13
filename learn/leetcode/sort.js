// 选择排序
function selectSort(arr) {
    for(let i = 0; i < arr.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        swap(arr, i, minIndex);
    }
    return arr;
}
check(selectSort);

// 快排
function quickSort(arr) {
    function sort(arr, start, end) {
        if (start >= end) return;
        let randomIndex = random(start, end);
        let base = arr[randomIndex];
        swap(arr, randomIndex, end);
        let i = start, j = end;
        while(i < j) {
            while (arr[i] <= base && i < j) {
                i ++;
            }
            arr[j] = arr[i];
            while (arr[j] >= base && i < j) {
                j--;
            }
            arr[i] = arr[j];
        }
        arr[i] = base;
        sort(arr, start, i - 1);
        sort(arr, i + 1, end);
    }
    sort(arr, 0, arr.length - 1);
    return arr;
}
check(quickSort);

// 冒泡排序
function bubbleSort(arr) {
    for(let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                swap(arr, i, j);
            }
        }
    }
    return arr;
}
check(bubbleSort);

// 归并排序
function mergeSort(arr) {
    function sort(arr, l, r) {
        if (l >= r) return;
        const mid = l + ((r - l) >> 1);
        sort(arr, l, mid);
        sort(arr, mid + 1, r);
        merge(arr, l, mid, r);
    }
    function merge(arr, l, mid, r) {
        let temp = [];
        let i = l, j = mid + 1;
        while (i <= mid && j <= r) {
            if (arr[i] <= arr[j]) {
                temp.push(arr[i ++]);
            } else {
                temp.push(arr[j ++]);
            }
        }
        while (i <= mid) {
            temp.push(arr[i++]);
        }
        while (j <= r) {
            temp.push(arr[j++]);
        }
        for (let i = 0; i < temp.length; i ++) {
            arr[l + i] = temp[i];
        }
    }
    sort(arr, 0, arr.length - 1);
    return arr;
}
check(mergeSort);

//堆排序
// 插入：先放入最后，然后循环跟父元素比，大于就交换
function heapInsert(arr, index) {
    if (index === 0) return;
    let parent = (index - 1) >> 1;
    while(index !== 0 && arr[index] > arr[parent]) {
        swap(arr, index, parent);
        index = parent;
        parent = (index - 1) >> 1;
    }
}

// 堆化：循环把给定 index 的元素跟子孩子比较，跟较大并且大于自身的子孩子互换
function heapify(arr, index, heapsize) {
    let left = index * 2 + 1;
    while (left < heapsize) {
        // 两个孩子最大
        let largest = left + 1 < heapsize && arr[left + 1] > arr[left] ? left + 1 : left;
        // 最大的孩子跟自身比
        largest = arr[largest] > arr[index] ? largest : index;
        if (largest !== index) {
            swap(arr, largest, index);
            index = largest;
            left = index * 2 + 1;
        } else {
            left = heapsize;
        }
    }
}

// 堆排序
function heapSort(arr) {
    if (!arr || arr.length < 2) return arr;
    // arr.forEach((item, i) => {
    //    heapInsert(arr, i);
    // });
    for (let i = arr.length - 1; i >= 0; i--) {
        heapify(arr, i, arr.length);
    }
    let heapSize = arr.length;
    swap(arr, 0, -- heapSize);
    while(heapSize > 0) {
        heapify(arr, 0, heapSize);
        swap(arr, 0, -- heapSize);
    }
    return arr;
}
check(heapSort);

// 插入排序
function insertSort(arr) {
    for(let i = 0; i < arr.length; i++) {
        let cur = i;
        while (cur !== 0 && arr[cur] < arr[cur - 1]) {
            swap(arr, cur, cur - 1);
            cur -= 1;
        }
    }
    return arr;
}
check(insertSort);

function swap(arr, i, j) {
    if (i === j) return;
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function random(i, j) {
    return Math.floor(Math.random() * (j - i + 1)) + i;
}

function check(fn) {
    let sample = new Array(10).fill(0);
    sample = sample.map(() => Math.random());
    let sampleCopy = sample.slice(0);
    sample.sort();
    sampleCopy = fn(sampleCopy);
    if (sample.toString() === sampleCopy.toString()) {
        console.log(fn.name, 'success!');
    } else {
        console.error(fn.name, 'fail!');
    }
}
