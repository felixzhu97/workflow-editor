"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { workflowTemplates, type WorkflowTemplate } from "./workflow-templates"
import { FileIcon as FileTemplate, LayoutTemplate } from "lucide-react"

interface TemplateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelectTemplate: (template: WorkflowTemplate) => void
}

export function TemplateDialog({ open, onOpenChange, onSelectTemplate }: TemplateDialogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("基础")

  // 获取所有可用的类别
  const categories = Array.from(new Set(workflowTemplates.map((t) => t.category)))

  // 按类别筛选模板
  const filteredTemplates = workflowTemplates.filter(
    (template) => selectedCategory === "全部" || template.category === selectedCategory,
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>选择工作流模板</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="基础" className="mt-2">
          <TabsList className="mb-4">
            <TabsTrigger value="全部" onClick={() => setSelectedCategory("全部")}>
              全部
            </TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} onClick={() => setSelectedCategory(category)}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <ScrollArea className="h-[500px] pr-4">
            <div className="grid grid-cols-2 gap-4">
              {filteredTemplates.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onSelect={() => {
                    onSelectTemplate(template)
                    onOpenChange(false)
                  }}
                />
              ))}
            </div>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

interface TemplateCardProps {
  template: WorkflowTemplate
  onSelect: () => void
}

function TemplateCard({ template, onSelect }: TemplateCardProps) {
  return (
    <div className="flex flex-col border rounded-lg overflow-hidden bg-card">
      <div className="p-4 bg-muted/30 flex items-center gap-3">
        <div className="bg-primary/10 p-2 rounded-md">
          {template.category === "基础" ? (
            <LayoutTemplate className="h-5 w-5 text-primary" />
          ) : (
            <FileTemplate className="h-5 w-5 text-primary" />
          )}
        </div>
        <div>
          <h3 className="font-medium">{template.name}</h3>
          <p className="text-xs text-muted-foreground">{template.category}</p>
        </div>
      </div>

      <div className="p-4 flex-1">
        <p className="text-sm text-muted-foreground">{template.description}</p>

        <div className="mt-3 text-xs text-muted-foreground">
          <div className="flex justify-between">
            <span>节点数量:</span>
            <span className="font-medium">{template.nodes.length}</span>
          </div>
          <div className="flex justify-between">
            <span>连接数量:</span>
            <span className="font-medium">{template.edges.length}</span>
          </div>
        </div>
      </div>

      <div className="p-4 border-t">
        <Button onClick={onSelect} className="w-full">
          使用此模板
        </Button>
      </div>
    </div>
  )
}
