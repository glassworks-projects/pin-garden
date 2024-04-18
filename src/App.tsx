import "./App.css";
import { Masonry } from "@mui/lab";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
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

  const containers = [0, 1];
  const [parents, setParents] = useState<Record<string, string | undefined>>(
    {}
  );

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.active) {
      const newParents = { ...parents };
      newParents[event.active.id as string] =
        (event.over?.id as string) || undefined;
      setParents(newParents);
    }
  };

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
            {images.filter((image) => parents[image.props.id] == undefined)}
          </Masonry>
          {containers.map((id) => (
            <GridSpace id={id} key={id}>
              {images.filter(
                (image) => parents[image.props.id] == `droppable-${id}`
              )}
            </GridSpace>
          ))}
        </div>
      </DndContext>
    </>
  );
}

export default App;
