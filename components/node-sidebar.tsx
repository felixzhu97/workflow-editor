"use client"

import type React from "react"

import { Activity, GitBranch, Square, FileJson, ImageIcon, Upload, FileIcon as FileTemplate } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

interface NodeSidebarProps {
  onOpenTemplates?: () => void
}

export function NodeSidebar({ onOpenTemplates }: NodeSidebarProps) {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType)
    event.dataTransfer.effectAllowed = "move"
  }

  return (
    <aside className="w-64 border-r bg-muted/40 p-4">
      <h3 className="mb-4 text-lg font-semibold">节点类型</h3>
      <div className="space-y-3">
        <div
          className="flex cursor-grab items-center gap-2 rounded-md border bg-background p-3 shadow-sm"
          onDragStart={(event) => onDragStart(event, "task")}
          draggable
        >
          <Activity className="h-5 w-5 text-primary" />
          <span>任务节点</span>
        </div>
        <div
          className="flex cursor-grab items-center gap-2 rounded-md border bg-background p-3 shadow-sm"
          onDragStart={(event) => onDragStart(event, "condition")}
          draggable
        >
          <GitBranch className="h-5 w-5 text-amber-500" />
          <span>条件节点</span>
        </div>
        <div
          className="flex cursor-grab items-center gap-2 rounded-md border bg-background p-3 shadow-sm"
          onDragStart={(event) => onDragStart(event, "end")}
          draggable
        >
          <Square className="h-5 w-5 text-red-500" />
          <span>结束节点</span>
        </div>
      </div>

      <Separator className="my-6" />

      <h3 className="mb-4 text-lg font-semibold">使用说明</h3>
      <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
        <li>拖拽左侧节点到画布中</li>
        <li>连接节点：拖拽节点上的连接点</li>
        <li>移动节点：拖拽节点本身</li>
        <li>编辑节点：双击节点</li>
        <li>删除节点：选中后按 Delete 键</li>
        <li>缩放画布：使用鼠标滚轮</li>
      </ul>

      <Separator className="my-6" />

      <h3 className="mb-4 text-lg font-semibold">导入导出</h3>
      <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
        <li className="flex items-start gap-2">
          <Upload className="mt-0.5 h-4 w-4 shrink-0" />
          <span>导入JSON：从之前导出的文件中恢复工作流</span>
        </li>
        <li className="flex items-start gap-2">
          <FileJson className="mt-0.5 h-4 w-4 shrink-0" />
          <span>导出为JSON：保存工作流数据，可用于后续导入</span>
        </li>
        <li className="flex items-start gap-2">
          <ImageIcon className="mt-0.5 h-4 w-4 shrink-0" />
          <span>导出为PNG/SVG：将当前工作流导出为图片</span>
        </li>
      </ul>
    </aside>
  )
}
