//types
import { PostPreview } from "../../types/postPreview";
//react-icons
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

const Preview = ({ post }: { post: PostPreview }) => {
  const postDate = new Date(post.created_at);
  const formattedDate = postDate.toLocaleDateString("en-GB"); // "dd/mm/yyyy" format

  return (
    <div className="flex flex-col p-2 m-2 bg-col-preview boder border-1 border-col3 rounded-md">
      <div className="mb-2">
        <h4 className="font-semibold">{post.question}</h4>
      </div>
      <div className="flex flex-row">
        <div className="flex flex-row gap-3">
          <div className="flex flex-col items-center">
            <div>
              <FaArrowUp color="#e51010" />
            </div>
            <div>{post.upvotes}</div>
          </div>
          <div className="flex flex-col items-center">
            <div>
              <FaArrowDown color="#e51010" />
            </div>
            <div>{post.downvotes}</div>
          </div>
        </div>
        <div className="text-sm text-gray-500 italic flex flex-col justify-center ms-4">
          <p>
            Publicado: <span>{formattedDate}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Preview;
