import type { WorkflowTemplate } from "./index"

// CI/CD流水线流程
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

// 敏捷开发流程
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

// API设计流程
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

// 产品开发流程 - 从创意到上市
export const productDevelopmentTemplate: WorkflowTemplate = {
  id: "product-development",
  name: "产品开发流程",
  description: "从创意构思到产品上市的完整产品开发流程",
  category: "软件开发",
  nodes: [
    {
      id: "start-node",
      type: "start",
      position: { x: 300, y: 50 },
      data: { label: "开始产品开发" },
    },
    // 1. 创意和概念阶段
    {
      id: "task-ideation",
      type: "task",
      position: { x: 300, y: 150 },
      data: {
        label: "创意构思",
        description: "收集和生成产品创意",
        properties: {
          负责人: "产品团队、创新团队",
          方法: "头脑风暴、设计思维工作坊",
          输出: "创意列表、概念草图",
        },
      },
    },
    {
      id: "task-concept-development",
      type: "task",
      position: { x: 300, y: 250 },
      data: {
        label: "概念开发",
        description: "将创意转化为具体产品概念",
        properties: {
          负责人: "产品经理、设计师",
          内容: "产品愿景、价值主张、目标用户",
          输出: "产品概念文档",
        },
      },
    },
    // 2. 市场研究和可行性分析
    {
      id: "task-market-research",
      type: "task",
      position: { x: 300, y: 350 },
      data: {
        label: "市场研究",
        description: "分析市场需求和竞争情况",
        properties: {
          负责人: "市场团队",
          方法: "用户访谈、竞品分析、市场调查",
          输出: "市场研究报告",
        },
      },
    },
    {
      id: "task-feasibility-analysis",
      type: "task",
      position: { x: 300, y: 450 },
      data: {
        label: "可行性分析",
        description: "评估技术、商业和财务可行性",
        properties: {
          负责人: "产品经理、技术负责人、财务",
          内容: "技术评估、成本分析、ROI预测",
          输出: "可行性报告",
        },
      },
    },
    {
      id: "condition-go-no-go",
      type: "condition",
      position: { x: 300, y: 550 },
      data: {
        label: "立项决策",
        description: "基于可行性分析决定是否继续项目",
        properties: {
          决策者: "高级管理层",
          标准: "市场潜力、技术可行性、财务回报",
        },
      },
    },
    {
      id: "task-project-termination",
      type: "task",
      position: { x: 500, y: 650 },
      data: {
        label: "项目终止",
        description: "记录经验教训并终止项目",
        properties: {
          负责人: "产品经理",
          内容: "终止报告、经验总结",
          后续: "创意归档或重新评估",
        },
      },
    },
    // 3. 产品规划和需求定义
    {
      id: "task-product-planning",
      type: "task",
      position: { x: 150, y: 650 },
      data: {
        label: "产品规划",
        description: "制定产品路线图和发布计划",
        properties: {
          负责人: "产品经理",
          内容: "产品愿景、目标、里程碑",
          输出: "产品路线图",
        },
      },
    },
    {
      id: "task-requirements-gathering",
      type: "task",
      position: { x: 150, y: 750 },
      data: {
        label: "需求收集",
        description: "收集和分析用户需求",
        properties: {
          负责人: "产品经理、业务分析师",
          方法: "用户故事、用例、用户旅程",
          输出: "需求文档、用户故事",
        },
      },
    },
    {
      id: "task-product-spec",
      type: "task",
      position: { x: 150, y: 850 },
      data: {
        label: "产品规格定义",
        description: "定义详细的产品规格和功能",
        properties: {
          负责人: "产品经理、技术团队",
          内容: "功能列表、技术规格、验收标准",
          输出: "产品规格文档(PRD)",
        },
      },
    },
    // 4. 设计阶段
    {
      id: "task-ux-design",
      type: "task",
      position: { x: 150, y: 950 },
      data: {
        label: "用户体验设计",
        description: "设计产品的用户体验和交互",
        properties: {
          负责人: "UX设计师",
          内容: "用户流程、信息架构、交互设计",
          输出: "用户流程图、线框图",
        },
      },
    },
    {
      id: "task-ui-design",
      type: "task",
      position: { x: 150, y: 1050 },
      data: {
        label: "用户界面设计",
        description: "设计产品的视觉界面",
        properties: {
          负责人: "UI设计师",
          内容: "视觉设计、品牌应用、设计系统",
          输出: "UI设计稿、设计规范",
        },
      },
    },
    {
      id: "task-prototype",
      type: "task",
      position: { x: 150, y: 1150 },
      data: {
        label: "原型开发",
        description: "创建产品的交互原型",
        properties: {
          负责人: "设计师、前端开发",
          工具: "Figma/Sketch/Adobe XD",
          输出: "交互原型",
        },
      },
    },
    {
      id: "task-user-testing",
      type: "task",
      position: { x: 150, y: 1250 },
      data: {
        label: "用户测试",
        description: "通过原型进行早期用户测试",
        properties: {
          负责人: "UX研究员",
          方法: "可用性测试、A/B测试",
          输出: "用户反馈报告",
        },
      },
    },
    {
      id: "condition-design-approval",
      type: "condition",
      position: { x: 150, y: 1350 },
      data: {
        label: "设计评审",
        description: "评审设计是否满足需求",
        properties: {
          评审人: "产品经理、利益相关者",
          标准: "用户体验、品牌一致性、技术可行性",
        },
      },
    },
    {
      id: "task-design-revision",
      type: "task",
      position: { x: 300, y: 1450 },
      data: {
        label: "设计修改",
        description: "根据反馈修改设计",
        properties: {
          负责人: "设计团队",
          内容: "迭代设计、解决问题",
          输出: "修订后的设计",
        },
      },
    },
    // 5. 开发/制造阶段
    {
      id: "task-development-planning",
      type: "task",
      position: { x: 150, y: 1550 },
      data: {
        label: "开发规划",
        description: "规划开发工作和资源分配",
        properties: {
          负责人: "技术负责人、项目经理",
          内容: "技术架构、任务分解、团队组建",
          输出: "开发计划、架构文档",
        },
      },
    },
    {
      id: "task-development",
      type: "task",
      position: { x: 150, y: 1650 },
      data: {
        label: "产品开发",
        description: "进行产品的实际开发或制造",
        properties: {
          负责人: "开发团队",
          方法: "敏捷开发/精益制造",
          输出: "产品代码/实体产品",
        },
      },
    },
    // 6. 测试和质量保证
    {
      id: "task-testing",
      type: "task",
      position: { x: 150, y: 1750 },
      data: {
        label: "测试与QA",
        description: "进行全面的产品测试",
        properties: {
          负责人: "QA团队",
          内容: "功能测试、性能测试、安全测试",
          输出: "测试报告、缺陷列表",
        },
      },
    },
    {
      id: "condition-quality-gate",
      type: "condition",
      position: { x: 150, y: 1850 },
      data: {
        label: "质量评估",
        description: "评估产品是否达到质量标准",
        properties: {
          评估人: "QA负责人",
          标准: "缺陷数量、性能指标、用户体验",
        },
      },
    },
    {
      id: "task-bug-fixing",
      type: "task",
      position: { x: 300, y: 1950 },
      data: {
        label: "缺陷修复",
        description: "修复测试中发现的问题",
        properties: {
          负责人: "开发团队",
          优先级: "按严重程度排序",
          输出: "修复后的产品版本",
        },
      },
    },
    // 7. 上市准备
    {
      id: "task-beta-release",
      type: "task",
      position: { x: 150, y: 2050 },
      data: {
        label: "Beta版发布",
        description: "向有限用户发布测试版",
        properties: {
          负责人: "产品经理、市场团队",
          范围: "内部用户、早期采用者",
          目的: "收集真实用户反馈",
        },
      },
    },
    {
      id: "task-feedback-collection",
      type: "task",
      position: { x: 150, y: 2150 },
      data: {
        label: "反馈收集",
        description: "收集和分析Beta测试反馈",
        properties: {
          负责人: "产品经理、UX研究员",
          方法: "用户调查、使用数据分析",
          输出: "用户反馈报告",
        },
      },
    },
    {
      id: "task-final-adjustments",
      type: "task",
      position: { x: 150, y: 2250 },
      data: {
        label: "最终调整",
        description: "根据Beta测试反馈进行最终调整",
        properties: {
          负责人: "开发团队、设计团队",
          范围: "关键问题修复、体验优化",
          输出: "发布候选版本",
        },
      },
    },
    {
      id: "task-marketing-preparation",
      type: "task",
      position: { x: 150, y: 2350 },
      data: {
        label: "营销准备",
        description: "准备产品营销和推广材料",
        properties: {
          负责人: "市场团队",
          内容: "营销信息、宣传材料、发布计划",
          输出: "营销资料包",
        },
      },
    },
    {
      id: "task-sales-preparation",
      type: "task",
      position: { x: 150, y: 2450 },
      data: {
        label: "销售准备",
        description: "准备销售渠道和销售团队",
        properties: {
          负责人: "销售团队",
          内容: "销售培训、渠道建设、定价策略",
          输出: "销售就绪报告",
        },
      },
    },
    {
      id: "task-support-preparation",
      type: "task",
      position: { x: 150, y: 2550 },
      data: {
        label: "支持准备",
        description: "准备客户支持和服务",
        properties: {
          负责人: "客户支持团队",
          内容: "支持文档、培训材料、支持流程",
          输出: "支持就绪报告",
        },
      },
    },
    // 8. 产品发布
    {
      id: "condition-launch-approval",
      type: "condition",
      position: { x: 150, y: 2650 },
      data: {
        label: "发布审批",
        description: "最终决定是否发布产品",
        properties: {
          决策者: "高级管理层",
          标准: "产品质量、市场准备、业务目标",
        },
      },
    },
    {
      id: "task-launch-delay",
      type: "task",
      position: { x: 300, y: 2750 },
      data: {
        label: "发布延期",
        description: "推迟发布并解决关键问题",
        properties: {
          负责人: "产品经理、项目经理",
          内容: "问题解决、重新计划",
          输出: "修订后的发布计划",
        },
      },
    },
    {
      id: "task-product-launch",
      type: "task",
      position: { x: 150, y: 2850 },
      data: {
        label: "产品发布",
        description: "正式向市场发布产品",
        properties: {
          负责人: "产品团队、市场团队",
          内容: "发布活动、公告、渠道铺货",
          输出: "已发布产品",
        },
      },
    },
    // 9. 上市后评估
    {
      id: "task-post-launch-monitoring",
      type: "task",
      position: { x: 150, y: 2950 },
      data: {
        label: "上市监控",
        description: "监控产品上市后的表现",
        properties: {
          负责人: "产品经理、数据分析师",
          指标: "销售数据、用户采用率、客户反馈",
          频率: "每日/每周报告",
        },
      },
    },
    {
      id: "task-post-launch-optimization",
      type: "task",
      position: { x: 150, y: 3050 },
      data: {
        label: "上市优化",
        description: "基于初期数据进行产品和营销优化",
        properties: {
          负责人: "产品团队、市场团队",
          内容: "快速迭代、问题修复、营销调整",
          时间框架: "发布后1-3个月",
        },
      },
    },
    {
      id: "task-retrospective",
      type: "task",
      position: { x: 150, y: 3150 },
      data: {
        label: "项目回顾",
        description: "回顾整个产品开发过程",
        properties: {
          负责人: "产品经理、项目经理",
          内容: "成功经验、改进机会、经验教训",
          输出: "项目回顾报告",
        },
      },
    },
    {
      id: "end-node",
      type: "end",
      position: { x: 150, y: 3250 },
      data: { label: "产品开发完成" },
    },
  ],
  edges: [
    // 连接开始节点到创意阶段
    { id: "e1", source: "start-node", target: "task-ideation", animated: true, type: "default" },

    // 创意和概念阶段
    { id: "e2", source: "task-ideation", target: "task-concept-development", animated: true, type: "default" },

    // 市场研究和可行性分析
    { id: "e3", source: "task-concept-development", target: "task-market-research", animated: true, type: "default" },
    { id: "e4", source: "task-market-research", target: "task-feasibility-analysis", animated: true, type: "default" },
    { id: "e5", source: "task-feasibility-analysis", target: "condition-go-no-go", animated: true, type: "default" },

    // 立项决策分支
    {
      id: "e6",
      source: "condition-go-no-go",
      target: "task-project-termination",
      sourceHandle: "b",
      animated: true,
      type: "default",
      label: "不通过",
    },
    {
      id: "e7",
      source: "condition-go-no-go",
      target: "task-product-planning",
      sourceHandle: "a",
      animated: true,
      type: "default",
      label: "通过",
    },

    // 产品规划和需求定义
    {
      id: "e8",
      source: "task-product-planning",
      target: "task-requirements-gathering",
      animated: true,
      type: "default",
    },
    { id: "e9", source: "task-requirements-gathering", target: "task-product-spec", animated: true, type: "default" },

    // 设计阶段
    { id: "e10", source: "task-product-spec", target: "task-ux-design", animated: true, type: "default" },
    { id: "e11", source: "task-ux-design", target: "task-ui-design", animated: true, type: "default" },
    { id: "e12", source: "task-ui-design", target: "task-prototype", animated: true, type: "default" },
    { id: "e13", source: "task-prototype", target: "task-user-testing", animated: true, type: "default" },
    { id: "e14", source: "task-user-testing", target: "condition-design-approval", animated: true, type: "default" },

    // 设计评审分支
    {
      id: "e15",
      source: "condition-design-approval",
      target: "task-design-revision",
      sourceHandle: "b",
      animated: true,
      type: "default",
      label: "需修改",
    },
    { id: "e16", source: "task-design-revision", target: "task-user-testing", animated: true, type: "default" },
    {
      id: "e17",
      source: "condition-design-approval",
      target: "task-development-planning",
      sourceHandle: "a",
      animated: true,
      type: "default",
      label: "通过",
    },

    // 开发阶段
    { id: "e18", source: "task-development-planning", target: "task-development", animated: true, type: "default" },

    // 测试和质量保证
    { id: "e19", source: "task-development", target: "task-testing", animated: true, type: "default" },
    { id: "e20", source: "task-testing", target: "condition-quality-gate", animated: true, type: "default" },

    // 质量评估分支
    {
      id: "e21",
      source: "condition-quality-gate",
      target: "task-bug-fixing",
      sourceHandle: "b",
      animated: true,
      type: "default",
      label: "不通过",
    },
    { id: "e22", source: "task-bug-fixing", target: "task-testing", animated: true, type: "default" },
    {
      id: "e23",
      source: "condition-quality-gate",
      target: "task-beta-release",
      sourceHandle: "a",
      animated: true,
      type: "default",
      label: "通过",
    },

    // 上市准备
    { id: "e24", source: "task-beta-release", target: "task-feedback-collection", animated: true, type: "default" },
    {
      id: "e25",
      source: "task-feedback-collection",
      target: "task-final-adjustments",
      animated: true,
      type: "default",
    },
    {
      id: "e26",
      source: "task-final-adjustments",
      target: "task-marketing-preparation",
      animated: true,
      type: "default",
    },
    {
      id: "e27",
      source: "task-marketing-preparation",
      target: "task-sales-preparation",
      animated: true,
      type: "default",
    },
    {
      id: "e28",
      source: "task-sales-preparation",
      target: "task-support-preparation",
      animated: true,
      type: "default",
    },

    // 产品发布
    {
      id: "e29",
      source: "task-support-preparation",
      target: "condition-launch-approval",
      animated: true,
      type: "default",
    },

    // 发布审批分支
    {
      id: "e30",
      source: "condition-launch-approval",
      target: "task-launch-delay",
      sourceHandle: "b",
      animated: true,
      type: "default",
      label: "不通过",
    },
    { id: "e31", source: "task-launch-delay", target: "condition-launch-approval", animated: true, type: "default" },
    {
      id: "e32",
      source: "condition-launch-approval",
      target: "task-product-launch",
      sourceHandle: "a",
      animated: true,
      type: "default",
      label: "通过",
    },

    // 上市后评估
    {
      id: "e33",
      source: "task-product-launch",
      target: "task-post-launch-monitoring",
      animated: true,
      type: "default",
    },
    {
      id: "e34",
      source: "task-post-launch-monitoring",
      target: "task-post-launch-optimization",
      animated: true,
      type: "default",
    },
    {
      id: "e35",
      source: "task-post-launch-optimization",
      target: "task-retrospective",
      animated: true,
      type: "default",
    },
    { id: "e36", source: "task-retrospective", target: "end-node", animated: true, type: "default" },
  ],
}
