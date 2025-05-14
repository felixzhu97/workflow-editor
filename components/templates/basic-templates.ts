import type { WorkflowTemplate } from "./index"

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
