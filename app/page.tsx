"use client"

import { WorkflowEditor } from "@/components/workflow-editor"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <header className="border-b px-6 py-4">
        <h1 className="text-xl font-bold">工作流编辑器</h1>
      </header>
      <div className="flex-1">
        <WorkflowEditor />
      </div>
    </main>
  )
}
