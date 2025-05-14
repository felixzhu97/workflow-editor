import type { WorkflowTemplate } from "@/components/templates/types"

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
          形式: "信息流广告、���键词广告、KOL合作",
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
