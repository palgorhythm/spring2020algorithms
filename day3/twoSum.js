const nums = [2, 7, 11, 15];
const target = 9;

const twoSum = (nums, target) => {
  const cache = {};
  for (let i = 0; i < nums.length; i++) {
    if (cache.hasOwnProperty(nums[i])) {
      return [cache[nums[i]], i];
    }
    cache[target - nums[i]] = i;
  }
};

console.log(twoSum(nums, target));
