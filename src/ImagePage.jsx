import { useParams, useNavigate } from "react-router-dom";
import { images } from "./assets/data";

function ImagePage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const currentIndex = images.findIndex((url) => url.includes(`${slug}_`));
  const imageUrl = images[currentIndex];

  if (currentIndex === -1) return <p>Image not found</p>;

  const goTo = (index) => {
    const newSlug = images[index]?.split("/").pop().split("_")[0];
    if (newSlug) {
      navigate(`/image/${newSlug}`);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
<div
  style={{
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    border: "3px solid violet",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    fontWeight: "bold",
    margin: "0 auto 20px",
    color: "violet",
  }}
>
  {currentIndex + 1}
</div>


      <img src={imageUrl} alt={`Question ${currentIndex + 1}`} style={{ maxWidth: "100%" }} />

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => goTo(currentIndex - 1)}
          disabled={currentIndex === 0}
          style={{ marginRight: "10px" }}
        >
          Previous
        </button>
        <button
          onClick={() => goTo(currentIndex + 1)}
          disabled={currentIndex === images.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ImagePage;
