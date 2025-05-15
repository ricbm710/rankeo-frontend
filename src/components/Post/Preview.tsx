import { PostPreview } from "../../types/postPreview";

const Preview = ({ post }: { post: PostPreview }) => {
  return <div>{post.question} </div>;
};

export default Preview;
