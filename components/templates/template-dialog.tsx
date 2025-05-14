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
      <DialogContent className="sm:max-w-[900px] max-h-[85vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl">选择工作流模板</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="基础" className="mt-4">
          <TabsList className="mb-6 w-full justify-start">
            <TabsTrigger value="全部" onClick={() => setSelectedCategory("全部")}>
              全部
            </TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} onClick={() => setSelectedCategory(category)}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <ScrollArea className="h-[520px] pr-4 pb-8">
            <div className="grid grid-cols-2 gap-8 pb-8">
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
    <div className="flex flex-col border rounded-lg overflow-hidden bg-card hover:border-primary/40 transition-colors duration-200 shadow-sm hover:shadow-md">
      <div className="p-6 bg-muted/30 flex items-center gap-4">
        <div className="bg-primary/10 p-3 rounded-md">
          {template.category === "基础" ? (
            <LayoutTemplate className="h-6 w-6 text-primary" />
          ) : (
            <FileTemplate className="h-6 w-6 text-primary" />
          )}
        </div>
        <div>
          <h3 className="font-medium text-lg">{template.name}</h3>
          <p className="text-xs text-muted-foreground">{template.category}</p>
        </div>
      </div>

      <div className="p-6 flex-1">
        <p className="text-sm text-muted-foreground">{template.description}</p>

        <div className="mt-5 text-xs text-muted-foreground space-y-2">
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

      <div className="p-6 border-t">
        <Button onClick={onSelect} className="w-full">
          使用此模板
        </Button>
      </div>
    </div>
  )
}
