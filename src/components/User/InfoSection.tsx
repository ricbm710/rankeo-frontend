//types
import { UserProfile } from "../../types/userProfile";

const InfoSection = ({ userProfile }: { userProfile: UserProfile }) => {
  const formattedDate = new Date(userProfile.member_since).toLocaleDateString(
    "en-GB"
  );

  console.log(userProfile.member_since);
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="flex flex-row gap-10 justify-center items-center">
        <div>Picture</div>
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold">{userProfile.name}</h4>
          <h5 className="text-sm text-gray-700">{userProfile.email}</h5>
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-700"> Miembro desde: {formattedDate}</p>
      </div>
    </div>
  );
};

export default InfoSection;
