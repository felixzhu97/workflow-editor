import type { WorkflowTemplate } from "./index"

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

// 支付处理流程
export const paymentProcessingTemplate: WorkflowTemplate = {
  id: "payment-processing",
  name: "支付处理流程",
  description: "完整的在线支付处理流程，包括多种支付方式和异常处理",
  category: "互联网",
  nodes: [
    {
      id: "start-node",
      type: "start",
      position: { x: 250, y: 50 },
      data: { label: "开始支付" },
    },
    {
      id: "payment-init",
      type: "task",
      position: { x: 250, y: 150 },
      data: {
        label: "支付初始化",
        description: "创建支付订单并初始化支付环境",
        properties: {
          处理人: "系统",
          超时时间: "30秒",
        },
      },
    },
    {
      id: "payment-method",
      type: "condition",
      position: { x: 250, y: 250 },
      data: {
        label: "支付方式选择",
        description: "用户选择支付方式",
        properties: {
          条件: "支付方式",
        },
      },
    },
    {
      id: "third-party-payment",
      type: "task",
      position: { x: 100, y: 350 },
      data: {
        label: "第三方支付",
        description: "重定向到第三方支付页面",
        properties: {
          处理人: "系统",
          支付方式: "支付宝/微信/银联",
        },
      },
    },
    {
      id: "direct-payment",
      type: "task",
      position: { x: 400, y: 350 },
      data: {
        label: "平台内支付",
        description: "使用平台钱包余额支付",
        properties: {
          处理人: "系统",
          支付方式: "余额/积分",
        },
      },
    },
    {
      id: "payment-callback",
      type: "task",
      position: { x: 100, y: 450 },
      data: {
        label: "支付回调",
        description: "接收第三方支付回调",
        properties: {
          处理人: "系统",
          超时时间: "5分钟",
        },
      },
    },
    {
      id: "payment-verification",
      type: "task",
      position: { x: 250, y: 550 },
      data: {
        label: "支付验证",
        description: "验证支付结果",
        properties: {
          处理人: "系统",
          验证方式: "签名验证/订单匹配",
        },
      },
    },
    {
      id: "payment-result",
      type: "condition",
      position: { x: 250, y: 650 },
      data: {
        label: "支付结果",
        description: "判断支付是否成功",
        properties: {
          条件: "支付状态",
        },
      },
    },
    {
      id: "payment-success",
      type: "task",
      position: { x: 100, y: 750 },
      data: {
        label: "支付成功处理",
        description: "更新订单状态并通知用户",
        properties: {
          处理人: "系统",
          通知方式: "消息/邮件",
        },
      },
    },
    {
      id: "payment-failure",
      type: "task",
      position: { x: 400, y: 750 },
      data: {
        label: "支付失败处理",
        description: "记录失败原因并通知用户",
        properties: {
          处理人: "系统",
          通知方式: "消息/邮件",
        },
      },
    },
    {
      id: "refund-check",
      type: "condition",
      position: { x: 400, y: 850 },
      data: {
        label: "退款检查",
        description: "检查是否需要退款",
        properties: {
          条件: "是否已扣款",
        },
      },
    },
    {
      id: "refund-process",
      type: "task",
      position: { x: 550, y: 950 },
      data: {
        label: "退款处理",
        description: "处理退款流程",
        properties: {
          处理人: "系统",
          退款方式: "原路退回",
        },
      },
    },
    {
      id: "payment-record",
      type: "task",
      position: { x: 250, y: 1050 },
      data: {
        label: "支付记录",
        description: "记录支付流水并进行数据分析",
        properties: {
          处理人: "系统",
          记录内容: "交易ID/金额/时间/状态",
        },
      },
    },
    {
      id: "end-node",
      type: "end",
      position: { x: 250, y: 1150 },
      data: { label: "支付完成" },
    },
  ],
  edges: [
    {
      id: "e1",
      source: "start-node",
      target: "payment-init",
      animated: true,
      type: "default",
    },
    {
      id: "e2",
      source: "payment-init",
      target: "payment-method",
      animated: true,
      type: "default",
    },
    {
      id: "e3",
      source: "payment-method",
      target: "third-party-payment",
      sourceHandle: "a",
      animated: true,
      type: "default",
      label: "第三方",
    },
    {
      id: "e4",
      source: "payment-method",
      target: "direct-payment",
      sourceHandle: "b",
      animated: true,
      type: "default",
      label: "平台内",
    },
    {
      id: "e5",
      source: "third-party-payment",
      target: "payment-callback",
      animated: true,
      type: "default",
    },
    {
      id: "e6",
      source: "payment-callback",
      target: "payment-verification",
      animated: true,
      type: "default",
    },
    {
      id: "e7",
      source: "direct-payment",
      target: "payment-verification",
      animated: true,
      type: "default",
    },
    {
      id: "e8",
      source: "payment-verification",
      target: "payment-result",
      animated: true,
      type: "default",
    },
    {
      id: "e9",
      source: "payment-result",
      target: "payment-success",
      sourceHandle: "a",
      animated: true,
      type: "default",
      label: "成功",
    },
    {
      id: "e10",
      source: "payment-result",
      target: "payment-failure",
      sourceHandle: "b",
      animated: true,
      type: "default",
      label: "失败",
    },
    {
      id: "e11",
      source: "payment-failure",
      target: "refund-check",
      animated: true,
      type: "default",
    },
    {
      id: "e12",
      source: "refund-check",
      target: "refund-process",
      sourceHandle: "a",
      animated: true,
      type: "default",
      label: "需要退款",
    },
    {
      id: "e13",
      source: "refund-check",
      target: "payment-record",
      sourceHandle: "b",
      animated: true,
      type: "default",
      label: "无需退款",
    },
    {
      id: "e14",
      source: "payment-success",
      target: "payment-record",
      animated: true,
      type: "default",
    },
    {
      id: "e15",
      source: "refund-process",
      target: "payment-record",
      animated: true,
      type: "default",
    },
    {
      id: "e16",
      source: "payment-record",
      target: "end-node",
      animated: true,
      type: "default",
    },
  ],
}
