import { useEffect, useState } from "react";
//custom hooks
import { useUser } from "../hooks/useUser";
//interfaces
import { PostPreview } from "../types/postPreview";
//utils
import { getPostsWithVotes } from "../utils/dbutils/postOperations";

const Home = () => {
  const { user, loading } = useUser();
  const [posts, setPosts] = useState<PostPreview[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      const fetchedPosts = await getPostsWithVotes();
      setPosts(fetchedPosts);
    };
    getPosts();
  }, []);

  console.log(posts);

  if (loading) {
    return <div>Cargando Usuario...</div>;
  }

  if (!user) {
    return <div>Usuario no logueado</div>;
  }

  return (
    <div>
      <h1>HomePage</h1> Bienvenido {user.name} - {user.email}{" "}
    </div>
  );
};

export default Home;
