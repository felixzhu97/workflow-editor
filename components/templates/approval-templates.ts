import type { WorkflowTemplate } from "./index"

// 审批工作流
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
      position: { x: 400, y: 200 },
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
      position: { x: 400, y: 350 },
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
      position: { x: 400, y: 500 },
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
      position: { x: 650, y: 650 },
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
      position: { x: 150, y: 650 },
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
      position: { x: 150, y: 800 },
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
      position: { x: 50, y: 950 },
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
      position: { x: 250, y: 950 },
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
      position: { x: 50, y: 1100 },
      data: { label: "申请通过" },
    },
    {
      id: "end-rejected",
      type: "end",
      position: { x: 650, y: 1100 },
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
