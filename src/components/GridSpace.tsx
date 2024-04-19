import React from "react";
import { useDroppable } from "@dnd-kit/core";

export default function GridSpace(props: {
  id: string;
  children: React.ReactNode;
}) {
  const { isOver, setNodeRef } = useDroppable({ id: props.id });

  return (
    <div
      ref={setNodeRef}
      id={props.id}
      className="h-40 w-40 bg-dark-grey rounded-md"
    >
      {props.children}
    </div>
  );
}
