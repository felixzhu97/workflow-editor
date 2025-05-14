import type { WorkflowTemplate } from "./index"

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
      position: { x: 250, y: 200 },
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
      position: { x: 250, y: 350 },
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
      position: { x: 100, y: 500 },
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
      position: { x: 400, y: 500 },
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
      position: { x: 100, y: 650 },
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
      position: { x: 100, y: 800 },
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
      position: { x: 100, y: 950 },
      data: { label: "处理完成" },
    },
    {
      id: "end-failure",
      type: "end",
      position: { x: 400, y: 650 },
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
