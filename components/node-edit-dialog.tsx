"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { Node } from "reactflow"

interface NodeEditDialogProps {
  node: Node | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (nodeId: string, data: any) => void
}

export function NodeEditDialog({ node, open, onOpenChange, onSave }: NodeEditDialogProps) {
  const [label, setLabel] = useState("")
  const [description, setDescription] = useState("")
  const [properties, setProperties] = useState<Record<string, string>>({})

  // 当节点变化时更新表单数据
  useEffect(() => {
    if (node) {
      setLabel(node.data.label || "")
      setDescription(node.data.description || "")
      setProperties(node.data.properties || {})
    }
  }, [node])

  // 处理保存
  const handleSave = () => {
    if (!node) return

    onSave(node.id, {
      ...node.data,
      label,
      description,
      properties,
    })
    onOpenChange(false)
  }

  // 添加新属性
  const addProperty = () => {
    setProperties({
      ...properties,
      [`属性${Object.keys(properties).length + 1}`]: "",
    })
  }

  // 更新属性值
  const updateProperty = (key: string, value: string) => {
    setProperties({
      ...properties,
      [key]: value,
    })
  }

  // 删除属性
  const removeProperty = (key: string) => {
    const newProperties = { ...properties }
    delete newProperties[key]
    setProperties(newProperties)
  }

  // 获取节点类型的中文名称
  const getNodeTypeName = (type: string | undefined) => {
    switch (type) {
      case "task":
        return "任务节点"
      case "condition":
        return "条件节点"
      case "start":
        return "开始节点"
      case "end":
        return "结束节点"
      default:
        return "节点"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>编辑{node ? getNodeTypeName(node.type) : "节点"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              名称
            </Label>
            <Input
              id="name"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="col-span-3"
              placeholder="节点名称"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              描述
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
              placeholder="节点描述（可选）"
            />
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between">
              <Label>属性</Label>
              <Button type="button" variant="outline" size="sm" onClick={addProperty}>
                添加属性
              </Button>
            </div>
            <div className="mt-2 space-y-2">
              {Object.entries(properties).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2">
                  <Input
                    value={key}
                    onChange={(e) => {
                      const newProperties = { ...properties }
                      delete newProperties[key]
                      newProperties[e.target.value] = value
                      setProperties(newProperties)
                    }}
                    className="w-1/3"
                    placeholder="属性名"
                  />
                  <Input
                    value={value}
                    onChange={(e) => updateProperty(key, e.target.value)}
                    className="flex-1"
                    placeholder="属性值"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeProperty(key)}
                    className="h-8 w-8 p-0"
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSave}>
            保存
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
