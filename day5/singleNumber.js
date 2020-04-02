const singleNumber = nums => {
  const cache = {};
  for (let i = 0; i < nums.length; i++) {
    const curNum = nums[i];
    if (cache.hasOwnProperty(curNum)) {
      cache[curNum]++;
    } else {
      cache[curNum] = 1;
    }
  }

  for (let i = 0; i < nums.length; i++) {
    if (cache[nums[i]] === 1) {
      return nums[i];
    }
  }
};

const singleNumberBitManipulation = nums => {
  return nums.reduce((acc, cur) => {
    return acc ^ cur;
  }, 0);
};

console.log(singleNumberBitManipulation([2, 1, 4, 5, 2, 4, 1]));
