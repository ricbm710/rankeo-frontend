import { useEffect, useState } from "react";
//rrd
import { Navigate } from "react-router-dom";
//custom hooks
import { useUser } from "../../hooks/useUser";
//utils
import {
  getFullUserProfile,
  getUserPosts,
} from "../../utils/dbutils/userOperations";
//interfaces
import { UserProfile } from "../../types/userProfile";
import { PostPreview } from "../../types/postPreview";
//components
import InfoSection from "./InfoSection";

const Profile = () => {
  const { user, loading } = useUser();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [userPosts, setUserPosts] = useState<PostPreview[] | null>(null);

  useEffect(() => {
    if (user) {
      const fetchProfileAndPosts = async () => {
        try {
          const [profileResponse, postsResponse] = await Promise.all([
            getFullUserProfile(),
            getUserPosts(user.userId),
          ]);
          setProfile(profileResponse.user);
          setUserPosts(postsResponse);
          console.log("Full user profile:", profileResponse); // or set to state
          console.log("All posts by user:", postsResponse); // or set to state
        } catch (err) {
          console.error("Error fetching user's profile and posts", err);
        }
      };
      fetchProfileAndPosts();
    }
  }, [user]);

  /* -------------------------------------------------------------------- user session verification */

  if (loading) {
    return <p>Verificando Usuario...</p>;
  }

  if (!user) {
    return <Navigate to={"/"} replace />;
  }

  if (!profile) {
    return <p>Cargando Perfil de Usuario...</p>;
  }

  return (
    <div>
      <div className="p-4 mt-6">
        <InfoSection userProfile={profile} />
      </div>
    </div>
  );
};

export default Profile;
