import type { Node, Edge } from "reactflow"

// 工作流模板接口
export interface WorkflowTemplate {
  id: string
  name: string
  description: string
  nodes: Node[]
  edges: Edge[]
  category: "基础" | "审批" | "数据处理" | "高级" | "互联网" | "软件开发" | "系统架构"
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
        label: "测试结果",
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
