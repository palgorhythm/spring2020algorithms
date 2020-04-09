const transformToAlphabetized = (str) => {
  return str.split('').sort().join('');
};

const groupAnagrams = (strs) => {
  const cache = {};
  strs.forEach((str) => {
    const alpha = transformToAlphabetized(str);
    if (cache.hasOwnProperty(alpha)) {
      cache[alpha].push(str);
    } else {
      cache[alpha] = [str];
    }
  });
  return Object.values(cache);
};

const test1 = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'];
const expected1 = [['ate', 'eat', 'tea'], ['nat', 'tan'], ['bat']];
console.log(groupAnagrams(test1));
