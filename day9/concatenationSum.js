function concatenationsSum(a) {
  let tenSums = 1;
  let s = a.reduce((acc, cur) => {
    return acc + cur;
  });
  for (let i = 0; i < a.length; i++) {
    tenSums = tenSums + Math.pow(10, a[i].toString().length);
  }
  if (a.length > 1) {
    return s * tenSums + s * (a.length - 1);
  }
}
