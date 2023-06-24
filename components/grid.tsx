"use client"

import React, { useEffect } from "react"

import { account } from "@/lib/appwrite"

import { Button } from "./ui/button"

const _blocks = [
  {
    name: "Block 1",
    background: "bg-green-600",
    rowSpan: 3,
    colSpan: 2,
  },
  {
    name: "Block 2",
    background: "bg-red-600",
    rowSpan: 3,
    colSpan: 1,
  },
  {
    name: "Block 3",
    background: "bg-gray-600",
    rowSpan: 3,
    colSpan: 3,
  },
  {
    name: "Block 4",
    background: "bg-blue-600",
    rowSpan: 3,
    colSpan: 4,
  },
]

const Grid = () => {
  const [blocks, setBlocks] = React.useState(_blocks)
  const [size, setSize] = React.useState(3)

  return (
    <div>
      {/* <div className="grid grid-cols-6 gap-4 transition-all">
        {blocks.map((block) => (
          <div
            key={block.name}
            className={`row-span-${block.rowSpan} col-span-${block.colSpan} border ${block.background} h-64 transition-all`}
          >
            {block.name}
            <Button
              onClick={() => {
                setBlocks((prev) => {
                  return prev.map((_blk) =>
                    _blk.name === block.name
                      ? { ..._blk, rowSpan: 2, colSpan: 2 }
                      : _blk
                  )
                })
              }}
            >
              Square
            </Button>
            <Button
              onClick={() => {
                setBlocks((prev) => {
                  return prev.map((_blk) =>
                    _blk.name === block.name
                      ? { ..._blk, rowSpan: 1, colSpan: 2 }
                      : _blk
                  )
                })
              }}
            >
              Small
            </Button>
            <Button
              onClick={() => {
                setBlocks((prev) => {
                  return prev.map((_blk) =>
                    _blk.name === block.name
                      ? { ..._blk, rowSpan: 3, colSpan: 3 }
                      : _blk
                  )
                })
              }}
            >
              Card
            </Button>
          </div>
        ))}
      </div> */}
    </div>
  )
}

export default Grid
