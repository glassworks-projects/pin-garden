import "./App.css";
import { Masonry } from "@mui/lab";

function App() {
  const images = Object.values(
    import.meta.glob<string>("./assets/images/*.jpg", {
      eager: true,
      query: "?url",
      import: "default",
    })
  );
  return (
    <>
      <Masonry columns={3} spacing={2}>
        {images.map((image) => (
          <img src={image} className="rounded" />
        ))}
      </Masonry>
    </>
  );
}

export default App;
