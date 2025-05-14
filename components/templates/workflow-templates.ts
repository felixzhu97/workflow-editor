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

// 用户注册流程
export const userRegistrationTemplate: WorkflowTemplate = {
  id: "user-registration",
  name: "用户注册流程",
  description: "互联网应用中常见的用户注册和验证流程",
  category: "互联网",
  nodes: [
    {
      id: "start-node",
      type: "start",
      position: { x: 300, y: 50 },
      data: { label: "开始注册" },
    },
    {
      id: "task-input-info",
      type: "task",
      position: { x: 300, y: 200 },
      data: {
        label: "输入注册信息",
        description: "用户输入基本注册信息",
        properties: {
          必填字段: "用户名、邮箱、密码",
          可选字段: "手机号、昵称",
        },
      },
    },
    {
      id: "condition-email-valid",
      type: "condition",
      position: { x: 300, y: 350 },
      data: {
        label: "验证邮箱格式",
        description: "检查邮箱格式是否有效",
        properties: {
          验证规则: "正则表达式",
        },
      },
    },
    {
      id: "task-send-code",
      type: "task",
      position: { x: 150, y: 500 },
      data: {
        label: "发送验证码",
        description: "向用户邮箱发送验证码",
        properties: {
          验证码长度: "6位数字",
          有效期: "10分钟",
        },
      },
    },
    {
      id: "task-show-error",
      type: "task",
      position: { x: 450, y: 500 },
      data: {
        label: "显示错误信息",
        description: "提示用户邮箱格式错误",
        properties: {
          错误类型: "格式错误",
        },
      },
    },
    {
      id: "task-verify-code",
      type: "task",
      position: { x: 150, y: 650 },
      data: {
        label: "验证码校验",
        description: "用户输入并校验验证码",
        properties: {
          重试次数: "3次",
        },
      },
    },
    {
      id: "condition-code-valid",
      type: "condition",
      position: { x: 150, y: 800 },
      data: {
        label: "验证码是否正确",
        description: "检查用户输入的验证码",
        properties: {
          条件: "验证码匹配",
        },
      },
    },
    {
      id: "task-create-account",
      type: "task",
      position: { x: 50, y: 950 },
      data: {
        label: "创建账号",
        description: "在系统中创建用户账号",
        properties: {
          操作: "写入数据库",
          默认状态: "已验证",
        },
      },
    },
    {
      id: "task-code-error",
      type: "task",
      position: { x: 250, y: 950 },
      data: {
        label: "验证码错误",
        description: "提示用户验证码错误",
        properties: {
          操作: "显示错误信息",
        },
      },
    },
    {
      id: "task-welcome",
      type: "task",
      position: { x: 50, y: 1100 },
      data: {
        label: "欢迎页面",
        description: "显示注册成功欢迎页面",
        properties: {
          下一步: "引导用户完善资料",
        },
      },
    },
    {
      id: "end-success",
      type: "end",
      position: { x: 50, y: 1250 },
      data: { label: "注册成功" },
    },
    {
      id: "end-failure",
      type: "end",
      position: { x: 450, y: 650 },
      data: { label: "注册失败" },
    },
  ],
  edges: [
    { id: "e1", source: "start-node", target: "task-input-info", animated: true, type: "default" },
    { id: "e2", source: "task-input-info", target: "condition-email-valid", animated: true, type: "default" },
    {
      id: "e3",
      source: "condition-email-valid",
      target: "task-send-code",
      sourceHandle: "a",
      animated: true,
      type: "default",
      label: "有效",
    },
    {
      id: "e4",
      source: "condition-email-valid",
      target: "task-show-error",
      sourceHandle: "b",
      animated: true,
      type: "default",
      label: "无效",
    },
    { id: "e5", source: "task-send-code", target: "task-verify-code", animated: true, type: "default" },
    { id: "e6", source: "task-verify-code", target: "condition-code-valid", animated: true, type: "default" },
    {
      id: "e7",
      source: "condition-code-valid",
      target: "task-create-account",
      sourceHandle: "a",
      animated: true,
      type: "default",
      label: "正确",
    },
    {
      id: "e8",
      source: "condition-code-valid",
      target: "task-code-error",
      sourceHandle: "b",
      animated: true,
      type: "default",
      label: "错误",
    },
    { id: "e9", source: "task-create-account", target: "task-welcome", animated: true, type: "default" },
    { id: "e10", source: "task-welcome", target: "end-success", animated: true, type: "default" },
    { id: "e11", source: "task-show-error", target: "end-failure", animated: true, type: "default" },
    { id: "e12", source: "task-code-error", target: "task-verify-code", animated: true, type: "default" },
  ],
}

// 内容审核流程
export const contentModerationTemplate: WorkflowTemplate = {
  id: "content-moderation",
  name: "内容审核流程",
  description: "互联网平台常用的用户内容审核和发布流程",
  category: "互联网",
  nodes: [
    {
      id: "start-node",
      type: "start",
      position: { x: 300, y: 50 },
      data: { label: "内容提交" },
    },
    {
      id: "task-auto-check",
      type: "task",
      position: { x: 300, y: 200 },
      data: {
        label: "自动检测",
        description: "使用AI进行初步内容检测",
        properties: {
          检测项: "敏感词、违规图像",
          执行者: "AI系统",
        },
      },
    },
    {
      id: "condition-auto-result",
      type: "condition",
      position: { x: 300, y: 350 },
      data: {
        label: "自动检测结果",
        description: "判断自动检测的结果",
        properties: {
          条件: "风险评分",
        },
      },
    },
    {
      id: "task-manual-review",
      type: "task",
      position: { x: 300, y: 500 },
      data: {
        label: "人工审核",
        description: "内容审核员进行人工审核",
        properties: {
          审核人员: "内容审核员",
          时限: "24小时",
        },
      },
    },
    {
      id: "task-auto-reject",
      type: "task",
      position: { x: 500, y: 500 },
      data: {
        label: "自动拒绝",
        description: "系统自动拒绝明显违规内容",
        properties: {
          操作: "标记违规",
          通知: "用户消息",
        },
      },
    },
    {
      id: "task-auto-approve",
      type: "task",
      position: { x: 100, y: 500 },
      data: {
        label: "自动通过",
        description: "系统自动通过安全内容",
        properties: {
          操作: "标记安全",
        },
      },
    },
    {
      id: "condition-manual-result",
      type: "condition",
      position: { x: 300, y: 650 },
      data: {
        label: "人工审核结果",
        description: "人工审核的最终判断",
        properties: {
          条件: "审核员决定",
        },
      },
    },
    {
      id: "task-publish",
      type: "task",
      position: { x: 150, y: 800 },
      data: {
        label: "内容发布",
        description: "将内容发布到平台",
        properties: {
          操作: "更新状态为已发布",
          可见性: "公开",
        },
      },
    },
    {
      id: "task-reject",
      type: "task",
      position: { x: 450, y: 800 },
      data: {
        label: "拒绝发布",
        description: "拒绝内容并通知用户",
        properties: {
          操作: "更新状态为已拒绝",
          通知: "发送拒绝原因",
        },
      },
    },
    {
      id: "end-published",
      type: "end",
      position: { x: 150, y: 950 },
      data: { label: "发布完成" },
    },
    {
      id: "end-rejected",
      type: "end",
      position: { x: 450, y: 950 },
      data: { label: "发布被拒" },
    },
  ],
  edges: [
    { id: "e1", source: "start-node", target: "task-auto-check", animated: true, type: "default" },
    { id: "e2", source: "task-auto-check", target: "condition-auto-result", animated: true, type: "default" },
    {
      id: "e3",
      source: "condition-auto-result",
      target: "task-auto-approve",
      sourceHandle: "a",
      animated: true,
      type: "default",
      label: "安全",
    },
    {
      id: "e4",
      source: "condition-auto-result",
      target: "task-manual-review",
      sourceHandle: "a",
      animated: true,
      type: "default",
      label: "需人工审核",
    },
    {
      id: "e5",
      source: "condition-auto-result",
      target: "task-auto-reject",
      sourceHandle: "b",
      animated: true,
      type: "default",
      label: "明显违规",
    },
    { id: "e6", source: "task-manual-review", target: "condition-manual-result", animated: true, type: "default" },
    {
      id: "e7",
      source: "condition-manual-result",
      target: "task-publish",
      sourceHandle: "a",
      animated: true,
      type: "default",
      label: "通过",
    },
    {
      id: "e8",
      source: "condition-manual-result",
      target: "task-reject",
      sourceHandle: "b",
      animated: true,
      type: "default",
      label: "拒绝",
    },
    { id: "e9", source: "task-auto-approve", target: "task-publish", animated: true, type: "default" },
    { id: "e10", source: "task-auto-reject", target: "task-reject", animated: true, type: "default" },
    { id: "e11", source: "task-publish", target: "end-published", animated: true, type: "default" },
    { id: "e12", source: "task-reject", target: "end-rejected", animated: true, type: "default" },
  ],
}

// 订单处理流程
export const orderProcessingTemplate: WorkflowTemplate = {
  id: "order-processing",
  name: "订单处理流程",
  description: "电商平台中的订单处理和履行流程",
  category: "互联网",
  nodes: [
    {
      id: "start-node",
      type: "start",
      position: { x: 300, y: 50 },
      data: { label: "订单提交" },
    },
    {
      id: "task-payment",
      type: "task",
      position: { x: 300, y: 200 },
      data: {
        label: "支付处理",
        description: "处理用户支付请求",
        properties: {
          支付方式: "多种支付方式",
          超时时间: "30分钟",
        },
      },
    },
    {
      id: "condition-payment",
      type: "condition",
      position: { x: 300, y: 350 },
      data: {
        label: "支付状态",
        description: "检查支付是否成功",
        properties: {
          条件: "支付结果",
        },
      },
    },
    {
      id: "task-inventory",
      type: "task",
      position: { x: 150, y: 500 },
      data: {
        label: "库存检查",
        description: "检查商品库存状态",
        properties: {
          操作: "锁定库存",
          系统: "库存管理系统",
        },
      },
    },
    {
      id: "task-payment-failed",
      type: "task",
      position: { x: 450, y: 500 },
      data: {
        label: "支付失败处理",
        description: "处理支付失败情况",
        properties: {
          操作: "通知用户",
          后续: "允许重新支付",
        },
      },
    },
    {
      id: "condition-inventory",
      type: "condition",
      position: { x: 150, y: 650 },
      data: {
        label: "库存状态",
        description: "检查库存是否充足",
        properties: {
          条件: "库存数量",
        },
      },
    },
    {
      id: "task-order-confirm",
      type: "task",
      position: { x: 50, y: 800 },
      data: {
        label: "订单确认",
        description: "确认订单并准备发货",
        properties: {
          操作: "生成订单号",
          通知: "仓库系统",
        },
      },
    },
    {
      id: "task-backorder",
      type: "task",
      position: { x: 250, y: 800 },
      data: {
        label: "缺货处理",
        description: "处理商品缺货情况",
        properties: {
          操作: "通知用户",
          选项: "等待或取消",
        },
      },
    },
    {
      id: "task-shipping",
      type: "task",
      position: { x: 50, y: 950 },
      data: {
        label: "物流发货",
        description: "安排物流配送",
        properties: {
          操作: "生成物流单",
          系统: "物流管理系统",
        },
      },
    },
    {
      id: "task-notify",
      type: "task",
      position: { x: 50, y: 1100 },
      data: {
        label: "通知用户",
        description: "向用户发送订单和物流信息",
        properties: {
          通知方式: "短信、邮件、APP推送",
          内容: "订单号、物流单号",
        },
      },
    },
    {
      id: "end-success",
      type: "end",
      position: { x: 50, y: 1250 },
      data: { label: "订单完成" },
    },
    {
      id: "end-cancelled",
      type: "end",
      position: { x: 450, y: 650 },
      data: { label: "订单取消" },
    },
  ],
  edges: [
    { id: "e1", source: "start-node", target: "task-payment", animated: true, type: "default" },
    { id: "e2", source: "task-payment", target: "condition-payment", animated: true, type: "default" },
    {
      id: "e3",
      source: "condition-payment",
      target: "task-inventory",
      sourceHandle: "a",
      animated: true,
      type: "default",
      label: "支付成功",
    },
    {
      id: "e4",
      source: "condition-payment",
      target: "task-payment-failed",
      sourceHandle: "b",
      animated: true,
      type: "default",
      label: "支付失败",
    },
    { id: "e5", source: "task-inventory", target: "condition-inventory", animated: true, type: "default" },
    {
      id: "e6",
      source: "condition-inventory",
      target: "task-order-confirm",
      sourceHandle: "a",
      animated: true,
      type: "default",
      label: "库存充足",
    },
    {
      id: "e7",
      source: "condition-inventory",
      target: "task-backorder",
      sourceHandle: "b",
      animated: true,
      type: "default",
      label: "库存不足",
    },
    { id: "e8", source: "task-order-confirm", target: "task-shipping", animated: true, type: "default" },
    { id: "e9", source: "task-shipping", target: "task-notify", animated: true, type: "default" },
    { id: "e10", source: "task-notify", target: "end-success", animated: true, type: "default" },
    { id: "e11", source: "task-payment-failed", target: "end-cancelled", animated: true, type: "default" },
    { id: "e12", source: "task-backorder", target: "end-cancelled", animated: true, type: "default" },
  ],
}

// 新增：CI/CD流水线流程
export const cicdPipelineTemplate: WorkflowTemplate = {
  id: "cicd-pipeline",
  name: "CI/CD流水线",
  description: "软件开发中的持续集成和持续部署流水线流程",
  category: "软件开发",
  nodes: [
    {
      id: "start-node",
      type: "start",
      position: { x: 300, y: 50 },
      data: { label: "代码提交" },
    },
    {
      id: "task-code-checkout",
      type: "task",
      position: { x: 300, y: 200 },
      data: {
        label: "代码检出",
        description: "从代码仓库检出最新代码",
        properties: {
          仓库类型: "Git",
          分支: "main/master",
        },
      },
    },
    {
      id: "task-build",
      type: "task",
      position: { x: 300, y: 350 },
      data: {
        label: "代码构建",
        description: "编译和构建应用程序",
        properties: {
          构建工具: "Maven/Gradle/npm",
          环境: "构建容器",
        },
      },
    },
    {
      id: "task-unit-test",
      type: "task",
      position: { x: 300, y: 500 },
      data: {
        label: "单元测试",
        description: "运行单元测试套件",
        properties: {
          测试框架: "JUnit/Jest/PyTest",
          覆盖率要求: ">80%",
        },
      },
    },
    {
      id: "condition-test-result",
      type: "condition",
      position: { x: 300, y: 650 },
      data: {
        label: "���试结果",
        description: "检查单元测试是否通过",
        properties: {
          条件: "测试通过率",
        },
      },
    },
    {
      id: "task-code-analysis",
      type: "task",
      position: { x: 150, y: 800 },
      data: {
        label: "代码分析",
        description: "静态代码分析和质量检查",
        properties: {
          工具: "SonarQube/ESLint",
          规则集: "团队规范",
        },
      },
    },
    {
      id: "task-notify-failure",
      type: "task",
      position: { x: 450, y: 800 },
      data: {
        label: "通知失败",
        description: "通知开发团队测试失败",
        properties: {
          通知方式: "邮件/Slack",
          接收人: "开发团队",
        },
      },
    },
    {
      id: "condition-quality-gate",
      type: "condition",
      position: { x: 150, y: 950 },
      data: {
        label: "质量门禁",
        description: "检查代码是否通过质量标准",
        properties: {
          条件: "代码质量评分",
        },
      },
    },
    {
      id: "task-integration-test",
      type: "task",
      position: { x: 50, y: 1100 },
      data: {
        label: "集成测试",
        description: "运行集成测试套件",
        properties: {
          环境: "测试环境",
          测试类型: "API/功能测试",
        },
      },
    },
    {
      id: "task-quality-failure",
      type: "task",
      position: { x: 250, y: 1100 },
      data: {
        label: "质量不达标",
        description: "通知开发团队代码质量问题",
        properties: {
          通知方式: "邮件/Slack",
          详情: "质量报告链接",
        },
      },
    },
    {
      id: "task-staging-deploy",
      type: "task",
      position: { x: 50, y: 1250 },
      data: {
        label: "预发布部署",
        description: "部署到预发布环境",
        properties: {
          环境: "Staging",
          部署工具: "Kubernetes/Docker",
        },
      },
    },
    {
      id: "task-e2e-test",
      type: "task",
      position: { x: 50, y: 1400 },
      data: {
        label: "端到端测试",
        description: "在预发布环境运行E2E测试",
        properties: {
          工具: "Selenium/Cypress",
          测试范围: "关键流程",
        },
      },
    },
    {
      id: "condition-e2e-result",
      type: "condition",
      position: { x: 50, y: 1550 },
      data: {
        label: "E2E测试结果",
        description: "检查端到端测试是否通过",
        properties: {
          条件: "测试通过率",
        },
      },
    },
    {
      id: "task-production-deploy",
      type: "task",
      position: { x: 50, y: 1700 },
      data: {
        label: "生产环境部署",
        description: "部署到生产环境",
        properties: {
          环境: "Production",
          策略: "蓝绿部署/金丝雀发布",
        },
      },
    },
    {
      id: "task-e2e-failure",
      type: "task",
      position: { x: 200, y: 1700 },
      data: {
        label: "E2E测试失败",
        description: "回滚部署并通知团队",
        properties: {
          操作: "回滚到上一版本",
          通知: "开发和测试团队",
        },
      },
    },
    {
      id: "task-monitoring",
      type: "task",
      position: { x: 50, y: 1850 },
      data: {
        label: "监控与告警",
        description: "设置生产环境监控",
        properties: {
          监控工具: "Prometheus/Grafana",
          告警渠道: "PagerDuty/Slack",
        },
      },
    },
    {
      id: "end-success",
      type: "end",
      position: { x: 50, y: 2000 },
      data: { label: "部署完成" },
    },
    {
      id: "end-failure",
      type: "end",
      position: { x: 450, y: 800 },
      data: { label: "流水线失败" },
    },
  ],
  edges: [
    { id: "e1", source: "start-node", target: "task-code-checkout", animated: true, type: "default" },
    { id: "e2", source: "task-code-checkout", target: "task-build", animated: true, type: "default" },
    { id: "e3", source: "task-build", target: "task-unit-test", animated: true, type: "default" },
    { id: "e4", source: "task-unit-test", target: "condition-test-result", animated: true, type: "default" },
    {
      id: "e5",
      source: "condition-test-result",
      target: "task-code-analysis",
      sourceHandle: "a",
      animated: true,
      type: "default",
      label: "通过",
    },
    {
      id: "e6",
      source: "condition-test-result",
      target: "task-notify-failure",
      sourceHandle: "b",
      animated: true,
      type: "default",
      label: "失败",
    },
    { id: "e7", source: "task-code-analysis", target: "condition-quality-gate", animated: true, type: "default" },
    {
      id: "e8",
      source: "condition-quality-gate",
      target: "task-integration-test",
      sourceHandle: "a",
      animated: true,
      type: "default",
      label: "通过",
    },
    {
      id: "e9",
      source: "condition-quality-gate",
      target: "task-quality-failure",
      sourceHandle: "b",
      animated: true,
      type: "default",
      label: "不通过",
    },
    { id: "e10", source: "task-integration-test", target: "task-staging-deploy", animated: true, type: "default" },
    { id: "e11", source: "task-staging-deploy", target: "task-e2e-test", animated: true, type: "default" },
    { id: "e12", source: "task-e2e-test", target: "condition-e2e-result", animated: true, type: "default" },
    {
      id: "e13",
      source: "condition-e2e-result",
      target: "task-production-deploy",
      sourceHandle: "a",
      animated: true,
      type: "default",
      label: "通过",
    },
    {
      id: "e14",
      source: "condition-e2e-result",
      target: "task-e2e-failure",
      sourceHandle: "b",
      animated: true,
      type: "default",
      label: "失败",
    },
    { id: "e15", source: "task-production-deploy", target: "task-monitoring", animated: true, type: "default" },
    { id: "e16", source: "task-monitoring", target: "end-success", animated: true, type: "default" },
    { id: "e17", source: "task-notify-failure", target: "end-failure", animated: true, type: "default" },
    { id: "e18", source: "task-quality-failure", target: "end-failure", animated: true, type: "default" },
    { id: "e19", source: "task-e2e-failure", target: "end-failure", animated: true, type: "default" },
  ],
}

// 新增：微服务架构设计
export const microserviceArchitectureTemplate: WorkflowTemplate = {
  id: "microservice-architecture",
  name: "微服务架构设计",
  description: "微服务架构的设计和实现流程",
  category: "系统架构",
  nodes: [
    {
      id: "start-node",
      type: "start",
      position: { x: 300, y: 50 },
      data: { label: "开始架构设计" },
    },
    {
      id: "task-domain-analysis",
      type: "task",
      position: { x: 300, y: 200 },
      data: {
        label: "领域分析",
        description: "分析业务领域和边界",
        properties: {
          方法: "领域驱动设计(DDD)",
          产出: "领域模型",
        },
      },
    },
    {
      id: "task-service-identification",
      type: "task",
      position: { x: 300, y: 350 },
      data: {
        label: "服务识别",
        description: "识别微服务边界和职责",
        properties: {
          原则: "高内聚低耦合",
          考虑因素: "业务能力、数据自治",
        },
      },
    },
    {
      id: "task-api-design",
      type: "task",
      position: { x: 300, y: 500 },
      data: {
        label: "API设计",
        description: "设计服务间通信接口",
        properties: {
          风格: "REST/GraphQL/gRPC",
          规范: "OpenAPI/Protobuf",
        },
      },
    },
    {
      id: "task-data-model",
      type: "task",
      position: { x: 300, y: 650 },
      data: {
        label: "数据模型设计",
        description: "设计每个服务的数据模型",
        properties: {
          原则: "数据私有化",
          模式: "每服务一个数据库",
        },
      },
    },
    {
      id: "task-infrastructure",
      type: "task",
      position: { x: 300, y: 800 },
      data: {
        label: "基础设施规划",
        description: "规划部署和运行环境",
        properties: {
          平台: "Kubernetes/Cloud",
          考虑因素: "可扩展性、弹性",
        },
      },
    },
    {
      id: "condition-tech-stack",
      type: "condition",
      position: { x: 300, y: 950 },
      data: {
        label: "技术栈选择",
        description: "根据需求选择合适的技术",
        properties: {
          条件: "性能需求、团队技能",
        },
      },
    },
    {
      id: "task-sync-communication",
      type: "task",
      position: { x: 150, y: 1100 },
      data: {
        label: "同步通信设计",
        description: "设计基于HTTP/RPC的通信",
        properties: {
          模式: "API网关、服务发现",
          技术: "Spring Cloud/Kong",
        },
      },
    },
    {
      id: "task-async-communication",
      type: "task",
      position: { x: 450, y: 1100 },
      data: {
        label: "异步通信设计",
        description: "设计基于消息的通信",
        properties: {
          模式: "事件驱动、消息队列",
          技术: "Kafka/RabbitMQ",
        },
      },
    },
    {
      id: "task-resilience",
      type: "task",
      position: { x: 150, y: 1250 },
      data: {
        label: "弹性设计",
        description: "设计系统容错和弹性机制",
        properties: {
          模式: "断路器、重试、超时",
          技术: "Resilience4j/Hystrix",
        },
      },
    },
    {
      id: "task-event-sourcing",
      type: "task",
      position: { x: 450, y: 1250 },
      data: {
        label: "事件溯源设计",
        description: "设计事件存储和处理",
        properties: {
          模式: "CQRS、事件溯源",
          技术: "Axon/EventStore",
        },
      },
    },
    {
      id: "task-observability",
      type: "task",
      position: { x: 300, y: 1400 },
      data: {
        label: "可观测性设计",
        description: "设计监控、日志和追踪",
        properties: {
          组件: "日志、指标、追踪",
          技术: "ELK/Prometheus/Jaeger",
        },
      },
    },
    {
      id: "task-security",
      type: "task",
      position: { x: 300, y: 1550 },
      data: {
        label: "安全设计",
        description: "设计认证授权和安全机制",
        properties: {
          考虑因素: "身份验证、授权、加密",
          技术: "OAuth2/JWT/mTLS",
        },
      },
    },
    {
      id: "task-ci-cd",
      type: "task",
      position: { x: 300, y: 1700 },
      data: {
        label: "CI/CD设计",
        description: "设计持续集成和部署流程",
        properties: {
          流程: "构建、测试、部署",
          技术: "Jenkins/GitLab CI/ArgoCD",
        },
      },
    },
    {
      id: "task-documentation",
      type: "task",
      position: { x: 300, y: 1850 },
      data: {
        label: "架构文档",
        description: "编写架构设计文档",
        properties: {
          内容: "架构决策、组件关系",
          工具: "C4模型/架构决策记录",
        },
      },
    },
    {
      id: "end-node",
      type: "end",
      position: { x: 300, y: 2000 },
      data: { label: "架构设计完成" },
    },
  ],
  edges: [
    { id: "e1", source: "start-node", target: "task-domain-analysis", animated: true, type: "default" },
    {
      id: "e2",
      source: "task-domain-analysis",
      target: "task-service-identification",
      animated: true,
      type: "default",
    },
    { id: "e3", source: "task-service-identification", target: "task-api-design", animated: true, type: "default" },
    { id: "e4", source: "task-api-design", target: "task-data-model", animated: true, type: "default" },
    { id: "e5", source: "task-data-model", target: "task-infrastructure", animated: true, type: "default" },
    { id: "e6", source: "task-infrastructure", target: "condition-tech-stack", animated: true, type: "default" },
    {
      id: "e7",
      source: "condition-tech-stack",
      target: "task-sync-communication",
      sourceHandle: "a",
      animated: true,
      type: "default",
      label: "同步通信为主",
    },
    {
      id: "e8",
      source: "condition-tech-stack",
      target: "task-async-communication",
      sourceHandle: "b",
      animated: true,
      type: "default",
      label: "异步通信为主",
    },
    { id: "e9", source: "task-sync-communication", target: "task-resilience", animated: true, type: "default" },
    { id: "e10", source: "task-async-communication", target: "task-event-sourcing", animated: true, type: "default" },
    { id: "e11", source: "task-resilience", target: "task-observability", animated: true, type: "default" },
    { id: "e12", source: "task-event-sourcing", target: "task-observability", animated: true, type: "default" },
    { id: "e13", source: "task-observability", target: "task-security", animated: true, type: "default" },
    { id: "e14", source: "task-security", target: "task-ci-cd", animated: true, type: "default" },
    { id: "e15", source: "task-ci-cd", target: "task-documentation", animated: true, type: "default" },
    { id: "e16", source: "task-documentation", target: "end-node", animated: true, type: "default" },
  ],
}

// 新增：敏捷开发流程
export const agileDevProcessTemplate: WorkflowTemplate = {
  id: "agile-development",
  name: "敏捷开发流程",
  description: "敏捷软件开发的迭代流程",
  category: "软件开发",
  nodes: [
    {
      id: "start-node",
      type: "start",
      position: { x: 300, y: 50 },
      data: { label: "开始迭代" },
    },
    {
      id: "task-backlog-refinement",
      type: "task",
      position: { x: 300, y: 200 },
      data: {
        label: "需求梳理",
        description: "梳理和优先级排序产品待办事项",
        properties: {
          参与者: "产品经理、开发团队",
          产出: "精细化的用户故事",
        },
      },
    },
    {
      id: "task-sprint-planning",
      type: "task",
      position: { x: 300, y: 350 },
      data: {
        label: "迭代规划",
        description: "规划当前迭代要完成的工作",
        properties: {
          参与者: "Scrum团队",
          产出: "迭代待办事项",
        },
      },
    },
    {
      id: "task-design",
      type: "task",
      position: { x: 300, y: 500 },
      data: {
        label: "设计",
        description: "进行技术设计和架构设计",
        properties: {
          参与者: "开发团队",
          产出: "设计文档、原型",
        },
      },
    },
    {
      id: "task-development",
      type: "task",
      position: { x: 300, y: 650 },
      data: {
        label: "开发",
        description: "编写代码实现功能",
        properties: {
          实践: "结对编程、代码审查",
          产出: "功能代码",
        },
      },
    },
    {
      id: "task-testing",
      type: "task",
      position: { x: 300, y: 800 },
      data: {
        label: "测试",
        description: "进行单元测试和集成测试",
        properties: {
          类型: "自动化测试、手动测试",
          产出: "测试报告",
        },
      },
    },
    {
      id: "condition-test-pass",
      type: "condition",
      position: { x: 300, y: 950 },
      data: {
        label: "测试通过?",
        description: "检查测试是否通过",
        properties: {
          条件: "测试结果",
        },
      },
    },
    {
      id: "task-bug-fixing",
      type: "task",
      position: { x: 450, y: 1100 },
      data: {
        label: "修复缺陷",
        description: "修复测试中发现的问题",
        properties: {
          优先级: "按严重程度排序",
          验证: "回归测试",
        },
      },
    },
    {
      id: "task-code-review",
      type: "task",
      position: { x: 150, y: 1100 },
      data: {
        label: "代码审查",
        description: "进行代码质量审查",
        properties: {
          参与者: "开发团队",
          关注点: "代码质量、最佳实践",
        },
      },
    },
    {
      id: "task-integration",
      type: "task",
      position: { x: 150, y: 1250 },
      data: {
        label: "集成",
        description: "将功能集成到主分支",
        properties: {
          方式: "合并请求/拉取请求",
          验证: "CI流水线",
        },
      },
    },
    {
      id: "task-deployment",
      type: "task",
      position: { x: 150, y: 1400 },
      data: {
        label: "部署",
        description: "部署到测试或预发布环境",
        properties: {
          环境: "测试/预发布",
          方式: "自动化部署",
        },
      },
    },
    {
      id: "task-demo",
      type: "task",
      position: { x: 150, y: 1550 },
      data: {
        label: "演示",
        description: "向产品负责人演示功能",
        properties: {
          参与者: "开发团队、产品负责人",
          内容: "已完成功能",
        },
      },
    },
    {
      id: "condition-acceptance",
      type: "condition",
      position: { x: 150, y: 1700 },
      data: {
        label: "验收通过?",
        description: "产品负责人是否接受功能",
        properties: {
          条件: "满足验收标准",
        },
      },
    },
    {
      id: "task-rework",
      type: "task",
      position: { x: 300, y: 1850 },
      data: {
        label: "返工",
        description: "根据反馈调整功能",
        properties: {
          原因: "不符合预期",
          范围: "指定修改点",
        },
      },
    },
    {
      id: "task-documentation",
      type: "task",
      position: { x: 50, y: 1850 },
      data: {
        label: "文档完善",
        description: "完善用户和技术文档",
        properties: {
          类型: "用户手册、API文档",
          负责人: "开发团队",
        },
      },
    },
    {
      id: "task-retrospective",
      type: "task",
      position: { x: 50, y: 2000 },
      data: {
        label: "回顾会议",
        description: "回顾迭代过程中的经验教训",
        properties: {
          参与者: "Scrum团队",
          产出: "改进计划",
        },
      },
    },
    {
      id: "end-success",
      type: "end",
      position: { x: 50, y: 2150 },
      data: { label: "迭代完成" },
    },
    {
      id: "end-failure",
      type: "end",
      position: { x: 300, y: 2000 },
      data: { label: "迭代失败" },
    },
  ],
  edges: [
    { id: "e1", source: "start-node", target: "task-backlog-refinement", animated: true, type: "default" },
    { id: "e2", source: "task-backlog-refinement", target: "task-sprint-planning", animated: true, type: "default" },
    { id: "e3", source: "task-sprint-planning", target: "task-design", animated: true, type: "default" },
    { id: "e4", source: "task-design", target: "task-development", animated: true, type: "default" },
    { id: "e5", source: "task-development", target: "task-testing", animated: true, type: "default" },
    { id: "e6", source: "task-testing", target: "condition-test-pass", animated: true, type: "default" },
    {
      id: "e7",
      source: "condition-test-pass",
      target: "task-code-review",
      sourceHandle: "a",
      animated: true,
      type: "default",
      label: "通过",
    },
    {
      id: "e8",
      source: "condition-test-pass",
      target: "task-bug-fixing",
      sourceHandle: "b",
      animated: true,
      type: "default",
      label: "不通过",
    },
    { id: "e9", source: "task-bug-fixing", target: "task-testing", animated: true, type: "default" },
    { id: "e10", source: "task-code-review", target: "task-integration", animated: true, type: "default" },
    { id: "e11", source: "task-integration", target: "task-deployment", animated: true, type: "default" },
    { id: "e12", source: "task-deployment", target: "task-demo", animated: true, type: "default" },
    { id: "e13", source: "task-demo", target: "condition-acceptance", animated: true, type: "default" },
    {
      id: "e14",
      source: "condition-acceptance",
      target: "task-documentation",
      sourceHandle: "a",
      animated: true,
      type: "default",
      label: "通过",
    },
    {
      id: "e15",
      source: "condition-acceptance",
      target: "task-rework",
      sourceHandle: "b",
      animated: true,
      type: "default",
      label: "不通过",
    },
    { id: "e16", source: "task-documentation", target: "task-retrospective", animated: true, type: "default" },
    { id: "e17", source: "task-retrospective", target: "end-success", animated: true, type: "default" },
    { id: "e18", source: "task-rework", target: "end-failure", animated: true, type: "default" },
  ],
}

// 新增：数据库设计流程
export const databaseDesignTemplate: WorkflowTemplate = {
  id: "database-design",
  name: "数据库设计流程",
  description: "数据库架构设计和优化的完整流程",
  category: "系统架构",
  nodes: [
    {
      id: "start-node",
      type: "start",
      position: { x: 300, y: 50 },
      data: { label: "开始数据库设计" },
    },
    {
      id: "task-requirements",
      type: "task",
      position: { x: 300, y: 200 },
      data: {
        label: "需求分析",
        description: "分析应用的数据需求",
        properties: {
          关注点: "数据类型、关系、访问模式",
          产出: "数据需求文档",
        },
      },
    },
    {
      id: "task-conceptual-model",
      type: "task",
      position: { x: 300, y: 350 },
      data: {
        label: "概念模型设计",
        description: "设计高层次的数据模型",
        properties: {
          工具: "ER图、UML图",
          产出: "概念数据模型",
        },
      },
    },
    {
      id: "condition-db-type",
      type: "condition",
      position: { x: 300, y: 500 },
      data: {
        label: "数据库类型选择",
        description: "选择合适的数据库类型",
        properties: {
          条件: "数据特性、性能需求",
        },
      },
    },
    {
      id: "task-relational-design",
      type: "task",
      position: { x: 150, y: 650 },
      data: {
        label: "关系型数据库设计",
        description: "设计关系型数据库模式",
        properties: {
          技术: "MySQL/PostgreSQL/Oracle",
          关注点: "范式化、索引",
        },
      },
    },
    {
      id: "task-nosql-design",
      type: "task",
      position: { x: 450, y: 650 },
      data: {
        label: "NoSQL数据库设计",
        description: "设计非关系型数据库模式",
        properties: {
          技术: "MongoDB/Cassandra/Redis",
          关注点: "分区策略、数据模型",
        },
      },
    },
    {
      id: "task-logical-model",
      type: "task",
      position: { x: 150, y: 800 },
      data: {
        label: "逻辑模型设计",
        description: "设计详细的表结构和关系",
        properties: {
          内容: "表、列、关系、约束",
          产出: "数据库模式图",
        },
      },
    },
    {
      id: "task-document-model",
      type: "task",
      position: { x: 450, y: 800 },
      data: {
        label: "文档模型设计",
        description: "设计文档结构和嵌套关系",
        properties: {
          内容: "集合、文档结构、索引",
          产出: "文档模型图",
        },
      },
    },
    {
      id: "task-normalization",
      type: "task",
      position: { x: 150, y: 950 },
      data: {
        label: "数据库范式化",
        description: "应用数据库范式减少冗余",
        properties: {
          级别: "1NF到3NF/BCNF",
          考虑因素: "数据完整性、性能",
        },
      },
    },
    {
      id: "task-denormalization",
      type: "task",
      position: { x: 450, y: 950 },
      data: {
        label: "数据反范式化",
        description: "适当冗余以提高性能",
        properties: {
          技术: "嵌入文档、冗余字段",
          考虑因素: "读写比例、一致性",
        },
      },
    },
    {
      id: "task-indexing",
      type: "task",
      position: { x: 300, y: 1100 },
      data: {
        label: "索引设计",
        description: "设计高效的索引策略",
        properties: {
          类型: "主键、唯一、复合索引",
          考虑因素: "查询模式、写入性能",
        },
      },
    },
    {
      id: "task-partitioning",
      type: "task",
      position: { x: 300, y: 1250 },
      data: {
        label: "分区策略",
        description: "设计数据分区和分片策略",
        properties: {
          方法: "水平分区、垂直分区",
          考虑因素: "数据量、查询模式",
        },
      },
    },
    {
      id: "task-security",
      type: "task",
      position: { x: 300, y: 1400 },
      data: {
        label: "安全设计",
        description: "设计数据库安全机制",
        properties: {
          内容: "访问控制、加密、审计",
          产出: "安全策略文档",
        },
      },
    },
    {
      id: "task-performance",
      type: "task",
      position: { x: 300, y: 1550 },
      data: {
        label: "性能优化",
        description: "设计性能优化策略",
        properties: {
          技术: "查询优化、缓存策略",
          产出: "性能基准测试",
        },
      },
    },
    {
      id: "task-backup-recovery",
      type: "task",
      position: { x: 300, y: 1700 },
      data: {
        label: "备份恢复策略",
        description: "设计数据备份和恢复方案",
        properties: {
          内容: "备份频率、恢复点目标",
          产出: "备份恢复计划",
        },
      },
    },
    {
      id: "task-migration",
      type: "task",
      position: { x: 300, y: 1850 },
      data: {
        label: "迁移策略",
        description: "设计数据迁移和版本控制",
        properties: {
          技术: "迁移脚本、版本控制",
          产出: "迁移计划",
        },
      },
    },
    {
      id: "task-documentation",
      type: "task",
      position: { x: 300, y: 2000 },
      data: {
        label: "文档编写",
        description: "编写数据库设计文档",
        properties: {
          内容: "架构图、模式定义、索引",
          产出: "数据库设计文档",
        },
      },
    },
    {
      id: "end-node",
      type: "end",
      position: { x: 300, y: 2150 },
      data: { label: "数据库设计完成" },
    },
  ],
  edges: [
    { id: "e1", source: "start-node", target: "task-requirements", animated: true, type: "default" },
    { id: "e2", source: "task-requirements", target: "task-conceptual-model", animated: true, type: "default" },
    { id: "e3", source: "task-conceptual-model", target: "condition-db-type", animated: true, type: "default" },
    {
      id: "e4",
      source: "condition-db-type",
      target: "task-relational-design",
      sourceHandle: "a",
      animated: true,
      type: "default",
      label: "关系型",
    },
    {
      id: "e5",
      source: "condition-db-type",
      target: "task-nosql-design",
      sourceHandle: "b",
      animated: true,
      type: "default",
      label: "NoSQL",
    },
    { id: "e6", source: "task-relational-design", target: "task-logical-model", animated: true, type: "default" },
    { id: "e7", source: "task-nosql-design", target: "task-document-model", animated: true, type: "default" },
    { id: "e8", source: "task-logical-model", target: "task-normalization", animated: true, type: "default" },
    { id: "e9", source: "task-document-model", target: "task-denormalization", animated: true, type: "default" },
    { id: "e10", source: "task-normalization", target: "task-indexing", animated: true, type: "default" },
    { id: "e11", source: "task-denormalization", target: "task-indexing", animated: true, type: "default" },
    { id: "e12", source: "task-indexing", target: "task-partitioning", animated: true, type: "default" },
    { id: "e13", source: "task-partitioning", target: "task-security", animated: true, type: "default" },
    { id: "e14", source: "task-security", target: "task-performance", animated: true, type: "default" },
    { id: "e15", source: "task-performance", target: "task-backup-recovery", animated: true, type: "default" },
    { id: "e16", source: "task-backup-recovery", target: "task-migration", animated: true, type: "default" },
    { id: "e17", source: "task-migration", target: "task-documentation", animated: true, type: "default" },
    { id: "e18", source: "task-documentation", target: "end-node", animated: true, type: "default" },
  ],
}

// 新增：API设计流程
export const apiDesignTemplate: WorkflowTemplate = {
  id: "api-design",
  name: "API设计流程",
  description: "RESTful API的设计和开发流程",
  category: "软件开发",
  nodes: [
    {
      id: "start-node",
      type: "start",
      position: { x: 300, y: 50 },
      data: { label: "开始API设计" },
    },
    {
      id: "task-requirements",
      type: "task",
      position: { x: 300, y: 200 },
      data: {
        label: "需求收集",
        description: "收集API的功能和非功能需求",
        properties: {
          关注点: "用例、性能、安全",
          产出: "API需求文档",
        },
      },
    },
    {
      id: "task-resource-identification",
      type: "task",
      position: { x: 300, y: 350 },
      data: {
        label: "资源识别",
        description: "识别API暴露的资源",
        properties: {
          方法: "领域分析",
          产出: "资源列表",
        },
      },
    },
    {
      id: "task-endpoint-design",
      type: "task",
      position: { x: 300, y: 500 },
      data: {
        label: "端点设计",
        description: "设计API端点和路径",
        properties: {
          原则: "RESTful原则",
          产出: "端点规范",
        },
      },
    },
    {
      id: "task-data-model",
      type: "task",
      position: { x: 300, y: 650 },
      data: {
        label: "数据模型设计",
        description: "设计请求和响应的数据结构",
        properties: {
          格式: "JSON/XML",
          产出: "数据模型文档",
        },
      },
    },
    {
      id: "condition-api-style",
      type: "condition",
      position: { x: 300, y: 800 },
      data: {
        label: "API风格选择",
        description: "选择合适的API设计风格",
        properties: {
          条件: "需求特性、团队经验",
        },
      },
    },
    {
      id: "task-rest-design",
      type: "task",
      position: { x: 150, y: 950 },
      data: {
        label: "REST API设计",
        description: "设计符合REST原则的API",
        properties: {
          特点: "无状态、资源导向",
          方法: "GET/POST/PUT/DELETE",
        },
      },
    },
    {
      id: "task-graphql-design",
      type: "task",
      position: { x: 450, y: 950 },
      data: {
        label: "GraphQL设计",
        description: "设计GraphQL模式和解析器",
        properties: {
          特点: "灵活查询、单一端点",
          组件: "类型、查询、变更",
        },
      },
    },
    {
      id: "task-error-handling",
      type: "task",
      position: { x: 300, y: 1100 },
      data: {
        label: "错误处理设计",
        description: "设计API错误处理机制",
        properties: {
          内容: "错误码、错误消息",
          产出: "错误处理规范",
        },
      },
    },
    {
      id: "task-versioning",
      type: "task",
      position: { x: 300, y: 1250 },
      data: {
        label: "版本控制设计",
        description: "设计API版本控制策略",
        properties: {
          方法: "URL/Header/参数",
          产出: "版本控制策略",
        },
      },
    },
    {
      id: "task-security",
      type: "task",
      position: { x: 300, y: 1400 },
      data: {
        label: "安全设计",
        description: "设计API安全机制",
        properties: {
          内容: "认证、授权、加密",
          技术: "OAuth2/JWT/HTTPS",
        },
      },
    },
    {
      id: "task-rate-limiting",
      type: "task",
      position: { x: 300, y: 1550 },
      data: {
        label: "限流设计",
        description: "设计API限流和节流机制",
        properties: {
          策略: "令牌桶、漏桶",
          产出: "限流策略文档",
        },
      },
    },
    {
      id: "task-documentation",
      type: "task",
      position: { x: 300, y: 1700 },
      data: {
        label: "API文档",
        description: "编写API文档和规范",
        properties: {
          工具: "Swagger/OpenAPI/Postman",
          产出: "API文档",
        },
      },
    },
    {
      id: "task-mock",
      type: "task",
      position: { x: 300, y: 1850 },
      data: {
        label: "Mock服务",
        description: "创建API的Mock服务",
        properties: {
          工具: "Postman/Mockoon/Mirage",
          产出: "Mock端点",
        },
      },
    },
    {
      id: "task-testing",
      type: "task",
      position: { x: 300, y: 2000 },
      data: {
        label: "API测试",
        description: "设计和执行API测试",
        properties: {
          类型: "功能测试、性能测试",
          工具: "Postman/JMeter",
        },
      },
    },
    {
      id: "end-node",
      type: "end",
      position: { x: 300, y: 2150 },
      data: { label: "API设计完成" },
    },
  ],
  edges: [
    { id: "e1", source: "start-node", target: "task-requirements", animated: true, type: "default" },
    { id: "e2", source: "task-requirements", target: "task-resource-identification", animated: true, type: "default" },
    {
      id: "e3",
      source: "task-resource-identification",
      target: "task-endpoint-design",
      animated: true,
      type: "default",
    },
    { id: "e4", source: "task-endpoint-design", target: "task-data-model", animated: true, type: "default" },
    { id: "e5", source: "task-data-model", target: "condition-api-style", animated: true, type: "default" },
    {
      id: "e6",
      source: "condition-api-style",
      target: "task-rest-design",
      sourceHandle: "a",
      animated: true,
      type: "default",
      label: "REST",
    },
    {
      id: "e7",
      source: "condition-api-style",
      target: "task-graphql-design",
      sourceHandle: "b",
      animated: true,
      type: "default",
      label: "GraphQL",
    },
    { id: "e8", source: "task-rest-design", target: "task-error-handling", animated: true, type: "default" },
    { id: "e9", source: "task-graphql-design", target: "task-error-handling", animated: true, type: "default" },
    { id: "e10", source: "task-error-handling", target: "task-versioning", animated: true, type: "default" },
    { id: "e11", source: "task-versioning", target: "task-security", animated: true, type: "default" },
    { id: "e12", source: "task-security", target: "task-rate-limiting", animated: true, type: "default" },
    { id: "e13", source: "task-rate-limiting", target: "task-documentation", animated: true, type: "default" },
    { id: "e14", source: "task-documentation", target: "task-mock", animated: true, type: "default" },
    { id: "e15", source: "task-mock", target: "task-testing", animated: true, type: "default" },
    { id: "e16", source: "task-testing", target: "end-node", animated: true, type: "default" },
  ],
}

// 营销活动流程
export const marketingCampaignTemplate: WorkflowTemplate = {
  id: "marketing-campaign",
  name: "营销活动流程",
  description: "完整的营销活动策划、执行和评估流程",
  category: "营销",
  nodes: [
    {
      id: "start-node",
      type: "start",
      position: { x: 300, y: 50 },
      data: { label: "开始营销活动" },
    },
    {
      id: "task-market-research",
      type: "task",
      position: { x: 300, y: 200 },
      data: {
        label: "市场调研",
        description: "分析目标市场和竞争对手",
        properties: {
          负责人: "市场分析师",
          时长: "2周",
          工具: "问卷调查、竞品分析",
        },
      },
    },
    {
      id: "task-goal-setting",
      type: "task",
      position: { x: 300, y: 350 },
      data: {
        label: "目标设定",
        description: "设定营销活动的具体目标",
        properties: {
          负责人: "营销经理",
          指标: "转化率、ROI、品牌知名度",
          方法: "SMART原则",
        },
      },
    },
    {
      id: "task-budget-planning",
      type: "task",
      position: { x: 300, y: 500 },
      data: {
        label: "预算规划",
        description: "制定营销活动预算",
        properties: {
          负责人: "财务经理、营销经理",
          考虑因素: "渠道成本、创意制作、人力资源",
          审批流程: "部门审批",
        },
      },
    },
    {
      id: "task-creative-development",
      type: "task",
      position: { x: 300, y: 650 },
      data: {
        label: "创意开发",
        description: "开发营销活动创意和内容",
        properties: {
          负责人: "创意团队",
          内容: "广告文案、视觉设计、宣传材料",
          审核: "品牌合规性检查",
        },
      },
    },
    {
      id: "condition-creative-approval",
      type: "condition",
      position: { x: 300, y: 800 },
      data: {
        label: "创意审批",
        description: "评估创意是否符合要求",
        properties: {
          审批人: "营销总监",
          标准: "品牌一致性、目标相关性",
        },
      },
    },
    {
      id: "task-creative-revision",
      type: "task",
      position: { x: 500, y: 950 },
      data: {
        label: "创意修改",
        description: "根据反馈修改创意内容",
        properties: {
          负责人: "创意团队",
          反馈来源: "营销总监、品牌团队",
          时限: "3个工作日",
        },
      },
    },
    {
      id: "task-channel-selection",
      type: "task",
      position: { x: 100, y: 950 },
      data: {
        label: "渠道选择",
        description: "选择合适的营销渠道",
        properties: {
          负责人: "媒介经理",
          渠道类型: "社交媒体、搜索引擎、电子邮件、线下活动",
          考虑因素: "目标受众、成本效益",
        },
      },
    },
    {
      id: "task-campaign-execution",
      type: "task",
      position: { x: 100, y: 1100 },
      data: {
        label: "活动执行",
        description: "在各渠道执行营销活动",
        properties: {
          负责人: "营销执行团队",
          监控指标: "曝光量、点击率、参与度",
          频率: "每日监控",
        },
      },
    },
    {
      id: "task-data-collection",
      type: "task",
      position: { x: 100, y: 1250 },
      data: {
        label: "数据收集",
        description: "收集活动数据和用户反馈",
        properties: {
          负责人: "数据分析师",
          数据类型: "转化数据、用户行为、反馈意见",
          工具: "分析平台、CRM系统",
        },
      },
    },
    {
      id: "task-performance-analysis",
      type: "task",
      position: { x: 100, y: 1400 },
      data: {
        label: "效果分析",
        description: "分析活动效果和ROI",
        properties: {
          负责人: "营销分析师",
          指标: "ROI、CAC、转化率、参与度",
          输出: "分析报告",
        },
      },
    },
    {
      id: "condition-performance-review",
      type: "condition",
      position: { x: 100, y: 1550 },
      data: {
        label: "效果评估",
        description: "评估活动是否达到预期目标",
        properties: {
          评估人: "营销总监",
          标准: "KPI达成率",
        },
      },
    },
    {
      id: "task-optimization",
      type: "task",
      position: { x: 250, y: 1700 },
      data: {
        label: "优化调整",
        description: "根据分析结果优化活动",
        properties: {
          负责人: "营销团队",
          调整范围: "创意内容、渠道分配、目标受众",
          周期: "每周调整",
        },
      },
    },
    {
      id: "task-report",
      type: "task",
      position: { x: 100, y: 1850 },
      data: {
        label: "总结报告",
        description: "编写活动总结报告",
        properties: {
          负责人: "营销经理",
          内容: "活动成果、经验教训、建议",
          分发对象: "管理层、相关部门",
        },
      },
    },
    {
      id: "end-node",
      type: "end",
      position: { x: 100, y: 2000 },
      data: { label: "活动结束" },
    },
  ],
  edges: [
    { id: "e1", source: "start-node", target: "task-market-research", animated: true, type: "default" },
    { id: "e2", source: "task-market-research", target: "task-goal-setting", animated: true, type: "default" },
    { id: "e3", source: "task-goal-setting", target: "task-budget-planning", animated: true, type: "default" },
    { id: "e4", source: "task-budget-planning", target: "task-creative-development", animated: true, type: "default" },
    {
      id: "e5",
      source: "task-creative-development",
      target: "condition-creative-approval",
      animated: true,
      type: "default",
    },
    {
      id: "e6",
      source: "condition-creative-approval",
      target: "task-channel-selection",
      sourceHandle: "a",
      animated: true,
      type: "default",
      label: "通过",
    },
    {
      id: "e7",
      source: "condition-creative-approval",
      target: "task-creative-revision",
      sourceHandle: "b",
      animated: true,
      type: "default",
      label: "需修改",
    },
    {
      id: "e8",
      source: "task-creative-revision",
      target: "condition-creative-approval",
      animated: true,
      type: "default",
    },
    { id: "e9", source: "task-channel-selection", target: "task-campaign-execution", animated: true, type: "default" },
    { id: "e10", source: "task-campaign-execution", target: "task-data-collection", animated: true, type: "default" },
    { id: "e11", source: "task-data-collection", target: "task-performance-analysis", animated: true, type: "default" },
    {
      id: "e12",
      source: "task-performance-analysis",
      target: "condition-performance-review",
      animated: true,
      type: "default",
    },
    {
      id: "e13",
      source: "condition-performance-review",
      target: "task-report",
      sourceHandle: "a",
      animated: true,
      type: "default",
      label: "达标",
    },
    {
      id: "e14",
      source: "condition-performance-review",
      target: "task-optimization",
      sourceHandle: "b",
      animated: true,
      type: "default",
      label: "未达标",
    },
    { id: "e15", source: "task-optimization", target: "task-campaign-execution", animated: true, type: "default" },
    { id: "e16", source: "task-report", target: "end-node", animated: true, type: "default" },
  ],
}

// 内容营销流程
export const contentMarketingTemplate: WorkflowTemplate = {
  id: "content-marketing",
  name: "内容营销流程",
  description: "内容策划、创作、发布和优化的完整流程",
  category: "营销",
  nodes: [
    {
      id: "start-node",
      type: "start",
      position: { x: 300, y: 50 },
      data: { label: "开始内容营销" },
    },
    {
      id: "task-audience-research",
      type: "task",
      position: { x: 300, y: 200 },
      data: {
        label: "受众分析",
        description: "分析目标受众需求和兴趣",
        properties: {
          负责人: "内容策略师",
          方法: "用户调研、数据分析",
          输出: "受众画像",
        },
      },
    },
    {
      id: "task-content-strategy",
      type: "task",
      position: { x: 300, y: 350 },
      data: {
        label: "内容策略",
        description: "制定内容主题和发布计划",
        properties: {
          负责人: "内容经理",
          内容: "主题规划、内容日历、KPI设定",
          周期: "季度规划",
        },
      },
    },
    {
      id: "task-keyword-research",
      type: "task",
      position: { x: 300, y: 500 },
      data: {
        label: "关键词研究",
        description: "研究相关关键词和搜索趋势",
        properties: {
          负责人: "SEO专员",
          工具: "关键词规划工具、趋势分析",
          输出: "关键词列表",
        },
      },
    },
    {
      id: "task-content-creation",
      type: "task",
      position: { x: 300, y: 650 },
      data: {
        label: "内容创作",
        description: "创作各类内容",
        properties: {
          负责人: "内容创作团队",
          内容类型: "博客、视频、图文、白皮书",
          标准: "SEO优化、品牌一致性",
        },
      },
    },
    {
      id: "condition-content-review",
      type: "condition",
      position: { x: 300, y: 800 },
      data: {
        label: "内容审核",
        description: "审核内容质量和合规性",
        properties: {
          审核人: "内容经理、法务",
          标准: "质量标准、合规要求",
        },
      },
    },
    {
      id: "task-content-revision",
      type: "task",
      position: { x: 500, y: 950 },
      data: {
        label: "内容修改",
        description: "根据反馈修改内容",
        properties: {
          负责人: "内容创作者",
          反馈来源: "审核团队",
          时限: "2个工作日",
        },
      },
    },
    {
      id: "task-content-optimization",
      type: "task",
      position: { x: 100, y: 950 },
      data: {
        label: "内容优化",
        description: "优化内容以提高SEO效果",
        properties: {
          负责人: "SEO专员",
          优化项: "标题、元描述、内部链接、图片Alt标签",
          工具: "SEO检查工具",
        },
      },
    },
    {
      id: "task-content-publishing",
      type: "task",
      position: { x: 100, y: 1100 },
      data: {
        label: "内容发布",
        description: "在各渠道发布内容",
        properties: {
          负责人: "内容运营",
          渠道: "官网、社交媒体、电子邮件",
          时间: "根据内容日历",
        },
      },
    },
    {
      id: "task-promotion",
      type: "task",
      position: { x: 100, y: 1250 },
      data: {
        label: "内容推广",
        description: "推广已发布的内容",
        properties: {
          负责人: "营销团队",
          方式: "社交分享、邮件推送、付费推广",
          预算: "根据内容重要性分配",
        },
      },
    },
    {
      id: "task-engagement-monitoring",
      type: "task",
      position: { x: 100, y: 1400 },
      data: {
        label: "互动监控",
        description: "监控用户互动和反馈",
        properties: {
          负责人: "社区经理",
          指标: "评论、分享、点赞",
          频率: "实时监控",
        },
      },
    },
    {
      id: "task-performance-analysis",
      type: "task",
      position: { x: 100, y: 1550 },
      data: {
        label: "效果分析",
        description: "分析内容表现和转化效果",
        properties: {
          负责人: "数据分析师",
          指标: "流量、停留时间、转化率、参与度",
          周期: "每周分析",
        },
      },
    },
    {
      id: "task-content-repurposing",
      type: "task",
      position: { x: 100, y: 1700 },
      data: {
        label: "内容再利用",
        description: "将成功内容改编为其他形式",
        properties: {
          负责人: "内容团队",
          方式: "博客转视频、长文章分解、内容合集",
          选择标准: "高绩效内容",
        },
      },
    },
    {
      id: "task-strategy-adjustment",
      type: "task",
      position: { x: 100, y: 1850 },
      data: {
        label: "策略调整",
        description: "根据分析结果调整内容策略",
        properties: {
          负责人: "内容经理",
          调整范围: "主题、格式、发布频率、渠道",
          依据: "数据分析结果",
        },
      },
    },
    {
      id: "end-node",
      type: "end",
      position: { x: 100, y: 2000 },
      data: { label: "完成内容营销循环" },
    },
  ],
  edges: [
    { id: "e1", source: "start-node", target: "task-audience-research", animated: true, type: "default" },
    { id: "e2", source: "task-audience-research", target: "task-content-strategy", animated: true, type: "default" },
    { id: "e3", source: "task-content-strategy", target: "task-keyword-research", animated: true, type: "default" },
    { id: "e4", source: "task-keyword-research", target: "task-content-creation", animated: true, type: "default" },
    { id: "e5", source: "task-content-creation", target: "condition-content-review", animated: true, type: "default" },
    {
      id: "e6",
      source: "condition-content-review",
      target: "task-content-optimization",
      sourceHandle: "a",
      animated: true,
      type: "default",
      label: "通过",
    },
    {
      id: "e7",
      source: "condition-content-review",
      target: "task-content-revision",
      sourceHandle: "b",
      animated: true,
      type: "default",
      label: "需修改",
    },
    { id: "e8", source: "task-content-revision", target: "condition-content-review", animated: true, type: "default" },
    {
      id: "e9",
      source: "task-content-optimization",
      target: "task-content-publishing",
      animated: true,
      type: "default",
    },
    { id: "e10", source: "task-content-publishing", target: "task-promotion", animated: true, type: "default" },
    { id: "e11", source: "task-promotion", target: "task-engagement-monitoring", animated: true, type: "default" },
    {
      id: "e12",
      source: "task-engagement-monitoring",
      target: "task-performance-analysis",
      animated: true,
      type: "default",
    },
    {
      id: "e13",
      source: "task-performance-analysis",
      target: "task-content-repurposing",
      animated: true,
      type: "default",
    },
    {
      id: "e14",
      source: "task-content-repurposing",
      target: "task-strategy-adjustment",
      animated: true,
      type: "default",
    },
    { id: "e15", source: "task-strategy-adjustment", target: "end-node", animated: true, type: "default" },
  ],
}

// 社交媒体营销流程
export const socialMediaMarketingTemplate: WorkflowTemplate = {
  id: "social-media-marketing",
  name: "社交媒体营销流程",
  description: "社交媒体内容规划、发布和分析的完整流程",
  category: "营销",
  nodes: [
    {
      id: "start-node",
      type: "start",
      position: { x: 300, y: 50 },
      data: { label: "开始社媒营销" },
    },
    {
      id: "task-platform-selection",
      type: "task",
      position: { x: 300, y: 200 },
      data: {
        label: "平台选择",
        description: "选择合适的社交媒体平台",
        properties: {
          负责人: "社媒经理",
          考虑因素: "目标受众、平台特性、竞品分析",
          输出: "平台优先级列表",
        },
      },
    },
    {
      id: "task-account-setup",
      type: "task",
      position: { x: 300, y: 350 },
      data: {
        label: "账号设置",
        description: "创建和优化社交媒体账号",
        properties: {
          负责人: "社媒专员",
          内容: "个人资料、品牌元素、联系信息",
          平台: "微信、微博、抖音、小红书等",
        },
      },
    },
    {
      id: "task-content-planning",
      type: "task",
      position: { x: 300, y: 500 },
      data: {
        label: "内容规划",
        description: "规划社交媒体内容日历",
        properties: {
          负责人: "内容策略师",
          内容类型: "原创内容、用户生成内容、互动活动",
          周期: "月度规划",
        },
      },
    },
    {
      id: "task-content-creation",
      type: "task",
      position: { x: 300, y: 650 },
      data: {
        label: "内容创作",
        description: "创作社交媒体内容",
        properties: {
          负责人: "创意团队",
          内容形式: "图片、视频、文字、直播",
          标准: "平台适配、品牌一致性",
        },
      },
    },
    {
      id: "condition-content-approval",
      type: "condition",
      position: { x: 300, y: 800 },
      data: {
        label: "内容审批",
        description: "审核社交媒体内容",
        properties: {
          审批人: "社媒经理、品牌负责人",
          标准: "品牌指南、合规要求",
        },
      },
    },
    {
      id: "task-content-revision",
      type: "task",
      position: { x: 500, y: 950 },
      data: {
        label: "内容修改",
        description: "根据反馈修改内容",
        properties: {
          负责人: "创意团队",
          反馈来源: "审批团队",
          时限: "24小时内",
        },
      },
    },
    {
      id: "task-content-scheduling",
      type: "task",
      position: { x: 100, y: 950 },
      data: {
        label: "内容排期",
        description: "安排内容发布时间",
        properties: {
          负责人: "社媒专员",
          考虑因素: "最佳发布时间、平台算法、用户活跃度",
          工具: "社媒管理平台",
        },
      },
    },
    {
      id: "task-content-publishing",
      type: "task",
      position: { x: 100, y: 1100 },
      data: {
        label: "内容发布",
        description: "在各平台发布内容",
        properties: {
          负责人: "社媒专员",
          方式: "手动发布、自动发布",
          频率: "根据平台特性和内容日历",
        },
      },
    },
    {
      id: "task-community-management",
      type: "task",
      position: { x: 100, y: 1250 },
      data: {
        label: "社区管理",
        description: "管理用户互动和评论",
        properties: {
          负责人: "社区经理",
          内容: "回复评论、处理问题、鼓励互动",
          时效性: "24小时内回复",
        },
      },
    },
    {
      id: "task-influencer-collaboration",
      type: "task",
      position: { x: 100, y: 1400 },
      data: {
        label: "KOL合作",
        description: "与关键意见领袖合作",
        properties: {
          负责人: "KOL经理",
          合作方式: "内容创作、产品推广、直播活动",
          选择标准: "受众匹配度、互动质量、性价比",
        },
      },
    },
    {
      id: "task-paid-promotion",
      type: "task",
      position: { x: 100, y: 1550 },
      data: {
        label: "付费推广",
        description: "进行社交媒体付费推广",
        properties: {
          负责人: "社媒广告专员",
          形式: "信息流广告、关键词广告、KOL合作",
          预算分配: "根据平台效果和目标",
        },
      },
    },
    {
      id: "task-performance-tracking",
      type: "task",
      position: { x: 100, y: 1700 },
      data: {
        label: "效果追踪",
        description: "追踪社交媒体营销效果",
        properties: {
          负责人: "数据分析师",
          指标: "粉丝增长、互动率、点击率、转化率",
          工具: "平台分析工具、第三方监测",
        },
      },
    },
    {
      id: "task-report-analysis",
      type: "task",
      position: { x: 100, y: 1850 },
      data: {
        label: "报告分析",
        description: "分析社交媒体营销效果",
        properties: {
          负责人: "社媒经理",
          内容: "绩效分析、竞品对比、趋势洞察",
          周期: "月度报告",
        },
      },
    },
    {
      id: "task-strategy-optimization",
      type: "task",
      position: { x: 100, y: 2000 },
      data: {
        label: "策略优化",
        description: "优化社交媒体营销策略",
        properties: {
          负责人: "社媒经理、内容策略师",
          优化方向: "内容类型、发布时间、互动策略、预算分配",
          依据: "数据分析结果",
        },
      },
    },
    {
      id: "end-node",
      type: "end",
      position: { x: 100, y: 2150 },
      data: { label: "完成社媒营销循环" },
    },
  ],
  edges: [
    { id: "e1", source: "start-node", target: "task-platform-selection", animated: true, type: "default" },
    { id: "e2", source: "task-platform-selection", target: "task-account-setup", animated: true, type: "default" },
    { id: "e3", source: "task-account-setup", target: "task-content-planning", animated: true, type: "default" },
    { id: "e4", source: "task-content-planning", target: "task-content-creation", animated: true, type: "default" },
    {
      id: "e5",
      source: "task-content-creation",
      target: "condition-content-approval",
      animated: true,
      type: "default",
    },
    {
      id: "e6",
      source: "condition-content-approval",
      target: "task-content-scheduling",
      sourceHandle: "a",
      animated: true,
      type: "default",
      label: "通过",
    },
    {
      id: "e7",
      source: "condition-content-approval",
      target: "task-content-revision",
      sourceHandle: "b",
      animated: true,
      type: "default",
      label: "需修改",
    },
    {
      id: "e8",
      source: "task-content-revision",
      target: "condition-content-approval",
      animated: true,
      type: "default",
    },
    { id: "e9", source: "task-content-scheduling", target: "task-content-publishing", animated: true, type: "default" },
    {
      id: "e10",
      source: "task-content-publishing",
      target: "task-community-management",
      animated: true,
      type: "default",
    },
    {
      id: "e11",
      source: "task-community-management",
      target: "task-influencer-collaboration",
      animated: true,
      type: "default",
    },
    {
      id: "e12",
      source: "task-influencer-collaboration",
      target: "task-paid-promotion",
      animated: true,
      type: "default",
    },
    { id: "e13", source: "task-paid-promotion", target: "task-performance-tracking", animated: true, type: "default" },
    { id: "e14", source: "task-performance-tracking", target: "task-report-analysis", animated: true, type: "default" },
    {
      id: "e15",
      source: "task-report-analysis",
      target: "task-strategy-optimization",
      animated: true,
      type: "default",
    },
    { id: "e16", source: "task-strategy-optimization", target: "end-node", animated: true, type: "default" },
  ],
}

// 项目管理流程
export const projectManagementTemplate: WorkflowTemplate = {
  id: "project-management",
  name: "项目管理流程",
  description: "完整的项目规划、执行和监控流程",
  category: "管理",
  nodes: [
    {
      id: "start-node",
      type: "start",
      position: { x: 300, y: 50 },
      data: { label: "项目启动" },
    },
    {
      id: "task-project-charter",
      type: "task",
      position: { x: 300, y: 200 },
      data: {
        label: "项目章程",
        description: "制定项目章程和目标",
        properties: {
          负责人: "项目经理",
          内容: "项目目标、范围、利益相关者",
          审批: "项目发起人",
        },
      },
    },
    {
      id: "task-stakeholder-analysis",
      type: "task",
      position: { x: 300, y: 350 },
      data: {
        label: "利益相关者分析",
        description: "识别和分析项目利益相关者",
        properties: {
          负责人: "项目经理",
          输出: "利益相关者登记册",
          方法: "影响力/利益矩阵",
        },
      },
    },
    {
      id: "task-requirements-gathering",
      type: "task",
      position: { x: 300, y: 500 },
      data: {
        label: "需求收集",
        description: "收集和分析项目需求",
        properties: {
          负责人: "业务分析师",
          方法: "访谈、研讨会、问卷",
          输出: "需求文档",
        },
      },
    },
    {
      id: "task-scope-definition",
      type: "task",
      position: { x: 300, y: 650 },
      data: {
        label: "范围定义",
        description: "定义项目范围和可交付成果",
        properties: {
          负责人: "项目经理、业务分析师",
          输出: "范围说明书、WBS",
          审核: "项目发起人、关键利益相关者",
        },
      },
    },
    {
      id: "task-schedule-development",
      type: "task",
      position: { x: 300, y: 800 },
      data: {
        label: "进度计划",
        description: "制定项目进度计划",
        properties: {
          负责人: "项目经理",
          工具: "甘特图、关键路径法",
          输出: "项目进度计划",
        },
      },
    },
    {
      id: "task-resource-planning",
      type: "task",
      position: { x: 300, y: 950 },
      data: {
        label: "资源规划",
        description: "规划项目所需资源",
        properties: {
          负责人: "项目经理、资源经理",
          内容: "人力资源、设备、材料",
          输出: "资源管理计划",
        },
      },
    },
    {
      id: "task-budget-planning",
      type: "task",
      position: { x: 300, y: 1100 },
      data: {
        label: "预算规划",
        description: "制定项目预算",
        properties: {
          负责人: "项目经理、财务",
          方法: "自下而上估算、类比估算",
          输出: "项目预算",
        },
      },
    },
    {
      id: "task-risk-management",
      type: "task",
      position: { x: 300, y: 1250 },
      data: {
        label: "风险管理",
        description: "识别和规划风险应对",
        properties: {
          负责人: "项目经理、风险专员",
          内容: "风险识别、分析、应对策略",
          输出: "风险登记册",
        },
      },
    },
    {
      id: "task-quality-planning",
      type: "task",
      position: { x: 300, y: 1400 },
      data: {
        label: "质量规划",
        description: "制定质量管理计划",
        properties: {
          负责人: "质量经理",
          内容: "质量标准、保证措施、控制方法",
          输出: "质量管理计划",
        },
      },
    },
    {
      id: "task-communication-planning",
      type: "task",
      position: { x: 300, y: 1550 },
      data: {
        label: "沟通规划",
        description: "制定项目沟通计划",
        properties: {
          负责人: "项目经理",
          内容: "沟通方式、频率、受众",
          输出: "沟通管理计划",
        },
      },
    },
    {
      id: "condition-plan-approval",
      type: "condition",
      position: { x: 300, y: 1700 },
      data: {
        label: "计划审批",
        description: "项目计划审批",
        properties: {
          审批人: "项目发起人、指导委员会",
          标准: "完整性、可行性、资源可用性",
        },
      },
    },
    {
      id: "task-plan-revision",
      type: "task",
      position: { x: 500, y: 1850 },
      data: {
        label: "计划修订",
        description: "根据反馈修订项目计划",
        properties: {
          负责人: "项目经理",
          内容: "调整范围、进度、预算",
          时限: "5个工作日",
        },
      },
    },
    {
      id: "task-team-formation",
      type: "task",
      position: { x: 100, y: 1850 },
      data: {
        label: "团队组建",
        description: "组建项目团队",
        properties: {
          负责人: "项目经理、人力资源",
          内容: "团队招募、角色分配",
          输出: "项目团队名册",
        },
      },
    },
    {
      id: "task-kickoff-meeting",
      type: "task",
      position: { x: 100, y: 2000 },
      data: {
        label: "启动会议",
        description: "召开项目启动会议",
        properties: {
          负责人: "项目经理",
          参与者: "项目团队、关键利益相关者",
          内容: "项目目标、角色责任、时间表",
        },
      },
    },
    {
      id: "task-execution",
      type: "task",
      position: { x: 100, y: 2150 },
      data: {
        label: "项目执行",
        description: "执行项目计划",
        properties: {
          负责人: "项目团队",
          内容: "任务分配、工作执行、协调",
          工具: "项目管理软件",
        },
      },
    },
    {
      id: "task-monitoring-control",
      type: "task",
      position: { x: 100, y: 2300 },
      data: {
        label: "监控与控制",
        description: "监控项目进度和绩效",
        properties: {
          负责人: "项目经理",
          内容: "进度跟踪、成本控制、质量监控",
          频率: "每周更新",
        },
      },
    },
    {
      id: "condition-change-request",
      type: "condition",
      position: { x: 100, y: 2450 },
      data: {
        label: "变更请求",
        description: "处理项目变更请求",
        properties: {
          评估人: "变更控制委员会",
          标准: "影响分析、必要性",
        },
      },
    },
    {
      id: "task-change-implementation",
      type: "task",
      position: { x: 250, y: 2600 },
      data: {
        label: "实施变更",
        description: "实施批准的变更",
        properties: {
          负责人: "项目团队",
          内容: "更新计划、通知相关方",
          记录: "变更日志",
        },
      },
    },
    {
      id: "task-status-reporting",
      type: "task",
      position: { x: 100, y: 2750 },
      data: {
        label: "状态报告",
        description: "编制项目状态报告",
        properties: {
          负责人: "项目经理",
          内容: "进度、成本、风险、问题",
          频率: "每周/每月",
        },
      },
    },
    {
      id: "task-deliverable-acceptance",
      type: "task",
      position: { x: 100, y: 2900 },
      data: {
        label: "交付物验收",
        description: "验收项目交付物",
        properties: {
          负责人: "项目经理、客户",
          标准: "验收标准、质量要求",
          输出: "验收文档",
        },
      },
    },
    {
      id: "task-project-closure",
      type: "task",
      position: { x: 100, y: 3050 },
      data: {
        label: "项目收尾",
        description: "完成项目收尾工作",
        properties: {
          负责人: "项目经理",
          内容: "文档归档、资源释放、经验教训",
          输出: "项目总结报告",
        },
      },
    },
    {
      id: "end-node",
      type: "end",
      position: { x: 100, y: 3200 },
      data: { label: "项目完成" },
    },
  ],
  edges: [
    { id: "e1", source: "start-node", target: "task-project-charter", animated: true, type: "default" },
    { id: "e2", source: "task-project-charter", target: "task-stakeholder-analysis", animated: true, type: "default" },
    {
      id: "e3",
      source: "task-stakeholder-analysis",
      target: "task-requirements-gathering",
      animated: true,
      type: "default",
    },
    {
      id: "e4",
      source: "task-requirements-gathering",
      target: "task-scope-definition",
      animated: true,
      type: "default",
    },
    { id: "e5", source: "task-scope-definition", target: "task-schedule-development", animated: true, type: "default" },
    {
      id: "e6",
      source: "task-schedule-development",
      target: "task-resource-planning",
      animated: true,
      type: "default",
    },
    { id: "e7", source: "task-resource-planning", target: "task-budget-planning", animated: true, type: "default" },
    { id: "e8", source: "task-budget-planning", target: "task-risk-management", animated: true, type: "default" },
    { id: "e9", source: "task-risk-management", target: "task-quality-planning", animated: true, type: "default" },
    {
      id: "e10",
      source: "task-quality-planning",
      target: "task-communication-planning",
      animated: true,
      type: "default",
    },
    {
      id: "e11",
      source: "task-communication-planning",
      target: "condition-plan-approval",
      animated: true,
      type: "default",
    },
    {
      id: "e12",
      source: "condition-plan-approval",
      target: "task-team-formation",
      sourceHandle: "a",
      animated: true,
      type: "default",
      label: "通过",
    },
    {
      id: "e13",
      source: "condition-plan-approval",
      target: "task-plan-revision",
      sourceHandle: "b",
      animated: true,
      type: "default",
      label: "需修改",
    },
    { id: "e14", source: "task-plan-revision", target: "condition-plan-approval", animated: true, type: "default" },
    { id: "e15", source: "task-team-formation", target: "task-kickoff-meeting", animated: true, type: "default" },
    { id: "e16", source: "task-kickoff-meeting", target: "task-execution", animated: true, type: "default" },
    { id: "e17", source: "task-execution", target: "task-monitoring-control", animated: true, type: "default" },
    {
      id: "e18",
      source: "task-monitoring-control",
      target: "condition-change-request",
      animated: true,
      type: "default",
    },
    {
      id: "e19",
      source: "condition-change-request",
      target: "task-status-reporting",
      sourceHandle: "a",
      animated: true,
      type: "default",
      label: "无变更",
    },
    {
      id: "e20",
      source: "condition-change-request",
      target: "task-change-implementation",
      sourceHandle: "b",
      animated: true,
      type: "default",
      label: "有变更",
    },
    {
      id: "e21",
      source: "task-change-implementation",
      target: "task-monitoring-control",
      animated: true,
      type: "default",
    },
    {
      id: "e22",
      source: "task-status-reporting",
      target: "task-deliverable-acceptance",
      animated: true,
      type: "default",
    },
    {
      id: "e23",
      source: "task-deliverable-acceptance",
      target: "task-project-closure",
      animated: true,
      type: "default",
    },
    { id: "e24", source: "task-project-closure", target: "end-node", animated: true, type: "default" },
  ],
}

// 人力资源管理流程
export const hrManagementTemplate: WorkflowTemplate = {
  id: "hr-management",
  name: "人力资源管理流程",
  description: "员工招聘、培训、绩效管理的完整流程",
  category: "管理",
  nodes: [
    {
      id: "start-node",
      type: "start",
      position: { x: 300, y: 50 },
      data: { label: "开始HR流程" },
    },
    {
      id: "task-workforce-planning",
      type: "task",
      position: { x: 300, y: 200 },
      data: {
        label: "人力规划",
        description: "规划组织人力需求",
        properties: {
          负责人: "HR总监",
          内容: "人员需求预测、组织结构规划",
          周期: "年度规划",
        },
      },
    },
    {
      id: "task-job-analysis",
      type: "task",
      position: { x: 300, y: 350 },
      data: {
        label: "岗位分析",
        description: "分析岗位职责和要求",
        properties: {
          负责人: "HR经理",
          输出: "岗位说明书、任职资格",
          方法: "访谈、问卷、观察",
        },
      },
    },
    {
      id: "task-recruitment-planning",
      type: "task",
      position: { x: 300, y: 500 },
      data: {
        label: "招聘计划",
        description: "制定招聘策略和计划",
        properties: {
          负责人: "招聘经理",
          内容: "招聘渠道、时间表、预算",
          审批: "HR总监、部门负责人",
        },
      },
    },
    {
      id: "task-job-posting",
      type: "task",
      position: { x: 300, y: 650 },
      data: {
        label: "职位发布",
        description: "在各渠道发布职位信息",
        properties: {
          负责人: "招聘专员",
          渠道: "招聘网站、社交媒体、校园招聘",
          内容: "职位描述、要求、福利",
        },
      },
    },
    {
      id: "task-resume-screening",
      type: "task",
      position: { x: 300, y: 800 },
      data: {
        label: "简历筛选",
        description: "筛选应聘者简历",
        properties: {
          负责人: "招聘专员",
          标准: "教育背景、工作经验、技能匹配度",
          工具: "ATS系统、筛选表",
        },
      },
    },
    {
      id: "task-initial-interview",
      type: "task",
      position: { x: 300, y: 950 },
      data: {
        label: "初试",
        description: "进行初步面试",
        properties: {
          负责人: "HR面试官",
          内容: "基本情况、职业规划、软技能",
          方式: "电话/视频/现场",
        },
      },
    },
    {
      id: "condition-initial-result",
      type: "condition",
      position: { x: 300, y: 1100 },
      data: {
        label: "初试结果",
        description: "评估初试结果",
        properties: {
          评估人: "HR面试官",
          标准: "沟通能力、文化匹配度",
        },
      },
    },
    {
      id: "task-technical-interview",
      type: "task",
      position: { x: 100, y: 1250 },
      data: {
        label: "专业面试",
        description: "进行专业技能面试",
        properties: {
          负责人: "部门经理、技术专家",
          内容: "专业知识、技能测试、案例分析",
          方式: "现场/远程面试",
        },
      },
    },
    {
      id: "task-rejection-notification",
      type: "task",
      position: { x: 500, y: 1250 },
      data: {
        label: "拒绝通知",
        description: "通知未通过的候选人",
        properties: {
          负责人: "招聘专员",
          方式: "邮件/电话",
          内容: "感谢信、建议反馈",
        },
      },
    },
    {
      id: "condition-technical-result",
      type: "condition",
      position: { x: 100, y: 1400 },
      data: {
        label: "专业面试结果",
        description: "评估专业面试结果",
        properties: {
          评估人: "部门经理",
          标准: "专业能力、解决问题能力",
        },
      },
    },
    {
      id: "task-final-interview",
      type: "task",
      position: { x: 100, y: 1550 },
      data: {
        label: "终面",
        description: "进行最终面试",
        properties: {
          负责人: "高级管理层",
          内容: "综合评估、价值观匹配",
          方式: "现场面试",
        },
      },
    },
    {
      id: "condition-final-result",
      type: "condition",
      position: { x: 100, y: 1700 },
      data: {
        label: "终面结果",
        description: "评估终面结果",
        properties: {
          评估人: "高级管理层",
          标准: "综合素质、发展潜力",
        },
      },
    },
    {
      id: "task-offer-preparation",
      type: "task",
      position: { x: 100, y: 1850 },
      data: {
        label: "Offer准备",
        description: "准备录用通知书",
        properties: {
          负责人: "HR经理",
          内容: "薪资福利、入职日期、工作条件",
          审批: "部门负责人、HR总监",
        },
      },
    },
    {
      id: "task-background-check",
      type: "task",
      position: { x: 100, y: 2000 },
      data: {
        label: "背景调查",
        description: "进行背景调查",
        properties: {
          负责人: "HR专员",
          内容: "学历验证、工作经历、犯罪记录",
          方式: "第三方调查、电话核实",
        },
      },
    },
    {
      id: "condition-background-result",
      type: "condition",
      position: { x: 100, y: 2150 },
      data: {
        label: "背景调查结果",
        description: "评估背景调查结果",
        properties: {
          评估人: "HR经理",
          标准: "信息真实性、风险评估",
        },
      },
    },
    {
      id: "task-offer-issuance",
      type: "task",
      position: { x: 100, y: 2300 },
      data: {
        label: "发放Offer",
        description: "向候选人发放Offer",
        properties: {
          负责人: "HR专员",
          方式: "邮件/电话/面谈",
          内容: "正式录用通知书、入职须知",
        },
      },
    },
    {
      id: "condition-offer-acceptance",
      type: "condition",
      position: { x: 100, y: 2450 },
      data: {
        label: "Offer接受",
        description: "候选人是否接受Offer",
        properties: {
          跟进人: "HR专员",
          时限: "一周内",
        },
      },
    },
    {
      id: "task-onboarding-preparation",
      type: "task",
      position: { x: 100, y: 2600 },
      data: {
        label: "入职准备",
        description: "准备新员工入职",
        properties: {
          负责人: "HR专员、行政",
          内容: "工位准备、设备配置、入职材料",
          时间: "入职前一周",
        },
      },
    },
    {
      id: "task-onboarding",
      type: "task",
      position: { x: 100, y: 2750 },
      data: {
        label: "入职培训",
        description: "进行新员工入职培训",
        properties: {
          负责人: "HR培训师、部门导师",
          内容: "公司介绍、制度培训、岗位培训",
          周期: "1-2周",
        },
      },
    },
    {
      id: "task-probation-management",
      type: "task",
      position: { x: 100, y: 2900 },
      data: {
        label: "试用期管理",
        description: "管理员工试用期",
        properties: {
          负责人: "直属经理、HR",
          内容: "目标设定、定期反馈、评估",
          周期: "1-6个月",
        },
      },
    },
    {
      id: "condition-probation-result",
      type: "condition",
      position: { x: 100, y: 3050 },
      data: {
        label: "试用期评估",
        description: "评估试用期表现",
        properties: {
          评估人: "直属经理",
          标准: "工作表现、团队融入度",
        },
      },
    },
    {
      id: "task-formal-employment",
      type: "task",
      position: { x: 100, y: 3200 },
      data: {
        label: "转正",
        description: "办理员工转正",
        properties: {
          负责人: "HR专员",
          内容: "转正评估、薪资调整、档案更新",
          流程: "转正申请、审批、通知",
        },
      },
    },
    {
      id: "end-node",
      type: "end",
      position: { x: 100, y: 3350 },
      data: { label: "招聘流程完成" },
    },
  ],
  edges: [
    { id: "e1", source: "start-node", target: "task-workforce-planning", animated: true, type: "default" },
    { id: "e2", source: "task-workforce-planning", target: "task-job-analysis", animated: true, type: "default" },
    { id: "e3", source: "task-job-analysis", target: "task-recruitment-planning", animated: true, type: "default" },
    { id: "e4", source: "task-recruitment-planning", target: "task-job-posting", animated: true, type: "default" },
    { id: "e5", source: "task-job-posting", target: "task-resume-screening", animated: true, type: "default" },
    { id: "e6", source: "task-resume-screening", target: "task-initial-interview", animated: true, type: "default" },
    { id: "e7", source: "task-initial-interview", target: "condition-initial-result", animated: true, type: "default" },
    {
      id: "e8",
      source: "condition-initial-result",
      target: "task-technical-interview",
      sourceHandle: "a",
      animated: true,
      type: "default",
      label: "通过",
    },
    {
      id: "e9",
      source: "condition-initial-result",
      target: "task-rejection-notification",
      sourceHandle: "b",
      animated: true,
      type: "default",
      label: "不通过",
    },
    {
      id: "e10",
      source: "task-technical-interview",
      target: "condition-technical-result",
      animated: true,
      type: "default",
    },
    {
      id: "e11",
      source: "condition-technical-result",
      target: "task-final-interview",
      sourceHandle: "a",
      animated: true,
      type: "default",
      label: "通过",
    },
    {
      id: "e12",
      source: "condition-technical-result",
      target: "task-rejection-notification",
      sourceHandle: "b",
      animated: true,
      type: "default",
      label: "不通过",
    },
    { id: "e13", source: "task-final-interview", target: "condition-final-result", animated: true, type: "default" },
    {
      id: "e14",
      source: "condition-final-result",
      target: "task-offer-preparation",
      sourceHandle: "a",
      animated: true,
      type: "default",
      label: "通过",
    },
    {
      id: "e15",
      source: "condition-final-result",
      target: "task-rejection-notification",
      sourceHandle: "b",
      animated: true,
      type: "default",
      label: "不通过",
    },
    { id: "e16", source: "task-offer-preparation", target: "task-background-check", animated: true, type: "default" },
    {
      id: "e17",
      source: "task-background-check",
      target: "condition-background-result",
      animated: true,
      type: "default",
    },
    {
      id: "e18",
      source: "condition-background-result",
      target: "task-offer-issuance",
      sourceHandle: "a",
      animated: true,
      type: "default",
      label: "通过",
    },
    {
      id: "e19",
      source: "condition-background-result",
      target: "task-rejection-notification",
      sourceHandle: "b",
      animated: true,
      type: "default",
      label: "不通过",
    },
    { id: "e20", source: "task-offer-issuance", target: "condition-offer-acceptance", animated: true, type: "default" },
    {
      id: "e21",
      source: "condition-offer-acceptance",
      target: "task-onboarding-preparation",
      sourceHandle: "a",
      animated: true,
      type: "default",
      label: "接受",
    },
    { id: "e22", source: "task-onboarding-preparation", target: "task-onboarding", animated: true, type: "default" },
    { id: "e23", source: "task-onboarding", target: "task-probation-management", animated: true, type: "default" },
    {
      id: "e24",
      source: "task-probation-management",
      target: "condition-probation-result",
      animated: true,
      type: "default",
    },
    {
      id: "e25",
      source: "condition-probation-result",
      target: "task-formal-employment",
      sourceHandle: "a",
      animated: true,
      type: "default",
      label: "通过",
    },
    { id: "e26", source: "task-formal-employment", target: "end-node", animated: true, type: "default" },
  ],
}

// 风险管理流程
export const riskManagementTemplate: WorkflowTemplate = {
  id: "risk-management",
  name: "风险管理流程",
  description: "企业风险识别、评估和应对的完整流程",
  category: "管理",
  nodes: [
    {
      id: "start-node",
      type: "start",
      position: { x: 300, y: 50 },
      data: { label: "开始风险管理" },
    },
    {
      id: "task-risk-policy",
      type: "task",
      position: { x: 300, y: 200 },
      data: {
        label: "风险政策制定",
        description: "制定组织风险管理政策",
        properties: {
          负责人: "风险管理委员会",
          内容: "风险偏好、容忍度、管理框架",
          审批: "董事会",
        },
      },
    },
    {
      id: "task-context-establishment",
      type: "task",
      position: { x: 300, y: 350 },
      data: {
        label: "环境建立",
        description: "建立风险管理环境",
        properties: {
          负责人: "风险经理",
          内容: "内外部环境分析、范围确定",
          输出: "风险管理计划",
        },
      },
    },
    {
      id: "task-risk-identification",
      type: "task",
      position: { x: 300, y: 500 },
      data: {
        label: "风险识别",
        description: "识别潜在风险",
        properties: {
          负责人: "风险团队、业务部门",
          方法: "头脑风暴、访谈、核对表",
          输出: "风险清单",
        },
      },
    },
    {
      id: "task-risk-analysis",
      type: "task",
      position: { x: 300, y: 650 },
      data: {
        label: "风险分析",
        description: "分析风险概率和影响",
        properties: {
          负责人: "风险分析师",
          方法: "定性分析、定量分析",
          输出: "风险评估报告",
        },
      },
    },
    {
      id: "task-risk-evaluation",
      type: "task",
      position: { x: 300, y: 800 },
      data: {
        label: "风险评估",
        description: "评估风险等级和优先级",
        properties: {
          负责人: "风险经理",
          标准: "风险矩阵、风险评分",
          输出: "风险优先级列表",
        },
      },
    },
    {
      id: "condition-risk-level",
      type: "condition",
      position: { x: 300, y: 950 },
      data: {
        label: "风险等级判断",
        description: "判断风险等级",
        properties: {
          评估人: "风险委员会",
          标准: "风险评分标准",
        },
      },
    },
    {
      id: "task-high-risk-treatment",
      type: "task",
      position: { x: 100, y: 1100 },
      data: {
        label: "高风险应对",
        description: "制定高风险应对策略",
        properties: {
          负责人: "高级管理层、风险经理",
          策略: "规避、转移、减轻",
          输出: "详细应对计划",
        },
      },
    },
    {
      id: "task-medium-risk-treatment",
      type: "task",
      position: { x: 300, y: 1100 },
      data: {
        label: "中风险应对",
        description: "制定中风险应对策略",
        properties: {
          负责人: "部门经理、风险专员",
          策略: "减轻、分担",
          输出: "应对措施",
        },
      },
    },
    {
      id: "task-low-risk-treatment",
      type: "task",
      position: { x: 500, y: 1100 },
      data: {
        label: "低风险应对",
        description: "制定低风险应对策略",
        properties: {
          负责人: "风险专员",
          策略: "接受、监控",
          输出: "监控计划",
        },
      },
    },
    {
      id: "task-response-planning",
      type: "task",
      position: { x: 300, y: 1250 },
      data: {
        label: "应对计划制定",
        description: "制定详细风险应对计划",
        properties: {
          负责人: "风险经理、业务部门",
          内容: "应对措施、责任人、时间表、资源",
          审批: "风险委员会",
        },
      },
    },
    {
      id: "task-implementation",
      type: "task",
      position: { x: 300, y: 1400 },
      data: {
        label: "计划实施",
        description: "实施风险应对计划",
        properties: {
          负责人: "业务部门、风险专员",
          内容: "执行应对措施、资源分配",
          跟踪: "实施进度跟踪",
        },
      },
    },
    {
      id: "task-monitoring",
      type: "task",
      position: { x: 300, y: 1550 },
      data: {
        label: "风险监控",
        description: "持续监控风险状态",
        properties: {
          负责人: "风险监控团队",
          方法: "关键风险指标、预警系统",
          频率: "定期监控",
        },
      },
    },
    {
      id: "condition-risk-change",
      type: "condition",
      position: { x: 300, y: 1700 },
      data: {
        label: "风险变化",
        description: "评估风险状态是否变化",
        properties: {
          评估人: "风险专员",
          标准: "风险指标变化",
        },
      },
    },
    {
      id: "task-plan-adjustment",
      type: "task",
      position: { x: 500, y: 1850 },
      data: {
        label: "计划调整",
        description: "调整风险应对计划",
        properties: {
          负责人: "风险经理",
          内容: "更新应对措施、资源调整",
          审批: "风险委员会",
        },
      },
    },
    {
      id: "task-reporting",
      type: "task",
      position: { x: 300, y: 2000 },
      data: {
        label: "风险报告",
        description: "编制风险管理报告",
        properties: {
          负责人: "风险经理",
          内容: "风险状态、应对效果、新兴风险",
          频率: "月度/季度报告",
        },
      },
    },
    {
      id: "task-review",
      type: "task",
      position: { x: 300, y: 2150 },
      data: {
        label: "风险管理评审",
        description: "评审风险管理流程有效性",
        properties: {
          负责人: "风险委员会、内审",
          内容: "流程评估、改进建议",
          周期: "年度评审",
        },
      },
    },
    {
      id: "task-improvement",
      type: "task",
      position: { x: 300, y: 2300 },
      data: {
        label: "持续改进",
        description: "改进风险管理流程",
        properties: {
          负责人: "风险管理团队",
          内容: "流程优化、工具更新、培训",
          依据: "评审结果、最佳实践",
        },
      },
    },
    {
      id: "end-node",
      type: "end",
      position: { x: 300, y: 2450 },
      data: { label: "风险管理循环" },
    },
  ],
  edges: [
    { id: "e1", source: "start-node", target: "task-risk-policy", animated: true, type: "default" },
    { id: "e2", source: "task-risk-policy", target: "task-context-establishment", animated: true, type: "default" },
    {
      id: "e3",
      source: "task-context-establishment",
      target: "task-risk-identification",
      animated: true,
      type: "default",
    },
    { id: "e4", source: "task-risk-identification", target: "task-risk-analysis", animated: true, type: "default" },
    { id: "e5", source: "task-risk-analysis", target: "task-risk-evaluation", animated: true, type: "default" },
    { id: "e6", source: "task-risk-evaluation", target: "condition-risk-level", animated: true, type: "default" },
    {
      id: "e7",
      source: "condition-risk-level",
      target: "task-high-risk-treatment",
      sourceHandle: "a",
      animated: true,
      type: "default",
      label: "高风险",
    },
    {
      id: "e8",
      source: "condition-risk-level",
      target: "task-medium-risk-treatment",
      sourceHandle: "a",
      animated: true,
      type: "default",
      label: "中风险",
    },
    {
      id: "e9",
      source: "condition-risk-level",
      target: "task-low-risk-treatment",
      sourceHandle: "b",
      animated: true,
      type: "default",
      label: "低风险",
    },
    {
      id: "e10",
      source: "task-high-risk-treatment",
      target: "task-response-planning",
      animated: true,
      type: "default",
    },
    {
      id: "e11",
      source: "task-medium-risk-treatment",
      target: "task-response-planning",
      animated: true,
      type: "default",
    },
    { id: "e12", source: "task-low-risk-treatment", target: "task-response-planning", animated: true, type: "default" },
    { id: "e13", source: "task-response-planning", target: "task-implementation", animated: true, type: "default" },
    { id: "e14", source: "task-implementation", target: "task-monitoring", animated: true, type: "default" },
    { id: "e15", source: "task-monitoring", target: "condition-risk-change", animated: true, type: "default" },
    {
      id: "e16",
      source: "condition-risk-change",
      target: "task-reporting",
      sourceHandle: "a",
      animated: true,
      type: "default",
      label: "无显著变化",
    },
    {
      id: "e17",
      source: "condition-risk-change",
      target: "task-plan-adjustment",
      sourceHandle: "b",
      animated: true,
      type: "default",
      label: "风险变化",
    },
    { id: "e18", source: "task-plan-adjustment", target: "task-implementation", animated: true, type: "default" },
    { id: "e19", source: "task-reporting", target: "task-review", animated: true, type: "default" },
    { id: "e20", source: "task-review", target: "task-improvement", animated: true, type: "default" },
    { id: "e21", source: "task-improvement", target: "end-node", animated: true, type: "default" },
  ],
}

// 所有模板列表
export const workflowTemplates: WorkflowTemplate[] = [
  simpleSequentialTemplate,
  conditionalBranchingTemplate,
  approvalWorkflowTemplate,
  dataProcessingTemplate,
  userRegistrationTemplate,
  contentModerationTemplate,
  orderProcessingTemplate,
  cicdPipelineTemplate,
  microserviceArchitectureTemplate,
  agileDevProcessTemplate,
  databaseDesignTemplate,
  apiDesignTemplate,
  marketingCampaignTemplate,
  contentMarketingTemplate,
  socialMediaMarketingTemplate,
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
