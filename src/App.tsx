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
  );

  const containers = Array.from({ length: 18 }, (_, i) => i);
  const [parents, setParents] = useState<Map<string, string | undefined>>(
    new Map()
  );
  const [grid, setGrid] = useState<Map<string, string | undefined>>(new Map());

  const handleDragEnd = (event: DragEndEvent): void => {
    if (!event.active) return;
    const newParents = new Map(parents);
    const newGrid = new Map(grid);

    const image = event.active!.id as string;
    const prevParent = newParents.get(image);
    if (prevParent) {
      newGrid.set(prevParent, undefined);
    }
    if (event.over) {
      const gridSpace = event.over!.id as string;
      const prevImage = newGrid.get(gridSpace);
      if (prevImage) {
        newParents.set(prevImage, undefined);
      }
      newParents.set(image, gridSpace);
      newGrid.set(gridSpace, image);
    } else {
      newParents.set(image, undefined);
    }
    setGrid(newGrid);
    setParents(newParents);
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
            {/* {images.filter((image) => parents.get(image.props.id) == undefined)} */}
            {images.map((image, idx) =>
              parents.get(`draggable-${idx}`) == undefined ? (
                <DraggableImage url={image} id={`draggable-${idx}`} key={idx} />
              ) : null
            )}
          </Masonry>
          <div className="grid grid-cols-6 grid-rows-equal-spacing gap-1">
            {containers.map((id) => (
              <GridSpace id={`droppable-${id}`} key={id}>
                {/* {images.filter(
                  (image) => parents.get(image.props.id) == `droppable-${id}`
                )}
                 */}{" "}
                {images.map((image, idx) =>
                  parents.get(`draggable-${idx}`) == `droppable-${id}` ? (
                    <DraggableImage
                      url={image}
                      id={`draggable-${idx}`}
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
