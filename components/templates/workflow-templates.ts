import type { Node, Edge } from "reactflow"

// 工作流模板接口
export interface WorkflowTemplate {
  id: string
  name: string
  description: string
  nodes: Node[]
  edges: Edge[]
  category: "基础" | "审批" | "数据处理" | "高级"
  thumbnail?: string
}

// 简单顺序工作流
export const simpleSequentialTemplate: WorkflowTemplate = {
  id: "simple-sequential",
  name: "简单顺序流程",
  description: "基础的顺序执行工作流，包含开始、任务和结束节点",
  category: "基础",
  nodes: [
    {
      id: "start-node",
      type: "start",
      position: { x: 250, y: 50 },
      data: { label: "开始" },
    },
    {
      id: "task-1",
      type: "task",
      position: { x: 250, y: 200 },
      data: {
        label: "任务1",
        description: "第一个执行任务",
        properties: {
          执行人: "系统",
          超时时间: "30分钟",
        },
      },
    },
    {
      id: "task-2",
      type: "task",
      position: { x: 250, y: 350 },
      data: {
        label: "任务2",
        description: "第二个执行任务",
        properties: {
          执行人: "用户",
          超时时间: "1小时",
        },
      },
    },
    {
      id: "end-node",
      type: "end",
      position: { x: 250, y: 500 },
      data: { label: "结束" },
    },
  ],
  edges: [
    {
      id: "edge-start-task1",
      source: "start-node",
      target: "task-1",
      animated: true,
      type: "default",
    },
    {
      id: "edge-task1-task2",
      source: "task-1",
      target: "task-2",
      animated: true,
      type: "default",
    },
    {
      id: "edge-task2-end",
      source: "task-2",
      target: "end-node",
      animated: true,
      type: "default",
    },
  ],
}

// 条件分支工作流
export const conditionalBranchingTemplate: WorkflowTemplate = {
  id: "conditional-branching",
  name: "条件分支流程",
  description: "包含条件判断和分支路径的工作流",
  category: "基础",
  nodes: [
    {
      id: "start-node",
      type: "start",
      position: { x: 250, y: 50 },
      data: { label: "开始" },
    },
    {
      id: "task-1",
      type: "task",
      position: { x: 250, y: 180 },
      data: {
        label: "数据准备",
        description: "准备需要处理的数据",
        properties: {
          数据源: "系统输入",
        },
      },
    },
    {
      id: "condition-1",
      type: "condition",
      position: { x: 250, y: 310 },
      data: {
        label: "数据验证",
        description: "验证数据是否有效",
        properties: {
          条件: "数据完整性检查",
        },
      },
    },
    {
      id: "task-success",
      type: "task",
      position: { x: 100, y: 440 },
      data: {
        label: "处理有效数据",
        description: "处理通过验证的数据",
        properties: {
          处理方式: "标准流程",
        },
      },
    },
    {
      id: "task-failure",
      type: "task",
      position: { x: 400, y: 440 },
      data: {
        label: "处理无效数据",
        description: "处理未通过验证的数据",
        properties: {
          处理方式: "错误处理",
        },
      },
    },
    {
      id: "end-success",
      type: "end",
      position: { x: 100, y: 570 },
      data: { label: "成功完成" },
    },
    {
      id: "end-failure",
      type: "end",
      position: { x: 400, y: 570 },
      data: { label: "处理失败" },
    },
  ],
  edges: [
    {
      id: "edge-start-task1",
      source: "start-node",
      target: "task-1",
      animated: true,
      type: "default",
    },
    {
      id: "edge-task1-condition",
      source: "task-1",
      target: "condition-1",
      animated: true,
      type: "default",
    },
    {
      id: "edge-condition-success",
      source: "condition-1",
      target: "task-success",
      sourceHandle: "a",
      animated: true,
      type: "default",
      label: "有效",
    },
    {
      id: "edge-condition-failure",
      source: "condition-1",
      target: "task-failure",
      sourceHandle: "b",
      animated: true,
      type: "default",
      label: "无效",
    },
    {
      id: "edge-success-end",
      source: "task-success",
      target: "end-success",
      animated: true,
      type: "default",
    },
    {
      id: "edge-failure-end",
      source: "task-failure",
      target: "end-failure",
      animated: true,
      type: "default",
    },
  ],
}

// 审批工作流 - 重新设计布局
export const approvalWorkflowTemplate: WorkflowTemplate = {
  id: "approval-workflow",
  name: "多级审批流程",
  description: "包含多级审批和审核的工作流",
  category: "审批",
  nodes: [
    {
      id: "start-node",
      type: "start",
      position: { x: 400, y: 50 },
      data: { label: "提交申请" },
    },
    {
      id: "task-prepare",
      type: "task",
      position: { x: 400, y: 150 },
      data: {
        label: "准备申请材料",
        description: "准备需要审批的材料和文档",
        properties: {
          申请人: "员工",
          申请类型: "报销申请",
        },
      },
    },
    {
      id: "task-manager-review",
      type: "task",
      position: { x: 400, y: 280 },
      data: {
        label: "经理审批",
        description: "直属经理进行初审",
        properties: {
          审批人: "部门经理",
          时限: "3个工作日",
        },
      },
    },
    {
      id: "condition-manager",
      type: "condition",
      position: { x: 400, y: 410 },
      data: {
        label: "经理审批结果",
        description: "经理是否批准",
        properties: {
          条件: "审批结果",
        },
      },
    },
    {
      id: "task-reject",
      type: "task",
      position: { x: 650, y: 510 },
      data: {
        label: "申请被拒绝",
        description: "通知申请人申请被拒绝",
        properties: {
          通知方式: "系统消息",
        },
      },
    },
    {
      id: "task-finance-review",
      type: "task",
      position: { x: 150, y: 510 },
      data: {
        label: "财务审批",
        description: "财务部门进行复审",
        properties: {
          审批人: "财务主管",
          时限: "5个工作日",
        },
      },
    },
    {
      id: "condition-finance",
      type: "condition",
      position: { x: 150, y: 640 },
      data: {
        label: "财务审批结果",
        description: "财务是否批准",
        properties: {
          条件: "审批结果",
        },
      },
    },
    {
      id: "task-payment",
      type: "task",
      position: { x: 50, y: 770 },
      data: {
        label: "支付处理",
        description: "处理报销支付",
        properties: {
          处理人: "出纳",
          支付方式: "银行转账",
        },
      },
    },
    {
      id: "task-reject-finance",
      type: "task",
      position: { x: 250, y: 770 },
      data: {
        label: "财务拒绝",
        description: "通知申请人财务拒绝",
        properties: {
          通知方式: "系统消息",
        },
      },
    },
    {
      id: "end-approved",
      type: "end",
      position: { x: 50, y: 900 },
      data: { label: "申请通过" },
    },
    {
      id: "end-rejected",
      type: "end",
      position: { x: 650, y: 900 },
      data: { label: "申请被拒" },
    },
  ],
  edges: [
    { id: "e1", source: "start-node", target: "task-prepare", animated: true, type: "default" },
    { id: "e2", source: "task-prepare", target: "task-manager-review", animated: true, type: "default" },
    { id: "e3", source: "task-manager-review", target: "condition-manager", animated: true, type: "default" },
    {
      id: "e4",
      source: "condition-manager",
      target: "task-finance-review",
      sourceHandle: "a",
      animated: true,
      type: "default",
      label: "批准",
    },
    {
      id: "e5",
      source: "condition-manager",
      target: "task-reject",
      sourceHandle: "b",
      animated: true,
      type: "default",
      label: "拒绝",
    },
    { id: "e6", source: "task-finance-review", target: "condition-finance", animated: true, type: "default" },
    {
      id: "e7",
      source: "condition-finance",
      target: "task-payment",
      sourceHandle: "a",
      animated: true,
      type: "default",
      label: "批准",
    },
    {
      id: "e8",
      source: "condition-finance",
      target: "task-reject-finance",
      sourceHandle: "b",
      animated: true,
      type: "default",
      label: "拒绝",
    },
    { id: "e9", source: "task-payment", target: "end-approved", animated: true, type: "default" },
    { id: "e10", source: "task-reject", target: "end-rejected", animated: true, type: "default" },
    { id: "e11", source: "task-reject-finance", target: "end-rejected", animated: true, type: "default" },
  ],
}

// 数据处理工作流
export const dataProcessingTemplate: WorkflowTemplate = {
  id: "data-processing",
  name: "数据处理流程",
  description: "用于数据提取、转换和加载的ETL工作流",
  category: "数据处理",
  nodes: [
    {
      id: "start-node",
      type: "start",
      position: { x: 250, y: 50 },
      data: { label: "开始数据处理" },
    },
    {
      id: "task-extract",
      type: "task",
      position: { x: 250, y: 180 },
      data: {
        label: "数据提取",
        description: "从数据源提取原始数据",
        properties: {
          数据源: "数据库",
          提取方式: "SQL查询",
        },
      },
    },
    {
      id: "condition-data-check",
      type: "condition",
      position: { x: 250, y: 310 },
      data: {
        label: "数据检查",
        description: "检查数据是否完整",
        properties: {
          检查项: "数据完整性",
        },
      },
    },
    {
      id: "task-clean",
      type: "task",
      position: { x: 100, y: 440 },
      data: {
        label: "数据清洗",
        description: "清洗和标准化数据",
        properties: {
          清洗规则: "去重、格式化",
        },
      },
    },
    {
      id: "task-error-log",
      type: "task",
      position: { x: 400, y: 440 },
      data: {
        label: "错误记录",
        description: "记录数据错误",
        properties: {
          记录方式: "错误日志",
        },
      },
    },
    {
      id: "task-transform",
      type: "task",
      position: { x: 100, y: 570 },
      data: {
        label: "数据转换",
        description: "转换数据格式和结构",
        properties: {
          转换规则: "字段映射",
        },
      },
    },
    {
      id: "task-load",
      type: "task",
      position: { x: 100, y: 700 },
      data: {
        label: "数据加载",
        description: "将处理后的数据加载到目标系统",
        properties: {
          目标系统: "数据仓库",
          加载方式: "批量插入",
        },
      },
    },
    {
      id: "end-success",
      type: "end",
      position: { x: 100, y: 830 },
      data: { label: "处理完成" },
    },
    {
      id: "end-failure",
      type: "end",
      position: { x: 400, y: 570 },
      data: { label: "处理失败" },
    },
  ],
  edges: [
    { id: "e1", source: "start-node", target: "task-extract", animated: true, type: "default" },
    { id: "e2", source: "task-extract", target: "condition-data-check", animated: true, type: "default" },
    {
      id: "e3",
      source: "condition-data-check",
      target: "task-clean",
      sourceHandle: "a",
      animated: true,
      type: "default",
      label: "数据完整",
    },
    {
      id: "e4",
      source: "condition-data-check",
      target: "task-error-log",
      sourceHandle: "b",
      animated: true,
      type: "default",
      label: "数据不完整",
    },
    { id: "e5", source: "task-clean", target: "task-transform", animated: true, type: "default" },
    { id: "e6", source: "task-transform", target: "task-load", animated: true, type: "default" },
    { id: "e7", source: "task-load", target: "end-success", animated: true, type: "default" },
    { id: "e8", source: "task-error-log", target: "end-failure", animated: true, type: "default" },
  ],
}

// 所有模板列表
export const workflowTemplates: WorkflowTemplate[] = [
  simpleSequentialTemplate,
  conditionalBranchingTemplate,
  approvalWorkflowTemplate,
  dataProcessingTemplate,
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
