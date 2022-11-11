---
title: 排序
date: 2022-11-04 17:23:47
tags: 排序
comments: true
index_img: /assets/quicksort.png
banner_img: /assets/quicksort.png
---

## 冒泡排序, 插入排序, 选择排序, 归并排序, 快排

最常用也是最基础的排序算法

{% include_code lang:typescript sort.ts%}

**快排的思想很有意思**

快排的思想是这样的：如果要排序数组中下标从 p 到 r 之间的一组数据，我们选择 p 到 r 之间的任意一个数据作为 pivot（分区点）。

分区的整个过程

{% img /assets/quicksort.png  %}

分区代码如下：

```typescript
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
```

最后整理快排代码

```typescript
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
```

在线例子：

{% iframe https://codesandbox.io/p/sandbox/competent-morning-5jx5pb?file=%2Fsrc%2FApp.tsx&selection=%5B%7B%22endColumn%22%3A62%2C%22endLineNumber%22%3A98%2C%22startColumn%22%3A62%2C%22startLineNumber%22%3A98%7D%5D&workspace=%257B%2522activeFileId%2522%253A%2522cl9zkf3e9000alqiphi669wk8%2522%252C%2522openFiles%2522%253A%255B%2522%252FREADME.md%2522%252C%2522%252Fsrc%252FApp.tsx%2522%252C%2522%252Fsrc%252Findex.css%2522%252C%2522%252Fsrc%252FApp.css%2522%255D%252C%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522gitSidebarPanel%2522%253A%2522COMMIT%2522%252C%2522sidekickItems%2522%253A%255B%257B%2522type%2522%253A%2522PREVIEW%2522%252C%2522taskId%2522%253A%2522dev%2522%252C%2522port%2522%253A5173%252C%2522key%2522%253A%2522cla2gxvp0000m3b6prq66pgzx%2522%252C%2522isMinimized%2522%253Afalse%257D%255D%257D 100% 460 %}
