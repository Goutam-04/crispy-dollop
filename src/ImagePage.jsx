import { useParams } from "react-router-dom";
import { images } from "./assets/data";

function ImagePage() {
  const { slug } = useParams();

  const imageUrl = images.find((url) => {
    return url.includes(`${slug}_`);
  });

  if (!imageUrl) return <p>Image not found</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{slug.replace(/-/g, " ")}</h1>
      <img src={imageUrl} alt={slug} style={{ maxWidth: "100%" }} />
    </div>
  );
}

export default ImagePage;
