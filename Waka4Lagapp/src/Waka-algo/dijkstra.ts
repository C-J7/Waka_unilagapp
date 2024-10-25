interface Graph {
  [key: string]: {
    [key: string]: number;
  };
}

export const dijkstra = (graph: Graph, startNode: string, endNode: string): string[] => {
  const distances: { [key: string]: number } = {};
  const visited: { [key: string]: boolean } = {};
  const previous: { [key: string]: string | null } = {};
  const nodes: string[] = Object.keys(graph);

  nodes.forEach(node => {
    distances[node] = Infinity;
    previous[node] = null;
  });

  distances[startNode] = 0;

  while (nodes.length > 0) {
    nodes.sort((a, b) => distances[a] - distances[b]);
    const closestNode = nodes.shift() as string;

    if (closestNode === endNode) break;

    if (!closestNode || distances[closestNode] === Infinity) continue;

    for (const neighbor in graph[closestNode]) {
      const distance = graph[closestNode][neighbor];
      const newDistance = distances[closestNode] + distance + 1; // Adding a penalty of 1 for each node

      if (newDistance < distances[neighbor]) {
        distances[neighbor] = newDistance;
        previous[neighbor] = closestNode;
      }
    }

    visited[closestNode] = true;
  }

  const path: string[] = [];
  let currentNode: string | null = endNode;

  while (currentNode) {
    path.unshift(currentNode);
    currentNode = previous[currentNode];
  }

  return path;
};