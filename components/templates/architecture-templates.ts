import type { WorkflowTemplate } from "@/components/templates/types"

// 微服务架构设计
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

// 数据库设计流程
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
