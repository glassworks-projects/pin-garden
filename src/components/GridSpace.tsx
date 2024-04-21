import React from "react";
import { useDroppable } from "@dnd-kit/core";

export default function GridSpace(props: {
  id: string;
  children: React.ReactNode;
}) {
  const { isOver, setNodeRef } = useDroppable({ id: props.id });
  const bgColor = isOver ? "bg-hover-grey" : "bg-dark-grey";

  return (
    <div
      ref={setNodeRef}
      id={props.id}
      className={`h-36 w-36 border border-light-grey/light rounded-md ${bgColor}`}
    >
      {props.children}
    </div>
  );
}
