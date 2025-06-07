import { useEffect, useState } from "react";

//interfaces
import { PostPreview } from "../types/postPreview";
//utils
import { getPostsWithVotes } from "../utils/dbutils/postOperations";
//components
import Preview from "../components/Post/Preview";
import { SortTypeToggle } from "../components/Visuals/SortTypeToggle";
import { SortOrderToggle } from "../components/Visuals/SortOrderToggle";
//rrd
import { useSearchParams } from "react-router-dom";

const Home = () => {
  //sync URL with sorting and pagination
  const [searchParams, setSearchParams] = useSearchParams(); // 🆕

  // 🆕 Use query params for initial values
  const initialSortType =
    (searchParams.get("sortType") as "relevance" | "date") || "relevance";
  const initialSortOrder =
    (searchParams.get("sortOrder") as "asc" | "desc") || "desc";

  const [posts, setPosts] = useState<PostPreview[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // pagination with lazy loading
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  //Slider Toggle
  const [sortType, setSortType] = useState<"relevance" | "date">(
    initialSortType
  ); // 🆕
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(initialSortOrder); // 🆕

  const loadMorePosts = async (force = false, customPage?: number) => {
    if (loading || (!hasMore && !force)) return;
    setLoading(true);
    const pageToFetch = customPage ?? page;
    try {
      const fetchedPosts = await getPostsWithVotes({
        page: pageToFetch,
        sortType,
        sortOrder,
      });
      if (fetchedPosts.length === 0) setHasMore(false);
      else {
        setPosts((prev) =>
          pageToFetch === 1 ? fetchedPosts : [...prev, ...fetchedPosts]
        );
        setPage(pageToFetch + 1); // Update based on the page we just fetched
      }
    } catch (err) {
      console.error("No se pudo cargar los rankings.");
    } finally {
      setLoading(false);
    }
  };

  // 🆕 Sync sortType and sortOrder to the URL
  useEffect(() => {
    setSearchParams({
      sortType,
      sortOrder,
    });
  }, [sortType, sortOrder]);

  useEffect(() => {
    console.log(hasMore); //TODO
    setPosts([]);
    setHasMore(true);
    loadMorePosts(true, 1);
    setPage(2); // Since first page is already loaded
  }, [sortOrder, sortType]);

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
          <button onClick={() => loadMorePosts()}>Cargar Mas</button>
        )}
        {!hasMore && <p>No hay mas Rankings para mostrar.</p>}
      </div>
      {loading && <p>Cargando más publicaciones...</p>}
    </div>
  );
};

export default Home;
