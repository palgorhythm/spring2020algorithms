//interval
//{
//  start: 1239991238,
//  end: 1239991239,
//  capacity: 3
//}

/*
[
  {start: 4, end: 10, capacity: 3},
  {start: 8, end: 12, capacity: 1},
  {start: 9, end: 18, capacity: 5}
]
4, 10, 8, 12, 15, 18
[
  {start: 4, end: 8, capacity: 3}, // 1 and 2 get turned into 3 entries
  {start: 8, end: 10, capacity: 4},
  {start: 10, end: 12: capacity: 1 }
  {start: 9, end: 18, capacity: 5}
]

1 10, 3
2 11, 1
3 12, 2

1 2
2 3
3 10
10 11
11 12
   ------
      -------

   ---
      ---
         ----
*/
/*
[
  {t: 4, capacity: 3},
  {t: 8, capacity: 4},
  {t: 10, capacity: 1},
  {t: 12, capacity: 0},
  {t: 15, capacity: 5},
  {t: 18, capacity: 0}
]
*/

const a1 = [
  { start: 4, end: 8, capacity: 3 }, // 1 and 2 get turned into 3 entries
  { start: 8, end: 10, capacity: 4 },
  { start: 10, end: 12, capacity: 1 },
  { start: 9, end: 18, capacity: 2 },
];

4, 3;
8, 0;
8, 4;
9, 2;
10, 0;
10, 1;
12, 0;
18, 0;

const a2 = [
  { start: 4, end: 8, capacity: 3 }, // 1 and 2 get turned into 3 entries
  { start: 8, end: 10, capacity: 4 },
  { start: 10, end: 12, capacity: 1 },
  { start: 9, end: 18, capacity: 5 },
  { start: 9, end: 18, capacity: 2 },
];

// how would i do it for one interval?

const capacity = (arr) => {
  const output = [];
  let times = new Set();
  arr.forEach((el) => {
    times.add(el.start);
    times.add(el.end);
  });
  times = Array.from(times);
  for (let i = 0; i < times.length; i++) {
    const s = times[i];
    let cap = 0;
    for (let j = 0; j < arr.length; j++) {
      const curData = arr[j];
      if (curData.start <= s && curData.end > s) {
        cap += curData.capacity;
      }
    }
    const newData = { t: s, capacity: cap };
    output.push(newData);
  }
  return output.sort((a, b) => {
    if (a.t < b.t) {
      return -1;
    } else if (a.t > b.t) {
      return 1;
    } else {
      return 0;
    }
  });
};

const capacityBetter = (arr) => {
  const h = {};
  const times = new Set();
  arr.forEach((el) => {
    times.add(el.start);
    times.add(el.end);
    if (h.hasOwnProperty(el.start)) {
      h[el.start] += el.capacity;
    } else {
      h[el.start] = el.capacity;
    }
    if (h.hasOwnProperty(el.end)) {
      h[el.end] -= el.capacity;
    } else {
      h[el.end] = el.capacity * -1;
    }
  });
  const timesSorted = Array.from(times).sort((a, b) => {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    } else {
      return 0;
    }
  });
  const output = [];
  let runningCapacity = 0;
  for (let i = 0; i < timesSorted.length; i++) {
    runningCapacity += h[timesSorted[i]];
    output.push({ t: timesSorted[i], capacity: runningCapacity });
  }
  return output;
};

// console.log(capacity(a1));
console.log(capacityBetter(a2));
