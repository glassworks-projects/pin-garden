import "./App.css";
import { Masonry } from "@mui/lab";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import GridSpace from "./components/GridSpace";
import DraggableImage from "./components/DraggableImage";
import { useState } from "react";
import GridMap from "./utils/GridMap";

function App() {
  const images = Object.values(
    import.meta.glob<string>("./assets/images/*.jpg", {
      eager: true,
      query: "?url",
      import: "default",
    })
  );

  const containers = Array.from({ length: 18 }, (_, i) => `droppable-${i}`);
  const [gridMap, setGridMap] = useState<GridMap>(new GridMap());

  const draggableName = (idx: number): string => `draggable-${idx}`;

  const handleDragEnd = (event: DragEndEvent): void => {
    if (!event.active) return;
    const newGridMap = new GridMap(gridMap);
    const image = event.active!.id as string;
    const space = event.over?.id as string;
    newGridMap.set(space, image);
    setGridMap(newGridMap);
  };

  const clearSpace = (id: string): void => {
    const newGridMap = new GridMap(gridMap);
    newGridMap.clearSpace(id);
    setGridMap(newGridMap);
  };

  return (
    <>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex flex-row overflow-auto">
          <Masonry
            columns={3}
            spacing={0.5}
            sx={{
              width: "450px",
              marginX: "32px",
              minHeight: "800px",
              flexShrink: 0,
            }}
          >
            {images.map((image, idx) =>
              gridMap.get(draggableName(idx)) == undefined ? (
                <DraggableImage url={image} id={draggableName(idx)} key={idx} />
              ) : null
            )}
          </Masonry>
          <div className="grid grid-cols-6 min-w-max w-fit h-fit gap-2">
            {containers.map((id) => (
              <GridSpace id={id} key={id} clickHandler={() => clearSpace(id)}>
                {images.map((image, idx) =>
                  gridMap.get(draggableName(idx)) == id ? (
                    <DraggableImage
                      url={image}
                      id={draggableName(idx)}
                      key={idx}
                      className="h-full w-full object-cover"
                    />
                  ) : null
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
