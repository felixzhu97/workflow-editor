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
    const offsetX = 18 // 向右偏移的像素
    const offsetY = 20  // 向下偏移的像素

    const [edgePath] = getBezierPath({
      sourceX: sourceX + offsetX,
      sourceY: sourceY + offsetY,
      sourcePosition,
      targetX: targetX + offsetX,
      targetY: targetY + offsetY,
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
