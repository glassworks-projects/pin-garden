# Pin Garden 🌱

A minimal implementation of a drag-and-droppable pin grid. Made using [dnd-kit](https://dndkit.com/).

Live demo at https://glassworks-projects.github.io/pin-garden

## Engineering and Design Considerations

### Responsiveness

I opted to not have elements resize and instead make the page scroll horizontally. There are of course other ways to handle this, but I thought the question of how and when to resize the sidebar and the grid bled pretty far into the realm of UI design, so I didn't want to get too opinionated there.

### Masonry component

I opted to use the Material UI [Masonry](https://mui.com/material-ui/react-masonry/) component for the sake of time. In a real implementation, I wouldn't want to buy into the Material ecosystem for just one component, so I would probably advocate for building a masonry component from scratch.

### Bidirectional mapping

dnd-kit requires you to keep track of parent and child elements using app state. Doing this elegantly and without lots of ugly reverse map iteration requires a bidirectional mapping between grid squares and asset elements. I implemented a [GridMap](./src/utils/GridMap.ts) utility class for this purpose.

## Extensions

### Animations and transitions

I didn't want to go too deep here for this prototype, but smoother and nicer feeling drag and drop transitions would be an obvious next step. There are CodeSandbox examples integrating Framer Motion with dnd-kit ([example](https://codesandbox.io/p/sandbox/dnd-kit-framer-motion-layout-example-m6bcm?file=%2Fsrc%2FApp.tsx)).

### Asset handling and image importing

Another obvious next step here, versus working with packaged static images.

### Multiple image sizes and aspect ratios

I would have loved to spend time on this, but it's a pretty challenging engineering problem that I think goes beyond the scope of this exercise. You'd have to dynamically recompute and re-render the box grid based on the aspect ratio of the dropped image.

Personally, I think a more intuitive and performant solution would be to introduce functionality to merge grid squares as a separate action. By creating interactions to merge and separate squares, a user could define their own rectangles within the grid, and then drop images as usual and have them adhere to the container sizes. I think this would make it much easier to get predictable behavior for the user.

### Defining image crops

Ideally there should be some functionality to allow the user to crop images to an aspect ratio that the grid supports (1x1, 2x1, 1x2 etc), so that the result is predictable when they drop onto the grid. Maybe this could be done in the sidebar, or maybe we could make it possible to expand a grid square / grid region to define the crop of that region.
