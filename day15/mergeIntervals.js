const merge = (intervals) => {
  const output = [];
  if (intervals.length === 1) {
    return intervals;
  }
  const iSorted = intervals.sort((a, b) => {
    if (a[0] < b[0]) {
      return -1;
    } else if (a[0] > b[0]) {
      return 1;
    } else {
      return 0;
    }
  });
  let curMerge = null;
  for (let i = 0; i < iSorted.length; i++) {
    if (curMerge === null) {
      curMerge = iSorted[i];
    } else {
      if (iSorted[i][0] <= curMerge[1]) {
        curMerge = [curMerge[0], Math.max(iSorted[i][1], curMerge[1])];
      } else {
        output.push(curMerge);
        curMerge = iSorted[i];
      }
    }
  }
  if (curMerge !== null) {
    output.push(curMerge);
  }
  return output;
};

const t1 = [
  [1, 3],
  [2, 6],
  [8, 10],
  [15, 18],
];

console.log(merge(t1));
