// 冒泡排序
const bubbleSort = (originArr: number[]) => {
  let arr = [...originArr];
  let length = arr.length;
  for (let i = 0; i < length; i++) {
    let flag = false;
    for (let j = 0; j < length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
        flag = true;
      }
    }
    if (!flag) break;
  }
  return arr;
};

// 插入排序
// 插入排序分为未排序区间和已排序区间
const insertSort = (originArr: number[]) => {
  let arr = [...originArr];
  let len = arr.length;

  for (let i = 1; i < len; i++) {
    let value = arr[i];
    let j = i - 1;
    for (j; j >= 0; j--) {
      if (arr[j] > value) {
        arr[j + 1] = arr[j];
      } else {
        break;
      }
    }
    arr[j + 1] = value;
  }
  return arr;
};

// 选择排序
// 找到最小的然后跟前面的严肃调换位置
const selectSort = (originArr: number[]) => {
  const arr = [...originArr];
  const len = arr.length;

  for (let i = 0; i < len - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    let temp = arr[minIndex];
    arr[minIndex] = arr[i];
    arr[i] = temp;
  }
  return arr;
};

// 归并排序
// 采用分治思想
const mergeSort: any = (originArr: number[]) => {
  const arr = [...originArr];
  // 当任意数组分解到只有一个时返回。
  if (arr.length <= 1) return arr;

  const len = arr.length;
  const middle = Math.floor(len / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);
  return margeArr(mergeSort(left), mergeSort(right));
};

const margeArr = (left: number[], right: number[]) => {
  let temp: number[] = [];
  let leftIndex = 0,
    leftLen = left.length;
  let rightIndex = 0,
    rightLen = right.length;
  while (leftIndex < leftLen && rightIndex < rightLen) {
    if (left[leftIndex] < right[rightIndex]) {
      temp.push(left[leftIndex]);
      leftIndex++;
    } else {
      temp.push(right[rightIndex]);
      rightIndex++;
    }
  }
  temp = temp.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  return temp;
};

// quick sort
const quickSort = (arr: number[], left, right) => {
  if (left < right) {
    let pivot = right;
    let partitionIndex = partition(arr, pivot, left, right);
    quickSort(arr, left, partitionIndex - 1 < left ? left : partitionIndex - 1);
    quickSort(
      arr,
      partitionIndex + 1 > right ? right : partitionIndex + 1,
      right
    );
  }
};
const partition = (arr: number[], pivot: number, left: number, right) => {
  const pivotVal = arr[pivot];
  let startIndex = left;

  for (let i = left; i < right; i++) {
    if (arr[i] < pivotVal) {
      const temp = arr[i];
      arr[i] = arr[startIndex];
      arr[startIndex] = temp;
      startIndex++;
    }
  }
  const temp = arr[startIndex];
  arr[startIndex] = arr[pivot];
  arr[pivot] = temp;
  return startIndex;
};
