"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Upload, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"

interface ImportDialogProps {
  onImport: (data: any) => void
}

export function ImportDialog({ onImport }: ImportDialogProps) {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 处理文件选择
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.type !== "application/json" && !selectedFile.name.endsWith(".json")) {
        setError("请选择有效的JSON文件")
        setFile(null)
        return
      }
      setFile(selectedFile)
      setError(null)
    }
  }

  // 处理文件导入
  const handleImport = async () => {
    if (!file) {
      setError("请先选择一个文件")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const text = await file.text()
      const data = JSON.parse(text)

      // 验证数据结构
      if (!data.nodes || !Array.isArray(data.nodes) || !data.edges || !Array.isArray(data.edges)) {
        throw new Error("无效的工作流数据格式")
      }

      // 导入数据
      onImport(data)
      setOpen(false)
      toast({
        title: "导入成功",
        description: `已成功导入工作流，包含 ${data.nodes.length} 个节点和 ${data.edges.length} 个连接`,
      })
    } catch (err) {
      console.error("导入失败:", err)
      setError(err instanceof Error ? err.message : "导入文件时发生错误")
    } finally {
      setIsLoading(false)
    }
  }

  // 重置状态
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setFile(null)
      setError(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
    setOpen(newOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Upload className="mr-2 h-4 w-4" />
          导入
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>导入工作流</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="workflow-file" className="text-right">
              工作流文件
            </Label>
            <div className="col-span-3">
              <Input
                id="workflow-file"
                type="file"
                accept=".json,application/json"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
            </div>
          </div>
          <div className="col-span-4 text-sm text-muted-foreground">
            选择之前导出的工作流JSON文件。导入将替换当前工作流中的所有内容。
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleImport} disabled={!file || isLoading}>
            {isLoading ? "导入中..." : "导入"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
