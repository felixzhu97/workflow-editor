import type { Node, Edge } from "reactflow"

// 布局类型
export type LayoutType = "hierarchical" | "horizontal" | "vertical" | "force" | "radial"

// 布局选项接口
export interface LayoutOptions {
  type: LayoutType
  nodeDistance?: number
  rankDistance?: number
  direction?: "TB" | "BT" | "LR" | "RL"
  centerX?: number
  centerY?: number
}

// 默认布局选项
export const defaultLayoutOptions: LayoutOptions = {
  type: "hierarchical",
  nodeDistance: 150,
  rankDistance: 200,
  direction: "TB",
}

/**
 * 自动布局算法工具类
 */
export class LayoutAlgorithms {
  /**
   * 应用布局算法
   * @param nodes 节点数组
   * @param edges 边数组
   * @param options 布局选项
   * @returns 更新后的节点数组
   */
  static applyLayout(nodes: Node[], edges: Edge[], options: LayoutOptions = defaultLayoutOptions): Node[] {
    switch (options.type) {
      case "hierarchical":
        return this.hierarchicalLayout(nodes, edges, options)
      case "horizontal":
        return this.horizontalLayout(nodes, edges, options)
      case "vertical":
        return this.verticalLayout(nodes, edges, options)
      case "force":
        return this.forceLayout(nodes, edges, options)
      case "radial":
        return this.radialLayout(nodes, edges, options)
      default:
        return this.hierarchicalLayout(nodes, edges, options)
    }
  }

  /**
   * 分层布局算法 - 适合工作流和流程图
   */
  private static hierarchicalLayout(nodes: Node[], edges: Edge[], options: LayoutOptions): Node[] {
    if (nodes.length === 0) return []

    // 创建节点副本
    const newNodes = [...nodes]

    // 节点间距
    const nodeDistance = options.nodeDistance || 150
    const rankDistance = options.rankDistance || 200

    // 方向
    const direction = options.direction || "TB"
    const isVertical = direction === "TB" || direction === "BT"
    const isReversed = direction === "BT" || direction === "RL"

    // 构建图结构
    const graph = this.buildGraph(nodes, edges)

    // 计算每个节点的层级（使用拓扑排序）
    const ranks = this.calculateRanks(graph)

    // 计算每层的节点数量
    const rankSizes: Record<number, number> = {}
    const rankNodes: Record<number, Node[]> = {}

    for (const nodeId in ranks) {
      const rank = ranks[nodeId]
      if (!rankSizes[rank]) {
        rankSizes[rank] = 0
        rankNodes[rank] = []
      }
      rankSizes[rank]++
      rankNodes[rank].push(newNodes.find((n) => n.id === nodeId)!)
    }

    // 计算每个节点的位置
    for (const nodeId in ranks) {
      const node = newNodes.find((n) => n.id === nodeId)
      if (!node) continue

      const rank = ranks[nodeId]
      const nodesInRank = rankNodes[rank]
      const index = nodesInRank.indexOf(node)
      const totalInRank = rankSizes[rank]

      // 计算节点在其层级中的位置
      const x = isVertical
        ? (index - (totalInRank - 1) / 2) * nodeDistance
        : (isReversed ? -1 : 1) * rank * rankDistance

      const y = isVertical
        ? (isReversed ? -1 : 1) * rank * rankDistance
        : (index - (totalInRank - 1) / 2) * nodeDistance

      // 更新节点位置
      node.position = { x, y }
    }

    return newNodes
  }

  /**
   * 水平布局算法 - 从左到右排列
   */
  private static horizontalLayout(nodes: Node[], edges: Edge[], options: LayoutOptions): Node[] {
    return this.hierarchicalLayout(nodes, edges, { ...options, direction: "LR" })
  }

  /**
   * 垂直布局算法 - 从上到下排列
   */
  private static verticalLayout(nodes: Node[], edges: Edge[], options: LayoutOptions): Node[] {
    return this.hierarchicalLayout(nodes, edges, { ...options, direction: "TB" })
  }

  /**
   * 力导向布局算法 - 适合网络图
   */
  private static forceLayout(nodes: Node[], edges: Edge[], options: LayoutOptions): Node[] {
    if (nodes.length === 0) return []

    // 创建节点副本
    const newNodes = [...nodes]

    // 简化版力导向布局
    // 实际应用中可以使用更复杂的物理模拟
    const iterations = 100
    const k = options.nodeDistance || 150 // 理想弹簧长度

    // 初始化随机位置（如果没有位置）
    newNodes.forEach((node) => {
      if (!node.position) {
        node.position = {
          x: Math.random() * 800 - 400,
          y: Math.random() * 800 - 400,
        }
      }
    })

    // 迭代应用力
    for (let i = 0; i < iterations; i++) {
      // 计算排斥力
      for (let a = 0; a < newNodes.length; a++) {
        for (let b = a + 1; b < newNodes.length; b++) {
          const nodeA = newNodes[a]
          const nodeB = newNodes[b]

          const dx = nodeB.position.x - nodeA.position.x
          const dy = nodeB.position.y - nodeA.position.y
          const distance = Math.sqrt(dx * dx + dy * dy) || 1

          // 排斥力与距离的平方成反比
          const force = (k * k) / distance

          const forceX = (force * dx) / distance
          const forceY = (force * dy) / distance

          // 应用力（减小力的影响以避免过度移动）
          const dampingFactor = 0.1
          nodeA.position.x -= forceX * dampingFactor
          nodeA.position.y -= forceY * dampingFactor
          nodeB.position.x += forceX * dampingFactor
          nodeB.position.y += forceY * dampingFactor
        }
      }

      // 计算吸引力（边）
      for (const edge of edges) {
        const source = newNodes.find((n) => n.id === edge.source)
        const target = newNodes.find((n) => n.id === edge.target)

        if (!source || !target) continue

        const dx = target.position.x - source.position.x
        const dy = target.position.y - source.position.y
        const distance = Math.sqrt(dx * dx + dy * dy) || 1

        // 吸引力与距离成正比
        const force = distance / k

        const forceX = (force * dx) / distance
        const forceY = (force * dy) / distance

        // 应用力
        const dampingFactor = 0.1
        source.position.x += forceX * dampingFactor
        source.position.y += forceY * dampingFactor
        target.position.x -= forceX * dampingFactor
        target.position.y -= forceY * dampingFactor
      }
    }

    return newNodes
  }

  /**
   * 放射状布局算法 - 适合以中心节点为主的图
   */
  private static radialLayout(nodes: Node[], edges: Edge[], options: LayoutOptions): Node[] {
    if (nodes.length === 0) return []

    // 创建节点副本
    const newNodes = [...nodes]

    // 找到中心节点（通常是开始节点或连接最多的节点）
    let centerNode = newNodes.find((n) => n.type === "start")

    if (!centerNode) {
      // 如果没有开始节点，选择连接最多的节点
      const connections: Record<string, number> = {}

      for (const edge of edges) {
        connections[edge.source] = (connections[edge.source] || 0) + 1
        connections[edge.target] = (connections[edge.target] || 0) + 1
      }

      let maxConnections = 0
      let maxNodeId = newNodes[0].id

      for (const nodeId in connections) {
        if (connections[nodeId] > maxConnections) {
          maxConnections = connections[nodeId]
          maxNodeId = nodeId
        }
      }

      centerNode = newNodes.find((n) => n.id === maxNodeId)!
    }

    // 计算每个节点到中心节点的距离
    const distances: Record<string, number> = {}
    distances[centerNode.id] = 0

    // 使用BFS计算距离
    const queue = [centerNode.id]
    while (queue.length > 0) {
      const current = queue.shift()!
      const currentDistance = distances[current]

      // 找到所有相邻节点
      const neighbors = edges
        .filter((e) => e.source === current || e.target === current)
        .map((e) => (e.source === current ? e.target : e.source))

      for (const neighbor of neighbors) {
        if (distances[neighbor] === undefined) {
          distances[neighbor] = currentDistance + 1
          queue.push(neighbor)
        }
      }
    }

    // 计算每个距离层的节点数量
    const levelCounts: Record<number, number> = {}
    const levelNodes: Record<number, Node[]> = {}

    for (const nodeId in distances) {
      const level = distances[nodeId]
      if (!levelCounts[level]) {
        levelCounts[level] = 0
        levelNodes[level] = []
      }
      levelCounts[level]++
      levelNodes[level].push(newNodes.find((n) => n.id === nodeId)!)
    }

    // 设置中心节点位置
    const centerX = options.centerX || 0
    const centerY = options.centerY || 0
    centerNode.position = { x: centerX, y: centerY }

    // 计算每个节点的位置
    const radius = options.nodeDistance || 150

    for (const nodeId in distances) {
      const node = newNodes.find((n) => n.id === nodeId)
      if (!node || node.id === centerNode.id) continue

      const level = distances[nodeId]
      const nodesInLevel = levelNodes[level]
      const index = nodesInLevel.indexOf(node)
      const totalInLevel = levelCounts[level]

      // 计算角度
      const angle = (index / totalInLevel) * 2 * Math.PI

      // 计算位置
      const x = centerX + Math.cos(angle) * radius * level
      const y = centerY + Math.sin(angle) * radius * level

      // 更新节点位置
      node.position = { x, y }
    }

    return newNodes
  }

  /**
   * 构建图结构
   */
  private static buildGraph(nodes: Node[], edges: Edge[]): Record<string, string[]> {
    const graph: Record<string, string[]> = {}

    // 初始化图
    for (const node of nodes) {
      graph[node.id] = []
    }

    // 添加边
    for (const edge of edges) {
      if (graph[edge.source]) {
        graph[edge.source].push(edge.target)
      }
    }

    return graph
  }

  /**
   * 计算节点层级（拓扑排序）
   */
  private static calculateRanks(graph: Record<string, string[]>): Record<string, number> {
    const ranks: Record<string, number> = {}
    const visited: Record<string, boolean> = {}
    const temp: Record<string, boolean> = {}

    // 查找入度为0的节点（开始节点）
    const startNodes = Object.keys(graph).filter((nodeId) => {
      return !Object.keys(graph).some((id) => graph[id].includes(nodeId))
    })

    // 如果没有找到开始节点，使用第一个节点
    const nodesToProcess = startNodes.length > 0 ? startNodes : [Object.keys(graph)[0]]

    // 对每个开始节点进行DFS
    for (const startNode of nodesToProcess) {
      this.dfs(startNode, graph, ranks, visited, temp)
    }

    // 处理可能的孤立节点
    for (const nodeId in graph) {
      if (!ranks[nodeId]) {
        ranks[nodeId] = 0
      }
    }

    return ranks
  }

  /**
   * 深度优先搜索计算层级
   */
  private static dfs(
    nodeId: string,
    graph: Record<string, string[]>,
    ranks: Record<string, number>,
    visited: Record<string, boolean>,
    temp: Record<string, boolean>,
    currentRank = 0,
  ): void {
    // 检测循环
    if (temp[nodeId]) {
      return
    }

    // 如果已访问且当前层级更高，则更新
    if (visited[nodeId]) {
      if (currentRank > ranks[nodeId]) {
        ranks[nodeId] = currentRank
      }
      return
    }

    temp[nodeId] = true

    // 设置当前节点的层级
    ranks[nodeId] = currentRank

    // 递归处理子节点
    for (const childId of graph[nodeId] || []) {
      this.dfs(childId, graph, ranks, visited, temp, currentRank + 1)
    }

    visited[nodeId] = true
    temp[nodeId] = false
  }
}
