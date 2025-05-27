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
import Preview from "../Post/Preview";

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
      <div className="mt-2 bg-col-bg-dark p-2 m-1 border border-gray-400">
        <h3 className="text-center font-semibold mb-4">Rankings Creados:</h3>
        {userPosts && userPosts.length > 0 && (
          <div>
            {userPosts.map((post) => (
              <Preview post={post} key={post.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
