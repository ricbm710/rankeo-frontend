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

  useEffect(() => {
    const getPosts = async () => {
      try {
        const fetchedPosts = await getPostsWithVotes();
        setPosts(fetchedPosts);
        setContentLoading(false);
      } catch (error) {
        console.error("No se pudo traer las publicaciones:", error);
        setContentLoading(true);
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

  if (contentLoading) {
    return <div>Cargando contenido...</div>;
  }

  return (
    <>
      <div>
        {posts.map((post) => (
          <Preview post={post} key={post.id} />
        ))}
      </div>
    </>
  );
};

export default Home;
