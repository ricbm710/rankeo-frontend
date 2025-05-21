import { useEffect, useState } from "react";
//custom hooks
// import { useUser } from "../hooks/useUser";
//interfaces
import { PostPreview } from "../types/postPreview";
//utils
import { getPostsWithVotes } from "../utils/dbutils/postOperations";
//components
import Preview from "../components/Post/Preview";

const Home = () => {
  // const { user, loading } = useUser();

  const [posts, setPosts] = useState<PostPreview[]>([]);
  const [contentLoading, setContentLoading] = useState<boolean>(true);
  const [contentError, setContentError] = useState<string | null>(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const fetchedPosts = await getPostsWithVotes();
        setPosts(fetchedPosts);
        setContentLoading(false);
      } catch (error) {
        console.error("No se pudo traer las publicaciones:", error);
        setContentError("No se pudo cargar el contenido.");
      }
    };
    getPosts();
  }, []);

  console.log(posts);

  // if (loading) {
  //   return <div>Cargando Usuario...</div>;
  // }

  // if (!user) {
  //   return <div>Usuario no logueado</div>;
  // }

  return (
    <>
      <div>
        {contentError ? (
          <p>{contentError}</p>
        ) : contentLoading ? (
          <p>Cargando Contenido...</p>
        ) : (
          <div>
            {posts.map((post) => (
              <Preview post={post} key={post.id} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
