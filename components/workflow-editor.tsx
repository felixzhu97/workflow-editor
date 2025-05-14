"use client"

import type React from "react"

import { useState, useCallback, useRef } from "react"
import ReactFlow, {
  ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
  type Edge,
  type Node,
  type NodeTypes,
  type EdgeTypes,
  Panel,
} from "reactflow"
import "reactflow/dist/style.css"
import { NodeSidebar } from "./node-sidebar"
import { TaskNode } from "./nodes/task-node"
import { ConditionNode } from "./nodes/condition-node"
import { StartNode } from "./nodes/start-node"
import { EndNode } from "./nodes/end-node"
import { CustomEdge } from "./custom-edge"
import { Save, Trash2, FileIcon as FileTemplate, LayoutGrid } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NodeEditDialog } from "./node-edit-dialog"
import { ExportDropdown } from "./export-dropdown"
import { ImportDialog } from "./import-dialog"
import { TemplateDialog } from "./templates/template-dialog"
import { LayoutOptionsDialog } from "./layout-options-dialog"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import { LayoutAlgorithms, type LayoutOptions, defaultLayoutOptions } from "@/utils/layout-algorithms"

// 定义节点类型
const nodeTypes: NodeTypes = {
  task: TaskNode,
  condition: ConditionNode,
  start: StartNode,
  end: EndNode,
}

// 定义边类型
const edgeTypes: EdgeTypes = {
  default: CustomEdge,
}

// 初始节点
const initialNodes: Node[] = [
  {
    id: "1",
    type: "start",
    data: { label: "开始" },
    position: { x: 250, y: 50 },
  },
]

// 内部工作流编辑器组件
function WorkflowEditorInner() {
  const { toast } = useToast()
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null)

  // 节点编辑状态
  const [editingNode, setEditingNode] = useState<Node | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  // 模板对话框状态
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false)

  // 布局选项对话框状态
  const [isLayoutDialogOpen, setIsLayoutDialogOpen] = useState(false)
  const [layoutOptions, setLayoutOptions] = useState<LayoutOptions>(defaultLayoutOptions)

  // 处理连接线的创建
  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge({ ...params, animated: true, type: "default" }, eds)),
    [setEdges],
  )

  // 处理从侧边栏拖拽到画布
  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }, [])

  // 处理拖拽释放
  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect()
      const type = event.dataTransfer.getData("application/reactflow")

      // 检查是否有效的拖拽数据
      if (typeof type === "undefined" || !type || !reactFlowInstance || !reactFlowBounds) {
        return
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      })

      // 根据类型创建不同的节点
      const newNode: Node = {
        id: `${Date.now()}`,
        type,
        position,
        data: {
          label: `${type === "task" ? "任务" : type === "condition" ? "条件" : type === "end" ? "结束" : "节点"}`,
          description: "",
          properties: {},
        },
      }

      // 查找最近的节点，确保新节点不会与现有节点重叠
      const nearestNode = findNearestNode(position, nodes)
      if (nearestNode && calculateDistance(position, nearestNode.position) < 200) {
        // 如果新节点太靠近现有节点，调整其位置
        position.y += 250
      }

      setNodes((nds) => nds.concat(newNode))
    },
    [reactFlowInstance, setNodes, nodes],
  )

  // 清空画布
  const onClear = useCallback(() => {
    const startNode = nodes.find((node) => node.type === "start")
    if (startNode) {
      setNodes([startNode])
    } else {
      setNodes([])
    }
    setEdges([])
  }, [nodes, setNodes, setEdges])

  // 保存工作流
  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject()
      alert("工作流已保存到控制台")
      console.log(flow)
    }
  }, [reactFlowInstance])

  // 处理节点双击事件
  const onNodeDoubleClick = useCallback((event: React.MouseEvent, node: Node) => {
    setEditingNode(node)
    setIsEditDialogOpen(true)
  }, [])

  // 保存节点编辑
  const handleSaveNodeEdit = useCallback(
    (nodeId: string, data: any) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: {
                ...data,
              },
            }
          }
          return node
        }),
      )
    },
    [setNodes],
  )

  // 获取工作流数据（用于导出）
  const getWorkflowData = useCallback(() => {
    if (reactFlowInstance) {
      return reactFlowInstance.toObject()
    }
    return { nodes, edges }
  }, [reactFlowInstance, nodes, edges])

  // 导入工作流数据
  const handleImportWorkflow = useCallback(
    (flowData: any) => {
      try {
        if (reactFlowInstance) {
          // 确保节点类型正确
          const validatedNodes = flowData.nodes.map((node: any) => {
            // 确保节点有有效的类型
            if (!node.type || !["task", "condition", "start", "end"].includes(node.type)) {
              node.type = "task" // 默认为任务节点
            }

            // 确保节点有有效的数据结构
            if (!node.data) {
              node.data = { label: "未命名节点" }
            } else if (!node.data.label) {
              node.data.label = "未命名节点"
            }

            // 确保节点有属性字段
            if (!node.data.properties) {
              node.data.properties = {}
            }

            return node
          })

          // 确保边有正确的类型
          const validatedEdges = (flowData.edges || []).map((edge: Edge) => ({
            ...edge,
            type: "default",
            animated: edge.animated !== false, // 默认为true
          }))

          // 设置节点和边
          setNodes(validatedNodes)
          setEdges(validatedEdges)

          // 调整视图以适应所有节点
          setTimeout(() => {
            reactFlowInstance.fitView({ padding: 0.2 })
          }, 50)
        }
      } catch (error) {
        console.error("导入工作流时出错:", error)
      }
    },
    [reactFlowInstance, setNodes, setEdges],
  )

  // 处理模板选择
  const handleSelectTemplate = useCallback(
    (template: any) => {
      try {
        // 确保边有正确的类型
        const templateEdges = template.edges.map((edge: Edge) => ({
          ...edge,
          type: "default",
          animated: edge.animated !== false, // 默认为true
        }))

        // 加载模板中的节点和边
        setNodes(template.nodes)
        setEdges(templateEdges)

        // 调整视图以适应所有节点
        setTimeout(() => {
          if (reactFlowInstance) {
            reactFlowInstance.fitView({ padding: 0.2 })
          }
        }, 50)

        toast({
          title: "模板加载成功",
          description: `已加载"${template.name}"模板`,
        })
      } catch (error) {
        console.error("加载模板时出错:", error)
        toast({
          title: "模板加载失败",
          description: "无法加载所选模板，请重试",
          variant: "destructive",
        })
      }
    },
    [reactFlowInstance, setNodes, setEdges, toast],
  )

  // 应用布局
  const applyLayout = useCallback(
    (options: LayoutOptions) => {
      if (nodes.length === 0) return

      try {
        // 应用布局算法
        const newNodes = LayoutAlgorithms.applyLayout([...nodes], [...edges], options)

        // 更新节点位置
        setNodes(newNodes)

        // 保存布局选项
        setLayoutOptions(options)

        // 调整视图以适应所有节点
        setTimeout(() => {
          if (reactFlowInstance) {
            reactFlowInstance.fitView({ padding: 0.2 })
          }
        }, 50)

        toast({
          title: "布局应用成功",
          description: `已应用${getLayoutTypeName(options.type)}布局`,
        })
      } catch (error) {
        console.error("应用布局时出错:", error)
        toast({
          title: "布局应用失败",
          description: "无法应用所选布局，请重试",
          variant: "destructive",
        })
      }
    },
    [nodes, edges, setNodes, reactFlowInstance, toast],
  )

  // 获取布局类型名称
  const getLayoutTypeName = (type: string): string => {
    switch (type) {
      case "hierarchical":
        return "分层"
      case "horizontal":
        return "水平"
      case "vertical":
        return "垂直"
      case "force":
        return "力导向"
      case "radial":
        return "放射状"
      default:
        return "自动"
    }
  }

  // 计算两点之间的距离
  const calculateDistance = (pos1: { x: number; y: number }, pos2: { x: number; y: number }) => {
    return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2))
  }

  // 找到最近的节点
  const findNearestNode = (position: { x: number; y: number }, nodeList: Node[]) => {
    if (nodeList.length === 0) return null

    let nearestNode = nodeList[0]
    let minDistance = calculateDistance(position, nodeList[0].position)

    for (let i = 1; i < nodeList.length; i++) {
      const distance = calculateDistance(position, nodeList[i].position)
      if (distance < minDistance) {
        minDistance = distance
        nearestNode = nodeList[i]
      }
    }

    return nearestNode
  }

  return (
    <div className="flex h-[calc(100vh-73px)]">
      <NodeSidebar onOpenTemplates={() => setIsTemplateDialogOpen(true)} />
      <div className="flex-1" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodeDoubleClick={onNodeDoubleClick}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          defaultEdgeOptions={{ type: "default" }}
          fitView
          defaultViewport={{ x: 0, y: 0, zoom: 0.7 }} // 默认缩小视图以显示更多内容
          minZoom={0.2} // 允许更小的缩放以查看全局
          maxZoom={2} // 限制最大缩放
          nodesDraggable={true}
          elementsSelectable={true}
          snapToGrid={true}
          snapGrid={[20, 20]} // 设置网格对齐
        >
          <Controls />
          <MiniMap />
          <Background gap={12} size={1} />
          <Panel position="top-right">
            <div className="flex gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsTemplateDialogOpen(true)}
                className="min-w-24 flex items-center justify-center"
              >
                <FileTemplate className="mr-2 h-4 w-4" />
                模板
              </Button>
              <ImportDialog onImport={handleImportWorkflow} />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsLayoutDialogOpen(true)}
                className="min-w-24 flex items-center justify-center"
              >
                <LayoutGrid className="mr-2 h-4 w-4" />
                自动布局
              </Button>
              <Button variant="outline" size="sm" onClick={onClear} className="min-w-24">
                <Trash2 className="mr-2 h-4 w-4" />
                清空
              </Button>
              <Button size="sm" onClick={onSave} className="min-w-24">
                <Save className="mr-2 h-4 w-4" />
                保存
              </Button>
              <ExportDropdown getWorkflowData={getWorkflowData} screenshotRef={reactFlowWrapper} />
            </div>
          </Panel>
        </ReactFlow>
      </div>

      {/* 节点编辑对话框 */}
      <NodeEditDialog
        node={editingNode}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSave={handleSaveNodeEdit}
      />

      {/* 模板选择对话框 */}
      <TemplateDialog
        open={isTemplateDialogOpen}
        onOpenChange={setIsTemplateDialogOpen}
        onSelectTemplate={handleSelectTemplate}
      />

      {/* 布局选项对话框 */}
      <LayoutOptionsDialog
        open={isLayoutDialogOpen}
        onOpenChange={setIsLayoutDialogOpen}
        onApply={applyLayout}
        initialOptions={layoutOptions}
      />

      {/* Toast通知 */}
      <Toaster />
    </div>
  )
}

// 导出带有ReactFlow Provider的组件
export function WorkflowEditor() {
  return (
    <ReactFlowProvider>
      <WorkflowEditorInner />
    </ReactFlowProvider>
  )
}
