import "./App.css";
import { Masonry } from "@mui/lab";
import { DndContext, DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";
import GridSpace from "./components/GridSpace";
import DraggableImage from "./components/DraggableImage";
import { useState } from "react";

function App() {
  const images = Object.values(
    import.meta.glob<string>("./assets/images/*.jpg", {
      eager: true,
      query: "?url",
      import: "default",
    })
  ).map((image, idx) => (
    <DraggableImage url={image} id={`draggable-${idx}`} key={idx} />
  ));

  const containers = Array.from({ length: 18 }, (_, i) => i);
  const [parents, setParents] = useState<Map<string, string | undefined>>(
    new Map()
  );

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.active) {
      const newParents = new Map(parents);
      // const over = event.over?.id;

      newParents.set(
        event.active.id as string,
        (event.over?.id as string) || undefined
      );
      setParents(newParents);
    }
  };

  // const spaceIsFull = (id: UniqueIdentifier): boolean => {
  //   return [...parents.values()].includes(id as string);
  // };

  return (
    <>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex flex-row">
          <Masonry
            columns={3}
            spacing={0.5}
            sx={{
              maxWidth: "28rem",
              marginX: "2rem",
            }}
          >
            {images.filter((image) => parents.get(image.props.id) == undefined)}
          </Masonry>
          <div className="grid grid-cols-6 grid-rows-equal-spacing gap-1">
            {containers.map((id) => (
              <GridSpace id={`droppable-${id}`} key={id}>
                {images.filter(
                  (image) => parents.get(image.props.id) == `droppable-${id}`
                )}
              </GridSpace>
            ))}
          </div>
        </div>
      </DndContext>
    </>
  );
}

export default App;
