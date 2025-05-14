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

import { simpleSequentialTemplate, conditionalBranchingTemplate } from "./basic-templates"
import { approvalWorkflowTemplate } from "./approval-templates"
import { dataProcessingTemplate } from "./data-templates"
import { userRegistrationTemplate, contentModerationTemplate, orderProcessingTemplate } from "./internet-templates"
import {
  cicdPipelineTemplate,
  agileDevProcessTemplate,
  apiDesignTemplate,
  productDevelopmentTemplate,
} from "./software-templates"
import { microserviceArchitectureTemplate, databaseDesignTemplate } from "./architecture-templates"
import {
  marketingCampaignTemplate,
  contentMarketingTemplate,
  socialMediaMarketingTemplate,
} from "./marketing-templates"
import { projectManagementTemplate, hrManagementTemplate, riskManagementTemplate } from "./management-templates"

// 所有模板列表
export const workflowTemplates: WorkflowTemplate[] = [
  // 基础模板
  simpleSequentialTemplate,
  conditionalBranchingTemplate,

  // 审批模板
  approvalWorkflowTemplate,

  // 数据处理模板
  dataProcessingTemplate,

  // 互联网模板
  userRegistrationTemplate,
  contentModerationTemplate,
  orderProcessingTemplate,

  // 软件开发模板
  cicdPipelineTemplate,
  agileDevProcessTemplate,
  apiDesignTemplate,
  productDevelopmentTemplate, // 添加新的产品开发流程模板

  // 系统架构模板
  microserviceArchitectureTemplate,
  databaseDesignTemplate,

  // 营销模板
  marketingCampaignTemplate,
  contentMarketingTemplate,
  socialMediaMarketingTemplate,

  // 管理模板
  projectManagementTemplate,
  hrManagementTemplate,
  riskManagementTemplate,
]

// 按类别获取模板
export const getTemplatesByCategory = (category?: string) => {
  if (!category) return workflowTemplates
  return workflowTemplates.filter((template) => template.category === category)
}

// 根据ID获取模板
export const getTemplateById = (id: string) => {
  return workflowTemplates.find((template) => template.id === id)
}
