var canFinish = function(numCourses, prerequisites) {
  const order = [];
  const queue = [];
  const graph = new Map();
  const indegrees = Array(numCourses).fill(0);

  for (const [course, prerequisite] of prerequisites) {
    // build graph map
    if (graph.has(prerequisite)) {
      graph.get(prerequisite).push(course);
    } else {
      graph.set(prerequisite, [course]);
    }
    // build indegree array
    indegrees[course]++;
  }

  for (let i = 0; i < indegrees.length; i++) {
    // find all nodes with 0 indegrees ("no dependencies")
    if (indegrees[i] === 0) queue.push(i);
  }

  while (queue.length) {
    // start a BFS from all 0 indegree nodes
    const v = queue.shift();
    if (graph.has(v)) {
      for (const e of graph.get(v)) {
        // take course v
        indegrees[e]--; // because we've taken the course that e depends on, we can remove the dependency
        if (indegrees[e] === 0) queue.push(e); // if e now has no more dependencies, add it to the queue
      }
    }
    order.push(v); // the order we're taking the courses in
  }

  return numCourses === order.length;
};

console.log(
  canFinish(8, [
    [1, 0],
    [2, 6],
    [1, 7],
    [6, 4],
    [7, 0],
    [0, 5]
  ])
);
