import { useEffect, useState } from "react";
//rrd
import { Navigate } from "react-router-dom";
//custom hooks
import { useUser } from "../../hooks/useUser";
//utils
import { getFullUserProfile } from "../../utils/dbutils/userOperations";
//interfaces
import { UserProfile } from "../../types/userProfile";

const Profile = () => {
  const { user, loading } = useUser();

  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (user) {
      const fetchUserProfile = async () => {
        try {
          const response = await getFullUserProfile();
          setProfile(response.user);
          console.log("Full user profile:", response); // or set to state
        } catch (err) {
          console.error("Error fetching profile", err);
        }
      };
      fetchUserProfile();
    }
  }, [user]);

  /* -------------------------------------------------------------------- user session verification */

  if (loading) {
    return <p>Verificando Usuario...</p>;
  }

  if (!user) {
    return <Navigate to={"/"} replace />;
  }

  return <div>Perfil: {profile && <p>{profile.name} </p>}</div>;
};

export default Profile;
