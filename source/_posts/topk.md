---
title: top k
date: 2022-11-07 12:10:53
tags: 算法
index_img: /assets/topk.png
banner_img: /assets/topk.png
---

> 什么是 Top K 问题？简单来说就是在一组数据里面找到频率出现最高的前 K 个数，或前 K 大（当然也可以是前 K 小）的数。

利于快排的思维可以快速的找到 top k（最大、最小） 元素

我们选择数组区间 A[0...n-1]的最后一个元素 A[n-1]作为 pivot，对数组 A[0...n-1]原地分区，这样数组就分成了三部分，A[0...p-1]、A[p]、A[p+1...n-1]。

如果 p+1=K，那 A[p]就是要求解的元素；如果 K>p+1, 说明第 K 大元素出现在 A[p+1...n-1]区间，我们再按照上面的思路递归地在 A[p+1...n-1]这个区间内查找。同理
如果 K < p+1, 那么我们就在 A[0...p-1]

{% img /assets/topk.png '最大'%}

```javascript
function topK(arr, k) {
  const len = arr.length;
  if (k > len) {
    return -1;
  }
  let p = partition(arr, 0, arr.length - 1);
  while (p + 1 !== k) {
    if (k > p + 1) {
      p = partition(arr, p + 1, arr.length - 1);
    } else {
      p = partition(arr, 0, p - 1);
    }
  }
  return arr[p];
}

function partition(arr, start, end) {
  let startIndex = start;
  let pivot = arr[end];
  for (let i = start; i < end; i++) {
    if (arr[i] > pivot) {
      swap(arr, i, startIndex);
      startIndex++;
    }
  }
  swap(arr, startIndex, end);
  return startIndex;
}

function swap(arr, i, j) {
  if (i === j) return;
  let tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

let arr = [1, 2, 3, 4, 5];

topK(arr, 1); // 5
```

如果需要找最小的 k 我们只需要在我们的分区切换条件中改变大小判断的方向即可

```javascript
 if (arr[i] < pivot)
```
