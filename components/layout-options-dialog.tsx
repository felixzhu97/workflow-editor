"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { type LayoutOptions, defaultLayoutOptions, type LayoutType } from "@/utils/layout-algorithms"

interface LayoutOptionsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onApply: (options: LayoutOptions) => void
  initialOptions?: LayoutOptions
}

export function LayoutOptionsDialog({
  open,
  onOpenChange,
  onApply,
  initialOptions = defaultLayoutOptions,
}: LayoutOptionsDialogProps) {
  const [options, setOptions] = useState<LayoutOptions>({ ...initialOptions })

  // 处理布局类型变更
  const handleLayoutTypeChange = (type: LayoutType) => {
    setOptions((prev) => ({ ...prev, type }))
  }

  // 处理方向变更
  const handleDirectionChange = (direction: "TB" | "BT" | "LR" | "RL") => {
    setOptions((prev) => ({ ...prev, direction }))
  }

  // 处理节点距离变更
  const handleNodeDistanceChange = (value: number[]) => {
    setOptions((prev) => ({ ...prev, nodeDistance: value[0] }))
  }

  // 处理层级距离变更
  const handleRankDistanceChange = (value: number[]) => {
    setOptions((prev) => ({ ...prev, rankDistance: value[0] }))
  }

  // 应用布局
  const handleApply = () => {
    onApply(options)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>布局选项</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label>布局类型</Label>
            <RadioGroup
              value={options.type}
              onValueChange={(value) => handleLayoutTypeChange(value as LayoutType)}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hierarchical" id="hierarchical" />
                <Label htmlFor="hierarchical" className="cursor-pointer">
                  分层布局
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="horizontal" id="horizontal" />
                <Label htmlFor="horizontal" className="cursor-pointer">
                  水平布局
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="vertical" id="vertical" />
                <Label htmlFor="vertical" className="cursor-pointer">
                  垂直布局
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="force" id="force" />
                <Label htmlFor="force" className="cursor-pointer">
                  力导向布局
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="radial" id="radial" />
                <Label htmlFor="radial" className="cursor-pointer">
                  放射状布局
                </Label>
              </div>
            </RadioGroup>
          </div>

          {(options.type === "hierarchical" || options.type === "horizontal" || options.type === "vertical") && (
            <div className="space-y-2">
              <Label>方向</Label>
              <Select
                value={options.direction}
                onValueChange={(value) => handleDirectionChange(value as "TB" | "BT" | "LR" | "RL")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="选择方向" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TB">从上到下</SelectItem>
                  <SelectItem value="BT">从下到上</SelectItem>
                  <SelectItem value="LR">从左到右</SelectItem>
                  <SelectItem value="RL">从右到左</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>节点间距</Label>
              <span className="text-sm text-muted-foreground">{options.nodeDistance}px</span>
            </div>
            <Slider
              value={[options.nodeDistance || 150]}
              min={50}
              max={300}
              step={10}
              onValueChange={handleNodeDistanceChange}
            />
          </div>

          {(options.type === "hierarchical" || options.type === "horizontal" || options.type === "vertical") && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>层级间距</Label>
                <span className="text-sm text-muted-foreground">{options.rankDistance}px</span>
              </div>
              <Slider
                value={[options.rankDistance || 200]}
                min={100}
                max={400}
                step={10}
                onValueChange={handleRankDistanceChange}
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={handleApply}>应用布局</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
