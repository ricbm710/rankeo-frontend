//custom hooks
import { useUser } from "../hooks/useUser";

const Home = () => {
  const { user, loading } = useUser();

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
