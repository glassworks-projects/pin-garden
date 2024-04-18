import React from "react";
import { useDroppable } from "@dnd-kit/core";

export default function GridSpace(props: {
  id: number;
  children: React.ReactNode;
}) {
  const { isOver, setNodeRef } = useDroppable({ id: `droppable-${props.id}` });

  return (
    <div ref={setNodeRef} className="h-48 w-48 bg-zinc-900 rounded m-4">
      {props.children}
    </div>
  );
}
