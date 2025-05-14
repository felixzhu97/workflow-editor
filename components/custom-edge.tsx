import { memo } from "react"
import { type EdgeProps, getBezierPath } from "reactflow"

export const CustomEdge = memo(
  ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    data,
    markerEnd,
    animated,
  }: EdgeProps) => {
    const [edgePath] = getBezierPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    })

    // 为动画边添加虚线样式
    const strokeDasharray = animated ? "5,5" : undefined
    const edgeStyle = {
      ...style,
      strokeDasharray,
      animation: animated ? "dashdraw 0.5s linear infinite" : undefined,
    }

    return <path id={id} style={edgeStyle} className="react-flow__edge-path" d={edgePath} markerEnd={markerEnd} />
  },
)

CustomEdge.displayName = "CustomEdge"
