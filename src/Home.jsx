import { images } from "./assets/data";
import { Link, useSearchParams } from "react-router-dom"; // 🔥
import { useState, useEffect } from "react";

function extractTitle(url) {
  const filename = url.split("/").pop().split("_")[0];
  const title = filename
    .replace(/^v\d+\//, "")
    .replace(/-/g, " ")
    .replace(/\.(png|jpg|jpeg|webp)$/, "");
  return title;
}

function extractSlug(url) {
  const filename = url.split("/").pop().split("_")[0];
  return filename;
}

const QUESTIONS_PER_PAGE = 10;

function Home() {
  const [searchParams, setSearchParams] = useSearchParams(); // 🔥
  const initialPage = parseInt(searchParams.get("page")) || 1; // 🔥

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [inputPage, setInputPage] = useState("");

  const totalPages = Math.ceil(images.length / QUESTIONS_PER_PAGE);
  const startIndex = (currentPage - 1) * QUESTIONS_PER_PAGE;
  const currentImages = images.slice(startIndex, startIndex + QUESTIONS_PER_PAGE);

  useEffect(() => {
    setSearchParams({ page: currentPage }); // 🔥 update URL when page changes
  }, [currentPage]);

  const handlePageJump = () => {
    const pageNum = parseInt(inputPage);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
      setInputPage("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>All Questions</h1>

      <ol start={startIndex + 1}>
        {currentImages.map((url) => {
          const title = extractTitle(url);
          const slug = extractSlug(url);
          return (
            <li key={slug} style={{ marginBottom: "8px" }}>
              <Link to={`/image/${slug}`}>{title}</Link>
            </li>
          );
        })}
      </ol>

      {/* Pagination Controls */}
      <div style={{ marginTop: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>

        {/* Input for direct jump */}
        <input
          type="number"
          placeholder="Go to page"
          value={inputPage}
          onChange={(e) => setInputPage(e.target.value)}
          style={{ width: "80px", padding: "4px" }}
        />
        <button onClick={handlePageJump}>Go</button>
      </div>
    </div>
  );
}

export default Home;
