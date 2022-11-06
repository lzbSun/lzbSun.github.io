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
