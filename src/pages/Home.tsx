import { useEffect, useState } from "react";

//interfaces
import { PostPreview } from "../types/postPreview";
//utils
import { getPostsWithVotes } from "../utils/dbutils/postOperations";
//components
import Preview from "../components/Post/Preview";

const Home = () => {
  const [posts, setPosts] = useState<PostPreview[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // pagination with lazy loading
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

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
    console.log("useEffect fired");
    loadMorePosts();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      <div>
        {posts.map((post) => (
          <Preview key={post.id} post={post} />
        ))}
      </div>
      {hasMore && !loading && (
        <button onClick={loadMorePosts}>Cargar más</button>
      )}
      {loading && <p>Cargando más publicaciones...</p>}
    </div>
  );
};

export default Home;
