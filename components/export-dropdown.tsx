"use client"

import type React from "react"

import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Download, FileJson, ImageIcon } from "lucide-react"
import { toPng, toSvg } from "html-to-image"
import { useToast } from "@/hooks/use-toast"

interface ExportDropdownProps {
  getWorkflowData: () => any
  screenshotRef: React.RefObject<HTMLDivElement>
}

export function ExportDropdown({ getWorkflowData, screenshotRef }: ExportDropdownProps) {
  const { toast } = useToast()
  const [isExporting, setIsExporting] = useState(false)

  // 导出为JSON
  const exportToJson = () => {
    try {
      setIsExporting(true)
      const workflowData = getWorkflowData()
      const dataStr = JSON.stringify(workflowData, null, 2)
      const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`

      const exportName = `workflow-${new Date().toISOString().slice(0, 10)}.json`

      const downloadAnchorNode = document.createElement("a")
      downloadAnchorNode.setAttribute("href", dataUri)
      downloadAnchorNode.setAttribute("download", exportName)
      document.body.appendChild(downloadAnchorNode)
      downloadAnchorNode.click()
      downloadAnchorNode.remove()

      toast({
        title: "导出成功",
        description: `工作流已导出为 ${exportName}`,
      })
    } catch (error) {
      console.error("导出JSON失败:", error)
      toast({
        title: "导出失败",
        description: "无法导出工作流，请重试",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  // 导出为PNG图片
  const exportToPng = async () => {
    if (!screenshotRef.current) return

    try {
      setIsExporting(true)

      // 在导出前，确保动画边显示为虚线
      const animatedEdges = document.querySelectorAll('.react-flow__edge-path[style*="animation"]')
      animatedEdges.forEach((edge) => {
        if (!(edge as HTMLElement).style.strokeDasharray) {
          ;(edge as HTMLElement).style.strokeDasharray = "5,5"
        }
      })

      const dataUrl = await toPng(screenshotRef.current, {
        backgroundColor: "white",
        quality: 1,
        pixelRatio: 2,
        skipAutoScale: true,
        filter: (node) => {
          // 过滤掉一些可能导致CORS问题的元素
          const exclusionClasses = ["react-flow__minimap", "react-flow__attribution"]
          return !exclusionClasses.some((className) => node.classList?.contains(className))
        },
      })

      const link = document.createElement("a")
      link.download = `workflow-${new Date().toISOString().slice(0, 10)}.png`
      link.href = dataUrl
      link.click()

      toast({
        title: "导出成功",
        description: "工作流已导出为PNG图片",
      })
    } catch (error) {
      console.error("导出PNG失败:", error)
      toast({
        title: "导出失败",
        description: "无法导出工作流图片，请重试",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  // 导出为SVG图片
  const exportToSvg = async () => {
    if (!screenshotRef.current) return

    try {
      setIsExporting(true)

      // 在导出前，确保动画边显示为虚线
      const animatedEdges = document.querySelectorAll('.react-flow__edge-path[style*="animation"]')
      animatedEdges.forEach((edge) => {
        if (!(edge as HTMLElement).style.strokeDasharray) {
          ;(edge as HTMLElement).style.strokeDasharray = "5,5"
        }
      })

      const dataUrl = await toSvg(screenshotRef.current, {
        backgroundColor: "white",
        filter: (node) => {
          // 过滤掉一些可能导致CORS问题的元素
          const exclusionClasses = ["react-flow__minimap", "react-flow__attribution"]
          return !exclusionClasses.some((className) => node.classList?.contains(className))
        },
      })

      const link = document.createElement("a")
      link.download = `workflow-${new Date().toISOString().slice(0, 10)}.svg`
      link.href = dataUrl
      link.click()

      toast({
        title: "导出成功",
        description: "工作流已导出为SVG图片",
      })
    } catch (error) {
      console.error("导出SVG失败:", error)
      toast({
        title: "导出失败",
        description: "无法导出工作流图片，请重试",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="min-w-24 flex items-center justify-center"
          disabled={isExporting}
        >
          <Download className="mr-2 h-4 w-4" />
          导出
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={exportToJson}>
          <FileJson className="mr-2 h-4 w-4" />
          <span>导出为JSON</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToPng}>
          <ImageIcon className="mr-2 h-4 w-4" />
          <span>导出为PNG</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToSvg}>
          <ImageIcon className="mr-2 h-4 w-4" />
          <span>导出为SVG</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
