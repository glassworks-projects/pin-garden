import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export default function DraggableImage(props: {
  url: string;
  id: string;
  className?: string;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });

  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : undefined;

  return (
    <img
      src={props.url}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`rounded ${props.className || ""}`}
    />
  );
}
