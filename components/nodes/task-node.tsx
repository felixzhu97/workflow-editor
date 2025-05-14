import { memo } from "react"
import { Handle, Position, type NodeProps } from "reactflow"
import { Activity } from "lucide-react"

export const TaskNode = memo(({ data, isConnectable }: NodeProps) => {
  return (
    <div className="rounded-md border border-primary/20 bg-white px-4 py-2 shadow-sm">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div className="flex items-center gap-2">
        <Activity className="h-4 w-4 text-primary" />
        <div className="text-sm font-medium">{data.label}</div>
      </div>
      {data.description && <div className="mt-1 text-xs text-muted-foreground">{data.description}</div>}
      {data.properties && Object.keys(data.properties).length > 0 && (
        <div className="mt-2 border-t pt-1">
          {Object.entries(data.properties).map(([key, value]) => (
            <div key={key} className="flex items-center gap-1 text-xs">
              <span className="font-medium">{key}:</span>
              <span className="text-muted-foreground">{value as string}</span>
            </div>
          ))}
        </div>
      )}
      <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />
    </div>
  )
})

TaskNode.displayName = "TaskNode"
