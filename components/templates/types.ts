import type { Node, Edge } from "reactflow"

// 工作流模板接口
export interface WorkflowTemplate {
  id: string
  name: string
  description: string
  nodes: Node[]
  edges: Edge[]
  category: "基础" | "审批" | "数据处理" | "高级" | "互联网" | "软件开发" | "系统架构" | "营销" | "管理"
  thumbnail?: string
}
