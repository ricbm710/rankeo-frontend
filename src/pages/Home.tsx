import { useEffect, useState } from "react";

//interfaces
import { PostPreview } from "../types/postPreview";
//utils
import { getPostsWithVotes } from "../utils/dbutils/postOperations";
//components
import Preview from "../components/Post/Preview";
import { SortTypeToggle } from "../components/Visuals/SortTypeToggle";
import { SortOrderToggle } from "../components/Visuals/SortOrderToggle";

const Home = () => {
  const [posts, setPosts] = useState<PostPreview[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // pagination with lazy loading
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  //Slider Toggle
  const [sortType, setSortType] = useState<"Relevance" | "Date">("Relevance");
  const [sortOrder, setSortOrder] = useState<"Asc" | "Desc">("Desc");

  const loadMorePosts = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const fetchedPosts = await getPostsWithVotes(page);
      if (fetchedPosts.length === 0) setHasMore(false);
      else {
        setPosts((prev) => [...prev, ...fetchedPosts]);

        setPage((prev) => prev + 1);
      }
    } catch (err) {
      console.error("No se pudo cargar los rankings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMorePosts();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      <div className="flex flex-row p-4 justify-between items-center gap-4">
        <SortTypeToggle selected={sortType} onChange={setSortType} />
        <SortOrderToggle selected={sortOrder} onChange={setSortOrder} />
      </div>
      <div>
        {posts.map((post) => (
          <Preview key={post.id} post={post} />
        ))}
      </div>
      <div className="flex justify-center p-2">
        {hasMore && !loading && (
          <button onClick={loadMorePosts}>Cargar Mas</button>
        )}
        {!hasMore && <p>No hay mas Rankings para mostrar.</p>}
      </div>
      {loading && <p>Cargando más publicaciones...</p>}
    </div>
  );
};

export default Home;
