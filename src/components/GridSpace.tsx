import { ReactNode } from "react";
import { useDroppable } from "@dnd-kit/core";

export default function GridSpace(props: {
  id: string;
  children: ReactNode;
  clickHandler: { (): void };
}) {
  const { isOver, setNodeRef } = useDroppable({ id: props.id });
  const bgColor = isOver ? "bg-hover-grey" : "bg-dark-grey";

  return (
    <div
      ref={setNodeRef}
      id={props.id}
      className={`h-36 w-36 border border-light-grey/light rounded-md ${bgColor}`}
      onDoubleClick={props.clickHandler}
    >
      {props.children}
    </div>
  );
}
